// Aurora Vanguard - procedural hand-shaded pixel sprites (palette ramps, scanline raster, no AA)
(function(){
const hex=h=>{const n=parseInt(h.slice(1),16);return [(n>>16)&255,(n>>8)&255,n&255,255];};
const RAMP={ // deep, shadow, base, light
 w:['#2a3352','#7c86a6','#c9d1e2','#ffffff'], r:['#3c0814','#86142a','#cf2a34','#ff715c'],
 n:['#0a0f28','#18245a','#2b3f8c','#5d7fd6'], g:['#15161e','#3c4052','#696f86','#a5acc2'],
 c:['#0a4a78','#1ea6dc','#7eefff','#ffffff'], y:['#4a2c06','#9a6214','#e2a82c','#fff07a'],
 p:['#170d26','#3a2758','#654995','#a68ad8'], q:['#141519','#3a3c46','#6c6f7c','#b0b3c0'],
 e:['#3a0000','#a00010','#ff2a2a','#ffd0c0'], k:['#0c0c12','#22222c','#3a3a48','#5a5a6a'],
};
const R={};for(const k in RAMP)R[k]=RAMP[k].map(hex);
const OUT=hex('#07070e');
const BAYER=[0,8,2,10,12,4,14,6,3,11,1,9,15,7,13,5];
window.BAYER=BAYER;

function Buf(w,h){this.w=w;this.h=h;this.c=document.createElement('canvas');this.c.width=w;this.c.height=h;
 this.x=this.c.getContext('2d');this.img=this.x.createImageData(w,h);this.d=new Uint32Array(this.img.data.buffer);
 this.m=new Uint8Array(w*h);}
Buf.prototype.clear=function(){this.d.fill(0);};
const pack=c=>(c[3]<<24)|(c[2]<<16)|(c[1]<<8)|c[0];
const PK={};for(const k in R)PK[k]=R[k].map(pack);const POUT=pack(OUT);

function rasterMask(B,pts){ // fill B.m with 1, return bbox
 let y0=1e9,y1=-1e9,x0=1e9,x1=-1e9;for(const p of pts){y0=Math.min(y0,p[1]);y1=Math.max(y1,p[1]);x0=Math.min(x0,p[0]);x1=Math.max(x1,p[0]);}
 y0=Math.max(0,Math.floor(y0));y1=Math.min(B.h-1,Math.ceil(y1));x0=Math.max(0,Math.floor(x0)-1);x1=Math.min(B.w-1,Math.ceil(x1)+1);
 for(let y=y0-1;y<=y1+1;y++){if(y<0||y>=B.h)continue;for(let x=x0-1;x<=x1+1;x++)if(x>=0&&x<B.w)B.m[y*B.w+x]=0;}
 const n=pts.length;
 for(let y=y0;y<=y1;y++){const sy=y+0.5,xs=[];
  for(let i=0;i<n;i++){const a=pts[i],b=pts[(i+1)%n];if((a[1]<=sy&&b[1]>sy)||(b[1]<=sy&&a[1]>sy))xs.push(a[0]+(sy-a[1])/(b[1]-a[1])*(b[0]-a[0]));}
  xs.sort((a,b)=>a-b);
  for(let i=0;i+1<xs.length;i+=2){let xa=Math.max(0,Math.ceil(xs[i]-0.5)),xb=Math.min(B.w-1,Math.floor(xs[i+1]-0.5));for(let x=xa;x<=xb;x++)B.m[y*B.w+x]=1;}}
 return [x0,y0,x1,y1];}
function M(B,x,y){return x>=0&&y>=0&&x<B.w&&y<B.h&&B.m[y*B.w+x]===1;}
function shadePart(B,pts,mat,opt){opt=opt||{};const bb=rasterMask(B,pts),P=PK[mat];
 for(let y=bb[1];y<=bb[3];y++)for(let x=bb[0];x<=bb[2];x++){if(!M(B,x,y))continue;
  let c;const edge=!M(B,x-1,y)||!M(B,x+1,y)||!M(B,x,y-1)||!M(B,x,y+1);
  if(edge&&!opt.noLine)c=P[0];
  else if(!M(B,x-2,y-2)||(!M(B,x,y-2)&&opt.top!==false))c=P[3];
  else if(!M(B,x+2,y+2)||!M(B,x+1,y+2))c=P[1];
  else if((!M(B,x+4,y+4))&&((x+y)&1))c=P[1];
  else if(opt.glow)c=P[3];
  else c=P[2];
  if(opt.flash)c=(x+y)&1?P[3]:pack([255,255,255,255]);
  B.d[y*B.w+x]=c;}}
function outline(B){const w=B.w,h=B.h,d=B.d,o=new Uint32Array(d);
 for(let y=1;y<h-1;y++)for(let x=1;x<w-1;x++){const i=y*w+x;if(d[i])continue;
  if(d[i-1]||d[i+1]||d[i-w]||d[i+w])o[i]=POUT;}B.d.set(o);}
function flush(B){B.x.putImageData(B.img,0,0);}

// ---------- transforms ----------
const rot=(P,th,par)=>{const c=Math.cos(th),s=Math.sin(th);return p=>par([P[0]+c*(p[0]-P[0])-s*(p[1]-P[1]),P[1]+s*(p[0]-P[0])+c*(p[1]-P[1])]);};
const ell=(cx,cy,rx,ry,n=20,a0=0,a1=Math.PI*2)=>{const o=[];for(let i=0;i<n;i++){const a=a0+(a1-a0)*i/n;o.push([cx+Math.cos(a)*rx,cy+Math.sin(a)*ry]);}return o;};
const seg=(a,b,w0,w1)=>{const dx=b[0]-a[0],dy=b[1]-a[1],L=Math.hypot(dx,dy)||1,nx=-dy/L,ny=dx/L;w1=w1??w0;
 return [[a[0]+nx*w0,a[1]+ny*w0],[b[0]+nx*w1,b[1]+ny*w1],[b[0]-nx*w1,b[1]-ny*w1],[a[0]-nx*w0,a[1]-ny*w0]];};

// ---------- HALBERION ----------
const sh=(pts,dx,dy)=>pts.map(p=>[p[0]+dx,p[1]+dy]);
const LEG={thigh:[[-8,-82],[8,-82],[7,-50],[-7,-48]], thighArm:[[-6,-80],[6,-80],[5,-64],[-6,-62]],
 shin:[[-8,-50],[10,-52],[12,-30],[9,-10],[-6,-10],[-9,-30]], shinStripe:[[9,-46],[12,-44],[11,-16],[8,-16]],
 knee:[[-5,-58],[9,-58],[13,-46],[6,-40],[-4,-44]], foot:[[-10,-12],[8,-12],[16,-4],[17,0],[-12,0],[-12,-6]],
 toe:[[6,-6],[17,-2],[17,0],[6,0]], heel:[[-13,-6],[-7,-6],[-7,0],[-13,0]]};
const ARM={upper:[[-4,-124],[5,-124],[5,-104],[-4,-104]], fore:[[-6,-108],[7,-108],[8,-90],[-6,-88]],
 cuff:[[-6,-92],[8,-92],[8,-87],[-6,-86]], hand:[[-4,-88],[6,-88],[7,-79],[-4,-79]], palm:[[-2,-88],[10,-90],[11,-80],[-2,-79]],
 pauld:[[-10,-140],[6,-142],[14,-134],[14,-120],[0,-114],[-12,-122]], pauldTrim:[[-10,-142],[6,-144],[10,-139],[-8,-137]],
 pauldFin:[[-4,-136],[8,-136],[10,-124],[-2,-122]]};
const PIV={pel:[0,-80],tor:[0,-86],head:[1,-138],fS:[4,-126],fE:[4,-106],fW:[4,-86],bS:[-10,-128],bE:[-10,-108],bW:[-10,-88],
 fH:[5,-80],fK:[5,-50],fA:[5,-10],bH:[-6,-80],bK:[-6,-50],bA:[-6,-10],can:[-10,-138],wing:[-14,-122]};
window.HPOSE={
 idle:{tor:0.06,head:0,fU:-0.45,fL:-0.6,sw:0.95,bU:-0.25,bL:-0.8,tF:-0.25,sF:0.25,tB:0.32,sB:0.18,wing:0.15,can:0,air:0,swv:1,boo:1,open:0},
 boost:{tor:0.18,head:-0.05,fU:-0.15,fL:-0.35,sw:1.3,bU:0.5,bL:-0.4,tF:-0.55,sF:0.7,tB:0.45,sB:0.55,wing:1,can:0,air:14,swv:1,boo:1,open:0},
 dash:{tor:0.55,head:-0.4,fU:0.7,fL:-0.25,sw:1.7,bU:0.9,bL:-0.5,tF:-1.0,sF:1.1,tB:0.8,sB:0.7,wing:1,can:0,air:20,swv:1,boo:1,open:0},
 wind:{tor:-0.15,head:0,fU:0.9,fL:-1.3,sw:0,bU:0.3,bL:-0.6,tF:-0.4,sF:0.3,tB:0.4,sB:0.25,wing:0.8,can:0,air:4,swv:0,boo:1,open:1},
 throw:{tor:0.3,head:0.05,fU:-1.9,fL:-0.1,sw:0,bU:0.7,bL:-0.8,tF:-0.7,sF:0.4,tB:0.6,sB:0.25,wing:0.8,can:0,air:4,swv:0,boo:0,open:1},
 raise:{tor:-0.25,head:-0.15,fU:-2.9,fL:-0.3,sw:0.95,bU:-2.6,bL:-0.5,tF:-0.5,sF:0.6,tB:0.3,sB:0.5,wing:1,can:0,air:40,swv:1,boo:0,open:0},
 slash:{tor:0.45,head:0.2,fU:-1.0,fL:-0.15,sw:1.35,bU:-0.9,bL:-0.3,tF:-1.0,sF:0.9,tB:0.95,sB:0.35,wing:1,can:0,air:0,swv:1,boo:0,open:0},
 cannon:{tor:0.04,head:0,fU:-1.25,fL:-0.4,sw:0,bU:-0.5,bL:-1.4,tF:-0.55,sF:0.35,tB:0.65,sB:0.25,wing:0.6,can:1,air:0,swv:0,boo:0,open:1},
 palm:{tor:0.35,head:0.1,fU:-1.6,fL:0.0,sw:0,bU:0.8,bL:-0.6,tF:-1.0,sF:0.9,tB:0.95,sB:0.35,wing:1,can:0,air:0,swv:0,boo:0,open:1},
 hero:{tor:-0.06,head:-0.12,fU:-2.45,fL:-0.15,sw:1.55,bU:0.25,bL:-0.35,tF:-0.3,sF:0.15,tB:0.38,sB:0.12,wing:1,can:0,air:0,swv:1,boo:1,open:0},
};
window.lerpPose=(a,b,t)=>{const o={};for(const k in a)o[k]=a[k]+(b[k]-a[k])*t;return o;};

const HB=new Buf(460,400), HO=[200,320];
function wingShard(B,root,ang,len,wid,hueOff,alpha,time){
 const dx=Math.cos(ang),dy=Math.sin(ang),nx=-dy,ny=dx;
 const pts=[[root[0]+nx*2,root[1]+ny*2],[root[0]+dx*len*0.55+nx*wid,root[1]+dy*len*0.55+ny*wid],[root[0]+dx*len,root[1]+dy*len],[root[0]+dx*len*0.6-nx*wid*0.4,root[1]+dy*len*0.6-ny*wid*0.4],[root[0]-nx*2,root[1]-ny*2]];
 const bb=rasterMask(B,pts);
 for(let y=bb[1];y<=bb[3];y++)for(let x=bb[0];x<=bb[2];x++){if(!M(B,x,y))continue;
  const t=((x-root[0])*dx+(y-root[1])*dy)/len, edge=!M(B,x-1,y)||!M(B,x+1,y)||!M(B,x,y-1)||!M(B,x,y+1);
  const th=BAYER[(y&3)*4+(x&3)]/16; const a=edge?1:alpha*(0.55+0.45*(1-t));
  if(th>a)continue;
  const hue=(178+Math.pow(t,3.5)*240+hueOff*0.3+Math.sin(time*4+hueOff)*10+360)%360, L=edge?90:(62+22*(1-t)+(((x+y+Math.floor(time*20))%9)===0?20:0));
  const [r,g,b]=hsl(hue,100,Math.min(96,L)); const i=y*B.w+x; if(B.d[i]&&!edge)continue; B.d[i]=pack([r,g,b,255]);}}
function hsl(h,s,l){s/=100;l/=100;const k=n=>(n+h/30)%12,a=s*Math.min(l,1-l),f=n=>l-a*Math.max(-1,Math.min(k(n)-3,Math.min(9-k(n),1)));
 const q=v=>Math.round(v*255/16)*16; return [Math.min(255,q(f(0))),Math.min(255,q(f(8))),Math.min(255,q(f(4)))];}
window.hsl=hsl;

window.renderMech=function(P,time,opt){opt=opt||{};const B=HB;B.clear();
 const base=p=>[p[0]+HO[0],p[1]+HO[1]-P.air];
 const pel=rot(PIV.pel,P.tor*0.3,base), tor=rot(PIV.tor,P.tor*0.7,pel), head=rot(PIV.head,P.head,tor);
 const fS=rot(PIV.fS,P.fU,tor), fE=rot(PIV.fE,P.fL,fS), fW=rot(PIV.fW,0.2,fE);
 const bS=rot(PIV.bS,P.bU,tor), bE=rot(PIV.bE,P.bL,bS), bW=rot(PIV.bW,0.2,bE);
 const pelA=P.tor*0.3;
 const fH=rot(PIV.fH,P.tF-pelA,pel), fK=rot(PIV.fK,P.sF,fH), fA=rot(PIV.fA,-(P.tF+P.sF),fK);
 const bH=rot(PIV.bH,P.tB-pelA,pel), bK=rot(PIV.bK,P.sB,bH), bA=rot(PIV.bA,-(P.tB+P.sB),bK);
 // ground: lowest ankle stays on floor
 const fy=fA([5,0])[1], by=bA([-6,0])[1], low=Math.max(fy,by), gshift=(HO[1]-P.air)-low;
 const G=f=>p=>{const q=f(p);return [q[0],q[1]+gshift];};
 const fl=opt.flash, part=(f,pts,mat,o)=>shadePart(B,pts.map(G(f)),mat,Object.assign({flash:fl},o||{}));
 const anchors={};
 // wings (behind)
 const wr=G(tor)(PIV.wing); anchors.wing=wr;
 const spread=P.wing, glow=opt.wingGlow||0;
 for(let i=0;i<6;i++){const f=i/5;
  const ang=(1-spread)*(1.7+f*0.55)+spread*(2.25+f*2.15)+Math.sin(time*3+i)*0.04;
  const len=(46+28*Math.sin(f*Math.PI)+spread*22)*(1+glow*0.15), wid=13+spread*9;
  wingShard(B,wr,ang,len,wid,i*25,0.5+0.35*spread+glow*0.3,time);}
 // cannon
 const cAng=(1-P.can)*(-1.75)+P.can*0.02, can=rot([0,0],cAng,p=>G(tor)([p[0]+PIV.can[0],p[1]+PIV.can[1]]));
 const drawCannon=()=>{part(can,[[-8,-7],[26,-7],[28,7],[-8,8]],'n');part(can,[[-4,-10],[20,-10],[20,-6],[-4,-6]],'w');
  part(can,[[26,-4],[58*P.can+30*(1-P.can),-4],[58*P.can+30*(1-P.can),4],[26,4]],'g');part(can,[[54*P.can+28*(1-P.can),-7],[62*P.can+34*(1-P.can),-6],[62*P.can+34*(1-P.can),6],[54*P.can+28*(1-P.can),7]],'r');
  part(can,[[4,2],[14,2],[14,5],[4,5]],'c',{glow:1});anchors.muzzle=can([62*P.can+34*(1-P.can),0]);};
 if(P.can<0.5)drawCannon();
 // back arm
 part(bS,sh(ARM.upper,-14,-2),'g');part(bE,sh(ARM.fore,-14,-2),'w');part(bE,sh(ARM.cuff,-14,-2),'r');part(bW,sh(ARM.hand,-14,-2),'n');
 part(bS,sh(ARM.pauld,-12,0),'r');
 // back leg
 part(bH,sh(LEG.thigh,-11,0),'g');part(bK,sh(LEG.shin,-11,0),'w');part(bK,sh(LEG.shinStripe,-11,0),'n');part(bA,sh(LEG.foot,-11,0),'r');part(bA,sh(LEG.heel,-11,0),'g');part(bH,sh(LEG.knee,-11,0),'r');
 // pelvis
 part(pel,[[-12,-90],[12,-90],[12,-80],[-12,-80]],'g');
 part(pel,[[-14,-88],[-2,-88],[-4,-70],[-16,-74]],'w');part(pel,[[0,-88],[14,-88],[16,-74],[8,-66],[2,-70]],'w');part(pel,[[2,-86],[8,-86],[7,-72],[3,-72]],'r');
 if(P.boo>0.5){part(pel,[[-18,-86],[-10,-90],[-6,-80],[-10,-76],[-14,-82],[-20,-74]],'y');}
 // torso
 part(tor,[[-12,-94],[10,-94],[10,-86],[-12,-86]],'g');part(tor,[[-10,-100],[10,-100],[10,-94],[-10,-94]],'g');
 part(tor,[[-18,-132],[14,-134],[18,-112],[12,-98],[-12,-100],[-18,-114]],'n');
 part(tor,[[-4,-134],[16,-132],[20,-116],[10,-106],[-2,-112]],'w');
 part(tor,[[-12,-140],[8,-140],[14,-134],[-14,-132]],'r');
 part(tor,[[-16,-114],[-4,-112],[-2,-104],[-14,-102]],'r');
 part(tor,[[8,-124],[14,-124],[14,-118],[8,-118]],'c',{glow:1});anchors.core=G(tor)([11,-121]);
 if(P.can>=0.5)drawCannon();
 // head
 part(head,[[-8,-158],[6,-160],[13,-152],[13,-141],[-5,-137],[-10,-148]],'w');
 part(head,[[0,-153],[14,-152],[14,-142],[1,-143]],'n');
 part(head,[[4,-150],[14,-149],[14,-147],[4,-148]],'c',{glow:1,noLine:true});anchors.eye=G(head)([13,-148]);
 part(head,[[-6,-144],[1,-144],[1,-137],[-4,-136]],'r');
 part(head,[[-3,-157],[6,-162],[-6,-174],[-20,-176],[-12,-166]],'r');
 part(head,[[-8,-152],[-2,-152],[-2,-147],[-8,-147]],'g');
 // front leg
 part(fH,LEG.thigh,'n');part(fH,LEG.thighArm,'w');part(fK,LEG.shin,'w');part(fK,LEG.shinStripe,'r');part(fA,LEG.foot,'r');part(fA,LEG.toe,'w');part(fA,LEG.heel,'g');part(fH,LEG.knee,'r');
 // sword (behind front arm hand)
 const swd=rot(PIV.fW,P.sw,p=>G(fW)([p[0]-1,p[1]+4]));
 const S=p=>swd([p[0]+PIV.fW[0],p[1]+PIV.fW[1]]);const SS={...{}};
 if(P.swv>0.5){const sp=f=>pts=>pts.map(q=>S(q));
  shadePart(B,sp()([[-14,-2],[0,-2],[0,2],[-14,2]]).map(q=>q),'g',{flash:fl});
  shadePart(B,sp()([[0,-7],[5,-8],[7,-3],[7,3],[5,8],[0,7]]),'y',{flash:fl});
  shadePart(B,sp()([[7,-4],[16,-4],[18,0],[16,4],[7,4]]),'w',{flash:fl});
  shadePart(B,sp()([[-18,-3],[-14,-3],[-14,3],[-18,3]]),'r',{flash:fl});
  anchors.bladeBase=S([18,0]);anchors.bladeTip=S([118,0]);}
 // front arm
 part(fS,ARM.upper,'g');part(fE,ARM.fore,'w');part(fE,ARM.cuff,'r');part(fW,P.open>0.5?ARM.palm:ARM.hand,'n');
 if(P.open>0.5)part(fW,[[3,-86],[8,-86],[8,-82],[3,-82]],'c',{glow:1});
 anchors.palm=G(fW)([12,-84]);anchors.hand=G(fW)([4,-84]);
 part(fS,ARM.pauld,'w');part(fS,ARM.pauldTrim,'r');part(fS,ARM.pauldFin,'n');
 outline(B);flush(B);
 for(const k in anchors){anchors[k]=[anchors[k][0]-HO[0],anchors[k][1]-HO[1]];}
 return {c:B.c,ox:HO[0],oy:HO[1],a:anchors};
};

// ---------- ENEMY DRONE ----------
const EB=new Buf(300,260),EO=[150,230];
window.renderEnemy=function(E,time){const B=EB;B.clear();
 const bob=Math.sin(time*2.2)*2*(E.dead?0:1);
 const lean=E.lean||0, base=rot([0,-60],lean,p=>[p[0]*1.3+EO[0],(p[1]+16)*1.3+EO[1]+bob]);
 const fl=E.flash, part=(pts,mat,o)=>shadePart(B,pts.map(base),mat,Object.assign({flash:fl},o||{}));
 const legs=[[-34,-56,-1],[-14,-50,-1],[14,-50,1],[36,-56,1]];
 const legDraw=(l,i,back)=>{const [hx,hy,s]=l, k=[hx+s*22,hy-10+Math.sin(time*3+i)*1.5], t=[hx+s*30,-16];
  const P=f=>f.map(p=>[p[0],p[1]-bob]);
  shadePart(B,P(seg([hx,hy],k,8,6)).map(base),back?'k':'q',{flash:fl});shadePart(B,P(seg(k,[t[0],-28],6,5)).map(base),'q',{flash:fl});
  shadePart(B,P(ell(k[0],k[1],6,6,10)).map(base),'p',{flash:fl});
  for(let c=-1;c<=1;c++){const cx=t[0]+c*7;shadePart(B,P([[cx-3,-30],[cx+3,-30],[cx+5+c*3,-22],[cx+2+c*5,-15],[cx+c*4,-20],[cx-3,-24]]).map(base),'q',{flash:fl});}};
 legs.forEach((l,i)=>{if(i===1||i===2)legDraw(l,i,1);});
 part(ell(4,-82,50,38,28),'p');
 part(ell(36,-104,20,18,16),'p');part(ell(36,-110,10,6,10),'q');
 part(ell(-6,-70,40,16,20),'q');
 if(!E.dmg)part(ell(-16,-90,32,28,22,Math.PI*0.55,Math.PI*1.6).concat([[-10,-62]]),'p');
 else part(ell(-16,-90,30,26,22,Math.PI*0.75,Math.PI*1.5).concat([[-20,-70]]),'k');
 part([[0,-120],[26,-120],[30,-110],[-2,-108]],'q');
 part(ell(-36,-98,20,18,16),'q');part(ell(-40,-96,12,10,12),'k');
 part(ell(-44,-98,6,6,10),'e',{glow:E.eye!==0});
 part(ell(-14,-126,14,10,14),E.dmg?'k':'p');part(ell(-14,-130,7,4,8),'q');
 part([[12,-80],[22,-80],[22,-72],[12,-72]],'e');
 legs.forEach((l,i)=>{if(i===0||i===3)legDraw(l,i,0);});
 outline(B);flush(B);
 return {c:B.c,ox:EO[0],oy:EO[1]};
};
window.shadePart=shadePart;window.SPR={Buf,R,RAMP,pack,rasterMask,outline,flush,ell};
})();
