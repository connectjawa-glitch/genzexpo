// Both renderers use the same one-way traffic, spacing and entrance/exit fades.
export function walkerState(index,laneCount,length,time,population=24){
 const lane=index%laneCount,slot=Math.floor(index/laneCount),occupants=Math.ceil((population-lane)/laneCount);
 const speed=.85+(lane%3)*.05,offset=4+slot*(length+8)/occupants;
 const distance=(offset+time*speed)%(length+8)-4;
 return{distance,visible:distance>=0&&distance<=length,alpha:Math.max(0,Math.min(1,distance/2,(length-distance)/2)),phase:time*6.4+index*.8};
}
export function arrowState(offset,length,time){
 const distance=(offset+time*.7)%length;
 return{distance,alpha:Math.max(0,Math.min(.78,distance/2,(length-distance)/2))};
}
