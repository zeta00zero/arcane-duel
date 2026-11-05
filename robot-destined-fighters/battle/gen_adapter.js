// Pass 2: draws the GenerateImage-derived sprites (assets.js) in place of the procedural rasteriser.
(function(){
const A=window.ASSETS,M=window.SPRMETA,IM={};
for(const k in A){const i=new Image();i.src=A[k];IM[k]=i;}
window.GEN_IM=IM;
const mk=(w,h)=>{const c=document.createElement('canvas');c.width=w;c.height=h;const x=c.getContext('2d');x.imageSmoothingEnabled=false;return [c,x];};
const MAP={idle:'idle',boost:'boost',dash:'boost',wind:'wind',throw:'throw',raise:'slash',slash:'idle',cannon:'cannon',palm:'palm',hero:'hero'};
const cache={};
function base(name,rot,flash){const key=name+rot+flash;if(cache[key])return cache[key];const m=M[name];
 const pad=rot?40:0;const [c,x]=mk(m.w+pad*2,m.h+pad*2);x.translate(pad+m.ax,pad+m.ay);x.rotate(rot);x.drawImage(IM.sprites,m.x,m.y,m.w,m.h,-m.ax,-m.ay,m.w,m.h);
 x.setTransform(1,0,0,1,0,0);if(flash){x.globalCompositeOperation='source-atop';x.fillStyle='#ffffff';x.fillRect(0,0,c.width,c.height);}
 return cache[key]={c,ox:pad+m.ax,oy:pad+m.ay,m};}
window.renderMechG=function(pn,t,opt){const name=MAP[pn]||'idle',m=M[name];const rot=pn==='dash'?0.22:0;
 const ready=IM.sprites.complete&&IM.sprites.naturalWidth;if(!ready){const [c]=mk(2,2);return {c,ox:1,oy:1,a:{hand:[0,-100],palm:[30,-100],muzzle:[60,-120]}};}
 const B=base(name,rot,opt.flash?1:0);const r=[m.rx-m.ax,m.ry-m.ay];
 return {c:B.c,ox:B.ox,oy:B.oy,a:{hand:r,palm:r,muzzle:[r[0]-2,r[1]],wing:[-40,-130],eye:[0,-160],core:[0,-110]}};};
window.renderEnemyG=function(E,t){const name=E.dmg?'ddmg':'didle';const ready=IM.sprites.complete&&IM.sprites.naturalWidth;
 if(!ready){const [c]=mk(2,2);return {c,ox:1,oy:1};}
 const bob=Math.round(Math.sin(t*3)*2);const B=base(name,E.lean||0,E.flash?1:0);return {c:B.c,ox:B.ox,oy:B.oy+bob};};
// background: sky (static, hand-drawn sun disc), city (parallax), floor (per-row perspective scroll)
window.drawGenBg=function(ctx,sc,t,HY,W,H){if(!IM.sky.complete)return;ctx.drawImage(IM.sky,0,0);
 // sun (hand-made overlay so the sun reads clearly)
 const sx=330,sy=150;ctx.fillStyle='rgba(255,180,110,0.25)';ctx.beginPath();ctx.arc(sx,sy,34,0,7);ctx.fill();ctx.fillStyle='#ffc070';ctx.beginPath();ctx.arc(sx,sy,20,0,7);ctx.fill();ctx.fillStyle='#fff0c0';ctx.beginPath();ctx.arc(sx,sy,15,0,7);ctx.fill();
 for(let i=0;i<4;i++){ctx.fillStyle='#e07050';ctx.fillRect(sx-24,sy-6+i*5,48,1);}
 const o=((-Math.round(sc*0.25))%1280+1280)%1280;ctx.drawImage(IM.city,-o,0);ctx.drawImage(IM.city,1280-o,0);
 const fh=IM.floor.height,y0=HY-6;for(let y=0;y<fh;y++){const k=0.3+1.7*(y/fh);const oo=((Math.round(sc*k))%1280+1280)%1280;ctx.drawImage(IM.floor,oo,y,Math.min(1280-oo,W),1,0,y0+y,Math.min(1280-oo,W),1);if(1280-oo<W)ctx.drawImage(IM.floor,0,y,W-(1280-oo),1,1280-oo,y0+y,W-(1280-oo),1);}};
// punch helpers
const IMPACT=[5.3,5.45,7.56,9.16,10.46,12.06];
window.punchZoom=t=>{let z=0;for(const i of IMPACT)if(t>=i)z=Math.max(z,0.14*Math.exp(-(t-i)*12));return z;};
window.impactFrame=t=>IMPACT.some(i=>t>=i&&t<i+1/30+0.001)&&(t<12||t>12.05);
const WIPES=[2.4,8.45,12.55];
window.drawWipe=function(V,t,W,H){for(const w of WIPES){const u=(t-w)/0.2;if(u<0||u>1)continue;V.fillStyle='#05060c';const p=u<0.5?u*2:(1-u)*2;
 for(let i=0;i<9;i++){const y=i*40;const len=(W+120)*p;V.fillRect(i%2?W-len:-120+(len-len),y,len,22);}V.fillStyle='#8af0ff';for(let i=0;i<9;i++){const len=(W+120)*p;V.fillRect(i%2?W-len:0,i*40+22,len,2);}}};
})();
