"use strict";
/* ================= ONLINE DUEL (i_net.js) =================
   Peer-to-peer multiplayer over WebRTC (PeerJS). No game server: the free public PeerJS
   signalling server (0.peerjs.com) only introduces the two browsers; all duel traffic then
   flows directly between them on a reliable, ordered WebRTC data channel.

   Model: HOST-AUTHORITATIVE.
   - The host runs the real engine (c_engine.js) with a seeded RNG. Host = "player", guest = "enemy".
   - The guest never runs game rules. It renders mirrored snapshots (its own side at the bottom)
     and sends INTENTS (summon / set / spell / position / attack / phase / discard / response).
   - The host validates every intent against its state, applies it with the normal engine
     functions and streams: snapshots (hidden info redacted), FX events (animations, banners,
     cinematics, speech, SFX), and battle-log lines rewritten for the guest's point of view.
   - The guest only ever receives its own hand, its own deck contents (sorted, so not the order),
     public cards and counts. Host hand / deck / face-down cards arrive as anonymous stubs and
     card uids are randomised, so a uid reveals nothing about a hidden card.
   Load order: after h_v4.js (and after i_audio.js when present). Needs the PeerJS script.
   Hooks into existing code: see MERGE.md (2 one-line edits in c_engine.js, everything else
   is done here by wrapping global functions). */
const NET_VER=1;
const NET_CFG={prefix:"adcduel-v1-",respSec:25,discardSec:30,reconnectSec:60,pingMs:2000,lostMs:12000,turnDefault:120,
  emotes:["Good luck!","Nice move!","Oops!","Well played!","Hmm...","GG"]};
const NET_Q=(()=>{try{return new URLSearchParams(location.search);}catch(e){return new URLSearchParams("");}})();
const NET={role:null,peer:null,conn:null,code:null,connected:false,token:null,guestToken:null,leaving:false,
  view:"home",inDuel:false,duelView:false,duelNo:0,me:{name:"",ch:"you",deck:"default",ready:false},opp:null,
  cfg:{arena:"home",turn:NET_CFG.turnDefault},startInfo:null,names:null,seq:0,dirty:false,flushQ:false,lastSnapStr:"",
  sup:0,pend:new Map(),iid:0,pid:0,prompt:null,rDiscard:null,guestPromptId:null,glog:[],hlog:[],lastSnap:null,
  lastRx:0,lostAt:0,tt:{turn:-1,left:0},tick:null,speed:1,botHost:false,botGuest:false,botRunning:false,botTurnDone:-1,
  rematch:{me:false,opp:false},lastEmote:0,origRandom:null,seed:0,uids:new Set(),starting:false,retryT:null,
  link:null,lastTx:0,lastQ:0,snapBase:null,lastIntent:0,opt:null,rq:false,
  stats:{snaps:0,hashOK:0,hashBad:0,badTurns:[],turnsChecked:{},intents:0,rejects:0,rejectMsgs:[],fx:{},prompts:0,resps:0,resyncs:0,reconnects:0,emotesRx:0,aceSeen:0,cineSeen:0}};

/* ---------- small helpers ---------- */
const netMir=s=>s==="player"?"enemy":s==="enemy"?"player":s;
const netEsc=s=>String(s==null?"":s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const netName=s=>{const t=String(s||"").replace(/[^\p{L}\p{N} _.\-!?]/gu,"").replace(/\s+/g," ").trim().slice(0,16);return t||"Duelist";};
const netRand32=()=>{try{return crypto.getRandomValues(new Uint32Array(1))[0];}catch(e){return Math.floor(Math.random()*4294967296);}};
const netRandInt=n=>netRand32()%n;
const NET_ALPHA="ABCDEFGHJKMNPQRSTUVWXYZ23456789";
function netGenCode(){let s="";for(let i=0;i<6;i++)s+=NET_ALPHA[netRandInt(NET_ALPHA.length)];return s;}
function netCleanCode(s){return String(s||"").toUpperCase().replace(/[^A-Z0-9]/g,"").slice(0,6);}
function netRng(seed){return function(){seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
function netRandUid(){let u;do{u=1000000+netRandInt(2000000000);}while(NET.uids.has(u));NET.uids.add(u);return u;}
const netHostLive=()=>NET.role==="host"&&NET.inDuel&&!!G&&!!G.net&&!G.guest;
const netGuestLive=()=>NET.role==="guest"&&!!G&&!!G.guest;
function netIsAI(s){if(NET.role==="host"&&s==="player")return !!NET.botHost;return false;}
function netSend(o){const c=NET.conn;if(!c||!NET.connected||!c.open)return false;try{c.send(o);NET.lastTx=Date.now();return true;}catch(e){return false;}}
function netToast(t){try{toast(t);}catch(e){}}
function netSettings(){try{return JSON.parse(localStorage.getItem("adc_net")||"{}")||{};}catch(e){return {};}}
function netSaveSettings(o){try{localStorage.setItem("adc_net",JSON.stringify(o));}catch(e){}}

/* ---------- PeerJS options: public cloud by default, own PeerServer / TURN via settings or URL ---------- */
function netPeerOpts(){const st=netSettings(),q=NET_Q;const o={debug:+(q.get("netdebug")||0)};
  const host=q.get("peerhost")||st.host;
  if(host){o.host=host;o.port=+(q.get("peerport")||st.port||443);o.path=q.get("peerpath")||st.path||"/";
    const sec=q.get("peersecure");o.secure=sec!=null?sec!=="0":(st.secure!=null?!!st.secure:o.port===443);o.key=q.get("peerkey")||st.key||"peerjs";}
  const ice=[{urls:"stun:stun.l.google.com:19302"},{urls:"stun:stun1.l.google.com:19302"},{urls:"stun:stun.cloudflare.com:3478"},
    {urls:["turn:eu-0.turn.peerjs.com:3478","turn:us-0.turn.peerjs.com:3478"],username:"peerjs",credential:"peerjsp"}];
  const tu=q.get("turn")||st.turnUrl;
  if(tu)ice.unshift({urls:String(tu).split(/[\s,]+/).filter(Boolean),username:q.get("turnuser")||st.turnUser||"",credential:q.get("turncred")||st.turnCred||""});
  o.config={iceServers:ice};if(q.get("relay")==="1"||st.relayOnly)o.config.iceTransportPolicy="relay";
  return o;}

/* ================= CONNECTION LIFECYCLE ================= */
function netReset(){clearTimeout(NET.retryT);NET.retryT=null;
  try{if(NET.conn)NET.conn.close();}catch(e){}try{if(NET.peer)NET.peer.destroy();}catch(e){}
  Object.assign(NET,{role:null,peer:null,conn:null,code:null,connected:false,guestToken:null,leaving:false,opp:null,inDuel:false,duelView:false,
    prompt:null,rDiscard:null,guestPromptId:null,lastSnap:null,opt:null,snapBase:null,link:null,needFull:false,startInfo:null,rematch:{me:false,opp:false}});
  NET.pend.forEach(r=>r({ok:false,err:"left"}));NET.pend.clear();netDc(null);netWait(null);}
function netHasPeer(){return typeof Peer==="function";}
function netCreateRoom(code,_tries){if(!netHasPeer()){netStatus("PeerJS library missing - online play unavailable.",true);return;}
  const fixed=!!code;netReset();NET.role="host";NET.code=netCleanCode(code)||netGenCode();NET.view="hosting";netRenderOnline();
  netStatus('<span class="onspin"></span>Opening room on the PeerJS server...');
  const p=new Peer(NET_CFG.prefix+NET.code,netPeerOpts());NET.peer=p;
  p.on("open",()=>{if(NET.peer!==p)return;netStatus('<span class="onspin"></span>Waiting for your opponent to join...');netRenderOnline();});
  p.on("connection",c=>netHostIncoming(c));
  p.on("disconnected",()=>{if(NET.peer===p&&!p.destroyed&&!NET.leaving)setTimeout(()=>{try{if(NET.peer===p&&!p.destroyed&&p.disconnected)p.reconnect();}catch(e){}},1500);});
  p.on("error",e=>{if(NET.peer!==p)return;const t=e&&e.type;
    if(t==="unavailable-id"){if(!fixed&&(_tries||0)<5){netCreateRoom(null,(_tries||0)+1);return;}netStatus("That room code is already in use. Try another code.",true);return;}
    if(t==="peer-unavailable")return;
    if(!NET.inDuel)netStatus("Connection problem ("+netEsc(t||"error")+"). Check your internet and try again.",true);});}
function netHostIncoming(c){
  c.on("open",()=>{const md=c.metadata||{};
    const rej=why=>{try{c.send({t:"reject",why});}catch(e){}setTimeout(()=>{try{c.close();}catch(e){}},400);};
    if(md.v!==NET_VER){rej("Version mismatch: please both reload the latest game page.");return;}
    if(NET.connected&&NET.conn&&NET.conn.open){
      if(md.token&&md.token===NET.guestToken){const old=NET.conn;NET.conn=null;NET.connected=false;try{old.close();}catch(e){}} /* same guest retrying: replace the stale link */
      else{rej("This room already has two duelists.");return;}}
    const rejoin=!!NET.guestToken&&md.token===NET.guestToken;
    if(NET.inDuel&&!rejoin){rej("A duel is in progress in this room.");return;}
    NET.guestToken=String(md.token||"");netAttach(c);
    if(NET.inDuel){NET.stats.reconnects++;netHostResync();netToast("Opponent reconnected!");}
    else{NET.opp=null;netSend({t:"welcome",code:NET.code});NET.me.ready=false;NET.view="pick";netRenderOnline();netSendLobby();}});}
function netAttach(c){NET.conn=c;NET.connected=true;NET.lastRx=Date.now();NET.lastIntent=0;NET.link=null;netDc(null);
  c.on("data",d=>{if(NET.conn!==c)return;NET.lastRx=Date.now();try{netOnMsg(d);}catch(e){console.error(e);}});
  c.on("close",()=>{if(NET.conn===c)netLost("closed");});
  c.on("error",()=>{if(NET.conn===c)netLost("error");});
  netStartTick();netHud();}
function netJoinRoom(code){if(!netHasPeer()){netStatus("PeerJS library missing - online play unavailable.",true);return;}
  code=netCleanCode(code);if(code.length!==6){netStatus("Room codes have 6 characters.",true);return;}
  netReset();NET.role="guest";NET.code=code;NET.view="joining";NET.joinTries=0;
  let tok=null;try{tok=sessionStorage.getItem("adc_net_tok_"+code);}catch(e){}
  if(!tok){tok=netRand32().toString(36)+netRand32().toString(36);try{sessionStorage.setItem("adc_net_tok_"+code,tok);}catch(e){}}
  NET.token=tok;netRenderOnline();netStatus('<span class="onspin"></span>Connecting to room '+code+'...');netGuestAttempt();}
function netGuestAttempt(){clearTimeout(NET.retryT);if(NET.role!=="guest"||NET.connected||NET.leaving)return;
  try{if(NET.peer)NET.peer.destroy();}catch(e){}
  const p=new Peer(netPeerOpts());NET.peer=p;let done=false;
  const fail=why=>{if(done||NET.peer!==p)return;done=true;try{p.destroy();}catch(e){}netGuestFailed(why);};
  const to=setTimeout(()=>fail("timeout"),15000);
  p.on("open",()=>{if(NET.peer!==p)return;
    const c=p.connect(NET_CFG.prefix+NET.code,{reliable:true,serialization:"json",metadata:{v:NET_VER,token:NET.token}});
    c.on("open",()=>{if(done||NET.peer!==p)return;done=true;clearTimeout(to);netAttach(c);
      netSend({t:"hello",name:netName(NET.me.name||playerName())});});
    c.on("error",()=>fail("conn-error"));});
  p.on("error",e=>{const t=e&&e.type;clearTimeout(to);fail(t==="peer-unavailable"?"notfound":t||"error");});}
function netGuestFailed(why){if(NET.role!=="guest")return;
  if(NET.inDuel){NET.retryT=setTimeout(netGuestAttempt,2500);return;}
  NET.joinTries=(NET.joinTries||0)+1;
  if(why!=="notfound"&&NET.joinTries<3&&!NET.leaving){netStatus('<span class="onspin"></span>Still connecting to room '+NET.code+' (retry '+NET.joinTries+')...');NET.retryT=setTimeout(netGuestAttempt,1500);return;}
  NET.view="home";netRenderOnline();
  netStatus(why==="notfound"?"Room "+NET.code+" was not found. Check the code (the host must keep the room open).":why==="timeout"?"Could not reach the room (timeout). The connection may be blocked - see HOW_TO_PLAY_ONLINE.txt (TURN relay).":"Connection failed ("+netEsc(why)+").",true);
  try{if(NET.peer)NET.peer.destroy();}catch(e){}NET.role=null;}
function netLost(why){if(!NET.connected)return;NET.connected=false;NET.lostAt=Date.now();
  const c=NET.conn;NET.conn=null;try{c&&c.close();}catch(e){}
  NET.pend.forEach(r=>r({ok:false,err:"disconnected"}));NET.pend.clear();
  if(NET.role==="guest"&&NET.guestChoiceId!=null)try{netGuestChoiceClose(true);}catch(e){} /* v9i: no chooser stays open on disconnect */
  if(NET.leaving)return;
  if(NET.role==="host"){
    if(NET.inDuel&&G&&G.net&&!G.over){netDc(NET_CFG.reconnectSec);netToast("Opponent disconnected");}
    else if(NET.inDuel){netToast("Opponent left the room");}
    else{NET.opp=null;NET.me.ready=false;NET.view="hosting";netRenderOnline();netStatus('<span class="onspin"></span>Opponent left. Waiting for someone to join...');}}
  else if(NET.role==="guest"){
    if(NET.inDuel&&G&&G.guest&&!G.over){netDc(NET_CFG.reconnectSec);NET.retryT=setTimeout(netGuestAttempt,1500);}
    else if(NET.inDuel){netToast("Host left the room");}
    else{NET.view="home";netRenderOnline();netStatus("Disconnected from the room.",true);NET.role=null;}}
  netHud();}
function netLeaveRoom(toMenu){NET.leaving=true;netSend({t:"bye"});
  const wasDuel=NET.inDuel;setTimeout(()=>{netEndDuelChrome();netReset();if(wasDuel)leaveDuel();if(toMenu!==false)showScreen("menu");},150);}
function netStartTick(){if(NET.tick)return;NET.tick=setInterval(()=>{try{NET.role==="host"?netHostTick():NET.role==="guest"?netGuestTick():0;}catch(e){console.error(e);}},1000);}

/* ================= MESSAGES ================= */
function netOnMsg(m){if(!m||typeof m!=="object")return;
  switch(m.t){
    case "ping":return;
    case "bye":netOppBye();return;
    case "emote":netShowEmote("enemy",m.k|0);NET.stats.emotesRx++;return;
    case "reject":NET.leaving=true;netReset();NET.view="home";netRenderOnline();netStatus(netEsc(m.why||"Rejected by host."),true);return;}
  if(NET.role==="host")netHostMsg(m);else netGuestMsg(m);}
function netOppBye(){NET.leaving=false;
  if(NET.inDuel&&G&&!G.over){
    if(NET.role==="host"){netDc(null);gameOver("player","Opponent left the duel");}
    else netGuestForfeitWin("The host left the duel");}
  else netToast("Your opponent left the room.");
  const c=NET.conn;NET.connected=false;NET.conn=null;try{c&&c.close();}catch(e){}
  if(NET.role==="host"&&!NET.inDuel){NET.opp=null;NET.view="hosting";netRenderOnline();}
  if(NET.role==="guest"&&!NET.inDuel){NET.view="home";netRenderOnline();netStatus("The host closed the room.",true);NET.role=null;}
  netHud();}
function netHostMsg(m){
  switch(m.t){
    case "hello": /* sent by the guest once its side of the channel is open: (re)send what it may have missed */
      if(NET.inDuel&&NET.opp&&NET.opp.ch){NET.opp.name=netName(m.name)||NET.opp.name;netHostResync();return;} /* rejoin: keep the duel's pick for rematches */
      NET.opp=Object.assign(NET.opp||{},{name:netName(m.name),ch:null,deck:"default",ready:false});netSend({t:"welcome",code:NET.code});netSendLobby();netRenderOnline();return;
    case "pick":{const ch=CHARS[m.ch]?m.ch:null;NET.opp={name:netName(m.name),ch,deck:["default","custom","list"].includes(m.deck)?m.deck:"default",ready:!!m.ready&&!!ch,list:m.list&&typeof m.list==="object"?m.list:null};
      netRenderOnline();netMaybeStart();return;}
    case "intent":netOnIntent(m);return;
    case "resp":{const p=NET.prompt;if(p&&m.id===p.id){NET.prompt=null;netWait(null);NET.stats.resps++;let c=null;if(m.c)c=p.opts.find(x=>x.uid===m.c)||null;if(m.pass&&!c&&G)G.passTurn=G.turn;p.res(c);}return;}
    case "rematch":NET.rematch.opp=true;netRematchStatus();netMaybeRematch();return;
    case "repick":netGoRepick(false);return;
    case "needfull":if(netHostLive()){NET.lastSnapStr="";NET.snapBase=null;netFlush(true);}return;}}
function netGuestMsg(m){
  switch(m.t){
    case "welcome":if(NET.view==="pick"&&!NET.inDuel){netSendPick();return;}NET.view="pick";NET.me.ready=false;netRenderOnline();netSendPick();return;
    case "lobby":NET.opp={name:netName(m.host&&m.host.name),ch:m.host&&CHARS[m.host.ch]?m.host.ch:null,deck:m.host&&m.host.deck||"default",ready:!!(m.host&&m.host.ready)};
      NET.cfg={arena:m.cfg&&(m.cfg.arena==="home"||m.cfg.arena==="random"||ARENAS[m.cfg.arena])?m.cfg.arena:"home",turn:m.cfg?m.cfg.turn|0:0};
      if(NET.view==="pick")netRenderOnline();return;
    case "start":netGuestStart(m);return;
    case "resync":netGuestResync(m);return;
    case "snap":netApplySnap(m);return;
    case "log":{const e={msg:netEsc(m.m),cls:m.c==="p"?"e":m.c==="e"?"p":m.c==="s"?"s":""};NET.glog.unshift(e);if(NET.glog.length>60)NET.glog.pop();if(NET.duelView&&G&&G.guest)renderLog();return;}
    case "fx":netGuestFx(m);return;
    case "done":{const r=NET.pend.get(m.id);if(r){NET.pend.delete(m.id);if(!m.ok){NET.stats.rejects++;NET.stats.rejectMsgs.push(String(m.err||"").slice(0,60));if(!NET.botGuest&&m.err)netToast("Not allowed: "+m.err);}
        if(NET.opt&&NET.opt.id===m.id){NET.opt=null;if(!m.ok&&G&&G.guest&&NET.lastSnap)netBuildG(NET.lastSnap);} /* rejected: undo the local prediction */
        if(G&&G.guest&&NET.lastSnap){G.busy=!!NET.lastSnap.g.busy||NET.pend.size>0;netRenderSoon();}r(m);netBotCheck();}return;}
    case "prompt":netGuestPrompt(m);return;
    case "promptEnd":if(NET.guestPromptId===m.id){NET.guestPromptId=null;$("#modalLayer").innerHTML="";}return;
    case "wait":netWait(m.on?String(m.x||"Waiting for opponent..."):null,m.sec);return;
    case "tick":NET.lastTick=m;netHud();return;
    case "over":netGuestOver(m);return;
    case "rematch":NET.rematch.opp=true;netRematchStatus();return;
    case "repick":netGoRepick(false);return;
    case "toast":netToast(String(m.x||"").slice(0,80));return;}}

/* ================= LOBBY (pick duelist / deck / name) ================= */
function netMyDeck(){const me=NET.me;if(me.deck==="list"&&me.list&&validDeck(me.ch,me.list))return me.list;if(me.deck==="custom"){const d=savedDeck(me.ch);if(d)return d;}return defaultDeck(me.ch);}
function netSendLobby(){if(NET.role!=="host")return;netSend({t:"lobby",host:{name:netName(NET.me.name),ch:NET.me.ch,deck:NET.me.deck,ready:NET.me.ready},cfg:NET.cfg});}
function netSendPick(){if(NET.role!=="guest")return;const me=NET.me;netSend({t:"pick",name:netName(me.name),ch:me.ch,deck:me.deck,ready:me.ready,list:me.ready?netMyDeck():null});}
function netPickChanged(){if(NET.role==="host"){netSendLobby();netMaybeStart();}else netSendPick();}
function netMaybeStart(){if(NET.role!=="host"||NET.inDuel)return;if(!(NET.me.ready&&NET.opp&&NET.opp.ready&&NET.connected))return;
  clearTimeout(NET.startT);NET.startT=setTimeout(()=>{if(!NET.inDuel&&NET.me.ready&&NET.opp&&NET.opp.ready&&NET.connected)netHostStartDuel();},700);}
function netGoRepick(send){if(send)netSend({t:"repick"});if(NET.role==="host"&&G&&G.net&&!G.over)return;
  netEndDuelChrome();NET.inDuel=false;NET.duelView=false;leaveDuel();NET.me.ready=false;if(NET.opp)NET.opp.ready=false;NET.rematch={me:false,opp:false};
  NET.view="pick";showScreen("online");netRenderOnline();netPickChanged();}

/* ================= DUEL START ================= */
function netHostStartDuel(){
  const H=NET.me,O=NET.opp;if(!O||!CHARS[H.ch]||!CHARS[O.ch])return;
  const hDeck=netMyDeck();const gDeck=(O.deck!=="default"&&O.list&&validDeck(O.ch,O.list))?O.list:defaultDeck(O.ch);
  let arena=NET.cfg.arena;const keys=Object.keys(ARENAS);
  if(arena==="home"){const homes=[CHARS[H.ch].home,CHARS[O.ch].home].filter(a=>a&&ARENAS[a]);arena=homes.length?homes[netRandInt(homes.length)]:"random";}
  if(!ARENAS[arena])arena=keys[netRandInt(keys.length)];
  const first=netRandInt(2)?"player":"enemy";
  const hn=netName(H.name);let gn=netName(O.name);if(gn.toLowerCase()===hn.toLowerCase())gn=gn.slice(0,13)+" 2";
  NET.duelNo++;NET.inDuel=true;NET.rematch={me:false,opp:false};NET.hlog=[];NET.prompt=null;NET.rDiscard=null;NET.tt={turn:-1,left:0};
  NET.match={hch:H.ch,gch:O.ch,hDeck,gDeck,arena,first,hn,gn};
  NET.startInfo={t:"start",n:NET.duelNo,me:{ch:O.ch,name:gn},opp:{ch:H.ch,name:hn},arena,first:netMir(first),turn:NET.cfg.turn};
  netSend(NET.startInfo);
  const n=NET.duelNo;
  netVersus(H.ch,hn,O.ch,gn,arena,()=>{if(n!==NET.duelNo||NET.role!=="host")return;netHostBeginDuel();});}
function netHostBeginDuel(){const M=NET.match;
  if(!NET.origRandom)NET.origRandom=Math.random;NET.seed=netRand32();Math.random=netRng(NET.seed);
  NET.uids=new Set();NET.lastSnapStr="";NET.snapBase=null;NET.starting=true;
  try{startDuel(M.hch,M.gch,{decks:{player:M.hDeck,enemy:M.gDeck},arena:M.arena,first:M.first,names:{player:M.hn,enemy:M.gn},net:true,speed:NET.speed});}
  finally{NET.starting=false;}
  netDuelChrome(true);netHud();
  if(NET.botHost)netHostBotKick();}
function netVersus(lch,lname,rch,rname,arena,cb){leaveDuel();const P=CHARS[lch],E=CHARS[rch],A=ARENAS[arena]||ARENAS[Object.keys(ARENAS)[0]];const v=$("#versus");
  v.innerHTML=`<div class="vbg" style="background-image:url(${FIELD_IMG[A.img]})"></div><div class="varena"><small>ONLINE DUEL</small>✦ ${netEsc(A.name.toUpperCase())} ✦</div><div class="half left" style="--c1:${P.color}"><img src="${PORTRAITS[P.img]}" alt=""></div><div class="half right" style="--c2:${E.color}"><img src="${PORTRAITS[E.img]}" alt=""></div>
    <div class="vs">VS</div><div class="vname vl" style="color:${P.color}">${netEsc(lname.toUpperCase())}<small>${netEsc(lch==="you"?"Custom Deck":P.name+" · "+(P.race||"")+" Deck")}</small></div>
    <div class="vname vr" style="color:${E.color}">${netEsc(rname.toUpperCase())}<small>${netEsc(rch==="you"?"Custom Deck":E.name+" · "+(E.race||"")+" Deck")}</small></div><div class="flash"></div>`;
  showScreen("versus",true);
  anim(v.querySelector(".left"),[{transform:"translateX(-100%)"},{transform:"none"}],600,{easing:"cubic-bezier(.2,.9,.3,1.2)"});
  anim(v.querySelector(".right"),[{transform:"translateX(100%)"},{transform:"none"}],600,{easing:"cubic-bezier(.2,.9,.3,1.2)"});
  setTimeout(()=>{const f=v.querySelector(".flash");if(f)anim(f,[{opacity:.9},{opacity:0}],400);},600);
  clearTimeout(NET.vsT);if(cb)NET.vsT=setTimeout(cb,Math.max(400,2800*Math.min(1,NET.speed)));}
function netDuelChrome(on){const d=$("#duel");if(!d)return;d.classList.toggle("net",!!on);if(on)netRenderCache();
  if(on){if(!$("#netHud")){const host=document.querySelector("#left > div:nth-child(2)");if(host){const h=document.createElement("div");h.id="netHud";
      h.innerHTML=`<div class="nh-timer" id="nh-timer">-</div><div class="nh-emotes">${NET_CFG.emotes.map((e,i)=>`<button class="btn" data-emote="${i}">${netEsc(e)}</button>`).join("")}</div>
        <div class="nh-row"><button class="btn red" id="nh-surr">Surrender</button></div><div class="nh-conn" id="nh-conn"></div>`;
      host.appendChild(h);
      h.querySelectorAll("[data-emote]").forEach(b=>b.onclick=e=>{e.stopPropagation();netEmote(+b.dataset.emote);});
      $("#nh-surr").onclick=e=>{e.stopPropagation();netConfirmSurrender();};}}
    const q=$("#btn-quit");if(q&&!NET.quitOrig){NET.quitOrig=q.onclick;q.onclick=()=>netConfirmLeave();}}
  else{const q=$("#btn-quit");if(q&&NET.quitOrig){q.onclick=NET.quitOrig;NET.quitOrig=null;}}}
function netEndDuelChrome(){netDuelChrome(false);netWait(null);netDc(null);if(NET.origRandom){Math.random=NET.origRandom;NET.origRandom=null;}}
function netConfirmSurrender(){if(!G||G.over)return;
  $("#modalLayer").innerHTML=`<div class="modal-bg"><div class="modal" style="width:420px;text-align:center"><h2>Surrender?</h2><p>Your opponent wins the duel.</p>
   <div class="btnrow"><button class="btn red" id="ns-yes">Surrender</button><button class="btn" id="ns-no">Keep Dueling</button></div></div></div>`;
  $("#ns-yes").onclick=()=>{$("#modalLayer").innerHTML="";netSurrender();};$("#ns-no").onclick=()=>{$("#modalLayer").innerHTML="";};}
function netSurrender(){if(!G||G.over)return;if(NET.role==="host")gameOver("enemy",S("player").name+" surrendered");else netIntent("surrender",{});}
function netConfirmLeave(){
  $("#modalLayer").innerHTML=`<div class="modal-bg"><div class="modal" style="width:440px;text-align:center"><h2>Leave the online duel?</h2><p>${G&&!G.over?"Leaving now counts as a surrender.":"You will leave the room."}</p>
   <div class="btnrow"><button class="btn red" id="nl-yes">Leave Room</button><button class="btn" id="nl-no">Stay</button></div></div></div>`;
  $("#nl-yes").onclick=()=>{$("#modalLayer").innerHTML="";if(G&&!G.over&&NET.role==="host")gameOver("enemy",S("player").name+" left the duel");netLeaveRoom();};
  $("#nl-no").onclick=()=>{$("#modalLayer").innerHTML="";};}

/* ================= RENDER COST (online duels) ================= */
const NET_BLOB={};
function netBlobUrl(key,data){let u=NET_BLOB[key];if(u)return u;
  try{const i=data.indexOf(","),mime=data.slice(5,data.indexOf(";"));const bin=atob(data.slice(i+1));const a=new Uint8Array(bin.length);
    for(let k=0;k<bin.length;k++)a[k]=bin.charCodeAt(k);u=URL.createObjectURL(new Blob([a],{type:mime}));}catch(e){u=data;}
  NET_BLOB[key]=u;return u;}
/* render() rewrites every board container on each call (host: each engine step, guest: each snapshot). During an online
   duel an unchanged container is not rewritten, so its cards are not re-parsed / re-laid-out and running animations survive.
   A container is only skipped when its new HTML equals what was last written AND nothing touched its DOM since then
   (MutationObserver records, read synchronously). Outside online duels (G.net false) every write goes through. */
function netRenderCache(){if(NET.rcache)return;NET.rcache=true;
  const desc=Object.getOwnPropertyDescriptor(Element.prototype,"innerHTML");if(!desc||!desc.set||typeof MutationObserver!=="function")return;
  for(const id of ["ehand","phand","p-m","e-m","p-st","e-st","p-deck","e-deck","p-gy","e-gy","phasebar","log"]){const el=document.getElementById(id);if(!el)continue;
    let last=null;const mo=new MutationObserver(()=>{});mo.observe(el,{childList:true,subtree:true,attributes:true,characterData:true});
    Object.defineProperty(el,"innerHTML",{configurable:true,get(){return desc.get.call(this);},
      set(v){const s=String(v);const touched=mo.takeRecords().length>0;
        if(G&&G.net&&!touched&&s===last){NET.stats.rskip=(NET.stats.rskip||0)+1;return;}
        desc.set.call(this,s);mo.takeRecords();last=s;NET.stats.rset=(NET.stats.rset||0)+1;}});}}

/* ================= HOST: snapshots, hashes, FX streaming ================= */
function netCardOut(c,vis){if(!c)return null;
  if(!vis)return {u:c.uid,h:1,p:c.pos,o:c.owner,se:c.setTurn};
  const base=CARDS[c.id]||{};const o={u:c.uid,i:c.id};
  for(const k in c){if(k==="uid"||k==="id")continue;const v=c[k];if(v!==null&&typeof v==="object")continue;if(typeof v==="function")continue;if(base[k]!==v)o[k]=v;}
  return o;}
function netSnapBody(){
  const side=(k,guest)=>{const s=G.sides[k];return {char:s.char,name:s.name,lp:s.lp,ns:s.normalSummoned?1:0,
    hand:s.hand.map(c=>netCardOut(c,guest)),deck:guest?s.deck.map(c=>c.id).sort():s.deck.length,gy:s.gy.map(c=>netCardOut(c,true)),
    mon:s.monsters.map(c=>c?netCardOut(c,guest||c.faceUp):null),st:s.st.map(c=>c?netCardOut(c,guest||c.faceUp):null)};};
  return {g:{turn:G.turn,cur:netMir(G.current),phase:G.phase,over:G.over?1:0,busy:G.busy?1:0,win:netMir(G.winner),be:G.battleEnded?1:0,arena:G.arena,match:[G.match[1],G.match[0]],n:NET.duelNo},
    P:side("enemy",true),E:side("player",false),gd:NET.rDiscard?1:0};}
/* delta snapshots: after one full snapshot, only the parts that changed (g, gd, and per side char/name/lp/ns/hand/deck/gy/mon/st)
   are sent. The guest merges them onto its last snapshot (reliable, ordered channel; sequence-checked; a gap -> "needfull").
   Redaction is unchanged: every part is cut from the same redacted netSnapBody(). */
const NET_SNAPK=["char","name","lp","ns","hand","deck","gy","mon","st"];
function netFlush(force){if(!netHostLive()){NET.dirty=false;return;}if(!NET.dirty&&!force)return;NET.dirty=false;
  const b=netSnapBody();const s=JSON.stringify(b);if(s===NET.lastSnapStr&&!force)return;NET.lastSnapStr=s;
  const prev=NET.snapBase,cur={g:JSON.stringify(b.g),gd:b.gd,P:{},E:{}};
  for(const sk of ["P","E"])for(const k of NET_SNAPK)cur[sk][k]=JSON.stringify(b[sk][k]);
  let m=b;
  if(!force&&prev){m={d:1,n:b.g.n};if(cur.g!==prev.g)m.g=b.g;if(cur.gd!==prev.gd)m.gd=b.gd;
    for(const sk of ["P","E"]){let o=null;for(const k of NET_SNAPK)if(cur[sk][k]!==prev[sk][k])(o||(o={}))[k]=b[sk][k];if(o)m[sk]=o;}}
  m.t="snap";m.q=++NET.seq;m.ai=NET.lastIntent|0;m.h=netHash("player");
  if(netSend(m)){NET.stats.snaps++;NET.snapBase=cur;}else NET.snapBase=null;}
/* public-state hash: identical on both screens when in sync (hidden info excluded) */
function netHash(hk){if(!G||!G.sides)return "";const gk=netMir(hk);
  const cs=c=>!c?"-":c.faceUp?c.id+"/"+c.pos+"/"+atkOf(c)+"/"+(c.guardUsed?1:0)+"/"+(c.equippedTo||0):"X/"+c.pos;
  const sd=k=>{const s=G.sides[k];return [s.lp,s.hand.length,s.deck.length,s.normalSummoned?1:0,s.gy.map(c=>c.id).join(","),s.monsters.map(cs).join("|"),s.st.map(c=>!c?"-":c.faceUp?c.id+"/"+(c.equippedTo||0):"X").join("|")].join(";");};
  const str=[G.turn,G.phase,G.current===hk?"H":G.current===gk?"G":"-",G.over?1:0,sd(hk),sd(gk),G.sides[gk].hand.map(c=>c.id).sort().join(",")].join("#");
  let h=0x811c9dc5;for(let i=0;i<str.length;i++){h^=str.charCodeAt(i);h=Math.imul(h,16777619);}return (h>>>0).toString(16);}
function netFx(k,o){if(!netHostLive()||NET.sup>0)return;netFlush();o.t="fx";o.k=k;netSend(o);}
async function netHold(fn){NET.sup++;try{return await fn();}finally{NET.sup--;}}
function netRef(el){if(!el||!el.getAttribute)return null;const u=el.getAttribute("data-uid");if(u&&el.closest&&el.closest("#duel"))return {u:+u};if(el.id)return {i:el.id};return null;}
const NET_MIRID={"duel-player":"duel-enemy","duel-enemy":"duel-player","port-player":"port-enemy","port-enemy":"port-player","p-m":"e-m","e-m":"p-m","p-st":"e-st","e-st":"p-st","phand":"ehand","ehand":"phand","p-gy":"e-gy","e-gy":"p-gy","p-deck":"e-deck","e-deck":"p-deck"};
function netEl(r){if(!r)return null;if(r.u!=null)return elOf(+r.u);if(r.i){const id=NET_MIRID[r.i]||r.i;const e=document.getElementById(id);return e&&e.closest("#app")?e:null;}return null;}
/* guest-facing battle log: rewrite host-perspective text and hide private card names */
function netLogFor(msg){if(!G||!G.sides)return {host:msg,guest:msg};const H=S("player").name,E=S("enemy").name;let host=msg,guest=msg;
  if(msg.startsWith("You draw "))guest=H+" draws a card.";
  else if(msg===E+" draws a card."){const c=S("enemy").hand[S("enemy").hand.length-1];if(c)guest="You draw "+c.name+".";}
  else if(msg==="You enter the Battle Phase.")guest=H+" enters the Battle Phase.";
  if(msg.startsWith(H+" adds ")&&msg.endsWith(" to their hand.")&&msg!==H+" adds a card to their hand.")guest=H+" adds a card to their hand.";
  if(msg.startsWith(E+" adds ")&&msg.endsWith(" to their hand."))host=E+" adds a card to their hand.";
  return {host,guest};}

/* ================= HOST: guest intents ================= */
function netSpellTargets(s,c){const f=c.fx,o=other(s);
  if(f.k==="destroy1")return mons(o).map(m=>m.uid);if(f.k==="destroyST1")return sts(o).map(m=>m.uid);
  if(f.k==="boost"||f.k==="equip")return mons(s).filter(m=>m.faceUp&&(!f.race||m.race===f.race)).map(m=>m.uid);return null;}
function netValidate(m){const s="enemy",o="player",sd=S(s);const num=x=>typeof x==="number"&&isFinite(x);
  const inHand=uid=>sd.hand.find(c=>c.uid===uid);const pref=p=>num(p)&&p>=0&&p<5?p:null;
  switch(m.a){
    case "summon":{if(!inMain())return "not in a Main Phase";const c=inHand(m.uid);if(!c||c.type!=="monster")return "no such monster in hand";
      if(!canNormalSummon(s,c))return "cannot Normal Summon now";const need=tributesNeeded(c);const tr=Array.isArray(m.tr)?[...new Set(m.tr.filter(num))]:[];
      if(tr.length!==need)return "wrong number of tributes";for(const t of tr){const f=find(t);if(!f||f.side!==s||f.zone!=="monsters")return "invalid tribute";}
      m.tr=tr;m.set=!!m.set;m.pref=pref(m.pref);return null;}
    case "set":{if(!inMain())return "not in a Main Phase";const c=inHand(m.uid);if(!c||c.type==="monster")return "no such card in hand";if(freeIdx(sd.st)<0)return "no free Spell & Trap Zone";m.pref=pref(m.pref);return null;}
    case "spell":{const f=find(m.uid);if(!f||f.side!==s||(f.zone!=="hand"&&f.zone!=="st"))return "no such spell";const c=f.card;if(c.type!=="spell")return "not a spell";
      if(!(inMain()||(G.phase==="battle"&&isQuick(c))))return "wrong phase";if(!spellCanActivate(s,c))return "cannot activate now";
      if(!num(m.tgt)||!m.tgt)m.tgt=null;
      const tg=netSpellTargets(s,c);if(tg&&!isQuick(c)){if(!tg.includes(m.tgt))return "invalid target";}else if(!isQuick(c))m.tgt=null;
      m.pref=pref(m.pref);return null;}
    case "pos":{if(!inMain())return "not in a Main Phase";const f=find(m.uid);if(!f||f.side!==s||f.zone!=="monsters")return "no such monster";
      if(f.card.summonedTurn===G.turn||f.card.posChangedTurn===G.turn)return "cannot change position this turn";return null;}
    case "attack":{const f=find(m.uid);if(!f||f.side!==s||f.zone!=="monsters")return "no such monster";if(!canAttackWith(s,f.card))return "that monster cannot attack";
      if(m.tgt){const t=find(m.tgt);if(!t||t.side!==o||t.zone!=="monsters")return "invalid attack target";}else{m.tgt=null;if(!canGoDirect(s,f.card))return "cannot attack directly";}return null;}
    case "phase":if(m.p==="battle")return G.phase==="main1"&&G.turn>1?null:"cannot enter the Battle Phase";
      if(m.p==="main2")return G.phase==="battle"?null:"not in the Battle Phase";
      if(m.p==="end")return inMain()||G.phase==="battle"?null:"cannot end the turn now";return "unknown phase";}
  return "unknown action";}
async function netOnIntent(m){NET.stats.intents++;if(typeof m.id==="number"&&m.id>(NET.lastIntent|0))NET.lastIntent=m.id;
  const reply=(ok,err)=>{netFlush();netSend({t:"done",id:m.id,ok:!!ok,err:err||null});};
  if(!G||!G.net||G.over){reply(false,"no duel running");return;}
  if(m.a==="surrender"){reply(true);gameOver("player",S("enemy").name+" surrendered");return;}
  if(m.a==="discard"){if(!NET.rDiscard){reply(false,"no discard pending");return;}const c=S("enemy").hand.find(x=>x.uid===m.uid);if(!c){reply(false,"no such card");return;}
    discard("enemy",c.uid);render();if(S("enemy").hand.length<=HAND_LIMIT)netFinishDiscard();reply(true);return;}
  if(G.current!=="enemy"||G.busy||NET.rDiscard){NET.stats.rejects++;reply(false,G.current!=="enemy"?"not your turn":"please wait");return;}
  const err=netValidate(m);if(err){NET.stats.rejects++;NET.stats.rejectMsgs.push(m.a+": "+err);reply(false,err);return;}
  if(m.a==="phase"){G.ui={mode:null};
    if(m.p==="battle"){G.phase="battle";log(S("enemy").name+" enters the Battle Phase.","e");render();}
    else if(m.p==="main2"){G.phase="main2";render();}
    else{G.busy=true;render();if(G.humanEnd)G.humanEnd();}
    reply(true);return;}
  G.busy=true;render();
  try{const s="enemy";
    switch(m.a){case "summon":await normalSummon(s,m.uid,m.tr,m.set,m.pref);break;case "set":await setTrap(s,m.uid,m.pref);break;
      case "spell":await activateSpell(s,m.uid,m.tgt,null,m.pref);break;case "pos":await changePosition(s,m.uid);break;case "attack":await attack(s,m.uid,m.tgt);break;}}
  catch(e){if(e!==ABORT)console.error(e);}
  finally{if(G&&G.net&&!G.over&&G.current==="enemy")G.busy=false;if(G)render();reply(true);}}
/* remote Quick-Play / trap prompt: the guest decides on its own screen */
function netRemotePrompt(kind,ctx,traps,quicks){return new Promise(res=>{const id=++NET.pid;const sec=NET_CFG.respSec;
  const msg={t:"prompt",id,kind,att:ctx.att?ctx.att.uid:0,tgt:ctx.tgt?ctx.tgt.uid:0,sum:ctx.summoned?ctx.summoned.uid:0,sp:ctx.spell?ctx.spell.uid:0,traps:traps.map(c=>c.uid),quicks:quicks.map(c=>c.uid),sec};
  NET.prompt={id,res,opts:[...traps,...quicks],msg,deadline:Date.now()+(sec+5)*1000};
  netFlush(true);netSend(msg);netWait("Waiting for opponent's response...",sec);});}
async function netRemoteDiscard(){if(S("enemy").hand.length<=HAND_LIMIT)return;
  await new Promise(res=>{NET.rDiscard={res,deadline:Date.now()+NET_CFG.discardSec*1000};render();netFlush(true);
    netWait("Opponent is discarding down to "+HAND_LIMIT+" cards...",NET_CFG.discardSec);});
  netWait(null);}
function netAutoDiscard(){while(S("enemy").hand.length>HAND_LIMIT)discard("enemy",aiDiscardPick("enemy").uid);netFinishDiscard();}
function netFinishDiscard(){const r=NET.rDiscard;if(!r)return;NET.rDiscard=null;render();netWait(null);r.res();}
function netHostResync(){NET.stats.resyncs++;
  netSend({t:"resync",start:NET.startInfo,log:NET.hlog,over:G&&G.over?{w:G.winner,r:NET.overReason||""}:null});
  NET.lastSnapStr="";NET.snapBase=null;netFlush(true);
  if(NET.prompt){const p=NET.prompt;const left=Math.max(3,Math.round((p.deadline-Date.now())/1000)-5);p.deadline=Date.now()+(left+5)*1000;netSend(Object.assign({},p.msg,{sec:left}));}
  if(NET.rDiscard)NET.rDiscard.deadline=Math.max(NET.rDiscard.deadline,Date.now()+10000);}
function netHostTick(){const now=Date.now();
  if(NET.connected){if(now-(NET.lastTx||0)>=1900)netSend({t:"ping"});netLinkStats();if(now-NET.lastRx>NET_CFG.lostMs)netLost("timeout");}
  if(!netHostLive()){netHud();return;}
  if(G.over){netHud();return;}
  if(!NET.connected){const left=NET_CFG.reconnectSec-(now-NET.lostAt)/1000;netDc(left);
    if(left<=0){netDc(null);gameOver("player","Opponent disconnected (forfeit)");}
    if(NET.prompt&&now>NET.prompt.deadline){const p=NET.prompt;NET.prompt=null;netWait(null);p.res(null);}
    if(NET.rDiscard&&now>NET.rDiscard.deadline)netAutoDiscard();
    netHud();return;}
  if(NET.prompt&&now>NET.prompt.deadline){const p=NET.prompt;NET.prompt=null;netWait(null);netSend({t:"promptEnd",id:p.id});p.res(null);}
  if(NET.rDiscard&&now>NET.rDiscard.deadline){netAutoDiscard();netSend({t:"toast",x:"Time's up - cards were discarded automatically."});}
  if(NET.cfg.turn>0){if(NET.tt.turn!==G.turn)NET.tt={turn:G.turn,left:NET.cfg.turn};
    const waiting=(!G.busy||!!NET.rDiscard||G.ui.mode==="discard")&&!NET.prompt;
    if(waiting){NET.tt.left--;if(NET.tt.left<=0)netTurnTimeout();}}
  netSend({t:"tick",ts:netMir(G.current),tl:NET.cfg.turn>0?NET.tt.left:-1});netHud();}
function netTurnTimeout(){const s=G.current;NET.tt.left=15;
  log("Time's up for "+S(s).name+"!","s");
  if(s==="player"){if(G.ui.mode==="discard"){while(S(s).hand.length>HAND_LIMIT)discard(s,aiDiscardPick(s).uid);render();if(G.discardDone)G.discardDone();}
    else if(!G.busy&&G.humanEnd){G.ui={mode:null};closeMenu();$("#modalLayer").innerHTML="";G.busy=true;render();G.humanEnd();}netToast("Time's up!");}
  else{if(NET.rDiscard)netAutoDiscard();else if(!G.busy&&G.humanEnd){G.ui={mode:null};G.busy=true;render();G.humanEnd();}netSend({t:"toast",x:"Time's up!"});}}
function netHostBotKick(){if(!G||!G.net||G.over||!NET.botHost)return;
  if(G.current==="player"&&G.humanEnd&&!G.busy){G.busy=true;const h=G.humanEnd;aiTurn("player").then(()=>h()).catch(e=>{if(e!==ABORT)console.error(e);});}}

/* ================= GUEST: rebuild state, render, intents ================= */
const NET_STRKEYS={pos:v=>v==="atk"||v==="def",owner:v=>v==="player"||v==="enemy"};
function netStub(uid,owner,o){o=o||{};return {uid,id:null,owner,hidden:true,faceUp:false,pos:o.p==="def"?"def":"atk",setTurn:typeof o.se==="number"?o.se:-1,type:"?",kind:"",name:"a face-down card",atk:0,def:0,level:0,fx:{},race:"",attr:"",
  equippedTo:null,guardUsed:false,tempAtk:0,tempTurn:-1,bonus:0,attackCount:0,summonedTurn:-1,posChangedTurn:-1,attackedTurn:-1};}
function netCardIn(o){if(!o)return null;
  if(o.h||!CARDS[o.i])return netStub(+o.u||0,netMir(o.o==="enemy"?"enemy":"player"),o);
  const c=Object.assign({},CARDS[o.i],{uid:+o.u,id:o.i});
  for(const k in o){if(k==="u"||k==="i"||k==="h")continue;const v=o[k];
    if(typeof v==="number"||typeof v==="boolean"||v===null)c[k]=v;else if(typeof v==="string"&&NET_STRKEYS[k]&&NET_STRKEYS[k](v))c[k]=v;}
  c.owner=netMir(c.owner);return c;}
function netSideIn(o,key){const ch=CHARS[o.char]?o.char:"you";
  return {char:ch,name:netName(o.name),lp:+o.lp||0,normalSummoned:!!o.ns,hand:(o.hand||[]).map(netCardIn),
    deck:Array.isArray(o.deck)?o.deck.filter(id=>CARDS[id]).map((id,i)=>Object.assign({},CARDS[id],{uid:-(i+1),id,owner:key,faceUp:false,pos:"atk"})):Array.from({length:+o.deck||0},(_,i)=>netStub(-(i+1),key)),
    gy:(o.gy||[]).map(netCardIn),monsters:[0,1,2,3,4].map(i=>netCardIn((o.mon||[])[i])),st:[0,1,2,3,4].map(i=>netCardIn((o.st||[])[i]))};}
/* delta snapshot -> full snapshot (null when the base is missing or a message was skipped) */
function netMergeSnap(m){const b=NET.lastSnap;if(!b||m.q!==(NET.lastQ|0)+1||(m.n!=null&&b.g.n!==m.n))return null;
  return {t:"snap",q:m.q,h:m.h,ai:m.ai,g:m.g||b.g,gd:m.gd!=null?m.gd:b.gd,P:Object.assign({},b.P,m.P||{}),E:Object.assign({},b.E,m.E||{})};}
function netApplySnap(m){if(NET.role!=="guest"||!m)return;
  if(m.d){const f=netMergeSnap(m);if(!f){if(!NET.needFull){NET.needFull=true;netSend({t:"needfull"});}return;}m=f;}
  if(!m.g)return;NET.needFull=false;
  if(NET.startInfo&&m.g.n!=null&&m.g.n!==NET.startInfo.n)return;
  NET.lastSnap=m;NET.lastQ=m.q|0;NET.stats.snaps++;
  if(!NET.duelView){if(NET.startInfo)netGuestEnterDuel();else return;}
  netBuildG(m);
  if(m.h){const h=netHash("enemy");if(h===m.h){NET.stats.hashOK++;NET.stats.turnsChecked[G.turn]=NET.stats.turnsChecked[G.turn]||"ok";}
    else{NET.stats.hashBad++;NET.stats.turnsChecked[G.turn]="BAD";if(NET.stats.badTurns.length<20)NET.stats.badTurns.push({turn:G.turn,q:m.q});console.warn("[net] state hash mismatch at turn",G.turn);}}
  /* a snapshot the host made before it saw our pending intent: keep showing the local prediction on top */
  if(NET.opt&&(m.ai|0)<NET.opt.id){try{NET.opt.fn();}catch(e){}}
  netRenderSoon();
  netHud();netBotCheck();}
function netBuildG(m){const g=m.g,prev=G&&G.guest?G:null;
  let ui={mode:null};if(prev&&prev.turn===g.turn&&prev.phase===g.phase&&g.cur==="player"&&prev.ui&&prev.ui.mode!=="discard")ui=prev.ui;
  if(m.gd)ui=prev&&prev.ui&&prev.ui.mode==="discard"?prev.ui:{mode:"discard"};
  G={net:true,guest:true,turn:g.turn|0,current:g.cur||null,phase:String(g.phase||"draw"),over:!!g.over,busy:!!g.busy||NET.pend.size>0,auto:false,ui,log:NET.glog,
    battleEnded:!!g.be,winner:g.win||null,match:g.match,arena:ARENAS[g.arena]?g.arena:(prev?prev.arena:Object.keys(ARENAS)[0]),stats:prev?prev.stats:{aces:0,effects:0},
    sides:{player:netSideIn(m.P,"player"),enemy:netSideIn(m.E,"enemy")},passTurn:prev?prev.passTurn:-1};
  if(prev&&prev.arena!==G.arena)setArena(G.arena);}
/* guest render after a snapshot / reply. Kept synchronous so the DOM always matches G when the message handler returns
   (a deferred render let pointer input hit a stale card layout); it is cheap now (blob art + unchanged containers skipped). */
function netRenderSoon(){NET.rq=true;netRenderNow();}
function netRenderNow(){if(!NET.rq)return;NET.rq=false;if(G&&G.guest&&NET.duelView){try{render();}catch(e){console.error(e);}}}
/* optimistic feedback for the guest's own moves: the card goes to its zone at once; the host's snapshot then replaces
   the whole state (it is authoritative), a rejection restores the last snapshot. Tribute summons are not predicted. */
function netPredict(id,a,d){if(!G||!G.guest||G.current!=="player")return;const sd=S("player");const fromHand=uid=>sd.hand.find(c=>c.uid===uid);
  let fn=null;
  if(a==="summon"&&!(d.tr&&d.tr.length)){const c=fromHand(d.uid);if(!c||freeIdx(sd.monsters)<0)return;
    fn=()=>{const sd=S("player");const i=sd.hand.findIndex(x=>x.uid===d.uid);if(i<0||freeIdx(sd.monsters)<0)return;const c=sd.hand.splice(i,1)[0];
      c.faceUp=!d.set;c.pos=d.set?"def":"atk";c.summonedTurn=G.turn;sd.monsters[placeIdx(sd.monsters,d.pref>=0?d.pref:null)]=c;sd.normalSummoned=true;};}
  else if(a==="set"){const c=fromHand(d.uid);if(!c||freeIdx(sd.st)<0)return;
    fn=()=>{const sd=S("player");const i=sd.hand.findIndex(x=>x.uid===d.uid);if(i<0||freeIdx(sd.st)<0)return;const c=sd.hand.splice(i,1)[0];
      c.faceUp=false;c.setTurn=G.turn;sd.st[placeIdx(sd.st,d.pref>=0?d.pref:null)]=c;};}
  else if(a==="spell"){
    fn=()=>{const sd=S("player");const i=sd.hand.findIndex(x=>x.uid===d.uid);
      if(i>=0){if(freeIdx(sd.st)<0)return;const c=sd.hand.splice(i,1)[0];c.faceUp=true;sd.st[placeIdx(sd.st,d.pref>=0?d.pref:null)]=c;}
      else{const c=sd.st.find(x=>x&&x.uid===d.uid);if(c)c.faceUp=true;}};}
  else if(a==="phase"&&(d.p==="battle"&&G.phase==="main1"&&G.turn>1||d.p==="main2"&&G.phase==="battle")){fn=()=>{if(G.current==="player")G.phase=d.p;};}
  else if(a==="pos"){fn=()=>{const c=S("player").monsters.find(x=>x&&x.uid===d.uid);if(!c)return;if(!c.faceUp){c.faceUp=true;c.pos="atk";}else c.pos=c.pos==="atk"?"def":"atk";};}
  if(!fn)return;
  try{fn();NET.opt={id,fn};NET.stats.predicted=(NET.stats.predicted||0)+1;if(NET.rq)NET.rq=false;render();}catch(e){NET.opt=null;console.error(e);}}
function netStartInfoIn(s){return {n:s.n|0,me:{ch:s.me.ch,name:netName(s.me.name)},opp:{ch:s.opp.ch,name:netName(s.opp.name)},arena:ARENAS[s.arena]?s.arena:Object.keys(ARENAS)[0],first:s.first==="player"?"player":"enemy",turn:s.turn|0};}
function netGuestStart(m){if(!m.me||!m.opp||!CHARS[m.me.ch]||!CHARS[m.opp.ch])return;
  NET.startInfo=netStartInfoIn(m);
  NET.duelNo=NET.startInfo.n;NET.inDuel=true;NET.duelView=false;NET.glog=[];NET.lastSnap=null;NET.opt=null;NET.needFull=false;NET.rematch={me:false,opp:false};NET.botTurnDone=-1;NET.lastTick=null;
  netVersus(m.me.ch,NET.startInfo.me.name,m.opp.ch,NET.startInfo.opp.name,NET.startInfo.arena,null);}
function netGuestEnterDuel(){const si=NET.startInfo;if(!si)return;clearTimeout(NET.vsT);
  leaveDuel();G=null;exprReset();V3.clipSeen={};probeVideo();setArena(si.arena);SPEED=NET.speed;
  NET.duelView=true;NET.inDuel=true;
  $("#coin").textContent="Coin toss: "+(si.first==="player"?"you go first":"rival goes first");
  showScreen("duel",true);netDuelChrome(true);
  try{if(typeof AUDIO!=="undefined"&&AUDIO&&AUDIO.music&&AUDIO.trackFor)AUDIO.music(AUDIO.trackFor(si.arena));}catch(e){}
  netHud();}
function netGuestResync(m){NET.stats.resyncs++;netDc(null);
  if(m.start&&m.start.me&&CHARS[m.start.me.ch]&&CHARS[m.start.opp.ch]&&(!NET.startInfo||NET.startInfo.n!==m.start.n||!NET.duelView)){
    NET.startInfo=netStartInfoIn(m.start);NET.duelNo=NET.startInfo.n;
    if(!CHARS[NET.me.ch]||NET.me.ch!==m.start.me.ch){NET.me.ch=m.start.me.ch;NET.me.deck="default";NET.me.list=null;} /* page reloaded: restore our pick */NET.inDuel=true;NET.duelView=false;NET.lastSnap=null;netGuestEnterDuel();}
  NET.glog=(m.log||[]).slice(0,60).map(e=>({msg:netEsc(e.m),cls:e.c==="p"?"e":e.c==="e"?"p":e.c==="s"?"s":""}));
  if(G&&G.guest){G.log=NET.glog;renderLog();}
  NET.botTurnDone=-1;
  if(m.over)NET.pendingOver={w:m.over.w,r:m.over.r,instant:true};
  netToast("Reconnected - duel state restored");}
function netGuestFx(m){NET.stats.fx[m.k]=(NET.stats.fx[m.k]||0)+1;if(!NET.duelView||!G||!G.guest)return;netRenderNow();
  try{switch(m.k){
    case "anim":anim(netEl(m.e),Array.isArray(m.kf)?m.kf:[],+m.d||300,m.o&&typeof m.o==="object"?m.o:undefined);break;
    case "float":floatText(netEl(m.e),String(m.x||"").slice(0,30),String(m.c||"info").replace(/[^a-z]/g,""));break;
    case "impact":impact(netEl(m.e));break;
    case "shake":if(m.s==="#field"||m.s==="#stage")shakeEl(m.s,!!m.b);break;
    case "hurt":{const el=$("#duel-"+netMir(m.s));if(el){el.classList.remove("shake");void el.offsetWidth;el.classList.add("shake");}break;}
    case "lp":tweenLP(netMir(m.s),+m.a||0,+m.b||0);break;
    case "banner":banner(String(m.x||"").slice(0,40),m.c&&/^#[0-9a-f]{3,8}$/i.test(m.c)?m.c:undefined).catch(()=>{});break;
    case "show":{const c=netCardIn(m.c);if(c)Promise.resolve(showcase(c,netMir(m.s),m.v?String(m.v).replace(/[<>&]/g,"").slice(0,30):undefined)).catch(()=>{});break;}
    case "lunge":Promise.resolve(lunge(netEl(m.a),netEl(m.b))).catch(()=>{});break;
    case "speak":netBubble(netMir(m.s),String(m.x||"").slice(0,140));break;
    case "expr":exprSet(netMir(m.s),String(m.x),m.h==null?0:+m.h);break;
    case "talk":exprTalk(netMir(m.s),+m.ms||1000);break;
    case "ace":{const c=netCardIn(m.c);NET.stats.aceSeen++;if(c){Promise.resolve(entrance(c,netMir(m.s))).catch(()=>{});
        setTimeout(()=>{const on=id=>{const e=$(id);return !!e&&e.classList.contains("on");};if(on("#cine")||on("#vclip"))NET.stats.cineSeen++;},Math.max(80,500*SPEED));}break;}
    case "sfx":if(typeof AUDIO!=="undefined"&&AUDIO&&AUDIO.play)AUDIO.play(String(m.n),m.a==null?undefined:m.a);break;}}
  catch(e){if(e!==ABORT)console.error(e);}}
function netBubble(s,t,emote){const box=$("#bubbles");if(!box||!G||!G.sides)return;
  const old=box.querySelector(".bubble."+s+(emote?".emote":":not(.emote)"));if(old)old.remove();
  const d=document.createElement("div");d.className="bubble "+s+(emote?" emote":"");d.style.setProperty("--c",CHARS[S(s).char].color);d.textContent=t;box.appendChild(d);
  anim(d,[{opacity:0,transform:"scale(.6)"},{opacity:1,transform:"scale(1.05)",offset:.15},{opacity:1,transform:"none",offset:.85},{opacity:0}],2600).then(()=>d.remove());}
function netGuestOver(m){if(!G||!G.guest)return;netRenderNow();const w=netMir(m.w),r=netEsc(m.r||"");NET.overReason=r;G.over=true;G.winner=w;cineClose();
  try{if(typeof AUDIO!=="undefined"&&AUDIO&&AUDIO.music)AUDIO.music(null);}catch(e){}
  const n=NET.duelNo;setTimeout(()=>{if(n!==NET.duelNo||!G||!G.guest)return;showGameOver(w,r);},m.instant?50:Math.max(50,1400*SPEED));render();netHud();}
function netGuestForfeitWin(reason){if(!G||!G.guest||G.over)return;clearTimeout(NET.retryT);netDc(null);NET.leaving=true;netGuestOver({w:"enemy",r:reason,instant:true});try{if(typeof AUDIO!=="undefined"&&AUDIO&&AUDIO.play)AUDIO.play("victory");}catch(e){}}
function netIntent(a,data){if(!NET.connected)return Promise.resolve({ok:false,err:"offline"});const id=++NET.iid;NET.stats.intents++;
  return new Promise(res=>{NET.pend.set(id,res);if(G&&G.guest)G.busy=true;netSend(Object.assign({t:"intent",id,a},data||{}));netPredict(id,a,data||{});
    setTimeout(()=>{if(NET.pend.has(id)){NET.pend.delete(id);res({ok:false,err:"timeout"});}},90000);});}
function netGuestPrompt(m){NET.stats.prompts++;netRenderNow();
  const reply=(c,pass)=>{netSend({t:"resp",id:m.id,c:c|0,pass:pass?1:0});};
  if(!G||!G.guest){reply(0);return;}
  const F=u=>{const f=u?find(u):null;return f?f.card:null;};
  const ctx={att:F(m.att),tgt:F(m.tgt),summoned:F(m.sum),spell:F(m.sp)};
  const traps=(m.traps||[]).map(F).filter(Boolean),quicks=(m.quicks||[]).map(F).filter(Boolean);
  if(!traps.length&&!quicks.length){reply(0);return;}
  const kind=["attack","summon","spell"].includes(m.kind)?m.kind:"spell";
  if(NET.botGuest){setTimeout(()=>{let ch=null;try{ch=(traps.length&&ctx.att&&aiTrapChoice("player",ctx.att,ctx.tgt,traps))||(quicks.length&&aiQuickChoice("player",kind,ctx,quicks))||null;}catch(e){console.error(e);}
      if(!ch&&NET.botEager)ch=quicks[0]||traps[0]||null;reply(ch?ch.uid:0);},150);return;}
  let passed=false;NET.guestPromptId=m.id;
  const p=netOrigPrompt("player",kind,ctx,traps,quicks);
  const pb=document.querySelector('#modalLayer [data-resp="-1"]');if(pb)pb.addEventListener("click",()=>{passed=true;});
  const box=$("#respbox");const stop=box?netCountdown(+m.sec||NET_CFG.respSec,box,()=>{const b=document.querySelector('#modalLayer [data-resp="0"]');if(b)b.click();}):null;
  p.then(c=>{if(stop)stop();if(NET.guestPromptId!==m.id)return;NET.guestPromptId=null;reply(c?c.uid:0,passed);});}
function netCountdown(sec,host,onEnd){const end=Date.now()+sec*1000;const d=document.createElement("div");d.className="nettimer";d.innerHTML='<div class="bar"><i></i></div><span></span>';host.appendChild(d);
  const bar=d.querySelector("i"),sp=d.querySelector("span");let fired=false;let t=null;
  const tick=()=>{if(!d.isConnected){clearInterval(t);return;}const left=Math.max(0,end-Date.now());bar.style.width=(left/(sec*1000)*100)+"%";sp.textContent=Math.ceil(left/1000)+"s · auto-pass";
    if(left<=0&&!fired){fired=true;clearInterval(t);onEnd();}};
  t=setInterval(tick,250);tick();return ()=>{clearInterval(t);d.remove();};}
function netGuestTick(){const now=Date.now();
  if(NET.connected){if(now-(NET.lastTx||0)>=1900)netSend({t:"ping"});netLinkStats();if(now-NET.lastRx>NET_CFG.lostMs)netLost("timeout");}
  else if(NET.inDuel&&G&&G.guest&&!G.over){const left=NET_CFG.reconnectSec-(now-NET.lostAt)/1000;netDc(left);
    if(left<=0)netGuestForfeitWin("Host disconnected (forfeit)");}
  if(NET.pendingOver&&G&&G.guest&&NET.duelView){const o=NET.pendingOver;NET.pendingOver=null;netGuestOver(o);}
  netHud();}
/* guest bot: the normal AI drives the guest side, but only through the intent API */
function netBotCheck(){if(!NET.botGuest||NET.role!=="guest"||!G||!G.guest||G.over||!NET.connected)return;
  if(G.ui.mode==="discard"){if(!NET.botDiscarding&&NET.pend.size===0&&S("player").hand.length>HAND_LIMIT){NET.botDiscarding=true;const c=aiDiscardPick("player");
      netIntent("discard",{uid:c.uid}).finally(()=>{NET.botDiscarding=false;setTimeout(netBotCheck,30);});}return;}
  if(G.current==="player"&&!NET.botRunning&&NET.lastSnap&&!NET.lastSnap.g.busy&&NET.pend.size===0&&NET.botTurnDone!==G.turn&&(G.phase==="main1"||G.phase==="battle"||G.phase==="main2")){
    NET.botTurnDone=G.turn;netGuestBotTurn();}}
async function netGuestBotTurn(){NET.botRunning=true;const turn=G.turn;const mine=()=>G&&G.guest&&!G.over&&G.current==="player"&&G.turn===turn&&NET.connected;
  try{await realSleep(250);if(!mine())return;
    if(G.phase==="main1")await aiMain("player",1);
    if(mine()&&G.turn>1&&G.phase==="main1"){await netIntent("phase",{p:"battle"});if(mine())await aiBattle("player");}
    if(mine()&&G.phase==="battle")await netIntent("phase",{p:"main2"});
    if(mine()&&G.phase==="main2")await aiMain("player",2);}
  catch(e){if(e!==ABORT)console.error(e);}
  finally{try{if(mine()&&G.phase!=="end")await netIntent("phase",{p:"end"});}finally{NET.botRunning=false;}}}

/* ================= SHARED UI: HUD, emotes, waiting / disconnect overlays, game over ================= */
function netHud(){const t=$("#nh-timer"),c=$("#nh-conn");if(!t)return;
  let tl=-1,ts=null;if(NET.role==="host"&&G&&G.net){tl=NET.cfg.turn>0&&NET.tt.turn===G.turn?NET.tt.left:-1;ts=G.current;}
  else if(NET.role==="guest"&&NET.lastTick){tl=NET.lastTick.tl;ts=NET.lastTick.ts;}
  const who=!G||!G.sides?"":G.over?"Duel over":ts==="player"?"Your turn":ts==="enemy"?S("enemy").name+"'s turn":"";
  if(tl>=0&&G&&!G.over){const mm=Math.floor(tl/60),ss=String(Math.max(0,tl)%60).padStart(2,"0");t.textContent="⏱ "+mm+":"+ss+(who?" · "+who:"");t.classList.toggle("low",tl<=15&&ts==="player");}
  else{t.textContent=who||"Online duel";t.classList.remove("low");}
  const su=$("#nh-surr");if(su)su.style.visibility=G&&G.over?"hidden":"";
  if(c){const L=NET.link;let x=NET.connected?"● Connected · room "+(NET.code||""):"● Connection lost";
    if(NET.connected&&L){if(L.rtt!=null)x+=" · "+L.rtt+" ms";if(L.relay)x+=" · via relay";}
    c.textContent=x;c.classList.toggle("bad",!NET.connected);c.classList.toggle("slow",!!(NET.connected&&L&&(L.relay||L.rtt>250)));
    c.title=NET.connected&&L?(L.relay?"The connection goes through a TURN relay server (direct peer-to-peer was not possible), which adds delay. ":"Direct peer-to-peer connection. ")+(L.rtt!=null?"Round trip "+L.rtt+" ms.":""):"";}}
/* link quality from WebRTC stats (selected candidate pair): round-trip time and whether a TURN relay is used */
function netLinkStats(){const c=NET.conn,pc=c&&c.peerConnection;if(!pc||!pc.getStats||NET.linkBusy)return;NET.linkBusy=true;
  pc.getStats().then(rep=>{let pair=null;const by={};rep.forEach(s=>{by[s.id]=s;});
    rep.forEach(s=>{if(s.type==="transport"&&s.selectedCandidatePairId&&by[s.selectedCandidatePairId])pair=by[s.selectedCandidatePairId];});
    if(!pair)rep.forEach(s=>{if(s.type==="candidate-pair"&&(s.selected||s.nominated)&&s.state==="succeeded"&&!pair)pair=s;});
    if(!pair)return;const lc=by[pair.localCandidateId]||{},rc=by[pair.remoteCandidateId]||{};
    const rtt=pair.currentRoundTripTime!=null?Math.round(pair.currentRoundTripTime*1000):(pair.totalRoundTripTime&&pair.responsesReceived?Math.round(pair.totalRoundTripTime/pair.responsesReceived*1000):null);
    NET.link={rtt,relay:lc.candidateType==="relay"||rc.candidateType==="relay",local:lc.candidateType||"",remote:rc.candidateType||"",proto:lc.protocol||""};})
  .catch(()=>{}).finally(()=>{NET.linkBusy=false;});}
function netEmote(i){if(!G||!NET.inDuel)return;if(Date.now()-NET.lastEmote<1500)return;NET.lastEmote=Date.now();netSend({t:"emote",k:i});netShowEmote("player",i);}
function netShowEmote(side,i){const t=NET_CFG.emotes[i];if(!t||!G||!G.sides||CUR!=="duel")return;netBubble(side,t,true);}
function netWait(text,sec){let w=$("#netWait");if(!w){w=document.createElement("div");w.id="netWait";$("#app").appendChild(w);}
  clearInterval(NET.waitT);if(!text){w.classList.remove("on");return;}
  const end=sec?Date.now()+sec*1000:0;const upd=()=>{w.textContent="⏳ "+text+(end?"  "+Math.max(0,Math.ceil((end-Date.now())/1000))+"s":"");};upd();w.classList.add("on");
  if(end)NET.waitT=setInterval(upd,500);}
function netDc(left){let d=$("#netDc");if(!d){d=document.createElement("div");d.id="netDc";$("#app").appendChild(d);}
  if(left==null){d.classList.remove("on");d.innerHTML="";return;}
  const host=NET.role==="host";const s=Math.max(0,Math.ceil(left));
  if(!d.classList.contains("on")||!d.querySelector(".cd")){d.innerHTML=`<div class="box"><h2>${host?"Opponent disconnected":"Connection to the host lost"}</h2><p>${host?"Waiting for them to rejoin with the same room code.":"Reconnecting automatically..."}<br>If the connection is not back in time, ${host?"you win by forfeit":"the remaining player wins by forfeit"}.</p><div class="cd"></div><button class="btn" id="dc-leave">Leave Room</button></div>`;
    d.classList.add("on");$("#dc-leave").onclick=()=>{if(NET.role==="host"&&G&&G.net&&!G.over)gameOver("player","Opponent disconnected");netLeaveRoom();};}
  d.querySelector(".cd").textContent=s+"s";}
function netGameOverButtons(){const row=document.querySelector(".overbox .btnrow");if(!row)return;
  row.innerHTML=`<button class="btn gold" id="net-rematch" style="padding:10px 18px;font-size:14px">⚔ Rematch</button><button class="btn" id="net-repick" style="padding:10px 18px;font-size:14px">Change Duelist</button><button class="btn" id="net-leave" style="padding:10px 18px;font-size:14px">Leave Room</button><span id="net-rmstat"></span>`;
  $("#net-rematch").onclick=()=>{if(!NET.connected){netToast("Opponent is not connected.");return;}NET.rematch.me=true;netSend({t:"rematch"});netRematchStatus();netMaybeRematch();};
  $("#net-repick").onclick=()=>{if(!NET.connected){netToast("Opponent is not connected.");return;}netGoRepick(true);};
  $("#net-leave").onclick=()=>netLeaveRoom();netRematchStatus();}
function netRematchStatus(){const s=$("#net-rmstat");if(!s)return;s.textContent=NET.rematch.me&&NET.rematch.opp?"Starting rematch...":NET.rematch.me?"Waiting for opponent...":NET.rematch.opp?"Opponent wants a rematch!":"";}
function netMaybeRematch(){if(NET.role==="host"&&NET.rematch.me&&NET.rematch.opp&&NET.connected&&(!G||G.over)){NET.inDuel=false;NET.rematch={me:false,opp:false};setTimeout(netHostStartDuel,400);}}

/* ================= ONLINE SCREEN (menu -> Online Duel) ================= */
function netStatus(html,err){const s=$("#on-status");if(s){s.innerHTML=html||"";s.classList.toggle("err",!!err);}NET.statusHTML=html;NET.statusErr=!!err;}
function netOpenOnline(code){if(!$("#online")){const s=document.createElement("section");s.className="screen";s.id="online";$("#app").insertBefore(s,$("#fx"));}
  if(!NET.me.name)NET.me.name=netName(store().name||"");
  if(!NET.role){NET.view="home";}showScreen("online");netRenderOnline(code);}
function netRenderOnline(prefill){const el=$("#online");if(!el)return;const v=NET.view;
  let body="";
  if(v==="home"){const st=netSettings();
    body=`<div class="onrow"><div class="oncard" style="width:420px"><h3>YOUR NAME</h3><input id="on-name" maxlength="16" value="${netEsc(NET.me.name)}" placeholder="Display name" style="width:100%">
        <p>Shown to your opponent. You pick your duelist and deck after connecting.</p></div></div>
      <div class="onrow" style="margin-top:18px">
        <div class="oncard" style="width:380px;text-align:center"><h3>CREATE ROOM</h3><p>Get a 6-character code and send it to a friend.</p><button class="btn gold nbig" id="on-create">Create Room</button></div>
        <div class="oncard" style="width:380px;text-align:center"><h3>JOIN ROOM</h3><p>Enter the code your friend sent you.</p>
          <input class="oninput-code" id="on-code" maxlength="6" value="${netEsc(netCleanCode(prefill||""))}" placeholder="CODE"><br><button class="btn gold nbig" id="on-join" style="margin-top:10px">Join Room</button></div></div>
      <div id="on-status" class="onstatus"></div>
      <div style="text-align:center;margin-top:14px" class="onsmall">Peer-to-peer over WebRTC. The free public PeerJS server (0.peerjs.com) only introduces the two browsers; the duel data flows directly between you.
        <br><span class="onlink" id="on-advt">Connection settings</span> · <span class="onlink" id="on-credits">Credits &amp; licences</span></div>
      <div class="onadv ${st.host||st.turnUrl?"open":""}" id="on-adv" style="justify-content:center">
        <span>Own PeerServer (blank = public cloud):</span><input id="adv-host" placeholder="host" value="${netEsc(st.host||"")}"><input id="adv-port" placeholder="port" style="width:60px" value="${netEsc(st.port||"")}"><input id="adv-path" placeholder="path" style="width:80px" value="${netEsc(st.path||"")}"><input id="adv-key" placeholder="key" style="width:80px" value="${netEsc(st.key||"")}">
        <span style="width:100%;text-align:center"></span><span>TURN relay (optional):</span><input id="adv-turn" placeholder="turn:host:port" style="width:200px" value="${netEsc(st.turnUrl||"")}"><input id="adv-tu" placeholder="username" value="${netEsc(st.turnUser||"")}"><input id="adv-tc" placeholder="credential" value="${netEsc(st.turnCred||"")}">
        <label><input type="checkbox" id="adv-relay" ${st.relayOnly?"checked":""}> relay only</label><button class="btn" id="adv-save">Save</button></div>`;}
  else if(v==="hosting"){body=`<div class="onrow"><div class="oncard" style="width:620px;text-align:center"><h3>ROOM CODE</h3><div class="oncode" id="on-thecode">${netEsc(NET.code||"")}</div>
      <div style="display:flex;gap:10px;justify-content:center"><button class="btn gold" id="on-copy">Copy code</button><button class="btn" id="on-copylink">Copy invite link</button><button class="btn red" id="on-cancel">Close room</button></div>
      <p style="margin-top:12px">Send the code to your friend. They open the same game page, choose <b>Online Duel → Join Room</b> and type it in.<br>Keep this page open while you play: you are the host.</p></div></div><div id="on-status" class="onstatus"></div>`;}
  else if(v==="joining"){body=`<div id="on-status" class="onstatus" style="margin-top:120px;font-size:16px"></div><div style="text-align:center;margin-top:16px"><button class="btn" id="on-cancel">Cancel</button></div>`;}
  else if(v==="pick")body=netPickHTML();
  el.innerHTML=`<button class="btn backbtn" id="on-back">◀ ${NET.role?"Leave":"Back"}</button><div class="selhead"><h2>ONLINE DUEL</h2><div class="sub">${NET.role?"Room "+netEsc(NET.code||"")+(NET.role==="host"?" · you are the host":" · you joined"):"Duel a friend anywhere. Free, no account needed."}</div></div><div class="onbody">${body}</div>`;
  if(NET.statusHTML!=null&&$("#on-status"))netStatus(NET.statusHTML,NET.statusErr);
  $("#on-back").onclick=()=>{if(NET.role)netLeaveRoom(false);NET.view="home";NET.statusHTML="";if(typeof window.openDuelSelect==="function")window.openDuelSelect();else showScreen("menu");};
  const nm=$("#on-name");if(nm)nm.oninput=()=>{NET.me.name=nm.value;};
  const cr=$("#on-create");if(cr)cr.onclick=()=>{NET.me.name=netName(nm?nm.value:NET.me.name);NET.statusHTML="";netCreateRoom();};
  const jn=$("#on-join"),cd=$("#on-code");if(cd){cd.oninput=()=>{cd.value=netCleanCode(cd.value);};cd.onkeydown=e=>{if(e.key==="Enter")jn.click();};}
  if(jn)jn.onclick=()=>{NET.me.name=netName(nm?nm.value:NET.me.name);NET.statusHTML="";netJoinRoom(cd.value);};
  const cp=$("#on-copy");if(cp)cp.onclick=()=>netCopy(NET.code,"Room code copied!");
  const cl=$("#on-copylink");if(cl)cl.onclick=()=>netCopy(location.href.split("#")[0]+"#join="+NET.code,"Invite link copied!");
  const cc=$("#on-cancel");if(cc)cc.onclick=()=>{netLeaveRoom(false);NET.view="home";NET.statusHTML="";setTimeout(()=>netRenderOnline(),200);};
  const at=$("#on-advt");if(at)at.onclick=()=>$("#on-adv").classList.toggle("open");
  const ce=$("#on-credits");if(ce)ce.onclick=()=>netShowCredits();
  const as=$("#adv-save");if(as)as.onclick=()=>{const g=id=>($("#"+id).value||"").trim();netSaveSettings({host:g("adv-host"),port:g("adv-port"),path:g("adv-path"),key:g("adv-key"),turnUrl:g("adv-turn"),turnUser:g("adv-tu"),turnCred:g("adv-tc"),relayOnly:$("#adv-relay").checked});netToast("Connection settings saved");};
  if(v==="pick")netBindPick();}
function netCopy(text,msg){const done=()=>netToast(msg);
  const fallback=()=>{const t=document.createElement("textarea");t.value=text;document.body.appendChild(t);t.select();try{document.execCommand("copy");done();}catch(e){netToast(text);}t.remove();};
  try{if(navigator.clipboard&&window.isSecureContext){navigator.clipboard.writeText(text).then(done,fallback);return;}}catch(e){}
  fallback();}
function netDeckLabel(ch,mode){if(mode==="list")return "Test deck";if(mode==="custom")return ch==="you"?"Custom deck (Deck Builder)":"Custom deck";return ch==="you"?"Starter deck":"Default deck";}
function netPickHTML(){const me=NET.me,op=NET.opp,host=NET.role==="host";const C=CHARS[me.ch]||CHARS.you;
  const tiles=CHAR_ORDER.map(c=>`<div class="ntile ${me.ch===c?"sel":""} ${me.ready?"lock":""}" data-ch="${c}" title="${netEsc(CHARS[c].name)}"><img src="${PORTRAITS[CHARS[c].img]}" alt=""><span>${c==="you"?"Custom":netEsc(CHARS[c].name)}</span></div>`).join("");
  const hasCustom=!!savedDeck(me.ch);
  const arenaOpts=[["home","Home arena (either duelist, random)"],["random","Random arena"],...Object.keys(ARENAS).map(k=>[k,ARENAS[k].name])];
  const OC=op&&op.ch?CHARS[op.ch]:null;
  const cfgTxt=`Arena: <b>${NET.cfg.arena==="home"?"home arena (random pick)":NET.cfg.arena==="random"?"random":netEsc((ARENAS[NET.cfg.arena]||{}).name||"")}</b> · Turn timer: <b>${NET.cfg.turn?NET.cfg.turn+" s":"off"}</b>`;
  return `<div class="npick"><div class="oncard mine"><h3>YOU</h3>
      <div class="nfield"><label>Name</label><input id="np-name" maxlength="16" value="${netEsc(me.name)}" ${me.ready?"disabled":""} style="flex:1"></div>
      <div class="ntiles">${tiles}</div>
      <div class="nfield"><label>Duelist</label><b style="color:${C.color}">${me.ch==="you"?"Custom duelist":netEsc(C.name)}</b><span class="onsmall">${netEsc(C.theme||"")}</span></div>
      <div class="nfield"><label>Deck</label><select id="np-deck" ${me.ready?"disabled":""}><option value="default" ${me.deck!=="custom"?"selected":""}>${netDeckLabel(me.ch,"default")}</option><option value="custom" ${me.deck==="custom"?"selected":""} ${hasCustom?"":"disabled"}>${netDeckLabel(me.ch,"custom")}${hasCustom?"":" (none saved)"}</option></select></div>
      ${host?`<div class="nopts"><div class="nfield"><label>Arena</label><select id="np-arena" ${me.ready?"disabled":""}>${arenaOpts.map(([k,l])=>`<option value="${k}" ${NET.cfg.arena===k?"selected":""}>${netEsc(l)}</option>`).join("")}</select></div>
        <div class="nfield"><label>Turn timer</label><select id="np-turn" ${me.ready?"disabled":""}>${[[0,"Off"],[90,"90 seconds"],[120,"120 seconds"]].map(([k,l])=>`<option value="${k}" ${NET.cfg.turn===k?"selected":""}>${l}</option>`).join("")}</select><span class="onsmall">Responses auto-pass after ${NET_CFG.respSec} s.</span></div></div>`:`<div class="nopts onsmall">${cfgTxt} (set by the host)</div>`}
      <div style="display:flex;gap:10px;margin-top:12px;align-items:center"><button class="btn ${me.ready?"":"gold"} nbig" id="np-ready">${me.ready?"✔ Ready (click to change)":"Ready!"}</button><span class="nconn">${NET.connected?"<b>●</b> Connected":"Connection lost"} · room ${netEsc(NET.code||"")}</span></div></div>
    <div class="theirs"><div class="oncard" style="flex:1"><h3>OPPONENT</h3>
      <div class="nportrait" style="--c:${OC?OC.color:"#ffffff33"}">${OC?`<img src="${PORTRAITS[OC.img]}" alt="">`:`<div class="q">?</div>`}<div class="nready ${op&&op.ready?"ok":""}">${op?op.ready?"READY":"choosing...":"-"}</div></div>
      <div class="nfield" style="font-size:16px"><b>${op?netEsc(op.name):"Waiting..."}</b></div>
      <div class="nfield"><label>Duelist</label><span>${OC?(op.ch==="you"?"Custom duelist":netEsc(OC.name)):"-"}</span></div>
      <div class="nfield"><label>Deck</label><span>${op&&op.ch?netDeckLabel(op.ch,op.deck):"-"}</span></div>
      <p class="onsmall">The duel starts when both duelists are ready.${host?"":" The host's browser runs the rules."}</p></div></div></div>
    <div id="on-status" class="onstatus"></div>`;}
function netBindPick(){const me=NET.me;
  document.querySelectorAll("#online .ntile").forEach(t=>t.onclick=()=>{if(me.ready)return;me.ch=t.dataset.ch;if(me.deck==="custom"&&!savedDeck(me.ch))me.deck="default";if(me.deck==="list")me.deck="default";netRenderOnline();netPickChanged();});
  const n=$("#np-name");if(n)n.oninput=()=>{me.name=n.value;clearTimeout(NET.nameT);NET.nameT=setTimeout(netPickChanged,300);};
  const d=$("#np-deck");if(d)d.onchange=()=>{me.deck=d.value;netPickChanged();};
  const a=$("#np-arena");if(a)a.onchange=()=>{NET.cfg.arena=a.value;netPickChanged();};
  const tt=$("#np-turn");if(tt)tt.onchange=()=>{NET.cfg.turn=+tt.value;netPickChanged();};
  $("#np-ready").onclick=()=>{me.name=netName(me.name);me.ready=!me.ready;netRenderOnline();netPickChanged();};}
function netShowCredits(){$("#modalLayer").innerHTML=`<div class="modal-bg"><div class="modal" style="width:760px"><h2>Online play - credits &amp; licences</h2><div class="oncredits">${netEsc(NET_CREDITS)}</div><div class="btnrow"><button class="btn gold" id="cr-close">Close</button></div></div></div>`;
  $("#cr-close").onclick=()=>{$("#modalLayer").innerHTML="";};}
const NET_CREDITS=`Online multiplayer uses PeerJS 1.5.5 (https://peerjs.com), bundled inside this file.
PeerJS - Copyright (c) 2015 Michelle Bu and Eric Zhang. MIT License.
Bundled inside PeerJS: webrtc-adapter (BSD-3-Clause, (c) The WebRTC project authors / adapter.js project authors),
eventemitter3 (MIT, (c) 2014 Arnout Kazemier), peerjs-js-binarypack (MIT, (c) 2012 Eric Zhang),
sdp (MIT, (c) 2017 Philipp Hancke).

Signalling: the free public PeerJS cloud server (0.peerjs.com), run by the PeerJS project.
NAT traversal: public STUN servers (Google, Cloudflare) and the best-effort public PeerJS TURN relay.

MIT License (PeerJS): Permission is hereby granted, free of charge, to any person obtaining a copy of this
software and associated documentation files (the "Software"), to deal in the Software without restriction,
including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the
following conditions: The above copyright notice and this permission notice shall be included in all copies or
substantial portions of the Software. THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED. Full licence texts: CREDITS.txt next to index.html.`;

/* ================= WRAPPERS around existing game functions =================
   Single-player / AI duels are untouched: every wrapper falls straight through unless an
   online duel is running (G.net). */
const netOrigPrompt=promptResponse;
(function(){
  const W=(name,mk)=>{const o=window[name];if(typeof o!=="function"){console.warn("[net] missing hook",name);return;}window[name]=mk(o);};
  /* host: every engine render marks the state dirty -> one snapshot per burst */
  W("render",o=>function(){const r=o.apply(this,arguments);if(netHostLive()){NET.dirty=true;if(!NET.flushQ){NET.flushQ=true;queueMicrotask(()=>{NET.flushQ=false;netFlush();});}}return r;});
  W("log",o=>function(msg,cls){if(netHostLive()){const v=netLogFor(String(msg));const r=o.call(this,v.host,cls);
      NET.hlog.unshift({m:v.guest,c:cls||""});if(NET.hlog.length>60)NET.hlog.pop();netSend({t:"log",m:v.guest,c:cls||""});return r;}
    return o.apply(this,arguments);});
  W("mk",o=>function(){const c=o.apply(this,arguments);if(NET.role==="host"&&(NET.starting||(G&&G.net&&!G.guest)))c.uid=netRandUid();return c;});
  /* FX -> events for the guest (sides are sent from the host's point of view; the guest mirrors) */
  W("anim",o=>function(el,kf,dur,opt){if(netHostLive()&&!NET.sup&&el&&el.getAttribute&&el.getAttribute("data-uid")&&el.closest&&el.closest("#duel"))netFx("anim",{e:{u:+el.getAttribute("data-uid")},kf,d:dur,o:opt||null});return o.apply(this,arguments);});
  W("floatText",o=>function(el,txt,cls){if(netHostLive()){const r=netRef(el);if(r)netFx("float",{e:r,x:String(txt),c:cls});}return o.apply(this,arguments);});
  W("impact",o=>function(el){if(netHostLive()){const r=netRef(el);if(r)netFx("impact",{e:r});}return o.apply(this,arguments);});
  W("shakeEl",o=>function(sel,big){if(netHostLive())netFx("shake",{s:sel,b:!!big});return o.apply(this,arguments);});
  W("tweenLP",o=>function(s,from,to){if(netHostLive())netFx("lp",{s,a:from,b:to});return o.apply(this,arguments);});
  W("changeLP",o=>function(s,delta){if(netHostLive()&&delta<0)netFx("hurt",{s});return o.apply(this,arguments);});
  W("exprSet",o=>function(s,x,hold){if(netHostLive())netFx("expr",{s,x,h:hold});return o.apply(this,arguments);});
  W("exprTalk",o=>function(s,ms){if(netHostLive())netFx("talk",{s,ms});return o.apply(this,arguments);});
  W("speakForce",o=>function(s){const live=netHostLive();const before=live?document.querySelector("#bubbles .bubble."+s+":not(.emote)"):null;const r=o.apply(this,arguments);
    if(live){const b=document.querySelector("#bubbles .bubble."+s+":not(.emote)");if(b&&b!==before)netFx("speak",{s,x:b.textContent});}return r;});
  /* these FX are replayed by the guest itself -> hold other emission (incl. their SFX) while they run */
  W("banner",o=>function(text,color){if(!netHostLive())return o.apply(this,arguments);
    const H=S("player").name.toUpperCase(),E=S("enemy").name.toUpperCase();let x=text;
    if(text==="YOUR TURN")x=H+"'S TURN";else if(text===E+"'S TURN")x="YOUR TURN";else if(text==="YOU GO FIRST")x="RIVAL GOES FIRST";else if(text==="RIVAL GOES FIRST")x="YOU GO FIRST";
    const c=color==="#3fa9ff"?"#ff4b5c":color==="#ff4b5c"?"#3fa9ff":color;netFx("banner",{x,c});const a=arguments,t=this;return netHold(()=>o.apply(t,a));});
  W("showcase",o=>function(c,s,verb){if(!netHostLive())return o.apply(this,arguments);netFx("show",{c:netCardOut(c,true),s,v:verb||null});const a=arguments,t=this;return netHold(()=>o.apply(t,a));});
  W("lunge",o=>function(att,tgt){if(!netHostLive())return o.apply(this,arguments);netFx("lunge",{a:netRef(att),b:netRef(tgt)});const a=arguments,t=this;return netHold(()=>o.apply(t,a));});
  W("entrance",o=>function(card,s){if(!netHostLive())return o.apply(this,arguments);netFx("ace",{c:netCardOut(card,true),s});const a=arguments,t=this;return netHold(()=>o.apply(t,a));});
  W("gameOver",o=>function(winner,reason){const live=netHostLive(),was=G&&G.over;const r=o.apply(this,arguments);
    if(live&&!was&&G&&G.over){NET.overReason=reason;netWait(null);netDc(null);if(NET.prompt){const p=NET.prompt;NET.prompt=null;p.res(null);}
      if(NET.rDiscard){const d=NET.rDiscard;NET.rDiscard=null;d.res();}netFlush(true);netSend({t:"over",w:winner,r:String(reason||"")});netHud();}return r;});
  W("showGameOver",o=>function(){const r=o.apply(this,arguments);if(NET.inDuel&&G&&G.net)netGameOverButtons();return r;});
  /* response windows: the responder decides on their own screen; the other side waits */
  W("promptResponse",o=>function(r,kind,ctx,traps,quicks){
    if(!netHostLive())return o.apply(this,arguments);
    if(r==="enemy")return netRemotePrompt(kind,ctx,traps,quicks);
    netSend({t:"wait",on:1,x:"Opponent is deciding whether to respond...",sec:NET_CFG.respSec});
    const p=o.apply(this,arguments);const box=$("#respbox");
    const stop=box?netCountdown(NET_CFG.respSec,box,()=>{const b=document.querySelector('#modalLayer [data-resp="0"]');if(b)b.click();}):null;
    return p.then(c=>{if(stop)stop();netSend({t:"wait",on:0});return c;});});
  W("endPhase",o=>async function(side){if(netHostLive()&&side==="enemy"&&!isAI(side)&&S(side).hand.length>HAND_LIMIT){G.phase="end";G.ui={mode:null};closeMenu();render();await netRemoteDiscard();}
    return o.apply(this,arguments);});
  /* guest: player actions become intents for the host */
  W("normalSummon",o=>function(s,uid,tributes,setMode,pref){if(!netGuestLive())return o.apply(this,arguments);return netIntent("summon",{uid,tr:tributes||[],set:!!setMode,pref:pref==null?-1:pref});});
  W("setTrap",o=>function(s,uid,pref){if(!netGuestLive())return o.apply(this,arguments);return netIntent("set",{uid,pref:pref==null?-1:pref});});
  W("activateSpell",o=>function(s,uid,targetUid,ctx,pref){if(!netGuestLive())return o.apply(this,arguments);return netIntent("spell",{uid,tgt:targetUid||0,pref:pref==null?-1:pref});});
  W("changePosition",o=>function(s,uid){if(!netGuestLive())return o.apply(this,arguments);return netIntent("pos",{uid});});
  W("attack",o=>function(s,attUid,tgtUid){if(!netGuestLive())return o.apply(this,arguments);return netIntent("attack",{uid:attUid,tgt:tgtUid||0});});
  W("discard",o=>function(s,uid){if(!netGuestLive())return o.apply(this,arguments);netIntent("discard",{uid});});
  W("phaseAct",o=>function(a){if(!netGuestLive())return o.apply(this,arguments);if(!humanTurn())return;G.ui={mode:null};closeMenu();G.busy=true;render();
    netIntent("phase",{p:a});});
  /* online duels only: embedded images (base64 data: URLs, 20-60 KB each) are handed to the DOM as short blob: URLs.
     Every render() rebuilds the hand / field HTML; with data: URLs that HTML carried ~0.4 MB of base64 per render. */
  const blobW=(name,pre)=>W(name,o=>function(){const r=o.apply(this,arguments);if(NET.inDuel&&typeof r==="string"&&r.startsWith("data:"))return netBlobUrl(pre+[...arguments].join("_"),r);return r;});
  blobW("artSrc","a:");blobW("exprSrc","x:");blobW("posterSrc","p:");
  /* menu (v14): Online 1v1 lives in DUEL > Choose your duel (window.openDuelSelect); the old ONLINE DUEL main button is only added to builds without it */
  const addBtn=()=>{const mb=document.querySelector("#menu .menubtns");if(mb&&!$("#m-online")&&typeof window.openDuelSelect!=="function"){const b=document.createElement("button");b.className="mbtn";b.id="m-online";b.textContent="🌐 ONLINE DUEL";b.onclick=()=>netOpenOnline();
      const d=$("#m-duel");if(d&&d.nextSibling)mb.insertBefore(b,d.nextSibling);else mb.appendChild(b);}
    const ver=document.querySelector("#menu .ver");if(ver&&!/online/.test(ver.textContent))ver.textContent=ver.textContent.replace("offline edition","single-player & online");};
  W("renderMenu",o=>function(){const r=o.apply(this,arguments);try{addBtn();}catch(e){}return r;});
  try{addBtn();}catch(e){}
  /* AUDIO (i_audio.js, when present): forward engine sound effects to the guest */
  try{if(typeof AUDIO!=="undefined"&&AUDIO&&typeof AUDIO.play==="function"){const op=AUDIO.play;const LOCAL={pickup:1,drop:1,snap:1,alert:1};
    AUDIO.play=function(n,a){if(netHostLive()&&!LOCAL[n]){const g=n==="victory"?"defeat":n==="defeat"?"victory":n;netFx("sfx",{n:g,a:a==null?null:a});}return op.apply(this,arguments);};}}catch(e){}
  /* invite links: index.html#join=CODE opens the Join screen with the code filled in */
  try{const m=/join=([A-Za-z0-9]{6})/.exec(location.hash||"");if(m)setTimeout(()=>netOpenOnline(m[1]),50);}catch(e){}
  window.addEventListener("beforeunload",()=>{try{if(NET.connected&&!(NET.role==="guest"&&NET.inDuel))netSend({t:"bye"});}catch(e){}});
})();

try{const b=document.getElementById("adc-boot");if(b)b.remove();}catch(e){} /* loading splash from make_mp.sh */
/* ================= test / debug API (used by the Playwright suite) ================= */
window.__adcNet={get NET(){return NET;},create:c=>netCreateRoom(c),join:c=>netJoinRoom(c),open:()=>netOpenOnline(),
  pick:(ch,name,deck,list)=>{Object.assign(NET.me,{ch,name:netName(name),deck:deck||"default",list:list||null});if(NET.view==="pick")netRenderOnline();netPickChanged();},
  ready:on=>{NET.me.ready=on!==false;if(NET.view==="pick")netRenderOnline();netPickChanged();},
  cfg:o=>{Object.assign(NET.cfg,o||{});netPickChanged();},
  speed:x=>{NET.speed=x;SPEED=x;},bot:on=>{if(NET.role==="host"){NET.botHost=!!on;netHostBotKick();}else{NET.botGuest=!!on;netBotCheck();}},
  eager:on=>{NET.botEager=!!on;},
  hash:()=>netHash(NET.role==="host"?"player":"enemy"),
  state:()=>({role:NET.role,code:NET.code,connected:NET.connected,view:NET.view,inDuel:NET.inDuel,duelView:NET.duelView,n:NET.duelNo,
    turn:G?G.turn:null,phase:G?G.phase:null,cur:G?G.current:null,busy:G?!!G.busy:null,over:G?!!G.over:null,winner:G?G.winner:null,net:G?!!G.net:false,
    lp:G&&G.sides?[S("player").lp,S("enemy").lp]:null,prompt:!!NET.prompt,gpid:NET.guestPromptId,stats:NET.stats,seq:NET.seq,hash:G&&G.sides?netHash(NET.role==="host"?"player":"enemy"):null}),
  dropConnection:()=>{const c=NET.conn;try{if(NET.peer)NET.peer.destroy();}catch(e){}if(NET.conn===c)netLost("test-drop");},
  give:(side,id)=>{if(NET.role!=="host"||!G)return false;const c=mk(id,side);S(side).hand.push(c);render();return c.uid;},
  leave:()=>netLeaveRoom(),surrender:()=>netSurrender(),emote:i=>{NET.lastEmote=0;netEmote(i);},rematch:()=>{const b=$("#net-rematch");if(b)b.click();}};

/* ================= PLAYER CHOICES (build3 CHOICE_UI: requestChoice(player, options, opts) -> Promise) =================
   Whoever owns the effect chooses. Guest-owned choices are sent to the guest with only the information the
   guest may see (own cards / face-up / graveyard; anything else is a face-down stub); the host waits, auto-picking
   the first option after NET_CFG.choiceSec. The other player sees "Opponent is choosing...". */
NET_CFG.choiceSec=30;
function netChoiceVis(c){return !!c&&(c.faceUp||c.owner==="enemy"||(G&&find(c.uid)&&find(c.uid).zone==="gy")||!find(c.uid));}
function netChoiceOptOut(o){if(o&&typeof o==="object"&&o.uid!=null&&(o.id||o.hidden))return {c:netCardOut(o,netChoiceVis(o))};
  if(o&&typeof o==="object"){const r={};for(const k of ["hidden","note","zone","label","text","name","value","desc","disabled"]){const v=o[k];if(v!=null&&typeof v!=="object"&&typeof v!=="function")r[k]=v;}
    if(o.card&&!netChoiceVis(o.card))r.hidden=true;
    if(o.card&&o.card.uid!=null)r.card=netCardOut(o.card,netChoiceVis(o.card));return {o:r};}
  return {v:o==null?null:(typeof o==="number"||typeof o==="boolean")?o:String(o)};}
function netChoiceOptIn(x){if(!x)return null;if(x.c)return netCardIn(x.c);if(x.o){const r=Object.assign({},x.o);for(const k in r)if(typeof r[k]==="string")r[k]=netEsc(r[k].slice(0,200));
    if(r.card&&typeof r.card==="object")r.card=netCardIn(x.o.card);else delete r.card;r.hidden=!!r.hidden||!!(r.card&&r.card.hidden);return r;}return x.v;}
function netChoiceMetaOut(m){const r={};if(!m||typeof m!=="object")return r;for(const k in m){const v=m[k];if(v==null||typeof v==="function")continue;
    if(typeof v!=="object")r[k]=v;else if(v.uid!=null)r[k]={__card:netCardOut(v,netChoiceVis(v))};}return r;}
function netChoiceMetaIn(m){const r={};for(const k in (m||{})){const v=m[k];if(v&&typeof v==="object"&&v.__card)r[k]=netCardIn(v.__card);
    else if(typeof v==="string")r[k]=netEsc(v.slice(0,300));else if(typeof v==="number"||typeof v==="boolean")r[k]=v;}return r;}
/* map a chooser result back to indices into the option list */
function netChoiceIdx(res,opts){const one=v=>{if(typeof v==="number"&&Number.isInteger(v)&&v>=0&&v<opts.length&&!opts.includes(v))return v;
    let i=opts.indexOf(v);if(i<0&&v&&v.uid!=null)i=opts.findIndex(o=>o&&(o.uid===v.uid||(o.card&&o.card.uid===v.uid)));return i;};
  if(res==null)return null;if(Array.isArray(res))return res.map(one).filter(i=>i>=0);const i=one(res);return i<0?null:i;}
function netChoiceRes(idx,opts,meta){if(idx==null)return null;if(Array.isArray(idx))return idx.filter(i=>Number.isInteger(i)&&i>=0&&i<opts.length).map(i=>opts[i]);
  const r=Number.isInteger(idx)&&idx>=0&&idx<opts.length?opts[idx]:null;return r&&r.card?r.card:r;}
function netRemoteChoice(options,meta){return new Promise(res=>{const id=++NET.pid;const sec=NET_CFG.choiceSec;
  const msg={t:"choice",id,opts:options.map(netChoiceOptOut),meta:netChoiceMetaOut(meta),sec};
  const multi=!!(meta&&(meta.multi||meta.max>1||meta.count>1));
  const fin=idx=>{if(!NET.choice||NET.choice.id!==id)return;clearTimeout(NET.choice.to);NET.choice=null;netWait(null);
    let r=netChoiceRes(idx,options,meta);if(r==null&&!(meta&&(meta.optional||meta.cancel||meta.canCancel)))r=multi?options.slice(0,Math.max(1,+meta.min||+meta.count||1)):(options[0]&&options[0].card?options[0].card:options[0]);res(r);};
  NET.choice={id,msg,fin,to:setTimeout(()=>{netSend({t:"choiceEnd",id});fin(null);netToast("Time's up - first option picked");},(sec+5)*1000)};
  netFlush(true);netSend(msg);netWait("Opponent is choosing...",sec);});}
let netOrigChoice=null;
/* v9i: close the guest's open chooser. silent=true drops the pending reply (disconnect / superseded); the host re-sends
   the choice after a resync, or decides it itself on its own timeout. */
function netGuestChoiceClose(silent){if(silent)NET.guestChoiceId=null;const ch=document.querySelector("#chooser");const bg=ch&&ch.closest(".modal-bg");if(bg){bg.remove();NET.chClosedAt=Date.now();}}
function netGuestChoice(m,again){if(!again)NET.stats.choices=(NET.stats.choices||0)+1;if(typeof netRenderNow==="function")netRenderNow();const reply=idx=>netSend({t:"choiceResp",id:m.id,i:idx});
  const opts=(m.opts||[]).map(netChoiceOptIn);if(!G||!G.guest||!opts.length||!netOrigChoice){reply(0);return;}
  if(NET.botGuest){setTimeout(()=>reply(0),150);return;}
  if(NET.guestChoiceId===m.id&&document.querySelector("#chooser"))return; /* v9i: resent after a resync - keep the open chooser */
  /* v9i: a stale chooser never lingers under a new one, and a chooser closed from outside (choiceEnd / countdown / disconnect)
     keeps its 300 ms watch for a moment - its fin() removes whatever #chooser exists, so open the new one only after it settled */
  if(!again){if(NET.chDefer===m.id)return;const stale=!!document.querySelector("#chooser");const w=(NET.chClosedAt||0)+450-Date.now();
    if(stale||w>0){if(stale)netGuestChoiceClose(true);NET.guestChoiceId=m.id;NET.chDefer=m.id;
      setTimeout(()=>{NET.chDefer=null;if(NET.guestChoiceId===m.id&&G&&!G.over){NET.guestChoiceId=null;netGuestChoice(m,true);}},stale?450:Math.max(50,w));return;}}
  else if(document.querySelector("#chooser"))netGuestChoiceClose(true);
  NET.guestChoiceId=m.id;let p;try{p=Promise.resolve(netOrigChoice("player",opts,netChoiceMetaIn(m.meta)));}catch(e){console.error(e);reply(0);return;}
  /* v9i: when the countdown runs out the chooser closes (its watch resolves -> auto-pass reply, host picks the default) */
  const box=document.querySelector("#chooser")||document.querySelector("#modalLayer .modal");const stop=box?netCountdown(+m.sec||NET_CFG.choiceSec,box,()=>netGuestChoiceClose(false)):null;
  p.then(r=>{if(stop)stop();if(NET.guestChoiceId!==m.id)return;NET.guestChoiceId=null;const i=netChoiceIdx(r,opts);reply(i==null?-1:i);},()=>reply(0));}
(function(){
  if(typeof window.requestChoice!=="function")return;
  netOrigChoice=window.requestChoice;
  window.requestChoice=function(player,options,meta){
    if(!netHostLive()||!Array.isArray(options)||!options.length)return netOrigChoice.apply(this,arguments);
    if(player==="enemy"&&!netIsAI("enemy"))return netRemoteChoice(options,meta);
    if(player==="player"&&!netIsAI("player")){netSend({t:"wait",on:1,x:"Opponent is choosing...",sec:0});
      return Promise.resolve(netOrigChoice.apply(this,arguments)).finally(()=>netSend({t:"wait",on:0}));}
    return netOrigChoice.apply(this,arguments);};
  const hm=window.netHostMsg;window.netHostMsg=function(m){if(m&&m.t==="choiceResp"){const c=NET.choice;if(c&&c.id===m.id){NET.stats.choiceResps=(NET.stats.choiceResps||0)+1;
      c.fin(Array.isArray(m.i)?m.i.map(x=>x|0):(m.i==null||m.i<0)?null:m.i|0);}return;}return hm.apply(this,arguments);};
  const gm=window.netGuestMsg;window.netGuestMsg=function(m){if(m&&m.t==="choice"){netGuestChoice(m);return;}
    if(m&&m.t==="choiceEnd"){if(NET.guestChoiceId===m.id)netGuestChoiceClose(true);return;}return gm.apply(this,arguments);};
  const go=window.gameOver;window.gameOver=function(){const r=go.apply(this,arguments);if(G&&G.over&&NET.choice){const c=NET.choice;c.fin(null);}return r;};
  const rs=window.netHostResync;window.netHostResync=function(){const r=rs.apply(this,arguments);if(NET.choice)netSend(NET.choice.msg);return r;};
})();
/* ================= v9: CHRONICLES LINK online =================
   Host-authoritative. Skill state (G.sides[s].lk, numbers only) rides in snapshots as part "lk"; card-level lk* flags
   already travel as scalar card props (netCardOut). The guest activates with intent "link"; the host validates with
   canLink("enemy") and runs activateLink. The cutscene is streamed as fx "link" (the SFX is forwarded by the sfx hook). */
if(typeof LINKS!=="undefined"){
  NET_SNAPK.push("lk");
  {const b=netSnapBody;netSnapBody=function(){const r=b.apply(this,arguments);try{r.P.lk=Object.assign({},G.sides.enemy.lk||{});r.E.lk=Object.assign({},G.sides.player.lk||{});}catch(e){}return r;};}
  {const b=netSideIn;netSideIn=function(o,key){const r=b.apply(this,arguments);const lk={};const src=o&&o.lk&&typeof o.lk==="object"?o.lk:{};
     for(const k in src){const v=src[k];if(typeof v==="number"&&isFinite(v))lk[k]=v;}if(lk.used==null)lk.used=0;if(lk.lost==null)lk.lost=0;r.lk=lk;return r;};}
  {const b=netValidate;netValidate=function(m){if(m&&m.a==="link"){if(!inMain())return "not in a Main Phase";return canLink("enemy")?null:"Chronicles Link not available";}return b.apply(this,arguments);};}
  {const b=netOnIntent;netOnIntent=async function(m){if(!m||m.a!=="link")return b.apply(this,arguments);
     NET.stats.intents++;if(typeof m.id==="number"&&m.id>(NET.lastIntent|0))NET.lastIntent=m.id;
     const reply=(ok,err)=>{netFlush();netSend({t:"done",id:m.id,ok:!!ok,err:err||null});};
     if(!G||!G.net||G.over){reply(false,"no duel running");return;}
     if(G.current!=="enemy"||G.busy||NET.rDiscard){NET.stats.rejects++;reply(false,G.current!=="enemy"?"not your turn":"please wait");return;}
     const err=netValidate(m);if(err){NET.stats.rejects++;NET.stats.rejectMsgs.push("link: "+err);reply(false,err);return;}
     G.busy=true;render();
     try{await activateLink("enemy");}catch(e){if(e!==ABORT)console.error(e);}
     finally{if(G&&G.net&&!G.over&&G.current==="enemy")G.busy=false;if(G)render();reply(true);}};}
  {const b=netGuestFx;netGuestFx=function(m){if(m&&m.k==="link"){NET.stats.fx.link=(NET.stats.fx.link||0)+1;if(!NET.duelView||!G||!G.guest)return;netRenderNow();
       const s=m.s==="player"||m.s==="enemy"?netMir(m.s):null;if(s)Promise.resolve(linkCutscene(s)).catch(()=>{});return;}return b.apply(this,arguments);};}
  /* the netGuestMsg dispatcher may hold a direct reference to the original netGuestFx; route fx through the wrapper */
  {const gm=window.netGuestMsg;if(typeof gm==="function")window.netGuestMsg=function(m){if(m&&m.t==="fx"&&m.k==="link"){netGuestFx(m);return;}return gm.apply(this,arguments);};}
  /* guest bot: let it use its link like the offline AI */
  {const b=netGuestBotTurn;netGuestBotTurn=async function(){try{if(G&&G.guest&&G.current==="player"&&canLink("player")){const L=LINKS[S("player").char];
        const sc=L&&L.ai?L.ai("player",G.phase==="main2"?2:1):0;if(sc>=55)await netIntent("link",{});}}catch(e){if(e!==ABORT)console.error(e);}
      return b.apply(this,arguments);};}
}
/* guest bot watchdog (test bots only): if the bot finished its routine but the turn did not move on
   (e.g. an intent was rejected while the host was busy with a cutscene), run the routine again. */
setInterval(()=>{try{if(!NET.botGuest||NET.role!=="guest"||!G||!G.guest||G.over||!NET.connected){NET.bwd=null;return;}
  const idle=G.current==="player"&&!NET.botRunning&&NET.pend.size===0&&NET.lastSnap&&!NET.lastSnap.g.busy&&NET.botTurnDone===G.turn&&G.ui.mode!=="discard";
  const k=idle?G.turn+"|"+G.phase+"|"+(NET.lastSnap&&NET.lastSnap.seq):null;
  if(!k){NET.bwd=null;return;}
  if(!NET.bwd||NET.bwd.k!==k){NET.bwd={k,n:0};return;}
  if(++NET.bwd.n>=3){NET.bwd=null;NET.stats.botRetries=(NET.stats.botRetries||0)+1;NET.botTurnDone=-1;netBotCheck();}}catch(e){}},2000);
/* ================= v9: plain VS screen + DUEL!, circle lobby picker, menu card rain (online) ================= */
if(typeof vsHold==="function"){
  /* VS screen (user change): no catchphrases at all - no captions, bubbles, typewriter or voice blips; the portraits stay
     uncovered. Both screens show the plain VS presentation. Host (authoritative): the duel starts after the VS hold
     (or on click) with DUEL!; the guest shows DUEL! (and its local start jingle) when the host's duel arrives. */
  {const b=netVersus;netVersus=function(lch,lname,rch,rname,arena,cb){b.apply(this,arguments);clearTimeout(NET.vsT);
     const v=$("#versus");if(!v)return;try{if(NET.vsCtl)NET.vsCtl.stop();}catch(e){}
     const sp=Math.min(1,NET.speed||1);const n=NET.duelNo;let gone=false;
     if(cb){const sk=document.createElement("div");sk.className="skip";sk.textContent="Click to skip";v.appendChild(sk);}
     const go=()=>{if(gone)return;gone=true;try{ctl.stop();}catch(e){}clearTimeout(NET.vsT);v.onclick=null;
       if(n!==NET.duelNo)return;try{duelBang(false);}catch(e){}cb();};
     const ctl=vsHold(v,{speed:sp,onEnd:cb?go:null});
     NET.vsCtl=ctl;window.__vs9=ctl;
     if(cb){v.onclick=go;NET.vsT=setTimeout(go,ctl.total*sp+1500);}   /* safety net */
     else v.onclick=null;};}
  /* guest: when the host's duel replaces the versus screen, stop the VS hold and show DUEL! (the start jingle plays locally: the host's jingle fires before its stream is live) */
  {const b=showScreen;showScreen=function(name){const was=CUR;const r=b.apply(this,arguments);
     try{if(was==="versus"&&name!=="versus"&&NET.vsCtl){NET.vsCtl.stop();if(NET.role==="guest"&&name==="duel")duelBang(true);NET.vsCtl=null;}}catch(e){}return r;};}
  /* lobby: the portrait grid becomes a "choose duelist" button that opens the same circle picker as offline */
  {const b=netPickHTML;netPickHTML=function(){let h=b.apply(this,arguments);const me=NET.me,C=CHARS[me.ch]||CHARS.you;
     const btn=`<div class="nring" style="--c:${C.color}"><img src="${PORTRAITS[C.img]}" alt=""><button class="btn ${me.ready?"":"gold"}" id="np-ring" ${me.ready?"disabled":""}>◎ Choose duelist</button></div>`;
     return h.replace(/<div class="ntiles">[\s\S]*?<\/div>(?=\s*<div class="nfield"><label>Duelist)/,btn);};}
  function netOpenRing(){const me=NET.me;if(me.ready)return;const host=$("#online");if(!host)return;let ov=$("#ringov");if(ov)ov.remove();
    ov=document.createElement("div");ov.id="ringov";host.appendChild(ov);let cur=me.ch;
    const close=()=>{ov.remove();};
    ringMount(ov,{title:"CHOOSE YOUR DUELIST",sub:"Rotate the circle and pick your duelist.",initial:me.ch||"you",btnClass:"gold",
      detail:c=>{const s=SEL.step;SEL.step=2;try{return detailHTML(c);}finally{SEL.step=s;}},
      onChange:c=>{cur=c;},confirmLabel:c=>({ok:!!c&&c!=="random",text:"✔ Use this duelist"}),
      onConfirm:c=>{close();if(me.ready)return;me.ch=c;if(me.deck==="custom"&&!savedDeck(me.ch))me.deck="default";if(me.deck==="list")me.deck="default";netRenderOnline();netPickChanged();},
      onBack:()=>close()});
    const bk=ov.querySelector("#sel-back");if(bk)bk.textContent="◀ Cancel";}
  window.netOpenRing=netOpenRing;
  /* lobby (default): the fighting-game style select as a full-stage overlay. P1 = you (cursor/hover), P2 = the opponent's
     current pick, refreshed live from the room. Kelvin / Wei Yao mode swap (⇄ icon or M) works the same for host and guest. */
  function netOpenFight(){const me=NET.me;if(me.ready||typeof fightMount!=="function")return;let ov=$("#fightov");if(ov)ov.remove();
    ov=document.createElement("div");ov.id="fightov";($("#app")||document.body).appendChild(ov);
    const close=()=>{ov.remove();};
    fightMount(ov,{title:"CHOOSE YOUR DUELIST",sub:"Online duel · pick your duelist. Your opponent's pick shows on the right.",initial:me.ch||"you",okText:"✔ Use this duelist",
      p2:()=>NET.opp?{ch:NET.opp.ch,ready:NET.opp.ready}:null,
      onConfirm:c=>{close();if(me.ready)return;me.ch=c;if(me.deck==="custom"&&!savedDeck(me.ch))me.deck="default";if(me.deck==="list")me.deck="default";netRenderOnline();netPickChanged();},
      onBack:()=>close()});}
  window.netOpenFight=netOpenFight;
  const netOpenPicker=()=>{if(window.SELECT_STYLE==="circle"||typeof fightMount!=="function")netOpenRing();else netOpenFight();};
  window.netOpenPicker=netOpenPicker;
  /* keep the overlay in step with the room: refresh the opponent side, close it when the lobby goes away or you are ready */
  {const b=netRenderOnline;netRenderOnline=function(){const r=b.apply(this,arguments);const ov=$("#fightov");
     if(ov){if(NET.view!=="pick"||NET.me.ready||CUR!=="online")ov.remove();else if(typeof fightP2Refresh==="function")fightP2Refresh();}return r;};}
  {const b=showScreen;showScreen=function(name){const ov=$("#fightov");if(ov&&name!=="online")ov.remove();return b.apply(this,arguments);};}
  {const b=netBindPick;netBindPick=function(){const r=b.apply(this,arguments);const x=$("#np-ring");if(x){x.onclick=()=>netOpenPicker();if(window.SELECT_STYLE!=="circle")x.textContent="⚔ Choose duelist";}
     const im=document.querySelector("#online .nring img");if(im)im.onclick=()=>netOpenPicker();return r;};}
  {const st=document.createElement("style");st.textContent=`#ringov{position:absolute;inset:0;z-index:400}
#fightov{position:absolute;inset:0;z-index:400}
#online .nring{display:flex;align-items:center;gap:14px;margin:8px 0}
#online .nring img{width:74px;height:98px;object-fit:cover;object-position:50% 14%;border-radius:10px;border:2px solid var(--c);box-shadow:0 0 14px var(--c);cursor:pointer}
#versus .skip{position:absolute;bottom:10px;left:0;right:0;text-align:center;font-size:12px;opacity:.6;pointer-events:none}`;document.head.appendChild(st);}
}

/* ================= v9f: online STAGE SELECT - the host picks the stage, the guest watches and waits =================
   Flow: both ready -> host: stage select (k_stage.js stageMount, with "home" + random + every arena)
         guest: the same screen read-only with "HOST IS CHOOSING THE STAGE..." and the host's cursor mirrored live.
   Messages (host -> guest): stagewait {p1,p2,k}, stagecur {k}, stagepick {k}, stagecancel. Then the usual "start" -> VS.
   The host's choice becomes NET.cfg.arena for netHostStartDuel ("home" still resolves to one of the two home arenas).
   Bots (NET.botHost) and the test API's cfg() (NET.autoStage) skip the screen and use NET.cfg.arena, as the old lobby dropdown did. */
(function(){
  if(typeof stageMount!=="function")return;
  NET.stage=null;NET.stageLog=[];
  function ov(){let o=$("#stageov");if(!o){o=document.createElement("div");o.id="stageov";$("#app").appendChild(o);}return o;}
  function netStageClose(){const s=NET.stage;NET.stage=null;if(s&&s.api&&!s.api.done)s.api.close();const o=$("#stageov");if(o)o.remove();}
  window.netStageClose=netStageClose;
  const baseStart=netHostStartDuel;
  netHostStartDuel=function(){
    if(NET.role!=="host"||NET.inDuel||NET.botHost||NET.autoStage||NET.stageChosen){NET.stageChosen=false;return baseStart.apply(this,arguments);}
    const H=NET.me,O=NET.opp;if(!O||!CHARS[H.ch]||!CHARS[O.ch])return;
    if(NET.stage)return;                                           /* already open (a repeated netMaybeStart) */
    const init=NET.cfg.arena==="random"||ARENAS[NET.cfg.arena]?NET.cfg.arena:"home";
    const api=stageMount(ov(),{p1:H.ch,p2:O.ch,home:true,initial:init,okText:"⚔ SELECT STAGE",
      onMove:k=>netSend({t:"stagecur",k}),
      onPick:k=>{NET.stageLog.push("pick:"+k);netSend({t:"stagepick",k});},
      onBack:()=>{netStageClose();netSend({t:"stagecancel"});
        if(typeof CUR!=="undefined"&&CUR==="online"){NET.me.ready=false;netRenderOnline();netPickChanged();}else netGoRepick(true);},
      onConfirm:k=>{if(!NET.stage||NET.stage.api!==api)return;
        if(!NET.connected||!NET.opp||!NET.opp.ready){netStageClose();return;}
        NET.cfg.arena=k;NET.stageChosen=true;netStageClose();netHostStartDuel();}});
    NET.stage={role:"host",api};NET.stageLog.push("open:host");
    netSend({t:"stagewait",p1:O.ch,p2:H.ch,k:api.cur});
  };
  function guestOpen(m){netStageClose();if(!CHARS[m.p1]||!CHARS[m.p2])return;
    const api=stageMount(ov(),{p1:m.p1,p2:m.p2,home:true,initial:m.k,view:true,title:"SELECT STAGE",wait:"HOST IS CHOOSING THE STAGE..."});
    NET.stage={role:"guest",api};NET.stageLog.push("open:guest");}
  const gm=window.netGuestMsg;window.netGuestMsg=function(m){
    if(m&&typeof m.t==="string"&&m.t.startsWith("stage")){
      const s=NET.stage;
      if(m.t==="stagewait")guestOpen(m);
      else if(m.t==="stagecur"){if(s&&s.role==="guest")s.api.set(m.k);}
      else if(m.t==="stagepick"){NET.stageLog.push("pick:"+m.k);if(s&&s.role==="guest")s.api.pick(m.k);}
      else if(m.t==="stagecancel")netStageClose();
      return;}
    if(m&&(m.t==="start"||m.t==="resync")&&NET.stage)netStageClose();
    return gm.apply(this,arguments);};
  const hm=window.netHostMsg;window.netHostMsg=function(m){const r=hm.apply(this,arguments);
    if(m&&m.t==="pick"&&NET.stage&&NET.stage.role==="host"&&!(NET.opp&&NET.opp.ready)){netStageClose();netSend({t:"stagecancel"});}
    return r;};
  /* the screen never outlives its context: leaving the lobby / a lost connection / any other screen closes it */
  const ro=netRenderOnline;netRenderOnline=function(){const r=ro.apply(this,arguments);
    if(NET.stage&&(NET.view!=="pick"||!NET.connected))netStageClose();
    /* the lobby's arena dropdown is replaced by the stage select */
    const a=$("#np-arena");if(a&&a.closest(".nfield"))a.closest(".nfield").style.display="none";
    const t=document.querySelector("#online .nopts.onsmall");if(t&&/Arena:/.test(t.innerHTML))t.innerHTML=t.innerHTML.replace(/Arena: <b>.*?<\/b>/,"Stage: <b>picked by the host on the stage select</b>");
    return r;};
  const ss=showScreen;showScreen=function(n){if(NET.stage&&n!=="online"&&n!=="duel")netStageClose();return ss.apply(this,arguments);};
  const nl=netLost;netLost=function(){const r=nl.apply(this,arguments);if(NET.stage)netStageClose();return r;};
  if(window.__adcNet){const c=__adcNet.cfg;__adcNet.cfg=o=>{NET.autoStage=!(o&&o.stage===true);return c(o);};
    __adcNet.autoStage=on=>{NET.autoStage=!!on;};
    __adcNet.stage=()=>({open:!!NET.stage,role:NET.stage&&NET.stage.role,cur:NET.stage&&NET.stage.api.cur,log:NET.stageLog.slice()});
    __adcNet.stagePick=k=>{const s=NET.stage;if(!s||s.role!=="host")return false;if(k)s.api.set(k);s.api.confirm();return true;};}
})();

/* ================= v13: ONLINE TAG DUEL (2 vs 2, host + up to 3 guests) =================
   Own PeerJS room space ("adctag-v1-" + code) so 1v1 rooms are untouched; NET.role stays null, so every 1v1
   wrapper above stays inert. HOST-AUTHORITATIVE: the host runs l_tag.js (all rules + AI seats). Guests send
   intents / answers; the host validates them for the sender's seat and streams a per-seat redacted snapshot:
   own hand only (partner + rivals = counts), rival face-down cards as stubs, team field + graveyards public.
   Guests on Team B get a mirrored view (their team at the bottom): sides swapped and seat indices 0<->1, 2<->3. */
const TN_CFG={prefix:"adctag-v1-",ver:1,respSec:25,choiceSec:30,pickSec:20,discardSec:30,turnSec:150,snapMs:80,lostMs:12000,pingMs:2000};
const TN_KEYS=["A1","B1","A2","B2"];
const TN_JOIN=[2,1,3];
const TN={role:null,peer:null,code:null,conns:new Map(),hostConn:null,mySeat:0,slots:null,chars:null,inDuel:false,leaving:false,
  name:"",ready:false,pid:0,iid:0,pend:new Map(),hp:new Map(),bot:false,botRunning:false,botTurnDone:-1,botDisc:false,glog:[],
  rDisc:null,flushT:null,lastFlush:0,tick:null,lastRx:0,lastTx:0,status:"",duelNo:0,start:null,duelView:false,tStart:{seat:-1,turn:-1,at:0},
  overShown:false,lastOver:null,speed:null,notices:[],
  stats:{snaps:0,snapBytes:0,intents:0,rejects:0,rejectMsgs:[],prompts:0,resps:0,choices:0,picks:0,discards:0,takeovers:0,links:0,fx:0,notices:0,turnsMine:0,errors:[]}};
const tnHostLive=()=>TN.role==="host"&&TN.inDuel&&!!G&&!!G.tag&&!!G.net&&!G.tnGuest&&!!(G.tag.cfg&&G.tag.cfg.net);
const tnGL=()=>TN.role==="guest"&&!!G&&!!G.tnGuest;
function tnToast(x){try{toast(x);}catch(e){}}
function tnSafeStr(v){return typeof v==="string"&&/^[\p{L}\p{N} _.,'!?:+\-()&#%/]{0,80}$/u.test(v);}
/* ---------- view mapping for a recipient seat ---------- */
function tnX(v){const st=G.tag.seats[v];const mir=!!st&&st.team==="enemy";return {v,mir,team:st?st.team:"player",M:s=>mir?netMir(s):s,P:i=>typeof i==="number"&&i>=0&&i<4&&mir?i^1:i};}
function tnCO(c,vis,X){if(!c)return null;
  if(!vis){const o={u:c.uid,h:1,p:c.pos,o:X.M(c.owner),se:c.setTurn};if(typeof c.seat==="number")o.sx=X.P(c.seat);return o;}
  const base=CARDS[c.id]||{};const o={u:c.uid,i:c.id};
  for(const k in c){if(k==="uid"||k==="id")continue;const v=c[k];if(v!==null&&typeof v==="object")continue;if(typeof v==="function")continue;if(base[k]!==v)o[k]=v;}
  if(o.owner!=null)o.owner=X.M(o.owner);if(typeof o.seat==="number")o.seat=X.P(o.seat);return o;}
function tnCardIn(o){if(!o)return null;
  if(o.h||!CARDS[o.i]){const s=netStub(+o.u||0,o.o==="enemy"?"enemy":"player",o);if(typeof o.sx==="number")s.seat=o.sx;return s;}
  const c=Object.assign({},CARDS[o.i],{uid:+o.u,id:o.i});
  for(const k in o){if(k==="u"||k==="i"||k==="h")continue;const v=o[k];
    if(typeof v==="number"||typeof v==="boolean"||v===null)c[k]=v;else if(typeof v==="string"&&(NET_STRKEYS[k]?NET_STRKEYS[k](v):tnSafeStr(v)))c[k]=v;}
  return c;}
function tnVis(c,v){if(!c)return false;const f=find(c.uid);if(!f)return true;if(f.zone==="gy")return true;
  if(f.zone==="hand"||f.zone==="deck")return c.seat===v;if(c.faceUp)return true;return f.side===G.tag.seats[v].team;}
function tnSnapFor(v){const t=G.tag,X=tnX(v);
  const fld=team=>{const sd=G.sides[team];const vis=c=>team===X.team||c.faceUp;
    return {mon:sd.monsters.map(c=>c?tnCO(c,vis(c),X):null),st:sd.st.map(c=>c?tnCO(c,vis(c),X):null),gy:sd.gy.map(c=>tnCO(c,true,X))};};
  const seats=[0,1,2,3].map(j=>{const h=X.P(j);const st=t.seats[h];const lk={};for(const k in (st.lk||{}))if(typeof st.lk[k]==="number"||typeof st.lk[k]==="boolean")lk[k]=st.lk[k];
    return {key:st.key,team:X.M(st.team),char:st.char,name:st.name,lp:st.lp,ns:st.normalSummoned?1:0,lk,human:st.human?1:0,out:st.out?1:0,outT:st.outT|0,nn:st.netName||"",
      hand:h===v?st.hand.map(c=>tnCO(c,true,X)):st.hand.length,deck:st.deck.length};});
  const ts=t.seats[t.turnSeat];
  const tl=ts&&ts.human&&ts.i!==t.view&&TN.tStart.seat===ts.i?Math.max(0,Math.round(TN_CFG.turnSec-(Date.now()-TN.tStart.at)/1000)):-1;
  return {g:{turn:G.turn,cur:X.M(G.current),phase:G.phase,over:G.over?1:0,busy:G.busy?1:0,win:G.winner?X.M(G.winner):null,be:G.battleEnded?1:0,arena:G.arena,n:TN.duelNo,tl},
    t:{act:{player:X.P(t.act[X.M("player")]),enemy:X.P(t.act[X.M("enemy")])},order:t.order.map(X.P),pos:t.pos,round:t.round,turnSeat:X.P(t.turnSeat),view:X.P(v)},
    seats,P:fld(X.M("player")),E:fld(X.M("enemy")),gd:TN.rDisc&&TN.rDisc.seat===v?1:0,ps:G.passTurn};}
/* ---------- transport ---------- */
function tnSend(rec,o){const c=rec&&rec.conn;if(!c||!c.open)return false;try{c.send(o);return true;}catch(e){return false;}}
function tnGSend(o){const c=TN.hostConn;if(!c||!c.open)return false;try{c.send(o);TN.lastTx=Date.now();return true;}catch(e){return false;}}
function tnRecs(){return [...TN.conns.values()].filter(r=>r.seat!=null&&r.conn&&r.conn.open);}
function tnRecOf(seat){return tnRecs().find(r=>r.seat===seat)||null;}
function tnBcast(f){for(const r of tnRecs()){const o=typeof f==="function"?f(r):f;if(o)tnSend(r,o);}}
function tnSchedule(){if(TN.flushT)return;const w=Math.max(0,TN_CFG.snapMs-(Date.now()-TN.lastFlush));TN.flushT=setTimeout(()=>{TN.flushT=null;tnFlush();},w);}
function tnFlushTo(rec,force){if(!tnHostLive()||!rec||rec.seat==null)return;let s;try{s=JSON.stringify(tnSnapFor(rec.seat));}catch(e){console.error(e);return;}
  if(!force&&s===rec.lastSnap)return;if(s===rec.lastSnap&&force)return;rec.lastSnap=s;TN.stats.snaps++;TN.stats.snapBytes+=s.length;tnSend(rec,{t:"snap",s});}
function tnFlush(){TN.lastFlush=Date.now();if(TN.flushT){clearTimeout(TN.flushT);TN.flushT=null;}if(!tnHostLive())return;for(const r of tnRecs())if(TN.inDuel&&r.inDuel)tnFlushTo(r);}
/* ---------- log rewriting (each seat sees only its own draws / searched cards) ---------- */
function tnLogFor(msg,r){const t=G.tag;if(!t)return msg;const me=t.seats[r];
  if(msg.startsWith("You draw ")){const d=t.seats[t.act.player];return d&&d.i===r?msg:(d?d.name:"Team A")+" draws a card.";}
  if(msg==="You enter the Battle Phase."){const d=t.seats[t.turnSeat];return d&&d.i===r?msg:(d?d.name:"?")+" enters the Battle Phase.";}
  for(const st of t.seats){
    if(msg===st.name+" draws a card."&&st.i===r){const c=st.hand[st.hand.length-1];return c?"You draw "+c.name+".":msg;}
    if(st.i!==r&&msg.startsWith(st.name+" adds ")&&msg.endsWith(" to their hand.")&&msg!==st.name+" adds a card to their hand.")return st.name+" adds a card to their hand.";}
  return msg;}
const tnMirCls=(c,X)=>X.mir?(c==="p"?"e":c==="e"?"p":c):c;
function tnTurnBanner(r){const t=G.tag;const cur=t.seats[t.turnSeat];const me=t.seats[r];if(!cur||!me)return null;
  return {x:cur.i===r?"YOUR TURN":cur.name.toUpperCase()+"'S TURN",c:cur.team===me.team?"#3fa9ff":"#ff4b5c"};}

/* ================= HOST: engine wrappers ================= */
(function(){
  const bIsAI=netIsAI;netIsAI=function(s){if(G&&G.tag&&G.tag.cfg&&G.tag.cfg.net){if(G.tnGuest)return false;const t=G.tag;const st=t.seats[t.act[s]];return !st||!st.human;}return bIsAI(s);};
  const bHT=humanTurn;humanTurn=function(){const r=bHT.apply(this,arguments);if(r&&G&&G.tag&&G.tag.cfg&&G.tag.cfg.net&&!G.tnGuest)return G.tag.turnSeat===G.tag.view;return r;};
  const bR=render;render=function(){const r=bR.apply(this,arguments);if(tnHostLive()){tnHostInit();tnSchedule();}return r;};
  const bL=log;log=function(msg,cls){if(!tnHostLive()||typeof msg!=="string")return bL.apply(this,arguments);const t=G.tag;
    let out=msg;try{out=tnLogFor(msg,t.view);}catch(e){}bL.call(this,out,cls);
    tnFlush();
    for(const r of tnRecs()){let m=msg;try{m=tnLogFor(msg,r.seat);}catch(e){}tnSend(r,{t:"log",m,c:tnMirCls(cls||"",tnX(r.seat))});}
    if(msg.startsWith("✦ CHRONICLES LINK ✦")){const st=t.seats.find(x=>msg.indexOf(" "+x.name+":")>0);if(st){TN.stats.links++;for(const r of tnRecs())tnSend(r,{t:"fx",k:"link",s:tnX(r.seat).M(st.team)});}}};
  const bB=banner;banner=function(text,color){if(tnHostLive()&&typeof text==="string"){const t=G.tag;const turnB=/^YOUR TURN$|'S TURN$/.test(text);
      tnFlush();
      for(const r of tnRecs()){const b=turnB?tnTurnBanner(r.seat):null;tnSend(r,{t:"fx",k:"banner",x:b?b.x:text,c:b?b.c:(color||null)});}
      if(turnB){const b=tnTurnBanner(t.view);if(b){text=b.x;color=b.c;}}}
    return bB.call(this,text,color);};
  if(typeof AUDIO!=="undefined"&&AUDIO&&typeof AUDIO.play==="function"){const bP=AUDIO.play.bind(AUDIO);
    AUDIO.play=function(n){if(tnHostLive()&&typeof n==="string"&&n!=="hover"&&n!=="click")tnBcast({t:"fx",k:"sfx",n});return bP.apply(null,arguments);};}
  const bPR=promptResponse;promptResponse=function(r,kind,ctx,traps,quicks){
    if(tnHostLive()){const t=G.tag;const st=t.seats[t.act[r]];if(st&&st.human&&st.i!==t.view){const rec=tnRecOf(st.i);if(rec)return tnRemotePrompt(rec,st,kind,ctx,traps,quicks);return Promise.resolve(null);}}
    return bPR.apply(this,arguments);};
  window.tnOrigPrompt=bPR;
  const bRC=window.requestChoice;window.tnOrigChoice=bRC;
  if(typeof bRC==="function")window.requestChoice=function(side,options,meta){
    if(tnHostLive()&&Array.isArray(options)&&options.length){const t=G.tag;const st=t.seats[t.act[side]];
      if(st&&st.human&&st.i!==t.view){const rec=tnRecOf(st.i);if(rec)return tnRemoteChoice(rec,st,options,meta);}}
    return bRC.apply(this,arguments);};
  window.tagRemotePick=function(chooser,team,title,sub,amount){if(!tnHostLive())return Promise.resolve(null);const rec=tnRecOf(chooser.i);if(!rec)return Promise.resolve(null);
    return tnRemotePick(rec,chooser,team,title,sub,amount);};
  const bEP=endPhase;endPhase=async function(side){
    if(tnHostLive()&&!G.over){const t=G.tag;const st=t.seats[t.turnSeat];
      if(st&&st.team===side&&st.human&&st.i!==t.view&&st.hand.length>HAND_LIMIT){const rec=tnRecOf(st.i);if(rec){window.TAGAPI.setAct(st.team,st.i);await tnRemoteDiscard(rec,st);window.TAGAPI.setAct(st.team,st.i);}}}
    return bEP.apply(this,arguments);};
  const bSR=window.tagShowResult;window.tagShowResult=function(w,reason){
    if(TN.role==="host"&&G&&G.tag&&G.tag.cfg&&G.tag.cfg.net){tnFlush();TN.lastOver={w,r:String(reason||"")};tnBcast(r=>({t:"over",w:w?tnX(r.seat).M(w):null,r:String(reason||"")}));}
    return bSR.apply(this,arguments);};
  window.tagNetLeave=function(){if(TN.role)tnLeave(false);};
})();
function tnHostInit(){const t=G.tag;if(t._tn)return;t._tn=1;for(const s of TN.slots.keys()){const sl=TN.slots[s];if(sl.kind==="host"||sl.kind==="guest")t.seats[s].netName=sl.name;}}
function tnWait(x){let w=document.getElementById("tnwait");if(!x){if(w)w.remove();return;}
  if(!w){w=document.createElement("div");w.id="tnwait";($("#app")||document.body).appendChild(w);}w.textContent=x;}
function tnHostResolve(id,val){const p=TN.hp.get(id);if(!p)return;TN.hp.delete(id);clearTimeout(p.to);if(!TN.hp.size)tnWait(null);try{p.fin(val);}catch(e){console.error(e);}}
function tnRemotePrompt(rec,st,kind,ctx,traps,quicks){TN.stats.prompts++;return new Promise(res=>{const id=++TN.pid;const sec=TN_CFG.respSec;const opts=[...traps,...quicks];
  const msg={t:"prompt",id,kind,att:ctx.att?ctx.att.uid:0,tgt:ctx.tgt?ctx.tgt.uid:0,sum:ctx.summoned?ctx.summoned.uid:0,sp:ctx.spell?ctx.spell.uid:0,traps:traps.map(c=>c.uid),quicks:quicks.map(c=>c.uid),sec};
  TN.hp.set(id,{seat:st.i,kind:"prompt",fin:v=>{let c=null;if(v&&v.c)c=opts.find(x=>x.uid===v.c)||null;if(v&&v.pass&&!c&&G)G.passTurn=G.turn;res(c);},to:setTimeout(()=>tnHostResolve(id,null),(sec+5)*1000)});
  tnFlushTo(rec,true);tnSend(rec,msg);tnWait(st.name+" may respond...");});}
function tnOptOut(o,v){const X=tnX(v);
  if(o&&typeof o==="object"&&o.uid!=null&&(o.id||o.hidden))return {c:tnCO(o,tnVis(o,v),X)};
  if(o&&typeof o==="object"){const r={};for(const k of ["hidden","note","zone","label","text","name","value","desc","disabled"]){const x=o[k];if(x!=null&&typeof x!=="object"&&typeof x!=="function")r[k]=x;}
    if(o.card&&!tnVis(o.card,v))r.hidden=true;if(o.card&&o.card.uid!=null)r.card=tnCO(o.card,tnVis(o.card,v),X);return {o:r};}
  return {v:o==null?null:(typeof o==="number"||typeof o==="boolean")?o:String(o)};}
function tnOptIn(x){if(!x)return null;if(x.c)return tnCardIn(x.c);if(x.o){const r=Object.assign({},x.o);for(const k in r)if(typeof r[k]==="string")r[k]=netEsc(r[k].slice(0,200));
    if(r.card&&typeof r.card==="object")r.card=tnCardIn(x.o.card);else delete r.card;r.hidden=!!r.hidden||!!(r.card&&r.card.hidden);return r;}return x.v;}
function tnMetaOut(m,v){const r={};if(!m||typeof m!=="object")return r;const X=tnX(v);for(const k in m){const x=m[k];if(x==null||typeof x==="function")continue;
    if(typeof x!=="object")r[k]=x;else if(x.uid!=null)r[k]={__card:tnCO(x,tnVis(x,v),X)};}return r;}
function tnMetaIn(m){const r={};for(const k in (m||{})){const v=m[k];if(v&&typeof v==="object"&&v.__card)r[k]=tnCardIn(v.__card);
    else if(typeof v==="string")r[k]=netEsc(v.slice(0,300));else if(typeof v==="number"||typeof v==="boolean")r[k]=v;}return r;}
function tnRemoteChoice(rec,st,options,meta){TN.stats.choices++;return new Promise(res=>{const id=++TN.pid;const sec=TN_CFG.choiceSec;
  const msg={t:"choice",id,opts:options.map(o=>tnOptOut(o,st.i)),meta:tnMetaOut(meta,st.i),sec};
  const multi=!!(meta&&(meta.multi||meta.max>1||meta.count>1));
  TN.hp.set(id,{seat:st.i,kind:"choice",fin:idx=>{let r=netChoiceRes(idx==null?null:idx,options,meta);
      if(r==null&&!(meta&&(meta.optional||meta.cancel||meta.canCancel)))r=multi?options.slice(0,Math.max(1,+meta.min||+meta.count||1)):(options[0]&&options[0].card?options[0].card:options[0]);res(r);},
    to:setTimeout(()=>{tnSend(rec,{t:"choiceEnd",id});tnHostResolve(id,null);},(sec+5)*1000)});
  tnFlushTo(rec,true);tnSend(rec,msg);tnWait(st.name+" is choosing...");});}
function tnRemotePick(rec,chooser,team,title,sub,amount){TN.stats.picks++;return new Promise(res=>{const id=++TN.pid;const sec=TN_CFG.pickSec;const X=tnX(chooser.i);
  TN.hp.set(id,{seat:chooser.i,kind:"pick",fin:s=>{const t=G&&G.tag;const st=t&&typeof s==="number"?t.seats[X.P(s)]:null;res(st&&st.team===team&&!st.out?st:null);},
    to:setTimeout(()=>{tnSend(rec,{t:"pickEnd",id});tnHostResolve(id,null);},(sec+5)*1000)});
  tnFlushTo(rec,true);tnSend(rec,{t:"pick",id,team:X.M(team),title:String(title||""),sub:String(sub||""),amount:+amount||0,sec});tnWait(chooser.name+" is choosing an opponent...");});}
function tnRemoteDiscard(rec,st){TN.stats.discards++;return new Promise(res=>{TN.rDisc={seat:st.i,res,to:setTimeout(()=>tnAutoDiscard(),TN_CFG.discardSec*1000)};
  render();tnFlushTo(rec,true);tnWait(st.name+" is discarding down to "+HAND_LIMIT+" cards...");});}
function tnAutoDiscard(){const d=TN.rDisc;if(!d||!G||!G.tag)return;const st=G.tag.seats[d.seat];window.TAGAPI.setAct(st.team,st.i);
  while(st.hand.length>HAND_LIMIT)discard(st.team,aiDiscardPick(st.team).uid);tnFinishDiscard();}
function tnFinishDiscard(){const d=TN.rDisc;if(!d)return;TN.rDisc=null;clearTimeout(d.to);tnWait(null);render();tnFlush();d.res();}
/* ---------- intents ---------- */
function tnValidate(s,m){const o=other(s),sd=S(s);const num=x=>typeof x==="number"&&isFinite(x);
  const inHand=uid=>sd.hand.find(c=>c.uid===uid);const pref=p=>num(p)&&p>=0&&p<5?p:null;
  switch(m.a){
    case "summon":{if(!inMain())return "not in a Main Phase";const c=inHand(m.uid);if(!c||c.type!=="monster")return "no such monster in hand";
      if(!canNormalSummon(s,c))return "cannot Normal Summon now";const need=tributesNeeded(c);const tr=Array.isArray(m.tr)?[...new Set(m.tr.filter(num))]:[];
      if(tr.length!==need)return "wrong number of tributes";for(const t of tr){const f=find(t);if(!f||f.side!==s||f.zone!=="monsters")return "invalid tribute";}
      m.tr=tr;m.set=!!m.set;m.pref=pref(m.pref);return null;}
    case "set":{if(!inMain())return "not in a Main Phase";const c=inHand(m.uid);if(!c||c.type==="monster")return "no such card in hand";if(freeIdx(sd.st)<0)return "no free Spell & Trap Zone";m.pref=pref(m.pref);return null;}
    case "spell":{const f=find(m.uid);if(!f||f.side!==s||(f.zone!=="hand"&&f.zone!=="st"))return "no such spell";const c=f.card;if(c.type!=="spell")return "not a spell";
      if(f.zone==="hand"&&!inHand(m.uid))return "not your card";
      if(!(inMain()||(G.phase==="battle"&&isQuick(c))))return "wrong phase";if(!spellCanActivate(s,c))return "cannot activate now";
      if(!num(m.tgt)||!m.tgt)m.tgt=null;
      const tg=netSpellTargets(s,c);if(tg&&!isQuick(c)){if(!tg.includes(m.tgt))return "invalid target";}else if(!isQuick(c))m.tgt=null;
      m.pref=pref(m.pref);return null;}
    case "pos":{if(!inMain())return "not in a Main Phase";const f=find(m.uid);if(!f||f.side!==s||f.zone!=="monsters")return "no such monster";
      if(f.card.summonedTurn===G.turn||f.card.posChangedTurn===G.turn)return "cannot change position this turn";return null;}
    case "attack":{if(G.phase!=="battle")return "not in the Battle Phase";const f=find(m.uid);if(!f||f.side!==s||f.zone!=="monsters")return "no such monster";if(!canAttackWith(s,f.card))return "that monster cannot attack";
      if(m.tgt){const t=find(m.tgt);if(!t||t.side!==o||t.zone!=="monsters")return "invalid attack target";m.dp=null;}else{m.tgt=null;if(!canGoDirect(s,f.card))return "cannot attack directly";
        const ds=num(m.dp)?G.tag.seats[m.dp]:null;m.dp=ds&&ds.team===o&&!ds.out?ds.i:null;}return null;}
    case "link":return inMain()&&canLink(s)?null:"Link not available";
    case "phase":if(m.p==="battle")return G.phase==="main1"&&G.turn>1?null:"cannot enter the Battle Phase";
      if(m.p==="main2")return G.phase==="battle"?null:"not in the Battle Phase";
      if(m.p==="end")return inMain()||G.phase==="battle"?null:"cannot end the turn now";return "unknown phase";}
  return "unknown action";}
async function tnOnIntent(rec,m){TN.stats.intents++;
  const reply=(ok,err)=>{tnFlushTo(rec,true);tnSend(rec,{t:"done",id:m.id,ok:!!ok,err:err||null});};
  if(!tnHostLive()||G.over){reply(false,"no duel running");return;}
  const t=G.tag;const st=t.seats[rec.seat];if(!st){reply(false,"no seat");return;}
  if(m.a==="discard"){if(!TN.rDisc||TN.rDisc.seat!==st.i){reply(false,"no discard pending");return;}window.TAGAPI.setAct(st.team,st.i);
    const c=st.hand.find(x=>x.uid===m.uid);if(!c){reply(false,"no such card");return;}discard(st.team,c.uid);render();if(st.hand.length<=HAND_LIMIT)tnFinishDiscard();reply(true);return;}
  const rej=e=>{TN.stats.rejects++;TN.stats.rejectMsgs.push(st.key+" "+m.a+": "+e);if(TN.stats.rejectMsgs.length>40)TN.stats.rejectMsgs.shift();reply(false,e);};
  if(t.turnSeat!==st.i||!G.humanEnd||G.current!==st.team){rej("not your turn");return;}
  if(G.busy||TN.rDisc||TN.hp.size){rej("please wait");return;}
  window.TAGAPI.setAct(st.team,st.i);
  const err=tnValidate(st.team,m);if(err){rej(err);return;}
  const s=st.team;
  if(m.a==="phase"){G.ui={mode:null};
    if(m.p==="battle"){G.phase="battle";log(st.name+" enters the Battle Phase.",sc(s));render();}
    else if(m.p==="main2"){G.phase="main2";render();}
    else{G.busy=true;render();if(G.humanEnd)G.humanEnd();}
    reply(true);return;}
  G.busy=true;render();
  try{switch(m.a){case "summon":await normalSummon(s,m.uid,m.tr,m.set,m.pref);break;case "set":await setTrap(s,m.uid,m.pref);break;
      case "spell":await activateSpell(s,m.uid,m.tgt,null,m.pref);break;case "pos":await changePosition(s,m.uid);break;
      case "attack":t.directPick=m.dp;await attack(s,m.uid,m.tgt);t.directPick=null;break;
      case "link":await activateLink(s);break;}}
  catch(e){if(e!==ABORT){console.error(e);TN.stats.errors.push(String(e&&e.message||e).slice(0,120));}}
  finally{if(G&&G.tag===t&&!G.over&&t.turnSeat===st.i&&G.humanEnd)G.busy=false;if(G)render();reply(true);}}
/* ---------- guest dropped mid-duel: an AI takes the seat ---------- */
async function tnTakeover(seat,why){if(!tnHostLive()||G.over)return;const t=G.tag;const st=t.seats[seat];if(!st||!st.human||st.i===t.view)return;
  st.human=false;st.ai=true;st.netName="";TN.stats.takeovers++;
  const txt=`${st.name} ${why||"disconnected"} — AI takes over ${st.key}.`;
  log(txt,"s");tnToast(txt);TN.notices.push(txt);tnBcast({t:"notice",x:txt});
  for(const [id,p] of [...TN.hp])if(p.seat===seat)tnHostResolve(id,null);
  if(TN.rDisc&&TN.rDisc.seat===seat)tnAutoDiscard();
  render();
  if(t.turnSeat===seat&&G.humanEnd){const g=G;let n=0;while(G===g&&G.busy&&n++<200)await realSleep(100);if(G!==g||G.over||t.turnSeat!==seat||!G.humanEnd)return;
    G.busy=true;render();window.TAGAPI.setAct(st.team,st.i);
    try{await aiTurn(st.team);}catch(e){if(e!==ABORT)console.error(e);}
    if(G===g&&!G.over&&G.humanEnd&&t.turnSeat===seat)G.humanEnd();}}
function tnHostTick(){const now=Date.now();
  for(const r of [...TN.conns.values()]){if(r.conn&&r.conn.open&&now-(r.lastTx||0)>=TN_CFG.pingMs){tnSend(r,{t:"ping"});r.lastTx=now;}
    if(now-(r.lastRx||now)>TN_CFG.lostMs)tnGuestGone(r,"timed out");}
  if(tnHostLive()&&!G.over){const t=G.tag;const st=t.seats[t.turnSeat];
    if(TN.tStart.seat!==t.turnSeat||TN.tStart.turn!==G.turn)TN.tStart={seat:t.turnSeat,turn:G.turn,at:now};
    if(st&&st.human&&st.i!==t.view&&G.humanEnd&&!G.busy&&!TN.hp.size&&!TN.rDisc&&now-TN.tStart.at>TN_CFG.turnSec*1000){log(`${st.name}'s time is up.`,"s");G.busy=true;render();G.humanEnd();}
    tnHud();}}

/* ================= HOST: room + lobby ================= */
function tnSlotsInit(){TN.slots=[{kind:"host",name:TN.name,ready:true},{kind:"ai"},{kind:"ai"},{kind:"ai"}];
  const S0=window.TAGSEAT;TN.chars=(S0&&S0.chars?S0.chars.slice():null)||["kaito","ryuga","clement","mira"];}
function tnCreate(name,code,_tries){if(!netHasPeer()){tnStatus("PeerJS library missing - online play unavailable.",true);return;}
  tnReset();TN.role="host";TN.name=netName(name||playerName());TN.code=netCleanCode(code)||netGenCode();tnSlotsInit();
  tnStatus('<span class="onspin"></span>Opening room on the PeerJS server...');
  const p=new Peer(TN_CFG.prefix+TN.code,netPeerOpts());TN.peer=p;
  p.on("open",()=>{if(TN.peer!==p)return;TN.status="Room open. Share the code with up to 3 friends.";tnOpenLobby();});
  p.on("connection",c=>tnIncoming(c));
  p.on("disconnected",()=>{if(TN.peer===p&&!p.destroyed&&!TN.leaving)setTimeout(()=>{try{if(TN.peer===p&&!p.destroyed&&p.disconnected)p.reconnect();}catch(e){}},1500);});
  p.on("error",e=>{if(TN.peer!==p)return;const t=e&&e.type;
    if(t==="unavailable-id"){if(!code&&(_tries||0)<5){tnCreate(name,null,(_tries||0)+1);return;}tnStatus("That room code is already in use.",true);return;}
    if(t==="peer-unavailable")return;if(!TN.inDuel)tnStatus("Connection problem ("+netEsc(t||"error")+"). Check your internet and try again.",true);});
  tnStartTick();}
function tnIncoming(c){if(c.__tn)return;c.__tn=1;c.on("open",()=>{if(c.__tnOpen)return;c.__tnOpen=1;const md=c.metadata||{};const rej=why=>{try{c.send({t:"full",why});}catch(e){}setTimeout(()=>{try{c.close();}catch(e){}},400);};
    if(md.v!==TN_CFG.ver||!md.tag){rej("Version mismatch: everyone please reload the latest game page.");return;}
    if(TN.inDuel){rej("A Tag Duel is already in progress in this room.");return;}
    const free=TN_JOIN.find(i=>TN.slots[i].kind==="open")??TN_JOIN.find(i=>TN.slots[i].kind==="ai");
    if(free==null){rej("This room is full (4 duelists).");return;}
    const rec={conn:c,seat:null,name:"",ready:false,lastRx:Date.now(),lastTx:0,lastSnap:null,inDuel:false,pid:c.peer};
    TN.conns.set(c.peer+":"+c.connectionId,rec);rec.key=c.peer+":"+c.connectionId;rec.wantSeat=free;
    c.on("data",d=>{rec.lastRx=Date.now();try{tnHostMsg(rec,d);}catch(e){console.error(e);}});
    c.on("close",()=>tnGuestGone(rec,"left"));c.on("error",()=>tnGuestGone(rec,"disconnected"));});}
function tnHostMsg(rec,m){if(!m||typeof m!=="object")return;
  switch(m.t){
    case "hello":{if(rec.seat!=null)return;if(tnRecs().some(r=>r!==rec&&r.conn===rec.conn))return;rec.name=netName(m.name);const i=TN.slots[rec.wantSeat]&&(TN.slots[rec.wantSeat].kind==="open"||TN.slots[rec.wantSeat].kind==="ai")?rec.wantSeat:(TN_JOIN.find(j=>TN.slots[j].kind==="open")??TN_JOIN.find(j=>TN.slots[j].kind==="ai"));
      if(i==null||TN.inDuel){tnSend(rec,{t:"full",why:"This room is full."});return;}
      const used=TN.slots.filter(s=>s.kind==="host"||s.kind==="guest").map(s=>s.name);let nm=rec.name,k=2;while(used.includes(nm))nm=rec.name.slice(0,13)+" "+(k++);rec.name=nm;
      rec.seat=i;TN.slots[i]={kind:"guest",name:nm,ready:false,key:rec.key};
      tnSend(rec,{t:"welcome",seat:i,code:TN.code,name:nm});tnToast(nm+" joined as "+TN_KEYS[i]);tnLobbyChanged();return;}
    case "ping":return;
    case "bye":tnGuestGone(rec,"left");return;
    case "pick":if(!TN.inDuel&&rec.seat!=null&&CHARS[m.ch]){TN.chars[rec.seat]=m.ch;tnLobbyChanged();}return;
    case "ready":if(!TN.inDuel&&rec.seat!=null){rec.ready=!!m.on;TN.slots[rec.seat].ready=!!m.on;tnLobbyChanged();}return;
    case "seat":{const i=m.i|0;if(TN.inDuel||rec.seat==null||i<1||i>3||i===rec.seat)return;const s=TN.slots[i];if(s.kind!=="open"&&s.kind!=="ai")return;
      const old=rec.seat;TN.slots[i]=TN.slots[old];TN.slots[old]={kind:"ai"};const ch=TN.chars[old];TN.chars[old]=TN.chars[i];TN.chars[i]=ch;rec.seat=i;tnSend(rec,{t:"welcome",seat:i,code:TN.code,name:rec.name});tnLobbyChanged();return;}
    case "intent":if(typeof m.id==="number")tnOnIntent(rec,m);return;
    case "resp":{const p=TN.hp.get(m.id);if(p&&p.seat===rec.seat&&p.kind==="prompt"){TN.stats.resps++;tnHostResolve(m.id,{c:m.c|0,pass:!!m.pass});}return;}
    case "choiceResp":{const p=TN.hp.get(m.id);if(p&&p.seat===rec.seat&&p.kind==="choice")tnHostResolve(m.id,m.i==null?null:m.i);return;}
    case "pickResp":{const p=TN.hp.get(m.id);if(p&&p.seat===rec.seat&&p.kind==="pick")tnHostResolve(m.id,typeof m.s==="number"?m.s:null);return;}
    case "inDuel":rec.inDuel=true;tnFlushTo(rec,true);return;}}
function tnGuestGone(rec,why){if(!TN.conns.has(rec.key))return;TN.conns.delete(rec.key);try{rec.conn.close();}catch(e){}
  if(TN.role!=="host"||rec.seat==null)return;const seat=rec.seat;rec.seat=null;
  if(TN.inDuel&&G&&G.tag&&!G.over){tnTakeover(seat,why==="left"?"left the room":"disconnected");return;}
  if(!TN.inDuel){tnToast((TN.slots[seat].name||"A friend")+" left the room");TN.slots[seat]={kind:"open"};tnLobbyChanged();}}
function tnLobbyOut(rec){return {t:"lobby",code:TN.code,me:rec?rec.seat:0,slots:TN.slots.map(s=>({k:s.kind,n:s.name||"",r:s.ready?1:0})),chars:TN.chars};}
function tnLobbyChanged(){if(TN.role!=="host")return;for(const r of tnRecs())tnSend(r,tnLobbyOut(r));tnSyncSeatUI();}
/* ---------- seat-select screen (shared by host and guests) ---------- */
function tnWho(i){const s=TN.slots[i];if(!s)return "";return s.kind==="host"?s.name+" · HOST":s.kind==="guest"?s.name+(s.ready?" · ✔ READY":" · not ready"):s.kind==="open"?"Waiting for a friend… (AI if empty)":"AI";}
function tnRoomHTML(){const isH=TN.role==="host";
  const rows=TN.slots.map((s,i)=>`<div class="tnr ${i===TN.mySeat?"me":""}"><b>${TN_KEYS[i]}</b><span>${netEsc(tnWho(i))}${i===TN.mySeat?" (you)":""}</span>${!isH&&i!==TN.mySeat&&(s.kind==="open"||s.kind==="ai")?`<button class="btn sm" data-troom="seat:${i}">Sit here</button>`:""}</div>`).join("");
  return `<div class="tnhead">ROOM CODE <span class="tncode" id="tncode">${netEsc(TN.code)}</span><button class="btn sm" data-troom="copy">Copy</button></div><div class="tnrows">${rows}</div>
   ${isH?`<div class="tnhint">Share the code: friends open TAG DUEL ▸ ONLINE ▸ Join. Tap 👤/🤖 on a seat to open it for a friend or give it to the AI.</div>`:`<button class="btn ${TN.ready?"":"gold"}" data-troom="ready" id="tn-ready">${TN.ready?"✔ READY · tap to undo":"I'M READY"}</button>`}
   <div class="tnst" id="tnst">${TN.status||""}</div>`;}
function tnSyncSeatUI(){const S0=window.TAGSEAT;if(!S0||!TN.slots)return;S0.chars=TN.chars.slice();S0.human=TN.slots.map(s=>s.kind!=="ai");
  if(S0.online){Object.assign(S0.online,{mySeat:TN.mySeat,isHost:TN.role==="host",who:[0,1,2,3].map(tnWho),ready:TN.slots.map(s=>!!s.ready&&s.kind==="guest"),roomHTML:tnRoomHTML()});
    if(S0.cur!==TN.mySeat&&!(TN.role==="host"&&TN.slots[S0.cur]&&TN.slots[S0.cur].kind!=="guest"))S0.cur=TN.mySeat;}
  if(typeof CUR!=="undefined"&&CUR==="tagsel"&&typeof window.renderTagSelect==="function"&&S0.online)window.renderTagSelect();}
function tnOpenLobby(){const S0=window.TAGSEAT;if(!S0)return;S0.chars=TN.chars.slice();S0.human=TN.slots.map(s=>s.kind!=="ai");
  const on={mySeat:TN.mySeat,isHost:TN.role==="host",who:[],ready:[],roomHTML:"",
    onChange:(kind,i)=>tnSeatChange(kind,i),onStart:()=>tnStartClick(),onLeave:()=>tnLeave(false),onRoom:(v,el)=>tnRoomClick(v,el),
    onSeat:i=>{if(TN.role!=="guest")return false;const s=TN.slots[i];if(s&&(s.kind==="open"||s.kind==="ai")){tnGSend({t:"seat",i});return true;}return false;}};
  window.openTagSelect({online:on});tnSyncSeatUI();}
function tnSeatChange(kind,i){const S0=window.TAGSEAT;
  if(TN.role==="guest"){const me=TN.mySeat;if(CHARS[S0.chars[me]]&&S0.chars[me]!==TN.chars[me]){TN.chars[me]=S0.chars[me];tnGSend({t:"pick",ch:TN.chars[me]});}tnSyncSeatUI();return;}
  if(kind==="human"){const s=TN.slots[i];if(s.kind==="guest"){tnToast(s.name+" sits there - they can move with Sit here");}
    else if(s.kind==="ai")TN.slots[i]={kind:"open"};else if(s.kind==="open")TN.slots[i]={kind:"ai"};}
  else if(kind==="swap"){/* online: rotate the non-host seats A2 -> B1 -> B2 -> A2 (the host keeps A1) */
    const sl=TN.slots,ch=TN.chars;TN.slots=[sl[0],sl[2],sl[3],sl[1]];TN.chars=[S0.chars[1],ch[2],ch[3],ch[1]].map((c,k)=>k===0?ch[0]:c);
    for(const r of tnRecs()){const k=TN.slots.findIndex(s=>s.key===r.key);if(k>=0&&k!==r.seat){r.seat=k;tnSend(r,{t:"welcome",seat:k,code:TN.code,name:r.name});}}}
  else{for(let k=0;k<4;k++)if(k===0||TN.slots[k].kind!=="guest")if(CHARS[S0.chars[k]])TN.chars[k]=S0.chars[k];}
  tnLobbyChanged();}
function tnRoomClick(v,el){if(v==="copy"){try{navigator.clipboard.writeText(TN.code);tnToast("Room code copied");}catch(e){tnToast("Room code: "+TN.code);}return;}
  if(v==="ready"&&TN.role==="guest"){TN.ready=!TN.ready;tnGSend({t:"ready",on:TN.ready});TN.slots[TN.mySeat].ready=TN.ready;tnSyncSeatUI();return;}
  if(v.startsWith("seat:")&&TN.role==="guest"){tnGSend({t:"seat",i:+v.slice(5)});return;}}
function tnStartClick(){if(TN.role!=="host")return;const wait=TN.slots.filter(s=>s.kind==="guest"&&!s.ready);
  if(wait.length){tnToast("Waiting for "+wait.map(s=>s.name).join(", ")+" to be ready");TN.status="Waiting for "+wait.map(s=>netEsc(s.name)).join(", ")+" to press I'M READY.";tnSyncSeatUI();return;}
  if(typeof stageMount==="function"){const host=$("#tagsel");window.__stage=stageMount(host,{p1:TN.chars[0],p2:TN.chars[1],initial:null,okText:"⚔ START ONLINE TAG DUEL",
    onBack:()=>tnSyncSeatUI(),onConfirm:k=>tnHostStart(k)});}else tnHostStart(null);}
function tnHostStart(arena){if(TN.role!=="host"||TN.inDuel)return false;
  for(let i=1;i<4;i++)if(TN.slots[i].kind==="open")TN.slots[i]={kind:"ai"};
  const ar=ARENAS[arena]?arena:Object.keys(ARENAS)[Math.floor(Math.random()*Object.keys(ARENAS).length)];
  const human=TN.slots.map((s,i)=>i===0?!TN.bot:s.kind==="guest");const names=TN.slots.map(s=>s.kind==="host"||s.kind==="guest"?s.name:null);
  const chars=TN.chars.map(c=>CHARS[c]?c:"kaito");
  TN.inDuel=true;TN.duelNo++;TN.lastOver=null;TN.notices=[];TN.hp.clear();TN.rDisc=null;TN.tStart={seat:-1,turn:-1,at:0};
  for(const r of tnRecs()){r.lastSnap=null;r.inDuel=false;tnSend(r,{t:"start",n:TN.duelNo,seat:r.seat,chars,names,human:human.map((h,i)=>i===0?true:h),arena:ar,host:TN.name});}
  tnLobbyChanged();
  if(TN.speed!=null)try{SPEED=TN.speed;}catch(e){}
  startTag({chars,human,names:names.map(n=>n||null),net:true,view:0,arena:ar,speed:TN.speed!=null?TN.speed:undefined});
  tnDuelChrome(true);return true;}

/* ================= GUEST ================= */
function tnJoin(code,name){if(!netHasPeer()){tnStatus("PeerJS library missing - online play unavailable.",true);return;}
  code=netCleanCode(code);if(code.length!==6){tnStatus("Room codes have 6 characters.",true);return;}
  tnReset();TN.role="guest";TN.code=code;TN.name=netName(name||playerName());tnStatus('<span class="onspin"></span>Connecting to Tag room '+code+'...');tnGuestAttempt(0);}
function tnGuestAttempt(n){if(TN.role!=="guest")return;try{if(TN.peer)TN.peer.destroy();}catch(e){}
  const p=new Peer(netPeerOpts());TN.peer=p;let done=false;
  const fail=why=>{if(done||TN.peer!==p)return;done=true;try{p.destroy();}catch(e){}
    if(why!=="notfound"&&n<2&&TN.role==="guest"&&!TN.leaving){tnStatus('<span class="onspin"></span>Still connecting (retry '+(n+1)+')...');setTimeout(()=>tnGuestAttempt(n+1),1500);return;}
    tnStatus(why==="notfound"?"Room "+TN.code+" was not found. Check the code (the host must keep the room open).":"Could not reach the room ("+netEsc(why)+").",true);TN.role=null;};
  const to=setTimeout(()=>fail("timeout"),15000);
  p.on("open",()=>{if(TN.peer!==p)return;const c=p.connect(TN_CFG.prefix+TN.code,{reliable:true,serialization:"json",metadata:{v:TN_CFG.ver,tag:1}});
    c.on("open",()=>{if(done||TN.peer!==p)return;done=true;clearTimeout(to);TN.hostConn=c;TN.lastRx=Date.now();
      c.on("data",d=>{if(TN.hostConn!==c)return;TN.lastRx=Date.now();try{tnGuestMsg(d);}catch(e){console.error(e);TN.stats.errors.push(String(e&&e.message||e).slice(0,120));}});
      c.on("close",()=>{if(TN.hostConn===c)tnHostGone();});c.on("error",()=>{if(TN.hostConn===c)tnHostGone();});
      tnGSend({t:"hello",name:TN.name});tnStartTick();});
    c.on("error",()=>fail("conn-error"));});
  p.on("error",e=>{const t=e&&e.type;clearTimeout(to);if(TN.hostConn)return;fail(t==="peer-unavailable"?"notfound":t||"error");});}
function tnGuestMsg(m){if(!m||typeof m!=="object")return;
  switch(m.t){
    case "ping":return;
    case "full":{const w=netEsc(m.why||"The room is full.");TN.leaving=true;setTimeout(()=>{tnReset();tnStatus(w,true);},300);return;}
    case "welcome":{const first=TN.mySeat==null||!TN.slots;TN.mySeat=m.seat|0;TN.name=netName(m.name||TN.name);if(!TN.slots){TN.slots=[{kind:"host"},{kind:"ai"},{kind:"ai"},{kind:"ai"}];TN.chars=["kaito","ryuga","clement","mira"];}
      TN.status="Joined room "+netEsc(TN.code)+" as "+TN_KEYS[TN.mySeat]+". Pick your duelist, then press I'M READY.";
      if(first||typeof CUR==="undefined"||CUR!=="tagsel"){if(!TN.inDuel)tnOpenLobby();}else tnSyncSeatUI();return;}
    case "lobby":{TN.slots=(m.slots||[]).slice(0,4).map(s=>({kind:["host","guest","open","ai"].includes(s.k)?s.k:"ai",name:netName(s.n),ready:!!s.r}));
      TN.chars=(m.chars||[]).slice(0,4).map(c=>CHARS[c]?c:"kaito");if(typeof m.me==="number")TN.mySeat=m.me;TN.ready=!!(TN.slots[TN.mySeat]&&TN.slots[TN.mySeat].ready);
      if(!TN.inDuel){if(typeof CUR!=="undefined"&&CUR==="tagsel")tnSyncSeatUI();else tnOpenLobby();}return;}
    case "start":tnGuestStart(m);return;
    case "snap":{let b;try{b=JSON.parse(m.s);}catch(e){return;}TN.stats.snaps++;tnGuestSnap(b);return;}
    case "log":{if(!TN.inDuel)return;TN.glog.unshift({msg:netEsc(String(m.m||"")),cls:["p","e","s",""].includes(m.c)?m.c:""});if(TN.glog.length>60)TN.glog.pop();if(G&&G.tnGuest){G.log=TN.glog;renderLog();}return;}
    case "fx":tnGuestFx(m);return;
    case "prompt":tnGuestPrompt(m);return;
    case "choice":tnGuestChoice(m);return;
    case "choiceEnd":case "pickEnd":{if(TN.gq&&TN.gq.id===m.id){const ch=document.querySelector("#chooser,#tagpick");const bg=ch&&ch.closest(".modal-bg");if(bg)bg.remove();else if(ch)ch.remove();TN.gq=null;}return;}
    case "pick":tnGuestPick(m);return;
    case "done":{const r=TN.pend.get(m.id);if(r){TN.pend.delete(m.id);if(!m.ok){TN.stats.rejects++;TN.stats.rejectMsgs.push(String(m.err||""));if(TN.stats.rejectMsgs.length>40)TN.stats.rejectMsgs.shift();if(!TN.bot&&m.err&&m.err!=="please wait")tnToast(String(m.err));}
      r(m);if(G&&G.tnGuest){G.busy=!!(TN.snap&&TN.snap.g.busy)||TN.pend.size>0;render();}setTimeout(tnBotCheck,20);}return;}
    case "notice":TN.stats.notices++;TN.notices.push(String(m.x||""));tnToast(String(m.x||""));return;
    case "over":TN.lastOver={w:m.w==="player"||m.w==="enemy"?m.w:null,r:String(m.r||"")};tnGuestOver();return;
    case "bye":tnHostGone(true);return;}}
function tnGuestStart(m){if(!Array.isArray(m.chars))return;TN.start={n:m.n|0,arena:ARENAS[m.arena]?m.arena:Object.keys(ARENAS)[0],chars:m.chars,names:m.names,host:netName(m.host)};
  TN.duelNo=TN.start.n;TN.mySeat=m.seat|0;TN.inDuel=true;TN.glog=[];TN.snap=null;TN.overShown=false;TN.lastOver=null;TN.botTurnDone=-1;TN.pend.clear();TN.notices=[];
  try{if(window.__stage&&window.__stage.close)window.__stage.close();}catch(e){}
  leaveDuel();G=null;try{exprReset();}catch(e){}try{V3.clipSeen={};probeVideo();}catch(e){}setArena(TN.start.arena);if(TN.speed!=null)try{SPEED=TN.speed;}catch(e){}
  TN.duelView=true;showScreen("duel",true);tnDuelChrome(true);
  try{if(typeof AUDIO!=="undefined"&&AUDIO&&AUDIO.music&&AUDIO.trackFor)AUDIO.music(AUDIO.trackFor(TN.start.arena));}catch(e){}
  tnGSend({t:"inDuel"});}
function tnSeatIn(o,j){const ch=CHARS[o.char]?o.char:"kaito";const team=o.team==="enemy"?"enemy":"player";const lk={};for(const k in (o.lk||{}))if(typeof o.lk[k]==="number"||typeof o.lk[k]==="boolean")lk[k]=o.lk[k];
  return {i:j,key:TN_KEYS.includes(o.key)?o.key:TN_KEYS[j],team,char:ch,name:netName(o.name),lp:+o.lp||0,normalSummoned:!!o.ns,lk,human:!!o.human,ai:!o.human,out:!!o.out,outT:o.outT|0,netName:o.nn?netName(o.nn):"",
    hand:Array.isArray(o.hand)?o.hand.map(tnCardIn):Array.from({length:Math.min(60,+o.hand||0)},(_,k)=>{const s=netStub(-(5000+j*100+k),team);s.seat=j;return s;}),
    deck:Array.from({length:Math.min(80,+o.deck||0)},(_,k)=>{const s=netStub(-(10000+j*100+k),team);s.seat=j;return s;})};}
function tnGuestSnap(b){if(!TN.inDuel||!b||!b.g||!b.t||!Array.isArray(b.seats)||b.seats.length!==4)return;if(b.g.n!=null&&b.g.n!==TN.duelNo)return;
  const prev=G&&G.tnGuest?G:null;TN.snap=b;const g=b.g,tt=b.t;
  const seats=b.seats.map(tnSeatIn);const P=x=>typeof x==="number"&&x>=0&&x<4?x:0;
  const t={seats,order:(tt.order||[0,1,2,3]).map(P),pos:tt.pos|0,act:{player:P(tt.act.player),enemy:P(tt.act.enemy)},pin:null,resp:0,filt:null,allAI:false,view:P(tt.view),
    turnSeat:P(tt.turnSeat),round:tt.round|0,cfg:{net:true},kill:null,killR:null,settle:null,ko:[],directPick:prev&&prev.tag?prev.tag.directPick:null,_tn:1};
  const side=(o,team)=>{const sd={monsters:[0,1,2,3,4].map(i=>tnCardIn((o.mon||[])[i])),st:[0,1,2,3,4].map(i=>tnCardIn((o.st||[])[i])),gy:(o.gy||[]).map(tnCardIn)};
    for(const k of ["char","name","lp","deck","hand","normalSummoned","lk"])Object.defineProperty(sd,k,{configurable:true,enumerable:true,get(){return t.seats[t.act[team]][k];},set(v){t.seats[t.act[team]][k]=v;}});return sd;};
  const mine=g.cur==="player"&&t.turnSeat===t.view&&!g.over;
  let ui={mode:null};if(prev&&prev.turn===g.turn&&prev.phase===g.phase&&mine&&prev.ui&&prev.ui.mode!=="discard")ui=prev.ui;
  if(b.gd)ui=prev&&prev.ui&&prev.ui.mode==="discard"?prev.ui:{mode:"discard"};
  G={net:true,guest:true,tnGuest:true,turn:g.turn|0,current:g.cur==="enemy"?"enemy":g.cur==="player"?"player":null,phase:String(g.phase||"draw"),over:!!g.over,busy:!!g.busy||TN.pend.size>0,
    auto:!mine&&!b.gd,ui,log:TN.glog,battleEnded:!!g.be,winner:g.win||null,match:[seats[0].char,seats[1].char],arena:ARENAS[g.arena]?g.arena:(prev?prev.arena:TN.start.arena),
    stats:prev?prev.stats:{aces:0,effects:0,links:0},sides:{},passTurn:typeof b.ps==="number"?b.ps:-1,tag:t};
  G.sides.player=side(b.P||{},"player");G.sides.enemy=side(b.E||{},"enemy");
  if(b.gd){G.current="player";}
  TN.tl=g.tl;
  if(prev&&prev.arena!==G.arena)setArena(G.arena);
  try{render();}catch(e){console.error(e);TN.stats.errors.push("render: "+String(e&&e.message||e).slice(0,100));}
  tnHud();
  if(G.over&&TN.lastOver)tnGuestOver();
  setTimeout(tnBotCheck,30);}
function tnGuestOver(){if(TN.overShown||!G||!G.tnGuest||!TN.lastOver)return;TN.overShown=true;tnWait(null);
  setTimeout(()=>{try{if(typeof window.tagShowResult==="function"&&G&&G.tnGuest)window.tagShowResult(TN.lastOver.w,TN.lastOver.r);}catch(e){console.error(e);}},900);}
function tnGuestFx(m){if(!G||!G.tnGuest||!TN.duelView)return;TN.stats.fx++;
  try{if(m.k==="banner"&&typeof m.x==="string")banner(m.x.slice(0,60),typeof m.c==="string"&&/^#[0-9a-f]{3,8}$/i.test(m.c)?m.c:undefined).catch(()=>{});
    else if(m.k==="sfx"&&typeof AUDIO!=="undefined"&&AUDIO&&/^[a-z0-9_]{1,20}$/i.test(m.n))AUDIO.play(m.n);
    else if(m.k==="link"&&typeof window.linkCutscene==="function"&&(m.s==="player"||m.s==="enemy")){const r=window.linkCutscene(m.s);if(r&&r.catch)r.catch(()=>{});}}catch(e){}}
function tnIntent(a,data){if(!TN.hostConn||!TN.hostConn.open)return Promise.resolve({ok:false,err:"offline"});const id=++TN.iid;
  return new Promise(res=>{TN.pend.set(id,res);if(G&&G.tnGuest){G.busy=true;}tnGSend(Object.assign({t:"intent",id,a},data||{}));
    setTimeout(()=>{if(TN.pend.has(id)){TN.pend.delete(id);res({ok:false,err:"timeout"});}},90000);});}
function tnGuestPrompt(m){const reply=(c,pass)=>tnGSend({t:"resp",id:m.id,c:c|0,pass:pass?1:0});
  if(!G||!G.tnGuest){reply(0);return;}TN.stats.prompts++;
  const F=u=>{const f=u?find(u):null;return f?f.card:null;};
  const ctx={att:F(m.att),tgt:F(m.tgt),summoned:F(m.sum),spell:F(m.sp)};
  const traps=(m.traps||[]).map(F).filter(Boolean),quicks=(m.quicks||[]).map(F).filter(Boolean);
  if(!traps.length&&!quicks.length){reply(0);return;}
  const kind=["attack","summon","spell"].includes(m.kind)?m.kind:"spell";
  if(TN.bot){setTimeout(()=>{let ch=null;try{ch=(traps.length&&ctx.att&&aiTrapChoice("player",ctx.att,ctx.tgt,traps))||(quicks.length&&aiQuickChoice("player",kind,ctx,quicks))||null;}catch(e){}reply(ch?ch.uid:0);},120);return;}
  let passed=false;TN.gq={id:m.id,k:"prompt"};
  const p=window.tnOrigPrompt("player",kind,ctx,traps,quicks);
  const pb=document.querySelector('#modalLayer [data-resp="-1"]');if(pb)pb.addEventListener("click",()=>{passed=true;});
  const box=$("#respbox");const stop=box?netCountdown(+m.sec||TN_CFG.respSec,box,()=>{const b=document.querySelector('#modalLayer [data-resp="0"]');if(b)b.click();}):null;
  p.then(c=>{if(stop)stop();if(!TN.gq||TN.gq.id!==m.id)return;TN.gq=null;reply(c?c.uid:0,passed);});}
function tnGuestChoice(m){const reply=i=>tnGSend({t:"choiceResp",id:m.id,i});
  const opts=(m.opts||[]).map(tnOptIn);const meta=tnMetaIn(m.meta);if(!G||!G.tnGuest||!opts.length||typeof window.tnOrigChoice!=="function"){reply(null);return;}TN.stats.choices++;
  if(TN.bot){setTimeout(()=>reply(null),120);return;}
  TN.gq={id:m.id,k:"choice"};
  let p;try{p=window.tnOrigChoice("player",opts,meta);}catch(e){reply(null);return;}
  setTimeout(()=>{const ch=document.querySelector("#chooser");if(ch&&TN.gq&&TN.gq.id===m.id){const stop=netCountdown(+m.sec||TN_CFG.choiceSec,ch,()=>{const bg=ch.closest(".modal-bg");if(bg)bg.remove();if(TN.gq&&TN.gq.id===m.id){TN.gq=null;reply(null);}});}},30);
  Promise.resolve(p).then(r=>{if(!TN.gq||TN.gq.id!==m.id)return;TN.gq=null;reply(netChoiceIdx(r,opts));}).catch(()=>{if(TN.gq&&TN.gq.id===m.id){TN.gq=null;reply(null);}});}
function tnGuestPick(m){const reply=s=>tnGSend({t:"pickResp",id:m.id,s});const team=m.team==="enemy"?"enemy":"player";
  if(!G||!G.tnGuest){reply(null);return;}TN.stats.picks++;
  if(TN.bot||typeof window.tagPickOpp!=="function"){setTimeout(()=>{let st=null;try{st=window.TAGAPI.fairPick(team,+m.amount||0,other(team));}catch(e){}reply(st?st.i:null);},100);return;}
  TN.gq={id:m.id,k:"pick"};
  Promise.resolve(window.tagPickOpp(team,netEsc(m.title||"CHOOSE AN OPPONENT"),netEsc(m.sub||""),+m.amount||0)).then(st=>{if(!TN.gq||TN.gq.id!==m.id)return;TN.gq=null;reply(st&&typeof st.i==="number"?st.i:null);});}
/* guest engine wrappers: the guest never runs rules, it sends intents */
(function(){const W=(name,mk)=>{const o=window[name];if(typeof o!=="function")return;window[name]=mk(o);};
  const dp=()=>{const t=G&&G.tag;if(!t)return null;const d=t.directPick;t.directPick=null;if(typeof d!=="number")return null;return TN.snap&&TN.snap.seats&&G.tag.seats[d]?(G.tag.seats[G.tag.view].key[0]==="B"?d^1:d):null;};
  W("normalSummon",o=>function(s,uid,tr,set,pref){if(!tnGL())return o.apply(this,arguments);return tnIntent("summon",{uid,tr:tr||[],set:!!set,pref});});
  W("setTrap",o=>function(s,uid,pref){if(!tnGL())return o.apply(this,arguments);return tnIntent("set",{uid,pref});});
  W("activateSpell",o=>function(s,uid,tgt,ctx,pref){if(!tnGL())return o.apply(this,arguments);return tnIntent("spell",{uid,tgt:tgt||null,pref});});
  W("changePosition",o=>function(s,uid){if(!tnGL())return o.apply(this,arguments);return tnIntent("pos",{uid});});
  W("attack",o=>function(s,att,tgt){if(!tnGL())return o.apply(this,arguments);return tnIntent("attack",{uid:att,tgt:tgt||null,dp:tgt?null:dp()});});
  W("discard",o=>function(s,uid){if(!tnGL())return o.apply(this,arguments);return tnIntent("discard",{uid});});
  W("phaseAct",o=>function(a){if(!tnGL())return o.apply(this,arguments);if(!humanTurn())return;G.ui={mode:null};closeMenu();G.busy=true;render();return tnIntent("phase",{p:a});});
  W("activateLink",o=>function(s){if(!tnGL())return o.apply(this,arguments);if(s!=="player"||!canLink("player"))return Promise.resolve(false);return tnIntent("link",{}).then(r=>!!(r&&r.ok));});})();
/* the Link portrait click (k_links.js handles it in a closure): on a Tag guest it becomes a link intent */
window.addEventListener("click",e=>{if(!tnGL())return;const p=e.target.closest&&e.target.closest("[data-link]");if(!p)return;e.stopPropagation();e.stopImmediatePropagation();
  if(p.dataset.link!=="player"||!humanTurn()||!canLink("player"))return;const L=LINKS[S("player").char];
  const go=()=>{if(tnGL()&&humanTurn()&&canLink("player"))window.activateLink("player");};
  if(L&&L.lose){$("#modalLayer").innerHTML=`<div class="modal-bg"><div class="modal" style="width:440px;text-align:center"><h2>${netEsc(L.name)}</h2><p>This Link makes your seat lose the duel. Use it?</p><div class="btnrow"><button class="btn red" id="tnlk-y">Use it</button><button class="btn" id="tnlk-n">Cancel</button></div></div></div>`;
    $("#tnlk-y").onclick=()=>{$("#modalLayer").innerHTML="";go();};$("#tnlk-n").onclick=()=>{$("#modalLayer").innerHTML="";};return;}
  go();},true);
/* guest bot (tests / "auto" helper) */
function tnBotCheck(){if(!TN.bot||TN.role!=="guest"||!G||!G.tnGuest||G.over||!TN.hostConn||!TN.hostConn.open)return;
  if(G.ui.mode==="discard"){if(!TN.botDisc&&TN.pend.size===0&&S("player").hand.length>HAND_LIMIT){TN.botDisc=true;const c=aiDiscardPick("player");
      tnIntent("discard",{uid:c.uid}).finally(()=>{TN.botDisc=false;setTimeout(tnBotCheck,30);});}return;}
  const t=G.tag;if(G.current==="player"&&t.turnSeat===t.view&&!TN.botRunning&&TN.snap&&!TN.snap.g.busy&&TN.pend.size===0&&TN.botTurnDone!==G.turn&&(G.phase==="main1"||G.phase==="battle"||G.phase==="main2")){
    TN.botTurnDone=G.turn;tnGuestBotTurn();}}
async function tnBotBattle(mine){for(let n=0;n<12;n++){if(!mine()||G.phase!=="battle"||G.battleEnded)return;
  const list=mons("player").filter(m=>canAttackWith("player",m)).sort((a,b)=>atkOf(b)-atkOf(a));const m=list[0];if(!m)return;
  let ch=null;try{ch=aiChooseTarget("player",m);}catch(e){}if(!ch)return;const r=await attack("player",m.uid,ch.t?ch.t.uid:null);if(!r||!r.ok)return;await realSleep(120);}}
async function tnGuestBotTurn(){TN.botRunning=true;TN.stats.turnsMine++;const turn=G.turn;const mine=()=>G&&G.tnGuest&&!G.over&&G.current==="player"&&G.tag.turnSeat===G.tag.view&&G.turn===turn&&TN.hostConn&&TN.hostConn.open;
  const tryLink=async()=>{if(!mine()||!canLink("player"))return;const L=LINKS[S("player").char];let sc=0;try{sc=L.ai("player",G.phase);}catch(e){}if((sc>=55||TN.forceLink)&&!L.lose){TN.forceLink=false;await tnIntent("link",{});await realSleep(200);}};
  try{await realSleep(200);if(!mine())return;
    if(G.phase==="main1"){await tryLink();if(mine())await aiMain("player",1);}
    if(mine()&&G.turn>1&&G.phase==="main1"){await tnIntent("phase",{p:"battle"});if(mine())await tnBotBattle(mine);}
    if(mine()&&G.phase==="battle")await tnIntent("phase",{p:"main2"});
    if(mine()&&G.phase==="main2"){await tryLink();if(mine())await aiMain("player",2);}}
  catch(e){if(e!==ABORT)console.error(e);}
  finally{try{if(mine()&&G.phase!=="end")await tnIntent("phase",{p:"end"});}finally{TN.botRunning=false;}}}
function tnHostGone(clean){if(TN.role!=="guest"||TN.leaving)return;TN.leaving=true;const was=TN.inDuel;
  const d=document.createElement("div");d.id="tnleft";d.className="tnleft";d.innerHTML=`<div class="box"><h2>Host left the room</h2><p>${clean?"The host closed the Tag room.":"The connection to the host was lost."} Returning to the menu…</p><button class="btn gold" id="tnleft-ok">OK</button></div>`;
  ($("#app")||document.body).appendChild(d);TN.hostLeft=true;
  const go=()=>{if(!d.isConnected)return;d.remove();tnReset();if(was){try{leaveDuel();}catch(e){}try{window.tagBoardOff();}catch(e){}}showScreen("menu");};
  d.querySelector("#tnleft-ok").onclick=go;setTimeout(go,5000);}
function tnGuestTick(){const now=Date.now();if(TN.hostConn&&TN.hostConn.open&&now-(TN.lastTx||0)>=TN_CFG.pingMs)tnGSend({t:"ping"});
  if(TN.hostConn&&now-TN.lastRx>TN_CFG.lostMs)tnHostGone(false);if(TN.inDuel)tnHud();}
function tnStartTick(){if(TN.tick)return;TN.tick=setInterval(()=>{try{TN.role==="host"?tnHostTick():TN.role==="guest"?tnGuestTick():0;}catch(e){console.error(e);}},1000);}
/* ================= shared: leave / reset / chrome ================= */
function tnReset(){for(const r of TN.conns.values())try{r.conn.close();}catch(e){}TN.conns.clear();try{if(TN.hostConn)TN.hostConn.close();}catch(e){}
  try{if(TN.peer)TN.peer.destroy();}catch(e){}clearTimeout(TN.flushT);TN.flushT=null;for(const p of TN.hp.values())clearTimeout(p.to);TN.hp.clear();TN.pend.forEach(r=>r({ok:false,err:"left"}));TN.pend.clear();
  if(TN.rDisc){clearTimeout(TN.rDisc.to);TN.rDisc=null;}
  Object.assign(TN,{role:null,peer:null,hostConn:null,code:null,mySeat:0,slots:null,inDuel:false,leaving:false,ready:false,status:"",duelView:false,snap:null,gq:null,botRunning:false});tnWait(null);tnDuelChrome(false);}
function tnLeave(toMenu){if(!TN.role)return;const wasDuel=TN.inDuel;TN.leaving=true;
  if(TN.role==="host")tnBcast({t:"bye"});else tnGSend({t:"bye"});
  setTimeout(()=>{tnReset();if(wasDuel){try{leaveDuel();}catch(e){}try{window.tagBoardOff();}catch(e){}}if(toMenu)showScreen("menu");},150);}
function tnDuelChrome(on){let h=document.getElementById("tnhud");if(!on){if(h)h.remove();return;}
  if(!h){h=document.createElement("div");h.id="tnhud";h.innerHTML=`<span id="tnh-t"></span><button class="btn sm red" id="tnh-leave">Leave</button>`;($("#duel")||document.body).appendChild(h);
    h.querySelector("#tnh-leave").onclick=()=>{if(!G||G.over){tnLeave(true);return;}$("#modalLayer").innerHTML=`<div class="modal-bg"><div class="modal" style="width:420px;text-align:center"><h2>Leave the Tag Duel?</h2><p>${TN.role==="host"?"You are the host: the room closes for everyone.":"An AI takes over your seat."}</p><div class="btnrow"><button class="btn red" id="tnl-y">Leave</button><button class="btn" id="tnl-n">Stay</button></div></div></div>`;
      $("#tnl-y").onclick=()=>{$("#modalLayer").innerHTML="";tnLeave(true);};$("#tnl-n").onclick=()=>{$("#modalLayer").innerHTML="";};};}
  tnHud();}
function tnHud(){const e=document.getElementById("tnh-t");if(!e)return;const n=TN.role==="host"?1+tnRecs().length:TN.slots?TN.slots.filter(s=>s.kind==="host"||s.kind==="guest").length:0;
  let tl="";const t=G&&G.tag;if(t&&!G.over){const cur=t.seats[t.turnSeat];const left=TN.role==="host"?(cur&&cur.human&&cur.i!==t.view?Math.max(0,Math.round(TN_CFG.turnSec-(Date.now()-TN.tStart.at)/1000)):-1):(TN.tl|0);
    if(cur&&left>=0)tl=` · ⏱ ${cur.name} ${left}s`;}
  e.textContent=`🌐 ROOM ${TN.code||"-"} · ${n} human${n===1?"":"s"}${tl}`;}
function tnStatus(html,err){TN.status=(err?'<span class="tnerr">':'')+html+(err?'</span>':'');const s=document.getElementById("tnnet-st");if(s)s.innerHTML=TN.status;const r=document.getElementById("tnst");if(r)r.innerHTML=TN.status;}
/* ---------- entry screen: TAG DUEL > ONLINE WITH FRIENDS ---------- */
function tnScreen(){let s=document.getElementById("tagnet");if(s)return s;s=document.createElement("section");s.className="screen";s.id="tagnet";const b=$("#builder");b.parentNode.insertBefore(s,b);return s;}
window.tagOnlineOpen=function(){const s=tnScreen();const st=netSettings();const nm=netEsc(st.tagName||st.name||playerName());
  s.innerHTML=`<div class="tnbox"><h1>TAG DUEL · ONLINE WITH FRIENDS</h1><div class="sub">2 vs 2 · up to 4 humans · AI fills empty seats · the host runs the rules</div>
   <label>Your name <input id="tn-name" maxlength="16" value="${nm}"></label>
   <div class="tncols"><div class="tnc"><h3>HOST A ROOM</h3><p>You sit at A1. Share the 6-letter code with up to 3 friends.</p><button class="btn gold" id="tn-create">CREATE TAG ROOM</button></div>
    <div class="tnc"><h3>JOIN A ROOM</h3><p>Type the code your friend shared.</p><input id="tn-code" maxlength="6" placeholder="ROOM CODE" autocomplete="off"><button class="btn gold" id="tn-join">JOIN</button></div></div>
   <div class="tnst" id="tnnet-st">${TN.status||""}</div><div class="tnfoot">Uses the same free PeerJS connection as 1v1 online (see HOW_TO_PLAY_ONLINE.txt).</div>
   <button class="btn" id="tn-back">◀ BACK</button></div>`;
  const nmv=()=>{const v=netName(s.querySelector("#tn-name").value);const o=netSettings();o.tagName=v;netSaveSettings(o);return v;};
  s.querySelector("#tn-create").onclick=()=>tnCreate(nmv());
  s.querySelector("#tn-join").onclick=()=>tnJoin(s.querySelector("#tn-code").value,nmv());
  s.querySelector("#tn-code").onkeydown=e=>{if(e.key==="Enter")tnJoin(e.target.value,nmv());};
  s.querySelector("#tn-back").onclick=()=>{tnReset();if(typeof window.openTagMode==="function")window.openTagMode();else showScreen("menu");};
  showScreen("tagnet");};
(function(){const c=document.createElement("style");c.textContent=`
#tagnet{display:none;align-items:center;justify-content:center}#tagnet.on,#tagnet.active{display:flex}
#online>#on-back{z-index:30}
#tagnet .tnbox{width:820px;max-width:94%;margin:40px auto;background:rgba(8,14,30,.92);border:1px solid #3a5a8a;border-radius:14px;padding:22px 28px;color:#e8f0ff;text-align:center;box-shadow:0 0 40px #0008}
#tagnet h1{font-size:26px;letter-spacing:2px;margin:0 0 4px;color:#ffd76a}#tagnet .sub{opacity:.8;font-size:13px;margin-bottom:14px}
#tagnet label{display:block;margin:8px 0 14px;font-size:14px}#tagnet input{font-size:16px;padding:6px 10px;border-radius:6px;border:1px solid #567;background:#0c1830;color:#fff;margin-left:8px;text-transform:none}
#tagnet #tn-code{text-transform:uppercase;letter-spacing:4px;width:150px;margin:0 8px 0 0}
#tagnet .tncols{display:flex;gap:18px}#tagnet .tnc{flex:1;background:#0c1a36;border:1px solid #2c4a7a;border-radius:10px;padding:14px}#tagnet .tnc h3{margin:0 0 6px;color:#9fd0ff}#tagnet .tnc p{font-size:12.5px;opacity:.8;margin:0 0 10px}
#tagnet .tnst,#tagsel .tnst{min-height:20px;margin:12px 0 6px;font-size:13px}.tnerr{color:#ff8080}#tagnet .tnfoot{font-size:11px;opacity:.6;margin-bottom:10px}
#tagsel .troom{background:rgba(8,16,36,.9);border:1px solid #3a6aa8;border-radius:10px;padding:8px 10px;margin-bottom:8px;font-size:12px;text-align:left}
#tagsel .tnhead{font-size:12px;letter-spacing:1px;display:flex;align-items:center;gap:8px}#tagsel .tncode{font-size:22px;font-weight:800;letter-spacing:5px;color:#ffd76a}
#tagsel .tnrows{margin:6px 0}#tagsel .tnr{display:flex;gap:8px;align-items:center;padding:2px 0}#tagsel .tnr b{width:26px;color:#9fd0ff}#tagsel .tnr.me span{color:#ffd76a}#tagsel .tnr .btn{margin-left:auto}
#tagsel .tnhint{font-size:11px;opacity:.75}.btn.sm{font-size:11px;padding:2px 8px;min-height:0}
#tnwait{position:absolute;left:50%;top:8px;transform:translateX(-50%);z-index:60;background:rgba(10,20,40,.92);border:1px solid #6af;color:#cfe8ff;padding:6px 14px;border-radius:16px;font-size:13px;pointer-events:none}
#tnhud{position:absolute;right:8px;top:4px;z-index:55;display:flex;gap:8px;align-items:center;background:rgba(6,12,28,.85);border:1px solid #3a6aa8;border-radius:12px;padding:3px 8px;font-size:12px;color:#cfe8ff}
.tnleft{position:absolute;inset:0;z-index:200;background:rgba(0,0,0,.7);display:flex;align-items:center;justify-content:center}.tnleft .box{background:#101c38;border:1px solid #f66;border-radius:12px;padding:22px 34px;text-align:center;color:#fff}.tnleft h2{color:#ff8080;margin-top:0}
`;document.head.appendChild(c);})();
/* ---------- test API ---------- */
window.__adcTag={create:(name,code)=>tnCreate(name||"Host",code||null),join:(code,name)=>tnJoin(code,name||"Guest"),
  pick:ch=>{if(!CHARS[ch]||!TN.slots)return false;TN.chars[TN.mySeat]=ch;if(TN.role==="guest")tnGSend({t:"pick",ch});else tnLobbyChanged();tnSyncSeatUI();return true;},
  pickFor:(i,ch)=>{if(TN.role!=="host"||!CHARS[ch]||TN.slots[i].kind==="guest")return false;TN.chars[i]=ch;tnLobbyChanged();return true;},
  ready:on=>{if(TN.role!=="guest")return false;TN.ready=on!==false;tnGSend({t:"ready",on:TN.ready});return true;},
  seat:i=>{if(TN.role!=="guest")return false;tnGSend({t:"seat",i});return true;},
  toggle:i=>{if(TN.role!=="host")return false;tnSeatChange("human",i);return true;},
  start:arena=>tnHostStart(arena||"home"),bot:on=>{TN.bot=on!==false;if(TN.bot)setTimeout(tnBotCheck,30);return TN.bot;},speed:x=>{TN.speed=x;try{SPEED=x;}catch(e){}return x;},
  forceLink:()=>{TN.forceLink=true;return true;},
  drop:()=>{TN.leaving=true;try{TN.peer.destroy();}catch(e){}return true;},leave:()=>{tnLeave(true);return true;},
  setLP:(seat,lp)=>{if(TN.role!=="host"||!G||!G.tag)return false;G.tag.seats[seat].lp=lp;render();return true;},
  state:()=>{const t=G&&G.tag;return {role:TN.role,code:TN.code,mySeat:TN.mySeat,inDuel:TN.inDuel,duelNo:TN.duelNo,ready:TN.ready,hostLeft:!!TN.hostLeft,
    slots:TN.slots?TN.slots.map(s=>({k:s.kind,n:s.name||"",r:!!s.ready})):null,chars:TN.chars,guests:TN.role==="host"?tnRecs().length:null,
    over:!!(G&&G.over),winner:G&&G.winner||null,turn:G?G.turn:0,phase:G?G.phase:null,busy:!!(G&&G.busy),screen:typeof CUR!=="undefined"?CUR:null,
    turnSeat:t?t.turnSeat:null,view:t?t.view:null,act:t?Object.assign({},t.act):null,
    seats:t?t.seats.map(s=>({key:s.key,team:s.team,name:s.name,char:s.char,lp:s.lp,human:!!s.human,out:!!s.out,hand:s.hand.length,handIds:s.hand.map(c=>c.id||null),deck:s.deck.length,link:s.lk?(s.lk.used|0):0})):null,
    fieldP:G&&G.sides?G.sides.player.monsters.map(c=>c?(c.id||"?"):null):null,fieldE:G&&G.sides?G.sides.enemy.monsters.map(c=>c?(c.hidden?"?":c.id):null):null,
    log:(G&&G.log||[]).slice(0,12).map(e=>e.msg),notices:TN.notices.slice(),lastOver:TN.lastOver,stats:JSON.parse(JSON.stringify(TN.stats)),pend:TN.pend.size,hp:TN.hp.size,result:!!document.querySelector(".tagres")};}};
