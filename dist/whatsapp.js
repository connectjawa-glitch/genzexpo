import{validStallStatus}from'./status-policy.js?v=f4cdcbaf668f40cd';
export const WHATSAPP_NUMBER='917305749636';
export const WHATSAPP_ACTION=`https://wa.me/${WHATSAPP_NUMBER}`;

const text=value=>String(value??'').trim();
export function validEnquiryPhone(value){
 const phone=text(value),digits=phone.replace(/\D/g,'');
 return /^\+?[\d\s().-]+$/.test(phone)&&digits.length>=7&&digits.length<=15;
}

export function buildEnquiryDraft({stall=null,status=null,details={},preparedAt=new Date(),t,money,locale='en-IN'}){
 if(stall&&(!validStallStatus(status)||status==='sold_out'))throw new Error(status==='sold_out'?'STALL_SOLD_OUT':'STALL_STATUS_UNCHECKED');
 const lines=['ERODE GENZ AGRI EXPO 2027',t('dates'),t('place'),'',t('waGreeting'),''];
 if(stall){
  lines.push(`${t('hall')}: ${stall.hall} | ${t('stall')}: ${stall.n}`,`${t(stall.tier)} | ${t('price')}: ${money(stall.price)}`,`${t('size')}: ${stall.size||t('confirmSize')}`);
  lines.push(`${t('bookingStallStatus')}: ${t(status==='reserved'?'bookingReserved':'bookingAvailable')}`);
  if(status==='reserved')lines.push(t('bookingReservedWarning'));
  if(stall.sourceIssue)lines.push(t(stall.sourceIssue));
 }else lines.push(t('waGeneral'));
 lines.push('',`${t('waName')}: ${text(details.name)}`,`${t('waMobile')}: ${text(details.phone)}`);
 if(text(details.business))lines.push(`${t('waBusiness')}: ${text(details.business)}`);
 if(text(details.message))lines.push(`${t('waMessage')}: ${text(details.message)}`);
 const when=new Intl.DateTimeFormat(locale,{day:'numeric',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit',timeZone:'Asia/Kolkata'}).format(preparedAt);
 lines.push('',`${t('waPrepared')}: ${when} IST`,'',t('waRequest'));
 return lines.join('\n');
}

// Called only from an explicit, validated submit gesture. A blank tab contains
// no enquiry/visitor data while status is checked. It is closed on any failure.
export async function guardedWhatsAppHandoff({stall,checkStatus,getDraft,isCurrent=()=>true,onBlocked=()=>{},onChecking=()=>{},checkingText='Checking stall status…',openWindow=()=>globalThis.window.open('about:blank','_blank'),navigateCurrent=url=>globalThis.window.location.assign(url)}){
 let popup=null,popupWasOpened=false;try{popup=openWindow();popupWasOpened=!!popup;if(popup){popup.opener=null;if(popup.document){popup.document.title=checkingText;if(popup.document.body)popup.document.body.textContent=checkingText;}}}catch{try{popup?.close();}catch{}popup=null;}
 const close=()=>{try{if(popup&&!popup.closed)popup.close();}catch{}};onChecking(true);
 try{
  const decision=await checkStatus(stall.n);
  if(!isCurrent()||popupWasOpened&&(!popup||popup.closed)){close();return{opened:false,reason:'cancelled'};}
  if(!decision?.allowed||!validStallStatus(decision.status)||decision.status==='sold_out'){close();onBlocked(decision?.reason==='sold_out'?decision:{allowed:false,reason:'unknown',status:null});return{opened:false,reason:decision?.reason??'unknown'};}
  const draft=getDraft(decision.status);if(typeof draft!=='string'||!draft.trim())throw new Error('Missing reviewed draft');
  if(!isCurrent()||popupWasOpened&&(!popup||popup.closed)){close();return{opened:false,reason:'cancelled'};}
  const url=new URL(WHATSAPP_ACTION);url.search=new URLSearchParams({text:draft});
  if(popup&&!popup.closed)popup.location.replace(url.href);else navigateCurrent(url.href);
  return{opened:true,status:decision.status};
 }catch{close();if(isCurrent())onBlocked({allowed:false,reason:'unknown',status:null});return{opened:false,reason:'unknown'};}
 finally{onChecking(false);}
}
