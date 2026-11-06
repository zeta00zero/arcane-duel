// Mobile-safe sprite slices. The original sheet is 9683px wide, which mobile GPUs
// and iOS/Android canvas limits will not draw. Each slice stays within 2048px.
(function(){
const SPECS=[
 {file:'r0-0.png',x0:0,y0:0,x1:2003,y1:278},{file:'r0-1.png',x0:2003,y0:0,x1:3999,y1:278},
 {file:'r0-2.png',x0:3999,y0:0,x1:6046,y1:278},{file:'r0-3.png',x0:6046,y0:0,x1:8015,y1:278},
 {file:'r0-4.png',x0:8015,y0:0,x1:9683,y1:278},{file:'r1-0.png',x0:0,y0:280,x1:2039,y1:404},
 {file:'r1-1.png',x0:2039,y0:280,x1:4069,y1:404},{file:'r1-2.png',x0:4069,y0:280,x1:6067,y1:404},
 {file:'r1-3.png',x0:6067,y0:280,x1:7642,y1:404},{file:'r2-0.png',x0:0,y0:408,x1:930,y1:686}];
function loadImg(src){
 const i=new Image();i.decoding='async';
 i._rdf=new Promise(res=>{
  const fin=()=>{i._ok=!!i.naturalWidth;res(i);};
  i.onload=()=>{
   if(i.decode){const t=setTimeout(fin,4000);i.decode().then(()=>{clearTimeout(t);fin();},()=>{clearTimeout(t);fin();});}
   else fin();
  };
  i.onerror=fin;
 });
 i.src=src;return i;
}
window.RDF_LOAD_IMG=loadImg;
const base=/\/battle\//.test(location.pathname)?'../assets/slices/':'assets/slices/';
const slices=SPECS.map(s=>{const sl=Object.assign({tints:{}},s);sl.img=loadImg(base+s.file);return sl;});
function sliceAt(x,y){for(const s of slices)if(x>=s.x0&&x<s.x1&&y>=s.y0&&y<s.y1)return s;return null;}
function tinted(sl,tint,a){
 const key=tint+'|'+a;if(sl.tints[key])return sl.tints[key];
 if(!sl.img.naturalWidth)return null;
 const c=document.createElement('canvas');c.width=sl.img.naturalWidth;c.height=sl.img.naturalHeight;
 const x=c.getContext('2d');x.imageSmoothingEnabled=false;x.drawImage(sl.img,0,0);
 x.globalCompositeOperation='source-atop';if(a<1)x.globalAlpha=a;x.fillStyle=tint;x.fillRect(0,0,c.width,c.height);
 return sl.tints[key]=c;
}
function draw(ctx,tint,sx,sy,sw,sh,dx,dy,dw,dh,tintAlpha){
 const sl=sliceAt(sx,sy);if(!sl||!sl.img.naturalWidth||sw<=0||sh<=0)return false;
 const src=tint?tinted(sl,tint,tintAlpha==null?1:tintAlpha):sl.img;if(!src)return false;
 try{ctx.drawImage(src,sx-sl.x0,sy-sl.y0,sw,sh,dx,dy,dw,dh);}catch(e){return false;}
 return true;
}
window.RDF_SLICES=slices;
window.RDF_SLICE=sliceAt;
window.RDF_DRAW=draw;
window.RDF_SPRITES_READY=()=>slices.every(s=>s.img.complete&&s.img.naturalWidth>0);
})();
