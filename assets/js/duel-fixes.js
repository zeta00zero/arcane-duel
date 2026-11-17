/* Tag Link/effect sync, spell-card activation, and choice zone labels. */
(function(){
const css=document.createElement("style");
css.textContent=`.zbadge{display:inline-block;font-size:9px;font-weight:900;letter-spacing:.5px;padding:1px 5px;border-radius:4px;background:#ffd36b;color:#2a1700;margin:0 4px 2px 0}
.zbadge.opp{background:#ff6b8a;color:#fff}
#taglinkbtn{position:absolute;left:50%;bottom:148px;transform:translateX(-50%);z-index:42;padding:8px 16px;font-size:14px}`;
document.head.appendChild(css);

function cardPlace(c){
  const Z={hand:"HAND",xhand:"HAND",deck:"DECK",xdeck:"DECK",gy:"GRAVEYARD",monsters:"FIELD",st:"FIELD",banished:"BANISHED"};
  let zone="", side="", seat=c&&c.seat;
  const f=c&&c.uid!=null&&typeof find==="function"?find(c.uid):null;
  if(f){
    zone=Z[f.zone]||"";
    side=f.side||"";
    if(f.card&&f.card.seat!=null)seat=f.card.seat;
  }else if(G&&G.sides&&c){
    for(const s of ["player","enemy"]){
      const sd=G.sides[s];
      if(sd&&sd.removed&&sd.removed.indexOf(c)>=0){zone="BANISHED";side=s;break;}
    }
  }
  let who="";
  if(G&&G.tag&&seat!=null&&G.tag.seats[seat])who=G.tag.seats[seat].name;
  else if(side&&G.sides){try{who=S(side).name;}catch(e){}}
  const viewSide=G&&G.tag&&G.tag.seats[G.tag.view]?G.tag.seats[G.tag.view].team:"player";
  const mine=!side||side===viewSide;
  return {zone:zone||"", who:who||"", mine:mine};
}
function optPlace(o){
  const src=o&&o.card&&o.card.zone?o.card:(o&&o.zone?o:null);
  if(src&&typeof src.zone==="string"&&src.zone){
    const z=src.zone.toUpperCase();
    return {zone:z, who:src.who||o.who||"", mine:!((src.mine===0||src.mine===false)||(o.mine===0||o.mine===false))};
  }
  return cardPlace(o&&o.card||o);
}
window.choiceBadge=function(o){
  const p=optPlace(o);
  if(!p.zone)return "";
  const extra=p.mine?(G&&G.tag&&p.who?` · ${p.who}`:""):` · ${p.who||"OPPONENT"}`;
  return `<span class="zbadge ${p.mine?"":"opp"}">${p.zone}${extra}</span>`;
};
function stampPlace(o){
  if(!o||typeof o!=="object")return o;
  const c=o.card||(o.uid!=null?o:null);
  if(!c)return o;
  const p=cardPlace(c);
  if(!o.zone&&p.zone)o.zone=p.zone;
  if(!o.who&&p.who)o.who=p.who;
  if(o.mine==null)o.mine=p.mine?1:0;
  return o;
}
const ZONE_ORDER={FIELD:0,HAND:1,GRAVEYARD:2,DECK:3,BANISHED:4};
function sortChoices(options){
  if(!Array.isArray(options))return options;
  const tagged=options.map((o,i)=>{
    const card=o&&o.card?o:o&&o.uid!=null?{card:o}:o;
    if(card&&card.card)stampPlace(card);
    const p=optPlace(card&&card.card?card:o);
    return {o:o, i:i, mine:p.mine?0:1, z:ZONE_ORDER[p.zone]??9};
  });
  tagged.sort((a,b)=>a.mine-b.mine||a.z-b.z||a.i-b.i);
  return tagged.map(x=>x.o);
}
if(typeof requestChoice==="function"){
  const prev=requestChoice;
  requestChoice=function(side,options,opts){
    return prev.call(this, side, sortChoices(options), opts);
  };
}
if(typeof netChoiceOptOut==="function"){
  const prev=netChoiceOptOut;
  netChoiceOptOut=function(o){
    if(o&&typeof o==="object"&&!o.uid)stampPlace(o);
    return prev.apply(this, arguments);
  };
}
if(typeof tnOptOut==="function"){
  const prev=tnOptOut;
  tnOptOut=function(o){
    if(o&&typeof o==="object"&&!o.uid)stampPlace(o);
    return prev.apply(this, arguments);
  };
}

window.playCardEffect=async function(s,uid){
  if(G&&G.tnGuest&&typeof tnIntent==="function")return tnIntent("effect",{uid:uid});
  if(typeof netGuestLive==="function"&&netGuestLive()&&typeof netIntent==="function")return netIntent("effect",{uid:uid});
  if(typeof window.jbPlayEffect==="function")return jbPlayEffect(s,uid);
};

window.cardEffectReady=function(s,c){
  if(!c||!G)return false;
  if(c.type==="monster"&&typeof monsterIgniteReady==="function")return monsterIgniteReady(c);
  if(c.type==="spell"&&typeof spellEffectItem==="function")return !!spellEffectItem(c);
  return false;
};

if(typeof onCardClick==="function"){
  const prev=onCardClick;
  onCardClick=function(uid,el){
    const f=find(uid);
    if(f&&G&&G.ui&&G.ui.mode==="attack"&&f.side==="enemy"&&f.zone==="monsters"&&window.angelGuardTargets){
      const lk=angelGuardTargets("enemy");
      if(lk.length&&!lk.some(m=>m.uid===uid))return;
    }
    if(f&&typeof humanTurn==="function"&&humanTurn()&&f.side==="player"&&f.zone==="st"&&f.card&&f.card.faceUp&&f.card.type==="spell"){
      const it=window.spellEffectItem&&spellEffectItem(f.card);
      if(it){
        openMenu(el,[it,{label:"🔍 Inspect",fn:()=>inspect(f.card.uid)},{label:"Cancel",fn:()=>{}}]);
        return;
      }
    }
    return prev.apply(this, arguments);
  };
}
if(typeof fieldMonster==="function"){
  const prev=fieldMonster;
  fieldMonster=function(c,s){
    let html=prev.apply(this, arguments);
    if(!(G&&G.ui&&G.ui.mode==="attack"&&s!=="player"&&window.angelGuardTargets))return html;
    const lk=angelGuardTargets(s);
    if(lk.length&&!lk.some(m=>m.uid===c.uid))html=html.replace(/\btargetable\b/,"");
    return html;
  };
}
if(typeof canGoDirect==="function"){
  const prev=canGoDirect;
  canGoDirect=function(s,c){
    if(window.angelGuardTargets&&angelGuardTargets(other(s)).length)return false;
    return prev.apply(this, arguments);
  };
}
if(typeof aiChooseTarget==="function"){
  const prev=aiChooseTarget;
  aiChooseTarget=function(s,att){
    const lk=window.angelGuardTargets?angelGuardTargets(other(s)):[];
    if(lk.length){
      const r=prev.apply(this, arguments);
      if(r&&r.t&&lk.some(m=>m.uid===r.t.uid))return r;
      const best=lk.slice().sort((a,b)=>atkOf(a)-atkOf(b))[0];
      return {t:best};
    }
    return prev.apply(this, arguments);
  };
}
if(typeof attack==="function"){
  const prev=attack;
  attack=async function(s,attUid,tgtUid){
    const t=G&&G.tag;
    const lk=window.angelGuardTargets?angelGuardTargets(other(s)):[];
    if(lk.length&&(!tgtUid||!lk.some(m=>m.uid===tgtUid))){
      try{log("Gold Angel Dagger: the opponent can only attack the monster wearing it.","s");}catch(e){}
      return;
    }
    try{return await prev.apply(this, arguments);}
    finally{
      if(t&&window.TAGAPI&&G.current===s){
        const turn=t.seats[t.turnSeat];
        if(turn&&!turn.out&&turn.team===s)TAGAPI.setAct(s,turn.i);
      }
    }
  };
}
if(typeof changeLP==="function"){
  const prev=changeLP;
  changeLP=async function(s,delta){
    const t=G&&G.tag;
    try{return await prev.apply(this, arguments);}
    finally{
      if(t&&window.TAGAPI&&G&&G.current===s){
        const turn=t.seats[t.turnSeat];
        if(turn&&!turn.out&&turn.team===s)TAGAPI.setAct(s,turn.i);
      }
    }
  };
}

function hostLinkOk(){
  if(!G||!G.tag||G.over)return 0;
  const t=G.tag, st=t.seats[t.turnSeat];
  if(!st||st.out||G.current!==st.team||!(G.phase==="main1"||G.phase==="main2"))return 0;
  const prev=t.act[st.team];
  if(window.TAGAPI)TAGAPI.setAct(st.team,st.i);
  let ok=false;
  try{ok=!!canLink(st.team);}catch(e){}
  if(window.TAGAPI&&prev!=null)TAGAPI.setAct(st.team,prev);
  return ok?1:0;
}
if(typeof tnSnapFor==="function"){
  const prev=tnSnapFor;
  tnSnapFor=function(v){
    const r=prev.apply(this, arguments);
    try{if(r&&r.g)r.g.lkOk=hostLinkOk();}catch(e){}
    return r;
  };
}
if(typeof tnGuestSnap==="function"){
  const prev=tnGuestSnap;
  tnGuestSnap=function(b){
    try{TN.linkOk=!!(b&&b.g&&b.g.lkOk);}catch(e){}
    return prev.apply(this, arguments);
  };
}
if(typeof canLink==="function"){
  const prev=canLink;
  canLink=function(s){
    if(G&&G.tnGuest&&G.tag&&G.tag.cfg&&G.tag.cfg.net){
      if(s!=="player"||G.over||G.busy)return false;
      if(G.current!=="player"||G.tag.turnSeat!==G.tag.view)return false;
      if(!(G.phase==="main1"||G.phase==="main2"))return false;
      const st=G.tag.seats[G.tag.view];
      if(!st||(st.lk&&st.lk.used))return false;
      const gate=(window.LINKS&&LINKS[st.char]&&LINKS[st.char].lp)||(typeof LINK_LP!=="undefined"?LINK_LP:4000);
      if(st.lp>gate)return false;
      return !!TN.linkOk;
    }
    return prev.apply(this, arguments);
  };
}
if(typeof activateLink==="function"){
  const prev=activateLink;
  let pend=false;
  activateLink=async function(s){
    if(G&&G.tnGuest){
      if(pend)return false;
      pend=true;
      try{const r=await tnIntent("link",{});return !!(r&&r.ok);}finally{pend=false;}
    }
    return prev.apply(this, arguments);
  };
}
if(typeof tnOnIntent==="function"){
  const prev=tnOnIntent;
  tnOnIntent=async function(rec,m){
    if(m&&m.a==="effect"){
      const reply=(ok,err)=>{try{tnFlushTo(rec,true);tnSend(rec,{t:"done",id:m.id,ok:!!ok,err:err||null});}catch(e){}};
      if(!G||!G.tag||G.over){reply(false,"no duel");return;}
      const t=G.tag, st=t.seats[rec.seat];
      if(!st||t.turnSeat!==st.i||G.current!==st.team){reply(false,"not your turn");return;}
      if(G.busy){reply(false,"please wait");return;}
      if(window.TAGAPI)TAGAPI.setAct(st.team,st.i);
      const f=find(m.uid);
      if(!f||f.side!==st.team||!cardEffectReady(st.team,f.card)){reply(false,"effect not available");return;}
      G.busy=true;render();
      try{await playCardEffect(st.team,m.uid);}catch(e){if(e!==ABORT)console.error(e);}
      finally{if(G&&!G.over&&t.turnSeat===st.i)G.busy=false;if(G)render();reply(true);}
      return;
    }
    return prev.apply(this, arguments);
  };
}
if(typeof netOnIntent==="function"){
  const prev=netOnIntent;
  netOnIntent=async function(m){
    if(m&&m.a==="effect"){
      const reply=(ok,err)=>{try{netFlush();netSend({t:"done",id:m.id,ok:!!ok,err:err||null});}catch(e){}};
      if(!G||G.over||G.current!=="enemy"||G.busy){reply(false,"not your turn");return;}
      const f=find(m.uid);
      if(!f||f.side!=="enemy"||!cardEffectReady("enemy",f.card)){reply(false,"effect not available");return;}
      G.busy=true;render();
      try{await playCardEffect("enemy",m.uid);}catch(e){if(e!==ABORT)console.error(e);}
      finally{if(G&&!G.over&&G.current==="enemy")G.busy=false;if(G)render();reply(true);}
      return;
    }
    return prev.apply(this, arguments);
  };
}

if(typeof tagPaint==="function"){
  const prev=tagPaint;
  tagPaint=function(){
    const r=prev.apply(this, arguments);
    try{
      const t=G&&G.tag;
      let b=document.getElementById("taglinkbtn");
      const v=t&&t.seats[t.view];
      const ready=!!(t&&v&&!t.allAI&&!G.over&&!G.busy&&t.turnSeat===v.i&&G.current===v.team&&canLink(v.team));
      if(!ready){if(b)b.remove();return r;}
      if(!b){b=document.createElement("button");b.id="taglinkbtn";b.className="btn gold";b.type="button";b.dataset.link="player";
        ($("#field")||document.body).appendChild(b);
        b.onclick=e=>{e.stopPropagation();};
      }
      const L=LINKS[S(v.team).char];
      b.textContent=L?"✦ "+L.name:"✦ Chronicles Link";
    }catch(e){}
    return r;
  };
  window.tagPaint=tagPaint;
}
})();
