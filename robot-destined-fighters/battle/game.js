// AURORA VANGUARD - ultimate "PRISM REQUIEM" demo (pass 3: aerial launcher, sky maps, red ultra beam, pilot cut-away).
// ======================= EDIT HERE: dialogue + names =======================
// Dialogue lines are placeholders: replace the strings. '|' splits a line into a normal part and a big yellow shout.
const LINES={wing_open:"THAT DISTANCE?|IT'S NOTHING TO THESE WINGS.",wing_cut:"WINGS OF LIGHT...|BURST!!!",
 fist_open:"NO NEED FOR A BLADE THIS TIME...|FISTS ONLY!",   // attack: fist (IRON KNUCKLE RUSH) opening quote
 beam_open:"TIME TO SWITCH IT UP...|RAIL CANNON, ONLINE!",   // attack: beam opening quote (placeholder)
 beam_cut:"GOT YOUR BACK...|FULL CHARGE!!",
 sword_open:"BLADE, IGNITE...|LET'S DANCE!",   // attack: sword opening quote (placeholder)
 sword_cut:"THIS ENDS...|IN ONE STROKE!!",   // attack: sword cut-in (placeholder)   // attack: beam cut-in (placeholder)
 fist_cut:"HERE COMES|THE BIG ONE!!",                        // attack: fist, Clement cut-in before the flying kick
 open:"JUST LIKE MY FAVORITE ANIME...|PRISM REQUIEM!!",   // opening quote box (Clement portrait)
 cutaway:"THIS ENDS|NOW!!",                               // pilot cut-away panel during the palm-cannon charge
 finish:"CLEMENT: YEAH!!"                                 // under the final title card
};
const NAMES={unit:'DESTINED RED UNIT 01',short:'UNIT 01',pilot:'CLEMENT',enemy:'ENEMY DRONE',attack:'PRISM REQUIEM'};
// UNITS: each unit has its own theme id (music.js THEMES); all of a unit's attacks play cues of that theme.
const UNITS={unit01:{name:'DESTINED RED UNIT 01',short:'UNIT 01',pilot:'CLEMENT',theme:'unit01'}};
// ENEMIES: data-driven target. poses = sprite names; anchors in px above the foot line: cy = body centre, hy = head; half = half width (front edge = x-half).
const ENEMIES={
 drone:{id:'drone',name:'ENEMY DRONE',hud:'ENEMY DRONE',hp:7200,poses:{idle:'didle',hit:'didle',launch:'ddmg',dmg:'ddmg',wreck:'ddmg'},cy:80,hy:150,half:58,shadow:54,size:1,debris:'p',bob:0},
 walker:{id:'walker',name:'GRAVTREAD WALKER',hud:'GRAVTREAD',hp:9600,poses:{idle:'widle',hit:'whit',launch:'wlaunch',dmg:'wdmg',wreck:'wdmg'},cy:62,hy:118,half:78,shadow:80,size:1.15,debris:'g',bob:1}};
// ATTACKS (title selector + ?attack=): ready ones have an implementation below; the rest are reserved slots.
const ATTACK_LIST=[{id:'ultimate',label:'ULTIMATE',name:'PRISM REQUIEM'},{id:'fist',label:'FIST',name:'IRON KNUCKLE RUSH'},{id:'beam',label:'BEAM',name:'CRIMSON RAIL BARRAGE'},{id:'sword',label:'SWORD',name:'SCARLET TEMPEST EDGE'},{id:'wing',label:'WING',name:'WING OF LIGHT BURST'}];
// ===========================================================================
(function(){
const Q0=new URLSearchParams(location.search);const ATK=ATTACK_LIST.some(a=>a.id===Q0.get('attack')&&!a.soon)?Q0.get('attack'):'ultimate',ULT=ATK==='ultimate';
const EN=ENEMIES[Q0.get('enemy')]||ENEMIES.drone,UNIT=UNITS.unit01;NAMES.enemy=EN.hud;
const FIST_END=13.6,BEAM_END=19.066,SWORD_END=19.6,WING_END=22.8;
const W=640,H=360,HY=200,FEET=252,END=ULT?17.0+2.85:ATK==='beam'?BEAM_END:ATK==='sword'?SWORD_END:ATK==='wing'?WING_END:FIST_END;
// HOLDS: insert shots. The main timeline (vt) freezes at v while a real-time insert of length len plays.
const HOLDS=!ULT?[]:[{v:3.3,len:0.6,k:'ots'},{v:3.84,len:0.4,k:'grip'},{v:4.3,len:0.4,k:'visor'},{v:4.3,len:1.45,k:'jump'}];
{let acc=0;for(const h of HOLDS){h.r=h.v+acc;acc+=h.len;}}
const VT=r=>{let acc=0;for(const h of HOLDS){if(r<h.r)return r-acc;if(r<h.r+h.len)return h.v;acc+=h.len;}return r-acc;};
const V2R=v=>v+HOLDS.filter(h=>h.v<v).reduce((a,h)=>a+h.len,0);
const holdAt=r=>{for(const h of HOLDS)if(r>=h.r&&r<h.r+h.len)return {k:h.k,u:(r-h.r)/h.len,s:r-h.r};return null;};
const JH=HOLDS[3]||{r:-99,len:0},J0=JH.r,JL=JH.len;
const Q=new URLSearchParams(location.search),CAPTURE=Q.has('capture'),EMBED=Q.get('embed')==='1';
// PACE: global time scale (?pace=1.5|2). Game time advances DT/PACE per 60fps frame; frame-counted punch (flash, shake decay, impact frame, whip) stays short.
// PASS 3i: per-segment pace curve (default). The jump block (crouch -> leap -> from-below -> camera follow -> sky re-entry,
// RT J0..V2R(4.75)) plays at exactly 1.5x; everything else at PREST, solved so total wall time = TARGET. Linear 0.3 RT ramps sit
// OUTSIDE the jump block so the jump itself is untouched. ?pace=N still forces one uniform factor.
const PACE_Q=parseFloat(Q.get('pace')),PJ=1.5,JA=J0,JB=4.75+HOLDS.reduce((a,h)=>a+h.len,0),RAMP=0.3,TARGET=parseFloat(Q.get('target'))||40;
const PREST=PACE_Q?PACE_Q:(TARGET-PJ*(JB-JA)-2*RAMP*PJ/2)/(END-(JB-JA)-RAMP);
const PAT=r=>{if(!ULT)return 1;if(PACE_Q)return PACE_Q;if(r>=JA&&r<JB)return PJ;const d=r<JA?JA-r:r-JB;return d>=RAMP?PREST:PJ+(PREST-PJ)*(d/RAMP);};
const R2W=r=>{let w=0;const n=Math.ceil(Math.max(0,r)/0.001);const h=r/Math.max(1,n);for(let i=0;i<n;i++)w+=PAT((i+0.5)*h)*h;return w;};
const ENDW=R2W(END),PACE=PACE_Q||ENDW/END;// average, used for music tempo
const SKIES=['day','sunset','night','space'];let SKY_V=SKIES.includes(Q.get('sky'))?Q.get('sky'):'sunset';
const skyBtn=i=>[86+i*120,222,108,26];
const view=document.getElementById('view');view.width=W;view.height=H;const V=view.getContext('2d');V.imageSmoothingEnabled=false;
{const _d=CanvasRenderingContext2D.prototype.drawImage;CanvasRenderingContext2D.prototype.drawImage=function(img,...a){if(img instanceof HTMLImageElement&&(!img.complete||!img.naturalWidth))return;try{return _d.call(this,img,...a);}catch(e){return;}};}
const mk=(w,h)=>{const c=document.createElement('canvas');c.width=w;c.height=h;const x=c.getContext('2d');x.imageSmoothingEnabled=false;return [c,x];};
const [world,WX]=mk(W,H),[fxc,FX]=mk(W,H);const fxImg=FX.createImageData(W,H),fxD=new Uint32Array(fxImg.data.buffer);
const [floorc,FLX]=mk(W,H-HY);const flImg=FLX.createImageData(W,H-HY),flD=new Uint32Array(flImg.data.buffer);
const pack=(r,g,b)=>(255<<24)|(b<<16)|(g<<8)|r;const hx=h=>{const n=parseInt(h.slice(1),16);return [(n>>16)&255,(n>>8)&255,n&255];};
const BAY=window.BAYER;const bay=(x,y)=>BAY[(y&3)*4+(x&3)]/16;
let seed=1;const rnd=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};
const hash=(a,b)=>{let h=(a*374761393+b*668265263)>>>0;h=(h^(h>>>13))*1274126177>>>0;return ((h^(h>>>16))>>>0)/4294967296;};
// ---------- FX plotting ----------
const C={y:[[255,255,255],[255,240,120],[255,170,40]],c:[[255,255,255],[150,250,255],[40,180,240]],o:[[255,250,200],[255,190,60],[230,80,30],[120,30,30]]};
function px(x,y,c){x|=0;y|=0;if(x<0||y<0||x>=W||y>=H)return;fxD[y*W+x]=pack(c[0],c[1],c[2]);}
function disc(x,y,r,c,a=1){const r2=r*r;for(let j=-r|0;j<=r;j++)for(let i=-r|0;i<=r;i++)if(i*i+j*j<=r2&&bay(x+i|0,y+j|0)<a)px(x+i,y+j,c);}
function thickLine(a,b,w,c,al=1){const L=Math.hypot(b[0]-a[0],b[1]-a[1]);for(let s=0;s<=L;s+=0.7){const t=s/L;disc(a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t,w,c,al);}}
function blade(a,b,t){const fl=0.7+0.3*Math.sin(t*50);thickLine(a,b,4.5,[80,170,255],0.45*fl);thickLine(a,b,3,[90,230,255],1);thickLine(a,b,1.6,[210,255,255],1);thickLine(a,b,0.6,[255,255,255],1);}
function beam(x0,y0,t,inten){const th=(11+Math.sin(t*60)*2.5+(Math.floor(t*30)%2)*2)*inten;
 for(let x=x0|0;x<W+40;x++){const wob=Math.sin(x*0.15-t*40)*1.5;
  for(let d=-th*2;d<=th*2;d++){const ad=Math.abs(d+wob)/th;let c=null;
   if(ad<0.35)c=[255,255,255];else if(ad<0.65)c=[190,255,255];else if(ad<1)c=bay(x,y0+d)<0.8?[60,200,255]:[190,255,255];
   else if(ad<1.5&&bay(x,y0+d)<(1.5-ad)*1.6)c=(Math.floor((x+t*400)/20)%3===0)?[255,120,230]:[80,120,255];
   else if(ad<2&&bay(x,y0+d)<(2-ad)*0.5)c=[255,90,200];
   if(c)px(x,y0+d,c);}}
 disc(x0,y0,th*1.8,[150,240,255],0.5);disc(x0,y0,th*1.2,[255,255,255],1);
 for(let i=0;i<6;i++){const rx=(x0+((t*900+i*97)%(W-x0)));px(rx,y0-th*1.8-i%3,[255,255,255]);px(rx+40,y0+th*1.8+i%2,[200,255,255]);}}
// PASS 4e: pixel-art fireball (multi-lobe, banded heat: white core -> yellow -> orange -> red -> dark ember, cools into smoke)
const FBC=[[255,255,236],[255,236,120],[255,176,48],[236,92,36],[170,40,34],[96,30,40]],FBS=[[86,70,78],[62,52,66],[44,38,52]];
function fireball(p,u){if(!p.lobes){let sd=(p.x*73+p.y*131+(p.s*977|0))|0;const r=()=>(sd=(sd*16807+11)%2147483647)/2147483647;p.lobes=[];const n=6+(r()*4|0);
  for(let i=0;i<n;i++){const a=r()*6.28,d=i?0.35+r()*0.5:0;p.lobes.push([Math.cos(a)*d,Math.sin(a)*d*0.8-(i?0.15:0),i?0.45+r()*0.35:0.8,r()*0.25]);}p.seed=sd%997;}
 const grow=1-Math.pow(1-Math.min(1,u*2.4),3),R=(10+30*grow)*p.s,cool=u,rise=u*u*14*p.s,B=Math.ceil(R*1.6),x0=p.x|0,y0=(p.y-rise)|0;
 for(let j=-B;j<=B;j++)for(let i=-B;i<=B;i++){let h=0;for(const L of p.lobes){const lr=R*L[2]*(1+L[3]*Math.sin(u*9+L[0]*5)),dx=i-L[0]*R,dy=j-L[1]*R-(L===p.lobes[0]?0:-rise*0.3),d=Math.sqrt(dx*dx+dy*dy*1.15)/lr;if(d<1)h=Math.max(h,1-d);}
  if(h<=0)continue;const nz=(((i*928371+j*1237+p.seed*31)^((i+j)*5323))&255)/255;h+=(nz-0.5)*0.22;if(h<=0.04)continue;
  // heat bands shift outward-cool with age; the core burns out first
  const k=h*(1.25-cool*1.1);let c;if(k>0.82)c=FBC[0];else if(k>0.64)c=FBC[1];else if(k>0.46)c=FBC[2];else if(k>0.3)c=FBC[3];else if(k>0.16)c=FBC[4];else if(cool<0.55)c=FBC[5];else c=FBS[Math.min(2,(cool-0.55)*6|0)];
  if(cool>0.7&&k<0.3&&nz<(cool-0.7)*3)continue;px(x0+i,y0+j,c);}}
function drawPart(p,ctx){const u=p.age/p.life;
 if(p.k==='spark'){const c=C[p.col||'y'][Math.min(2,u*3|0)];px(p.x,p.y,c);px(p.x-p.vx*0.5,p.y-p.vy*0.5,c);px(p.x-p.vx,p.y-p.vy,C[p.col||'y'][2]);}
 else if(p.k==='boom'){fireball(p,u);}
 else if(p.k==='ring'){const r=(10+u*60)*p.s;for(let a=0;a<6.28;a+=1/r){px(p.x+Math.cos(a)*r,p.y+Math.sin(a)*r*0.7,u<0.5?[255,255,220]:[255,160,60]);}}
 else if(p.k==='smoke'){const rr=p.r*(u<0.6?1:1-(u-0.6)*1.6);if(rr>1){disc(p.x,p.y,rr,u<0.3?[84,58,68]:[60,46,66],1);disc(p.x-rr*0.25,p.y-rr*0.3,rr*0.55,u<0.3?[120,86,92]:[92,76,96],1);}}
 else if(p.k==='debris'){const s=p.sz,c=p.col==='p'?[[60,40,90],[110,80,160],[166,138,216]]:p.col==='g'?[[44,50,30],[86,96,58],[150,150,96]]:[[50,50,60],[100,104,116],[176,180,192]];
  for(let j=-s;j<=s;j++)for(let i=-s;i<=s;i++){const rx=i*Math.cos(p.rot)-j*Math.sin(p.rot),ry=i*Math.sin(p.rot)+j*Math.cos(p.rot);if(Math.abs(rx)<=s&&Math.abs(ry)<=s*0.6)px(p.x+i,p.y+j,ry<-s*0.3?c[2]:ry>s*0.3?c[0]:c[1]);}
  if(p.age<1.2&&p.age%0.1<0.05)px(p.x,p.y-s-1,[255,180,60]);}
 else if(p.k==='flame'){const ft=S.t*8+p.ph;for(let k=0;k<4;k++){const fy=p.y-((ft*6+k*9)%34),rr=7-((ft*6+k*9)%34)/6;if(rr>0)disc(p.x+Math.sin(ft+k)*3,fy,rr,k%2?[255,170,50]:[255,90,30],0.8);}disc(p.x,p.y-3,4,[255,240,160],0.9);}
 else if(p.k==='arc'){const cx=345,cy=FEET-80,r1=70,r2=104;const a0=-2.2,a1=a0+(0.6+u*4)*1;for(let j=-r2;j<=r2;j++)for(let i=-r2;i<=r2;i++){const d=Math.hypot(i,j);if(d<r1||d>r2)continue;let a=Math.atan2(j,i);if(a<a0||a>Math.min(1.2,a1))continue;
   const e=(d-r1)/(r2-r1),fade=1-u;if(bay(cx+i,cy+j)>fade*(1.2-e*0.3))continue;px(cx+i,cy+j,e>0.75?[255,255,255]:e>0.45?[170,250,255]:[60,170,255]);}}
 else if(p.k==='palm'){const pa=S.palm;if(!pa)return;const r=6+u*40;disc(pa[0]+r*0.6,pa[1],r,[90,220,255],1-u);disc(pa[0]+r*0.6,pa[1],r*0.6,[220,255,255],1-u*0.5);disc(pa[0]+r*0.5,pa[1],r*0.3,[255,255,255],1);}}
// boomerang path

// ---- PASS 4f safe-frame: track Unit 01's tight on-world bbox each frame, keep it inside the view and below the HUD ----
let FRB=null,SCRB=null,CF={x:0,y:0,z:1,t:-1};const SBX={};
function sbox(name,m){if(SBX[name])return SBX[name];const sl=window.RDF_SLICE(m.x,m.y);if(!sl||!sl.img.naturalWidth)return null;
 if(!sl.alpha){const c=document.createElement('canvas');c.width=sl.img.naturalWidth;c.height=sl.img.naturalHeight;const x=c.getContext('2d',{willReadFrequently:true});x.drawImage(sl.img,0,0);sl.alpha=x.getImageData(0,0,c.width,c.height);}
 const SA=sl.alpha,ox=m.x-sl.x0,oy=m.y-sl.y0;let x0=1e9,y0=1e9,x1=-1,y1=-1;for(let y=0;y<m.h;y++)for(let x=0;x<m.w;x++)if(SA.data[((oy+y)*SA.width+ox+x)*4+3]>=128){if(x<x0)x0=x;if(x>x1)x1=x;if(y<y0)y0=y;if(y>y1)y1=y;}return SBX[name]=[x0,y0,x1+1,y1+1];}
function fbAdd(name,m,w,T){const b=sbox(name,m);if(!b)return;const bx1=Math.min(b[2],w);for(const[x,y]of[[b[0],b[1]],[bx1,b[1]],[b[0],b[3]],[bx1,b[3]]]){const p=T.transformPoint(new DOMPoint(x-m.ax,y-m.ay));if(!FRB)FRB=[p.x,p.y,p.x,p.y];else{FRB[0]=Math.min(FRB[0],p.x);FRB[1]=Math.min(FRB[1],p.y);FRB[2]=Math.max(FRB[2],p.x);FRB[3]=Math.max(FRB[3],p.y);}}}
const HUDP=[[7,5,258,60],[435,5,198,56]];
function fitRect(b,sx,sy,vw,vh){// minimal shift (then zoom-out) of the view so bbox b sits inside it, below the HUD band where a panel is above it
 const M=6,scr=x=>(x-sx)*W/vw,underHud=HUDP.some(([px,py,pw])=>scr(b[2])>px&&scr(b[0])<px+pw),TOPY=underHud?66:M,bw=b[2]-b[0],bh=b[3]-b[1];
 let s=Math.max(1,(bh/((H-TOPY-M)/H))/vh,(bw/((W-2*M)/W))/vw);s=Math.min(s,W/vw,H/vh);const vw2=vw*s,vh2=vh*s,k=vh2/H;
 let nsx=sx-(vw2-vw)/2,nsy=sy-(vh2-vh)/2;
 if(b[1]<nsy+TOPY*k)nsy=b[1]-TOPY*k;if(b[3]>nsy+vh2-M*k)nsy=b[3]-vh2+M*k;if(b[0]<nsx+M*k)nsx=b[0]-M*k;if(b[2]>nsx+vw2-M*k)nsx=b[2]-vw2+M*k;
 nsx=Math.max(0,Math.min(W-vw2,nsx));nsy=Math.max(0,Math.min(H-vh2,nsy));return [nsx,nsy,vw2,vh2];}
function safeView(sx,sy,vw,vh){// returns adjusted [sx,sy,vw,vh]; idempotent per frame time
 const t=S.t;if(!FRB&&CF.lt===t&&CF.lr){const L=CF.lr;return [L[0]+(sx-L[4]),L[1]+(sy-L[5]),L[2],L[3]];}
 if(CF.lt===t&&CF.p0)Object.assign(CF,CF.p0);else if(CF.t<0||t<CF.t-0.001||t>CF.t+0.5){CF.x=0;CF.y=0;CF.z=1;}
 CF.p0={x:CF.x,y:CF.y,z:CF.z};CF.t=t;const b=FRB;let tx=0,ty=0,tz=1,act=false;
 if(b){const out=Math.max(0,-b[0])+Math.max(0,b[2]-W)+Math.max(0,-b[1])+Math.max(0,b[3]-H);if(out<0.3*Math.max(b[2]-b[0],b[3]-b[1])){act=true;const r=fitRect(b,sx,sy,vw,vh);tz=r[2]/vw;tx=r[0]-(sx-(r[2]-vw)/2);ty=r[1]-(sy-(r[3]-vh)/2);}}
 const e=0.3;CF.x+=(tx-CF.x)*e;CF.y+=(ty-CF.y)*e;CF.z+=(tz-CF.z)*e;
 const vw2=vw*CF.z,vh2=vh*CF.z;let R=[Math.max(0,Math.min(W-vw2,sx-(vw2-vw)/2+CF.x)),Math.max(0,Math.min(H-vh2,sy-(vh2-vh)/2+CF.y)),vw2,vh2];
 if(act)R=fitRect(b,...R);// hard constraint: never let the eased view clip the unit
 const [nsx,nsy,w2,h2]=R;if(b)SCRB=[(b[0]-nsx)*W/w2,(b[1]-nsy)*H/h2,(b[2]-nsx)*W/w2,(b[3]-nsy)*H/h2];else SCRB=null;window.__FB=[b,R,[sx,sy,vw,vh]];FRB=null;CF.lt=t;CF.lr=[nsx,nsy,w2,h2,sx,sy];return R;}
{const od=V.drawImage.bind(V);V.drawImage=function(img,...r){if(img===world&&r.length===8&&!window.__NOSAFE){const[a,b,c,d]=safeView(r[0],r[1],r[2],r[3]);r[0]=a;r[1]=b;r[2]=c;r[3]=d;}if(img===world&&r.length===8&&window.__BL)window.__BL.push([r.slice(),V.getTransform()]);return od(img,...r);};}
// ---------- HUD ----------
function panel(ctx,x,y,w,h){if(window.__PAN&&ctx===V&&ctx.globalAlpha>=0.6)window.__PAN.push([x-1,y-1,w+2,h+2,V.getTransform()]);ctx.fillStyle='#05060c';ctx.fillRect(x-1,y-1,w+2,h+2);ctx.fillStyle='#9aa3bf';ctx.fillRect(x,y,w,h);ctx.fillStyle='#d8deec';ctx.fillRect(x,y,w,1);ctx.fillRect(x,y,1,h);
 ctx.fillStyle='#05060c';ctx.fillRect(x+2,y+2,w-4,h-4);ctx.fillStyle='#101a3c';ctx.fillRect(x+3,y+3,w-6,h-6);ctx.fillStyle='#16224c';ctx.fillRect(x+3,y+3,w-6,2);}
function bar(ctx,x,y,w,v,c1,c2){ctx.fillStyle='#05060c';ctx.fillRect(x-1,y-1,w+2,9);ctx.fillStyle='#c8cede';ctx.fillRect(x,y,w,7);ctx.fillStyle='#1a1424';ctx.fillRect(x+1,y+1,w-2,5);
 const f=Math.round((w-2)*v);ctx.fillStyle=c1;ctx.fillRect(x+1,y+1,f,5);ctx.fillStyle=c2;ctx.fillRect(x+1,y+1,f,2);}
function hud(ctx){const F=window.FONT;const ov=SCRB&&HUDP.some(([px,py,pw,ph])=>SCRB[2]>px&&SCRB[0]<px+pw&&SCRB[1]<py+ph&&SCRB[3]>py);window.__HUDF=!!ov;ctx.save();if(ov)ctx.globalAlpha=0.3;try{hud0(ctx,F);}finally{ctx.restore();}}
function hud0(ctx,F){panel(ctx,8,6,256,58);F.draw(ctx,NAMES.unit,16,12,'#f0f4ff',2);F.draw(ctx,'HP',16,34,'#f0f4ff');F.draw(ctx,'EN',16,48,'#f0f4ff');
 bar(ctx,34,34,110,1,'#d02a34','#ff7868');bar(ctx,34,48,110,S.en/120,'#18b6d8','#8af0ff');F.draw(ctx,'4200/4200',152,34,'#f0f4ff');F.draw(ctx,(S.en|0)+'/120',152,48,'#f0f4ff');
 panel(ctx,436,6,196,54);F.draw(ctx,NAMES.enemy,444,12,'#f0f4ff',2);
 F.draw(ctx,'HP',444,32,'#f0f4ff');bar(ctx,462,32,160,S.hpShow/EN.hp,'#d02a34','#ff7868');const hs=Math.round(S.hpShow)+'/'+EN.hp;F.draw(ctx,hs,622-F.width(hs),44,'#f0f4ff');}
const PORT={small:GEN_IM.port_small,big:GEN_IM.port_shout};
function dialog(ctx,text,t){const dy=Math.round((1-eio(Math.min(1,t/0.22)))*110+eio(Math.max(0,(t-1.92)/0.18))*110);ctx.save();ctx.globalAlpha*=1-eio(Math.max(0,(t-1.92)/0.18));ctx.translate(0,dy);panel(ctx,36,262,568,92);ctx.fillStyle='#05060c';ctx.fillRect(45,267,70,82);ctx.fillStyle='#9aa3bf';ctx.fillRect(46,268,68,80);
 ctx.save();ctx.beginPath();ctx.rect(46,268,68,80);ctx.clip();if(PORT.small.complete){const b=Math.round(Math.sin(t*5)*1),z=Math.sin(t*3.5)>0.6?1:0;ctx.drawImage(PORT.small,48-z,269+b-z,64+2*z,78+2*z);}ctx.restore();
 const n=Math.floor(t*30);const s=text.slice(0,n);window.FONT.draw(ctx,NAMES.pilot,132,270,'#8af0ff',1);const parts=s.split('|');window.FONT.draw(ctx,parts[0],132,284,'#f0f4ff',2);if(parts[1]!==undefined)window.FONT.draw(ctx,parts[1],132,312,'#ffe070',3);
 if(n>=text.length&&Math.floor(t*3)%2)ctx.fillStyle='#f0f4ff',ctx.fillRect(584,336,9,2),ctx.fillRect(586,338,5,2),ctx.fillRect(588,340,1,1);ctx.restore();}
// ---------- timeline (pass 3: aerial ultimate) ----------
const ease=u=>1-Math.pow(1-Math.min(1,Math.max(0,u)),3);
function track(K,t){let i=0;while(i<K.length-2&&t>=K[i+1][0])i++;const a=K[i],b=K[i+1];const u=b[0]>a[0]?ease((t-a[0])/(b[0]-a[0])):1;return a.slice(1).map((v,k)=>v+(b[k+1]-v)*u);}
function stepT(K,t){let v=K[0][1];for(const k of K)if(t>=k[0])v=k[1];return v;}
// mech feet position + rotation
const MK=[[0,150,252,0],[3.4,150,252,0],[3.72,380,252,0],[3.9,392,252,0],[4.2999,392,252,0],[4.3,380,70,0],[4.75,262,182,0],[5.02,220,232,0],
 [5.22,395,200,0.1],[5.42,330,150,-0.1],[5.58,410,148,0.1],[5.78,340,240,0],[5.94,405,196,0.1],[6.3,190,236,0],[9.1,190,236,0],[9.38,360,226,0],[12.7,360,226,0],[13.05,215,300,0],[99,215,300,0]];
const MPOSE=[[0,'idle'],[2.45,'boost'],[3.4,'dash'],[3.62,'wind2'],[3.76,'s_rmid'],[3.86,'up'],[4.0,'follow'],[4.3,'fly'],[5.02,'hover'],[5.08,'s_bwind'],[5.13,'s_cmid'],[5.17,'up'],[5.27,'follow'],[5.38,'s_hfol'],[5.5,'s_bwind'],[5.54,'s_hmid'],[5.6,'s_hfol'],[5.68,'hover'],[5.8,'s_bwind'],[5.85,'s_cmid'],[5.89,'up'],[5.99,'follow'],[6.1,'s_low'],[6.18,'hover'],[6.3,'crouch'],[6.37,'hero'],[6.72,'cannon2'],[7.6,'f_brace'],[9.1,'fly'],[9.36,'f_palm'],[11.6,'hover'],[13.05,'hero2']];
// enemy feet position + spin
const EK=[[0,480,252,0],[3.88,480,252,0],[4.3,520,-140,7],[4.75,470,-40,9],[5.15,470,212,12.57],[5.22,470,212,12.57],[5.4,505,178,12.2],[5.58,505,178,12.2],[5.75,495,160,12.9],[5.94,495,160,12.9],[6.3,478,210,12.57],
 [7.75,478,210,12.57],[9.1,500,214,12.4],[9.4,480,218,12.57],[11.3,480,218,12.57],[11.6,520,190,12.0],[99,520,190,12.0]];
const RISE0=4.3001,RISE1=4.75,AIR=RISE1;
const EV=[[0.25,'dlg'],[2.45,'wings'],[3.4,'dash'],[3.9,'launch'],[4.15,'rise'],[5.0,'fly'],[5.22,'air1'],[5.58,'air2'],[5.94,'air3'],[6.3,'xstart'],[6.72,'xclick'],[6.85,'xclick'],[6.98,'xclick'],[7.12,'xlock'],
 [7.4,'charge'],[7.75,'beam'],[9.1,'dash2'],[9.42,'pcharge'],[9.8,'cutface'],[10.5,'eyezoom'],[10.85,'eyestrip'],[11.25,'cutback'],[11.3,'palm'],
 [11.5,'ex1'],[11.75,'ex2'],[12.0,'ex3'],[12.25,'ex4'],[12.6,'ex5'],[13.05,'hero']];
const SFX={ots:['hum'],grip:['click','clunk'],visor:['sting'],below:['whoosh'],xcut:['zing'],crouch:['clunk'],leap:['launch','whoosh'],dlg:['blip'],wings:['wing'],dash:['boost'],launch:['slash','launch'],rise:['whoosh'],fly:['boost'],air1:['airhit'],air2:['airhit'],air3:['airhit'],xstart:['xhum'],xclick:['click'],xlock:['clunk'],
 charge:['rcharge'],beam:['roar'],dash2:['boost'],pcharge:['pcharge'],cutface:['cut'],eyezoom:['sting'],eyestrip:['zing'],cutback:['snap'],palm:['palm'],ex1:['boom'],ex2:['boom'],ex3:['boom'],ex4:['boom'],ex5:['boom','boom'],hero:['hero']};
const DMS=EN.hp/7200,DMG={launch:1200*DMS|0,air:350*DMS|0,beam:200*DMS|0,palm:1500*DMS|0,ex:150*DMS|0};const TOTAL=Math.round(12000*DMS/10)*10;// overkill total (HP bar still stops at 0)
// ---------- state ----------
let S;function reset(){S={t:0,fired:0,parts:[],nums:[],shake:0,flash:0,hp:EN.hp,hpShow:EN.hp,en:120,dealt:0,after:[],scroll:0,vscroll:0,ehit:0,edmg:false,edead:false,started:false,done:false,mute:false};seed=99;}
reset();
let ENX=480,ENY=172;// enemy centre, updated every step
function spawn(o){S.parts.push(Object.assign({age:0,life:1},o));}
function sparks(x,y,n,col,sp=4){for(let i=0;i<n;i++){const a=rnd()*Math.PI*2,v=sp*(0.5+rnd());spawn({k:'spark',x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-1,life:0.3+rnd()*0.4,col});}}
function explode(x,y,s){s*=1.4;spawn({k:'boom',x,y,r:0,s,life:0.75});
 for(let i=0;i<3;i++){const a=rnd()*6.28;spawn({k:'boom',x:x+Math.cos(a)*16*s,y:y+Math.sin(a)*10*s,r:0,s:s*(0.4+rnd()*0.25),life:0.5+rnd()*0.25});}
 spawn({k:'ring',x,y,s,life:0.4});spawn({k:'ring',x,y,s:s*0.6,life:0.25});sparks(x,y,22*s,'y',6*s);
 for(let i=0;i<8*s;i++)spawn({k:'debris',x,y,vx:(rnd()-0.5)*7,vy:-3-rnd()*5,rot:rnd()*6,vr:(rnd()-0.5)*0.6,sz:2+rnd()*4|0,col:rnd()<0.5?EN.debris:'q',life:3});
 for(let i=0;i<7*s;i++)spawn({k:'smoke',x:x+(rnd()-0.5)*34*s,y:y+(rnd()-0.5)*20-6*s,vx:(rnd()-0.5)*0.5,vy:-0.5-rnd()*0.6,r:6+rnd()*8*s,life:1.6+rnd()});
 S.shake=Math.max(S.shake,6*s);}
function damage(n,x,y,big){S.hp=Math.max(0,S.hp-n);S.dealt+=n;S.nums.push({n,x,y,age:0,big});S.ehit=0.25;}
const snd=n=>{if(!S.mute)((ULT?SFX:CUR.SFX)[n]||[]).forEach(s=>AUD.sfx(s));};
function fire(name){const ex=ENX,ey=ENY,ES=EN.size;snd(name);
 switch(name){case 'wings':S.en-=10;break;
 case 'launch':S.flash=3;S.shake=10;damage(DMG.launch,ex-10,ey-60,1);sparks(ex-20,ey+20,36,'c',7);S.edmg=true;spawn({k:'rarc',x:MX+30,y:MY-90,life:0.5});
  for(let i=0;i<6;i++)spawn({k:'debris',x:ex,y:ey+40,vx:(rnd()-0.5)*6,vy:-6-rnd()*4,rot:0,vr:0.3,sz:3,col:'q',life:1.5});break;
 case 'air1':case 'air2':case 'air3':S.shake=6;damage(DMG.air,ex-20,ey-50);sparks(ex-30,ey,22,'c',6);spawn({k:'xslash',x:ex-20,y:ey,a:name==='air2'?-0.6:0.6,life:0.3});break;
 case 'xstart':S.en-=20;break;case 'xlock':sparks(MX+60,MY-110,20,'c',4);break;
 case 'charge':S.en-=50;break;case 'beam':S.flash=2;S.shake=12;break;
 case 'palm':S.en-=10;S.flash=3;S.shake=12;damage(DMG.palm,ex-10,ey-40,1);spawn({k:'palm',x:0,y:0,life:0.5});sparks(ex-30,ey,30,'r',7);break;
 case 'ex1':explode(ex-20*ES,ey-10*ES,1*ES);damage(DMG.ex,ex-20,ey-50);break;case 'ex2':explode(ex+25*ES,ey-40*ES,1*ES);damage(DMG.ex,ex+25,ey-80);break;
 case 'ex3':explode(ex-5*ES,ey+25*ES,1.2*ES);damage(DMG.ex,ex,ey-20);break;case 'ex4':explode(ex+20*ES,ey,1.3*ES);damage(DMG.ex,ex+20,ey-40);break;
 case 'ex5':explode(ex,ey,2.4*ES);S.flash=5;damage(Math.max(S.hp,TOTAL-S.dealt),ex,ey-80,1);S.edead=true;S.shake=16;
  for(let i=0;i<40;i++)spawn({k:'debris',x:ex+(rnd()-0.5)*80,y:ey+(rnd()-0.5)*60,vx:(rnd()-0.5)*9,vy:-7*rnd()-1,rot:rnd()*6,vr:(rnd()-0.5)*0.6,sz:2+rnd()*5|0,col:rnd()<0.5?EN.debris:'q',life:4});break;}}
const DT=1/60;let GDT=1/60/PAT(0);let MX=150,MY=252,MR=0,EX0=480,EY0=252,ER=0;
let EFY=252;function stepPos(t){[MX,MY,MR]=track(MK,t);[EX0,EY0,ER]=track(EK,t);ENX=EX0;const air=t>=4.3;ENY=air?EY0-80:EY0-EN.cy;const ayo=85*Math.min(Math.max(0,Math.min(1,(t-5.0)/0.22)),Math.max(0,Math.min(1,(6.3-t)/0.2)));MY+=ayo;ENY+=ayo;EFY=ENY+EN.cy;}// PASS 4g: air-combo framing offset
function step(){if(!S.started)return;GDT=1/60/PAT(S.t);const DT=GDT;const RT=S.t,t=VT(RT);if(!ULT){CUR.step(t,DT);commonStep(DT,false);S.t+=DT;if(S.t>=END&&!S.done)S.done=true;return;}jumpStep(RT);if(t>=RISE0&&!S.airClr){S.airClr=1;S.parts=S.parts.filter(p=>p.k!=='smoke'&&p.k!=='shock'&&p.k!=='debris');}if(t<RISE0)S.airClr=0;stepPos(t);
 while(S.fired<EV.length&&EV[S.fired][0]<=t){fire(EV[S.fired][1]);S.fired++;}
 if(t>7.8&&t<9.05){const k=Math.floor((t-7.8)*10),k0=Math.floor((t-DT-7.8)*10);if(k!==k0&&k<12){damage(DMG.beam,ENX-20+(rnd()-0.5)*40,ENY-60+(rnd()*30),1);sparks(ENX-40,ENY+(rnd()-0.5)*30,8,'r',6);}S.shake=Math.max(S.shake,7);}
 if(t>7.75&&t<8.15&&Math.floor(t*60)%3===0)for(let i=0;i<2;i++)spawn({k:'smoke',x:MX-20+(rnd()-0.5)*30,y:FEET-2,vx:-1.5-rnd()*2,vy:-rnd()*0.8,life:0.6,r:3+rnd()*4});
 if(t>8.82&&t<9.15&&Math.floor(t*60)%2===0){const mm=SM[curPose(t)]||SM.idle;beamDust(MX+mm.rx-mm.ax,MY+mm.ry-mm.ay,Math.min(W-24,ENX+(EN.half||60)+46),22,'r');}
 if(t>9.42&&t<11.3&&Math.floor(t*30)%2===0)spawn({k:'mote',x:MX+M_RX()+(rnd()-0.5)*60,y:MY+M_RY()+(rnd()-0.5)*60,tx:MX+M_RX(),ty:MY+M_RY(),life:0.3});
 if(t>6.3&&t<7.15&&Math.floor(t*60)%2===0)spawn({k:'mote',x:MX+(rnd()-0.3)*120,y:MY-120+(rnd()-0.5)*90,tx:MX+20,ty:MY-110,life:0.35,c:'c'});
 if(t>13.05&&Math.floor(t*60)%2===0){spawn({k:'light',x:MX-90+rnd()*150,y:MY-190+rnd()*120,vy:-0.4-rnd()*0.8,life:1.2});}
 commonStep(DT,t>=RISE0);
 let spd=8,vs=0;if(t>3.4&&t<3.75||t>9.1&&t<9.4)spd=1500;else if(t>=AIR&&t<13.05)spd=t>7.75&&t<9.1?120:700;else if(t>=13.05)spd=60;
 if(t>=AIR&&t<13.05)vs=t<6.3?260:40;S.scroll+=spd*DT;S.vscroll+=vs*DT;S.t+=DT;if(S.t>=END&&!S.done)S.done=true;}
function commonStep(DT,air){const ps=[];for(const p of S.parts){p.age+=DT;if(p.age>p.life)continue;
  if(p.k==='spark'||p.k==='debris'){p.x+=p.vx;p.y+=p.vy;p.vy+=p.k==='spark'?0.15:0.22;if(p.k==='debris'){p.rot+=p.vr;if(!air&&p.y>FEET+4){p.y=FEET+4;p.vy*=-0.35;p.vx*=0.6;}}}
  if(p.k==='smoke'){p.x+=p.vx;p.y+=p.vy;p.r+=0.15;}if(p.k==='light')p.y+=p.vy;
  if(p.k==='mote'){p.x+=(p.tx-p.x)*0.2;p.y+=(p.ty-p.y)*0.2;}
  ps.push(p);}S.parts=ps;
 for(const n of S.nums)n.age+=DT;S.nums=S.nums.filter(n=>n.age<1.3);
 S.hpShow+=(S.hp-S.hpShow)*0.12;if(Math.abs(S.hp-S.hpShow)<1)S.hpShow=S.hp;
 S.shake*=0.86;if(S.shake<0.3)S.shake=0;if(S.flash>0)S.flash--;S.ehit=Math.max(0,S.ehit-DT);}
// ---------- jump (crouch -> leap with wing flare + ground shockwave -> out of frame top) ----------
function jumpState(RT){if(RT>=HOLDS[2].r&&RT<J0)return {p:"idle",x:392,y:254,u:0};if(RT<J0||RT>=J0+JL)return null;const u=RT-J0;
 if(u<0.2)return {p:'crouch',x:392,y:252+(u<0.05?u*40:2),u};
 const w=u-0.2;const y=w<0.5?340-ease(w/0.5)*80:260-Math.pow(Math.min(1,(w-0.5)/0.45),1.6)*225;return {p:'leap',x:392-Math.min(1,w/0.95)*20,y,u};}
let jumpFired=0;
function jumpStep(RT){if(RT<J0){jumpFired=0;return;}const u=RT-J0;
 if(jumpFired===0&&u>=0){jumpFired=1;snd('crouch');}
 if(jumpFired===1&&u>=0.2){jumpFired=2;snd('leap');S.shake=Math.max(S.shake,9);S.flash=1;
  spawn({k:'shock',x:392,y:FEET,life:0.55});for(let i=0;i<46;i++){const dir=rnd()<0.5?-1:1;spawn({k:'smoke',x:392+dir*rnd()*40,y:FEET-2-rnd()*8,vx:dir*(1.5+rnd()*4),vy:-0.3-rnd()*1.2,r:4+rnd()*7,life:0.8+rnd()*0.6});}
  for(let i=0;i<14;i++)spawn({k:'debris',x:392+(rnd()-0.5)*60,y:FEET,vx:(rnd()-0.5)*8,vy:-4-rnd()*5,rot:rnd()*6,vr:0.4,sz:2+rnd()*3|0,col:'q',life:1.4});}
 if(u>0.2&&u<JL&&Math.floor(RT*60)%2===0){const J=jumpState(RT);if(J)spawn({k:'spark',x:J.x-6+(rnd()-0.5)*20,y:J.y+(rnd()*10),vx:(rnd()-0.5)*2,vy:3+rnd()*3,life:0.3,col:'y'});}}
// ---------- sprites ----------
const SM=window.SPRMETA,GI=window.GEN_IM;
// weapon masks per pose, sprite-local pixel coords (sword blade+hilt / cannon barrel)
const WPN={hero:{poly:[[0,2],[22,0],[70,62],[86,80],[80,98],[62,93],[48,72]],hilt:[80,96]},cannon2:{poly:[[66,78],[120,73],[187,89],[187,121],[120,117],[90,113],[66,105]],hilt:[72,92]}};
function wpnPath(ctx,m,w){ctx.beginPath();w.poly.forEach(([a,b],i)=>i?ctx.lineTo(a-m.ax,b-m.ay):ctx.moveTo(a-m.ax,b-m.ay));ctx.closePath();}
// white weapon silhouette: alpha a, grow = fraction unfolded from the hilt along the barrel, shrink = remaining sword radius from hilt
function wpnLayer(ctx,name,x,y,a,grow=1,shrink=1){const m=SM[name],w=WPN[name];if(a<=0||(NOMECH&&MAINM))return;const hx=w.hilt[0]-m.ax,hy=w.hilt[1]-m.ay;
 ctx.save();ctx.translate(Math.round(x),Math.round(y));
 ctx.globalCompositeOperation='lighter';const pts=w.poly;for(let i=0;i<pts.length;i+=2){const gx=pts[i][0]-m.ax,gy=pts[i][1]-m.ay;const k=Math.hypot(gx-hx,gy-hy)/130;if(k<=Math.max(grow===1?shrink:grow,0.05)){ctx.globalAlpha=0.22*a;ctx.fillStyle='#cfefff';ctx.beginPath();ctx.arc(gx,gy,16,0,7);ctx.fill();}}
 ctx.globalCompositeOperation='source-over';wpnPath(ctx,m,w);ctx.clip();
 const L=grow*130,R2=shrink*130;ctx.beginPath();if(name==='cannon2')ctx.rect(hx-10,-m.ay,L+10,m.h);else ctx.arc(hx,hy,Math.max(1,R2),0,7);ctx.clip();
 ctx.globalAlpha=a;window.RDF_DRAW(ctx,'#ffffff',m.x,m.y,m.w,m.h,-m.ax,-m.ay,m.w,m.h);ctx.restore();}
// canonical sword layer (pass 3h): one sword drawn at each pose's hand anchor from pre-rotated crisp frames
let SWOFF=0;// PASS 4h: eased in-between sword angle offset (ultimate swings)
function ultSwingA(t,pn){if(!(t>3.45&&t<4.3||t>4.95&&t<6.3)||!window.SWPOSE)return 0;const PA=n=>{const P=SWPOSE.poses[n==='dash'?'boost':n];return P?P.a:0;},wr=d=>((d+540)%360)-180;
 let k=0;while(k<MPOSE.length-1&&t>=MPOSE[k+1][0])k++;const cur=PA(pn),bo=x=>{const c1=1.2,c3=c1+1;return 1+c3*Math.pow(x-1,3)+c1*Math.pow(x-1,2);};
 const nx=MPOSE[k+1],pv=MPOSE[k];if(nx){const lead=Math.min(0.09,(nx[0]-pv[0])*0.45);if(t>nx[0]-lead){const u=(t-(nx[0]-lead))/(lead+0.06);return wr(PA(nx[1])-cur)*(bo(Math.min(1,u))-1)+wr(PA(nx[1])-cur);}}
 if(k>0){const pr=MPOSE[k-1];const u=(t-pv[0]+Math.min(0.09,(pv[0]-pr[0])*0.45))/(Math.min(0.09,(pv[0]-pr[0])*0.45)+0.06);if(u<1)return wr(PA(pr[1])-cur)*(1-bo(u))*-1*-1;}return 0;}
function drawSword(ctx,pose,x,y,rot,part,tint=null,alpha=1,clipR=0){const P=window.SWPOSE&&SWPOSE.poses[pose],m=SM[pose];if(!P||!m||alpha<=0||(NOMECH&&MAINM))return;
 const lx=P.h[0]-m.ax,ly=P.h[1]-m.ay,c=Math.cos(rot),s=Math.sin(rot),hx=x+lx*c-ly*s,hy=y+lx*s+ly*c;
 const st=360/SWPOSE.n,k=((Math.round((P.a+SWOFF+rot*180/Math.PI)/st)%SWPOSE.n)+SWPOSE.n)%SWPOSE.n;
 if(clipR>0){ctx.save();ctx.beginPath();ctx.arc(Math.round(hx),Math.round(hy),clipR,0,7);ctx.clip();}
 spr(ctx,part+'_'+k,hx,hy,0,tint,alpha);if(clipR>0)ctx.restore();return [hx,hy,((P.a+SWOFF)*Math.PI/180)+rot];}
// PASS 4h: blade-tip smear (crescent that follows the real tip path, fades over ~4 frames)
const TIPH=[];function tipPush(t,hx,hy,ang,L,k=1){if(TIPH.length&&(t<TIPH[TIPH.length-1].t-1e-6||t-TIPH[TIPH.length-1].t>0.2))TIPH.length=0;if(TIPH.length&&Math.abs(t-TIPH[TIPH.length-1].t)<1e-6)TIPH.pop();TIPH.push({t,hx,hy,ang,L,k});while(TIPH.length>14)TIPH.shift();}
function tipSmear(ctx,t,life=0.13,minDa=0.06){const w=a=>Math.atan2(Math.sin(a),Math.cos(a));
 for(let j=0;j<TIPH.length-1;j++){const a=TIPH[j],b=TIPH[j+1],age=t-b.t;if(age>life||age<-1e-6)continue;const da=w(b.ang-a.ang);if(Math.abs(da)<minDa)continue;
  const n=Math.max(2,Math.ceil(Math.abs(da)/0.08)),f=(1-age/life)*(b.k??1);const P=[],Q=[];
  for(let k=0;k<=n;k++){const u=k/n,an=a.ang+da*u,hx=a.hx+(b.hx-a.hx)*u,hy=a.hy+(b.hy-a.hy)*u,L=a.L+(b.L-a.L)*u;P.push([hx+Math.cos(an)*L*1.04,hy+Math.sin(an)*L*1.04]);Q.push([hx+Math.cos(an)*L*0.38,hy+Math.sin(an)*L*0.46]);}
  const poly=(o,i,c)=>{ctx.fillStyle=c;ctx.beginPath();o.forEach((p,k)=>k?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]));for(let k=i.length-1;k>=0;k--)ctx.lineTo(i[k][0],i[k][1]);ctx.closePath();ctx.fill();};
  const R=Q.map((q,k)=>[q[0]+(P[k][0]-q[0])*0.8,q[1]+(P[k][1]-q[1])*0.8]),E=Q.map((q,k)=>[q[0]+(P[k][0]-q[0])*0.93,q[1]+(P[k][1]-q[1])*0.93]);
  poly(P,Q,`rgba(220,30,64,${0.34*f})`);poly(P,R,`rgba(255,120,150,${0.55*f})`);poly(P,E,`rgba(255,236,242,${0.9*f})`);}}
function swordAround(ctx,pose,x,y,rot,body,tint=null,alpha=1){drawSword(ctx,pose,x,y,rot,'swA',tint,alpha);body();return drawSword(ctx,pose,x,y,rot,'swB',tint,alpha);}
let NOMECH=0,MAINM=0;function spr(ctx,name,x,y,rot=0,tint=null,alpha=1,clip=null,cut=null){const m=SM[name];if(!m||(NOMECH&&MAINM))return;ctx.save();ctx.globalAlpha=alpha;ctx.translate(Math.round(x),Math.round(y));if(rot)ctx.rotate(rot);
 if(cut){ctx.beginPath();ctx.rect(-m.ax-2,-m.ay-2,m.w+4,m.h+4);cut.poly.forEach(([a,b],i)=>i?ctx.lineTo(a-m.ax,b-m.ay):ctx.moveTo(a-m.ax,b-m.ay));ctx.closePath();ctx.clip('evenodd');}
 const w=clip?Math.max(1,Math.round(m.w*clip)):m.w;window.RDF_DRAW(ctx,tint,m.x,m.y,w,m.h,-m.ax,-m.ay,w,m.h);if(MAINM&&!NOMECH&&ctx===WX&&alpha>=0.95)fbAdd(name,m,w,ctx.getTransform());if(window.__REC&&MAINM&&!NOMECH)window.__REC.push({name,c:ctx===WX?'w':ctx===V?'v':'o',T:ctx.getTransform(),w,cut:!!cut,al:ctx.globalAlpha});ctx.restore();}
// enemy hit flash (4b): white rim behind + ~42% additive tint; shape/colours stay readable
function espr(ctx,name,x,y,fl){if(fl){for(const[dx,dy]of[[-2,0],[2,0],[0,-2],[0,2]])spr(ctx,name,x+dx,y+dy,0,'#ffe6dc',0.5);}spr(ctx,name,x,y);if(fl){ctx.save();ctx.globalCompositeOperation='lighter';spr(ctx,name,x,y,0,'#ff9a88',0.12);ctx.restore();}}
const curPose=t=>stepT(MPOSE,t);const M_RX=()=>{const m=SM[curPose(S.t)]||SM.idle;return m.rx-m.ax;},M_RY=()=>{const m=SM[curPose(S.t)]||SM.idle;return m.ry-m.ay;};
// ---------- backgrounds ----------
const [gc,GX]=mk(W,H);
const TINT={day:'rgba(150,175,215,0.38)',sunset:null,night:'rgba(16,26,70,0.62)',space:'rgba(36,20,64,0.6)'};
const GF={};function gfloor(k){const im=GI['gcity_'+k];const c=document.createElement('canvas');c.width=1280;c.height=360-HY+6;if(im&&im.naturalWidth)c.getContext('2d').drawImage(im,0,-(HY-6));return c;}
function fallbackSky(ctx,oy){const g=ctx.createLinearGradient(0,oy,0,oy+220);g.addColorStop(0,'#241028');g.addColorStop(0.45,'#c45a28');g.addColorStop(1,'#e8a060');ctx.fillStyle=g;ctx.fillRect(0,oy,W,220);ctx.fillStyle='#3a3238';ctx.fillRect(0,oy+200,W,H);}
function groundScene(ctx,oy,sc){const sk=SKY_V;if(sk!=='sunset'&&!GF[sk]&&GI['gcity_'+sk]&&GI['gcity_'+sk].naturalWidth)GF[sk]=gfloor(sk);
 if(sk==='sunset'){if(!(GI.sky&&GI.sky.naturalWidth)){fallbackSky(ctx,oy);return;}ctx.drawImage(GI.sky,0,oy);const sx=330,sy=150+oy;ctx.fillStyle='rgba(255,180,110,0.25)';ctx.beginPath();ctx.arc(sx,sy,34,0,7);ctx.fill();ctx.fillStyle='#ffc070';ctx.beginPath();ctx.arc(sx,sy,20,0,7);ctx.fill();ctx.fillStyle='#fff0c0';ctx.beginPath();ctx.arc(sx,sy,15,0,7);ctx.fill();for(let i=0;i<4;i++){ctx.fillStyle='#e07050';ctx.fillRect(sx-24,sy-6+i*5,48,1);}}
 const CI=sk==='sunset'?GI.city:GI['gcity_'+sk];
 GX.clearRect(0,0,W,H);if(!(CI&&CI.naturalWidth)){ctx.fillStyle='#2a2428';ctx.fillRect(0,oy+190,W,H);return;}const o=((-Math.round(sc*0.25))%1280+1280)%1280;GX.drawImage(CI,-o,0);GX.drawImage(CI,1280-o,0);
 const fl=sk==='sunset'?GI.floor:GF[sk];if(!(fl&&fl.height)){ctx.drawImage(gc,0,oy);return;}const fh=fl.height,y0=HY-6;for(let y=0;y<fh;y++){const k=0.3+1.7*(y/fh);const oo=((Math.round(sc*k))%1280+1280)%1280;const w1=Math.min(1280-oo,W);GX.drawImage(fl,oo,y,w1,1,0,y0+y,w1,1);if(w1<W)GX.drawImage(fl,0,y,W-w1,1,w1,y0+y,W-w1,1);}
 if(false&&TINT[sk]){GX.globalCompositeOperation='source-atop';GX.fillStyle=TINT[sk];GX.fillRect(0,0,W,H);GX.globalCompositeOperation='source-over';}
 ctx.drawImage(gc,0,oy);}
function airScene(ctx,oy,sc,vs){const far=GI['sky_'+SKY_V],near=GI['near_'+SKY_V];
 if(!(far&&far.naturalWidth)){fallbackSky(ctx,oy);return;}
 const fo=((Math.round(sc*0.15))%1280+1280)%1280,fv=((Math.round(vs*0.3+oy))%720+720)%720;
 for(const dy of [fv-720,fv]){ctx.drawImage(far,-fo,dy);ctx.drawImage(far,1280-fo,dy);}
 const no=((Math.round(sc*0.6))%1920+1920)%1920,nv=((Math.round(vs*0.9+oy*1.4))%1080+1080)%1080;ctx.globalAlpha=0.55;
 if(near&&near.naturalWidth)for(const dy of [nv-1080,nv]){ctx.drawImage(near,-no,dy-90);ctx.drawImage(near,1920-no,dy-90);}ctx.globalAlpha=1;}
// ---------- extra FX ----------
// PASS 4h: layered anime beam (pixel fx buffer). x0=muzzle, xh=head (rounded energy head), dir=+-1. o.fade 0..1 tapers + dissolves; o.tail trims the back end.
const BPAL={r:{core:[255,255,255],hot:[255,236,220],body:[230,24,44],body2:[255,90,80],rim:[150,8,28],glow:[255,100,40],glow2:[255,200,80],hx:[255,210,220],ca:[120,240,255],cb:[255,40,90]},
 c:{core:[255,255,255],hot:[220,252,255],body:[40,140,255],body2:[110,220,255],rim:[20,40,170],glow:[60,120,255],glow2:[170,240,255],hx:[220,250,255],ca:[255,90,140],cb:[90,255,255]}};
function wingTrail(ctx,x,y,dir,t,a=1,len=150){if(a<=0.02)return;ctx.save();ctx.globalCompositeOperation='lighter';for(let i=0;i<7;i++){const L=len*(0.5+0.5*((i*37+Math.floor(t*30)*11)%10)/10),yy=Math.round(y+i*7-18+Math.sin(t*20+i)*2),x0=Math.round(x-dir*L);
 ctx.fillStyle=`rgba(${i%2?150:255},${i%2?235:80},${i%2?255:110},${0.32*a})`;ctx.fillRect(Math.min(x0,x),yy,Math.abs(L),i%3?1:2);ctx.fillStyle=`rgba(230,250,255,${0.55*a})`;ctx.fillRect(Math.min(x-dir*L*0.25,x),yy,Math.round(L*0.25),1);}ctx.restore();}
function starFlare(x,y,r,col,t,a=1){const P=BPAL[col]||BPAL.r,L=r*4.2*(0.85+0.15*Math.sin(t*50));disc(x,y,r*1.5,P.glow,0.5*a);disc(x,y,r,P.hot,0.95*a);disc(x,y,r*0.55,P.core,a);
 for(const [dx,dy,k] of [[1,0,1],[0,1,0.6],[0.707,0.707,0.42],[0.707,-0.707,0.42]])for(let d=r*0.6;d<L*k;d++){const f=1-d/(L*k);if(bay(x+dx*d|0,y+dy*d|0)>f*1.6*a)continue;const c=f>0.5?P.core:P.hx;px(x+dx*d,y+dy*d,c);px(x-dx*d,y-dy*d,c);}}
function epicBeam(x0,y0,xh,t,th,o={}){const P=BPAL[o.col||'r'],dir=xh>=x0?1:-1,fade=o.fade||0,len=Math.abs(xh-x0),tail=o.tail||0;if(len<2)return;
 const T=th*Math.pow(1-fade,0.7);const fr=Math.floor(t*30)%2;
 for(let k=Math.round(tail);k<=len;k++){const x=Math.round(x0+dir*k);if(x<-4||x>W+4)continue;
  const hd=len-k,head=hd<th*1.2?Math.sqrt(Math.max(0,1-Math.pow(1-hd/(th*1.2),2))):1,tl=k-tail<th*0.8?Math.sqrt(Math.max(0,(k-tail)/(th*0.8))):1,
   pul=1+0.13*Math.sin(t*42-k*0.06)+0.06*Math.sin(t*90+k*0.2),tk=T*pul*Math.max(0.12,Math.min(head,tl))*(o.taper?1-0.35*k/len:1);if(tk<0.4)continue;
  const wob=Math.sin(k*0.09-t*45)*Math.min(2.5,tk*0.1);
  for(let d=-tk*2.2|0;d<=tk*2.2;d++){const ad=Math.abs(d+wob)/tk,b=bay(x,y0+d);let c=null;
   if(fade>0&&b<fade*0.9&&ad>0.3)continue;// dissolve
   if(ad<0.26+0.06*fr)c=P.core;else if(ad<0.45)c=b<0.6?P.hot:P.body2;else if(ad<0.85)c=b<0.85?P.body:P.body2;else if(ad<1.02)c=P.rim;
   else if(ad<1.6&&b<(1.6-ad)*1.3*(1-fade))c=(Math.floor((k-t*600)/24)%3===0)?P.glow2:P.glow;else if(ad<2.2&&b<(2.2-ad)*0.4*(1-fade))c=P.rim;
   if(c)px(x,y0+d,c);}
  if(fr&&tk>3){px(x,y0-Math.round(tk*1.05)-1,P.ca);px(x,y0+Math.round(tk*1.05)+1,P.cb);}// chromatic fringe flicker
  // helix strands
  for(const ph of [0,Math.PI]){const hy=y0+Math.sin(k*0.075-t*38+ph)*tk*1.35;if(Math.cos(k*0.075-t*38+ph)>-0.2||tk<5)continue;px(x,hy,P.hx);px(x,hy+1,P.hot);}}
 // shockwave rings travelling along the beam
 if(th>4&&fade<0.8)for(let r=0;r<6;r++){const k=((t*380+r*90)%Math.max(60,len));if(k<tail+20||k>len-th)continue;const x=x0+dir*k,R=T*(1.7+0.4*((t*380+r*90)%90)/90),q=1-fade;
  for(let a=0;a<6.28;a+=0.6/R){const yy=y0+Math.sin(a)*R;if(bay(x+Math.cos(a)*R*0.28|0,yy|0)>0.8*q)continue;px(x+Math.cos(a)*R*0.28,yy,r%2?P.hx:P.glow2);}}
 if(o.head!==false&&fade<1)disc(xh,y0,Math.min(T*1.1,4+T*0.7)*(1+0.1*fr),P.hot,0.85*(1-fade));
 if(o.muzzle!==false&&tail<2)starFlare(x0,y0,Math.max(4,Math.min(T*1.1,5+T*0.55)),o.col||'r',t,1-fade*0.8);}
function beamDust(x0,y0,xh,th,col='r'){// fading particles left behind as a beam dissipates
 const dir=xh>=x0?1:-1,len=Math.abs(xh-x0);for(let i=0;i<6;i++){const k=rnd()*len;spawn({k:'spark',x:x0+dir*k,y:y0+(rnd()-0.5)*th*2.4,vx:(rnd()-0.5)*1.5+dir*0.6,vy:(rnd()-0.5)*1.5-0.3,life:0.25+rnd()*0.35,col:col==='c'?'c':'r'});}}
function redBeam(x0,y0,t,inten){const th=(30+Math.sin(t*55)*5+(Math.floor(t*30)%2)*4)*inten;
 for(let x=x0|0;x<W+40;x++){const wob=Math.sin(x*0.09-t*45)*2.5;
  for(let d=-th*2.3|0;d<=th*2.3;d++){const ad=Math.abs(d+wob)/th;let c=null;const b=bay(x,y0+d);
   if(ad<0.28)c=[255,255,255];else if(ad<0.45)c=b<0.6?[255,236,220]:[255,160,150];else if(ad<0.85)c=b<0.85?[230,24,44]:[255,90,80];else if(ad<1.05)c=[150,8,28];
   else if(ad<1.7&&b<(1.7-ad)*1.4)c=(Math.floor((x-t*600)/24)%3===0)?[255,200,80]:[255,100,40];else if(ad<2.3&&b<(2.3-ad)*0.45)c=[200,30,40];
   if(c)px(x,y0+d,c);}}
 disc(x0,y0,th*1.6,[255,90,60],0.6);disc(x0,y0,th*1.0,[255,240,230],1);
 seed=Math.floor(t*60);for(let i=0;i<14;i++){const rx=x0+rnd()*(W-x0),ry=y0+(rnd()-0.5)*th*4.6;px(rx,ry,[255,230,200]);px(rx+1,ry,[255,140,80]);}}
function rArc(p){const u=p.age/p.life,cx=p.x,cy=p.y,r1=60,r2=104;const a1=-2.4+Math.min(1,u*4)*3.0;// rising arc: from low-right sweeping up
 for(let j=-r2;j<=r2;j++)for(let i=-r2;i<=r2;i++){const d=Math.hypot(i,j);if(d<r1||d>r2)continue;const a=Math.atan2(j,i);const aa=-a;if(aa<-1.2||aa>Math.min(1.9,-1.2+Math.min(1,u*4)*3.1))continue;
  const e=(d-r1)/(r2-r1),fade=1-u;if(bay(cx+i,cy+j)>fade*(1.2-e*0.3))continue;px(cx+i,cy+j,e>0.75?[255,255,255]:e>0.45?[170,250,255]:[60,170,255]);}}
function xSlash(p){const u=p.age/p.life,L=90*(0.4+u),a=p.a;const c=Math.cos(a),s=Math.sin(a);for(let k=-L;k<=L;k++){const w=(1-Math.abs(k)/L)*5*(1-u);for(let d=-w;d<=w;d++)px(p.x+k*c-d*s,p.y+k*s+d*c,Math.abs(d)<w*0.4?[255,255,255]:[120,230,255]);}}
const C2={r:[[255,255,255],[255,140,100],[230,30,40]]};
function drawPart2(p,ctx){const u=p.age/p.life;if(p.k==='shock'){const r=12+u*150;for(let a=0;a<6.28;a+=1/r){const x=p.x+Math.cos(a)*r,y=p.y+Math.sin(a)*r*0.16;px(x,y,u<0.4?[255,255,230]:[200,190,210]);px(x,y-1,[255,220,170]);}if(u<0.25)disc(p.x,p.y-4,20*(1-u*3),[255,250,220],0.8);return;}if(p.k==='rarc')return rArc(p);if(p.k==='hspark'){const r=(5+u*24)*p.s;for(let k=0;k<8;k++){const a=k*0.785+p.a,L=k%2?r*0.6:r;for(let d=r*0.3;d<L;d+=0.7)px(p.x+Math.cos(a)*d,p.y+Math.sin(a)*d,u<0.4?[255,255,255]:[255,220,90]);}if(u<0.35)disc(p.x,p.y,7*p.s*(1-u*2),[255,255,240],1);return;}if(p.k==='xslash')return xSlash(p);
 if(p.k==='mote'){const c=p.c==='c'?[150,240,255]:[255,120,90];px(p.x,p.y,c);px(p.x+1,p.y,[255,255,255]);return;}
 if(p.k==='light'){const c=u<0.5?[220,250,255]:[150,200,255];px(p.x,p.y,c);if(u<0.6){px(p.x,p.y-1,c);px(p.x,p.y+1,c);px(p.x-1,p.y,c);px(p.x+1,p.y,c);}return;}
 if(p.k==='spark'&&p.col==='r'){const c=C2.r[Math.min(2,u*3|0)];px(p.x,p.y,c);px(p.x-p.vx*0.5,p.y-p.vy*0.5,c);return;}
 drawPart(p,ctx);}
// ---------- camera ----------
function cam(t){let z=1,fx=320,fy=180;
 if(t>=5.22&&t<6.3){const seg=Math.floor((t-5.22)/0.18);const side=seg%3;if(side===0){z=1.75;fx=ENX-30;fy=ENY+6;}else if(side===1){z=1.6;fx=MX+20;fy=MY-96;}else{fy=Math.max(180,MY-60);}return {z,fx,fy,whip:((t-5.22)%0.18)<0.05};}
 if(t>2.45&&t<3.3){z=2;fx=MX+10;fy=MY-90;}else if(t>3.9&&t<4.05){z=1.6;fx=ENX-30;fy=ENY;}else if(t>7.4&&t<7.78){z=1.8;fx=MX+70;fy=MY-110;}
 else if(t>9.42&&t<9.8){z=1.7;fx=(MX+ENX)/2;fy=ENY;}else if(t>13.05&&t<13.4){z=1+0.6*(1-(t-13.05)/0.35);fx=MX;fy=MY-110;}
 
 return {z:z+punchZoom(t),fx,fy};}
const IMPACTS=[3.9,5.22,5.58,5.94,7.75,11.3,12.6];
const punchZoom=t=>{let z=0;for(const i of IMPACTS)if(t>=i)z=Math.max(z,0.14*Math.exp(-(t-i)*12));return z;};
const impactFrame=t=>IMPACTS.some(i=>t>=i&&t<i+GDT+0.0005);// one 60fps sim frame
function wipe(V,t,WL=[2.35,6.25,12.95]){for(const w of WL){const u=(t-w)/0.2;if(u<0||u>1)continue;const p=u<0.5?u*2:(1-u)*2,len=(W+120)*p;
 for(let i=0;i<9;i++){V.fillStyle='#05060c';V.fillRect(i%2?W-len:0,i*40,len,22);V.fillStyle='#ff4050';V.fillRect(i%2?W-len:0,i*40+22,len,2);}}}
function speedLines(ctx,t,col,vert){seed=Math.floor(t*60)+5;ctx.fillStyle=col;for(let i=0;i<34;i++){if(vert)ctx.fillRect(rnd()*W|0,rnd()*H|0,1,40+rnd()*120|0);else ctx.fillRect(rnd()*W|0,rnd()*H|0,50+rnd()*140|0,1);}}
// ---------- pilot cut-away ----------
function faceDraw(V,im,x,y,w,h,ls,amp){// hair sway: slice-offset wave on the top rows, flannel sway on the bottom rows
 if(!(im&&im.naturalWidth)||!h)return;const ih=im.height,sc=h/ih,ST=Math.max(2,Math.round(ih/90));for(let r=0;r<ih;r+=ST){const f=r/ih;let k=f<0.3?(0.3-f)/0.3:f>0.8?(f-0.8)/0.2*0.6:0;const dx=k?Math.sin(ls*7+f*18)*amp*k:0;
  V.drawImage(im,0,r,im.width,Math.min(ST,ih-r),Math.round(x+dx),Math.floor(y+r*sc),Math.ceil(w),Math.ceil(ST*sc)+1);}}
function cutaway(V,t){const F=window.FONT;V.imageSmoothingEnabled=false;
 const ls=t-9.8,bob=Math.sin(ls*5)*2,br=1+0.008*Math.sin(ls*4);
 // face framing at the end of shot 1 (used to make the zoom continuous)
 if(t<10.5){const u=ls/0.7;V.fillStyle='#07040a';V.fillRect(0,0,W,H);
  let sd=3;const r=()=>(sd=(sd*16807)%2147483647)/2147483647;for(let i=0;i<46;i++){const y=Math.round(r()*H),L=80+r()*260,x=((r()*(W+L)-ls*(500+r()*500))%(W+L)+(W+L))%(W+L)-L;V.fillStyle=i%3?'#3a0a14':'#a01828';V.fillRect(Math.round(x),y,Math.round(L),1);}
  const s=(1+eio(u)*0.12)*br,im=GI.cut_face,w=im.width*s,h=im.height*s,slide=eio(Math.min(1,u*4.5)),off=(1-slide)*-420,dr=eio(u)*-10;
  V.save();V.beginPath();V.moveTo(150+off,0);V.lineTo(470+off,0);V.lineTo(430+off,H);V.lineTo(110+off,H);V.closePath();V.clip();
  faceDraw(V,im,290-w/2+off+dr,180-h/2+bob,w,h,ls,2.2);
  const gl=0.6+0.4*Math.sin(ls*9);V.fillStyle=`rgba(255,240,220,${0.5*gl})`;const gx=Math.round(290-w/2+off+dr+76*s),gy=Math.round(180-h/2+bob+141*s);V.fillRect(gx-1,gy-1,2+gl*2,2+gl*2);
  V.fillStyle=`rgba(255,30,40,${0.12+0.08*Math.sin(t*40)})`;V.fillRect(0,0,W,H);V.restore();
  V.fillStyle='#ffffff';V.fillRect(470+off-2+(-40)*0,0,0,0);
  bars(V,Math.round(3+(1-slide)*60));
  const txt=LINES.cutaway,n=Math.floor((t-9.9)*30),tx=472+Math.round((1-eio(Math.min(1,(t-9.85)/0.25)))*180);if(n>0){F.draw(V,txt.slice(0,n),tx,150+Math.round(bob*0.5),'#ffe070',2);}
  F.draw(V,NAMES.pilot,tx,128,'#8af0ff',1);}
 else if(t<10.85){// continuous eased zoom-through into the eye (nearest-neighbour, no blur)
  const u=eio((t-10.5)/0.35),im=GI.cut_face_hi,ex=76,ey=141,s0=1.12*br,s=s0+u*(7-s0);V.fillStyle='#07040a';V.fillRect(0,0,W,H);
  const fx0=290-118*s0-10,fy0=180-180*s0+bob,px0=fx0+ex*s0,py0=fy0+ey*s0,px=px0+(320-px0)*u,py=py0+(180-py0)*u;
  V.save();const cz=1+u*3;V.beginPath();V.moveTo(320+(150-320)*cz,0);V.lineTo(320+(470-320)*cz,0);V.lineTo(320+(430-320)*cz,H);V.lineTo(320+(110-320)*cz,H);V.closePath();V.clip();
  faceDraw(V,im,px-ex*s,py-ey*s,236*s,360*s,ls,2.2*(1-u));V.fillStyle=`rgba(255,30,40,${(0.14)*(1-u)})`;V.fillRect(0,0,W,H);V.restore();
  V.save();V.translate(320,180);let sd=11;const r=()=>(sd=(sd*16807)%2147483647)/2147483647;V.fillStyle=`rgba(255,255,255,${0.3+0.5*u})`;for(let i=0;i<28;i++){const an=r()*6.28,r0=((r()*300-(t-10.5)*900)%300+300)%300+60;V.save();V.rotate(an);V.fillRect(Math.round(r0),0,Math.round(40+u*120),1);V.restore();}V.restore();
  bars(V,3+u*97);}
 else{// eye strip: pull back from the zoom-through, slow push, then burst out
  const u=(t-10.85)/0.4,im=GI.cut_eye,inS=1.35-0.35*eio(Math.min(1,u*3)),outS=u>0.8?1+eio((u-0.8)/0.2)*0.8:1,s=inS*(1+0.05*eio(u))*outS;V.fillStyle='#000';V.fillRect(0,0,W,H);
  const dw=640*s,dh=160*s,dx=320-dw/2+Math.sin(u*3)*3,dy=180-dh/2;V.save();V.beginPath();V.rect(0,100,W,160);V.clip();V.drawImage(im,0,44,640,186,Math.floor(dx),Math.floor(dy),Math.ceil(dw),Math.ceil(dh));
  for(const [ix,iy] of [[175,180],[500,163]]){const gx=dx+ix*s,gy=dy+(iy-100)*s,r=3+Math.sin(t*30)*1.5+u*5;V.fillStyle='rgba(255,40,40,0.55)';V.fillRect(gx-r*3,gy-1,r*6,2);V.fillRect(gx-1,gy-r*2,2,r*4);V.fillStyle='#fff';V.fillRect(gx-2,gy-2,4,4);}
  V.restore();V.save();V.translate(320,180);let sd=5;const r=()=>(sd=(sd*16807)%2147483647)/2147483647;V.fillStyle='rgba(255,255,255,0.8)';for(let i=0;i<24;i++){const an=r()*6.28,r0=200+((r()*60+u*240)%120);V.save();V.rotate(an);V.fillRect(Math.round(r0),0,Math.round(80+r()*100),1);V.restore();}V.restore();
  bars(V,100-(u>0.8?eio((u-0.8)/0.2)*82:0));
  if(u>0.85){V.fillStyle=`rgba(255,60,60,${(u-0.85)/0.15*0.5})`;V.fillRect(0,0,W,H);}}}
// ---------- cinematic insert shots (pre-rendered generated panels at exact 2x, integer pans) ----------
const SKYTINT={day:'rgba(110,170,255,0.38)',sunset:null,night:'rgba(20,30,110,0.55)',space:'rgba(60,20,120,0.5)'};
const eio=u=>{u=Math.min(1,Math.max(0,u));return u<0.5?4*u*u*u:1-Math.pow(-2*u+2,3)/2;};
// PASS 4i: foreshortened cannon-toward-camera insert (before the big shot; never cuts mid-beam). mir=1 mirrors so the barrel points right.
function cannonCU(V,u,t,mir=0){const im=GI.cut_cannon;if(!im)return;const e=eio(u),s=1.06+0.16*e,MXp=135,MYp=265;V.save();V.fillStyle='#0a1430';V.fillRect(0,0,W,H);
 if(mir){V.translate(W,0);V.scale(-1,1);}const ox=MXp-(MXp)*s+Math.round(Math.sin(t*97)*e*3),oy=MYp-MYp*s;V.imageSmoothingEnabled=false;V.drawImage(im,Math.round(ox),Math.round(oy),Math.round(W*s),Math.round(H*s));
 const qx=MXp,qy=MYp;V.globalCompositeOperation='lighter';let sd=31;const r=()=>(sd=(sd*16807)%2147483647)/2147483647;
 for(let i=0;i<40;i++){const a=r()*6.283,d0=60+((r()*400-u*900)%400+400)%400,L=20+r()*60;V.strokeStyle=i%3?`rgba(255,90,120,${0.35*e})`:`rgba(255,240,230,${0.4*e})`;V.lineWidth=2;V.beginPath();V.moveTo(qx+Math.cos(a)*(d0+L),qy+Math.sin(a)*(d0+L));V.lineTo(qx+Math.cos(a)*d0,qy+Math.sin(a)*d0);V.stroke();}
 const R=18+e*70+Math.sin(t*40)*4,g=V.createRadialGradient(qx,qy,0,qx,qy,R*2.2);g.addColorStop(0,'rgba(255,255,245,1)');g.addColorStop(0.25,'rgba(255,200,210,0.9)');g.addColorStop(0.55,'rgba(255,60,100,0.55)');g.addColorStop(1,'rgba(255,40,80,0)');V.fillStyle=g;V.fillRect(qx-R*2.2,qy-R*2.2,R*4.4,R*4.4);
 V.restore();if(u>0.82){V.fillStyle=`rgba(255,120,150,${(u-0.82)/0.18*0.7})`;V.fillRect(0,0,W,H);}bars(V,26);}

const [PBc,PB]=mk(W,H);
// animated streak layer: deterministic lines that scroll faster than the camera (parallax foreground)
function streaks(ctx,ls,col,n,spd,vert,y0=0,y1=H){ctx.fillStyle=col;let sd=977;const r=()=>(sd=(sd*16807)%2147483647)/2147483647;
 for(let i=0;i<n;i++){const L=40+r()*120,base=r()*(W+L*2),off=((base-ls*spd*(0.7+r()*0.6))%(W+L*2)+(W+L*2))%(W+L*2)-L;const yy=y0+r()*(y1-y0);
  if(vert)ctx.fillRect(Math.round(yy*W/H),Math.round(off*H/W),1,Math.round(L));else ctx.fillRect(Math.round(off),Math.round(yy),Math.round(L),1);}}
// draw one generated insert panel into PB with an eased sub-pixel camera (nearest-neighbour, no smoothing)
function camPanel(ctx,name,u,cm){const im=GI['pan_'+name],e=eio(u),z=cm[0]+(cm[1]-cm[0])*e,s=2*z,dw=352*s,dh=198*s;
 const fx=cm[2]+(cm[3]-cm[2])*e,fy=cm[4]+(cm[5]-cm[4])*e;const x=-(dw-W)*Math.max(0,Math.min(1,fx)),y=-(dh-H)*Math.max(0,Math.min(1,fy));
 ctx.imageSmoothingEnabled=false;ctx.fillStyle='#120814';ctx.fillRect(0,0,W,H);if(!(im&&im.naturalWidth)){ctx.fillStyle='#c45a28';ctx.fillRect(0,H-70,W,70);return;}ctx.drawImage(im,0,0,352,198,Math.floor(x),Math.floor(y),Math.ceil(dw)+1,Math.ceil(dh)+1);
 const tn=SKYTINT[SKY_V];if(tn){ctx.globalCompositeOperation='color';ctx.fillStyle=tn;ctx.fillRect(0,0,W,H);ctx.globalCompositeOperation='source-over';}}
function bars(ctx,h){h=Math.round(h);ctx.fillStyle='#000';ctx.fillRect(0,0,W,h);ctx.fillRect(0,H-h,W,h);ctx.fillStyle='#ff4050';ctx.fillRect(0,h,W,1);ctx.fillRect(0,H-h-1,W,1);}
// composite PB onto the frame with an anime transition. k = kind, r = 0..1 progress (1 = fully on screen), dir: 1 in, -1 out
function present(V,k,r,dir){const e=eio(r);
 if(r>=1||k==='cut'){V.drawImage(PBc,0,0);return;}
 if(k==='slash'){const ed=(dir>0?e:1-e),x=-130+ed*(W+260);V.save();V.beginPath();if(dir>0){V.moveTo(-10,0);V.lineTo(x+130,0);V.lineTo(x-130,H);V.lineTo(-10,H);}else{V.moveTo(x+130,0);V.lineTo(W+10,0);V.lineTo(W+10,H);V.lineTo(x-130,H);}V.closePath();V.clip();V.drawImage(PBc,0,0);V.restore();
  V.strokeStyle='#ffffff';V.lineWidth=3;V.beginPath();V.moveTo(x+130,0);V.lineTo(x-130,H);V.stroke();V.strokeStyle='#ff4050';V.lineWidth=2;V.beginPath();V.moveTo(x+138,0);V.lineTo(x-122,H);V.stroke();return;}
 if(k==='slide'||k==='slideR'){const sg=k==='slide'?1:-1,ox=Math.round((1-e)*W*(dir>0?sg:-sg));V.drawImage(PBc,ox,0);const ex=ox>0?ox:W+ox;streaks(V,r*2,'rgba(255,255,255,0.75)',22,900,false);V.fillStyle='#ff4050';V.fillRect(ex-2,0,4,H);return;}
 if(k==='whip'||k==='whipv'){const sm=(1-e)*60;for(let i=-2;i<=2;i++){V.globalAlpha=i===0?Math.max(0.35,e):0.28;k==='whip'?V.drawImage(PBc,Math.round(i*sm),0):V.drawImage(PBc,0,Math.round(i*sm));}V.globalAlpha=1;return;}
 if(k==='bars'){V.globalAlpha=e;V.drawImage(PBc,0,0);V.globalAlpha=1;bars(V,18*e);return;}
 if(k==='zoom'){const z=1+(1-e)*0.6;V.globalAlpha=e;V.drawImage(PBc,W/2-W*z/2,H/2-H*z/2,W*z,H*z);V.globalAlpha=1;return;}}
// one insert shot: local u (0..1), dur seconds, camera, transitions in/out
function insert(V,name,u,dur,cm,tin,tout,fx){camPanel(PB,name,u,cm);const ls=u*dur;if(fx)fx(PB,ls,u);bars(PB,18);
 const TL=k=>Math.min(k.startsWith('whip')?0.1/PAT(S.t):0.16,dur*0.4),rin=ls/TL(tin),rout=(dur-ls)/TL(tout);if(rin<1)present(V,tin,rin,1);else if(rout<1)present(V,tout,rout,-1);else V.drawImage(PBc,0,0);return 1;}
function panelHit(c,x,y,sc,ls){// PASS 4i: beam ends on the target inside the panel (no off-frame cut end)
 const n=EN.poses.dmg;c.save();c.translate(x,y+EN.cy*sc);c.scale(sc,sc);espr(c,n,0,0,Math.floor(ls*30)%2===0);c.restore();
 c.save();c.globalCompositeOperation='lighter';const R=34*sc*2+Math.sin(ls*55)*5,g=c.createRadialGradient(x-14*sc,y,0,x-14*sc,y,R*2);g.addColorStop(0,'rgba(255,255,240,0.95)');g.addColorStop(0.3,'rgba(255,150,170,0.7)');g.addColorStop(1,'rgba(255,40,70,0)');c.fillStyle=g;c.fillRect(x-14*sc-R*2,y-R*2,R*4,R*4);
 for(let i=0;i<10;i++){const a=i*0.628+ls*9,L=R*(1.2+0.6*Math.sin(ls*40+i));c.strokeStyle='rgba(255,230,220,0.7)';c.lineWidth=2;c.beginPath();c.moveTo(x-14*sc,y);c.lineTo(x-14*sc+Math.cos(a)*L,y+Math.sin(a)*L);c.stroke();}c.restore();}
function shot(V,RT,t){const h=holdAt(RT);
 if(h&&h.k==='ots')return insert(V,'ots',h.u,0.6,[1,1.06,0.1,0.9,0.5,0.4],'bars','whip',(c,ls)=>streaks(c,ls,'rgba(255,220,200,0.35)',26,700,false));
 if(h&&h.k==='grip')return insert(V,'grip',h.u,0.4,[1.08,1.0,0.6,0.4,0.6,0.5],'slideR','cut',(c,ls,u)=>{streaks(c,ls,'rgba(160,240,255,0.4)',20,-600,false);c.fillStyle=`rgba(140,240,255,${0.04+0.12*eio(u)})`;c.fillRect(0,0,W,H);if(u>0.88){c.fillStyle='rgba(255,80,90,0.45)';c.fillRect(0,0,W,H);}});
 if(h&&h.k==='visor')return insert(V,'visor',h.u,0.4,[1,1.1,0.2,0.7,0.6,0.35],'slash','zoom',(c,ls,u)=>{const e=eio(u),z=2*(1+0.1*e),gx=184*z-(352*z-W)*(0.2+0.5*e),gy=67*z-(198*z-H)*(0.6-0.25*e);if(u>0.35){const a=Math.max(0,1-(u-0.35)*1.8),p=0.7+0.3*Math.sin(ls*60);c.fillStyle=`rgba(160,250,255,${a*p})`;c.fillRect(gx-140*a,gy-1,280*a,3);c.fillRect(gx-1,gy-36*a,3,72*a);c.fillStyle=`rgba(255,255,255,${a})`;c.fillRect(gx-5,gy-5,10,10);}});
 if(h&&h.k==='jump'&&h.s>=1.15)return insert(V,'below',(h.s-1.15)/0.3,0.3,[1.06,1,0.5,0.5,1,0],'whipv','bars',(c,ls)=>streaks(c,ls,'rgba(255,255,255,0.6)',30,1400,true));
 if(t>=2.62&&t<3.2)return insert(V,'low',(t-2.62)/0.58,0.58,[1,1.08,0.4,0.6,1,0],'slash','slide',(c,ls)=>{let sd=7;const r=()=>(sd=(sd*16807)%2147483647)/2147483647;c.fillStyle='rgba(190,240,255,0.85)';for(let i=0;i<16;i++){const y=((r()*H-ls*(60+r()*80))%H+H)%H;c.fillRect(Math.round(r()*W),Math.round(y),2,2);}});
 if(t>=6.48&&t<6.7)return insert(V,'xclose',(t-6.48)/0.22,0.22,[1.05,1,0,0.7,0.5,0.5],'slash','whip',(c,ls)=>{streaks(c,ls,'rgba(255,70,90,0.8)',10,1200,false,150,270);streaks(c,ls+3,'rgba(150,240,255,0.8)',10,900,false,150,270);});
 if(t>=7.78&&t<8.2)return insert(V,'behind',(t-7.78)/0.42,0.42,[1.0,1.07,0.5,0.5,0.5,0.45],'cut','whip',(c,ls)=>{c.fillStyle=`rgba(255,30,40,${0.15+0.1*Math.sin(ls*50)})`;c.fillRect(0,0,W,H);c.fillStyle='rgba(255,255,255,0.35)';c.fillRect(380,150+Math.sin(ls*60)*4,260,14);streaks(c,ls,'rgba(255,200,200,0.5)',18,-1500,false,120,240);panelHit(c,600,157,0.8,ls);});
 if(t>=8.2&&t<8.55)return insert(V,'wide',(t-8.2)/0.35,0.35,[1.06,1,0,1,0.5,0.5],'whip','bars',(c,ls)=>{c.fillStyle=`rgba(255,30,40,${0.12+0.1*Math.sin(ls*50)})`;c.fillRect(0,0,W,H);panelHit(c,590,80,0.42,ls);});
 return 0;}
// ---------- render ----------
function render(){if(!ULT){CUR.render();titleScreen();return;}const RT=S.t,t=VT(RT),ctx=WX;stepPos(t);let pn=curPose(t);const J=jumpState(RT);if(J){MX=J.x;MY=J.y;pn=J.p;}
 const airborne=t>=AIR&&!J;if(airborne&&!(t>9.1&&t<9.4))MY+=Math.round(Math.sin(t*5.2)*3);else if(t<3.4&&!J)MY+=Math.round(Math.sin(t*3)*1);// hover/idle bob
 if(t>7.75&&t<8.1){const u=(t-7.75)/0.35;MX-=Math.round(14*Math.sin(Math.min(1,u)*Math.PI)*(1-u*0.5));}// beam recoil push + settle
 if(t>11.3&&t<11.5)MX-=Math.round(10*(1-(t-11.3)/0.2));// palm recoil
 if(pn==='up'||pn==='follow')MY-=Math.round(4*Math.max(0,Math.sin((t%0.14)/0.14*Math.PI)));// overshoot on swing frames
 const shx=S.shake?Math.round((rnd()-0.5)*2*S.shake):0,shy=S.shake?Math.round((rnd()-0.5)*2*S.shake):0;
 const ry=t<RISE0?0:t<RISE1?ease((t-RISE0)/(RISE1-RISE0))*360:360;
 if(ry>0)airScene(ctx,ry,S.scroll,S.vscroll);if(ry<360)groundScene(ctx,ry,S.scroll);
 if(t>=RISE0&&t<RISE1+0.3)speedLines(ctx,t,'rgba(255,255,255,0.6)',true);
 if(t>3.4&&t<3.75||t>9.1&&t<9.4||t>=AIR&&t<6.3)speedLines(ctx,t,'rgba(255,230,210,0.55)',false);
 if(t>12.6){const u=Math.min(1,(t-12.6)/0.6),r=60+u*120,a=Math.max(0,1-(t-12.6)/4);const g=ctx.createRadialGradient(ENX,ENY,0,ENX,ENY,r);g.addColorStop(0,`rgba(255,240,200,${a})`);g.addColorStop(0.4,`rgba(255,140,60,${a*0.8})`);g.addColorStop(1,'rgba(200,40,40,0)');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);}
 fxD.fill(0);
 if(ry===0){ctx.fillStyle='#0e0a14';for(const [x,w] of [[MX,J&&J.p==='leap'?Math.max(4,26-(252-MY)*0.1):26],[EX0,EN.shadow]]){if(x===EX0&&S.edmg&&t>3.9)continue;for(let j=-3;j<=3;j++){const ww=w*Math.sqrt(1-(j*j)/12);for(let i=-ww|0;i<ww;i++)if(bay(x+i,j)<0.6)ctx.fillRect(x+i,FEET+j,1,1);}}}
 // enemy
 if(!S.edead){const flash=S.ehit>0.15&&Math.floor(t*30)%2===0;const P=EN.poses,name=S.edmg?(t>=3.9&&t<6.3?P.launch:P.dmg):(S.ehit>0.1?P.hit:P.idle);
  ctx.save();ctx.translate(EX0,ENY);ctx.rotate(ER);espr(ctx,name,0,EN.cy+(EN.bob&&!S.edmg?Math.round(Math.sin(t*4)):0),flash);ctx.restore();
  if(S.edmg&&Math.floor(t*20)%3===0)sparks(ENX-30+rnd()*40,ENY-20+rnd()*40,1,'y',2);}
 // afterimages
 const trail=(J&&J.p==='leap')||(t>3.4&&t<3.75)||(t>4.75&&t<6.3)||(t>9.1&&t<9.4);
 if(trail&&Math.floor(t*60)%3===0){if(S.after.length>9)S.after.shift();const AC=['#ff4a5a','#9af0ff','#ffffff'];S.after.push({n:pn,x:MX,y:MY,r:MR,t,c:AC[Math.floor(t*20)%3]});}
 for(const a of S.after){const age=t-a.t;if(age>0.35||age<0)continue;{const an=a.n==='dash'?'boost':a.n,ar=a.n==='dash'?0.22:a.r,al=Math.max(0,0.55-age*1.5);swordAround(ctx,an,a.x,a.y,ar,()=>spr(ctx,an,a.x,a.y,ar,a.c,al),a.c,al);}}
 if(!trail&&S.after.length&&t-S.after[S.after.length-1].t>0.4)S.after.length=0;
 if(t>3.4&&t<3.75)wingTrail(ctx,MX-26,MY-104,1,t,1-Math.max(0,(t-3.62)/0.13));if(t>9.1&&t<9.4)wingTrail(ctx,MX-26,MY-104,1,t,0.8,200);
 // mech
 MAINM=1; const flashM=(S.flash>0&&S.flash%2===1);
 const XF=t>=6.3&&t<7.4;// transform beat: only the weapon layer goes white
 if(t>=6.72&&t<7.12){spr(ctx,'cannon2',MX,MY,0,null,1,null,WPN.cannon2,true);const u=ease((t-6.72)/0.38);wpnLayer(ctx,'cannon2',MX,MY,1,u);}
 else if(XF){const xn=pn==='dash'?'boost':pn;
  if(pn==='hero'){// weapon-only white: the sword layer turns white then dissolves from the tip back to the hand
   const a=Math.min(1,(t-6.3)/0.12),sh=t<6.5?1:Math.max(0,1-(t-6.5)/0.22),R=Math.max(1,sh*140);
   drawSword(ctx,xn,MX,MY,MR,'swA',null,1,R);drawSword(ctx,xn,MX,MY,MR,'swA','#ffffff',a,R);spr(ctx,xn,MX,MY,MR,null);
   drawSword(ctx,xn,MX,MY,MR,'swB',null,1,R);const g=drawSword(ctx,xn,MX,MY,MR,'swB','#ffffff',a,R);
   if(g&&!(NOMECH&&MAINM)){ctx.save();ctx.globalCompositeOperation='lighter';ctx.fillStyle='#cfefff';for(let d=10;d<=Math.min(126,R);d+=22){ctx.globalAlpha=0.22*a;ctx.beginPath();ctx.arc(g[0]+Math.cos(g[2])*d,g[1]+Math.sin(g[2])*d,16,0,7);ctx.fill();}ctx.restore();}}
  else if(pn==='cannon2'){spr(ctx,xn,MX,MY,MR,null);wpnLayer(ctx,'cannon2',MX,MY,Math.max(0,1-(t-7.12)/0.25),1);}
  else swordAround(ctx,xn,MX,MY,MR,()=>spr(ctx,xn,MX,MY,MR,null));}
 else{const nm=pn==='dash'?'boost':pn,nr=pn==='dash'?0.22:MR,ft=null;// 4h: body never turns white
  if(nm==='palm'||nm==='f_palm'){const m=SM[nm],lx=50-m.ax,ly=80-m.ay,cc=Math.cos(nr),ss=Math.sin(nr);spr(ctx,'stow',MX+lx*cc-ly*ss,MY+lx*ss+ly*cc,nr,ft);}// cannon stowed on the back
  if(t>3.55&&t<4.12||t>5.1&&t<6.15)tipSmear(ctx,t);SWOFF=ultSwingA(t,pn);const g=swordAround(ctx,nm,MX,MY,nr,()=>spr(ctx,nm,MX,MY,nr,ft),ft);SWOFF=0;if(g)tipPush(t,g[0],g[1],g[2],128);}
 if(t>6.4&&t<7.3){// sword->cannon energy unfold: plates fold out segment by segment along the barrel, red/cyan
  const m=SM.cannon2,bx=MX+m.rx-m.ax,by=MY+m.ry-m.ay,sx=MX-10,sy=by,u=(t-6.4)/0.9,L=bx-sx;
  for(let k=0;k<7;k++){const kv=Math.max(0,Math.min(1,u*2.2-k*0.16));if(kv<=0)continue;const x=sx+L*k/6,h=(1-Math.abs(kv-0.5)*2)*44+8,c=k%2?[255,60,80]:[140,240,255],fade=u>0.85?(1-u)/0.15:1;
   for(let d=-h;d<=h;d++){if(Math.abs(d)>h-2||d===0){px(x,sy+d,c);px(x+1,sy+d,c);}}
   for(let xx=0;xx<L/6*kv;xx++){px(x+xx,sy-h,c);px(x+xx,sy+h,c);}
   if(fade>0.3){disc(x,sy,6+kv*10,c,0.55*fade);disc(x,sy,3+kv*4,[255,255,255],0.8*fade);}}
  if(u<0.9){seed=Math.floor(t*60);for(let i=0;i<10;i++){const a=rnd()*6.28,r=40*(1-((t*3+i*0.1)%1));px(sx+L*rnd()+Math.cos(a)*r,sy+Math.sin(a)*r,2,i%2?[255,90,100]:[170,250,255],1);}}
  disc(sx+L*Math.min(1,u*1.2),sy,8+Math.sin(t*60)*3,[255,255,255],0.7);}
 MAINM=0;const mm=SM[pn]||SM.idle;const MUZ=[MX+mm.rx-mm.ax,MY+mm.ry-mm.ay];S.palm=MUZ;
 // FX
 if(airborne||(J&&J.p==='leap')){const fl=Math.floor(t*30)%2;disc(MX-34,MY-112,3+fl*2,[255,170,80],0.8);disc(MX-34,MY-112,1+fl,[255,255,220],1);disc(MX-8,MY-2,2+fl*2,[255,150,60],0.7);disc(MX+12,MY-4,2+(1-fl)*2,[255,150,60],0.7);}// thruster flicker
 if(airborne){const wp=0.5+0.5*Math.sin(t*9);disc(MX-60,MY-150,2+wp*3,[180,230,255],0.35+0.3*wp);disc(MX-30,MY-170,2+wp*2,[220,245,255],0.3+0.3*wp);}// wing pulse
 if(J&&J.p==='leap'){const wg=Math.max(0,1-(J.u-0.2)*2.2);disc(MX-50,MY-150,10+wg*24,[190,240,255],0.55*wg+0.2);disc(MX-20,MY-175,6+wg*16,[255,255,255],0.5*wg);}
 if(t>13.05){const wg=0.5+0.5*Math.sin(t*6);for(const [dx,dy] of [[-70,-150],[-40,-175],[30,-165],[-85,-110]])disc(MX+dx,MY+dy,3+wg*3,[190,240,255],0.5*wg);}
 if(t>7.4&&t<7.78){const u=(t-7.4)/0.38;disc(MUZ[0],MUZ[1],4+u*12,[255,60,50],0.7);disc(MUZ[0],MUZ[1],3+u*5,[255,255,255],1);seed=Math.floor(t*60);for(let i=0;i<10;i++){const a=rnd()*6.28,r=40*(1-u)+5;px(MUZ[0]+Math.cos(a)*r,MUZ[1]+Math.sin(a)*r,[255,160,120]);}}
 if(t>7.75&&t<9.1){const xe=Math.min(W-24,ENX+(EN.half||60)+46),tr0=Math.min(1,(t-7.75)/0.13),hx=MUZ[0]+(xe-MUZ[0])*(1-Math.pow(1-tr0,2)),fade=t>8.82?Math.min(1,(t-8.82)/0.28):0,th=(26+Math.sin(t*55)*4+(Math.floor(t*30)%2)*3)*Math.min(1,0.35+tr0)*(t<7.8?1.25:1);
  epicBeam(MUZ[0],MUZ[1],hx,t,th,{col:'r',fade,tail:fade>0.55?(hx-MUZ[0])*(fade-0.55)/0.45:0});if(tr0>=1&&fade<0.9){starFlare(xe,MUZ[1],18*(1-fade)+6,'r',t+0.3,1-fade);}}
 if(t>=9.1&&t<9.3){const u=(t-9.1)/0.2;disc(MUZ[0],MUZ[1],10*(1-u)+2,[255,120,90],0.5*(1-u));}// muzzle afterglow tail
 if(t>=11.3&&t<11.62){const u=(t-11.3)/0.32;starFlare(MUZ[0]+8,MUZ[1],22*(1-u)+4,'c',t,1-u);}
 if(t>9.42&&t<11.3){const u=Math.min(1,(t-9.42)/1.8),pu=0.6+0.4*Math.sin(t*40);for(let k=0;k<5;k++){const fx=MUZ[0]-2+k*1,fy=MUZ[1]-12+k*6;disc(fx,fy,(2+u*4)*pu,[255,60,50],0.7);disc(fx,fy,1+u*2,[255,255,255],1);}}
 for(const p of S.parts)drawPart2(p,ctx);
 FX.putImageData(fxImg,0,0);ctx.drawImage(fxc,0,0);
 for(const n of S.nums){const s=(n.big?4:2)+(n.age<0.1?1:0);const y=n.y-Math.min(1,n.age*4)*16;const str=''+n.n;window.FONT.draw(ctx,str,n.x-window.FONT.width(str,s)/2,y,n.age%0.12<0.06?'#ffffff':'#ffd040',s);}
 // compose
 const c=cam(t);V.fillStyle='#000';V.fillRect(0,0,W,H);const vw=W/c.z,vh=H/c.z;let sx=Math.round(c.fx-vw/2),sy=Math.round(c.fy-vh/2);sx=Math.max(0,Math.min(W-vw,sx));sy=Math.max(-60,Math.min(H-vh,sy));
 if(c.whip){for(let k=0;k<4;k++){V.globalAlpha=0.35;V.drawImage(world,sx,sy,vw,vh,shx+(k-2)*18,shy,W,H);}V.globalAlpha=1;}
 else if(t>13.05){const u=eio(Math.min(1,(t-13.05)/4.6)),z2=1+u*0.12,rl=Math.sin(t*0.9)*0.012+u*0.01;V.save();V.translate(320,190);V.rotate(rl);V.scale(z2,z2);V.drawImage(world,sx,sy,vw,vh,-320+shx,-190+shy,W,H);V.restore();}
 else V.drawImage(world,sx,sy,vw,vh,shx,shy,W,H);
 if(t>7.75&&t<9.1){V.fillStyle=`rgba(255,20,30,${0.16+0.08*Math.sin(t*50)})`;V.fillRect(0,0,W,H);}
 if(impactFrame(t)){V.fillStyle='rgba(255,255,255,0.34)';V.fillRect(0,0,W,H);}
 else if(S.flash>0&&S.flash%2){V.fillStyle='rgba(255,255,255,0.3)';V.fillRect(0,0,W,H);}
 wipe(V,t);
 const SH=shot(V,RT,t);window.__shk=SH?'panel':(t>=9.8&&t<11.31)?'cutaway':(!S.started?'title':'world');window.__pn=[pn,MX,MY,t];
 if(SH){}else if(t>=7.42&&t<7.74){window.__shk='cutaway';cannonCU(V,(t-7.42)/0.32,t,1);}else if(t>=9.8&&t<11.25)cutaway(V,t);else if(t>=11.25&&t<11.31){V.fillStyle='#fff';V.fillRect(0,0,W,H);}
 else hud(V);
 const F=window.FONT;titleScreen();
 if(S.started&&t<2.35)dialog(V,LINES.open,Math.max(0,t-0.25));
 if(t>13.05){const u=eio(Math.min(1,(t-13.4)/0.4));if(u>0){const T=NAMES.attack,sz=4,tw=F.width(T,sz),x0=Math.round((W-tw)/2),y0=96;
  V.fillStyle='rgba(5,6,12,0.6)';V.fillRect(x0-14,y0-10,(tw+28)*u,56);V.fillStyle='#ff4050';V.fillRect(x0-14,y0-11,(tw+28)*u,1);V.fillRect(x0-14,y0+46,(tw+28)*u,1);
  for(let i=0;i<T.length;i++){if(i/T.length>u)break;const [r,g,b]=TPAL(i,t);F.draw(V,T[i],x0+F.width(T.slice(0,i),sz),y0,`rgb(${r},${g},${b})`,sz);}
  F.draw(V,NAMES.unit,x0,y0+52,'#f0f4ff',1);}
  if(t>13.9){const n=Math.min(TOTAL,Math.round(TOTAL*Math.min(1,(t-13.9)/0.5)));F.draw(V,'TOTAL DAMAGE',400,262,'#f0f4ff',2);const s=''+n;F.draw(V,s,630-F.width(s,6),282,t%0.2<0.1&&n===TOTAL?'#ffffff':'#ffd040',6);}
  if(t>14.4)dialog2();}
 if(S.done&&!CAPTURE&&Math.floor(performance.now()/500)%2)F.draw(V,'TAP TO REPLAY',8,346,'#ffffff',1);
 if(S.started&&!S.done&&VT(S.t)<13.0&&!CAPTURE&&ULT)F.draw(V,'TAP: SKIP',588,350,'#8890a8',1);}
// ---------- title screen: sky / enemy / attack selectors ----------
function BTNS(){const B=[];SKIES.forEach((k,i)=>B.push({r:[86+i*120,150,108,22],L:k.toUpperCase(),on:k===SKY_V,act:()=>{SKY_V=k;}}));
 Object.values(ENEMIES).forEach((e,i)=>B.push({r:[150+i*180,192,160,22],L:e.hud,on:e===EN,act:()=>go({enemy:e.id})}));
 ATTACK_LIST.forEach((a,i)=>B.push({r:[40+i*114,234,104,22],L:a.label,on:a.id===ATK,soon:a.soon,act:a.soon?null:()=>go({attack:a.id})}));return B;}
function go(o){const q=new URLSearchParams({sky:SKY_V,enemy:EN.id,attack:ATK,...o});location.search='?'+q.toString();}
function titleScreen(){if(S.started)return;const F=window.FONT;V.fillStyle='rgba(4,4,14,0.62)';V.fillRect(0,0,W,H);const tb=Math.round(Math.sin((CAPTURE?0:performance.now()/1000)*1.6)*2);F.draw(V,'AURORA VANGUARD',320-F.width('AURORA VANGUARD',4)/2,42+tb,'#8af0ff',4);
 const A=ATTACK_LIST.find(a=>a.id===ATK),sub=(ULT?'ULTIMATE: ':'ATTACK: ')+A.name;F.draw(V,sub,320-F.width(sub,2)/2,84,'#ffe070',2);F.draw(V,NAMES.unit,320-F.width(NAMES.unit,2)/2,106,'#ff6070',2);
 for(const [L,y] of [['MAP SKY',138],['ENEMY',180],['ATTACK',222]])F.draw(V,L,320-F.width(L,1)/2,y,'#c8cede',1);
 for(const b of BTNS()){const r=b.r;V.fillStyle=b.on?'#ff4050':'#05060c';V.fillRect(r[0]-1,r[1]-1,r[2]+2,r[3]+2);V.fillStyle=b.on?'#401018':b.soon?'#0a0e1c':'#101a3c';V.fillRect(r[0],r[1],r[2],r[3]);
  F.draw(V,b.L,r[0]+r[2]/2-F.width(b.L,2)/2,r[1]+6,b.on?'#ffffff':b.soon?'#3a4058':'#8890a8',2);if(b.soon)F.draw(V,'SOON',r[0]+r[2]-F.width('SOON',1)-2,r[1]+r[3]-7,'#5a6078',1);}
 if(Math.floor(performance.now()/500)%2||CAPTURE)F.draw(V,'TAP TO START',320-F.width('TAP TO START',2)/2,296,'#ffffff',2);}
function dialog2(){const F=window.FONT;V.fillStyle='#05060c';V.fillRect(9,263,70,82);V.fillStyle='#9aa3bf';V.fillRect(10,264,68,80);if(PORT.small.complete)V.drawImage(PORT.small,12,265,64,78);F.draw(V,LINES.finish,86,330,'#ffe070',2);}

// ======================= ATTACK: fist — IRON KNUCKLE RUSH (authored in wall seconds, PAT=1) =======================
// To add an attack: write an object like CUR below {T,EV,END,skipTo,step(t,DT),render()}, register it in ATTACKS, give it a SFX map,
// add a cue to music.js THEMES[unit.theme].cues[id], and flip its ATTACK_LIST entry from soon:1. All enemy placement goes through EN anchors.
const FSFX={dlg:['blip'],drop:['drop'],stick:['stick'],dash:['boost'],jabw:['swish'],jab:['punch'],crossw:['swish'],cross:['punch'],upw:['swish'],upper:['punch','airhit'],cutin:['cut'],
 kjump:['clunk'],kleap:['launch'],kdive:['whoosh'],khit:['heavy','boom'],kland:['land'],ret:['snap'],grab:['grab'],pose:['hero']};
const FIST=(()=>{
 const E8=60/158.5/2,g=n=>+(0.145+n*E8).toFixed(4);// every beat sits on the Unit 01 theme's 8th-note grid
 const T={dlg:g(2),drop:g(13),stick:g(16),dash:g(19),jabw:g(22),jab:g(23),crossw:g(26),cross:g(27),upw:g(30),upper:g(31),cutin:g(34),kjump:g(39),kleap:g(40),kdive:g(42),khit:g(44),kland:g(48),ret:g(51),grab:g(53),pose:g(55)};
 const EV=Object.entries(T).map(([n,t])=>[t,n]).sort((a,b)=>a[0]-b[0]);
 const DM={jab:520,cross:640,upper:880,khit:1960},TOT=4000;
 const EXg=470,FE=EXg-EN.half,reach=p=>SM[p].rx-SM[p].ax,PX=p=>FE-reach(p)+6,ST=PX('jab')-10;
 const ECY=FEET-EN.cy;// enemy body centre on the ground
 const KX=FE+8-reach('kick'),KY=ECY-14+(SM.kick.ay-SM.kick.ry);// kick contact: foot tip on the enemy front/centre
 const RB=KX-120;// rebound landing x
 const SWX=262,GX=SWX+SM.idle.ax-SWPOSE.poses.idle.h[0];// sword plant x; GX = feet x that puts the idle hand on the hilt// where the sword plants
 // [t,x,y,rot,ease] ease: 0 out-cubic, 1 in-quad, 2 linear
 const MK=[[0,150,252,0],[T.dash,150,252,0],[T.dash+0.52,ST,252,0],[T.jabw,ST-10,252,0],[T.jab,PX('jab'),252,0,1],[T.jab+0.06,PX('jab')+3,252,0],[T.jab+0.3,PX('jab')-6,252,0],[T.crossw,PX('jab')-14,252,0],[T.cross,PX('cross'),252,0,1],[T.cross+0.06,PX('cross')+4,252,0],[T.cross+0.3,PX('cross')-5,252,0],
  [T.upw,PX('cross')-8,256,0],[T.upper,PX('upper'),236,0,1],[T.upper+0.35,PX('upper')-30,226,0],[T.cutin,PX('upper')-60,240,0],[T.kjump,ST-70,252,0],[T.kleap,ST-70,256,0],[T.kdive,ST-60,178,0],[T.khit,KX,KY,0,1],
  [T.khit+0.45,RB+30,170,0],[T.khit+0.8,RB,252,0],[T.ret-0.01,RB,252,0],[T.ret,GX-26,252,0],[T.grab,GX,252,0],[99,GX,252,0]];
 const MP=[[0,'idle'],[T.drop,'crouch_'],[T.dash,'boost_'],[T.jabw,'p_wind'],[T.jab-0.07,'p_ext'],[T.jab,'jab'],[T.jab+0.2,'p_rec'],[T.crossw,'p_wind'],[T.cross-0.07,'p_ext'],[T.cross,'cross'],[T.cross+0.2,'p_rec'],[T.upw,'p_upw'],[T.upper,'upper'],[T.upper+0.4,'hover_'],[T.cutin+0.5,'land_sq'],[T.kjump,'crouch_'],[T.kleap,'leap_'],[T.kdive-0.16,'k_chamb'],[T.kdive,'kick'],[T.khit+0.12,'k_reb'],[T.khit+0.8,'land_sq'],[T.khit+1.02,'land_set'],[T.ret,'boost_'],[T.grab,'idle'],[T.pose,'hero']];
 const EKF=[[0,EXg,252,0],[T.jab,EXg,252,0],[T.jab+0.15,EXg+6,252,0],[T.cross,EXg+6,252,0],[T.cross+0.15,EXg+14,252,0],[T.upper,EXg+14,252,0],[T.upper+0.32,EXg+22,200,-0.22],[T.upper+0.78,EXg+24,252,0,1],
  [T.khit,EXg+24,252,0],[T.khit+0.5,EXg+150,214,0.32],[T.kland,EXg+165,252,0.05,1],[T.kland+0.5,EXg+150,252,0],[99,EXg+150,252,0]];
 const CK=[[0,1,320,180],[T.drop-0.45,1,320,180],[T.drop,1.75,215,160],[T.stick-0.05,1.75,230,205],[T.stick+0.3,1.75,230,205],[T.dash,1,320,180],[T.dash+0.5,1.3,(ST+EXg)/2,180],
  [T.jab,1.3,(ST+EXg)/2,180],[T.jab,1.75,FE,ECY-6],[T.crossw,1.4,FE-20,180],[T.cross,1.4,FE-20,180],[T.cross,1.65,FE-30,ECY+24],[T.upw,1.3,FE-10,185],[T.upper,1.3,FE-10,185],[T.upper,1.5,FE,150],[T.cutin,1.35,FE+10,125],
  [T.kjump,1,320,180],[T.kleap,1,320,180],[T.kdive,1.1,300,160],[T.khit,1.35,KX+60,ECY],[T.khit,1.7,FE+30,ECY],[T.kland,1.25,EXg+90,190],[T.ret-0.01,1.05,380,180],[T.ret,1.6,GX-10,170],[T.pose,1.25,GX+10,165],[FIST_END,1.08,GX+60,170]];
 const ef=[t=>1-Math.pow(1-t,3),t=>t*t,t=>t];
 const tr=(K,t)=>{let i=0;while(i<K.length-2&&t>=K[i+1][0])i++;const a=K[i],b=K[i+1];const u=b[0]>a[0]?ef[b[4]||0](Math.max(0,Math.min(1,(t-a[0])/(b[0]-a[0])))):1;return [1,2,3].map(k=>a[k]+(b[k]-a[k])*u);};
 const pose=t=>{let p=MP[0][1];for(const [k,n] of MP)if(t>=k)p=n;return p;};
 function step(t,DT){
  if(t<T.khit)S.rld=0;if(!S.rld&&t>=T.khit+0.8){S.rld=1;const [lx]=tr(MK,t);S.shake=Math.max(S.shake||0,4);for(let i=0;i<14;i++)spawn({k:'smoke',x:lx+(rnd()-0.5)*50,y:FEET-2,vx:(rnd()-0.5)*3.2,vy:-rnd()*1.3,life:0.8,r:3+rnd()*4});}
  while(S.fired<EV.length&&EV[S.fired][0]<=t){const [,n]=EV[S.fired++];snd(n);const [mx,my]=tr(MK,t),[ex]=tr(EKF,t);
   if(n==='stick'){for(let i=0;i<14;i++)spawn({k:'smoke',x:SWX+(rnd()-0.5)*30,y:FEET-2,vx:(rnd()-0.5)*1.5,vy:-rnd()*1.2,life:0.9,r:3+rnd()*4});sparks(SWX,FEET,8,'y',2.5);S.shake=3;}
   if(n==='dash'){for(let i=0;i<10;i++)spawn({k:'smoke',x:150+(rnd()-0.5)*30,y:FEET-2,vx:-1-rnd()*2,vy:-rnd(),life:0.7,r:3+rnd()*3});}
   if(n==='jab'||n==='cross'||n==='upper'){const p=n==='jab'?'jab':n,m=SM[p],fx=mx+m.rx-m.ax+4,fy=my+m.ry-m.ay;spawn({k:'hspark',x:fx,y:fy,s:n==='upper'?1.3:1,a:rnd(),life:0.22});sparks(fx,fy,n==='upper'?16:10,'y',3.5);
    damage(DM[n],fx+6+(n==='upper'?34:n==='cross'?16:0),fy-26-(n==='upper'?24:0),false);S.shake=n==='upper'?6:4;if(n==='upper')S.flash=2;}
   if(n==='kleap'){for(let i=0;i<12;i++)spawn({k:'smoke',x:mx+(rnd()-0.5)*40,y:FEET-2,vx:(rnd()-0.5)*3,vy:-rnd()*1.5,life:0.8,r:4+rnd()*4});}
   if(n==='khit'){const fx=KX+reach('kick'),fy=ECY-14;spawn({k:'hspark',x:fx,y:fy,s:2.2,a:0.3,life:0.3});spawn({k:'ring',x:fx,y:fy,s:1.6,life:0.45});spawn({k:'boom',x:fx+16,y:fy,r:0,s:0.9,life:0.45});sparks(fx,fy,40,'y',6);
    for(let i=0;i<10;i++){const a=-rnd()*3.1,v=3+rnd()*4;spawn({k:'debris',x:fx+10,y:fy,vx:Math.cos(a)*v+2,vy:Math.sin(a)*v,rot:rnd()*6,vr:(rnd()-0.5)*0.4,sz:2+rnd()*3|0,col:rnd()<0.5?EN.debris:'q',life:2});}
    damage(DM.khit,fx+20,fy-40,true);S.shake=14;S.edmg=true;}
   if(n==='kland'){S.shake=6;for(let i=0;i<18;i++)spawn({k:'smoke',x:EXg+165+(rnd()-0.5)*90,y:FEET-2,vx:(rnd()-0.3)*3,vy:-rnd()*1.6,life:1.1,r:5+rnd()*6});}
   if(n==='grab'){sparks(SWX,FEET-100,10,'c',3);}
   if(n==='pose'){S.flash=2;}}
  if(S.edmg&&Math.floor(t*20)%4===0){const [ex,ey]=tr(EKF,t);sparks(ex-20+rnd()*40,ey-EN.cy-20+rnd()*40,1,'y',2);}
  if(t>=T.khit+0.8&&Math.floor(t*12)%3===0){const [ex,ey]=tr(EKF,t);spawn({k:'smoke',x:ex+(rnd()-0.5)*40,y:ey-EN.cy-10,vx:0.2,vy:-0.6,life:1.2,r:3+rnd()*3});}
  if(t>T.dash+0.4&&t<T.dash+0.6&&Math.floor(t*60)%2===0)spawn({k:'smoke',x:MX+10+(rnd()-0.5)*20,y:FEET-2,vx:1.5+rnd()*2,vy:-rnd()*0.8,life:0.5,r:2+rnd()*3});
  S.scroll+=((t>T.dash&&t<T.dash+0.5)?900:8)*DT;}
 function swordIn(ctx,x,y,deg,clipY){const k=((Math.round(deg/5)%72)+72)%72;ctx.save();if(clipY){ctx.beginPath();ctx.rect(0,0,W,clipY);ctx.clip();}spr(ctx,'swA_'+k,x,y);spr(ctx,'swB_'+k,x,y);ctx.restore();}
 function cutin(V,t){const F=window.FONT,ls=t-T.cutin,dur=T.kjump-T.cutin,u=ls/dur,sl=eio(Math.min(1,ls/0.16)),out=Math.max(0,(ls-(dur-0.1))/0.1);
  V.fillStyle='#07040a';V.fillRect(0,0,W,H);let sd=11;const r=()=>(sd=(sd*16807)%2147483647)/2147483647;
  for(let i=0;i<50;i++){const y=Math.round(r()*H),L=60+r()*240,x=((r()*(W+L)+ls*(700+r()*600))%(W+L)+(W+L))%(W+L)-L;V.fillStyle=i%3?'#3a0a14':'#c02030';V.fillRect(Math.round(x),y,Math.round(L),1);}
  const y0=78,y1=282,off=(1-sl)*700,im=PORT.big,s=(y1-y0+40)/im.height*(1+u*0.06),w=im.width*s,h=im.height*s;
  V.save();V.beginPath();V.moveTo(0+off,y0+20);V.lineTo(W+off,y0);V.lineTo(W+off,y1-20);V.lineTo(0+off,y1);V.closePath();V.clip();V.fillStyle='#1a0610';V.fillRect(0,0,W,H);
  if(im.complete)V.drawImage(im,Math.round(150-w/2+off-u*14),Math.round((y0+y1)/2-h*0.42),Math.round(w),Math.round(h));
  V.fillStyle=`rgba(255,40,50,${0.1+0.06*Math.sin(ls*40)})`;V.fillRect(0,0,W,H);V.restore();
  V.fillStyle='#ff4050';for(const [a,b] of [[y0+20,y0],[y1,y1-20]])for(let x=0;x<W;x+=2){const yy=Math.round(a+(b-a)*x/W);V.fillRect(x+off,yy,2,2);}
  const tx=330+Math.round((1-eio(Math.min(1,(ls-0.08)/0.2)))*260),[l1,l2]=LINES.fist_cut.split('|'),n=Math.floor((ls-0.1)*34);
  F.draw(V,NAMES.pilot,tx,128,'#8af0ff',1);if(n>0){F.draw(V,l1.slice(0,n),tx,146,'#ffe070',3);if(n>l1.length)F.draw(V,l2.slice(0,n-l1.length),tx,176,'#ffffff',3);}
  bars(V,Math.round(4+(1-sl)*50));if(out>0){V.fillStyle=`rgba(255,255,255,${out})`;V.fillRect(0,0,W,H);}}
 function render(){const t=S.t,ctx=WX,F=window.FONT;let pn=pose(t);[MX,MY,MR]=tr(MK,t);const [ex,ey,er]=tr(EKF,t);EX0=ex;EY0=ey;ENX=ex;ENY=ey-EN.cy;
  const air=pn==='leap_'||pn==='kick'||(pn==='hover_');if(!air&&t<T.dash)MY+=Math.round(Math.sin(t*3));if(pn==='hover_')MY+=Math.round(Math.sin(t*6)*2);
  const shx=S.shake?Math.round((rnd()-0.5)*2*S.shake):0,shy=S.shake?Math.round((rnd()-0.5)*2*S.shake):0;
  groundScene(ctx,0,S.scroll);if(t>T.dash&&t<T.dash+0.5||t>T.kdive&&t<T.khit)speedLines(ctx,t,'rgba(255,230,210,0.5)',false);fxD.fill(0);
  ctx.fillStyle='#0e0a14';for(const [x,w0,y] of [[MX,26,MY],[ex,EN.shadow,ey]]){const w=Math.max(4,w0-(252-y)*0.12);for(let j=-3;j<=3;j++){const ww=w*Math.sqrt(1-(j*j)/12);for(let i=-ww|0;i<ww;i++)if(bay(x+i,j)<0.6)ctx.fillRect(x+i,FEET+j,1,1);}}
  // planted / falling / returning sword (canonical sword layer)
  const P0=SWPOSE.poses.idle,m0=SM.idle,hx0=150+P0.h[0]-m0.ax,hy0=252+P0.h[1]-m0.ay,a0=P0.a,HY0=FEET+14-139;MAINM=1;
  if(t>=T.drop&&t<T.grab){const u=Math.min(1,(t-T.drop)/(T.stick-T.drop)),x=hx0+(SWX-hx0)*u,y=hy0+(HY0-hy0)*u-52*Math.sin(Math.PI*Math.min(1,u*1.05)),wob=t>T.stick?Math.sin((t-T.stick)*40)*Math.max(0,1-(t-T.stick)*4)*4:0;swordIn(ctx,x,y,a0+(450-a0)*(1-Math.pow(1-u,1.6))+wob,u>0.8?FEET+3:0);}
  MAINM=0;
  // enemy
  {const P=EN.poses,hit=S.ehit>0.08,name=t>=T.pose?P.hit:t>=T.upper&&t<T.upper+0.75||t>=T.khit&&t<T.kland?P.launch:S.edmg?P.dmg:hit?P.hit:P.idle,fl=S.ehit>0.17&&Math.floor(t*30)%2===0;
   ctx.save();ctx.translate(ex,ENY);ctx.rotate(er);{const by=EN.cy+(EN.bob&&!S.edmg?Math.round(Math.sin(t*4)):0);espr(ctx,name,0,by,fl);}ctx.restore();}
  // afterimages
  const body=n=>n.endsWith('_')?(SPRMETA[n+'ns']?n+'ns':n.slice(0,-1)):n,trail=(t>T.dash&&t<T.dash+0.5)||(t>T.kdive&&t<T.khit+0.05);
  if(trail&&Math.floor(t*60)%3===0){if(S.after.length>9)S.after.shift();S.after.push({n:pn,x:MX,y:MY,t,c:['#ff4a5a','#9af0ff','#ffffff'][Math.floor(t*20)%3]});}
  for(const a of S.after){const age=t-a.t;if(age>0.35||age<0)continue;spr(ctx,body(a.n),a.x,a.y,0,a.c,Math.max(0,0.55-age*1.5));}
  if(!trail&&S.after.length&&t-S.after[S.after.length-1].t>0.4)S.after.length=0;
  // mech: poses ending in '_' (and the punch/kick poses) are drawn without the sword
  MAINM=1;const nm=body(pn),armed=!pn.endsWith('_')&&!['jab','cross','upper','kick','boost'].includes(pn)&&(t<T.drop||t>=T.grab),ft=null;// 4h: body never turns white
  const dv=t>T.dash&&t<T.dash+0.52?(t-T.dash)/0.52:-1,lr=dv>=0?0.15*Math.sin(Math.min(1,dv*3)*Math.PI/2)*(1-Math.max(0,(dv-0.7)/0.3)*1.3):0;if(dv>=0)wingTrail(ctx,MX-26,MY-104,1,t,1-Math.max(0,(dv-0.75)/0.25));
  if(armed)swordAround(ctx,nm,MX,MY,0,()=>spr(ctx,nm,MX,MY,0,null));else spr(ctx,nm,MX,MY,lr,null);
  if(t>=T.ret&&t<T.grab){const u=Math.min(1,(t-T.ret)/(T.grab-T.ret)),P=SWPOSE.poses.idle,hx=MX+P.h[0]-SM.idle.ax,hy=MY+P.h[1]-SM.idle.ay;if(u>0.6){const k=eio((u-0.6)/0.4);swordIn(ctx,SWX+(hx-SWX)*k,HY0+(hy-HY0)*k,90+(a0-90)*k,0);}else swordIn(ctx,SWX,HY0,90,FEET+3);}
  MAINM=0;
  // thrusters / wing glow while airborne
  if(air){const fl=Math.floor(t*30)%2;disc(MX-30,MY-100,3+fl*2,[255,170,80],0.8);disc(MX-30,MY-100,1+fl,[255,255,220],1);if(pn==='kick'){for(let i=0;i<6;i++)disc(MX-50-i*9,MY-70+i*3,6-i+fl*2,i<2?[255,255,220]:[255,140,60],0.8-i*0.1);}}
  if(pn==='leap_'){const wg=Math.max(0,1-(t-T.kleap)*3);disc(MX-50,MY-150,8+wg*20,[190,240,255],0.5*wg+0.15);}
  if(t>=T.pose){const wg=0.5+0.5*Math.sin(t*6);for(const [dx,dy] of [[-70,-150],[-40,-175],[30,-165]])disc(MX+dx,MY+dy,3+wg*3,[190,240,255],0.45*wg);}
  if(t>=T.grab&&t<T.grab+0.3){const P=SWPOSE.poses.idle,u=(t-T.grab)/0.3;disc(MX+P.h[0]-SM.idle.ax,MY+P.h[1]-SM.idle.ay,4+u*14,[200,250,255],0.8*(1-u));}
  for(const p of S.parts)drawPart2(p,ctx);FX.putImageData(fxImg,0,0);ctx.drawImage(fxc,0,0);
  for(const n of S.nums){const s=(n.big?4:2)+(n.age<0.1?1:0),y=n.y-Math.min(1,n.age*4)*16,str=''+n.n;F.draw(ctx,str,n.x-F.width(str,s)/2,y,n.age%0.12<0.06?'#ffffff':'#ffd040',s);}
  // compose with eased camera (hard cuts = duplicated key times)
  const [z,cx,cy]=tr(CK,t);let pz=1;for(const k of ['jab','cross','upper','khit']){const d=t-T[k];if(d>=0&&d<0.12)pz=1+(k==='khit'?0.08:0.04)*(1-d/0.12);}
  const zz=z*pz,vw=W/zz,vh=H/zz;let sx=Math.round(cx-vw/2),sy=Math.round(cy-vh/2);sx=Math.max(0,Math.min(W-vw,sx));sy=Math.max(-60,Math.min(H-vh,sy));
  V.fillStyle='#000';V.fillRect(0,0,W,H);
  if(t>=T.pose){const u=eio(Math.min(1,(t-T.pose)/3)),rl=Math.sin(t*0.9)*0.01;V.save();V.translate(320,190);V.rotate(rl);V.scale(1+u*0.05,1+u*0.05);V.drawImage(world,sx,sy,vw,vh,-320+shx,-190+shy,W,H);V.restore();}
  else V.drawImage(world,sx,sy,vw,vh,shx,shy,W,H);
  const IF=t>=T.khit&&t<T.khit+0.05;if(IF){V.fillStyle='rgba(255,236,228,0.3)';V.fillRect(0,0,W,H);}else if(S.flash>0&&S.flash%2){V.fillStyle='rgba(255,255,255,0.24)';V.fillRect(0,0,W,H);}
  wipe(V,t,[T.ret-0.06]);
  const CUT=t>=T.cutin&&t<T.kjump;window.__shk=!S.started?'title':CUT?'cutaway':'world';window.__pn=[pn,MX,MY,t];
  if(CUT)cutin(V,t);else hud(V);
  if(S.started&&t>=T.dlg&&t<T.dlg+2.1)dialog(V,LINES.fist_open,t-T.dlg);
  if(t>=T.pose){const u=eio(Math.min(1,(t-T.pose-0.2)/0.4));if(u>0){const N=ATTACK_LIST[1].name,sz=4,tw=F.width(N,sz),x0=Math.round((W-tw)/2),y0=96;
   V.fillStyle='rgba(5,6,12,0.6)';V.fillRect(x0-14,y0-10,(tw+28)*u,56);V.fillStyle='#ff4050';V.fillRect(x0-14,y0-11,(tw+28)*u,1);V.fillRect(x0-14,y0+46,(tw+28)*u,1);
   for(let i=0;i<N.length;i++){if(i/N.length>u)break;const [r,g2,b]=TPAL(i,t);F.draw(V,N[i],x0+F.width(N.slice(0,i),sz),y0,`rgb(${r},${g2},${b})`,sz);}F.draw(V,NAMES.unit,x0,y0+52,'#f0f4ff',1);}
   if(t>T.pose+0.6){const n=Math.min(TOT,Math.round(TOT*Math.min(1,(t-T.pose-0.6)/0.5)));F.draw(V,'TOTAL DAMAGE',400,262,'#f0f4ff',2);const s=''+n;F.draw(V,s,630-F.width(s,6),282,t%0.2<0.1&&n===TOT?'#ffffff':'#ffd040',6);}}
  if(S.done&&!CAPTURE&&Math.floor(performance.now()/500)%2)F.draw(V,'TAP TO REPLAY',8,346,'#ffffff',1);
  if(S.started&&!S.done&&t<T.pose&&!CAPTURE)F.draw(V,'TAP: SKIP',588,350,'#8890a8',1);}
 return {T,EV,END:FIST_END,skipTo:T.pose,step,render,DM,TOT,SFX:FSFX};})();
// ======================= ATTACK: beam — CRIMSON RAIL BARRAGE (authored in wall seconds, PAT=1) =======================
const BSFX={dlg:['blip'],kwind:['boost'],kick:['heavy','whoosh'],arm:['unfold','hum'],ready:['click'],dash:['boost'],s1:['zap'],h1:['bhit'],s2:['zap'],h2:['bhit'],s3:['zap'],h3:['bhit'],vault:['launch'],whip:['whoosh'],behind:['land','clunk'],
 cutin:['cut'],charge:['pcharge2'],fire:['bigbeam'],t1:['bhit'],t2:['bhit'],t3:['bhit'],t4:['bhit'],big:['heavy','boom'],fly:['boost','whoosh'],ex:['boom'],pose:['hero']};
const BEAM=(()=>{const cl=v=>Math.max(0,Math.min(1,v));
 const E8=60/158.5/2,g=n=>+(0.145+n*E8).toFixed(4);// Unit 01 theme 8th-note grid
 // PASS 4e: new opening — wind-up, flying kick launches the enemy off-screen, then the chase (everything after shifted +7 eighths)
 const T0={arm:12,ready:17,dash:20,s1:22,h1:23,s2:26,h2:27,s3:30,h3:31,vault:33,whip:35,behind:37,cutin:40,charge:46,fire:54,t1:55,t2:56,t3:57,t4:58,big:60,fly:65,ex:68,pose:75},T={dlg:g(2),kwind:g(13),kick:g(15.5)};for(const k in T0)T[k]=g(T0[k]+7);
 const EV=Object.entries(T).map(([n,t])=>[t,n]).sort((a,b)=>a[0]-b[0]);
 const DMS=EN.hp/7200,R=v=>Math.round(v*DMS/10)*10;
 const DM={kick:R(500),h1:R(600),h2:R(700),h3:R(800),t1:R(350),t2:R(350),t3:R(350),t4:R(350),big:R(2600)},TOT=Object.values(DM).reduce((a,b)=>a+b,0);
 const EXg=360,FE=EXg-EN.half,BE=EXg+EN.half,ECY=FEET-EN.cy,MZ=[106,-83],MZP={cannon2:[106,-83],f_brace:[136,-108],f_recoil:[132,-182]};// muzzle offset in cannon2 sprite space
 const BX=EXg+165;// behind position (feet x), facing left
 // [t,x,y,rot,ease] ease: 0 out-cubic, 1 in-quad, 2 linear ; flip handled by pose table
 // 4g: kick contact from the sprites: the kick pose's foot tip (rx) lands on the enemy's leading edge (its sprite extends ax px left of centre)
 const EFR=EXg-Math.round(SM[EN.poses.idle].ax*0.82*(EN.size||1)),KREACH=SM.kick.rx-SM.kick.ax,KX=EFR-KREACH+4,KFY=240-(SM.kick.ay-SM.kick.ry);
 const MK=[[0,110,252,0],[T.kwind,110,252,0],[T.kwind+0.3,112,256,0,0],[T.kick-0.1,KX-40,246,-0.06,1],[T.kick,KX,240,-0.1,2],[T.kick+0.25,KX+14,246,-0.04,0],[T.kick+0.7,KX+10,252,0,0],[T.arm-0.2,110,252,0,0],[T.dash,110,252,0],[T.dash+0.25,130,247,0.05,1],[T.s3+0.35,FE-150,247,0.05,2],[T.vault-0.1,FE-141,250,0.05],[T.vault,FE-140,247,0.05],[T.vault+0.18,FE-90,200,0,0],[T.whip,EXg+20,108,0,2],[T.whip+0.2,BX+28,128,0,0],[T.behind,BX,252,0,1],[T.behind+0.09,BX-3,255,0,0],[T.behind+0.32,BX,252,0,0],[T.fly,BX,252,0],[T.fly+0.15,BX-6,240,0,1],[T.fly+0.9,BX+260,-60,0,1],[99,BX+260,-60,0]];
 const MP=[[0,'idle'],[T.kwind,'crouch_'],[T.kwind+0.3,'boost_'],[T.kick-0.08,'kick'],[T.kick+0.55,'idle_'],[T.arm,'cannon2'],[T.s1-0.06,'f_brace'],[T.s3+0.3,'cannon2'],[T.vault,'leap_'],[T.behind,'land_sq'],[T.behind+0.22,'cannon2'],[T.charge,'f_brace'],[T.big+0.5,'f_recoil'],[T.big+0.85,'cannon2'],[T.fly,'fly']];
 const FLIP=t=>t>=T.behind&&t<T.fly;
 const EKF=[[0,EXg,252,0],[T.kick,EXg,252,0],[T.kick+0.1,EXg+46,226,1.0,0],[T.kick+0.42,EXg+118,176,3.7,0],[T.kick+0.74,EXg+150,252,6.28,1],[T.kick+0.74,EXg+150,252,0],[T.kick+1.15,EXg+176,252,-0.08,0],[T.kick+1.5,EXg+178,252,0,0],[T.dash+0.05,EXg+178,252,0],[T.dash+0.25,EXg+182,250,0.06,0],[T.s1+0.06,EXg+70,246,-0.1,1],[T.h1-0.02,EXg,252,0,0],[T.h1,EXg,252,0],[T.h1+0.12,EXg+5,252,0],[T.h2,EXg+5,252,0],[T.h2+0.12,EXg+11,252,0],[T.h3,EXg+11,252,0],[T.h3+0.14,EXg+19,252,0],[T.fire,EXg+19,252,0],[T.big,EXg+8,252,0],[T.big+0.4,EXg-70,214,-0.3],[T.big+0.9,EXg-95,252,-0.06,1],[T.big+1.3,EXg-100,252,-0.04],[99,EXg-100,252,-0.04]];
 const CK=[[0,1,320,180],[T.kwind,1,320,180],[T.kick-0.1,1.3,FE-40,180],[T.kick,1.55,FE-20,190],[T.kick+0.1,1.35,EXg+70,178,0],[T.kick+0.45,1.25,EXg+120,170],[T.kick+0.8,1.2,EXg+150,182],[T.kick+1.3,1.1,350,180],[T.arm-0.3,1.1,330,180],[T.arm,1.3,300,172],[T.ready+0.3,1.3,305,172],[T.dash,1.15,320,178],
  [T.s2,1.2,(FE-150+300)/2+40,175,2],[T.s2,1.5,FE-60,212],[T.s3,1.5,FE-40,212,2],[T.s3,1.15,FE-60,170],[T.vault,1.15,FE-40,170],[T.whip,1.3,EXg,140,1],
  [T.behind,1.25,BX-90,170],[T.cutin,1.25,BX-100,170],[T.charge,1.45,BX-110,172],[T.fire-0.01,1.6,BX-120,175,1],[T.fire,1.05,EXg+60,170],[T.big+0.5,1.1,EXg+40,175],[T.fly,1.1,EXg+80,170],[T.fly+1,1,360,170],[T.pose,1.05,EXg-20,175],[BEAM_END,1.15,EXg-30,180]];
 const ef=[t=>1-Math.pow(1-t,3),t=>t*t,t=>t];
 const tr=(K,t)=>{let i=0;while(i<K.length-2&&t>=K[i+1][0])i++;const a=K[i],b=K[i+1];const u=b[0]>a[0]?ef[b[4]||0](Math.max(0,Math.min(1,(t-a[0])/(b[0]-a[0])))):1;return [1,2,3].map(k=>a[k]+(b[k]-a[k])*u);};
 const pose=t=>{let p=MP[0][1];for(const [k,n] of MP)if(t>=k)p=n;return p;};
 const shotT=['s1','s2','s3'],RC=0.14;// recoil window
 const recoil=t=>{let r=0;for(const s of shotT){const d=t-T[s];if(d>=0&&d<RC)r=Math.max(r,1-d/RC);}const d=t-T.fire;if(d>=0&&d<0.3)r=Math.max(r,1-d/0.3);return r;};
 const muzzle=(t,mx,my)=>{const z=MZP[pose(t)]||MZ;return FLIP(t)?[mx-z[0],my+z[1]]:[mx+z[0],my+z[1]];};const CU0=()=>T.fire-0.36;
 function step(t,DT){
  while(S.fired<EV.length&&EV[S.fired][0]<=t){const [,n]=EV[S.fired++];snd(n);const [mx,my]=tr(MK,t),[ex]=tr(EKF,t),[qx,qy]=muzzle(t,mx,my);
   if(n==='kwind'){for(let i=0;i<8;i++)spawn({k:'smoke',x:mx+(rnd()-0.5)*30,y:FEET-2,vx:-1-rnd()*2,vy:-rnd(),life:0.6,r:3+rnd()*3});}
   if(n==='kick'){const kx=EFR+2,ky=KFY;spawn({k:'hspark',x:kx,y:ky,s:1.8,a:rnd(),life:0.25});spawn({k:'ring',x:kx,y:ky,s:1.1,life:0.3});sparks(kx,ky,30,'y',6);damage(DM.kick,kx+20,ky-60,true);S.shake=12;S.flash=1;}
   if(n==='arm'){sparks(mx+40,my-90,14,'c',3);}
   if(n==='dash'){for(let i=0;i<10;i++)spawn({k:'smoke',x:mx+(rnd()-0.5)*30,y:FEET-2,vx:-1-rnd()*2,vy:-rnd(),life:0.7,r:3+rnd()*3});}
   if(shotT.includes(n)){sparks(qx,qy,8,'c',3);S.shake=Math.max(S.shake,2);}
   if(n[0]==='h'&&n.length===2){const hy=qy+(n==='h2'?4:0);spawn({k:'hspark',x:FE+6,y:hy,s:1.1,a:rnd(),life:0.22});sparks(FE+6,hy,12,'c',4);damage(DM[n],FE+10+(+n[1])*14,hy-30-(+n[1])*8,false);S.shake=4;}
   if(n==='vault'){for(let i=0;i<12;i++)spawn({k:'smoke',x:mx+(rnd()-0.5)*40,y:FEET-2,vx:(rnd()-0.5)*3,vy:-rnd()*1.5,life:0.8,r:4+rnd()*4});}
   if(n==='behind'){S.shake=6;for(let i=0;i<14;i++)spawn({k:'smoke',x:BX+(rnd()-0.5)*60,y:FEET-2,vx:(rnd()-0.5)*3,vy:-rnd()*1.4,life:1,r:4+rnd()*5});}
   if(n==='fire'){S.flash=2;S.shake=10;}
   if(n[0]==='t'&&n.length===2){const y=ECY-10+(rnd()-0.5)*30;sparks(BE-6,y,14,'c',5);damage(DM[n],BE-10-(+n[1])*22,ECY-70-(+n[1]%2)*14,false);S.shake=Math.max(S.shake,6);}
   if(n==='big'){spawn({k:'ring',x:BE-10,y:ECY-6,s:1.8,life:0.5});spawn({k:'boom',x:BE-20,y:ECY-6,r:0,s:1.2,life:0.55});sparks(BE,ECY,50,'c',7);
    for(let i=0;i<12;i++){const a=-rnd()*3.1,v=3+rnd()*4;spawn({k:'debris',x:BE-20,y:ECY-10,vx:-Math.abs(Math.cos(a)*v)-1,vy:Math.sin(a)*v,rot:rnd()*6,vr:(rnd()-0.5)*0.4,sz:2+rnd()*3|0,col:rnd()<0.5?EN.debris:'q',life:2});}
    damage(DM.big,BE-40,ECY-110,true);S.shake=16;S.edmg=true;}
   if(n==='fly'){for(let i=0;i<16;i++)spawn({k:'smoke',x:BX+(rnd()-0.5)*50,y:FEET-2,vx:(rnd()-0.5)*4,vy:-rnd()*2,life:1,r:4+rnd()*5});}
   if(n==='ex'){const [x2,y2]=tr(EKF,t);explode(x2+10,y2-EN.cy-10,1.1*(EN.size||1));S.shake=10;}
   if(n==='pose'){S.flash=0;}}
  if(t>=T.charge&&t<T.fire){const [mx,my]=tr(MK,t),[qx,qy]=muzzle(t,mx,my),u=(t-T.charge)/(T.fire-T.charge);if(Math.floor(t*60)%2===0)for(let i=0;i<1+u*3;i++){const a=rnd()*6.28,d=50+rnd()*60;spawn({k:'spark',x:qx+Math.cos(a)*d,y:qy+Math.sin(a)*d,vx:-Math.cos(a)*d/14,vy:-Math.sin(a)*d/14,life:0.24,col:rnd()<0.5?'c':'y'});}}
  if(S.edmg&&Math.floor(t*20)%4===0){const [ex,ey]=tr(EKF,t);sparks(ex-20+rnd()*40,ey-EN.cy-20+rnd()*40,1,'y',2);}
  if(t>=T.big+0.4&&Math.floor(t*12)%3===0){const [ex,ey]=tr(EKF,t);spawn({k:'smoke',x:ex+(rnd()-0.5)*40,y:ey-EN.cy-10,vx:0.2,vy:-0.6,life:1.2,r:3+rnd()*3});}
  {const rc=recoil(t);if(rc>0.5&&Math.floor(t*60)%2===0){const [mx]=tr(MK,t);spawn({k:'smoke',x:mx+(FLIP(t)?12:-12)+(rnd()-0.5)*20,y:FEET-2,vx:(FLIP(t)?1.5:-1.5)*(1+rnd()),vy:-rnd()*0.7,life:0.5,r:2+rnd()*3});}}
  if(t>T.big+0.12&&t<T.big+0.5&&Math.floor(t*60)%2===0){const [mx,my]=tr(MK,t),[qx,qy]=muzzle(t,mx,my);beamDust(qx,qy,EXg-EN.half-34,16,'r');}
  S.scroll+=((t>T.dash&&t<T.s3+0.35)?520:8)*DT;}
 function mspr(ctx,n,x,y,flip,tint=null,alpha=1){if(!flip){spr(ctx,n,x,y,0,tint,alpha);return;}ctx.save();ctx.translate(Math.round(x),Math.round(y));ctx.scale(-1,1);spr(ctx,n,0,0,0,tint,alpha);ctx.restore();}
 // weapon-only white glow: additive white clipped to the cannon mask (never the body)
 function wpnGlow(ctx,x,y,flip,a){if(a<=0.01)return;const m=SM.cannon2;ctx.save();ctx.translate(Math.round(x),Math.round(y));if(flip)ctx.scale(-1,1);wpnPath(ctx,m,WPN.cannon2);ctx.clip();ctx.globalCompositeOperation='lighter';spr(ctx,'cannon2',0,0,0,'#ffffff',Math.min(1,a));ctx.restore();}
 function bolt(ctx,x0,x1,y,w,u){// basic beam: travelling bolt + fading rail
  const xa=Math.min(x0,x1),xb=Math.max(x0,x1);ctx.fillStyle=`rgba(255,80,110,${0.55*(1-u)})`;ctx.fillRect(xa,y-w,xb-xa,w*2);ctx.fillStyle=`rgba(255,235,240,${1-u*0.7})`;ctx.fillRect(xa,y-Math.max(1,w/2.5),xb-xa,Math.max(2,w/1.25));}
 function cutin(V,t){const F=window.FONT,ls=t-T.cutin,dur=T.charge-T.cutin,u=ls/dur,sl=eio(Math.min(1,ls/0.16)),out=Math.max(0,(ls-(dur-0.1))/0.1);
  V.fillStyle='#04070c';V.fillRect(0,0,W,H);let sd=17;const r=()=>(sd=(sd*16807)%2147483647)/2147483647;
  for(let i=0;i<50;i++){const y=Math.round(r()*H),L=60+r()*240,x=((r()*(W+L)-ls*(700+r()*600))%(W+L)+(W+L))%(W+L)-L;V.fillStyle=i%3?'#0a2a3a':'#ff4060';V.fillRect(Math.round(x),y,Math.round(L),1);}
  const y0=78,y1=282,off=-(1-sl)*700,im=PORT.big,s=(y1-y0+40)/im.height*(1+u*0.06),w=im.width*s,h=im.height*s;
  V.save();V.beginPath();V.moveTo(0+off,y0);V.lineTo(W+off,y0+20);V.lineTo(W+off,y1);V.lineTo(0+off,y1-20);V.closePath();V.clip();V.fillStyle='#08141c';V.fillRect(0,0,W,H);
  if(im.complete)V.drawImage(im,Math.round(470-w/2+off+u*14),Math.round((y0+y1)/2-h*0.42),Math.round(w),Math.round(h));
  V.fillStyle=`rgba(80,200,255,${0.08+0.05*Math.sin(ls*40)})`;V.fillRect(0,0,W,H);V.restore();
  V.fillStyle='#ff4060';for(const [a,b] of [[y0,y0+20],[y1-20,y1]])for(let x=0;x<W;x+=2){const yy=Math.round(a+(b-a)*x/W);V.fillRect(x+off,yy,2,2);}
  const tx=40-Math.round((1-eio(Math.min(1,(ls-0.08)/0.2)))*260),[l1,l2]=LINES.beam_cut.split('|'),n=Math.floor((ls-0.1)*34);
  F.draw(V,NAMES.pilot,tx,128,'#8af0ff',1);if(n>0){F.draw(V,l1.slice(0,n),tx,146,'#ffe070',3);if(n>l1.length)F.draw(V,l2.slice(0,n-l1.length),tx,176,'#ffffff',3);}
  bars(V,Math.round(4+(1-sl)*50));if(out>0){V.fillStyle=`rgba(255,255,255,${out})`;V.fillRect(0,0,W,H);}}
 function render(){const t=S.t,ctx=WX,F=window.FONT;let pn=pose(t);[MX,MY,MR]=tr(MK,t);const [ex,ey,er]=tr(EKF,t);EX0=ex;EY0=ey;ENX=ex;ENY=ey-EN.cy;const fl=FLIP(t);
  const kdash=t>T.kwind+0.3&&t<T.kick,dashing=t>T.dash&&t<T.vault,air=pn==='leap_'||pn==='fly'||(t>=T.vault&&t<T.behind);
  if(t<T.dash||(t>=T.behind+0.35&&t<T.fly))MY+=Math.round(Math.sin(t*3));if(dashing)MY+=Math.round(Math.sin(t*22)*1.5);
  const rc=recoil(t);MX+=(fl?1:-1)*Math.round(rc*(t>=T.fire?10:6));const dv=dashing?cl((t-T.dash)/0.16)*(1-0.55*cl((t-T.s1+0.05)/0.12)):0,rot=(dashing?0.04+0.1*eio(dv):0)-(fl?-1:1)*rc*0.07;if(t>T.dash-0.16&&t<T.dash){MY+=Math.round(3*cl((t-T.dash+0.16)/0.16));}
  const shx=S.shake?Math.round((rnd()-0.5)*2*S.shake):0,shy=S.shake?Math.round((rnd()-0.5)*2*S.shake):0;
  groundScene(ctx,0,S.scroll);if(dashing||(t>T.vault&&t<T.behind)||(t>T.fly&&t<T.fly+0.9))speedLines(ctx,t,'rgba(255,230,210,0.45)',t>T.fly);fxD.fill(0);
  ctx.fillStyle='#0e0a14';for(const [x,w0,y] of [[MX,26,MY],[ex,EN.shadow,ey]]){if(y<-20)continue;const w=Math.max(4,w0-(252-y)*0.12);for(let j=-3;j<=3;j++){const ww=w*Math.sqrt(1-(j*j)/12);for(let i=-ww|0;i<ww;i++)if(bay(x+i,j)<0.6)ctx.fillRect(x+i,FEET+j,1,1);}}
  // enemy
  {const P=EN.poses,hit=S.ehit>0.08,name=t>=T.pose?P.hit:(t>=T.big&&t<T.big+0.9)||(t>=T.kick&&t<T.h1)?P.launch:S.edmg?P.dmg:hit?P.hit:P.idle,efl=S.ehit>0.17&&Math.floor(t*30)%2===0;
   ctx.save();ctx.translate(ex,ENY);ctx.rotate(er);{const by=EN.cy+(EN.bob&&!S.edmg?Math.round(Math.sin(t*4)):0);espr(ctx,name,0,by,efl);}ctx.restore();}
  // afterimages
  const body=n=>n.endsWith('_')?(SPRMETA[n+'ns']?n+'ns':n.slice(0,-1)):n,trail=kdash||dashing&&t<T.dash+0.6||(t>T.vault&&t<T.whip)||(t>T.fly&&t<T.fly+0.9);
  if(trail&&Math.floor(t*60)%3===0){if(S.after.length>9)S.after.shift();S.after.push({n:pn,x:MX,y:MY,f:fl,t,c:['#ff4a5a','#9af0ff','#ffffff'][Math.floor(t*20)%3]});}
  for(const a of S.after){const age=t-a.t;if(age>0.35||age<0)continue;mspr(ctx,body(a.n),a.x,a.y,a.f,a.c,Math.max(0,0.55-age*1.5));}
  if(!trail&&S.after.length&&t-S.after[S.after.length-1].t>0.4)S.after.length=0;
  if(dashing)wingTrail(ctx,MX-26,MY-104,1,t,Math.min(1,(t-T.dash)/0.1)*(t<T.s3?1:0.5));if(kdash)wingTrail(ctx,MX-26,MY-104,1,t,0.8,110);
  // mech (sword drawn only before the arm beat; afterwards it is absent — stowed into the wing light)
  MAINM=1;const nm=body(pn),mx=Math.round(MX),my=Math.round(MY);
  if(pn==='idle'){const F0=T.kwind-0.35,sa=t>F0?Math.max(0,1-(t-F0)/0.3):1;if(sa>0)swordAround(ctx,'idle',mx,my,0,()=>spr(ctx,'idle',mx,my,0,null),null,sa);else spr(ctx,'idle_ns',mx,my,0,null);
   if(t>F0&&sa>0)swordAround(ctx,'idle',mx,my,0,()=>{},'#ffffff',1-sa);}
  else{if(rot){ctx.save();ctx.translate(mx,my);ctx.rotate(rot);mspr(ctx,nm,0,0,fl);if(nm==='cannon2')glowFor(ctx,0,0,fl,t);ctx.restore();}else{mspr(ctx,nm,mx,my,fl);if(nm==='cannon2')glowFor(ctx,mx,my,fl,t);}}
  MAINM=0;
  // beams
  const [qx,qy]=muzzle(t,MX,MY);
  for(const s of shotT){const d=t-T[s],ht=T['h'+s[1]]-T[s];if(d<0||d>ht+0.25)continue;if(d<0.1){starFlare(qx,qy+(s==='s2'?4:0),9*(1-d/0.1)+5,'r',t,1);}
   {const yy=qy+(s==='s2'?4:0),th=s==='s3'?7:6,xe=FE+10;if(d<=ht){const u=d/ht,head=qx+(xe-qx)*(1-Math.pow(1-u,1.6));epicBeam(qx,yy,head,t,th,{col:'r'});}else{const f=(d-ht)/0.25;epicBeam(qx,yy,xe,t,th,{col:'r',fade:f,tail:(xe-qx)*Math.pow(f,0.8),muzzle:f<0.3});starFlare(xe,yy,(th+3)*(1-f),'r',t,1-f);}}}
  if(t>=T.charge&&t<T.fire){const u=(t-T.charge)/(T.fire-T.charge),p=Math.floor(t*30)%2;disc(qx,qy,3+u*11+p*2,[255,255,240],1);disc(qx,qy,8+u*16,[255,70,110],0.35+u*0.3);
   for(const [dx,dy] of [[70,-150],[40,-175],[-30,-165],[60,-120]])disc(MX+dx,MY+dy,3+u*7+p,[190,240,255],0.25+u*0.5);
   for(let r=0;r<8;r++){const a=r*0.785+t*3,L=(1-u)*90+20;for(let k=L*0.3;k<L;k+=2){if(bay(qx+Math.cos(a)*k|0,qy+Math.sin(a)*k|0)>u*0.8)continue;px(qx+Math.cos(a)*k,qy+Math.sin(a)*k,k<L*0.6?[255,236,220]:[255,90,110]);}}}
  if(t>=T.fire&&t<T.big+0.5){const d=t-T.fire,xe=EXg-EN.half-34,tr0=Math.min(1,d/0.11),hx=qx+(xe-qx)*(1-Math.pow(1-tr0,2)),fade=t>T.big+0.12?Math.min(1,(t-T.big-0.12)/0.38):0,th=(18+Math.sin(t*60)*2)*(d<0.06?1.3:1)+(t>=T.big&&t<T.big+0.1?8:0);
   epicBeam(qx,qy,hx,t,th,{col:'r',fade,tail:fade>0.5?(qx-hx)*(fade-0.5)/0.5:0});if(tr0>=1&&fade<0.95){starFlare(BE-6,ECY-8,(th+6)*(1-fade),'r',t,1-fade);starFlare(xe,qy,th*0.8*(1-fade)+3,'r',t+0.2,1-fade);}}
  // thrusters
  if(air||dashing){const f2=Math.floor(t*30)%2;const bx=fl?MX+30:MX-30;disc(bx,MY-100,3+f2*2,[255,170,80],0.8);disc(bx,MY-100,1+f2,[255,255,220],1);
   if(dashing)for(let i=0;i<4;i++){disc(MX-26-i*7,MY-4+((i+f2)%2),4-i+f2,i<1?[255,255,220]:[255,140,60],0.8-i*0.15);disc(MX+8-i*7,MY-2,3-i*0.6+f2,i<1?[255,255,220]:[255,140,60],0.7-i*0.15);}
   if(pn==='fly')for(let i=0;i<8;i++)disc(MX-36-i*8,MY-40+i*9,7-i*0.7+f2*2,i<2?[255,255,220]:[255,140,60],0.85-i*0.09);}
  if(dashing&&Math.floor(t*30)%3===0)spawn({k:'smoke',x:MX-10,y:FEET-2,vx:-2-rnd()*2,vy:-rnd()*0.8,life:0.5,r:2+rnd()*3});
  for(const p of S.parts)drawPart2(p,ctx);FX.putImageData(fxImg,0,0);ctx.drawImage(fxc,0,0);
  for(const n of S.nums){const s=(n.big?4:2)+(n.age<0.1?1:0),y=n.y-Math.min(1,n.age*4)*16,str=''+n.n;F.draw(ctx,str,n.x-F.width(str,s)/2,y,n.age%0.12<0.06?'#ffffff':'#ffd040',s);}
  // camera (hard cuts = duplicated key times)
  const [z,cx,cy]=tr(CK,t);let pz=1;for(const k of ['kick','h1','h2','h3','big']){const d=t-T[k];if(d>=0&&d<0.12)pz=1+(k==='big'?0.08:0.03)*(1-d/0.12);}
  let z_=z,cx_=cx,cy_=cy;if(t>=T.dash&&t<T.s2){const bl=Math.min(1,(t-T.dash)/0.15),sp=ex-MX,zt=Math.max(1.05,Math.min(1.45,W/(sp+300)));z_=z+(zt-z)*bl;cx_=cx+(((MX+ex)/2+10)-cx)*bl;cy_=cy+((MY-66)-cy)*bl;}// 4h: low tracking two-shot: Unit 01 and the tumbling enemy both stay in frame// 4g chase: camera rides with Unit 01, then pans ahead to the returning enemy
  const zz=z_*pz,vw=W/zz,vh=H/zz;let sx=Math.round(cx_-vw/2),sy=Math.round(cy_-vh/2);sx=Math.max(0,Math.min(W-vw,sx));sy=Math.max(-60,Math.min(H-vh,sy));
  V.fillStyle='#000';V.fillRect(0,0,W,H);
  if(t>=T.pose){const u=eio(Math.min(1,(t-T.pose)/3));V.save();V.translate(320,190);V.scale(1+u*0.05,1+u*0.05);V.drawImage(world,sx,sy,vw,vh,-320+shx,-190+shy,W,H);V.restore();}
  else V.drawImage(world,sx,sy,vw,vh,shx,shy,W,H);
  if(t>=T.fire&&t<T.fire+0.05){const [fx,fy]=muzzle(t,MX,MY),px=(fx-sx)*zz,py=(fy-sy)*zz,gr=V.createRadialGradient(px,py,0,px,py,300);gr.addColorStop(0,'rgba(255,255,255,0.9)');gr.addColorStop(0.5,'rgba(255,240,235,0.35)');gr.addColorStop(1,'rgba(255,255,255,0)');V.fillStyle=gr;V.fillRect(0,0,W,H);}else if(S.flash>0&&S.flash%2){V.fillStyle='rgba(255,255,255,0.22)';V.fillRect(0,0,W,H);}
  wipe(V,t,[T.whip-0.1]);
  const CUT=t>=T.cutin&&t<T.charge;window.__shk=!S.started?'title':CUT?'cutaway':'world';window.__pn=[pn,MX,MY,t];
  if(CUT)cutin(V,t);else if(t>=CU0()&&t<T.fire){window.__shk='cutaway';cannonCU(V,(t-CU0())/(T.fire-CU0()),t,0);}else hud(V);
  if(t>=T.behind&&t<Math.min(T.cutin,T.behind+0.9)){const u=t-T.behind;if(Math.floor(u*8)%2===0||u>0.4)F.draw(V,'BEHIND!',Math.round(W*0.62),70,'#ff6070',3);}
  if(S.started&&t>=T.dlg&&t<T.dlg+2.1)dialog(V,LINES.beam_open,t-T.dlg);
  if(t>=T.pose){const u=eio(Math.min(1,(t-T.pose-0.2)/0.4));if(u>0){const N=ATTACK_LIST.find(a=>a.id==='beam').name,sz=4,tw=F.width(N,sz),x0=Math.round((W-tw)/2),y0=96;
   V.fillStyle='rgba(5,6,12,0.6)';V.fillRect(x0-14,y0-10,(tw+28)*u,56);V.fillStyle='#ff4050';V.fillRect(x0-14,y0-11,(tw+28)*u,1);V.fillRect(x0-14,y0+46,(tw+28)*u,1);
   for(let i=0;i<N.length;i++){if(i/N.length>u)break;const [r,g2,b]=TPAL(i,t);F.draw(V,N[i],x0+F.width(N.slice(0,i),sz),y0,`rgb(${r},${g2},${b})`,sz);}F.draw(V,NAMES.unit,x0,y0+52,'#f0f4ff',1);}
   if(t>T.pose+0.6){const n=Math.min(TOT,Math.round(TOT*Math.min(1,(t-T.pose-0.6)/0.5)));F.draw(V,'TOTAL DAMAGE',400,262,'#f0f4ff',2);const s=''+n;F.draw(V,s,630-F.width(s,6),282,t%0.2<0.1&&n===TOT?'#ffffff':'#ffd040',6);}}
  if(S.done&&!CAPTURE&&Math.floor(performance.now()/500)%2)F.draw(V,'TAP TO REPLAY',8,346,'#ffffff',1);
  if(S.started&&!S.done&&t<T.pose&&!CAPTURE)F.draw(V,'TAP: SKIP',588,350,'#8890a8',1);}
 function glowFor(ctx,x,y,fl,t){let a=0;if(t>=T.arm&&t<T.ready+0.2)a=Math.max(0,1-(t-T.arm)/(T.ready+0.2-T.arm));if(t>=T.charge&&t<T.fire)a=0.2+0.6*((t-T.charge)/(T.fire-T.charge))*(0.6+0.4*Math.sin(t*30));
  for(const s of shotT){const d=t-T[s];if(d>=0&&d<0.06)a=Math.max(a,0.35);}wpnGlow(ctx,x,y,fl,a);}
 return {T,EV,END:BEAM_END,skipTo:T.pose,step,render,DM,TOT,SFX:BSFX};})();
// ======================= ATTACK: sword — SCARLET TEMPEST EDGE (authored in wall seconds, PAT=1) =======================
const SSFX={dlg:['blip'],ignite:['ignite'],ready:['click'],dash:['boost'],h1:['sl1','shit'],h2:['sl2','shit'],h3:['sl3','shit'],h4:['sl1','shit'],h5:['thrust','shit'],h6:['sl2','shit'],h7:['sl3','shit'],h8:['sl1','shit'],h9:['sl2','shit'],h10:['slash','heavy'],
 launch:['launch','whoosh'],cutin:['cut'],glint:['glint'],dash2:['boost','whoosh'],pierce:['pierce'],land:['land'],flick:['snap'],ex1:['boom'],ex2:['boom'],ex3:['heavy','boom'],pose:['hero']};
const SWORD=(()=>{
 const E8=60/158.5/2,g=n=>+(0.145+n*E8).toFixed(4);// Unit 01 theme 8th-note grid
 const HN=[24,26,28,29,30,31,32,32.5,33,35];// hit grid positions: 4ths -> 8ths -> 16ths (accelerating)
 const T={dlg:g(2),ignite:g(14),ready:g(19),dash:g(22)};HN.forEach((n,i)=>T['h'+(i+1)]=g(n));
 Object.assign(T,{launch:g(38),cutin:g(46),glint:g(54),dash2:g(58),pierce:g(59),land:g(62),flick:g(65),ex1:g(67),ex2:g(68),ex3:g(69.5),pose:g(76)});
 const EV=Object.entries(T).map(([n,t])=>[t,n]).sort((a,b)=>a[0]-b[0]);
 const DMS=EN.hp/7200,R=v=>Math.round(v*DMS/10)*10;
 const DM={};[300,320,340,360,380,400,420,450,480,700].forEach((v,i)=>DM['h'+(i+1)]=R(v));Object.assign(DM,{pierce:R(2900),ex1:R(250),ex2:R(250),ex3:R(400)});
 const TOT=Object.values(DM).reduce((a,b)=>a+b,0);
 const EXg=370,FE=EXg-EN.half,ECY=FEET-EN.cy,FZ=0.5;// freeze-frame length
 const HL=p=>{const P=SWPOSE.poses[p],m=SM[p];return [P.h[0]-m.ax,P.h[1]-m.ay];};
 // per hit: strike pose, sword angle from->to (deg, 0=right 90=down), lunge dx, spark dy, windup pose override, windup flip
 // PASS 4e: real arm motion per hit: [strike pose, contact angle from, to, lunge dx, spark dy, wind-up pose, wind-up flip, wind-up angle, follow-through pose]
 const HT=[['s_mid',-60,55,0,-62,'s_wind',0,-120,'s_low','s_cmid'],['s_mid',60,-60,0,-80,'s_low',0,95,'s_rise','s_rmid'],['s_back',-20,-165,0,-70,'s_bwind',0,-150,'s_bfol','s_hmid'],['s_lung2',-80,40,0,-60,'s_wind',0,-125,'s_hfol','s_cmid'],['s_thrust',0,0,24,-64,'s_twind',0,-10,'s_thrust','s_guard'],
  ['s_mid',-150,30,0,-66,'s_spin',0,180,'s_hfol','s_smid'],['s_rise',70,-100,0,-50,'s_low',0,100,'s_bfol','s_rmid'],['s_lung2',-100,60,0,-90,'s_rise',0,-100,'s_low','s_cmid'],['s_mid',-160,20,0,-74,'s_back',0,-165,'s_hfol','s_hmid'],['s_chop',-30,80,6,-66,'s_over',0,-90,'s_chop','s_cmid']];// 4i: [..., follow-through pose, drawn mid-swing pose]
 const HX=HT.map(([p,,,dx])=>Math.round(FE-108-HL(p)[0]+dx));
 const ef=t=>1-Math.pow(1-t,3),cl=x=>Math.max(0,Math.min(1,x)),lerp=(a,b,u)=>a+(b-a)*u;
 const GL=[70,150],PC=[EXg,ECY],PE=[EXg+190,ECY+18],LX=EXg+170;// glint, pierce centre, exit point, landing feet x
 const FLY=HL('fly'),PRot=Math.atan2(PE[1]-GL[1],PE[0]-GL[0]);
 const feetFromHand=(hx,hy,r,s)=>{const c=Math.cos(r),q=Math.sin(r);return [hx-(FLY[0]*c-FLY[1]*q)*s,hy-(FLY[0]*q+FLY[1]*c)*s];};
 // mech state: {p pose, x, y, r body rot, a sword angle, f flip, s scale, sw sword on}
 function ms(t){
  if(t<T.ready)return {p:'idle',x:150,y:252,r:0,a:SWPOSE.poses.idle.a,f:0,s:1};
  if(t<T.dash){const k=cl((t-(T.dash-0.18))/0.18);return {p:'crouch',x:150-7*eio(k),y:252+Math.round(2*k),r:-0.04*k,a:SWPOSE.poses.crouch.a,f:0,s:1};}
  if(t<T.h1-0.07){const v=cl((t-T.dash)/(T.h1-0.07-T.dash)),u=v<0.12?0.5*Math.pow(v/0.12,2)*0.12:ef(v);return {p:'boost',x:lerp(143,HX[0]+30,u),y:252+Math.round(Math.sin(t*26)),r:0.06+0.13*Math.sin(Math.min(1,v*3)*Math.PI/2)*(1-0.6*cl((v-0.75)/0.25)),a:SWPOSE.poses.boost.a,f:0,s:1};}
  if(t<T.launch){let i=0;const LD=j=>{const gp=T['h'+(j+1)]-T['h'+j];return j===9?Math.min(0.3,gp*0.8):j===5?Math.min(0.13,gp*0.7):Math.min(0.1,gp*0.55);};while(i<9&&t>=T['h'+(i+2)]-LD(i+1))i++;
   const th=T['h'+(i+1)],gap=i?th-T['h'+i]:0.3,wu=i===9?Math.min(0.3,gap*0.8):i===5?Math.min(0.13,gap*0.7):Math.min(0.1,gap*0.55),[p,a0,a1,,,wp,wf,aw,fp]=HT[i],px=i?HX[i-1]:HX[0]+30;
   if(t<th){const u=cl((t-(th-wu))/wu),pa=i?HT[i-1][2]:aw,fl=wf&&u<0.6?1:0,ga=u<0.55?lerp(fl?aw:pa,aw,eio(u/0.55)):lerp(aw,a0,Math.pow(cl((u-0.55)/0.45),2)),ant=Math.sin(cl(u/0.75)*Math.PI*0.5)*(1-cl((u-0.75)/0.25));
    return {p:u>=0.5&&HT[i][9]?HT[i][9]:(wp||p),x:lerp(px,HX[i]-(i===4?18:0),eio(u))-8*ant,y:(i===6?252-26*Math.sin(u*Math.PI*0.9):252)+2*ant,r:(i===4?-0.04:0)-0.075*ant+0.05*cl((u-0.75)/0.25),a:ga,f:fl,s:1};}
   const nx=i<9?T['h'+(i+2)]-LD(i+1):T.launch,cd=Math.min(0.15,Math.max(0.06,(nx-th)*0.7)),u=cl((t-th)/cd),v=cl((t-th-cd)/Math.max(0.05,Math.min(0.2,nx-th-cd))),bo=x=>{const c1=1.25,c3=c1+1;return 1+c3*Math.pow(x-1,3)+c1*Math.pow(x-1,2);},sv=1-eio(v),lu=Math.sin(Math.min(1,u*1.6)*Math.PI*0.5);
   return {p:u<0.4?p:fp,x:HX[i]+(i===4?Math.round(6*(1-u)):0)+11*lu*sv,y:(i===7?252-8*Math.sin(cl((t-th)/0.3)*Math.PI):252)+Math.round(3*Math.sin(u*Math.PI)),r:(i===4?0.05*(1-u):0)+0.085*lu*sv,a:a0+(a1-a0)*bo(u),f:0,s:1,su:u,hi:i};}
  if(t<T.launch+0.1){const u=cl((t-T.launch)/0.1);return {p:'crouch',x:HX[9]+3*u,y:252+Math.round(2*Math.sin(u*Math.PI)),r:0,a:SWPOSE.poses.crouch.a,f:0,s:1};}// 4j: launch anticipation squash
  if(t<T.dash2){const u=cl((t-T.launch-0.1)/0.5);return {p:'leap',x:HX[9]+40*u,y:252-560*u*u,r:0,a:SWPOSE.poses.leap.a,f:0,s:1};}
  if(t<T.pierce+0.05){const a=t<T.pierce?cl((t-T.dash2)/(T.pierce-T.dash2)):1,b=t<T.pierce?0:cl((t-T.pierce)/0.05),hx=t<T.pierce?lerp(GL[0],PC[0],a*a):lerp(PC[0],PE[0],b),hy=t<T.pierce?lerp(GL[1],PC[1],a*a):lerp(PC[1],PE[1],b),s=t<T.pierce?lerp(0.3,1,cl(a*1.3)):1;
   const [x,y]=feetFromHand(hx,hy,PRot,s);return {p:'fly',x,y,r:PRot,a:PRot*180/Math.PI,f:0,s,sp:1};}
  if(t<T.pierce+FZ){const [x,y]=feetFromHand(PE[0],PE[1],PRot,1);return {p:'fly',x,y,r:PRot,a:PRot*180/Math.PI,f:0,s:1,fz:1};}
  if(t<T.land){const u=ef(cl((t-T.pierce-FZ)/(T.land-T.pierce-FZ))),[x0,y0]=feetFromHand(PE[0],PE[1],PRot,1);return {p:'fly',x:lerp(x0,LX-20,u),y:lerp(y0,FEET-8,u),r:PRot*(1-u),a:PRot*180/Math.PI*(1-u),f:0,s:1};}
  if(t<T.flick-0.2){const u=cl((t-T.land)/0.25);return {p:'crouch',x:LX-20+20*ef(u),y:252,r:0,a:SWPOSE.poses.crouch.a,f:0,s:1};}
  const fu=cl((t-T.flick)/0.22),fa=t>=T.flick?Math.sin(fu*Math.PI)*-55:0;
  return {p:'idle',x:LX,y:252,r:0,a:SWPOSE.poses.idle.a+fa,f:0,s:1};}
 const EK=t=>{let x=EXg,y=252,r=0;for(let i=1;i<=10;i++){const d=t-T['h'+i];if(d>=0)x+=Math.min(1,d/0.08)*(i===10?8:3);}
  const d8=t-T.h8;if(d8>=0&&d8<0.4)y-=22*Math.sin(d8/0.4*Math.PI);
  if(t>=T.launch&&t<T.pierce){const k=t-T.launch;r=Math.sin(k*7)*0.07*Math.max(0.25,1-k/2.2);x+=Math.sin(k*3.3)*3;}
  if(t>=T.pierce+FZ){const k=t-T.pierce-FZ;r=-0.12*Math.min(1,k/0.15)*Math.max(0.35,1-k/1.2);x-=Math.min(1,k/0.2)*8;}
  if(t>=T.ex3){const k=t-T.ex3;x-=Math.min(1,k/0.4)*14;r=-0.05;}return [x,y,r];};
 const CK=[[0,1,320,180],[T.ignite-0.3,1,320,180],[T.ignite,1.8,150,165],[T.ready+0.2,1.7,150,170],[T.dash,1.25,200,180],
  [T.h1,1.3,FE-90,168],[T.h3+0.1,1.45,FE-85,185],[T.h4,1.75,FE-80,210],[T.h6+0.1,1.7,FE-75,210],[T.h7,1.25,FE-80,160],[T.h9+0.1,1.3,FE-80,165],[T.h10,1.9,FE-50,190],[T.launch,1.5,FE-20,170],
  [T.launch+0.5,1.4,FE,120],[T.launch+0.9,1.65,EXg-30,185],[T.cutin,1.75,EXg-10,190],[T.glint,1.45,EXg-80,175],[T.dash2,1.45,EXg-80,175],[T.pierce,1.05,EXg+60,180],[T.pierce+FZ,1.05,EXg+60,180],
  [T.land,1.25,EXg+215,190],[T.flick,1.35,EXg+225,190],[T.ex1,1.1,EXg+170,180],[T.pose,1.0,EXg+150,178],[SWORD_END,1.06,EXg+150,180]];
 const tr=(K,t)=>{let i=0;while(i<K.length-2&&t>=K[i+1][0])i++;const a=K[i],b=K[i+1];const u=b[0]>a[0]?ef(cl((t-a[0])/(b[0]-a[0]))):1;return [1,2,3].map(k=>a[k]+(b[k]-a[k])*u);};
 const k5=a=>((Math.round(a/(360/SWPOSE.n))%SWPOSE.n)+SWPOSE.n)%SWPOSE.n;
 // 4f: keep the blade tip inside the world (no blade off the top of frame on high wind-ups)
 const BLEN=128;function clampTip(m){const [hx,hy]=handW(m),L=BLEN*m.s,sx=m.f?-1:1,ok=d=>{const r=d*Math.PI/180,x=hx+sx*L*Math.cos(r),y=hy+L*Math.sin(r);return x>=8&&x<=W-8&&y>=8;};if(ok(m.a))return m.a;for(let k=2;k<=180;k+=2){if(ok(m.a+k))return m.a+k;if(ok(m.a-k))return m.a-k;}return m.a;}
 // armed mech: body + canonical sword pivoted on the pose's hand (hand never detaches; only the sword angle changes)
 function armed(ctx,m,{tint=null,alpha=1,sword=true,blade=1,glow=0}={}){if(sword){m={...m,a:clampTip(m)};}const [lx,ly]=HL(m.p),k=k5(m.a);ctx.save();ctx.translate(Math.round(m.x),Math.round(m.y));if(m.f)ctx.scale(-1,1);if(m.s!==1)ctx.scale(m.s,m.s);if(m.r)ctx.rotate(m.r);
  if(sword)spr(ctx,'swA_'+k,lx,ly,0,tint,alpha);spr(ctx,m.p,0,0,0,tint,alpha);
  if(sword&&blade>0){if(blade<1){ctx.save();ctx.beginPath();ctx.arc(Math.round(lx),Math.round(ly),8+blade*130,0,7);ctx.clip();}spr(ctx,'swB_'+k,lx,ly,0,tint,alpha);if(blade<1)ctx.restore();
   if(glow>0.01){ctx.save();ctx.globalCompositeOperation='lighter';spr(ctx,'swB_'+k,lx,ly,0,'#ffffff',Math.min(1,glow));ctx.restore();}}
  ctx.restore();}
 const handW=m=>{const [lx,ly]=HL(m.p),c=Math.cos(m.r),q=Math.sin(m.r),sx=m.f?-1:1;return [m.x+sx*(lx*c-ly*q)*m.s,m.y+(lx*q+ly*c)*m.s];};
 function arc(ctx,hx,hy,a0,a1,u){// slash trail: annular sector a0->a1 around the hand
  const A0=a0*Math.PI/180,A1=a1*Math.PI/180,cw=a1>=a0;if(Math.abs(a1-a0)<3)return;
  for(const [r0,r1,col] of [[70,132,`rgba(230,40,70,${0.32*(1-u)})`],[118,128,`rgba(255,200,210,${0.75*(1-u)})`]]){ctx.fillStyle=col;ctx.beginPath();ctx.arc(hx,hy,r1,A0,A1,!cw);ctx.arc(hx,hy,r0,A1,A0,cw);ctx.closePath();ctx.fill();}}
 function step(t,DT){
  while(S.fired<EV.length&&EV[S.fired][0]<=t){const [,n]=EV[S.fired++];snd(n);const m=ms(t),[ex,ey]=EK(t);
   if(n==='ignite'){const [hx,hy]=handW(m);sparks(hx+30,hy+20,16,'c',3);}
   if(n==='dash'){for(let i=0;i<10;i++)spawn({k:'smoke',x:m.x+(rnd()-0.5)*30,y:FEET-2,vx:-1-rnd()*2,vy:-rnd(),life:0.7,r:3+rnd()*3});}
   if(n[0]==='h'&&!isNaN(+n.slice(1))){const i=+n.slice(1)-1,sy=FEET+HT[i][4]*(EN.size||1),sx=ex-EN.half+8+(i===4?6:0),big=i===9;
    spawn({k:'hspark',x:sx,y:sy,s:big?1.8:1.1,a:rnd(),life:0.22});sparks(sx,sy,big?30:12,i%2?'c':'y',big?6:4);damage(DM[n],sx+12+(i%3)*10,sy-30-(i%2)*14,big);S.shake=big?10:3+Math.min(3,i*0.4);S.cnt=i+1;S.cntT=t;if(big)S.flash=2;}
   if(n==='launch'){for(let i=0;i<14;i++)spawn({k:'smoke',x:m.x+(rnd()-0.5)*40,y:FEET-2,vx:(rnd()-0.5)*3,vy:-rnd()*1.5,life:0.8,r:4+rnd()*4});S.shake=4;}
   if(n==='pierce'){spawn({k:'ring',x:PC[0],y:PC[1],s:1.6,life:0.4});sparks(PC[0],PC[1],46,'c',7);for(let i=0;i<10;i++){const a=-rnd()*3.1,v=3+rnd()*4;spawn({k:'debris',x:PC[0],y:PC[1],vx:Math.abs(Math.cos(a)*v)+1,vy:Math.sin(a)*v,rot:rnd()*6,vr:(rnd()-0.5)*0.4,sz:2+rnd()*3|0,col:rnd()<0.5?EN.debris:'q',life:2});}
    damage(DM.pierce,PC[0],ECY-110,true);S.shake=14;S.edmg=true;}
   if(n==='land'){S.shake=5;for(let i=0;i<16;i++)spawn({k:'smoke',x:LX-20+(rnd()-0.5)*60,y:FEET-2,vx:-rnd()*4,vy:-rnd()*1.4,life:1,r:4+rnd()*5});}
   if(n==='flick'){const [hx,hy]=handW(m);sparks(hx+60,hy+50,8,'c',3);}
   if(n.startsWith('ex')){const o={ex1:[-22,-18,1],ex2:[24,-44,1],ex3:[0,10,1.35]}[n],s=EN.size||1;explode(ex+o[0]*s,ey-EN.cy+o[1]*s,o[2]*s);damage(DM[n],ex+o[0],ey-EN.cy-50+o[1],n==='ex3');S.shake=n==='ex3'?12:7;}}
  if(S.edmg&&Math.floor(t*20)%4===0){const [ex,ey]=EK(t);sparks(ex-20+rnd()*40,ey-EN.cy-20+rnd()*40,1,'y',2);}
  if(t>=T.launch&&t<T.cutin&&Math.floor(t*20)%3===0){const [ex,ey]=EK(t);sparks(ex-EN.half+rnd()*20,FEET-70+rnd()*50,1,rnd()<0.5?'c':'y',2);}
  if(t>=T.ex1&&Math.floor(t*12)%3===0){const [ex,ey]=EK(t);spawn({k:'smoke',x:ex+(rnd()-0.5)*40,y:ey-EN.cy-10,vx:0.2,vy:-0.6,life:1.2,r:3+rnd()*3});}
  S.scroll+=((t>T.dash&&t<T.h1)?700:8)*DT;}
 function cutin(V,t){const F=window.FONT,ls=t-T.cutin,dur=T.glint-T.cutin-0.15,u=ls/dur,sl=eio(Math.min(1,ls/0.16)),out=Math.max(0,(ls-(dur-0.1))/0.1);
  V.fillStyle='#0a0406';V.fillRect(0,0,W,H);let sd=29;const r=()=>(sd=(sd*16807)%2147483647)/2147483647;
  for(let i=0;i<50;i++){const y=Math.round(r()*H),L=60+r()*240,x=((r()*(W+L)+ls*(700+r()*600))%(W+L)+(W+L))%(W+L)-L;V.fillStyle=i%3?'#2a0a10':'#ffd0d8';V.fillRect(Math.round(x),y,Math.round(L),1);}
  const y0=78,y1=282,off=(1-sl)*700,im=PORT.big,s=(y1-y0+40)/im.height*(1+u*0.06),w=im.width*s,h=im.height*s;
  V.save();V.beginPath();V.moveTo(0+off,y0+10);V.lineTo(W+off,y0+30);V.lineTo(W+off,y1-10);V.lineTo(0+off,y1-30);V.closePath();V.clip();V.fillStyle='#160408';V.fillRect(0,0,W,H);
  if(im.complete)V.drawImage(im,Math.round(160-w/2+off-u*14),Math.round((y0+y1)/2-h*0.42),Math.round(w),Math.round(h));
  V.fillStyle=`rgba(255,30,60,${0.12+0.06*Math.sin(ls*40)})`;V.fillRect(0,0,W,H);V.restore();
  V.fillStyle='#ffffff';for(const [a,b] of [[y0+10,y0+30],[y1-10,y1-30]])for(let x=0;x<W;x+=2){const yy=Math.round(a+(b-a)*x/W);V.fillRect(x+off,yy,2,2);}
  const tx=330+Math.round((1-eio(Math.min(1,(ls-0.08)/0.2)))*260),[l1,l2]=LINES.sword_cut.split('|'),n=Math.floor((ls-0.1)*30);
  F.draw(V,NAMES.pilot,tx,128,'#8af0ff',1);if(n>0){F.draw(V,l1.slice(0,n),tx,146,'#ffe070',3);if(n>l1.length)F.draw(V,l2.slice(0,n-l1.length),tx,176,'#ffffff',3);}
  bars(V,Math.round(4+(1-sl)*50));if(out>0){V.fillStyle=`rgba(255,255,255,${out})`;V.fillRect(0,0,W,H);}}
 function render(){const t=S.t,ctx=WX,F=window.FONT;const m=ms(t);if(t<T.dash)m.y+=Math.round(Math.sin(t*3));
  [MX,MY,MR]=[m.x,m.y,m.r];const [ex,ey,er]=EK(t);EX0=ex;EY0=ey;ENX=ex;ENY=ey-EN.cy;
  const shx=S.shake?Math.round((rnd()-0.5)*2*S.shake):0,shy=S.shake?Math.round((rnd()-0.5)*2*S.shake):0;
  const combo=t>=T.h1-0.1&&t<T.launch,air=m.p==='leap'||m.p==='fly';
  groundScene(ctx,0,S.scroll);if(t>T.dash&&t<T.h1||t>T.launch&&t<T.launch+0.6||m.sp)speedLines(ctx,t,'rgba(255,230,210,0.5)',t>T.launch&&t<T.dash2);fxD.fill(0);
  ctx.fillStyle='#0e0a14';for(const [x,w0,y] of [[m.x,26,m.p==='fly'?FEET-(FEET-m.y)*3:m.y],[ex,EN.shadow,ey]]){if(y<-20||m.s<0.9&&x===m.x)continue;const w=Math.max(4,w0-(252-y)*0.12);for(let j=-3;j<=3;j++){const ww=w*Math.sqrt(1-(j*j)/12);for(let i=-ww|0;i<ww;i++)if(bay(x+i,j)<0.6)ctx.fillRect(x+i,FEET+j,1,1);}}
  // enemy (normal brightness on the title card)
  {const P=EN.poses,hit=S.ehit>0.08,stag=t>=T.launch&&t<T.cutin,name=t>=T.pose?P.hit:(t>=T.pierce&&t<T.pierce+FZ+0.4)||t>=T.ex3&&t<T.ex3+0.6?P.launch:S.edmg?P.dmg:hit||stag?P.hit:P.idle,efl=S.ehit>0.17&&Math.floor(t*30)%2===0&&!(t>=T.pierce&&t<T.pierce+FZ);
   ctx.save();ctx.translate(ex,ENY);ctx.rotate(er);{const by=EN.cy+(EN.bob&&!S.edmg?Math.round(Math.sin(t*4)):0);espr(ctx,name,0,by,efl);}ctx.restore();}
  // afterimages (body only, tinted)
  const trail=combo||t>T.dash&&t<T.h1||(t>T.launch&&t<T.launch+0.6)||m.sp||(t>T.pierce+FZ&&t<T.land);
  if(trail&&Math.floor(t*60)%(combo?2:3)===0){if(S.after.length>10)S.after.shift();S.after.push({m:{...m},t,c:['#ff4a5a','#9af0ff','#ffffff'][Math.floor(t*20)%3]});}
  for(const a of S.after){const age=t-a.t;if(age>0.3||age<0)continue;armed(ctx,a.m,{tint:a.c,alpha:Math.max(0,0.5-age*1.7),sword:true});}
  if(!trail&&S.after.length&&t-S.after[S.after.length-1].t>0.4)S.after.length=0;
  // slash arcs (behind the mech's front arm, over the enemy)
  if(combo)for(let i=0;i<10;i++){const th=T['h'+(i+1)],d=t-th;if(d<-0.001||d>0.2)continue;const mm=ms(Math.min(t,th+0.05)),[hx,hy]=handW({...mm,p:HT[i][0],f:0,r:mm.r,s:1});const [,a0,a1]=HT[i];
   if(i===4){ctx.fillStyle=`rgba(255,235,240,${1-d/0.2})`;ctx.fillRect(hx,hy-2,150,4);ctx.fillStyle=`rgba(255,60,90,${0.5*(1-d/0.2)})`;ctx.fillRect(hx-20,hy-6,180,12);}
   }
  {const mm={...m,a:clampTip(m)},[hx,hy]=handW(mm),sx=m.f?-1:1,ar=(mm.a*Math.PI/180+m.r),an=sx>0?ar:Math.PI-ar;tipPush(t,hx,hy,an,BLEN*m.s,m.su!==undefined||air?1:0.3);if(combo||air)tipSmear(ctx,t);}
  if(t>T.dash&&t<T.h1)wingTrail(ctx,m.x-24,m.y-108,1,t,1-cl((t-T.h1+0.2)/0.2));if(t>T.dash2&&t<T.pierce)wingTrail(ctx,m.x-20,m.y-60*m.s,1,t,0.7,220);
  // mech
  MAINM=1;{const bl=t<T.ignite?0:Math.min(1,(t-T.ignite)/0.18),gl=t>=T.ignite&&t<T.ready+0.3?Math.max(0,1-(t-T.ignite-0.18)/0.9):(m.fz?0.6:0)+(t>=T.flick&&t<T.flick+0.2?0.5:0);
   if(m.y>-300)armed(ctx,m,{blade:bl,glow:gl});}
  MAINM=0;
  // thrusters
  if(air&&!m.fz){const f2=Math.floor(t*30)%2,[hx,hy]=handW(m);if(m.p==='fly'){const c=Math.cos(m.r),q=Math.sin(m.r);for(let i=0;i<10;i++){const d=(30+i*12)*m.s;disc(m.x-c*d+q*30*m.s,m.y-q*d-c*30*m.s-60*m.s,(7-i*0.6+f2*2)*m.s,i<2?[255,255,220]:[255,140,60],0.85-i*0.08);}}
   else for(let i=0;i<6;i++)disc(m.x-10+(rnd()-0.5)*4,m.y+10+i*14,7-i+f2*2,i<2?[255,255,220]:[255,140,60],0.85-i*0.12);}
  // glint in the distance
  if(t>=T.glint&&t<T.dash2+0.05){const u=(t-T.glint)/(T.dash2+0.05-T.glint),p=Math.floor(t*30)%2,r=3+Math.sin(Math.min(1,u*1.4)*Math.PI)*8+p*2;disc(GL[0],GL[1],r,[255,255,255],1);disc(GL[0],GL[1],r*2,[255,80,110],0.35);
   ctx.fillStyle='rgba(255,255,255,0.9)';const L=Math.round(r*5);ctx.fillRect(GL[0]-L,GL[1],L*2,1);ctx.fillRect(GL[0],GL[1]-L,1,L*2);}
  for(const p of S.parts)drawPart2(p,ctx);FX.putImageData(fxImg,0,0);ctx.drawImage(fxc,0,0);
  // pierce slash line (the freeze-frame cut)
  if(t>=T.pierce&&t<T.pierce+FZ+0.25){const u=cl((t-T.pierce-FZ)/0.25),w=t<T.pierce+FZ?5:5*(1-u);ctx.save();ctx.translate(PC[0],PC[1]);ctx.rotate(PRot);ctx.fillStyle='rgba(255,60,90,0.6)';ctx.fillRect(-EN.half*1.6,-w*2,EN.half*3.2,w*4);ctx.fillStyle='#ffffff';ctx.fillRect(-EN.half*1.8,-w/2,EN.half*3.6,Math.max(1,w));ctx.restore();}
  for(const n of S.nums){const s=(n.big?4:2)+(n.age<0.1?1:0),y=n.y-Math.min(1,n.age*4)*16,str=''+n.n;F.draw(ctx,str,n.x-F.width(str,s)/2,y,n.age%0.12<0.06?'#ffffff':'#ffd040',s);}
  // camera
  const [z,cx,cy]=tr(CK,t);let pz=1;for(let i=1;i<=10;i++){const d=t-T['h'+i];if(d>=0&&d<0.1)pz=1+(i===10?0.1:0.035)*(1-d/0.1);}{const d=t-T.pierce;if(d>=0&&d<0.1)pz=1.08;}
  const zz=z*pz,vw=W/zz,vh=H/zz;let sx=Math.round(cx-vw/2),sy=Math.round(cy-vh/2);sx=Math.max(0,Math.min(W-vw,sx));sy=Math.max(-60,Math.min(H-vh,sy));
  V.fillStyle='#000';V.fillRect(0,0,W,H);const FZON=t>=T.pierce+0.02&&t<T.pierce+FZ;
  if(t>=T.pose){const u=eio(Math.min(1,(t-T.pose)/3));V.save();V.translate(320,190);V.scale(1+u*0.05,1+u*0.05);V.drawImage(world,sx,sy,vw,vh,-320+shx,-190+shy,W,H);V.restore();}
  else V.drawImage(world,sx,sy,vw,vh,FZON?0:shx,FZON?0:shy,W,H);
  if(FZON){// anime freeze frame: inverted, red-graded still
   V.save();V.globalCompositeOperation='difference';V.fillStyle='#ffffff';V.fillRect(0,0,W,H);V.globalCompositeOperation='multiply';V.fillStyle='#ff5a70';V.fillRect(0,0,W,H);V.restore();
   const px=(PC[0]-sx)*zz,py=(PC[1]-sy)*zz;V.save();V.translate(px,py);V.rotate(PRot);V.fillStyle='#ffffff';V.fillRect(-W,-2,W*2,4);V.restore();}
  if(t>=T.pierce&&t<T.pierce+0.02){const px=(PC[0]-sx)*zz,py=(PC[1]-sy)*zz,gr=V.createRadialGradient(px,py,0,px,py,260);gr.addColorStop(0,'rgba(255,255,255,0.95)');gr.addColorStop(1,'rgba(255,255,255,0)');V.fillStyle=gr;V.fillRect(0,0,W,H);}
  else if(S.flash>0&&S.flash%2&&t<T.pose){V.fillStyle='rgba(255,255,255,0.22)';V.fillRect(0,0,W,H);}
  wipe(V,t,[T.launch+0.45]);
  const CUT=t>=T.cutin&&t<T.glint-0.15;window.__shk=!S.started?'title':CUT?'cutaway':'world';window.__pn=[m.p,MX,MY,t];
  if(CUT){cutin(V,t);}else hud(V);
  // escalating hit counter
  if(S.cnt&&t<T.launch+1.2&&!CUT){const n=S.cnt,age=t-S.cntT,sz=n>=10?5:n>=7?4:3,pop=age<0.08?1:0,str=n+(n>1?' HITS':' HIT'),[r,g2,b]=hsl(50-n*5,100,60+(n>=10?Math.sin(t*40)*10:0));
   F.draw(V,str,14,64,`rgb(${r},${g2},${b})`,sz+pop);if(n>=10&&age<1.2)F.draw(V,'COMBO!',14,64+(sz+pop)*8+4,'#ffffff',2);}
  if(S.started&&t>=T.dlg&&t<T.dlg+2.1)dialog(V,LINES.sword_open,t-T.dlg);
  if(t>=T.pose){const u=eio(Math.min(1,(t-T.pose-0.2)/0.4));if(u>0){const N=ATTACK_LIST.find(a=>a.id==='sword').name,sz=4,tw=F.width(N,sz),x0=Math.round((W-tw)/2),y0=96;
   V.fillStyle='rgba(5,6,12,0.6)';V.fillRect(x0-14,y0-10,(tw+28)*u,56);V.fillStyle='#ff4050';V.fillRect(x0-14,y0-11,(tw+28)*u,1);V.fillRect(x0-14,y0+46,(tw+28)*u,1);
   for(let i=0;i<N.length;i++){if(i/N.length>u)break;const [r,g2,b]=TPAL(i,t);F.draw(V,N[i],x0+F.width(N.slice(0,i),sz),y0,`rgb(${r},${g2},${b})`,sz);}F.draw(V,NAMES.unit,x0,y0+52,'#f0f4ff',1);}
   if(t>T.pose+0.6){const n=Math.min(TOT,Math.round(TOT*Math.min(1,(t-T.pose-0.6)/0.5)));F.draw(V,'TOTAL DAMAGE',400,262,'#f0f4ff',2);const s=''+n;F.draw(V,s,630-F.width(s,6),282,t%0.2<0.1&&n===TOT?'#ffffff':'#ffd040',6);}}
  if(S.done&&!CAPTURE&&Math.floor(performance.now()/500)%2)F.draw(V,'TAP TO REPLAY',8,346,'#ffffff',1);
  if(S.started&&!S.done&&t<T.pose&&!CAPTURE)F.draw(V,'TAP: SKIP',588,350,'#8890a8',1);}
 return {T,EV,END:SWORD_END,skipTo:T.pose,step,render,DM,TOT,SFX:SSFX};})();
// ======================= ATTACK: wing — WING OF LIGHT BURST (authored in wall seconds, PAT=1) =======================
const WSFX={dlg:['blip'],raise:['glint','wing'],grow:['shimmer','whum'],mult:['shimmer'],bright:['wing','whum'],glint:['glint'],cutin:['cut'],dis:['shimmer','whum'],full:['gather'],
 fire:['heavy','wroar'],impact:['heavy','boom'],t1:['bhit'],t2:['bhit'],t3:['bhit'],t4:['bhit'],t5:['bhit'],t6:['bhit'],t7:['bhit'],big:['heavy','boom'],ex1:['boom'],ex2:['boom'],ex3:['heavy','boom'],
 back:['whoosh'],reform:['shimmer'],lower:['click'],pose:['hero']};
const WING=(()=>{
 const E8=60/158.5/2,g=n=>+(0.145+n*E8).toFixed(4);
 const T={dlg:g(2),raise:g(12),grow:g(14),mult:g(22),bright:g(26),glint:g(29),cutin:g(31),dis:g(39),full:g(47),fire:g(51),impact:g(57),
  t1:g(59),t2:g(61),t3:g(63),t4:g(65),t5:g(67),t6:g(69),t7:g(71),big:g(73),ex1:g(75),ex2:g(76),ex3:g(78),back:g(81),reform:g(83),lower:g(89),pose:g(93)};
 const EV=Object.entries(T).map(([n,t])=>[t,n]).sort((a,b)=>a[0]-b[0]);
 const DMS=EN.hp/7200,R=v=>Math.round(v*DMS/10)*10;
 const DM={impact:R(3000),t1:R(380),t2:R(400),t3:R(420),t4:R(440),t5:R(460),t6:R(480),t7:R(500),big:R(1800),ex1:R(300),ex2:R(300),ex3:R(520)},TOT=Object.values(DM).reduce((a,b)=>a+b,0);
 const MXw=150,EFX=566,EFY=224,ESC=0.42,NX=420;// wide: Unit 01 far left, enemy small on the far right; near: enemy full size at NX
 const NEAR=t=>t>=T.impact&&t<T.back;
 const WIMG=new Image();WIMG.src='data:image/png;base64,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';// palm pose split: [body without wings | wings only]
 const cl=v=>Math.max(0,Math.min(1,v)),ef=[u=>1-Math.pow(1-u,3),u=>u*u,u=>u,u=>eio(u)];
 const CK=[[0,1,320,180],[T.raise-0.01,1.12,300,178,3],[T.raise,1.6,190,155],[T.grow,1.6,190,155],[T.mult-0.01,2.1,150,140,3],[T.mult,1.45,180,165],[T.bright-0.01,1.6,170,160,3],
  [T.bright,1.75,160,158],[T.glint-0.01,2.0,155,150,3],[T.glint,3.0,MXw+8,118],[T.cutin,3.3,MXw+8,118,3],[T.dis,1.4,215,165],[T.full-0.01,2.0,255,140,3],[T.full,1.25,270,168],[T.fire-0.01,1.4,265,160,3],
  [T.fire,1.55,275,150],[T.fire+0.12,1.55,280,152],[T.impact-0.12,1.85,EFX-40,EFY-30,1],[T.impact,1.9,EFX-40,EFY-30],[T.impact,1.25,NX-30,170],[T.big,1.4,NX-10,165,3],[T.big+0.01,1.12,NX-20,172],[T.back-0.01,1.18,NX-10,172,3],
  [T.back,1.5,220,155],[T.lower,1.5,205,158,3],[T.pose,1.15,290,175,3],[T.pose+3,1.02,300,180,3],[99,1.02,300,180]];
 const tr=(K,t)=>{let i=0;while(i<K.length-2&&t>=K[i+1][0])i++;const a=K[i],b=K[i+1];const u=b[0]>a[0]?ef[b[4]||0](cl((t-a[0])/(b[0]-a[0]))):1;return [1,2,3].map(k=>a[k]+(b[k]-a[k])*u);};
 const pose=t=>t<T.raise||t>=T.lower?'idle':'palm';
 const SPH=()=>[MXw+126,252-128],ROOT=()=>[MXw-22,252-136],EYE=()=>[MXw+8,252-136];
 const efar=()=>[EFX,EFY-EN.cy*ESC];
 // crystal shard fan (behind the body). hues stay cyan -> blue -> violet -> pink (no green band)
 const HUE=[190,200,215,235,262,290,318,338,205,250,300];
 const SHD=[[-118,118,15,0],[-138,142,18,0],[-158,132,17,0],[-178,112,15,0],[-198,92,13,0],[-110,92,10,1],[-128,112,11,1],[-147,108,11,1],[-166,98,10,1],[-186,84,9,1],[-205,70,8,1]];// PASS 4e: fan kept clear of head/body & frame edge
 const hc=(h,l,a)=>`hsla(${h},100%,${l}%,${a})`;
 function wingAmt(t){// [tier0 grow, tier1 grow, brightness, dissolve 0..1]
  let g0=eio((t-T.grow)/(T.mult-T.grow)),g1=eio((t-T.mult)/0.9),br=0.35+0.5*eio((t-T.bright)/(T.cutin-T.bright)),ds=eio((t-T.dis)/(T.full-T.dis-0.3));
  if(t>=T.back){const u=eio((t-T.reform)/(T.lower-T.reform));g0=0.6*(1-u)*cl((t-T.back)/0.3);g1=0;br=0.45*(1-u);ds=0;}
  return [g0,g1,br,ds];}
 function shards(ctx,t){const [g0,g1,br,ds]=wingAmt(t);if(br<=0.01||(g0<=0.01&&g1<=0.01))return;const [rx,ry]=ROOT();ctx.save();ctx.globalCompositeOperation='lighter';
  SHD.forEach(([ad,L,w,tier],i)=>{const gr=tier?g1:g0;if(gr<=0.01)return;const pul=1+0.05*Math.sin(t*7+i*1.7),len=L*gr*pul*(1-ds*0.35),a=(ad+Math.sin(t*2+i)*3)*Math.PI/180,ca=Math.cos(a),sa=Math.sin(a),nx=-sa,ny=ca;
   const al=br*(1-ds)*(tier?0.85:1);if(al<=0.01)return;
   const x1=rx+ca*len,y1=ry+sa*len,mx=rx+ca*len*0.32,my=ry+sa*len*0.32;
   const G=ctx.createLinearGradient(rx,ry,x1,y1);G.addColorStop(0,hc(195,85,al));G.addColorStop(0.45,hc(HUE[i],65,al*0.9));G.addColorStop(1,hc(HUE[(i+3)%11],70,al*0.5));
   ctx.fillStyle=G;ctx.beginPath();ctx.moveTo(rx+nx*2,ry+ny*2);ctx.lineTo(mx+nx*w,my+ny*w);ctx.lineTo(x1,y1);ctx.lineTo(mx-nx*w*0.6,my-ny*w*0.6);ctx.closePath();ctx.fill();
   ctx.strokeStyle=hc(195,92,al*0.8);ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(rx,ry);ctx.lineTo(x1,y1);ctx.stroke();});
  ctx.restore();}
 // PASS 4j: opening dash (anticipation crouch -> leaning boost w/ trail -> overshoot skid -> settle)
 const DA=g(6),DB=g(7),DC=g(9.5),DD=g(10.6),D0=MXw-50;
 function dashW(t){if(t>=DD)return [MXw,0,null];if(t<DA)return [D0,0,null];
  if(t<DB){const u=(t-DA)/(DB-DA);return [D0-4*Math.sin(u*Math.PI/2),0,'crouch'];}
  if(t<DC){const u=(t-DB)/(DC-DB),e=1-Math.pow(1-u,3);return [D0-4+(MXw+10-D0+4)*e,0.2*Math.sin(Math.min(1,u*2.5)*Math.PI/2)*(1-u*0.6),'boost'];}
  const u=(t-DC)/(DD-DC);return [MXw+10-10*eio(u),0,u<0.6?'crouch':'idle'];}
 function mech(ctx,t,pn){const [dmx,drot,dpn]=dashW(t),mx=Math.round(dmx),my=252+Math.round(Math.sin(t*3)*(t<T.raise&&!dpn||t>T.lower?1:0));MAINM=1;
  if(dpn&&dpn!=='idle'){if(dpn==='boost'){const u=(t-DB)/(DC-DB);wingTrail(ctx,mx-26,my-104,1,t,1-u);for(let k=1;k<=3;k++){const ax=Math.round(dmx-k*14*(1-u)),al=0.32-k*0.08;swordAround(ctx,'boost',ax,my,drot,()=>spr(ctx,'boost',ax,my,drot,'#7fd0ff',al),'#7fd0ff',al);}}
   swordAround(ctx,dpn,mx,my,drot,()=>spr(ctx,dpn,mx,my,drot,null),null,1);
   if(dpn==='crouch'&&t>DC&&Math.floor(t*60)%2===0)spawn({k:'smoke',x:mx+14+(rnd()-0.5)*20,y:FEET-2,vx:1.5+rnd()*2,vy:-rnd()*0.8,life:0.5,r:2+rnd()*3});return;}
  if(pn==='idle'){swordAround(ctx,'idle',mx,my,0,()=>spr(ctx,'idle',mx,my,0,null),null,1);
   if(t<T.raise&&t>T.raise-0.3)swordAround(ctx,'idle',mx,my,0,()=>{},'#ffffff',(t-(T.raise-0.3))/0.3);// sword -> wing light (weapon-only white)
   if(t>=T.lower&&t<T.lower+0.45)swordAround(ctx,'idle',mx,my,0,()=>{},'#ffffff',1-(t-T.lower)/0.45);}// sword re-forms from the light
  else{const [,,,ds]=wingAmt(t),wa=t>=T.back?eio((t-T.reform)/(T.lower-T.reform)):1-ds;
   if(wa>=0.99||!WIMG.complete)spr(ctx,'palm',mx,my,0,null);
   else{const m=SM.palm;if(!(NOMECH&&MAINM)){ctx.drawImage(WIMG,0,0,m.w,m.h,mx-m.ax,my-m.ay,m.w,m.h);if(wa>0.01){ctx.save();ctx.globalAlpha=wa;ctx.drawImage(WIMG,m.w,0,m.w,m.h,mx-m.ax,my-m.ay,m.w,m.h);ctx.restore();}}}
   // wings brighten additively (wing pixels only, never the body)
   const [,,br]=wingAmt(t);if(WIMG.complete&&!(NOMECH&&MAINM)&&br>0.36){const m=SM.palm;ctx.save();ctx.globalCompositeOperation='lighter';ctx.globalAlpha=Math.min(0.8,(br-0.35)*1.4)*wa*(0.8+0.2*Math.sin(t*20));ctx.drawImage(WIMG,m.w,0,m.w,m.h,mx-m.ax,my-m.ay,m.w,m.h);ctx.restore();}}
  MAINM=0;}
 function step(t,DT){
  while(S.fired<EV.length&&EV[S.fired][0]<=t){const [,n]=EV[S.fired++];snd(n);const [sx,sy]=SPH(),[rx,ry]=ROOT();
   if(n==='raise'){sparks(MXw+60,232,16,'c',3);S.shake=2;}
   if(n==='grow'||n==='mult'){for(let i=0;i<20;i++){const a=-Math.PI*(0.5+rnd()*0.7),v=1+rnd()*3;spawn({k:'spark',x:rx,y:ry,vx:Math.cos(a)*v,vy:Math.sin(a)*v,life:0.5,col:'c'});}S.shake=2;}
   if(n==='bright'){S.shake=3;}
   if(n==='full'){spawn({k:'ring',x:sx,y:sy,s:0.8,life:0.4});S.shake=4;}
   if(n==='fire'){S.shake=12;spawn({k:'ring',x:sx,y:sy,s:1.4,life:0.45});for(let i=0;i<14;i++)spawn({k:'smoke',x:MXw+(rnd()-0.5)*80,y:FEET-2,vx:-1-rnd()*3,vy:-rnd(),life:0.9,r:4+rnd()*4});}
   if(n==='impact'){const y=FEET-EN.cy;spawn({k:'ring',x:NX,y,s:2.4,life:0.5});spawn({k:'boom',x:NX,y,r:0,s:1.5,life:0.6});sparks(NX,y,60,'c',8);damage(DM.impact,NX-10,y-60,true);S.shake=18;S.edmg=true;}
   if(n[0]==='t'&&n.length===2){const k=+n[1],y=FEET-EN.cy+(rnd()-0.5)*50;sparks(NX+(rnd()-0.5)*60,y,16,'c',6);damage(DM[n],NX-90+k*26,FEET-EN.cy-30-(k%2)*18,false);S.shake=Math.max(S.shake,7);}
   if(n==='big'){const y=FEET-EN.cy;spawn({k:'ring',x:NX,y,s:2.8,life:0.6});spawn({k:'boom',x:NX,y,r:0,s:1.8,life:0.7});sparks(NX,y,70,'y',9);damage(DM.big,NX,y-70,true);S.shake=20;
    for(let i=0;i<16;i++){const a=-rnd()*3.1,v=3+rnd()*5;spawn({k:'debris',x:NX,y:y-10,vx:Math.cos(a)*v,vy:Math.sin(a)*v,rot:rnd()*6,vr:(rnd()-0.5)*0.4,sz:2+rnd()*3|0,col:rnd()<0.5?EN.debris:'q',life:2});}}
   if(n==='ex1'||n==='ex2'||n==='ex3'){const o={ex1:[-40,-30],ex2:[45,10],ex3:[0,-10]}[n],y=FEET-EN.cy;explode(NX+o[0],y+o[1],(n==='ex3'?1.5:1.1)*(EN.size||1));damage(DM[n],NX+o[0],y+o[1]-40,n==='ex3');S.shake=n==='ex3'?16:10;}
   if(n==='back'){S.parts.length=0;}
   if(n==='reform'){for(let i=0;i<24;i++){const a=rnd()*6.28,d=40+rnd()*60;spawn({k:'spark',x:rx+Math.cos(a)*d,y:ry+Math.sin(a)*d,vx:-Math.cos(a)*d/20,vy:-Math.sin(a)*d/20,life:0.33,col:'c'});}}
   if(n==='pose'){S.flash=0;}}
  const [sx,sy]=SPH(),[rx,ry]=ROOT();
  // energy flowing in to the wing root while the wings grow
  if(t>=T.grow&&t<T.cutin&&Math.floor(t*60)%2===0){const u=cl((t-T.grow)/(T.cutin-T.grow));for(let i=0;i<1+u*3;i++){const a=rnd()*6.28,d=60+rnd()*90;spawn({k:'spark',x:rx+Math.cos(a)*d,y:ry+Math.sin(a)*d,vx:-Math.cos(a)*d/22,vy:-Math.sin(a)*d/22,life:0.36,col:rnd()<0.7?'c':'y'});}}
  // wings dissolve: shard particles stream into the sphere in front of the palm
  if(t>=T.dis&&t<T.fire&&Math.floor(t*60)%1===0){const [,,,ds]=wingAmt(t);for(let i=0;i<3;i++){const sh=SHD[Math.floor(rnd()*SHD.length)],a=sh[0]*Math.PI/180,l=sh[1]*rnd()*(1-ds*0.5),x=rx+Math.cos(a)*l,y=ry+Math.sin(a)*l,f=18+rnd()*10;
   spawn({k:'spark',x,y,vx:(sx-x)/f,vy:(sy-y)/f,life:f/60,col:rnd()<0.75?'c':'y'});}}
  if(NEAR(t)&&t<T.big+0.2&&Math.floor(t*30)%2===0)sparks(NX+(rnd()-0.5)*90,FEET-EN.cy+(rnd()-0.5)*90,2,'c',5);
  if(S.edmg&&Math.floor(t*12)%3===0){if(NEAR(t)){spawn({k:'smoke',x:NX+(rnd()-0.5)*60,y:FEET-EN.cy-10,vx:0.3,vy:-0.7,life:1.2,r:3+rnd()*4});}
   else if(t>=T.back){const [fx,fy]=efar();spawn({k:'smoke',x:fx+(rnd()-0.5)*20,y:fy-6,vx:0.15,vy:-0.4,life:1.4,r:2+rnd()*2});}}
  S.scroll+=8*DT;}
 function cutin(V,t){const F=window.FONT,ls=t-T.cutin,dur=T.dis-T.cutin,u=ls/dur,sl=eio(Math.min(1,ls/0.16)),out=Math.max(0,(ls-(dur-0.1))/0.1);
  V.fillStyle='#04070c';V.fillRect(0,0,W,H);let sd=23;const r=()=>(sd=(sd*16807)%2147483647)/2147483647;
  for(let i=0;i<60;i++){const y=Math.round(r()*H),L=60+r()*240,x=((r()*(W+L)-ls*(700+r()*600))%(W+L)+(W+L))%(W+L)-L;V.fillStyle=['#0a2a3a','#7fe8ff','#c08aff'][i%3];V.fillRect(Math.round(x),y,Math.round(L),1);}
  const y0=78,y1=282,off=-(1-sl)*700,im=PORT.big,s=(y1-y0+40)/im.height*(1+u*0.06),w=im.width*s,h=im.height*s;
  V.save();V.beginPath();V.moveTo(0+off,y0);V.lineTo(W+off,y0+20);V.lineTo(W+off,y1);V.lineTo(0+off,y1-20);V.closePath();V.clip();V.fillStyle='#08141c';V.fillRect(0,0,W,H);
  if(im.complete)V.drawImage(im,Math.round(470-w/2+off+u*14),Math.round((y0+y1)/2-h*0.42),Math.round(w),Math.round(h));
  V.fillStyle=`rgba(90,210,255,${0.08+0.06*Math.sin(ls*40)})`;V.fillRect(0,0,W,H);V.restore();
  V.fillStyle='#8af0ff';for(const [a,b] of [[y0,y0+20],[y1-20,y1]])for(let x=0;x<W;x+=2){const yy=Math.round(a+(b-a)*x/W);V.fillRect(x+off,yy,2,2);}
  const tx=40-Math.round((1-eio(Math.min(1,(ls-0.08)/0.2)))*260),[l1,l2]=LINES.wing_cut.split('|'),n=Math.floor((ls-0.1)*30);
  F.draw(V,NAMES.pilot,tx,128,'#8af0ff',1);if(n>0){F.draw(V,l1.slice(0,n),tx,146,'#ffe070',3);if(n>l1.length)F.draw(V,l2.slice(0,n-l1.length),tx,176,'#ffffff',3);}
  bars(V,Math.round(4+(1-sl)*50));if(out>0){V.fillStyle=`rgba(255,255,255,${out})`;V.fillRect(0,0,W,H);}}
 function beamQuad(ctx,x0,y0,x1,y1,w0,w1,col){const a=Math.atan2(y1-y0,x1-x0),nx=-Math.sin(a),ny=Math.cos(a);ctx.fillStyle=col;ctx.beginPath();ctx.moveTo(x0+nx*w0,y0+ny*w0);ctx.lineTo(x1+nx*w1,y1+ny*w1);ctx.lineTo(x1-nx*w1,y1-ny*w1);ctx.lineTo(x0-nx*w0,y0-ny*w0);ctx.closePath();ctx.fill();}
 function crispBeam(ctx,t,y,R){// PASS 4e: opaque, saturated, pixel-banded engulfing beam (core + layered glow), jagged 4px columns
   const B=[[1.0,'#1a2fb8'],[0.88,'#2c62ff'],[0.74,'#2aa8ff'],[0.58,'#5fe0ff'],[0.4,'#b8f6ff'],[0.22,'#ffffff']];ctx.save();ctx.globalCompositeOperation='source-over';
   for(const [f,c] of B){ctx.fillStyle=c;for(let x=-4;x<W+4;x+=4){const j=Math.round(Math.sin(x*0.13+t*55+f*9)*2+Math.sin(x*0.041-t*31)*2)*(f<0.3?0.5:1),h=Math.max(1,Math.round(R*f+j));ctx.fillRect(x,Math.round(y-h),4,h*2);}}
   ctx.fillStyle='#ffffff';for(let i=0;i<14;i++){const yy=Math.round(y+(((i*97+Math.floor(t*30)*13)%100)/100-0.5)*R*1.5),xx=((i*211+Math.floor(t*60)*37)%W);ctx.fillRect(xx,yy,24+i%3*10,1);}ctx.restore();}
  function bigBeam(ctx,t,x0,y0,x1,y1,w0,w1){const f=1+0.06*Math.sin(t*70);ctx.save();ctx.globalCompositeOperation='lighter';
  beamQuad(ctx,x0,y0,x1,y1,w0*2.3*f,w1*2.3*f,'rgba(70,170,255,0.22)');beamQuad(ctx,x0,y0,x1,y1,w0*1.6*f,w1*1.6*f,`rgba(${150+Math.round(60*Math.sin(t*9))},110,255,0.3)`);
  beamQuad(ctx,x0,y0,x1,y1,w0*1.05*f,w1*1.05*f,'rgba(120,230,255,0.55)');ctx.restore();beamQuad(ctx,x0,y0,x1,y1,w0*0.55,w1*0.55,'rgba(245,252,255,0.95)');
  const L=Math.hypot(x1-x0,y1-y0);for(let i=0;i<10;i++){const u=((rnd()+t*3)%1),x=x0+(x1-x0)*u,y=y0+(y1-y0)*u+(rnd()-0.5)*(w0+(w1-w0)*u)*2.2;ctx.fillStyle=['rgba(255,255,255,0.8)','rgba(150,230,255,0.8)','rgba(230,160,255,0.8)'][i%3];ctx.fillRect(Math.round(x),Math.round(y),Math.round(20+rnd()*L*0.06),1);}}
 function render(){const t=S.t,ctx=WX,F=window.FONT,pn0=pose(t),near=NEAR(t),DW=dashW(t),pn=DW[2]||pn0;MX=Math.round(DW[0]);MY=252;const P=EN.poses;
  const shx=S.shake?Math.round((rnd()-0.5)*2*S.shake):0,shy=S.shake?Math.round((rnd()-0.5)*2*S.shake):0;
  groundScene(ctx,0,S.scroll);fxD.fill(0);const [sx,sy]=SPH(),[fx,fy]=efar();
  // scene light from the gathered energy / the beam (drawn onto the backdrop only, before any unit)
  let lit=0;if(t>=T.dis&&t<T.fire)lit=0.25*cl((t-T.dis)/(T.fire-T.dis));if(t>=T.fire&&t<T.big+0.4)lit=0.45+0.05*Math.sin(t*50);if(t>=T.big+0.4&&t<T.back)lit=Math.max(0,0.45-(t-T.big-0.4)*0.6);
  if(lit>0){ctx.save();ctx.globalCompositeOperation='lighter';const lx=near?NX:sx,ly=near?FEET-EN.cy:sy,G=ctx.createRadialGradient(lx,ly,0,lx,ly,near?420:300);G.addColorStop(0,`rgba(110,200,255,${lit})`);G.addColorStop(1,'rgba(60,80,200,0)');ctx.fillStyle=G;ctx.fillRect(0,0,W,H);
   if(t>=T.fire&&t<T.big+0.4){ctx.fillStyle=`rgba(90,160,255,${lit*0.25})`;ctx.fillRect(0,0,W,H);}ctx.restore();}
  // shadows
  ctx.fillStyle='#0e0a14';const sh=near?[[NX,EN.shadow,252,1]]:[[MX,26,252,1],[EFX,EN.shadow*ESC,EFY,ESC]];
  for(const [x,w,y,k] of sh){for(let j=-3;j<=3;j++){const ww=w*Math.sqrt(1-(j*j)/12);for(let i=-ww|0;i<ww;i++)if(bay(x+i,j)<0.6)ctx.fillRect(x+i,y+Math.round(j*k),1,1);}}
  // enemy
  const hit=S.ehit>0.08,name=t>=T.pose?P.hit:near&&t>=T.big&&t<T.big+0.8?P.launch:S.edmg?P.dmg:hit?P.hit:P.idle,efl=S.ehit>0.17&&Math.floor(t*30)%2===0;
  if(near){ENX=NX;ENY=FEET-EN.cy;ctx.save();ctx.translate(NX,ENY);{const by=EN.cy+(EN.bob&&!S.edmg?Math.round(Math.sin(t*4)):0);espr(ctx,name,0,by,efl);}ctx.restore();}
  else{ENX=fx;ENY=fy;if(t<T.back){ctx.save();ctx.translate(EFX,EFY);ctx.scale(ESC,ESC);espr(ctx,name,0,(EN.bob&&!S.edmg?Math.round(Math.sin(t*4)):0),false);ctx.restore();}// PASS 4e: destroyed at 0 HP -> gone, only the burning debris glow remains
   if(t>=T.back){const p=0.5+0.5*Math.sin(t*9);disc(fx,fy+4,6+p*3,[255,150,70],0.5);disc(fx,fy+4,3+p,[255,230,170],0.8);}}
  // wings + Unit 01 (wide layout only)
  if(!near){shards(ctx,t);mech(ctx,t,pn);}
  // sphere / focal ring
  if(!near&&t>=T.dis&&t<T.big+0.4){const u=t<T.fire?eio((t-T.dis)/(T.full-T.dis)):1,p=Math.floor(t*30)%2,r=4+u*20+(t>=T.full?Math.sin(t*25)*2:0);
   disc(sx,sy,r*1.6,[90,170,255],0.3);disc(sx,sy,r,[190,240,255],0.75);disc(sx,sy,r*0.55+p,[255,255,255],1);
   ctx.save();ctx.globalCompositeOperation='lighter';ctx.lineWidth=2;for(let k=0;k<3;k++){const rr=r*(1.4+k*0.5)+(t>=T.full?0:(1-u)*30),a=t*(2+k)*(k%2?-1:1);ctx.strokeStyle=hc([190,265,320][k],70,0.55);ctx.beginPath();ctx.ellipse(sx,sy,rr*0.45,rr,a*0.15,a,a+4.4);ctx.stroke();}ctx.restore();}
  // eye glint
  if(!near&&t>=T.glint&&t<T.cutin){const u=(t-T.glint)/(T.cutin-T.glint),[ex,ey]=EYE(),L=2+10*Math.sin(Math.PI*Math.min(1,u*1.4));ctx.save();ctx.globalCompositeOperation='lighter';ctx.fillStyle='rgba(180,250,255,0.9)';ctx.fillRect(ex-L,ey,L*2+1,1);ctx.fillRect(ex,ey-L*0.6,1,L*1.2+1);ctx.restore();}
  // beam: wide (tracking along it) then near (engulfing the enemy)
  if(!near&&t>=T.fire&&t<T.impact){const u=ef[1](cl((t-T.fire)/(T.impact-0.12-T.fire))),hx=sx+(fx-sx)*u,hy=sy+(fy-sy)*u;bigBeam(ctx,t,sx,sy,hx,hy,30*cl((t-T.fire)/0.06),30-12*u);disc(hx,hy,16,[230,250,255],0.9);disc(sx,sy,24,[240,252,255],1);starFlare(sx,sy,16,'c',t,1);starFlare(hx,hy,10,'c',t+0.4,0.9);}
  if(near&&t<T.big+0.35){const d=t-T.impact,fade=cl((t-T.big)/0.35),w=(34+Math.sin(t*40)*3)*(1-fade)+(t>=T.big&&t<T.big+0.1?26:0),y=FEET-EN.cy;
   if(fade>0){const R=(EN.cy*1.2+18);for(let i=0;i<70;i++){const xx=((i*137+Math.floor(t*60)*29)%W),yy=y+(((i*53)%100)/100-0.5)*R*2.4*(0.6+fade),q=bay(xx,yy|0);if(q>(1-fade)*1.4)continue;px(xx,yy,i%3?[170,240,255]:[255,255,255]);px(xx-(i%4),yy,[90,160,255]);}}
   if(w>0.5){crispBeam(ctx,t,y,(EN.cy*1.2+18)*(w/34)*(1-fade*0.5));
    // engulfed: the enemy reads as a dark silhouette inside the beam core
    ctx.save();ctx.globalAlpha=0.3*(1-fade);ctx.translate(NX,ENY);espr(ctx,name,0,EN.cy,false);ctx.restore();}}
  for(const p of S.parts)drawPart2(p,ctx);FX.putImageData(fxImg,0,0);ctx.drawImage(fxc,0,0);
  if(t>=T.back)S.nums.length=0;// PASS 4g: no far-shot numbers bleeding into the end pose
  for(const n of S.nums){const s=(n.big?4:2)+(n.age<0.1?1:0),y=n.y-Math.min(1,n.age*4)*16,str=''+n.n;F.draw(ctx,str,n.x-F.width(str,s)/2,y,n.age%0.12<0.06?'#ffffff':'#ffd040',s);}
  // camera
  const [z,cx,cy]=tr(CK,t);let pz=1;for(const k of ['impact','big','ex3','fire']){const d=t-T[k];if(d>=0&&d<0.12)pz=1+0.07*(1-d/0.12);}
  const zz=z*pz,vw=W/zz,vh=H/zz;let vx=Math.round(cx-vw/2),vy=Math.round(cy-vh/2);vx=Math.max(0,Math.min(W-vw,vx));vy=Math.max(-60,Math.min(H-vh,vy));
  V.fillStyle='#000';V.fillRect(0,0,W,H);
  if(t>=T.pose){const u=eio(Math.min(1,(t-T.pose)/3));V.save();V.translate(320,190);V.scale(1+u*0.04,1+u*0.04);V.drawImage(world,vx,vy,vw,vh,-320+shx,-190+shy,W,H);V.restore();}
  else V.drawImage(world,vx,vy,vw,vh,shx,shy,W,H);
  const scr=(x,y)=>[(x-vx)*zz,(y-vy)*zz];
  const rad=(x,y,r,a,c='255,255,255')=>{const [px2,py2]=scr(x,y),G=V.createRadialGradient(px2,py2,0,px2,py2,r);G.addColorStop(0,`rgba(${c},${a})`);G.addColorStop(1,`rgba(${c},0)`);V.fillStyle=G;V.fillRect(0,0,W,H);};
  if(t>=T.fire&&t<T.fire+0.05)rad(sx,sy,320,0.9,'235,250,255');
  if(t>=T.impact&&t<T.impact+0.06)rad(NX,FEET-EN.cy,420,0.95,'240,250,255');
  if(t>=T.big&&t<T.big+0.05)rad(NX,FEET-EN.cy,380,0.8,'255,245,230');
  // range readout on the establishing shot
  if(S.started&&t<T.raise){const [ax,ay]=scr(EFX,EFY-EN.cy*ESC),s2=Math.round(EN.half*ESC*zz+10),bl=Math.floor(t*4)%2===0;V.fillStyle='#ff4060';
   for(const [qx,qy,dx,dy] of [[-1,-1,1,1],[1,-1,-1,1],[-1,1,1,-1],[1,1,-1,-1]]){const X=Math.round(ax+qx*s2),Y=Math.round(ay+qy*s2);V.fillRect(X,Y,dx*8,1);V.fillRect(X,Y,1,dy*8);}
   if(bl||t>2)F.draw(V,'TARGET',Math.round(ax-F.width('TARGET',1)/2),Math.round(ay-s2-14),'#ff6070',1);
   const km=(2.4).toFixed(1)+' KM';F.draw(V,'RANGE '+km,Math.round(ax-F.width('RANGE '+km,1)/2),Math.round(ay+s2+6),'#ffe070',1);
   const [mx2,my2]=scr(MXw+70,190),[ex2]=scr(EFX-EN.half*ESC-12,0);V.fillStyle='rgba(255,224,112,0.55)';for(let x=mx2;x<ex2;x+=8)V.fillRect(Math.round(x),Math.round(my2),4,1);}
  wipe(V,t,[T.impact-0.04,T.back-0.1]);
  const CUT=t>=T.cutin&&t<T.dis;window.__shk=!S.started?'title':CUT?'cutaway':(near||(t>=T.fire+0.4&&t<T.impact))?'enemyshot':'world';window.__pn=[near?'away':pn,MX,MY,t];
  if(CUT)cutin(V,t);else hud(V);
  if(S.started&&t>=T.dlg&&t<T.dlg+1.85)dialog(V,LINES.wing_open,t-T.dlg);
  if(t>=T.pose){const u=eio(Math.min(1,(t-T.pose-0.2)/0.4));if(u>0){const N=ATTACK_LIST.find(a=>a.id==='wing').name,sz=4,tw=F.width(N,sz),x0=Math.round((W-tw)/2),y0=96;
   V.fillStyle='rgba(5,6,12,0.6)';V.fillRect(x0-14,y0-10,(tw+28)*u,56);V.fillStyle='#ff4050';V.fillRect(x0-14,y0-11,(tw+28)*u,1);V.fillRect(x0-14,y0+46,(tw+28)*u,1);
   for(let i=0;i<N.length;i++){if(i/N.length>u)break;const [r,g2,b]=TPAL(i,t);F.draw(V,N[i],x0+F.width(N.slice(0,i),sz),y0,`rgb(${r},${g2},${b})`,sz);}F.draw(V,NAMES.unit,x0,y0+52,'#f0f4ff',1);}
   if(t>T.pose+0.6){const n=Math.min(TOT,Math.round(TOT*Math.min(1,(t-T.pose-0.6)/0.5)));F.draw(V,'TOTAL DAMAGE',400,262,'#f0f4ff',2);const s=''+n;F.draw(V,s,630-F.width(s,6),282,t%0.2<0.1&&n===TOT?'#ffffff':'#ffd040',6);}}
  if(S.done&&!CAPTURE&&Math.floor(performance.now()/500)%2)F.draw(V,'TAP TO REPLAY',8,346,'#ffffff',1);
  if(S.started&&!S.done&&t<T.pose&&!CAPTURE)F.draw(V,'TAP: SKIP',588,350,'#8890a8',1);}
 return {T,EV,END:WING_END,skipTo:T.pose,step,render,DM,TOT,SFX:WSFX};})();
// title-card palette shared by all attacks: crimson -> white shimmer (Unit 01 colours, no hue cycling)
function TPAL(i,t){const u=0.5+0.5*Math.sin(t*5-i*0.45),v=u*u;return [Math.round(205+50*u),Math.round(28+227*v),Math.round(48+207*v)];}
const ATTACKS={fist:FIST,beam:BEAM,sword:SWORD,wing:WING};const CUR=ATTACKS[ATK]||null;
// ---------- audio ----------
const AUD={ctx:null,start(){if(this.ctx)return;try{const A=window.AudioContext||window.webkitAudioContext;this.ctx=new A();this.out=this.ctx.createGain();this.out.gain.value=0.5;this.out.connect(this.ctx.destination);
  const nb=this.ctx.createBuffer(1,this.ctx.sampleRate,this.ctx.sampleRate),d=nb.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;this.noise=nb;}catch(e){this.ctx=null;}},
 tone(type,f0,f1,dur,vol,when=0){const c=this.ctx;if(!c)return;const t=c.currentTime+when,o=c.createOscillator(),g=c.createGain();o.type=type;o.frequency.setValueAtTime(f0,t);o.frequency.exponentialRampToValueAtTime(Math.max(20,f1),t+dur);
  g.gain.setValueAtTime(vol,t);g.gain.exponentialRampToValueAtTime(0.001,t+dur);o.connect(g);g.connect(this.out);o.start(t);o.stop(t+dur+0.05);},
 nz(dur,vol,fq,when=0,q=1){const c=this.ctx;if(!c)return;const t=c.currentTime+when,s=c.createBufferSource(),f=c.createBiquadFilter(),g=c.createGain();s.buffer=this.noise;f.type='bandpass';f.frequency.value=fq;f.Q.value=q;
  g.gain.setValueAtTime(vol,t);g.gain.exponentialRampToValueAtTime(0.001,t+dur);s.connect(f);f.connect(g);g.connect(this.out);s.start(t);s.stop(t+dur);},
 music(){const c=this.ctx;if(!c||!window.ROCKMUSIC)return;// PASS 3j: synthesized hard-rock track (music.js), same code live and offline
  const EVW={};for(const [t,n] of (ULT?EV:CUR.EV))if(EVW[n]==null)EVW[n]=R2W(V2R(t));if(ULT)for(const [t,n] of [[J0,'crouch'],[J0+0.2,'leap']])EVW[n]=R2W(t);
  this.mInfo=window.PLAYTHEME(UNIT.theme,ATK,c,this.out,EVW,ENDW,this.noise);},
 sfx(n){if(!this.ctx||CAPTURE)return;const T=this;({blip(){T.tone('square',880,880,0.05,0.05);},wing(){T.tone('sine',300,1800,0.9,0.12);T.tone('triangle',600,2400,0.8,0.06);},
  boost(){T.tone('sawtooth',200,1600,0.7,0.08);T.nz(0.8,0.2,1200,0,0.6);},throw(){T.nz(0.3,0.15,3000,0,3);},hit(){T.nz(0.15,0.3,2500);T.tone('square',600,100,0.12,0.1);},
  cut(){T.tone('square',440,880,0.2,0.08);T.tone('square',660,1320,0.2,0.06,0.1);},hum(){T.tone('sawtooth',110,160,0.6,0.08);T.tone('sine',220,330,0.6,0.1);},
  slash(){T.nz(0.4,0.4,1500,0,0.5);T.tone('sawtooth',900,60,0.4,0.15);},unfold(){for(let i=0;i<4;i++)T.tone('square',200+i*60,180+i*60,0.06,0.07,i*0.08);},
  charge(){T.tone('sine',200,2000,0.28,0.15);},beam(){T.tone('sawtooth',90,70,0.9,0.18);T.nz(0.9,0.3,900,0,0.4);T.tone('square',1200,600,0.9,0.04);},
  palm(){T.tone('sine',400,60,0.3,0.4);T.nz(0.3,0.3,1000);},boom(){T.nz(0.8,0.5,300,0,0.5);T.tone('sine',90,30,0.6,0.4);},launch(){T.nz(0.5,0.35,600,0,0.7);T.tone('sine',120,900,0.45,0.2);},whoosh(){T.nz(0.7,0.3,2200,0,0.5);T.tone('triangle',300,1400,0.6,0.08);},airhit(){T.nz(0.12,0.35,3000);T.tone('square',900,200,0.1,0.1);},
  xhum(){T.tone('sawtooth',80,160,0.9,0.08);T.tone('sine',160,320,0.9,0.1);},click(){T.tone('square',1800,1200,0.03,0.12);T.nz(0.03,0.2,5000,0,4);},clunk(){T.tone('square',300,120,0.08,0.18);T.nz(0.08,0.3,800);},
  rcharge(){T.tone('sawtooth',100,1400,0.35,0.12);T.tone('sine',200,2400,0.35,0.15);},roar(){T.tone('sawtooth',55,48,1.4,0.22);T.tone('square',110,90,1.4,0.08);T.nz(1.4,0.45,500,0,0.4);T.nz(1.3,0.2,2500,0,0.6);},
  pcharge(){T.tone('sine',300,2200,1.8,0.08);T.tone('triangle',600,3000,1.8,0.04);},sting(){T.tone('square',1568,1568,0.25,0.07);T.tone('square',2093,2093,0.25,0.05,0.04);T.nz(0.2,0.15,6000,0,3);},zing(){T.tone('sawtooth',2400,600,0.35,0.06);},snap(){T.nz(0.06,0.4,4000);},
  punch(){T.nz(0.12,0.5,900,0,0.8);T.tone('sine',150,48,0.16,0.45);T.nz(0.05,0.3,3500,0,1);},heavy(){T.nz(0.45,0.6,500,0,0.6);T.tone('sine',110,32,0.5,0.55);T.nz(0.16,0.4,2500,0,0.7);},
  swish(){T.nz(0.13,0.2,2600,0,1.2);},drop(){T.tone('triangle',900,300,0.3,0.05);T.nz(0.3,0.08,4000,0,2);},stick(){T.tone('square',220,90,0.1,0.15);T.nz(0.3,0.38,700,0,0.8);},grab(){T.tone('square',1200,1600,0.05,0.08);T.nz(0.05,0.2,5000,0,4);T.tone('sine',600,1200,0.25,0.06,0.04);},
  zap(){T.tone('sawtooth',1400,300,0.18,0.09);T.tone('square',700,180,0.16,0.05);T.nz(0.12,0.22,3500,0,1.5);},bhit(){T.nz(0.14,0.4,1800,0,0.9);T.tone('square',500,90,0.12,0.12);},
  pcharge2(){T.tone('sine',180,1800,1.5,0.1);T.tone('triangle',360,3200,1.5,0.05);T.tone('sawtooth',90,240,1.5,0.04);},bigbeam(){T.tone('sawtooth',80,60,1.4,0.2);T.nz(1.4,0.34,800,0,0.4);T.tone('square',1100,500,1.3,0.04);T.nz(0.3,0.4,300,0,0.6);},
  sl1(){T.nz(0.09,0.32,3200,0,1.1);T.tone('sawtooth',1500,400,0.08,0.05);},sl2(){T.nz(0.1,0.32,2600,0,1.1);T.tone('sawtooth',1200,320,0.09,0.05);},sl3(){T.nz(0.11,0.34,3800,0,1.3);T.tone('triangle',1800,500,0.1,0.06);},
  shit(){T.nz(0.08,0.38,1600,0,0.9);T.tone('square',420,110,0.08,0.1);},thrust(){T.nz(0.14,0.3,2000,0,0.7);T.tone('sawtooth',300,1400,0.12,0.06);},
  ignite(){T.tone('sawtooth',120,520,0.35,0.08);T.tone('sine',240,1040,0.35,0.1);T.nz(0.35,0.15,4000,0,2);},glint(){T.tone('sine',2637,2637,0.4,0.07);T.tone('sine',3951,3951,0.3,0.04,0.05);},
  pierce(){T.nz(0.25,0.5,3000,0,0.8);T.tone('sawtooth',2000,120,0.3,0.12);T.tone('sine',90,30,0.5,0.45);},
  land(){T.nz(0.55,0.42,300,0,0.6);T.tone('sine',70,30,0.45,0.35);},
  hero(){[0,4,7,12].forEach((s,i)=>T.tone('square',523*Math.pow(2,s/12),523*Math.pow(2,s/12),0.4,0.06,i*0.09));},whum(){T.tone('sine',82,98,2.4,0.12);T.tone('sawtooth',164,196,2.4,0.035);T.tone('sine',330,392,2.2,0.03);},shimmer(){[2093,2637,3136,3951,3136,4186,3520,4699].forEach((f,i)=>T.tone('sine',f,f,0.45,0.03,i*0.055));T.tone('triangle',1760,2640,0.6,0.025);T.nz(0.5,0.05,7000,0,4);},gather(){T.tone('sine',200,900,1.2,0.07);T.tone('triangle',400,1800,1.2,0.035);T.nz(1.0,0.12,1800,0,1.5);},wroar(){T.tone('sawtooth',50,40,4.0,0.22);T.tone('square',100,80,4.0,0.06);T.tone('sine',38,30,4.0,0.3);T.nz(4.0,0.45,450,0,0.4);T.nz(3.8,0.2,2600,0,0.6);T.tone('sine',1320,990,3.6,0.03);},})[n]?.();}};
// ---------- input & loop ----------
function skip(){const R13=ULT?V2R(13.0):CUR.skipTo;if(S.t<R13){S.mute=true;while(S.t<R13)step();S.mute=false;}}
function tap(e){AUD.start();if(!S.started){if(e){const r=view.getBoundingClientRect(),x=(e.clientX-r.left)/r.width*W,y=(e.clientY-r.top)/r.height*H;
  for(const b of BTNS()){const r=b.r;if(x>=r[0]&&x<=r[0]+r[2]&&y>=r[1]&&y<=r[1]+r[3]){if(b.act){b.act();AUD.sfx('blip');render();}return;}}}
 S.started=true;AUD.music();return;}if(S.done){if(EMBED)return;reset();S.started=true;AUD.music();return;}skip();}
view.addEventListener('pointerdown',e=>{e.preventDefault();tap(e);});window.addEventListener('keydown',e=>{if(e.key===' '||e.key==='Enter')tap();});
function fit(){const vv=window.visualViewport;const vw=vv?vv.width:window.innerWidth,vh=vv?vv.height:window.innerHeight;let s=Math.min(vw/W,vh/H);if(!(s>0))s=1;if(s>=2)s=Math.floor(s);view.style.width=(W*s)+'px';view.style.height=(H*s)+'px';}
window.addEventListener('resize',fit);if(window.visualViewport)window.visualViewport.addEventListener('resize',fit);window.addEventListener('orientationchange',()=>setTimeout(fit,80));fit();
function bootImgs(){const list=[];for(const k in GI){const i=GI[k];if(i instanceof HTMLImageElement&&i.getAttribute('src'))list.push(i);}for(const s of window.RDF_SLICES)list.push(s.img);return list;}
let ASSETS_READY=false,LOAD_T0=performance.now();
function drawLoading(){const all=bootImgs(),done=all.filter(i=>i.complete).length,n=Math.max(1,all.length),u=done/n;V.fillStyle='#07060c';V.fillRect(0,0,W,H);
 const g=V.createLinearGradient(0,0,0,H);g.addColorStop(0,'#241028');g.addColorStop(0.55,'#c45a28');g.addColorStop(1,'#1a1014');V.fillStyle=g;V.fillRect(0,0,W,150);
 V.fillStyle='#05060c';V.fillRect(70,168,500,22);V.fillStyle='#cf2a34';V.fillRect(74,172,Math.round(492*u),14);V.fillStyle='#fff';V.fillRect(74,172,Math.round(492*u),3);
 const F=window.FONT;if(F){F.draw(V,'UNIT 01',70,48,'#ff715c',2);F.draw(V,'LOADING BATTLE',70,78,'#fff',3);F.draw(V,done+' / '+all.length,70,204,'#9aa3bf',2);}}
function armBattle(){if(ASSETS_READY)return;ASSETS_READY=true;view.dataset.rdf='ready';if(!EMBED&&window.RDF_LOAD_REST)window.RDF_LOAD_REST();if(EMBED&&!CAPTURE){S.started=true;try{AUD.start();AUD.music();}catch(e){}}}
Promise.race([Promise.all(bootImgs().map(i=>i._rdf||Promise.resolve())),new Promise(r=>setTimeout(r,12000))]).then(armBattle);
let last=performance.now(),acc=0;let _posted=false;function loop(now){if(EMBED&&S.done&&!_posted){_posted=true;try{parent.postMessage({type:'rdf-battle-done',attack:ATK},'*');}catch(e){}}
 if(!ASSETS_READY){if(performance.now()-LOAD_T0>12000)armBattle();else{drawLoading();requestAnimationFrame(loop);return;}}
 acc+=Math.min(0.1,(now-last)/1000);last=now;while(acc>=DT){step();acc-=DT;}try{render();}catch(e){if(!window.__renderErr){window.__renderErr=String(e&&e.message||e);console.error(e);}V.fillStyle='#12080c';V.fillRect(0,0,W,H);}requestAnimationFrame(loop);}
window.__start=()=>{S.started=true;};window.__advance=n=>{for(let i=0;i<n;i++)step();render();return S.t;};window.__seek=t=>{reset();S.started=true;while(S.t<t)step();render();return S.t;};
window.__setSky=k=>{SKY_V=k;render();};window.__skip=()=>{skip();render();return S.t;};window.__aud=ULT?{AUD,EV,END,PACE,ENDW,R2W,JA,JB,PREST,SFX,V2R,BLIP0:0.25,JEV:[[J0,'crouch'],[J0+0.2,'leap'],[HOLDS[0].r,'ots'],[HOLDS[1].r,'grip'],[HOLDS[2].r,'visor'],[J0+1.15,'below']]}:{AUD,EV:CUR.EV,END,PACE:1,ENDW,R2W,JA,JB,PREST,SFX:CUR.SFX,V2R,BLIP0:CUR.T.dlg,JEV:[]};window.__atk={ATK,EN:EN.id,T:ULT?null:CUR.T};window.__dbg=()=>[MX,MY,S.t,VT(S.t),jumpState(S.t)];window.__probe=()=>{const sd=seed,af=S.after.map(a=>({...a})),sk=S.shake;NOMECH=1;render();const A=V.getImageData(0,0,W,H).data;seed=sd;S.after=af;S.shake=sk;NOMECH=0;render();const B=V.getImageData(0,0,W,H).data;let n=0,x0=W,x1=-1,y0=H,y1=-1;for(let i=0;i<A.length;i+=4){if(Math.abs(A[i]-B[i])+Math.abs(A[i+1]-B[i+1])+Math.abs(A[i+2]-B[i+2])>24){n++;const p=i>>2,x=p%W,y=(p/W)|0;if(x<x0)x0=x;if(x>x1)x1=x;if(y<y0)y0=y;if(y>y1)y1=y;}}return {n,bb:[x0,y0,x1,y1],shk:window.__shk,pn:window.__pn};};window.__audit=()=>{const sd0=seed,af0=S.after.map(a=>({...a})),sk0=S.shake;render();seed=sd0;S.after=af0;S.shake=sk0;const sd=seed,af=S.after.map(a=>({...a})),sk=S.shake;NOMECH=1;render();const A=V.getImageData(0,0,W,H).data;seed=sd;S.after=af;S.shake=sk;NOMECH=0;
 window.__REC=[];window.__PAN=[];window.__HUDF=false;const BL=[];window.__BL=BL;
 render();window.__BL=null;const REC=window.__REC,PAN=window.__PAN;window.__REC=null;window.__PAN=null;const B=V.getImageData(0,0,W,H).data;
 if(!window.__SA){const sl=window.RDF_SLICES&&window.RDF_SLICES[0];window.__SA=sl&&sl.alpha?sl.alpha:{width:1,height:1,data:new Uint8ClampedArray(4)};}
 const SA=window.__SA,out=[];const diff=i=>Math.abs(A[i]-B[i])+Math.abs(A[i+1]-B[i+1])+Math.abs(A[i+2]-B[i+2])>18;
 const toS=(r,x,y)=>{let p=r.T.transformPoint(new DOMPoint(x,y));if(r.c==='w'){if(!BL.length)return null;const [[sx,sy,vw,vh,dx,dy,dw,dh],VT]=BL[BL.length-1];p=VT.transformPoint(new DOMPoint(dx+(p.x-sx)*dw/vw,dy+(p.y-sy)*dh/vh));}return p;};
 for(const r of REC){if(r.c==="o"||r.al<0.95||r.cut)continue;const m=SM[r.name];let tot=0,off=0,hud=0,hid=0;const reg={};
  for(let y=0;y<m.h;y+=3)for(let x=0;x<r.w;x+=3){const ai=((m.y+y)*SA.width+m.x+x)*4+3;if(SA.data[ai]<128)continue;tot++;const p=toS(r,x-m.ax,y-m.ay);if(!p)continue;const px=Math.floor(p.x),py=Math.floor(p.y);
   const part=y<m.h*0.22?'head':y>m.h*0.72?'legs':'body';let why=null;
   if(px<0||py<0||px>=W||py>=H)why='edge';else if(!window.__HUDF&&PAN.some(([a,b,c,d])=>px>=a&&px<a+c&&py>=b&&py<b+d))why='hud';else if(!diff((py*W+px)*4))why='hidden';
   if(why){const k=why+':'+part+':'+(why==='edge'?(px<0?'L':px>=W?'R':py<0?'T':'B'):'');reg[k]=(reg[k]||0)+1;if(why==='edge')off++;else if(why==='hud')hud++;else hid++;}}
  out.push({name:r.name,c:r.c,tot,off,hud,hid,reg});}
 return {shk:window.__shk,pn:window.__pn,spr:out};};
window.__ready=true;
if(EMBED&&!CAPTURE){const _ua=()=>{try{if(AUD.ctx&&AUD.ctx.resume)AUD.ctx.resume();}catch(e){}};window.addEventListener('pointerdown',_ua,{once:true});window.__embedDone=()=>S.done;}
if(CAPTURE){render();}else requestAnimationFrame(loop);
})();
