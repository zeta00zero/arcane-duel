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
   Only You may edit a deck, and only shared spells and traps. Other duelists use their fixed decks.
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
#story.arc-bgd .vn{background:linear-gradient(180deg,rgba(8,6,16,.28),rgba(8,6,16,.55))}
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
.vn{position:absolute;inset:0;display:flex;background:radial-gradient(ellipse at 30% 40%,#2a1848 0%,#0b0714 70%)}
.vn-hit{position:absolute;inset:0;cursor:pointer}
.vn-port{position:absolute;left:36px;bottom:0;width:420px;height:760px;display:flex;align-items:flex-end;justify-content:center;pointer-events:none}
.vn-port img{width:400px;height:640px;object-fit:cover;object-position:50% 8%;border-radius:18px 18px 0 0;border:3px solid var(--c,#ffd36b);
  box-shadow:0 0 40px var(--c,#ffd36b);background:#000}
.vn-crest{width:280px;height:280px;margin-bottom:220px;border-radius:50%;border:3px solid #ffd36b88;display:flex;align-items:center;justify-content:center;
  font-family:Impact,"Arial Black",sans-serif;letter-spacing:2px;color:#ffe9a8;text-align:center;padding:20px;
  background:radial-gradient(circle,#3a2468,#120818);box-shadow:0 0 40px #ffd36b44}
.vn-sil{width:260px;height:520px;margin-bottom:80px;border-radius:130px 130px 24px 24px;position:relative;
  background:linear-gradient(180deg,#232838,#0a0c12);border:3px solid var(--c,#9bb0d0);box-shadow:0 0 36px var(--c,#9bb0d0)}
.vn-sil span{position:absolute;left:50%;top:72px;width:112px;height:112px;margin-left:-56px;border-radius:50%;background:#10131b;box-shadow:inset 0 0 0 10px #3a4458}
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
#vn-extra{position:absolute;right:28px;top:86px;z-index:4;display:flex;flex-direction:column;gap:12px;align-items:flex-end;pointer-events:none;max-width:480px}
.vn-item{width:210px;border-radius:14px;overflow:hidden;border:2px solid #ffd36b;background:rgba(16,10,24,.9);box-shadow:0 12px 32px #000c}
.vn-item img{display:block;width:100%;height:148px;object-fit:cover}
.vn-item b{display:block;padding:6px 8px 8px;text-align:center;color:#ffe9a8;letter-spacing:1px;font-size:13px}
.vn-cut{width:min(460px,42vw);border-radius:14px;overflow:hidden;border:2px solid #ffffff66;box-shadow:0 14px 36px #000c}
.vn-cut img{display:block;width:100%;height:220px;object-fit:cover}
.vn-cut span{display:block;padding:6px 10px;background:rgba(0,0,0,.72);font-size:13px;color:#fff}
#youpick{position:absolute;inset:0;display:flex;flex-direction:column;padding:72px 28px 18px;box-sizing:border-box;color:#fff}
#youpick h2{margin:0;font-family:Impact,"Arial Black",sans-serif;letter-spacing:2px;color:#ffd36b;font-size:34px}
#youpick .sub{opacity:.8;margin:4px 0 10px;font-size:14px}
.yp-fixed{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px}
.yp-chip{font-size:12px;padding:4px 8px;border-radius:999px;background:#ffffff14;border:1px solid #ffd36b44}
.yp-grid{flex:1;min-height:0;overflow:auto;display:grid;grid-template-columns:repeat(4,1fr);gap:10px;padding-right:4px}
.yp-card{display:flex;gap:10px;align-items:center;text-align:left;color:#fff;background:linear-gradient(180deg,rgba(255,255,255,.06),rgba(0,0,0,.28));border:2px solid #ffffff22;border-radius:14px;padding:8px}
.yp-card.on{border-color:#ffd36b}
.yp-card img,.yp-card .ph{width:54px;height:74px;object-fit:cover;border-radius:8px;background:#000;flex:none}
.yp-card .nm{font-weight:bold;font-size:14px}
.yp-card .k{font-size:11px;letter-spacing:1px;color:#ffd36b;margin-top:2px}
.yp-card .ctr{margin-left:auto;display:flex;align-items:center;gap:6px}
.yp-card .ctr b{min-width:14px;text-align:center}
.yp-foot{display:flex;align-items:center;gap:10px;margin-top:10px}
.yp-foot .count{font-family:Impact,sans-serif;letter-spacing:1px;font-size:20px}
.yp-foot .count.ok{color:#9dffb0}
.yp-foot .count.bad{color:#ff9aa8}
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

function renderVN(host){
  host.innerHTML=`<div class="vn vn-cafe"><button class="btn backbtn" id="st-back" type="button" style="z-index:3">◀ Back</button>
    <div class="vn-hit" id="vn-hit"></div>
    <div class="vn-port" id="vn-port"></div>
    <div id="vn-extra"></div>
    <div class="vn-box"><div class="vn-name" id="vn-name"></div><div class="vn-text" id="vn-text"></div><div class="vn-next" id="vn-next">Tap to continue ▸</div></div></div>`;
  host.querySelector("#st-back").onclick=e=>{
    e.stopPropagation();clearInterval(vn.timer);
    if(view.vnSet==="bw1"){view={page:"chapters",arc:"bw",lines:null,onDone:null};renderStory();return;}
    view.page=storyBag().story.tutorialWon?"arcs":"select";renderStory();
  };
  host.querySelector("#vn-hit").onclick=vnAdvance;
  showVNLine();
}
function showVNLine(){
  const lines=view.lines||[];
  const line=lines[vn.i];if(!line){finishLines();return;}
  const npc=line.id==="npc";
  const C=!npc&&typeof CHARS!=="undefined"&&CHARS[line.id];
  const name=line.name||(C&&C.name)||"???";
  const col=npc?"#9bb0d0":((C&&C.color)||"#ffd36b");
  const port=document.getElementById("vn-port");
  port.style.setProperty("--c",col);
  if(line.id==="narrator")port.innerHTML=`<div class="vn-crest">NARRATOR</div>`;
  else if(npc)port.innerHTML=`<div class="vn-sil" style="--c:${col}"><span></span></div>`;
  else{
    const img=portOf(line.id);
    port.innerHTML=img?`<img src="${img}" alt="">`:`<div class="vn-crest">NARRATOR</div>`;
  }
  const root=document.querySelector("#story .vn");
  const art=vnArt(line);
  if(root&&art)root.style.background="linear-gradient(180deg,rgba(12,8,16,.25),rgba(8,6,14,.58)),url(\""+String(art).replace(/"/g,"%22")+"\") center/cover no-repeat";
  const extra=document.getElementById("vn-extra");
  if(extra){
    const bits=[];
    if(line.cut&&STORY_ART[line.cut])bits.push(`<div class="vn-cut"><img src="${STORY_ART[line.cut]}" alt=""><span>${esc(line.cutCap||"")}</span></div>`);
    if(line.item&&STORY_ART[line.item])bits.push(`<div class="vn-item"><img src="${STORY_ART[line.item]}" alt=""><b>${esc(line.itemName||"")}</b></div>`);
    extra.innerHTML=bits.join("");
  }
  const nm=document.getElementById("vn-name");
  nm.textContent=name;nm.style.background=col;nm.style.color="#1a1008";
  vn.full=line.text;vn.shown=0;
  const tx=document.getElementById("vn-text");if(tx)tx.textContent="";
  const nxt=document.getElementById("vn-next");
  if(nxt)nxt.textContent=line.end?"Tap to continue ▸":"Tap to continue ▸";
  clearInterval(vn.timer);
  vn.timer=setInterval(()=>{
    vn.shown=Math.min(vn.full.length,vn.shown+1);
    const el=document.getElementById("vn-text");if(el)el.textContent=vn.full.slice(0,vn.shown);
    if(vn.shown>=vn.full.length)clearInterval(vn.timer);
  },16);
}
function vnAdvance(){
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
      if(opts.storyTutorial)G.storyTutorial=true;
      if(opts.storyChapter)G.storyChapter=opts.storyChapter;
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

/* Monster stats are pulled into a shared level band so no duelist's ace
   runs away with the match. Effects stay. Ink-copy tokens are left alone. */
function balanceMonsters(){
  if(typeof CARDS==="undefined"||window.__adcBalanced)return;
  window.__adcBalanced=1;
  const band={1:[400,1100],2:[500,1100],3:[700,1650],4:[700,1800],5:[1600,2300],6:[2000,2500],7:[2200,2700],8:[2500,3000],9:[2800,3200],10:[3000,3300]};
  const by={};
  for(const id in CARDS){
    const c=CARDS[id];
    if(!c||c.type!=="monster"||c.token||c.extra||c.retired)continue;
    (by[c.ch]||(by[c.ch]=[])).push(c);
  }
  const TARGET=2650;
  for(const ch in by){
    const top=by[ch].slice().sort((a,b)=>b.atk-a.atk).slice(0,3);
    if(!top.length)continue;
    const avg=top.reduce((s,c)=>s+c.atk,0)/top.length;
    if(!avg)continue;
    let scale=TARGET/avg;
    if(scale<0.92)scale=0.92;
    if(scale>1.10)scale=1.10;
    if(Math.abs(scale-1)<0.04)continue;
    by[ch].forEach(c=>{
      c.atk=Math.max(0,Math.round(c.atk*scale/50)*50);
      c.def=Math.max(0,Math.round(c.def*scale/50)*50);
    });
  }
  for(const id in CARDS){
    const c=CARDS[id];
    if(!c||c.type!=="monster"||c.retired||id==="ue_inkcopy")continue;
    const b=band[c.level]||[2800,3300];
    if(typeof c.atk==="number"&&c.atk>b[1])c.atk=b[1];
    if(typeof c.def==="number"){
      const hi=Math.round(b[1]*1.08/50)*50;
      if(c.def>hi)c.def=hi;
    }
  }
  const titan=CARDS.b_titan;
  if(titan&&titan.fx&&titan.fx.onSummon&&titan.fx.onSummon.k==="destroyMon"&&!titan.fx.onSummon.maxAtk){
    titan.fx.onSummon=Object.assign({},titan.fx.onSummon,{maxAtk:2600});
  }
  if(CARDS.cl_destiny){
    if(CARDS.cl_destiny.atk>3300)CARDS.cl_destiny.atk=3300;
    if(CARDS.cl_destiny.def>3400)CARDS.cl_destiny.def=3400;
  }
}
balanceMonsters();

/* Only You edits a deck, and only the shared spells and traps.
   Monsters stay on the fixed starter list. Other duelists ignore saved decks. */
function youMonsters(){
  const d=defaultDeck("you"),o={};
  for(const id in d)if(CARDS[id]&&CARDS[id].type==="monster")o[id]=d[id];
  return o;
}
function sharedSpells(){
  return Object.keys(CARDS).filter(id=>{
    const c=CARDS[id];
    if(!c||c.extra||c.retired||c.ch!=="shared")return false;
    if(c.type!=="spell"&&c.type!=="trap")return false;
    const k=c.fx&&c.fx.k;
    if(k==="destroyAll"||k==="destroyWeakAll"||k==="destroyAllST")return false;
    return true;
  }).sort((a,b)=>CARDS[a].name.localeCompare(CARDS[b].name));
}
function youDeckOk(d){
  if(!d)return false;
  const m=youMonsters();
  let n=0;
  for(const id in m){if(d[id]!==m[id])return false;n+=m[id];}
  const allow={};
  sharedSpells().forEach(id=>allow[id]=1);
  for(const id in d){
    if(m[id])continue;
    const c=CARDS[id];
    if(!allow[id]||!c||d[id]<1||d[id]>3)return false;
    n+=d[id];
  }
  return n>=30&&n<=40;
}
function youWorkingDeck(){
  const o=Object.assign({},youMonsters());
  const saved=store().decks&&store().decks.you;
  const src=saved&&youDeckOk(saved)?saved:defaultDeck("you");
  for(const id in src){
    const c=CARDS[id];
    if(c&&(c.type==="spell"||c.type==="trap"))o[id]=src[id];
  }
  return o;
}
if(typeof deckFor==="function"){
  deckFor=function(ch){
    if(ch==="you")return youWorkingDeck();
    return defaultDeck(ch);
  };
}
if(typeof savedDeck==="function"){
  savedDeck=function(ch){
    if(ch!=="you")return null;
    const d=store().decks&&store().decks.you;
    return d&&youDeckOk(d)?d:null;
  };
}
if(typeof detailHTML==="function"){
  const prevDetail=detailHTML;
  detailHTML=function(c){
    let html=prevDetail.apply(this,arguments);
    if(c==="you")html=html.replace("Deck: built by you in the Deck Builder from every card in the game","Deck: fixed monsters · you choose the shared spells and traps");
    return html.replace(/ · custom deck ✔/g,"");
  };
}
function youSpellCount(){
  let n=0;
  for(const id in DB.deck){
    const c=CARDS[id];
    if(c&&(c.type==="spell"||c.type==="trap"))n+=DB.deck[id];
  }
  return n;
}
function renderYouSpells(){
  const el=document.getElementById("builder");
  if(!el)return;
  const monsters=youMonsters();
  let mcount=0;
  const chips=Object.keys(monsters).map(id=>{
    mcount+=monsters[id];
    return `<span class="yp-chip">${esc(CARDS[id].name)} ×${monsters[id]}</span>`;
  }).join("");
  const spells=sharedSpells();
  const sc=youSpellCount();
  const total=mcount+sc;
  const ok=total>=30&&total<=40;
  const cards=spells.map(id=>{
    const c=CARDS[id];
    const n=DB.deck[id]||0;
    const art=typeof artSrc==="function"?artSrc(id):"";
    return `<div class="yp-card ${n?"on":""}"><img src="${art}" alt="" onerror="this.style.visibility='hidden'">
      <div><div class="nm">${esc(c.name)}</div><div class="k">${esc(c.type==="trap"?"TRAP":(c.kind||"SPELL"))}</div></div>
      <div class="ctr"><button class="btn" type="button" data-rm="${id}">−</button><b>${n}</b><button class="btn" type="button" data-add="${id}">+</button></div></div>`;
  }).join("");
  el.innerHTML=`<div id="youpick"><button class="btn backbtn" id="db-back" type="button">◀ Menu</button>
    <h2>YOUR SPELLS &amp; TRAPS</h2>
    <div class="sub">Monsters stay fixed (${mcount} cards). Choose shared spells and traps until the deck is 30–40. Max 3 copies.</div>
    <div class="yp-fixed">${chips}</div>
    <div class="yp-grid">${cards}</div>
    <div class="yp-foot"><span class="count ${ok?"ok":"bad"}">${total} / 30–40</span>
      <button class="btn green" id="db-save" type="button" ${ok?"":"disabled"}>Save</button>
      <button class="btn" id="db-reset" type="button">Reset</button></div></div>`;
  el.querySelector("#db-back").onclick=()=>showScreen("menu");
  el.querySelectorAll("[data-add]").forEach(b=>b.onclick=()=>{
    const id=b.dataset.add;
    if((DB.deck[id]||0)>=3){toast("Max 3 copies.");return;}
    if(mcount+youSpellCount()>=40){toast("Deck is full (40).");return;}
    DB.deck[id]=(DB.deck[id]||0)+1;
    renderYouSpells();
  });
  el.querySelectorAll("[data-rm]").forEach(b=>b.onclick=()=>{
    const id=b.dataset.rm;
    if(!DB.deck[id])return;
    DB.deck[id]--;
    if(!DB.deck[id])delete DB.deck[id];
    renderYouSpells();
  });
  const save=el.querySelector("#db-save");
  if(save)save.onclick=()=>{
    if(!youDeckOk(DB.deck)){toast("Deck must be 30–40 cards.");return;}
    const st=store();
    st.decks=st.decks||{};
    const clean={};
    const m=youMonsters();
    for(const id in m)clean[id]=m[id];
    sharedSpells().forEach(id=>{if(DB.deck[id])clean[id]=DB.deck[id];});
    st.decks.you=clean;
    if(st.decks){for(const k in st.decks)if(k!=="you")delete st.decks[k];}
    saveStore(st);
    toast("Spells and traps saved.");
    renderYouSpells();
  };
  el.querySelector("#db-reset").onclick=()=>{
    const st=store();
    if(st.decks)delete st.decks.you;
    saveStore(st);
    DB.deck=youWorkingDeck();
    toast("Back to the starter spells.");
    renderYouSpells();
  };
}
if(typeof openBuilder==="function"){
  openBuilder=function(ch){
    if(ch&&ch!=="you"){
      try{toast("Only You can edit spells and traps. Other duelists keep a fixed deck.");}catch(e){}
      return;
    }
    DB.ch="you";
    DB.deck=youWorkingDeck();
    showScreen("builder");
    renderYouSpells();
  };
  renderBuilder=function(){renderYouSpells();};
}
})();
