export const STALL_STATUSES=Object.freeze(['available','reserved','sold_out']);
export const validStallStatus=value=>STALL_STATUSES.includes(value);
export function stallEnquiryDecision(snapshot,number){
 const status=snapshot?.statuses?.get(Number(number));
 if(status==='sold_out')return{allowed:false,reason:'sold_out',status};
 if(snapshot?.state!=='live'||!validStallStatus(status))return{allowed:false,reason:'unknown',status:null};
 return{allowed:status!=='sold_out',reason:status,status};
}
