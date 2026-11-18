import {stalls,halls} from './data.js?v=937c797c2940689a';
// Arrows transcribed from the re-supplied plans. These are suggested circulation
// directions, not a certified egress plan. Coordinates share the schematic layout.
const lane=(id,label,points)=>({id,label,points});
export const circulation={
 1:{
  outline:[[0,10],[26,10],[26,0],[106,0],[106,58],[114,58],[114,110],[0,110]],
  lanes:[
   lane('h1-left-up','leftAisle',[[17,73],[17,15]]),
   lane('h1-top-right','topAisle',[[17,15],[105,15]]),
   lane('h1-centre-down','mainAisle',[[44,17],[44,98]]),
   lane('h1-right-up','rightAisle',[[77,96],[77,16]]),
   lane('h1-lower-right','crossAisle',[[77,76.2],[110,76.2]]),
   lane('h1-bottom-right','lowerAisle',[[53,98],[110,98]]),
   lane('h1-left-link-west','crossAisle',[[39,76.5],[19,76.5]]),
   lane('h1-left-link-east','crossAisle',[[20,81],[40.5,81]]),
   lane('h1-left-link-up','crossAisle',[[40.5,81],[40.5,76.5]])
  ],
  walls:[[[0,10],[26,10]],[[26,10],[26,0]],[[26,0],[106,0]],[[106,0],[106,58]],[[106,58],[114,58]],[[114,58],[114,110]],[[114,110],[48,110]],[[39,110],[0,110]],[[0,110],[0,10]]],
  portals:[{key:'entry',side:'south',from:39,to:48,x:43.5,z:110}],
  tour:['h1-left-up','h1-top-right','h1-centre-down','h1-bottom-right','h1-right-up','h1-lower-right']
 },
 2:{
  outline:[[0,0],[114,0],[114,69],[0,69]],
  lanes:[
   lane('h2-entry-left','entranceAisle',[[113,59],[102,59]]),
   lane('h2-right-up','rightAisle',[[102,59],[102,8]]),
   lane('h2-top-left','topAisle',[[102,8],[84.5,8]]),
   lane('h2-centre-down','mainAisle',[[84.5,12],[84.5,64]]),
   lane('h2-lower-left','lowerAisle',[[83.5,55],[28,55]]),
   lane('h2-left-up','leftAisle',[[28,64],[28,8]]),
   lane('h2-zone-west','crossAisle',[[73,38.3],[28,38.3]]),
   lane('h2-zone-east','crossAisle',[[28,41.2],[73,41.2]]),
   lane('h2-exit-left','exitAisle',[[28,8],[18,8]]),
   lane('h2-exit-up','exitAisle',[[18,8],[18,0]])
  ],
  walls:[[[0,0],[14,0]],[[23,0],[114,0]],[[114,0],[114,54]],[[114,64],[114,69]],[[114,69],[0,69]],[[0,69],[0,0]]],
  portals:[{key:'entry',side:'east',from:54,to:64,x:114,z:59},{key:'exit',side:'north',from:14,to:23,x:18,z:0}],
  tour:['h2-entry-left','h2-right-up','h2-top-left','h2-centre-down','h2-lower-left','h2-left-up','h2-zone-east','h2-zone-west','h2-exit-left','h2-exit-up']
 }
};
export function lengthOf(points){return points.slice(1).reduce((n,p,i)=>n+Math.hypot(p[0]-points[i][0],p[1]-points[i][1]),0);}
export function sampleLane(points,distance){const total=lengthOf(points);let d=Math.max(0,Math.min(total,distance));for(let i=1;i<points.length;i++){const a=points[i-1],b=points[i],len=Math.hypot(b[0]-a[0],b[1]-a[1]);if(d<=len||i===points.length-1){const f=len?d/len:0;return{x:a[0]+(b[0]-a[0])*f,z:a[1]+(b[1]-a[1])*f,dx:(b[0]-a[0])/len,dz:(b[1]-a[1])/len};}d-=len;}return{x:points[0][0],z:points[0][1],dx:0,dz:-1};}
export const blockers=h=>[...stalls.filter(s=>s.hall===h).map(s=>({...s,key:'stall '+s.n})),...halls[h].facilities.filter(f=>f.blocked!==false)];
export function segmentHitsBox(a,b,r,pad=0){const minX=r.x-pad,maxX=r.x+r.w+pad,minZ=r.z-pad,maxZ=r.z+r.d+pad;if(Math.abs(a[0]-b[0])<1e-6)return a[0]>minX&&a[0]<maxX&&Math.max(a[1],b[1])>minZ&&Math.min(a[1],b[1])<maxZ;if(Math.abs(a[1]-b[1])<1e-6)return a[1]>minZ&&a[1]<maxZ&&Math.max(a[0],b[0])>minX&&Math.min(a[0],b[0])<maxX;throw new Error('Circulation must use straight orthogonal segments');}
export function auditCirculation(){const issues=[];for(const h of[1,2])for(const l of circulation[h].lanes)for(let i=1;i<l.points.length;i++)for(const r of blockers(h))if(segmentHitsBox(l.points[i-1],l.points[i],r,.18))issues.push({hall:h,lane:l.id,blocker:r.key});return issues;}
export function accessPoint(s){const gap=.9;return s.face==='west'?{x:s.x-gap,z:s.z+s.d/2}:s.face==='east'?{x:s.x+s.w+gap,z:s.z+s.d/2}:s.face==='north'?{x:s.x+s.w/2,z:s.z-gap}:{x:s.x+s.w/2,z:s.z+s.d+gap};}
