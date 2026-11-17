/* Full Screen toggle. Uses the Fullscreen API on the page itself.
   Hidden when the browser cannot fullscreen the document (for example iPhone Safari). */
(function(){
const root=document.documentElement;
function reqFn(){return root.requestFullscreen||root.webkitRequestFullscreen||null;}
function exitFn(){return document.exitFullscreen||document.webkitExitFullscreen||null;}
function fsEl(){return document.fullscreenElement||document.webkitFullscreenElement||null;}
function supported(){
  if(!reqFn()||!exitFn())return false;
  if(document.fullscreenEnabled===false)return false;
  if(document.webkitFullscreenEnabled===false&&!root.requestFullscreen)return false;
  return true;
}
if(!supported())return;

const css=document.createElement("style");
css.textContent=`#fs-btn{position:fixed;top:8px;right:8px;z-index:70;width:34px;height:34px;padding:0;border-radius:8px;border:1px solid rgba(255,255,255,.28);background:rgba(10,8,20,.72);color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,.35)}
#fs-btn:hover{filter:brightness(1.2)}
#fs-btn svg{width:18px;height:18px;display:block;pointer-events:none}
#fs-btn .fs-cmp{display:none}
#fs-btn.on .fs-exp{display:none}
#fs-btn.on .fs-cmp{display:block}
#fs-sysrow{display:flex;align-items:center;justify-content:space-between;gap:12px;margin:0 0 12px;padding:8px 10px;border-radius:8px;background:rgba(0,0,0,.25);border:1px solid rgba(255,255,255,.12)}
#fs-sysrow span{font-size:15px}`;
document.head.appendChild(css);

const btn=document.createElement("button");
btn.id="fs-btn";btn.type="button";
btn.innerHTML=`<svg class="fs-exp" viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M9 4H4v5M15 4h5v5M9 20H4v-5M15 20h5v-5"/></svg><svg class="fs-cmp" viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5"/></svg>`;
document.body.appendChild(btn);

function sync(){
  const on=!!fsEl();
  btn.classList.toggle("on",on);
  const label=on?"Exit Full Screen":"Full Screen";
  btn.title=label;btn.setAttribute("aria-label",label);
  const sys=document.getElementById("fs-sys");
  if(sys)sys.textContent=label;
}
function relayout(){
  if(typeof fit==="function")fit();
  requestAnimationFrame(()=>{if(typeof fit==="function")fit();});
}
async function enter(){
  const fn=reqFn();
  if(!fn)return;
  try{await fn.call(root);}catch(e){}
}
function exit(){
  const fn=exitFn();
  if(!fn)return;
  try{const r=fn.call(document);if(r&&r.catch)r.catch(()=>{});}catch(e){}
}
function toggle(){if(fsEl())exit();else enter();}
const BLOCK="#preview,.rbtns,.backbtn,.duelist,.vn-box,#log,#phasebar,#hint,#ehand,.menubtns,.arc-card,#st-back,.spk,#phand";
function covered(x,y){
  const box={l:x,t:y,r:x+34,b:y+34};
  for(const el of document.querySelectorAll(BLOCK)){
    if(el===btn||el.contains&&el.contains(btn))continue;
    const cs=getComputedStyle(el);
    if(cs.display==="none"||cs.visibility==="hidden"||cs.opacity==="0")continue;
    const r=el.getBoundingClientRect();
    if(r.width<2||r.height<2)continue;
    if(Math.min(box.r,r.right)-Math.max(box.l,r.left)>1&&Math.min(box.b,r.bottom)-Math.max(box.t,r.top)>1)return true;
  }
  return false;
}
/* Top-right of the screen. On a 16:10 window the board fills the viewport and that
   corner sits on the card preview, so slide left along the top until the button is clear. */
function place(){
  const pad=8;
  let x=window.innerWidth-pad-34,y=pad;
  if(covered(x,y)){
    for(let nx=x;nx>=pad;nx-=4){if(!covered(nx,y)){x=nx;break;}}
  }
  btn.style.left=x+"px";btn.style.top=y+"px";btn.style.right="auto";
}
function onFs(){sync();relayout();place();requestAnimationFrame(place);}
btn.addEventListener("click",e=>{e.stopPropagation();toggle();});
document.addEventListener("fullscreenchange",onFs);
document.addEventListener("webkitfullscreenchange",onFs);
window.addEventListener("resize",place);
/* Registered before story-mode's capture listener. Esc leaves fullscreen first;
   a second Esc still walks back. stopImmediatePropagation keeps that earlier
   listener from cancelling the browser's fullscreen exit and also navigating. */
document.addEventListener("keydown",e=>{
  if(e.key!=="Escape"||!fsEl())return;
  e.stopImmediatePropagation();
  exit();
},true);
if(typeof showScreen==="function"){
  const prevShow=showScreen;
  showScreen=function(){const r=prevShow.apply(this,arguments);place();return r;};
  window.showScreen=showScreen;
}
const app=document.getElementById("app");
if(app){
  let queued=0;
  new MutationObserver(()=>{if(queued)return;queued=requestAnimationFrame(()=>{queued=0;place();});}).observe(app,{childList:true,subtree:true});
}
sync();place();

function settingsRow(){
  const panel=document.getElementById("sys-panel");
  if(!panel||document.getElementById("fs-sysrow"))return;
  const row=document.createElement("div");
  row.id="fs-sysrow";
  row.innerHTML=`<span>Display</span><button class="btn" id="fs-sys" type="button"></button>`;
  const tabs=panel.querySelector(".systabs");
  panel.insertBefore(row,tabs||panel.querySelector(".sysbody"));
  row.querySelector("#fs-sys").onclick=e=>{e.stopPropagation();toggle();};
  sync();
}
const layer=document.getElementById("modalLayer");
if(layer)new MutationObserver(settingsRow).observe(layer,{childList:true,subtree:true});
})();
