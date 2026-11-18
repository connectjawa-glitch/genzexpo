export const WHATSAPP_NUMBER='917305749636';
export const WHATSAPP_ACTION=`https://wa.me/${WHATSAPP_NUMBER}`;

const text=value=>String(value??'').trim();
export function validEnquiryPhone(value){
 const phone=text(value),digits=phone.replace(/\D/g,'');
 return /^\+?[\d\s().-]+$/.test(phone)&&digits.length>=7&&digits.length<=15;
}

export function buildEnquiryDraft({stall=null,details={},preparedAt=new Date(),t,money,locale='en-IN'}){
 const lines=['ERODE GENZ AGRI EXPO 2027',t('dates'),t('place'),'',t('waGreeting'),''];
 if(stall){
  lines.push(`${t('hall')}: ${stall.hall} | ${t('stall')}: ${stall.n}`,`${t(stall.tier)} | ${t('price')}: ${money(stall.price)}`,`${t('size')}: ${stall.size||t('confirmSize')}`);
  if(stall.sourceIssue)lines.push(t(stall.sourceIssue));
 }else lines.push(t('waGeneral'));
 lines.push('',`${t('waName')}: ${text(details.name)}`,`${t('waMobile')}: ${text(details.phone)}`);
 if(text(details.business))lines.push(`${t('waBusiness')}: ${text(details.business)}`);
 if(text(details.message))lines.push(`${t('waMessage')}: ${text(details.message)}`);
 const when=new Intl.DateTimeFormat(locale,{day:'numeric',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit',timeZone:'Asia/Kolkata'}).format(preparedAt);
 lines.push('',`${t('waPrepared')}: ${when} IST`,'',t('waRequest'));
 return lines.join('\n');
}
