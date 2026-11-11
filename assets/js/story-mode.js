/* Story Mode, Gallery, and Story-only duelist locks.
   PLAYER_LOCK applies only inside Story Mode. Duel, Tag, online, and the ring
   do not see these locks (the helpers are not exported).
   Flags in localStorage["adc_v2"].story:
     protagonist   chosen Battle World duelist id (any playable form, including alts)
     tutorialWon   true after the prologue practice duel is won; opening not finished yet
     tutorial      true after that opening is watched to the end or skipped
     bw1           Chapter 1 opening cleared (Weisheng's Duel World announcement and the duel vs Sabrina).
     keyCards      number of Key Cards taken. The Chapter 1 opening awards 1, and only the first clear counts.
   Gallery unlocks when story.tutorial === true OR story.bw1 === true.
   The anime opening never autoplays, including on boot. It plays only from this
   prologue (tap to start, skip allowed) or from Gallery after the prologue is cleared.
   Practice partner is Toma (Lily if the hero is Toma), with that duelist's normal deck and LP.
   Prologue VN uses assets/img/story/cafe_bg.webp and labels the circle Narrator.
   A saved deck is the deck that duelist uses in every mode. The default list is only
   the fallback when that duelist has nothing saved.
   Every <video> uses the Music slider (not sound effects). */
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
/* Gallery follows the prologue. Old bw1 clears stay valid so nobody loses the opening. */
function galleryOpen(){return chapterCleared("tutorial")||chapterCleared("bw1");}
window.adcChapterCleared=chapterCleared;
window.adcGalleryUnlocked=galleryOpen;

const ARC_ART={
  bw:"assets/img/story/arc_battle_world.webp",
  dc:"assets/img/story/arc_darkness_chaos.webp",
  dx:"assets/img/story/arc_dimensions_cross.webp"
};
const ARCS=[
  {id:"bw",name:"Battle World",blurb:"The night before the gate opens. One practice duel, then the season begins.",
    chapters:[
      {id:"bw1",n:"Chapter 1",title:"Duel World",next:true},
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

/* One shared prologue for every Battle World duelist. Only the hero portrait,
   name, and deck change. The practice partner is Toma (Lily if the hero is Toma):
   kind, excited, normal deck and LP. Chapter 1 opens on the Duel World announcement. */
const PRACTICE_POOL=["kaito","ryuga","mira","sakura","toma","lily"];
let practiceId="";
function charName(id){
  if(id==="you"&&typeof playerName==="function")return playerName();
  const C=typeof CHARS!=="undefined"&&CHARS[id];
  return (C&&C.name)||"Duelist";
}
function practicePartner(hero){
  const skip={};
  skip[hero]=1;
  if(typeof modeBase==="function")skip[modeBase(hero)]=1;
  const pool=PRACTICE_POOL.filter(id=>!skip[id]&&typeof CHARS!=="undefined"&&CHARS[id]);
  if(pool.indexOf("toma")>=0)return "toma";
  if(pool.indexOf("lily")>=0)return "lily";
  return pool[0]||"kaito";
}
function prologueScript(id,opp){
  const n=charName(id);
  const p=charName(opp);
  return [
    {id:"narrator",name:"Narrator",text:"The night before Battle World. The tournament gate is still dark. A cafe stays open, and the real duels begin tomorrow."},
    {id:id,text:n+" steps into the warm light. Battle World begins tomorrow. Tonight I only need to know I can still duel."},
    {id:opp,text:p+" waves, already grinning. Hey! Tomorrow is the big one, but I wanted a fun duel tonight. No stakes. Just us, for the joy of it."},
    {id:id,text:"Then we are the same kind of early. I don't need a crowd yet."},
    {id:opp,text:"Good! I'll play my real deck, straight and happy. If you win, you'll sleep better. The tournament can wait until tomorrow."},
    {id:id,text:"Then let's duel. I want to walk in tomorrow already awake."}
  ];
}
function afterWinScript(id,opp){
  const n=charName(id);
  const p=charName(opp);
  return [
    {id:id,text:n+" laughs, still buzzing. That felt good. Tomorrow, Battle World — I'm ready."},
    {id:opp,text:p+" claps, delighted. That was so much fun! Save the rest for tomorrow. I'll be cheering when the gate opens."},
    {id:"narrator",name:"Narrator",text:"The cafe lights soften. Tomorrow, Battle World begins. Tonight, the opening plays.",end:true}
  ];
}
const STORY_ART={
  cafe:"assets/img/story/cafe_bg.webp",
  town:"assets/img/story/town_bg.webp",
  stadium:"assets/img/story/stadium_night_bg.webp",
  city:"assets/img/story/city_birdseye_bg.webp",
  roof:"assets/img/story/weisheng_rooftop.webp",
  gauntlet:"assets/img/story/duel_disk_gauntlet.webp",
  key:"assets/img/story/glass_key_card.webp"
};
function cafeArt(){return STORY_ART.cafe;}
function vnArt(line){
  if(line&&line.bg&&STORY_ART[line.bg])return STORY_ART[line.bg];
  return STORY_ART.cafe;
}
/* Decode each story image once. Later lines reuse the bitmap instead of
   assigning a new background or <img> and forcing the browser to fetch again. */
const vnReady=new Set();
const vnPend={};
function preloadUrl(url){
  if(!url)return Promise.resolve("");
  if(vnReady.has(url))return Promise.resolve(url);
  if(vnPend[url])return vnPend[url];
  vnPend[url]=new Promise(res=>{
    const img=new Image();
    const done=()=>{vnReady.add(url);res(url);};
    img.onload=()=>{if(typeof img.decode==="function")img.decode().then(done,done);else done();};
    img.onerror=()=>res("");
    img.src=url;
  });
  return vnPend[url];
}
function preloadLines(lines){
  const urls=[];
  Object.keys(STORY_ART).forEach(k=>urls.push(STORY_ART[k]));
  (lines||[]).forEach(line=>{
    urls.push(vnArt(line));
    const p=portOf(line.id);
    if(p)urls.push(p);
    if(line.cut&&STORY_ART[line.cut])urls.push(STORY_ART[line.cut]);
    if(line.item&&STORY_ART[line.item])urls.push(STORY_ART[line.item]);
  });
  return Promise.all(urls.map(preloadUrl));
}
try{Object.keys(STORY_ART).forEach(k=>preloadUrl(STORY_ART[k]));}catch(e){}

const css=document.createElement("style");
css.id="adc-story-css";
css.textContent=`
#menu .menubtns{top:332px;gap:8px;width:360px}
#menu .mbtn{padding:9px 12px;font-size:17px;letter-spacing:2px;border-radius:12px}
.fsel .ft .adc-badge,.ring9 .rt .adc-badge,#tagsel .tile .adc-badge,#online .ntile .adc-badge,.zzz-tile .adc-badge{
  position:absolute;z-index:6;left:3px;top:3px;pointer-events:none;
  font-family:Impact,"Arial Black",sans-serif;font-style:italic;font-size:10px;letter-spacing:.4px;line-height:1.15;
  padding:1px 5px;border-radius:3px;color:#fff;background:#6a1230;border:1px solid #ff9bb0;box-shadow:0 0 8px #000}
.fsel .ft.adc-lock .face,.fsel .ft.adc-lock img{filter:grayscale(1) brightness(.62)!important}
.ring9 .rt.dim .face{filter:grayscale(.85) brightness(.7)}
#tagsel .tile.adc-lock{filter:grayscale(1) brightness(.62);cursor:not-allowed}
#tagsel .tile.adc-lock img{filter:grayscale(1) brightness(.7)}
#online .ntile.adc-lock{filter:grayscale(1) brightness(.62);cursor:not-allowed}
#story,#gallery{background:radial-gradient(ellipse at 50% 0%,#2d2260 0%,#120c26 55%,#07050e 100%);overflow:hidden}
#story.arc-bgd .vn{background:#0b0714}
#story.arc-bgd .zzz{background:transparent}
#story.arc-bgd .zzz::before{background:linear-gradient(90deg,rgba(7,8,14,.15),rgba(7,8,14,.55))}
#story.arc-bgd .zzz-side{background:linear-gradient(200deg,rgba(10,12,18,.78),rgba(7,8,14,.88))}
#story.arc-bgd .story-open{background:rgba(5,3,10,.45)}
.st-wrap{position:absolute;inset:0;display:flex;flex-direction:column;padding:78px 36px 16px}
.st-wrap h2{margin:0;font-family:Impact,"Arial Black",sans-serif;font-size:40px;letter-spacing:3px;color:#ffd36b;text-shadow:0 0 16px #ff9a3c88}
.st-wrap .sub{opacity:.78;margin:4px 0 14px;font-size:14px}
.st-head{display:flex;align-items:flex-end;justify-content:space-between;gap:12px}
.st-head h2{flex:1}
.arc-row{display:flex;gap:16px;flex:1;min-height:0}
.arc-card{position:relative;flex:1;border-radius:16px;border:2px solid #ffd36b55;background:#120c22;color:#fff;text-align:left;
  padding:0;display:block;box-shadow:0 10px 28px #0008;cursor:pointer;overflow:hidden;min-width:0}
.arc-card:hover{border-color:#ffd36b;box-shadow:0 0 24px #ffb35a66;transform:translateY(-3px)}
.arc-bg{position:absolute;inset:0;background:#1a1030 center 22%/cover no-repeat;transform:scale(1.02)}
.arc-shade{position:absolute;inset:0;background:linear-gradient(180deg,rgba(8,6,16,.18) 0%,rgba(8,6,16,.28) 36%,rgba(8,6,16,.82) 72%,rgba(8,6,16,.94) 100%)}
.arc-body{position:relative;z-index:1;height:100%;box-sizing:border-box;padding:18px 16px;display:flex;flex-direction:column;gap:8px}
.arc-card .ord{font-size:12px;letter-spacing:2px;color:#cfe8ff;text-shadow:0 1px 4px #000}
.arc-card h3{margin:0;font-family:Impact,"Arial Black",sans-serif;font-size:28px;letter-spacing:1px;color:#fff6d0;text-shadow:0 2px 10px #000}
.arc-card p{margin:0;font-size:14px;line-height:1.4;opacity:.95;flex:1;text-shadow:0 2px 8px #000}
.arc-card .meta{font-size:12px;font-weight:bold;letter-spacing:1px;color:#ffd36b;text-shadow:0 1px 4px #000}
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
.ch-row.soon.next{opacity:1;cursor:pointer;border-color:#ffd36baa;box-shadow:0 0 18px #ffb35a33}
.ch-row.soon.next .tag{color:#1a1204;background:linear-gradient(180deg,#ffe08a,#c9842a)}
.vn{position:absolute;inset:0;display:flex;background:#0b0714}
.vn-bg{position:absolute;inset:0;z-index:0;background:#0b0714 center/cover no-repeat;opacity:0;transition:opacity .38s ease;pointer-events:none;will-change:opacity}
.vn-bg.on{opacity:1}
.vn-shade{position:absolute;inset:0;z-index:1;pointer-events:none;background:linear-gradient(180deg,rgba(12,8,16,.22),rgba(8,6,14,.55))}
.vn-hit{position:absolute;inset:0;z-index:3;cursor:pointer}
.vn-port{position:absolute;left:36px;bottom:0;z-index:2;width:420px;height:760px;pointer-events:none}
.vn-fig{position:absolute;inset:0;display:flex;align-items:flex-end;justify-content:center;opacity:0;transition:opacity .32s ease}
.vn-fig.on{opacity:1}
.vn-port img{width:400px;height:640px;object-fit:cover;object-position:50% 8%;border-radius:18px 18px 0 0;border:3px solid var(--c,#ffd36b);
  box-shadow:0 0 40px var(--c,#ffd36b);background:#000}
.vn-crest{width:280px;height:280px;margin-bottom:220px;border-radius:50%;border:3px solid #ffd36b88;display:flex;align-items:center;justify-content:center;
  font-family:Impact,"Arial Black",sans-serif;letter-spacing:2px;color:#ffe9a8;text-align:center;padding:20px;
  background:radial-gradient(circle,#3a2468,#120818);box-shadow:0 0 40px #ffd36b44}
.vn-sil{width:260px;height:520px;margin-bottom:80px;border-radius:130px 130px 24px 24px;position:relative;
  background:linear-gradient(180deg,#232838,#0a0c12);border:3px solid var(--c,#9bb0d0);box-shadow:0 0 36px var(--c,#9bb0d0)}
.vn-sil span{position:absolute;left:50%;top:72px;width:112px;height:112px;margin-left:-56px;border-radius:50%;background:#10131b;box-shadow:inset 0 0 0 10px #3a4458}
.vn-box{position:absolute;left:28px;right:28px;bottom:22px;z-index:6;min-height:168px;border-radius:16px;border:2px solid #ffd36b99;
  background:linear-gradient(180deg,rgba(18,10,36,.92),rgba(8,6,16,.94));padding:16px 22px 14px;box-shadow:0 12px 40px #000c;pointer-events:none}
.vn > .backbtn{z-index:7}
.vn-name{position:relative;z-index:1;display:inline-block;margin:-30px 0 8px;padding:4px 14px;border-radius:10px;background:var(--c,#ffd36b);color:#1a1008;
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
.gal-play video,.story-open video{flex:1;width:100%;background:#000;object-fit:contain}
.gal-bar{display:flex;align-items:center;gap:8px;padding:8px 10px;background:#120c22;border-top:1px solid #ffd36b55}
.gal-bar .btn{min-width:88px;min-height:40px}
.gal-bar input[type=range]{flex:1;height:28px}
.gal-bar .t{font-size:12px;opacity:.8;min-width:92px;text-align:right}
.gal-tap{position:absolute;left:0;right:0;top:0;bottom:64px;display:flex;align-items:center;justify-content:center;cursor:pointer}
.gal-tap span{padding:16px 28px;border-radius:14px;border:2px solid #ffd36b;background:#1b1038ee;font-family:Impact,"Arial Black",sans-serif;
  font-size:28px;letter-spacing:2px;color:#ffe9a8;box-shadow:0 0 24px #ffb35a}
.story-open{position:absolute;inset:0;z-index:4;background:#05030a;display:flex;flex-direction:column}
.story-open .backbtn{z-index:6}
.story-open .gal-tap{bottom:72px}
.zzz{position:absolute;inset:0;background:#07080e;overflow:hidden}
.zzz::before{content:"";position:absolute;inset:0;background:
  repeating-linear-gradient(115deg,rgba(255,255,255,.035) 0 2px,transparent 2px 18px),
  radial-gradient(ellipse at 20% 40%,#1a1408 0%,#07080e 55%);pointer-events:none}
.zzz-prev{position:absolute;left:0;top:0;bottom:0;width:600px}
.zzz-hero{position:absolute;inset:0;background:#05060c}
.zzz-hero img{width:100%;height:100%;object-fit:cover;object-position:50% 10%;filter:saturate(1.05)}
.zzz-hero::after{content:"";position:absolute;inset:0;background:
  linear-gradient(90deg,transparent 30%,rgba(7,8,14,.2) 62%,#07080e 96%),
  linear-gradient(180deg,rgba(0,0,0,.45) 0%,transparent 18%,transparent 48%,rgba(7,8,14,.92) 100%)}
.zzz-info{position:absolute;left:28px;right:70px;bottom:28px;z-index:2}
.zzz-kicker{font-size:12px;letter-spacing:3px;color:#ffd36b;font-weight:bold}
.zzz-info h2{margin:4px 0 6px;font-family:Impact,"Arial Black",sans-serif;font-size:42px;letter-spacing:1px;line-height:.95;color:#fff;text-shadow:0 3px 0 #000}
.zzz-info .flavor{margin:0 0 6px;font-size:16px;line-height:1.35;color:#ffe9a8;font-style:italic;text-shadow:0 2px 8px #000}
.zzz-info .theme{margin:0;font-size:13px;opacity:.8}
.zzz-swap{margin-top:10px;border:2px solid #ffd36b;background:#1b1238ee;color:#ffe9a8;border-radius:10px;padding:6px 10px;font-weight:bold;cursor:pointer}
.zzz-swap:hover{background:#ffd36b;color:#1b1238}
.zzz-side{position:absolute;top:0;right:0;bottom:0;left:540px;display:flex;flex-direction:column;padding:74px 22px 78px 36px;box-sizing:border-box;
  background:linear-gradient(200deg,#14161f 0%,#0a0c12 80%);
  clip-path:polygon(42px 0,100% 0,100% 100%,0 100%)}
.zzz-side h2{margin:0;font-family:Impact,"Arial Black",sans-serif;font-style:italic;font-size:32px;letter-spacing:2px;color:#fff;text-shadow:2px 2px 0 #8a6a12}
.zzz-side .sub{font-size:12px;opacity:.75;margin:2px 0 10px}
.zzz-grid{flex:1;min-height:0;overflow:auto;overflow-anchor:none;display:grid;grid-template-columns:repeat(4,108px);grid-auto-rows:132px;gap:12px 8px;padding:6px 8px 12px 4px;-webkit-overflow-scrolling:touch;scroll-behavior:auto}
.zzz-tile{position:relative;overflow:hidden;border:0;padding:0;background:transparent;color:#fff;cursor:pointer;scroll-margin:0}
.zzz-tile .face{position:absolute;inset:6px 4px 10px;overflow:hidden;background:#000;border:2px solid #ffffff2e;transform:skewX(-8deg);transition:border-color .12s,box-shadow .12s,transform .12s}
.zzz-tile img{position:absolute;left:-10px;top:0;width:calc(100% + 20px);height:100%;object-fit:cover;object-position:50% 12%;transform:skewX(8deg);filter:saturate(.8) brightness(.78)}
.zzz-tile .tn{position:absolute;left:0;right:0;bottom:0;padding:12px 3px 3px;text-align:center;font-weight:bold;font-size:10px;line-height:1.1;background:linear-gradient(transparent,#000e);transform:skewX(8deg)}
.zzz-tile:hover .face{border-color:#ffd36b}
.zzz-tile:hover img{filter:none}
.zzz-tile.on .face{border-color:#ffd36b;box-shadow:0 0 0 2px #ffd36b,0 0 22px #ffb35a;transform:skewX(-8deg) scale(1.05)}
.zzz-tile.on img{filter:none}
.zzz-tile.lock{cursor:not-allowed}
.zzz-tile.lock .face{filter:grayscale(1) brightness(.55)}
.zzz-tile.lock img{filter:grayscale(1) brightness(.7)}
.zzz-tile .you{position:absolute;right:0;top:0;z-index:5;font-family:Impact,"Arial Black",sans-serif;font-style:italic;font-size:12px;padding:0 6px;background:#ffd36b;color:#1a1204}
.zzz-tile .mt{position:absolute;right:0;bottom:0;z-index:6;width:24px;height:24px;border-radius:50%;border:2px solid #ffd36b;background:#1b1238;color:#ffd36b;font-size:13px;line-height:20px;text-align:center;cursor:pointer}
.zzz-tile .mt:hover{background:#ffd36b;color:#1b1238}
.arc-card{font:inherit;color:#fff}
.zzz > .backbtn{z-index:8;min-width:108px}
.zzz-ok{position:absolute;right:28px;bottom:18px;z-index:8;min-width:220px;font-family:Impact,"Arial Black",sans-serif;letter-spacing:2px;font-size:18px}
.zzz-hint{position:absolute;left:560px;right:260px;bottom:24px;font-size:11px;opacity:.55;pointer-events:none;z-index:8}
#vn-extra{position:absolute;right:28px;top:86px;z-index:4;width:420px;height:280px;pointer-events:none}
.vn-pop{position:absolute;right:0;top:0;opacity:0;transform:translateY(8px);transition:opacity .28s ease,transform .28s ease}
.vn-pop.on{opacity:1;transform:none}
.vn-item{width:210px;border-radius:14px;overflow:hidden;border:2px solid #ffd36b;background:rgba(16,10,24,.9);box-shadow:0 12px 32px #000c}
.vn-item img{display:block;width:100%;height:148px;object-fit:cover;background:#120818}
.vn-item b{display:block;padding:6px 8px 8px;text-align:center;color:#ffe9a8;letter-spacing:1px;font-size:13px}
.vn-cut{width:100%;border-radius:14px;overflow:hidden;border:2px solid #ffffff66;box-shadow:0 14px 36px #000c;background:#120818}
.vn-cut img{display:block;width:100%;height:220px;object-fit:cover}
.vn-cut span{display:block;padding:6px 10px;background:rgba(0,0,0,.72);font-size:13px;color:#fff}
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
function protagonist(){
  const id=storyBag().story.protagonist;
  if(id&&typeof CHARS!=="undefined"&&CHARS[id]&&!adcPlayerLocked(id))return id;
  return (typeof CHARS!=="undefined"&&CHARS.clement)?"clement":"";
}
function setProtagonist(id){
  const s=storyBag();
  s.story.protagonist=id;
  saveStore(s);
  window.adcStory=s.story;
}
function modeBase(id){
  if(typeof MODE_BASE!=="undefined"&&MODE_BASE[id])return MODE_BASE[id];
  return id;
}
function modeAlt(id){
  if(typeof MODES!=="undefined"&&MODES[id])return MODES[id];
  return "";
}
const storyModes={};
function shownOf(base){return storyModes[base]&&modeAlt(base)?modeAlt(base):base;}
function rosterBases(){
  let order=[];
  if(typeof ringEntries==="function")order=ringEntries();
  else if(typeof CHAR_ORDER!=="undefined")order=CHAR_ORDER.filter(c=>!(typeof MODE_BASE!=="undefined"&&MODE_BASE[c]));
  return order.filter(id=>id&&id!=="rookie"&&typeof CHARS!=="undefined"&&CHARS[id]);
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
let view={page:"arcs",arc:"bw",lines:null,onDone:null};
let vn={i:0,shown:0,full:"",timer:null};
let arcBg="";
const SS={cur:null};

function paintArcBackdrop(s){
  if(!s)return;
  if(arcBg){
    s.classList.add("arc-bgd");
    s.style.background="linear-gradient(180deg,rgba(6,4,12,.38),rgba(6,4,12,.72)),url(\""+arcBg+"\") center/cover no-repeat";
  }else{
    s.classList.remove("arc-bgd");
    s.style.background="";
  }
}
function openStory(){closeStoryVideo();arcBg="";view={page:"arcs",arc:"bw",lines:null,onDone:null};renderStory();showScreen("story");}
function openArc(id){
  closeStoryVideo();
  arcBg=ARC_ART[id]||"";
  if(id==="bw"){openCast();return;}
  view={page:"chapters",arc:id,lines:null,onDone:null};
  renderStory();
  showScreen("story");
}
function openCast(){
  const saved=protagonist();
  const base=modeBase(saved||"clement");
  if(saved&&saved!==base)storyModes[base]=true;
  SS.cur=base;
  view={page:"select",arc:"bw",lines:null,onDone:null};
  renderStory();
  showScreen("story");
}
window.openStory=openStory;

function arcMeta(a){
  if(a.id!=="bw")return "Coming soon";
  if(chapterCleared("bw1"))return "Chapter 1 cleared";
  if(chapterCleared("tutorial"))return "Chapter 1 open";
  if(storyBag().story.tutorialWon)return "Opening waiting";
  return "Prologue open";
}
function renderStory(){
  const s=screen("story");
  paintArcBackdrop(s);
  if(view.page==="vn"){renderVN(s);return;}
  if(view.page==="select"){renderSelect(s);return;}
  if(view.page==="opening"){renderOpening(s);return;}
  if(view.page==="chapters"){renderChapters(s);return;}
  const cards=ARCS.map((a,i)=>{
    const meta=arcMeta(a);
    const art=ARC_ART[a.id]||"";
    return `<button class="arc-card" data-arc="${a.id}" type="button">
      <span class="arc-bg" style="background-image:url('${esc(art)}')"></span><span class="arc-shade"></span>
      <span class="arc-body"><span class="ord">ARC ${i+1}</span><h3>${esc(a.name)}</h3><p>${esc(a.blurb)}</p><span class="meta">${esc(meta)}</span></span>
    </button>`;
  }).join("");
  s.innerHTML=`<div class="st-wrap"><button class="btn backbtn" id="st-back" type="button">◀ Menu</button>
    <h2>STORY MODE</h2><div class="sub">Three arcs. Battle World starts with a prologue, then Chapter 1.</div>
    <div class="arc-row">${cards}</div></div>`;
  s.querySelector("#st-back").onclick=()=>showScreen("menu");
  s.querySelectorAll("[data-arc]").forEach(b=>b.onclick=()=>openArc(b.dataset.arc));
}
function renderChapters(host){
  const a=ARC_BY[view.arc]||ARCS[0];
  const prologue=chapterCleared("tutorial")||chapterCleared("bw1");
  const who=a.id==="bw"&&protagonist()?charName(protagonist()):"";
  const keys=a.id==="bw"?(storyBag().story.keyCards|0):0;
  const rows=a.chapters.map(c=>{
    if(a.id==="bw"&&c.id==="bw1"){
      if(!prologue)return `<button class="ch-row soon" data-soon="prologue" type="button"><span class="n">${esc(c.n)}</span><b>${esc(c.title)}</b><span class="tag">🔒 PROLOGUE FIRST</span></button>`;
      const cleared=chapterCleared("bw1");
      return `<button class="ch-row ${cleared?"clear":""}" data-ch="bw1" type="button"><span class="n">${esc(c.n)}</span><b>${esc(c.title)}</b><span class="tag">${cleared?"CLEARED · TO BE CONTINUED":"PLAY"}</span></button>`;
    }
    return `<button class="ch-row soon" data-soon="1" type="button"><span class="n">${esc(c.n)}</span><b>${esc(c.title)}</b><span class="tag">🔒 TO BE CONTINUED</span></button>`;
  }).join("");
  const cast=a.id==="bw"?`<button class="btn" id="st-cast" type="button">Change duelist</button>`:"";
  const keyBit=a.id==="bw"?" Key Cards: "+keys+".":"";
  host.innerHTML=`<div class="st-wrap"><button class="btn backbtn" id="st-back" type="button">◀ Arcs</button>
    <div class="st-head"><h2>${esc(a.name.toUpperCase())}</h2>${cast}</div>
    <div class="sub">${esc(a.blurb)}${who?" Playing as "+esc(who)+".":""}${keyBit}</div>
    <div class="ch-list">${rows}</div></div>`;
  host.querySelector("#st-back").onclick=()=>{view.page="arcs";renderStory();};
  const castBtn=host.querySelector("#st-cast");
  if(castBtn)castBtn.onclick=()=>openCast();
  host.querySelectorAll("[data-ch]").forEach(b=>b.onclick=()=>startBw1());
  host.querySelectorAll("[data-soon]").forEach(b=>b.onclick=()=>{
    const msg=b.dataset.soon==="prologue"?"Clear the prologue first.":"To be continued.";
    try{toast(msg);}catch(e){}
    try{AUDIO.play("alert");}catch(e){}
    b.animate([{transform:"translateX(0)"},{transform:"translateX(-5px)"},{transform:"translateX(5px)"},{transform:"none"}],220);
  });
}

/* ---------- ZZZ-style cast select ---------- */
function tileHTML(b){
  const id=shownOf(b);
  const C=CHARS[id]||{};
  const locked=adcPlayerLocked(id);
  const role=adcLockRole(id);
  const img=portOf(id);
  const on=SS.cur===b?" on":"";
  return `<button class="zzz-tile${on}${locked?" lock":""}" data-b="${esc(b)}" type="button" tabindex="-1" style="--c:${esc(C.color||"#ffd36b")}">
    <span class="face">${img?`<img src="${img}" alt="">`:""}<span class="tn">${esc(charName(id))}</span></span>
    ${role?`<span class="adc-badge">${locked?"🔒 ":""}${esc(role)}</span>`:""}
    ${modeAlt(b)?`<span class="mt" data-mt="${esc(b)}" title="Switch form">⇄</span>`:""}
    ${on&&!locked?`<span class="you">YOU</span>`:""}
  </button>`;
}
function holdGrid(host){
  const grid=host.querySelector(".zzz-grid");
  const y=grid?grid.scrollTop:0;
  const root=document.scrollingElement;
  const wy=root?root.scrollTop:0;
  return function restore(){
    const g=host.querySelector(".zzz-grid");
    if(g)g.scrollTop=y;
    if(root)root.scrollTop=wy;
  };
}
function bindTile(t,host){
  const pin=()=>holdGrid(host);
  t.addEventListener("pointerdown",e=>{
    const restore=pin();
    if(e.pointerType==="mouse")e.preventDefault();
    t.addEventListener("focus",restore,{once:true});
    requestAnimationFrame(restore);
  });
  t.onclick=e=>{
    if(e.target.closest("[data-mt]"))return;
    const restore=pin();
    chooseBase(host,t.dataset.b);
    restore();
    requestAnimationFrame(restore);
  };
  const m=t.querySelector("[data-mt]");
  if(m)m.addEventListener("click",e=>{
    e.preventDefault();e.stopPropagation();
    const restore=pin();
    toggleStoryMode(host,m.dataset.mt);
    restore();
  });
}
function chooseBase(host,b){
  const id=shownOf(b);
  if(adcPlayerLocked(id)){lockToast(id);return;}
  SS.cur=b;
  syncSelect(host);
}
function toggleStoryMode(host,b){
  if(!modeAlt(b))return;
  storyModes[b]=!storyModes[b];
  const id=shownOf(b);
  if(!adcPlayerLocked(id))SS.cur=b;
  try{AUDIO.play(storyModes[b]?"spell":"coin");}catch(err){}
  syncSelect(host);
}
function syncTile(t){
  const b=t.dataset.b;
  const id=shownOf(b);
  const C=CHARS[id]||{};
  const locked=adcPlayerLocked(id);
  const on=SS.cur===b;
  t.classList.toggle("on",on);
  t.classList.toggle("lock",locked);
  t.style.setProperty("--c",C.color||"#ffd36b");
  const face=t.querySelector(".face");
  let img=t.querySelector("img");
  const src=portOf(id);
  if(src){
    if(!img&&face){img=document.createElement("img");img.alt="";face.insertBefore(img,face.firstChild);}
    if(img&&img.getAttribute("src")!==src)img.src=src;
  }
  const tn=t.querySelector(".tn");
  if(tn)tn.textContent=charName(id);
  let badge=t.querySelector(".adc-badge");
  const role=adcLockRole(id);
  if(role){
    if(!badge){badge=document.createElement("span");badge.className="adc-badge";t.appendChild(badge);}
    badge.textContent=(locked?"🔒 ":"")+role;
  }else if(badge)badge.remove();
  let you=t.querySelector(".you");
  if(on&&!locked){
    if(!you){you=document.createElement("span");you.className="you";you.textContent="YOU";t.appendChild(you);}
  }else if(you)you.remove();
}
function syncSelect(host){
  const grid=host.querySelector(".zzz-grid");
  if(!grid){renderSelect(host);return;}
  const y=grid.scrollTop;
  grid.querySelectorAll(".zzz-tile").forEach(syncTile);
  grid.scrollTop=y;
  requestAnimationFrame(()=>{if(grid.isConnected)grid.scrollTop=y;});
  paintPreview(host);
}
function renderSelect(host){
  const bases=rosterBases();
  if(!SS.cur||bases.indexOf(SS.cur)<0)SS.cur=bases.indexOf("clement")>=0?"clement":(bases[0]||"");
  host.innerHTML=`<div class="zzz">
    <div class="zzz-prev" id="zzz-prev"></div>
    <div class="zzz-side"><h2>SELECT DUELIST</h2><div class="sub">Preview a duelist, then Start. The prologue and practice duel begin only after Start.</div>
      <div class="zzz-grid">${bases.map(tileHTML).join("")}</div></div>
    <div class="zzz-hint">Tap a portrait to preview · ⇄ switches form · Start begins the prologue</div>
    <button class="btn backbtn" id="st-back" type="button">◀ Back</button>
    <button class="btn gold zzz-ok" id="zzz-ok" type="button">START</button></div>`;
  host.querySelector("#st-back").onclick=()=>{
    /* Unconfirmed highlight is not saved. Flags and the arc banner stay as they are. */
    view={page:"arcs",arc:view.arc||"bw",lines:null,onDone:null};
    renderStory();
  };
  host.querySelectorAll(".zzz-tile").forEach(t=>bindTile(t,host));
  host.querySelector("#zzz-ok").onclick=()=>confirmCast();
  paintPreview(host);
}
function paintPreview(host){
  const box=host.querySelector("#zzz-prev");if(!box)return;
  const id=shownOf(SS.cur);
  const C=CHARS[id]||{};
  const img=portOf(id);
  const locked=adcPlayerLocked(id);
  const role=adcLockRole(id);
  const alt=modeAlt(SS.cur);
  const swap=alt?`<button class="zzz-swap" id="zzz-swap" type="button">⇄ ${esc(shownOf(SS.cur)===SS.cur?charName(alt):charName(SS.cur))}</button>`:"";
  box.innerHTML=`<div class="zzz-hero">${img?`<img src="${img}" alt="">`:""}</div>
    <div class="zzz-info"><div class="zzz-kicker">${locked?esc(role).toUpperCase():"BATTLE WORLD"}</div>
      <h2>${esc(charName(id))}</h2>
      <p class="flavor">${esc(locked?(role==="Villain"?"Villains can't be your duelist.":"Rivals can't be your duelist."):(C.quote||C.theme||""))}</p>
      <p class="theme">${esc(C.theme||"")}</p>${swap}</div>`;
  const sw=box.querySelector("#zzz-swap");
  if(sw)sw.addEventListener("mousedown",e=>e.preventDefault());
  if(sw)sw.onclick=()=>toggleStoryMode(host,SS.cur);
  const ok=host.querySelector("#zzz-ok");
  if(ok){
    if(locked)ok.textContent="LOCKED";
    else if(chapterCleared("tutorial")||chapterCleared("bw1"))ok.textContent="CHAPTERS";
    else if(storyBag().story.tutorialWon)ok.textContent="CONTINUE";
    else ok.textContent="START";
  }
}
function confirmCast(){
  const id=shownOf(SS.cur);
  if(!id||!CHARS[id])return;
  if(adcPlayerLocked(id)){lockToast(id);return;}
  setProtagonist(id);
  try{AUDIO.play("click");}catch(e){}
  if(chapterCleared("tutorial")||chapterCleared("bw1")){
    view={page:"chapters",arc:"bw",lines:null,onDone:null};
    renderStory();
    return;
  }
  if(storyBag().story.tutorialWon){openAfterWin(id);return;}
  openPrologue(id);
}
function openPrologue(id){
  practiceId=practicePartner(id);
  view={page:"vn",arc:"bw",vnSet:"prologue",lines:prologueScript(id,practiceId),onDone:()=>beginTutorialDuel(id,practiceId)};
  vn={i:0,shown:0,full:"",timer:null};
  renderStory();
  showScreen("story");
}
function openAfterWin(id){
  const opp=practiceId||practicePartner(id);
  practiceId=opp;
  view={page:"vn",arc:"bw",vnSet:"prologue",lines:afterWinScript(id,opp),onDone:()=>openStoryOpening()};
  vn={i:0,shown:0,full:"",timer:null};
  renderStory();
  showScreen("story");
}

let vnVis={bg:"",bgSlot:0,who:"",whoSlot:0,cut:"",item:""};
let vnToken=0;
let vnLive=false;
function cssUrl(u){return 'url("'+String(u).replace(/"/g,"%22")+'")';}
function renderVN(host){
  vnVis={bg:"",bgSlot:0,who:"",whoSlot:0,cut:"",item:""};
  vnLive=false;
  const token=++vnToken;
  host.innerHTML=`<div class="vn"><div class="vn-bg" id="vn-bg0"></div><div class="vn-bg" id="vn-bg1"></div><div class="vn-shade"></div>
    <button class="btn backbtn" id="st-back" type="button">◀ Back</button>
    <div class="vn-hit" id="vn-hit"></div>
    <div class="vn-port" id="vn-port"><div class="vn-fig" id="vn-fig0"></div><div class="vn-fig" id="vn-fig1"></div></div>
    <div id="vn-extra"><div class="vn-pop vn-cut" id="vn-cut"><img alt=""><span></span></div><div class="vn-pop vn-item" id="vn-item"><img alt=""><b></b></div></div>
    <div class="vn-box"><div class="vn-name" id="vn-name"></div><div class="vn-text" id="vn-text"></div><div class="vn-next" id="vn-next">Tap to continue ▸</div></div></div>`;
  host.querySelector("#st-back").onclick=e=>{
    e.stopPropagation();clearInterval(vn.timer);vnToken++;
    if(view.vnSet==="bw1"){view={page:"chapters",arc:"bw",lines:null,onDone:null};renderStory();return;}
    view.page=storyBag().story.tutorialWon?"arcs":"select";renderStory();
  };
  host.querySelector("#vn-hit").onclick=vnAdvance;
  preloadLines(view.lines).then(()=>{if(token===vnToken)showVNLine();});
}
function paintBG(url){
  if(!url||vnVis.bg===url)return;
  const next=vnVis.bg?(vnVis.bgSlot?0:1):0;
  const el=document.getElementById("vn-bg"+next);
  const prev=document.getElementById("vn-bg"+vnVis.bgSlot);
  if(!el)return;
  const first=!vnVis.bg;
  el.style.backgroundImage=cssUrl(url);
  if(first){
    el.style.transition="none";
    el.classList.add("on");
    requestAnimationFrame(()=>{el.style.transition="";});
  }else{
    el.classList.add("on");
    if(prev&&prev!==el)prev.classList.remove("on");
  }
  vnVis.bgSlot=next;
  vnVis.bg=url;
}
function speakerOf(line){
  const npc=line.id==="npc";
  const C=!npc&&typeof CHARS!=="undefined"&&CHARS[line.id];
  const col=npc?"#9bb0d0":((C&&C.color)||"#ffd36b");
  const name=line.name||(C&&C.name)||"???";
  if(line.id==="narrator")return {key:"narrator",col,name,html:'<div class="vn-crest">NARRATOR</div>'};
  if(npc)return {key:"npc|"+col,col,name,html:'<div class="vn-sil" style="--c:'+col+'"><span></span></div>'};
  const img=portOf(line.id);
  if(!img)return {key:"narrator",col,name,html:'<div class="vn-crest">NARRATOR</div>'};
  return {key:line.id,col,name,html:'<img src="'+esc(img)+'" alt="">'};
}
function paintSpeaker(spec){
  const port=document.getElementById("vn-port");
  if(port)port.style.setProperty("--c",spec.col);
  if(vnVis.who===spec.key)return;
  const next=vnVis.who?(vnVis.whoSlot?0:1):0;
  const el=document.getElementById("vn-fig"+next);
  const prev=document.getElementById("vn-fig"+vnVis.whoSlot);
  if(!el)return;
  el.innerHTML=spec.html;
  const first=!vnVis.who;
  if(first){
    el.style.transition="none";
    el.classList.add("on");
    requestAnimationFrame(()=>{el.style.transition="";});
  }else{
    el.classList.add("on");
    if(prev&&prev!==el)prev.classList.remove("on");
  }
  vnVis.whoSlot=next;
  vnVis.who=spec.key;
}
function paintPop(which,key,url,label){
  const el=document.getElementById(which==="cut"?"vn-cut":"vn-item");
  if(!el)return;
  if(vnVis[which]===key)return;
  vnVis[which]=key;
  const img=el.querySelector("img");
  const cap=el.querySelector(which==="cut"?"span":"b");
  if(!key){el.classList.remove("on");return;}
  if(img&&img.getAttribute("src")!==url)img.src=url;
  if(cap)cap.textContent=label||"";
  el.classList.add("on");
}
function showVNLine(){
  const lines=view.lines||[];
  const line=lines[vn.i];if(!line){finishLines();return;}
  const spec=speakerOf(line);
  paintBG(vnArt(line));
  paintSpeaker(spec);
  paintPop("cut",line.cut&&STORY_ART[line.cut]?line.cut:"",line.cut?STORY_ART[line.cut]:"",line.cutCap||"");
  paintPop("item",line.item&&STORY_ART[line.item]?line.item:"",line.item?STORY_ART[line.item]:"",line.itemName||"");
  const nm=document.getElementById("vn-name");
  if(nm){nm.textContent=spec.name;nm.style.background=spec.col;nm.style.color="#1a1008";}
  vn.full=line.text;vn.shown=0;vnLive=true;
  const tx=document.getElementById("vn-text");if(tx)tx.textContent="";
  const nxt=document.getElementById("vn-next");
  if(nxt)nxt.textContent="Tap to continue ▸";
  clearInterval(vn.timer);
  vn.timer=setInterval(()=>{
    vn.shown=Math.min(vn.full.length,vn.shown+1);
    const el=document.getElementById("vn-text");if(el)el.textContent=vn.full.slice(0,vn.shown);
    if(vn.shown>=vn.full.length)clearInterval(vn.timer);
  },16);
}
function vnAdvance(){
  if(!vnLive)return;
  const lines=view.lines||[];
  if(vn.shown<vn.full.length){vn.shown=vn.full.length;clearInterval(vn.timer);const el=document.getElementById("vn-text");if(el)el.textContent=vn.full;return;}
  const line=lines[vn.i];
  if(!line||line.end||vn.i>=lines.length-1){finishLines();return;}
  vn.i++;showVNLine();
}
function finishLines(){
  clearInterval(vn.timer);
  const done=view.onDone;
  view.onDone=null;
  if(typeof done==="function")done();
}

function bw1Script(id){
  const n=charName(id);
  return [
    {id:"narrator",name:"Narrator",bg:"roof",text:"Night wind cuts the highest roof in the city. A drone's red eye blinks. Weisheng is already there, one hand pointed at the sky."},
    {id:"weisheng",bg:"roof",text:"Listen carefully. Not this street. Not this city. The whole world is about to become the Duel World."},
    {id:"weisheng",bg:"city",cut:"city",cutCap:"The city, seen from above",text:"Every light down there is a duelist. They will all compete. One name waits at the end: Lord of Duels."},
    {id:"weisheng",bg:"roof",item:"gauntlet",itemName:"Duel Gauntlet",text:"Every duelist receives a Duel Gauntlet. This is how you play. No table. No excuses. The gauntlet is the field."},
    {id:"weisheng",bg:"roof",item:"key",itemName:"Key Card",text:"And a Key Card. Glass, and yours alone. Win a duel, and you take the loser's Key Card. Lose, and yours is gone."},
    {id:"weisheng",bg:"stadium",cut:"stadium",cutCap:"Duel Stadium, night",text:"Collect 7 Key Cards and the Duel Stadium Finals will open for you. Only 5 duelists are allowed inside. The one who stands last is the Lord of Duels."},
    {id:"narrator",name:"Narrator",bg:"roof",text:"The drone keeps recording. The announcement is already moving through the streets."},
    {id:"narrator",name:"Narrator",bg:"town",text:"Back among the lights of town, the new gauntlet sits heavy on "+n+"'s arm. The Key Card is warm."},
    {id:"sabrina",bg:"town",text:"I heard him! I want to be one of the five. So duel me. Right now. My Key Card against yours."},
    {id:id,bg:"town",text:"You don't have to shout, Sabrina. If this is how the Duel World starts, I'll answer."},
    {id:"sabrina",bg:"town",text:"Then it's a real duel. I'm not letting go of my friends, or my chance. Come on!",end:true}
  ];
}
function bw1AfterScript(id){
  const n=charName(id);
  return [
    {id:"sabrina",bg:"town",text:"You were really strong. Take it. My Key Card is yours. I'll get stronger, and I'll try again."},
    {id:id,bg:"town",item:"key",itemName:"Key Card 1",text:n+" closes a hand around the glass card. First one. Six more, if the stadium is going to open."},
    {id:"narrator",name:"Narrator",bg:"town",text:"One Key Card collected. The rest of Chapter 1 is still on the road ahead. To be continued.",end:true}
  ];
}
function startBw1(){
  const id=protagonist();
  if(!id){openCast();return;}
  if(!chapterCleared("tutorial")&&!chapterCleared("bw1")){
    try{toast("Clear the prologue first.");}catch(e){}
    return;
  }
  view={page:"vn",arc:"bw",vnSet:"bw1",lines:bw1Script(id),onDone:()=>beginSabrinaDuel(id)};
  vn={i:0,shown:0,full:"",timer:null};
  renderStory();
  showScreen("story");
}
function beginSabrinaDuel(id){
  const p=id||protagonist();
  if(typeof startDuel!=="function"){try{toast("Could not start the duel.");}catch(e){}return;}
  startDuel(p,"sabrina",{storyChapter:"bw1",first:"player",arena:"toy_town"});
}
function showSabrinaLoss(){
  const layer=document.getElementById("modalLayer");
  if(!layer){if(typeof leaveDuel==="function")leaveDuel();startBw1();return;}
  layer.innerHTML=`<div class="modal-bg"><div class="modal" style="width:480px;text-align:center"><h2>Sabrina wins</h2>
    <p>She keeps her Key Card, and she is still smiling. The challenge is not over.</p>
    <div class="btnrow" style="display:flex;gap:10px;justify-content:center"><button class="btn gold" id="sab-retry" type="button">Retry duel</button><button class="btn" id="sab-back" type="button">Back</button></div></div></div>`;
  layer.querySelector("#sab-retry").onclick=()=>{layer.innerHTML="";beginSabrinaDuel(protagonist());};
  layer.querySelector("#sab-back").onclick=()=>{layer.innerHTML="";if(typeof leaveDuel==="function")leaveDuel();view={page:"chapters",arc:"bw",lines:null,onDone:null};renderStory();showScreen("story");};
}
function openBw1After(id){
  view={page:"vn",arc:"bw",vnSet:"bw1",lines:bw1AfterScript(id||protagonist()),onDone:finishBw1};
  vn={i:0,shown:0,full:"",timer:null};
  renderStory();
  showScreen("story");
}
function finishBw1(){
  const n=storyBag().story.keyCards|0;
  try{toast("Chapter 1 opening cleared. Key Cards: "+n+". To be continued.");}catch(e){}
  view={page:"chapters",arc:"bw",lines:null,onDone:null};
  renderStory();
  showScreen("story");
}
/* ---------- tutorial duel: Toma (or Lily if the hero is Toma), normal deck and LP ---------- */
function beginTutorialDuel(id,opp){
  const p=id||protagonist();
  const rival=opp||practiceId||practicePartner(p);
  practiceId=rival;
  if(typeof startDuel!=="function"){try{toast("Could not start the practice duel.");}catch(e){}return;}
  startDuel(p,rival,{storyTutorial:true,first:"player",arena:"cat_cafe"});
}
function showTutorialLoss(){
  const layer=document.getElementById("modalLayer");
  const who=charName(practiceId||practicePartner(protagonist()));
  if(!layer){if(typeof leaveDuel==="function")leaveDuel();openCast();return;}
  layer.innerHTML=`<div class="modal-bg"><div class="modal" style="width:480px;text-align:center"><h2>Not yet</h2>
    <p>${esc(who)} is still smiling. The practice duel is for fun — try again.</p>
    <div class="btnrow" style="display:flex;gap:10px;justify-content:center"><button class="btn gold" id="tut-retry" type="button">Retry duel</button><button class="btn" id="tut-back" type="button">Back</button></div></div></div>`;
  layer.querySelector("#tut-retry").onclick=()=>{layer.innerHTML="";beginTutorialDuel(protagonist(),practiceId);};
  layer.querySelector("#tut-back").onclick=()=>{layer.innerHTML="";if(typeof leaveDuel==="function")leaveDuel();openCast();};
}

/* ---------- opening after the win (tap to play, skippable, never autoplay) ---------- */
const SRC720="assets/video/opening_720.mp4";
const SRCFULL="assets/video/opening.mp4";
let player=null;
let storyVid=null;
function closeStoryVideo(){
  if(!storyVid)return;
  try{storyVid.video.pause();storyVid.video.removeAttribute("src");storyVid.video.load();}catch(e){}
  try{if(typeof AUDIO!=="undefined")AUDIO.duck("story",null);}catch(e){}
  storyVid=null;
}
function openStoryOpening(){
  closeStoryVideo();
  view={page:"opening",arc:"bw",lines:null,onDone:null};
  renderStory();
  showScreen("story");
}
function renderOpening(host){
  host.innerHTML=`<div class="story-open"><button class="btn backbtn" id="st-back" type="button">◀ Back</button>
    <video playsinline webkit-playsinline preload="metadata"></video>
    <div class="gal-tap" id="op-tap"><span>TAP TO PLAY</span></div>
    <div class="gal-bar"><button class="btn gold" id="op-pp" type="button">Play</button>
      <span class="t" id="op-time">Opening</span>
      <button class="btn" id="op-skip" type="button">Skip</button></div></div>`;
  const video=host.querySelector("video");
  video.playsInline=true;video.autoplay=false;video.muted=false;video.controls=false;
  let fallback=false;
  video.addEventListener("error",()=>{
    if(fallback){const tap=host.querySelector("#op-tap");if(tap){tap.style.display="flex";tap.querySelector("span").textContent="COULD NOT LOAD — SKIP";}return;}
    fallback=true;
    const wasPlaying=!video.paused&&!video.ended;
    video.src=SRCFULL;
    if(wasPlaying){const p=video.play();if(p&&p.catch)p.catch(()=>{});}
  });
  const tap=host.querySelector("#op-tap");
  const pp=host.querySelector("#op-pp");
  function userPlay(){
    try{if(typeof AUDIO!=="undefined"){AUDIO.unlock();AUDIO.duck("story",0);}}catch(e){}
    if(!video.getAttribute("src"))video.src=SRC720;
    tap.style.display="none";
    tuneVideo(video);
    const p=video.play();
    if(p&&p.then)p.then(()=>{pp.textContent="Pause";}).catch(()=>{tap.style.display="flex";try{AUDIO.duck("story",null);}catch(e){}});
  }
  host.querySelector("#st-back").onclick=e=>{e.stopPropagation();closeStoryVideo();view={page:"arcs",arc:"bw",lines:null,onDone:null};renderStory();};
  tap.onclick=e=>{e.stopPropagation();userPlay();};
  pp.onclick=e=>{e.stopPropagation();if(video.paused)userPlay();else{video.pause();pp.textContent="Play";try{AUDIO.duck("story",null);}catch(err){}}};
  video.addEventListener("ended",()=>finishTutorial());
  host.querySelector("#op-skip").onclick=e=>{e.stopPropagation();finishTutorial();};
  storyVid={video};
}
function finishTutorial(){
  closeStoryVideo();
  markChapter("tutorial");
  try{toast("Prologue cleared. Gallery opening unlocked. Chapter 1 is next.");}catch(e){}
  view={page:"chapters",arc:"bw",lines:null,onDone:null};
  renderStory();
  showScreen("story");
}

/* ---------- gallery ---------- */
function openGallery(){closePlayer();closeStoryVideo();renderGallery();showScreen("gallery");}
window.openGallery=openGallery;
function renderGallery(){
  const s=screen("gallery");
  const open=galleryOpen();
  s.innerHTML=`<div class="st-wrap"><button class="btn backbtn" id="st-back" type="button">◀ Menu</button>
    <h2>GALLERY</h2><div class="sub">${open?"Battle World prologue cleared. The opening is yours.":"Clear the Battle World prologue to unlock the opening."}</div>
    <div class="gal-grid"><button class="gal-card ${open?"":"locked"}" id="gal-open" type="button">
      <div class="gal-thumb">${open?"▶":"🔒"}</div>
      <div class="gal-body"><h3>Anime Opening</h3><p>${open?"Tap to play. Nothing starts until you tap.":"Clear the Battle World prologue to unlock."}</p></div>
    </button></div></div>`;
  s.querySelector("#st-back").onclick=()=>{closePlayer();showScreen("menu");};
  s.querySelector("#gal-open").onclick=()=>{
    if(!galleryOpen()){
      try{toast("Clear the Battle World prologue to unlock.");}catch(e){}
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
    tuneVideo(video);
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
  const t=e.target;if(t&&/INPUT|TEXTAREA|SELECT|BUTTON/.test(t.tagName))return;
  e.preventDefault();vnAdvance();
});
document.addEventListener("keydown",e=>{
  if(typeof CUR==="undefined"||CUR!=="story"||view.page!=="select")return;
  const t=e.target;if(t&&/INPUT|TEXTAREA|SELECT/.test(t.tagName))return;
  const bases=rosterBases();
  const i=Math.max(0,bases.indexOf(SS.cur));
  const cols=4;
  if(e.key==="ArrowLeft"||e.key==="ArrowRight"||e.key==="ArrowUp"||e.key==="ArrowDown"){
    e.preventDefault();
    const d=e.key==="ArrowLeft"?-1:e.key==="ArrowRight"?1:e.key==="ArrowUp"?-cols:cols;
    let n=i;
    for(let k=0;k<bases.length;k++){
      n=(n+d+bases.length)%bases.length;
      if(!adcPlayerLocked(shownOf(bases[n])))break;
    }
    SS.cur=bases[n];
    syncSelect(screen("story"));
    return;
  }
  if(e.key==="m"||e.key==="M"){if(SS.cur&&modeAlt(SS.cur))toggleStoryMode(screen("story"),SS.cur);}
  else if(e.key==="Enter"){e.preventDefault();confirmCast();}
});

if(typeof showScreen==="function"){
  const prevSS=showScreen;
  showScreen=function(name){
    if(name!=="gallery")closePlayer();
    if(name!=="story")closeStoryVideo();
    return prevSS.apply(this,arguments);
  };
}

/* Story practice duels still flag themselves. Other modes may pick any duelist. */
if(typeof startDuel==="function"){
  const prev=startDuel;
  startDuel=function(p,e,opts){
    const r=prev.apply(this,arguments);
    if(opts&&typeof G!=="undefined"&&G){
      if(opts.storyTutorial){G.storyTutorial=true;G.aiDiff="easy";}
      if(opts.storyChapter){G.storyChapter=opts.storyChapter;if(!opts.storyTutorial)G.aiDiff="normal";}
    }
    return r;
  };
}
if(typeof showGameOver==="function"){
  const prev=showGameOver;
  showGameOver=function(winner,reason){
    if(typeof G!=="undefined"&&G&&G.storyChapter==="bw1"){
      const id=(G.match&&G.match[0])||protagonist();
      if(winner==="player"){
        const s=storyBag();
        const first=!s.story.bw1;
        if(first)s.story.keyCards=(s.story.keyCards|0)+1;
        s.story.bw1=true;
        saveStore(s);
        window.adcStory=s.story;
        if(typeof leaveDuel==="function")leaveDuel();
        openBw1After(id);
        return;
      }
      showSabrinaLoss();
      return;
    }
    if(!(typeof G!=="undefined"&&G&&G.storyTutorial))return prev.apply(this,arguments);
    const id=(G.match&&G.match[0])||protagonist();
    if(winner==="player"){
      const s=storyBag();
      s.story.tutorialWon=true;
      if(id&&!adcPlayerLocked(id))s.story.protagonist=id;
      saveStore(s);
      window.adcStory=s.story;
      if(typeof leaveDuel==="function")leaveDuel();
      openAfterWin(id);
      return;
    }
    showTutorialLoss();
  };
}
/* Every <video> follows the Music slider (AUDIO.set.music) and Mute all.
   Sound-effect volume is not used. Ducking the music bed for a clip does not
   silence the video: the slider value itself is the video volume. */
function musicVideoLevel(){
  try{
    const s=typeof AUDIO!=="undefined"&&AUDIO.set;
    if(!s)return 1;
    if(s.mute)return 0;
    const m=+s.music;
    if(!isFinite(m))return 1;
    return Math.max(0,Math.min(1,m));
  }catch(e){return 1;}
}
let tuningVideo=false;
function tuneVideo(v){
  if(!v||v.nodeName!=="VIDEO"||tuningVideo)return;
  tuningVideo=true;
  try{
    const level=musicVideoLevel();
    if(Math.abs((v.volume||0)-level)>0.001)v.volume=level;
    const silent=level<=0;
    if(v.muted!==silent)v.muted=silent;
  }catch(e){}
  tuningVideo=false;
}
function tuneAllVideos(){
  try{document.querySelectorAll("video").forEach(tuneVideo);}catch(e){}
}
window.adcMusicVideoLevel=musicVideoLevel;
window.adcTuneVideos=tuneAllVideos;
if(typeof AUDIO!=="undefined"&&typeof AUDIO.setVol==="function"){
  const prevVol=AUDIO.setVol;
  AUDIO.setVol=function(k,v){
    const r=prevVol.apply(this,arguments);
    if(k==="music"||k==="mute")tuneAllVideos();
    return r;
  };
}
try{
  const proto=window.HTMLVideoElement&&HTMLVideoElement.prototype;
  const desc=window.HTMLMediaElement&&Object.getOwnPropertyDescriptor(HTMLMediaElement.prototype,"volume");
  if(proto&&desc&&desc.set&&!proto.adcMusicVol){
    Object.defineProperty(proto,"volume",{
      configurable:true,enumerable:true,
      get(){return desc.get.call(this);},
      set(){desc.set.call(this,musicVideoLevel());}
    });
    proto.adcMusicVol=true;
  }
  if(proto&&!proto.adcMusicPlay){
    const origPlay=proto.play;
    proto.play=function(){tuneVideo(this);return origPlay.apply(this,arguments);};
    proto.adcMusicPlay=true;
  }
}catch(e){}
document.addEventListener("volumechange",e=>{if(e.target&&e.target.nodeName==="VIDEO")tuneVideo(e.target);},true);
document.addEventListener("play",e=>{if(e.target&&e.target.nodeName==="VIDEO")tuneVideo(e.target);},true);
try{
  const mo=new MutationObserver(recs=>{
    recs.forEach(rec=>rec.addedNodes&&rec.addedNodes.forEach(n=>{
      if(!n||n.nodeType!==1)return;
      if(n.nodeName==="VIDEO")tuneVideo(n);
      else if(n.querySelectorAll)n.querySelectorAll("video").forEach(tuneVideo);
    }));
  });
  mo.observe(document.documentElement,{childList:true,subtree:true});
}catch(e){}
tuneAllVideos();

/* Monster ATK/DEF sit on a level curve, then a role adjusts that curve.
   Effect monsters are the baseline. Vanilla bodies are a little higher.
   Aces sit at the top of the level. Walls trade ATK for DEF. A direct-only
   attacker trades both. Numbers already inside the band stay. Outliers move
   to the nearest edge, so no duelist's set is a full tier above or below.
   Aura, burn and heal numbers that exceed the level cap are pulled down.
   Wei Yao's base form (not the alt) is then lifted above that curve. */
function balanceMonsters(){
  if(typeof CARDS==="undefined"||window.__adcBalanced)return;
  window.__adcBalanced=1;
  const curve={
    1:{atk:700,def:700},2:{atk:900,def:900},3:{atk:1200,def:1100},4:{atk:1600,def:1400},
    5:{atk:2000,def:1700},6:{atk:2300,def:1900},7:{atk:2550,def:2100},8:{atk:2850,def:2350},
    9:{atk:3050,def:2600},10:{atk:3250,def:2800}
  };
  const roleMul={effect:{atk:1,def:1},vanilla:{atk:1.06,def:1},direct:{atk:0.9,def:0.84},wall:{atk:0.78,def:1.35},ace:{atk:1.05,def:1.06}};
  const r50=n=>Math.max(0,Math.round(n/50)*50);
  const clamp=(n,lo,hi)=>Math.max(lo,Math.min(hi,n));
  function roleOf(c){
    const fx=c.fx||{};
    const keys=Object.keys(fx).filter(k=>fx[k]);
    if(c.ace||c.extra||c.destiny||(c.level||0)>=9)return "ace";
    if(fx.guard&&c.def>=c.atk)return "wall";
    if(!keys.length)return "vanilla";
    if(fx.direct&&keys.length===1)return "direct";
    if(c.atk>0&&c.def>=c.atk*1.25&&c.def-c.atk>=400)return "wall";
    return "effect";
  }
  function walkFx(fx,fn){
    if(!fx)return;
    if(Array.isArray(fx)){fx.forEach(x=>walkFx(x,fn));return;}
    fn(fx);
    ["onSummon","onDestroy","flip","aura","auraPer"].forEach(k=>{if(fx[k])walkFx(fx[k],fn);});
  }
  const before=[];
  for(const id in CARDS){
    const c=CARDS[id];
    if(!c||c.type!=="monster"||c.retired)continue;
    if(c.token&&(!c.atk||id==="ue_inkcopy"))continue;
    if(c.ch==="weiyao"){
      c._wy={atk:c.atk,def:c.def};
      before.push({id:id,name:c.name,level:c.level,atk:c.atk,def:c.def,fx:JSON.parse(JSON.stringify(c.fx||{}))});
    }
    const lv=c.level||1;
    const base=curve[lv]||curve[10];
    const mul=roleMul[roleOf(c)];
    const tA=base.atk*mul.atk,tD=base.def*mul.def;
    c.atk=clamp(r50(c.atk),r50(tA*0.94),r50(tA*1.06));
    c.def=clamp(r50(c.def),r50(tD*0.90),r50(tD*1.08));
    const auraMax=lv<=3?250:lv<=5?350:lv<=7?400:500;
    const hitMax=lv<=3?500:lv<=5?700:lv<=7?1000:1200;
    walkFx(c.fx,fx=>{
      if(typeof fx.atk==="number"&&fx.atk>auraMax)fx.atk=auraMax;
      if((fx.k==="burn"||fx.k==="heal")&&typeof fx.v==="number"&&fx.v>hitMax)fx.v=hitMax;
      if(fx.k==="destroyMon"&&!fx.maxAtk&&c.level>=8)fx.maxAtk=2600;
    });
  }
  for(const id in CARDS){
    const c=CARDS[id];
    if(!c||c.ch!=="weiyao"||c.retired)continue;
    if(c.type==="monster"){
      const bump=c.level>=7?300:c.level>=5?250:200;
      const orig=c._wy||{atk:c.atk,def:c.def};
      c.atk=r50(Math.max(c.atk,orig.atk)+bump);
      c.def=r50(Math.max(c.def,orig.def)+100);
      delete c._wy;
      walkFx(c.fx,fx=>{
        if(typeof fx.atk==="number")fx.atk+=100;
        if((fx.k==="heal"||fx.k==="burn")&&typeof fx.v==="number")fx.v+=200;
      });
    }
  }
  if(CARDS.w_glow&&CARDS.w_glow.fx&&typeof CARDS.w_glow.fx.atk==="number")CARDS.w_glow.fx.atk+=100;
  if(CARDS.w_wall&&CARDS.w_wall.fx&&typeof CARDS.w_wall.fx.v==="number")CARDS.w_wall.fx.v+=200;
  if(CARDS.w_spot&&CARDS.w_spot.fx&&typeof CARDS.w_spot.fx.v==="number")CARDS.w_spot.fx.v+=200;
  window.adcWeiBefore=before;
}
balanceMonsters();

/* A saved deck belongs to that duelist in every mode. Default is only the
   fallback when nothing valid is saved. The deck builder itself is unchanged. */
function savedOrNull(ch){
  try{return typeof savedDeck==="function"?savedDeck(ch):null;}catch(e){return null;}
}
if(typeof deckFor==="function"){
  const prevDeck=deckFor;
  deckFor=function(ch,side){
    const d=savedOrNull(ch);
    if(d)return d;
    return prevDeck.call(this,ch,side);
  };
}
if(typeof netMyDeck==="function"){
  netMyDeck=function(){
    const me=NET.me;
    if(me.deck==="list"&&me.list&&typeof validDeck==="function"&&validDeck(me.ch,me.list))return me.list;
    if(me.deck==="default"&&me.deckHeld)return defaultDeck(me.ch);
    const d=savedOrNull(me.ch);
    if(d)return d;
    return defaultDeck(me.ch);
  };
}
if(typeof netPickHTML==="function"){
  const prevPick=netPickHTML;
  netPickHTML=function(){
    const me=typeof NET!=="undefined"&&NET.me;
    if(me&&!me.deckHeld&&savedOrNull(me.ch))me.deck="custom";
    return prevPick.apply(this,arguments);
  };
}
if(typeof netBindPick==="function"){
  const prevBind=netBindPick;
  netBindPick=function(){
    const r=prevBind.apply(this,arguments);
    const d=document.querySelector("#np-deck");
    if(d){
      const old=d.onchange;
      d.onchange=function(){
        if(NET.me)NET.me.deckHeld=d.value==="default";
        if(old)return old.apply(this,arguments);
      };
    }
    return r;
  };
}

})();
