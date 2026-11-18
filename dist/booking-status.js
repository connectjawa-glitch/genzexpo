const STALL_COUNT=193;
export const BOOKING_POLL_MS=20000;

// Only explicit, valid organiser records can produce a booking marker.
export function validateBookingPayload(payload){
 if(!payload||!Array.isArray(payload.bookings)||typeof payload.updatedAt!=='string'||!Number.isFinite(Date.parse(payload.updatedAt)))throw new Error('Invalid booking response');
 const records=new Map();
 for(const row of payload.bookings){
  if(!row||!Number.isInteger(row.stall)||row.stall<1||row.stall>STALL_COUNT||typeof row.booked!=='boolean'||!Number.isInteger(row.revision)||row.revision<0||typeof row.updatedAt!=='string'||!Number.isFinite(Date.parse(row.updatedAt))||records.has(row.stall))throw new Error('Invalid booking record');
  records.set(row.stall,{stall:row.stall,booked:row.booked,updatedAt:row.updatedAt,revision:row.revision});
 }
 return{records,updatedAt:payload.updatedAt};
}

export class BookingStatus{
 constructor({fetcher=globalThis.fetch?.bind(globalThis),now=()=>Date.now(),online=()=>globalThis.navigator?.onLine!==false,onChange=()=>{},documentRef=globalThis.document,windowRef=globalThis.window}={}){
  Object.assign(this,{fetcher,now,online,onChange,document:documentRef,window:windowRef,records:new Map(),booked:new Set(),updatedAt:null,lastSynced:null,_state:'loading',inFlight:null,timer:null,controller:null,started:false});
  this.onVisibility=()=>{this.schedule();if(this.isVisible())this.refresh();};
  this.onFocus=()=>{if(this.isVisible())this.refresh();};
  this.onOnline=()=>{this.notify();if(this.isVisible())this.refresh();};
  this.onOffline=()=>this.notify();
 }
 get state(){if(!this.online())return'offline';if(this._state==='live'&&this.lastSynced!==null&&this.now()-this.lastSynced>60000)return'stale';return this._state;}
 isBooked(stall){return this.booked.has(Number(stall));}
 isVisible(){return this.document?.visibilityState!=='hidden';}
 snapshot(){return{state:this.state,booked:new Set(this.booked),updatedAt:this.updatedAt,lastSynced:this.lastSynced};}
 notify(changed=false){this.onChange({...this.snapshot(),changed});}
 start(){if(this.started)return;this.started=true;this.document?.addEventListener('visibilitychange',this.onVisibility);this.window?.addEventListener('focus',this.onFocus);this.window?.addEventListener('online',this.onOnline);this.window?.addEventListener('offline',this.onOffline);this.notify();this.schedule();if(this.isVisible())this.refresh();}
 schedule(){if(this.timer)clearInterval(this.timer);this.timer=null;if(this.started&&this.isVisible())this.timer=setInterval(()=>{if(this.isVisible())this.refresh();},BOOKING_POLL_MS);}
 stop(){this.started=false;if(this.timer)clearInterval(this.timer);this.timer=null;this.controller?.abort();this.document?.removeEventListener('visibilitychange',this.onVisibility);this.window?.removeEventListener('focus',this.onFocus);this.window?.removeEventListener('online',this.onOnline);this.window?.removeEventListener('offline',this.onOffline);}
 refresh(){
  if(this.inFlight)return this.inFlight;
  if(!this.isVisible())return Promise.resolve(this.snapshot());
  if(!this.online()){this.notify();return Promise.resolve(this.snapshot());}
  this.inFlight=this.request().finally(()=>this.inFlight=null);return this.inFlight;
 }
 async request(){
  this.controller=new AbortController();const timeout=setTimeout(()=>this.controller?.abort(),12000);let payload=null,changed=false;
  if(this.state==='stale')this.notify();
  try{const response=await this.fetcher('/api/bookings',{cache:'no-store',credentials:'same-origin',headers:{Accept:'application/json'},signal:this.controller.signal});if(!response.ok)throw new Error('Booking service unavailable');payload=validateBookingPayload(await response.json());}
  catch{this._state=this.lastSynced===null?'offline':'stale';}
  finally{clearTimeout(timeout);this.controller=null;}
  if(payload){const fingerprint=records=>JSON.stringify([...records.values()].sort((a,b)=>a.stall-b.stall));changed=fingerprint(payload.records)!==fingerprint(this.records);this.records=payload.records;this.booked=new Set([...this.records.values()].filter(row=>row.booked).map(row=>row.stall));this.updatedAt=payload.updatedAt;this.lastSynced=this.now();this._state='live';}
  this.notify(changed);return this.snapshot();
 }
}
