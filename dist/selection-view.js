// Selection framing is absolute, so repeated clicks never compound the zoom.
export const SELECTION_ZOOM=2.1;
export function selectionZoom(stall,hall){
 return Math.min(SELECTION_ZOOM,hall.width/(stall.w+16),hall.depth/(stall.d+16));
}
export function planFocus(stall,base){
 const aspect=base.w/base.h,w=Math.max(base.w/SELECTION_ZOOM,stall.w+16,(stall.d+16)*aspect),h=w/aspect;
 return{x:stall.x+stall.w/2-w/2,y:stall.z+stall.d/2-h/2,w,h};
}
// Keep the callout outside the selected tile, including at the hall edges.
export function calloutPosition(point,scene,pin,previousBelow=false){
 const margin=12,half=pin.width/2,x=Math.max(half+margin,Math.min(scene.width-half-margin,point.x));
 const top=point.bounds?.top??point.y,bottom=point.bounds?.bottom??point.y;
 const above=top-16,below=bottom+16;
 if(previousBelow&&above-pin.height<90&&below+pin.height<=scene.height-72)return{x,y:below,below:true};
 if(above-pin.height>=58)return{x,y:above,below:false};
 if(below+pin.height<=scene.height-72)return{x,y:below,below:true};
 return{x,y:above,below:false,hidden:above-pin.height<12};
}
