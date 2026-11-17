/* Gallop Idol (Wei Yao - The 2nd Coming): attack-declaration effects.
   Summon effects stay only on the two searchers. Everything else fires when a Horse Girl attacks. */
(function(){
const GI="Gallop Idol";
function gi(m){return !!(m&&raceIs(m,GI));}
function allies(s,att){return mons(s).filter(m=>m&&m!==att&&m.faceUp&&raceIs(m,GI)).length;}
/* Extra ATK this attack will add. Does not mark the once-per-turn as used. */
function gallopPending(att,tgt){
  if(!gi(att))return 0;
  let v=0;
  const fx=att.fx&&att.fx.onAttack;
  if(fx&&att.gallopOpt!==G.turn){
    v+=fx.v||0;
    if(fx.each&&fx.per)v+=fx.each*allies(att.owner,att);
    if(fx.ifST&&sts(other(att.owner)).some(c=>c))v+=fx.ifST;
    if(fx.catchup&&tgt&&tgt.faceUp&&tgt.pos==="atk"){
      const diff=atkOf(tgt)-(atkOf(att)+v);
      if(diff>0)v+=Math.min(fx.catchup,diff);
    }
  }
  if(att.rallyGot!==G.turn){
    for(const m of mons(att.owner)){
      if(m&&m.faceUp&&m.fx&&m.fx.rally&&m.rallyTurn!==G.turn&&raceIs(att,m.fx.rally.race||GI)){v+=m.fx.rally.v||0;break;}
    }
  }
  if(att.liveTurn!==G.turn){
    const sd=S(att.owner);
    for(const c of sd.st)if(c&&c.faceUp&&c.fx&&c.fx.k==="contAtk"&&raceIs(att,c.fx.race))v+=c.fx.atk||0;
  }
  return v;
}
function boost(m,v){if(v)addTemp(m,-v);}
async function gallopDeclare(s,att,tgt){
  if(!gi(att)||!G||G.over)return;
  const notes=[];
  const fx=att.fx&&att.fx.onAttack;
  if(fx&&att.gallopOpt!==G.turn){
    att.gallopOpt=G.turn;
    let v=fx.v||0;
    if(fx.each&&fx.per)v+=fx.each*allies(s,att);
    if(fx.ifST&&sts(other(s)).some(c=>c))v+=fx.ifST;
    if(fx.catchup&&tgt&&tgt.faceUp&&tgt.pos==="atk"){
      const diff=atkOf(tgt)-(atkOf(att)+v);
      if(diff>0)v+=Math.min(fx.catchup,diff);
    }
    if(v>0){boost(att,v);notes.push(`+${v} ATK`);}
    if(fx.team){
      for(const m of mons(s))if(m!==att&&m.faceUp&&raceIs(m,GI)){boost(m,fx.team);floatText(elOf(m.uid),`+${fx.team} ATK`,"heal");}
      notes.push(`other ${GI}s +${fx.team} ATK`);
    }
    if(fx.safe){att.battleSafe=true;notes.push("cannot be destroyed this battle");}
  }
  if(att.rallyGot!==G.turn){
    for(const m of mons(s)){
      if(!m||!m.faceUp||!m.fx||!m.fx.rally||m.rallyTurn===G.turn||!raceIs(att,m.fx.rally.race||GI))continue;
      m.rallyTurn=G.turn;att.rallyGot=G.turn;
      const v=m.fx.rally.v||0;
      if(v){boost(att,v);notes.push(`${m.name} +${v} ATK`);}
      break;
    }
  }
  if(att.liveTurn!==G.turn){
    let v=0;
    for(const c of S(s).st)if(c&&c.faceUp&&c.fx&&c.fx.k==="contAtk"&&raceIs(att,c.fx.race))v+=c.fx.atk||0;
    if(v){att.liveTurn=G.turn;boost(att,v);notes.push(`Winning Live +${v} ATK`);}
  }
  if(notes.length){
    log(`${att.name}'s attack effect: ${notes.join("; ")}.`,sc(s));
    floatText(elOf(att.uid),"SPURT","heal");
    render();await sleep(180);
  }
}
window.gallopTrap=async function(k,o,s,att,tgt,choice){
  if(k!=="giGuard"||!choice)return;
  const v=choice.fx.v||0;
  if(v&&att){addTemp(att,v);floatText(elOf(att.uid),`-${v} ATK`,"dmg");log(`${att.name} loses ${v} ATK this turn (Photo Finish).`,sc(o));}
  if(tgt&&tgt.owner===o&&raceIs(tgt,choice.fx.needRace||GI)){
    tgt.battleSafe=true;floatText(elOf(tgt.uid),"HELD","info");
    log(`${tgt.name} cannot be destroyed by this battle.`,sc(o));
  }
  render();await sleep(180);
};
if(typeof attack==="function"){
  const prev=attack;
  attack=async function(s,attUid,tgtUid){
    const af=find(attUid),att=af&&af.card,tf=tgtUid?find(tgtUid):null,tgt=tf&&tf.card;
    if(att&&gi(att)){try{await gallopDeclare(s,att,tgt);}catch(e){if(e!==ABORT)throw e;}}
    try{return await prev.apply(this,arguments);}
    finally{if(att)att.battleSafe=false;if(tgt)tgt.battleSafe=false;}
  };
}
if(typeof battleDestroy==="function"){
  const prev=battleDestroy;
  battleDestroy=async function(list){
    const rest=[];
    for(const c of list||[]){
      if(c&&c.battleSafe){floatText(elOf(c.uid),"HELD","info");log(`${c.name} holds on and is not destroyed.`,sc(c.owner));}
      else rest.push(c);
    }
    if(rest.length!==(list||[]).length)render();
    return prev.call(this,rest);
  };
}
if(typeof canAttackWith==="function"){
  const prev=canAttackWith;
  canAttackWith=function(s,c){
    if(prev.apply(this,arguments))return true;
    return !!(c&&c.gallopAgain===G.turn&&c.faceUp&&c.pos==="atk"&&G&&G.phase==="battle"&&G.current===s&&G.turn>1&&!G.battleEnded&&c.attackedTurn===G.turn&&c.attackCount<2);
  };
}
if(typeof canGoDirect==="function"){
  const prev=canGoDirect;
  canGoDirect=function(s,c){
    if(window.angelGuardTargets&&angelGuardTargets(other(s)).length)return prev.apply(this,arguments);
    if(c&&c.gallopDirect===G.turn)return true;
    return prev.apply(this,arguments);
  };
}
if(typeof qTarget==="function"){
  const prev=qTarget;
  qTarget=function(s,c,ctx){
    const f=c&&c.fx;if(!f||(f.k!=="qAgain"&&f.k!=="qDirect"))return prev.apply(this,arguments);
    const mine=m=>onField(m)&&m.owner===s&&m.faceUp&&(!f.race||raceIs(m,f.race))&&(!f.maxLv||m.level<=f.maxLv);
    if(f.k==="qAgain")return bestBy(mons(s).filter(m=>mine(m)&&m.pos==="atk"&&!(m.fx&&m.fx.double)&&m.gallopAgain!==G.turn),atkOf);
    return bestBy(mons(s).filter(m=>mine(m)&&m.pos==="atk"&&!(m.fx&&m.fx.direct)&&m.gallopDirect!==G.turn),atkOf);
  };
}
if(typeof resolveQuick==="function"){
  const prev=resolveQuick;
  resolveQuick=async function(s,c,ctx,targetUid){
    const f=c.fx;
    if(f.k!=="qAgain"&&f.k!=="qDirect")return prev.apply(this,arguments);
    let t=null;
    if(targetUid){const tf=find(targetUid);if(tf&&tf.zone==="monsters")t=tf.card;}
    const legal=m=>m&&onField(m)&&m.owner===s&&m.faceUp&&(!f.race||raceIs(m,f.race))&&(!f.maxLv||m.level<=f.maxLv)&&m.pos==="atk";
    if(!legal(t))t=qTarget(s,c,ctx||{});
    if(!t){log(`${c.name} has no valid target.`,"s");return null;}
    if(f.k==="qAgain"){
      if(t.fx&&t.fx.double){log(`${t.name} already attacks twice.`,"s");return null;}
      t.gallopAgain=G.turn;log(`${t.name} can attack one more time this Battle Phase!`,sc(s));
      floatText(elOf(t.uid),"AGAIN","heal");
    }else{
      t.gallopDirect=G.turn;
      if(f.v){boost(t,f.v);floatText(elOf(t.uid),`+${f.v} ATK`,"heal");}
      log(`${t.name} gains ${f.v||0} ATK and can attack directly this turn!`,sc(s));
    }
    render();await sleep(180);return {};
  };
}
if(typeof aiQuickOwn==="function"){
  const prev=aiQuickOwn;
  aiQuickOwn=function(s,c,inHand,phaseNum,acts,myBest){
    const f=c.fx;
    if(f&&(f.k==="qAgain"||f.k==="qDirect")&&phaseNum===1&&G.turn>1){
      const t=qTarget(s,c,{});
      if(t&&t.pos==="atk"){
        let scv=0;
        if(f.k==="qAgain")scv=44+atkOf(t)/100;
        else if(mons(other(s)).length)scv=38+Math.min(atkOf(t)+((f.v)||0),S(other(s)).lp)/90;
        if(scv)acts.push({sc:scv,f:()=>activateSpell(s,c.uid,t.uid)});
      }
    }
    return prev.apply(this,arguments);
  };
}
if(typeof activateSpell==="function"){
  const prev=activateSpell;
  activateSpell=async function(s,uid){
    let then=0;
    try{const f=find(uid);if(f&&f.card&&f.card.fx&&f.card.fx.thenAtk)then=f.card.fx.thenAtk;}catch(e){}
    const gy=then?S(s).gy.slice():null;
    const r=await prev.apply(this,arguments);
    if(then&&gy){
      const back=gy.find(c=>c.type==="monster"&&onField(c)&&c.owner===s);
      if(back){boost(back,then);log(`${back.name} comes back at a gallop: +${then} ATK this turn.`,sc(s));floatText(elOf(back.uid),`+${then} ATK`,"heal");render();}
    }
    return r;
  };
}
if(typeof aiPickAction==="function"){
  const prev=aiPickAction;
  aiPickAction=function(s,phaseNum){
    const a=prev.apply(this,arguments);
    const sp=S(s).hand.find(c=>c.fx&&c.fx.k==="contAtk"&&spellCanActivate(s,c));
    if(sp&&mons(s).some(m=>raceIs(m,sp.fx.race))){
      const act={sc:34,f:()=>activateSpell(s,sp.uid)};
      if(!a||act.sc>a.sc)return act;
    }
    return a;
  };
}
if(typeof summonFxValue==="function"){
  const prev=summonFxValue;
  summonFxValue=function(s,c){
    let v=prev.apply(this,arguments);
    if(c&&c.fx&&(c.fx.onAttack||c.fx.rally))v+=6;
    return v;
  };
}
if(typeof aiChooseTarget==="function"){
  const prev=aiChooseTarget;
  aiChooseTarget=function(s,att){
    if(!gi(att))return prev.apply(this,arguments);
    const o=other(s);
    const lk=window.angelGuardTargets?angelGuardTargets(o):[];
    const opp=lk.length?lk:mons(o);
    const direct=!lk.length&&(!!(att.fx&&att.fx.direct)||att.gallopDirect===G.turn);
    if(!opp.length)return {t:null};
    let best=null,bs=0;
    for(const t of opp){
      const b=gallopPending(att,t);
      boost(att,b);
      const A=atkOf(att);
      let sc2=0;const guard=t.fx&&t.fx.guard&&!t.guardUsed&&t.faceUp;
      if(t.faceUp&&t.pos==="atk"){const D=atkOf(t);
        if(A>D)sc2=(guard?30:100)+D/10+(A-D)/100;
        else if(att.fx&&att.fx.onAttack&&att.fx.onAttack.safe&&att.gallopOpt!==G.turn&&D-A<=700&&S(s).lp>D-A+2000)sc2=22;
        else if(A===D&&!guard)sc2=15;}
      else if(t.faceUp&&t.pos==="def"){if(A>t.def)sc2=(guard?(att.fx.pierce?35:5):60)+t.atk/20+(att.fx.pierce?(A-t.def)/50:0);}
      else if(A>=1700)sc2=40;
      boost(att,-b);
      if(sc2>bs){bs=sc2;best=t;}
    }
    if(direct){
      const b=gallopPending(att,null);boost(att,b);const A=atkOf(att);boost(att,-b);
      if(50+A/50>bs||S(o).lp<=A)return {t:null};
    }
    return best?{t:best}:null;
  };
}
if(typeof aiTrapChoice==="function"){
  const prev=aiTrapChoice;
  aiTrapChoice=function(o,att,tgt,traps){
    const base=prev.apply(this,arguments);
    if(base)return base;
    const g=(traps||[]).find(t=>t.fx&&t.fx.k==="giGuard");
    if(!g||!att)return null;
    const p=previewBattle(att,tgt),A=atkOf(att);
    if(p.killDef||p.dmgDef>=700||(!tgt&&A>=1400))return g;
    return null;
  };
}
function onAttackPhrase(fx){
  const bits=[];
  if(fx.v)bits.push(`it gains ${fx.v} ATK`);
  if(fx.each&&fx.per)bits.push(`it gains ${fx.each} ATK for each other face-up ${fx.per} you control`);
  if(fx.ifST)bits.push(`if your opponent controls a Spell or Trap, it gains ${fx.ifST} more ATK`);
  if(fx.catchup)bits.push(`if it battles a monster with higher ATK, it gains ATK equal to the difference (max ${fx.catchup} extra)`);
  if(fx.team)bits.push(`your other ${GI} monsters gain ${fx.team} ATK this turn`);
  if(fx.safe)bits.push(`it cannot be destroyed by this battle`);
  return bits.join(", and ");
}
if(typeof cardText==="function"){
  const prev=cardText;
  cardText=function(c){
    const t=prev.apply(this,arguments).slice();
    const f=c.fx||{};
    if(c.type==="monster"&&f.onAttack)t.unshift(`<b>When this card declares an attack (once per turn):</b> ${onAttackPhrase(f.onAttack)}.`);
    if(c.type==="monster"&&f.rally)t.unshift(`<b>Once per turn, when a ${f.rally.race} you control declares an attack:</b> that monster gains ${f.rally.v} ATK this turn.`);
    if(c.type==="spell"&&f.k==="contAtk")t.unshift(`Stays on the field. Each time one of your ${f.race} monsters declares an attack, it gains ${f.atk} ATK this turn.`);
    if(c.type==="spell"&&f.thenAtk)t.push(`The Special Summoned monster gains ${f.thenAtk} ATK this turn.`);
    if(c.type==="spell"&&f.k==="qDirect")t.unshift(`Target 1 Level ${f.maxLv} or lower face-up Attack Position ${f.race} you control; it gains ${f.v} ATK and can attack directly this turn.`);
    if(c.type==="spell"&&f.k==="qAgain")t.unshift(`Target 1 face-up Attack Position ${f.race||"monster"} you control that cannot already attack twice; it can attack one more time this Battle Phase.`);
    if(c.type==="trap"&&f.k==="giGuard")t.unshift(`When an opponent's monster declares an attack while you control a face-up ${f.needRace}: that attacker loses ${f.v} ATK this turn, and if it is battling your ${f.needRace}, that monster cannot be destroyed by this battle.`);
    return t;
  };
}
})();
