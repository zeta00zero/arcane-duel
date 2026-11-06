/* Story Mode, Gallery, and player-duelist locks.
   Unlock flag (same store the rest of the game uses):
     localStorage["adc_v2"].story.bw1 === true
   Set when Battle World Chapter 1 reaches its last line.
   Gallery's anime opening reads that same flag. It never autoplays. */
"use strict";
(function(){
const PLAYER_LOCK={
  darkkelvin:"Villain",
  kenneth:"Villain",
  sixing:"Villain",
  weisheng:"Rival",
  weisheng2:"Rival",
  eryll:"Rival",
  eryll2:"Rival"
};
function adcLockRole(id){return PLAYER_LOCK[id]||"";}
function adcPlayerLocked(id){return !!PLAYER_LOCK[id];}
window.adcLockRole=adcLockRole;
window.adcPlayerLocked=adcPlayerLocked;

function storyBag(){
  const s=store();
  if(!s.story||typeof s.story!=="object")s.story={};
  return s;
}
function chapterCleared(id){return !!storyBag().story[id];}
function markChapter(id){
  const s=storyBag();
  s.story[id]=true;
  saveStore(s);
  window.adcStory=s.story;
}
window.adcChapterCleared=chapterCleared;
window.adcGalleryUnlocked=function(){return chapterCleared("bw1");};

const ARCS=[
  {id:"bw",name:"Battle World",blurb:"The concourse, the circuit, and the blood-moon gate.",
    chapters:[
      {id:"bw1",n:"Chapter 1",title:"The First Gathering",play:true},
      {id:"bw2",n:"Chapter 2",title:"The Street Circuit"},
      {id:"bw3",n:"Chapter 3",title:"Blood Moon Gate"}
    ]},
  {id:"dc",name:"Darkness Chaos",blurb:"Rain that remembers, a red pen, and a wordless verdict.",
    chapters:[
      {id:"dc1",n:"Chapter 1",title:"Rain That Remembers"},
      {id:"dc2",n:"Chapter 2",title:"The Red Pen"},
      {id:"dc3",n:"Chapter 3",title:"A Wordless Verdict"}
    ]},
  {id:"dx",name:"Dimensions Cross",blurb:"Rifts, titans, and the duel on the far side.",
    chapters:[
      {id:"dx1",n:"Chapter 1",title:"Where the Rift Opens"},
      {id:"dx2",n:"Chapter 2",title:"Earth, Sea, Sky"},
      {id:"dx3",n:"Chapter 3",title:"The Far Duel"}
    ]}
];
const ARC_BY={};ARCS.forEach(a=>ARC_BY[a.id]=a);

/* Original short scene. Speakers use roster portraits. */
const BW1=[
  {id:"narrator",name:"Battle World",text:"Neon banners ripple over the Battle World concourse. Past the gate, engines snarl — and somewhere a blood-red moon is already being whispered about."},
  {id:"clement",text:"Episode one! Clement, reporting in. I brought a deck, a dream, and a plan that will not survive the opening theme."},
  {id:"weiyao",text:"If this is your season premiere, the front row is already full. Hit your mark, Clement. The encore can wait until we are still standing."},
  {id:"keith",text:"Chill, bro. The kitties scouted the gate. Guy in glasses, stopwatch out, talking like the whole concourse is late for his meeting. Name's Weisheng."},
  {id:"ben",text:"Security check. Three names are not on the friendly list. Weisheng on the circuit. Eryll under the blood moon. And a signature that only reads \"mur.\""},
  {id:"kelvin",text:"Si Xing. I shared a lane with him once. He never spoke. He signed \"stop,\" and my whole race froze. If he is here, he did not come to cheer."},
  {id:"shaim",text:"The road back from the rift is long. On that road I passed a rain that fell on no one else. Kelvin… it was wearing your face."},
  {id:"kelvin",text:"That is not the me who still wants the sun. If Dark Kelvin is walking Battle World, we do not let him cross the line alone."},
  {id:"weiyao",text:"There is also a teacher with a red pen. Mr Kenneth. He grades duelists like homework. Fail, and you are off the field."},
  {id:"weisheng",text:"Time is money, and this concourse is wasting both. Clear the gate, or I will lap every one of you."},
  {id:"eryll",text:"The blood moon rises whether you are ready or not. I remember every duel. I repay every one."},
  {id:"sixing",text:"Mur. (The gate is mine.)"},
  {id:"darkkelvin",text:"Run if you want. The rain is faster."},
  {id:"kenneth",text:"Your standing is too low to stay on my field. Class is in session."},
  {id:"clement",text:"Friends at my back. Rivals in the fast lane. Villains writing the finale before we have even dueled. Fine. Battle World, chapter one — we answer them together."},
  {id:"narrator",name:"Battle World",text:"The gate light turns gold. The first gathering is over. An anime opening is waiting in the Gallery.",end:true}
];

const css=document.createElement("style");
css.id="adc-story-css";
css.textContent=`
#menu .menubtns{top:332px;gap:8px;width:360px}
#menu .mbtn{padding:9px 12px;font-size:17px;letter-spacing:2px;border-radius:12px}
.fsel .ft .adc-badge,.ring9 .rt .adc-badge,#tagsel .tile .adc-badge,#online .ntile .adc-badge{
  position:absolute;z-index:6;left:3px;top:3px;pointer-events:none;
  font-family:Impact,"Arial Black",sans-serif;font-style:italic;font-size:10px;letter-spacing:.4px;line-height:1.15;
  padding:1px 5px;border-radius:3px;color:#fff;background:#6a1230;border:1px solid #ff9bb0;box-shadow:0 0 8px #000}
.fsel .ft.adc-lock .face,.fsel .ft.adc-lock img{filter:grayscale(1) brightness(.62)!important}
.ring9 .rt.dim .face{filter:grayscale(.85) brightness(.7)}
#tagsel .tile.adc-lock{filter:grayscale(1) brightness(.62);cursor:not-allowed}
#tagsel .tile.adc-lock img{filter:grayscale(1) brightness(.7)}
#online .ntile.adc-lock{filter:grayscale(1) brightness(.62);cursor:not-allowed}
#story,#gallery{background:radial-gradient(ellipse at 50% 0%,#2d2260 0%,#120c26 55%,#07050e 100%);overflow:hidden}
.st-wrap{position:absolute;inset:0;display:flex;flex-direction:column;padding:78px 36px 16px}
.st-wrap h2{margin:0;font-family:Impact,"Arial Black",sans-serif;font-size:40px;letter-spacing:3px;color:#ffd36b;text-shadow:0 0 16px #ff9a3c88}
.st-wrap .sub{opacity:.78;margin:4px 0 14px;font-size:14px}
.arc-row{display:flex;gap:16px;flex:1;min-height:0}
.arc-card{flex:1;border-radius:16px;border:2px solid #ffd36b55;background:linear-gradient(180deg,rgba(80,50,140,.55),rgba(16,10,32,.9));
  color:#fff;text-align:left;padding:18px 16px;display:flex;flex-direction:column;gap:8px;box-shadow:0 10px 28px #0008;cursor:pointer}
.arc-card:hover{border-color:#ffd36b;box-shadow:0 0 24px #ffb35a66;transform:translateY(-3px)}
.arc-card .ord{font-size:12px;letter-spacing:2px;color:#cfe8ff;opacity:.8}
.arc-card h3{margin:0;font-family:Impact,"Arial Black",sans-serif;font-size:28px;letter-spacing:1px;color:#fff6d0}
.arc-card p{margin:0;font-size:14px;line-height:1.4;opacity:.88;flex:1}
.arc-card .meta{font-size:12px;font-weight:bold;letter-spacing:1px;color:#ffd36b}
.ch-list{display:flex;flex-direction:column;gap:10px;overflow:auto;padding-right:4px}
.ch-row{display:flex;align-items:center;gap:14px;text-align:left;color:#fff;border-radius:14px;border:2px solid #ffffff22;
  background:linear-gradient(180deg,rgba(255,255,255,.06),rgba(0,0,0,.25));padding:12px 14px;cursor:pointer}
.ch-row:hover{border-color:#ffd36b88}
.ch-row .n{width:92px;flex:none;font-size:12px;letter-spacing:1px;color:#cfe8ff}
.ch-row b{font-size:18px;flex:1}
.ch-row .tag{font-size:12px;font-weight:bold;letter-spacing:1px;padding:4px 8px;border-radius:8px;background:#0006}
.ch-row.clear{border-color:#ffd36b88}
.ch-row.clear .tag{color:#1a1204;background:linear-gradient(180deg,#ffe08a,#e0a93a)}
.ch-row.soon{opacity:.55;cursor:default}
.ch-row.soon:hover{border-color:#ffffff22}
.vn{position:absolute;inset:0;display:flex;background:radial-gradient(ellipse at 30% 40%,#2a1848 0%,#0b0714 70%)}
.vn-hit{position:absolute;inset:0;cursor:pointer}
.vn-port{position:absolute;left:36px;bottom:0;width:420px;height:760px;display:flex;align-items:flex-end;justify-content:center;pointer-events:none}
.vn-port img{width:400px;height:640px;object-fit:cover;object-position:50% 8%;border-radius:18px 18px 0 0;border:3px solid var(--c,#ffd36b);
  box-shadow:0 0 40px var(--c,#ffd36b);background:#000}
.vn-crest{width:280px;height:280px;margin-bottom:220px;border-radius:50%;border:3px solid #ffd36b88;display:flex;align-items:center;justify-content:center;
  font-family:Impact,"Arial Black",sans-serif;letter-spacing:2px;color:#ffe9a8;text-align:center;padding:20px;
  background:radial-gradient(circle,#3a2468,#120818);box-shadow:0 0 40px #ffd36b44}
.vn-box{position:absolute;left:28px;right:28px;bottom:22px;min-height:168px;border-radius:16px;border:2px solid #ffd36b99;
  background:linear-gradient(180deg,rgba(18,10,36,.92),rgba(8,6,16,.94));padding:16px 22px 14px;box-shadow:0 12px 40px #000c;pointer-events:none}
.vn-name{display:inline-block;margin:-30px 0 8px;padding:4px 14px;border-radius:10px;background:var(--c,#ffd36b);color:#1a1008;
  font-family:Impact,"Arial Black",sans-serif;letter-spacing:1px;font-size:20px}
.vn-text{font-size:20px;line-height:1.45;min-height:84px}
.vn-next{text-align:right;font-size:13px;letter-spacing:1px;color:#ffd36b;opacity:.85}
.gal-grid{display:flex;gap:18px;flex-wrap:wrap}
.gal-card{width:360px;border-radius:16px;overflow:hidden;border:2px solid #ffd36b66;background:#100a1e;color:#fff;text-align:left;cursor:pointer;padding:0}
.gal-card.locked{cursor:default;filter:saturate(.3) brightness(.75);border-color:#ffffff33}
.gal-thumb{height:190px;display:flex;align-items:center;justify-content:center;font-family:Impact,"Arial Black",sans-serif;font-size:42px;letter-spacing:2px;
  background:linear-gradient(135deg,#3a1860,#1a0c28 40%,#3a2208);color:#ffe9a8;position:relative}
.gal-card.locked .gal-thumb{color:#bbb}
.gal-body{padding:12px 14px 14px}
.gal-body h3{margin:0 0 4px;font-size:20px}
.gal-body p{margin:0;font-size:13px;opacity:.85;line-height:1.4}
.gal-play{position:absolute;inset:0;z-index:5;background:#05030acc;display:flex;flex-direction:column}
.gal-play video{flex:1;width:100%;background:#000;object-fit:contain}
.gal-bar{display:flex;align-items:center;gap:8px;padding:8px 10px;background:#120c22;border-top:1px solid #ffd36b55}
.gal-bar .btn{min-width:88px;min-height:40px}
.gal-bar input[type=range]{flex:1;height:28px}
.gal-bar .t{font-size:12px;opacity:.8;min-width:92px;text-align:right}
.gal-tap{position:absolute;left:0;right:0;top:0;bottom:64px;display:flex;align-items:center;justify-content:center;cursor:pointer}
.gal-tap span{padding:16px 28px;border-radius:14px;border:2px solid #ffd36b;background:#1b1038ee;font-family:Impact,"Arial Black",sans-serif;
  font-size:28px;letter-spacing:2px;color:#ffe9a8;box-shadow:0 0 24px #ffb35a}
`;
document.head.appendChild(css);

function screen(id){
  let s=document.getElementById(id);
  if(!s){
    s=document.createElement("section");
    s.className="screen";
    s.id=id;
    const app=document.getElementById("app");
    const fx=document.getElementById("fx");
    if(app&&fx)app.insertBefore(s,fx);else (app||document.body).appendChild(s);
  }
  return s;
}
function esc(s){return String(s==null?"":s).replace(/[&<>"]/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[ch]));}
function portOf(id){
  const C=typeof CHARS!=="undefined"&&CHARS[id];
  if(!C||typeof PORTRAITS==="undefined")return "";
  return PORTRAITS[C.img]||"";
}
function lockToast(id){
  const role=adcLockRole(id);
  const msg=role==="Villain"?"Villains can't be your duelist.":"Rivals can't be your duelist.";
  try{toast(msg);}catch(e){}
  try{AUDIO.play("alert");}catch(e){}
}

/* ---------- menu ---------- */
function injectMenu(){
  const mb=document.querySelector("#menu .menubtns");
  if(!mb||document.getElementById("m-story"))return;
  const mk=(id,label,fn)=>{const b=document.createElement("button");b.className="mbtn";b.id=id;b.type="button";b.textContent=label;b.onclick=fn;return b;};
  const story=mk("m-story","📖 STORY MODE",openStory);
  const gal=mk("m-gallery","🎬 GALLERY",openGallery);
  const duel=document.getElementById("m-duel");
  if(duel&&duel.nextSibling){mb.insertBefore(gal,duel.nextSibling);mb.insertBefore(story,duel.nextSibling);}
  else{mb.appendChild(story);mb.appendChild(gal);}
}
if(typeof renderMenu==="function"){
  const prevMenu=renderMenu;
  renderMenu=function(){const r=prevMenu.apply(this,arguments);try{injectMenu();}catch(e){}return r;};
}
injectMenu();

/* ---------- story ---------- */
let view={page:"arcs",arc:"bw"};
let vn={i:0,shown:0,full:"",timer:null};

function openStory(){view={page:"arcs",arc:"bw"};renderStory();showScreen("story");}
function openArc(id){view={page:"chapters",arc:id};renderStory();showScreen("story");}
window.openStory=openStory;

function renderStory(){
  const s=screen("story");
  if(view.page==="vn"){renderVN(s);return;}
  if(view.page==="chapters"){renderChapters(s);return;}
  const cards=ARCS.map((a,i)=>{
    const done=a.chapters.filter(c=>chapterCleared(c.id)).length;
    const play=a.chapters.some(c=>c.play);
    const meta=play?(done?done+" cleared":"Chapter 1 open"):"Coming soon";
    return `<button class="arc-card" data-arc="${a.id}"><div class="ord">ARC ${i+1}</div><h3>${esc(a.name)}</h3><p>${esc(a.blurb)}</p><div class="meta">${esc(meta)}</div></button>`;
  }).join("");
  s.innerHTML=`<div class="st-wrap"><button class="btn backbtn" id="st-back" type="button">◀ Menu</button>
    <h2>STORY MODE</h2><div class="sub">Three arcs. One playable chapter — Battle World opens the Gallery.</div>
    <div class="arc-row">${cards}</div></div>`;
  s.querySelector("#st-back").onclick=()=>showScreen("menu");
  s.querySelectorAll("[data-arc]").forEach(b=>b.onclick=()=>openArc(b.dataset.arc));
}
function renderChapters(host){
  const a=ARC_BY[view.arc]||ARCS[0];
  const rows=a.chapters.map(c=>{
    const cleared=chapterCleared(c.id);
    if(c.play){
      return `<button class="ch-row ${cleared?"clear":""}" data-ch="${c.id}" type="button"><span class="n">${esc(c.n)}</span><b>${esc(c.title)}</b><span class="tag">${cleared?"CLEARED":"PLAY"}</span></button>`;
    }
    return `<button class="ch-row soon" data-soon="1" type="button"><span class="n">${esc(c.n)}</span><b>${esc(c.title)}</b><span class="tag">🔒 COMING SOON</span></button>`;
  }).join("");
  host.innerHTML=`<div class="st-wrap"><button class="btn backbtn" id="st-back" type="button">◀ Arcs</button>
    <h2>${esc(a.name.toUpperCase())}</h2><div class="sub">${esc(a.blurb)}</div>
    <div class="ch-list">${rows}</div></div>`;
  host.querySelector("#st-back").onclick=()=>{view.page="arcs";renderStory();};
  host.querySelectorAll("[data-ch]").forEach(b=>b.onclick=()=>startVN());
  host.querySelectorAll("[data-soon]").forEach(b=>b.onclick=()=>{
    try{toast("Coming soon.");}catch(e){}
    try{AUDIO.play("alert");}catch(e){}
    b.animate([{transform:"translateX(0)"},{transform:"translateX(-5px)"},{transform:"translateX(5px)"},{transform:"none"}],220);
  });
}
function startVN(){
  vn={i:0,shown:0,full:"",timer:null};
  view.page="vn";
  renderStory();
}
function renderVN(host){
  host.innerHTML=`<div class="vn"><button class="btn backbtn" id="st-back" type="button" style="z-index:3">◀ Chapters</button>
    <div class="vn-hit" id="vn-hit"></div>
    <div class="vn-port" id="vn-port"></div>
    <div class="vn-box"><div class="vn-name" id="vn-name"></div><div class="vn-text" id="vn-text"></div><div class="vn-next" id="vn-next">Tap to continue ▸</div></div></div>`;
  host.querySelector("#st-back").onclick=e=>{e.stopPropagation();clearInterval(vn.timer);view.page="chapters";renderStory();};
  host.querySelector("#vn-hit").onclick=vnAdvance;
  showVNLine();
}
function showVNLine(){
  const line=BW1[vn.i];if(!line){finishVN();return;}
  const C=CHARS[line.id];
  const name=line.name||(C&&C.name)||"???";
  const col=(C&&C.color)||"#ffd36b";
  const port=document.getElementById("vn-port");
  const img=portOf(line.id);
  port.style.setProperty("--c",col);
  port.innerHTML=img?`<img src="${img}" alt="">`:`<div class="vn-crest">BATTLE<br>WORLD</div>`;
  const nm=document.getElementById("vn-name");
  nm.textContent=name;nm.style.background=col;nm.style.color="#1a1008";
  vn.full=line.text;vn.shown=0;
  const tx=document.getElementById("vn-text");tx.textContent="";
  const nxt=document.getElementById("vn-next");
  nxt.textContent=line.end?"Tap to finish ▸":"Tap to continue ▸";
  clearInterval(vn.timer);
  vn.timer=setInterval(()=>{
    vn.shown=Math.min(vn.full.length,vn.shown+1);
    const el=document.getElementById("vn-text");if(el)el.textContent=vn.full.slice(0,vn.shown);
    if(vn.shown>=vn.full.length)clearInterval(vn.timer);
  },16);
}
function vnAdvance(){
  if(vn.shown<vn.full.length){vn.shown=vn.full.length;clearInterval(vn.timer);const el=document.getElementById("vn-text");if(el)el.textContent=vn.full;return;}
  const line=BW1[vn.i];
  if(!line||line.end||vn.i>=BW1.length-1){finishVN();return;}
  vn.i++;showVNLine();
}
function finishVN(){
  clearInterval(vn.timer);
  markChapter("bw1");
  try{toast("Battle World Chapter 1 cleared. Gallery opening unlocked.");}catch(e){}
  view={page:"chapters",arc:"bw"};
  renderStory();
}

/* ---------- gallery ---------- */
const SRC720="assets/video/opening_720.mp4";
const SRCFULL="assets/video/opening.mp4";
let player=null;
function openGallery(){closePlayer();renderGallery();showScreen("gallery");}
window.openGallery=openGallery;
function renderGallery(){
  const s=screen("gallery");
  const open=chapterCleared("bw1");
  s.innerHTML=`<div class="st-wrap"><button class="btn backbtn" id="st-back" type="button">◀ Menu</button>
    <h2>GALLERY</h2><div class="sub">${open?"Battle World Chapter 1 cleared. The opening is yours.":"Clear Battle World Ch.1 to unlock the opening."}</div>
    <div class="gal-grid"><button class="gal-card ${open?"":"locked"}" id="gal-open" type="button">
      <div class="gal-thumb">${open?"▶":"🔒"}</div>
      <div class="gal-body"><h3>Anime Opening</h3><p>${open?"Tap to play. Nothing starts until you tap.":"Clear Battle World Ch.1 to unlock."}</p></div>
    </button></div></div>`;
  s.querySelector("#st-back").onclick=()=>{closePlayer();showScreen("menu");};
  s.querySelector("#gal-open").onclick=()=>{
    if(!chapterCleared("bw1")){
      try{toast("Clear Battle World Ch.1 to unlock.");}catch(e){}
      try{AUDIO.play("alert");}catch(e){}
      return;
    }
    openPlayer();
  };
}
function fmt(t){if(!isFinite(t)||t<0)t=0;const m=Math.floor(t/60),ss=Math.floor(t%60);return m+":"+String(ss).padStart(2,"0");}
function openPlayer(){
  closePlayer();
  const s=document.getElementById("gallery");if(!s)return;
  const box=document.createElement("div");
  box.className="gal-play";
  box.innerHTML=`<video playsinline webkit-playsinline preload="metadata"></video>
    <div class="gal-tap" id="gal-tap"><span>TAP TO PLAY</span></div>
    <div class="gal-bar">
      <button class="btn gold" id="gal-pp" type="button">Play</button>
      <input id="gal-scrub" type="range" min="0" max="0" step="0.1" value="0" aria-label="Seek">
      <span class="t" id="gal-time">0:00 / 0:00</span>
      <button class="btn" id="gal-close" type="button">Close</button>
    </div>`;
  s.appendChild(box);
  const video=box.querySelector("video");
  video.playsInline=true;
  video.controls=false;
  video.autoplay=false;
  video.muted=false;
  let fallback=false;
  video.addEventListener("error",()=>{
    if(fallback){const tap=box.querySelector("#gal-tap");if(tap){tap.style.display="flex";tap.querySelector("span").textContent="COULD NOT LOAD";}return;}
    fallback=true;
    const wasPlaying=!video.paused&&!video.ended;
    video.src=SRCFULL;
    if(wasPlaying){const p=video.play();if(p&&p.catch)p.catch(()=>{});}
  });
  const tap=box.querySelector("#gal-tap");
  const pp=box.querySelector("#gal-pp");
  const scrub=box.querySelector("#gal-scrub");
  const time=box.querySelector("#gal-time");
  let scrubbing=false;
  function paintTime(){
    const d=video.duration;
    if(isFinite(d))scrub.max=String(d);
    if(!scrubbing)scrub.value=String(video.currentTime||0);
    time.textContent=fmt(video.currentTime)+" / "+fmt(d);
    pp.textContent=video.paused?"Play":"Pause";
  }
  function userPlay(){
    try{if(typeof AUDIO!=="undefined"){AUDIO.unlock();AUDIO.duck("gallery",0);}}catch(e){}
    if(!video.getAttribute("src"))video.src=SRC720;
    tap.style.display="none";
    const p=video.play();
    if(p&&p.then)p.then(()=>{paintTime();}).catch(()=>{
      tap.style.display="flex";
      tap.querySelector("span").textContent="TAP TO PLAY";
      try{AUDIO.duck("gallery",null);}catch(e){}
    });
  }
  tap.onclick=e=>{e.stopPropagation();userPlay();};
  pp.onclick=e=>{e.stopPropagation();if(video.paused)userPlay();else{video.pause();try{AUDIO.duck("gallery",null);}catch(err){}}};
  video.addEventListener("pause",()=>{paintTime();if(video.ended){try{AUDIO.duck("gallery",null);}catch(e){}}});
  video.addEventListener("play",paintTime);
  video.addEventListener("timeupdate",paintTime);
  video.addEventListener("loadedmetadata",paintTime);
  video.addEventListener("ended",()=>{tap.style.display="flex";tap.querySelector("span").textContent="TAP TO REPLAY";try{AUDIO.duck("gallery",null);}catch(e){}});
  scrub.addEventListener("pointerdown",()=>{scrubbing=true;});
  scrub.addEventListener("input",()=>{if(video.getAttribute("src"))video.currentTime=+scrub.value;paintTime();});
  scrub.addEventListener("change",()=>{scrubbing=false;});
  box.querySelector("#gal-close").onclick=e=>{e.stopPropagation();closePlayer();};
  player={box,video};
}
function closePlayer(){
  if(!player)return;
  try{player.video.pause();player.video.removeAttribute("src");player.video.load();}catch(e){}
  try{if(typeof AUDIO!=="undefined")AUDIO.duck("gallery",null);}catch(e){}
  if(player.box.parentNode)player.box.remove();
  player=null;
}
window.adcCloseGallery=closePlayer;

document.addEventListener("keydown",e=>{
  if(e.key!=="Escape"||e.defaultPrevented)return;
  if(typeof CUR==="undefined"||(CUR!=="story"&&CUR!=="gallery"))return;
  const b=document.querySelector("#"+CUR+" #st-back");
  if(!b)return;
  e.preventDefault();
  e.stopPropagation();
  if(CUR==="gallery"&&player){closePlayer();return;}
  b.click();
},true);
document.addEventListener("keydown",e=>{
  if(typeof CUR==="undefined"||CUR!=="story"||view.page!=="vn")return;
  if(e.key!==" "&&e.key!=="Enter")return;
  const t=e.target;if(t&&/INPUT|TEXTAREA|SELECT/.test(t.tagName))return;
  e.preventDefault();vnAdvance();
});

if(typeof showScreen==="function"){
  const prevSS=showScreen;
  showScreen=function(name){
    if(name!=="gallery")closePlayer();
    return prevSS.apply(this,arguments);
  };
}

/* ---------- hard stop: a locked id can never be the human duelist ---------- */
if(typeof startDuel==="function"){
  const prev=startDuel;
  startDuel=function(p){
    if(adcPlayerLocked(p)){lockToast(p);return;}
    return prev.apply(this,arguments);
  };
}
if(typeof startTag==="function"){
  const prev=startTag;
  startTag=function(cfg){
    if(cfg&&cfg.chars&&cfg.human){
      for(let i=0;i<cfg.chars.length;i++)if(cfg.human[i]&&adcPlayerLocked(cfg.chars[i])){lockToast(cfg.chars[i]);return;}
    }
    return prev.apply(this,arguments);
  };
}
if(typeof netHostStartDuel==="function"){
  const prev=netHostStartDuel;
  netHostStartDuel=function(){
    const H=NET.me,O=NET.opp;
    if(H&&adcPlayerLocked(H.ch)||O&&adcPlayerLocked(O.ch)){
      lockToast((H&&adcPlayerLocked(H.ch)?H.ch:O.ch));
      if(H)H.ready=false;if(O)O.ready=false;
      try{netRenderOnline();}catch(e){}
      return;
    }
    return prev.apply(this,arguments);
  };
}
})();
