/* James — The Mask Bike Warrior (second form).
   Art lives in assets/img/james2/ and is meant to be swapped for finished art later.
   A monster can wear only one Equip Spell. A new one sends the old one to the Graveyard. */
(function(){
const ART={
  portrait:"assets/img/james2/portrait.webp",
  jb_rider:"assets/img/james2/jb_rider.webp",
  jb_boy:"assets/img/james2/jb_boy.webp",
  jb_wall:"assets/img/james2/jb_wall.webp",
  jb_red:"assets/img/james2/jb_red.webp",
  jb_blue:"assets/img/james2/jb_blue.webp",
  jb_yellow:"assets/img/james2/jb_yellow.webp",
  jb_gun:"assets/img/james2/jb_gun.webp",
  jb_angel:"assets/img/james2/jb_angel.webp",
  jb_boom:"assets/img/james2/jb_boom.webp",
  jb_wing:"assets/img/james2/jb_wing.webp",
  jb_liner:"assets/img/james2/jb_liner.webp",
  linerCut:"assets/img/james2/liner-cut.webp",
  jb_climax:"assets/img/james2/jb_climax.webp",
  jb_guard:"assets/img/james2/jb_guard.webp",
  jb_swap:"assets/img/james2/jb_swap.webp",
  jb_veil:"assets/img/james2/jb_veil.webp"
};
const R="Maskbike";
const EQUIPS=["jb_red","jb_blue","jb_yellow","jb_gun","jb_angel","jb_boom"];
const ONE="Only one Equip Spell can be equipped to a monster. A new Equip Spell replaces the old one.";

function say(s,msg){try{log(msg,sc(s));}catch(e){}}
function isEquip(c){return !!(c&&EQUIPS.indexOf(c.id)>=0);}
function equipsOn(m){
  if(!m||!G)return [];
  const out=[];
  for(const side of ["player","enemy"])for(const c of S(side).st)if(c&&c.faceUp&&c.equippedTo===m.uid&&isEquip(c))out.push(c);
  return out;
}
window.jbGrant=function(m,key){
  for(const e of equipsOn(m))if(e.fx&&e.fx.grant&&e.fx.grant[key])return e.fx.grant[key];
  return null;
};
function worth(c){
  const g=c.fx&&c.fx.grant||{};
  return (c.fx.v||0)+(g.double?400:0)+(g.smashDef?250:0)+(g.pierce?150:0)+(g.burn?120:0)+(g.angel?140:0);
}
function legalEquipTargets(s,spell){
  return mons(s).filter(m=>m.faceUp&&(!spell.fx.race||m.race===spell.fx.race)&&!(m.fx&&m.fx.noEquip)&&!m.unaffected);
}
function replaceEquips(monster,incoming){
  if(monster&&monster.jbStack)return;
  for(const e of equipsOn(monster)){
    if(incoming&&e.uid===incoming.uid)continue;
    const f=find(e.uid);
    if(f&&f.zone==="st"){S(f.side).st[f.idx]=null;toGY(e);say(monster.owner,e.name+" is replaced. Only one armour can be worn at a time.");}
  }
}

M("jb_rider","james2","Rider Warrior",4,"LIGHT",R,1700,1100,"",{ignite:"swap"},"The masked rider. The armour he wears is the form he fights in.");
M("jb_boy","james2","Masked Boy",2,"WIND",R,900,700,"",{ignite:"fetchRider"},"Small, quick, and always holding the rider's spare key.");
M("jb_wall","james2","Train Liner Dasher",4,"EARTH",R,1100,1900,"",{ignite:"fetchEquip",noEquip:true},"A liner on two wheels. Armour will not fit this frame.");
M("jb_wing","james2","Rider Warrior The Climax Golden Wing Mode",8,"LIGHT",R,3100,2500,"",{ignite:"wipe"},"Every armour at once. The wings last for one more of your turns.",true);
CARDS.jb_wing.extra=true;CARDS.jb_wing.unaffected=true;
M("jb_liner","james2","Rider Warrior Liner Form",8,"LIGHT",R,3000,2500,"",{ignite:"liner"},"The liner takes the rider. Every armour, for this turn only.",true);
CARDS.jb_liner.extra=true;
SP("jb_red","james2","Red Oni Sword Armour","Equip","",{k:"equip",v:500,race:R,grant:{double:true}},"Oni steel. The rider strikes twice.");
SP("jb_blue","james2","Blue Turtle Spear Armour","Equip","",{k:"equip",v:200,race:R,grant:{pierce:true}},"A turtle spear. The point goes through a shield.");
SP("jb_yellow","james2","Yellow Kijin Axe Armour","Equip","",{k:"equip",v:700,race:R,grant:{smashDef:true}},"A kijin axe. A defense position does not save them.");
SP("jb_gun","james2","Purple Dragon Gun Armour","Equip","",{k:"equip",v:300,race:R,grant:{burn:400}},"A dragon barrel. Once per turn it breathes fire.");
SP("jb_angel","james2","Gold Angel Dagger","Equip","",{k:"equip",v:300,race:R,grant:{angel:true}},"A golden dagger. Once per turn it refuses to break.");
SP("jb_boom","james2","Boomerang","Equip","",{k:"equip",v:200,race:R,grant:{boom:true}},"A light throwing edge. Once per turn, coming home to the hand.");
SP("jb_climax","james2","Climax Form","Normal","",{k:"climax"},"Five different armours leave the field, the hand and the deck. The rider takes every form at once.");
TR("jb_guard","james2","Mask Lock","",{k:"negate",needRace:R},"The mask holds. That attack never lands.");
TR("jb_swap","james2","Form Change","",{k:"jbSwap",needRace:R},"Mid-fight, the armour comes off and a different one locks on.");
TR("jb_veil","james2","Shadow Slip","",{k:"shrink",v:800,needRace:R},"The rider slips the blow. The attacker loses 800 ATK.");

const BLURB={
  jb_rider:"Once per turn: return 1 Equip Spell from your hand to the Deck, then add a different Equip Spell from your Deck to your hand.",
  jb_boy:"Once per turn: add 1 Rider Warrior from your Deck or Graveyard to your hand.",
  jb_wall:"Equip Spells cannot be equipped to this card. Once per turn: add 1 Equip Spell from your Graveyard to your hand.",
  jb_wing:"Unaffected by other card effects. During the End Phase of your next turn, send this card to the Graveyard. Once per duel: destroy all monsters your opponent controls. It cannot attack the turn it uses this effect.",
  jb_liner:"Stays only for the turn it is summoned. Once per duel: equip Red Oni Sword Armour, Blue Turtle Spear Armour, Yellow Kijin Axe Armour, Purple Dragon Gun Armour and Gold Angel Dagger from your hand, Deck and/or Graveyard at the same time. The one-equip rule is lifted for this card this turn, and all of their boosts and effects apply. At the end of that turn, shuffle every card on your field and your banished cards into your Deck, then draw 3. Your opponent's field is not affected.",
  jb_climax:"Send 5 different Equip Spells from your hand, Deck and/or field to the Graveyard, and Rider Warrior must be face-up on your field. Special Summon Rider Warrior The Climax Golden Wing Mode. "+ONE,
  jb_red:"Equip to a Maskbike, except Train Liner Dasher. It gains 500 ATK and can attack twice. "+ONE,
  jb_blue:"Equip to a Maskbike, except Train Liner Dasher. It gains 200 ATK and pierces. "+ONE,
  jb_yellow:"Equip to a Maskbike, except Train Liner Dasher. It gains 700 ATK. A Defense Position monster it battles is destroyed. "+ONE,
  jb_gun:"Equip to a Maskbike, except Train Liner Dasher. It gains 300 ATK. Once per turn: inflict 400 damage. "+ONE,
  jb_angel:"Equip to a Maskbike, except Train Liner Dasher. It gains 300 ATK. Once per turn, the first time it would be destroyed, it is not. "+ONE,
  jb_boom:"Equip to a Maskbike, except Train Liner Dasher. It gains 200 ATK. Once per turn, when this card is sent from the field to the Graveyard, return it to the hand. "+ONE,
  jb_guard:"If you control a Maskbike: negate the attack and end the Battle Phase.",
  jb_swap:"If you control a Maskbike: send its Equip Spell to the Graveyard and equip a different Equip Spell from your Deck.",
  jb_veil:"If you control a Maskbike: the attacking monster loses 800 ATK this turn."
};
if(typeof cardText==="function"){
  const prevText=cardText;
  cardText=function(c){
    const t=prevText.apply(this,arguments);
    if(c&&BLURB[c.id])t.unshift(BLURB[c.id]);
    return t;
  };
}
if(typeof ART_DATA!=="undefined"){for(const id in ART)if(id!=="portrait"&&id!=="linerCut")ART_DATA[id]=ART[id];}
if(typeof PORTRAITS!=="undefined")PORTRAITS.james2=ART.portrait;
try{if(typeof CLIP_BAD!=="undefined")CLIP_BAD.win_james2=1;
  if(typeof EXPR_DATA!=="undefined"&&PORTRAITS.james2)for(const x of ["hurt","point","talk","win","ace","happy","sad","angry"])if(!EXPR_DATA["james2_"+x])EXPR_DATA["james2_"+x]=PORTRAITS.james2;}catch(e){}

CHARS.james2={name:"James The Mask Bike Warrior",img:"james2",race:R,color:"#3ec6ff",theme:"Maskbike: one rider, one armour, a climax of every form",home:"stadium",
  bio:"James pulls a second mask on. The leather jacket stays, but the visor is a bike helm edged in gold, and every Equip Spell is a different armour. Only one form can be worn at a time. Five of them together are the Climax. Once a duel, the three riders banish themselves and the liner takes the road.",
  quote:"One mask. One armour. Don't stack them.",
  personality:"Search the armour, wear exactly one, and build toward Climax Form. Once per duel, at 4000 LP or less, banish Rider Warrior, Masked Boy and Train Liner Dasher to summon Liner Form, wear all five armours, and attack. At the end of that turn only your own field and your banished cards return to your Deck, then you draw 3. Do not spend the skill while Golden Wing Mode is on the field. Laid-back, then sudden.",
  lines:{start:["Helmet on. One armour only.","Right. Mask bike, let's ride."],summon:["Form up.","New armour, lock in.","Masked and moving."],ace:["Liner Form!","Climax Form — Golden Wing Mode!","Every armour, one rider!"],attack:["Slash!","Through!","Coming past!"],trap:["Form change!"],hurt:["The plating took that."],win:["Parked it. Cheers."],lose:["...Helmet off. Next lap."]}};
if(typeof CHAR_ORDER!=="undefined"&&CHAR_ORDER.indexOf("james2")<0){
  const j=CHAR_ORDER.indexOf("james");
  if(j>=0)CHAR_ORDER.splice(j+1,0,"james2");else CHAR_ORDER.push("james2");
}
if(typeof MODES!=="undefined")MODES.james="james2";
if(typeof MODE_BASE!=="undefined")MODE_BASE.james2="james";
if(typeof MODE_LOOK!=="undefined"){MODE_LOOK.james2="gold";if(!MODE_LOOK.james)MODE_LOOK.james="gold";}
if(typeof TMODES!=="undefined")TMODES.james="james2";
if(typeof TMBASE!=="undefined")TMBASE.james2="james";
const JB_DECK={
  jb_rider:3,jb_boy:3,jb_wall:2,
  jb_red:3,jb_blue:3,jb_yellow:2,jb_gun:2,jb_angel:2,jb_boom:3,
  jb_climax:3,jb_guard:2,jb_swap:2,jb_veil:2,
  x_seal:1,x_oracle:1,x_revive:1,x_thorn:1,x_veil:1
};
if(typeof DECK_V15!=="undefined")DECK_V15.james2=Object.assign({},JB_DECK);
if(typeof defaultDeck==="function"){
  const prevDeck=defaultDeck;
  defaultDeck=function(ch){if(ch==="james2")return Object.assign({},JB_DECK);return prevDeck.apply(this,arguments);};
}

function markOpt(m){m.jbOpt=G.turn;}
function equipsIn(sd,zone){return sd[zone].filter(c=>c&&isEquip(c));}

async function ignite(s,m){
  if(!m||!m.faceUp||G.over)return false;
  const sd=S(s);
  if(m.fx.ignite==="swap"&&m.jbOpt!==G.turn){
    const hand=equipsIn(sd,"hand");
    if(!hand.length)return false;
    const back=await requestChoice(s,hand,{title:"Rider Warrior: return an Equip Spell",sub:"It goes back to the Deck. Then you add a different Equip Spell.",score:c=>-worth(c)});
    if(!back)return false;
    sd.hand.splice(sd.hand.indexOf(back),1);sd.deck.push(back);shuffle(sd.deck);
    const pool=sd.deck.filter(c=>isEquip(c)&&c.id!==back.id);
    if(!pool.length){say(s,"No different Equip Spell in the Deck.");markOpt(m);return true;}
    const add=await requestChoice(s,pool,{title:"Rider Warrior: add a different Equip Spell",score:c=>worth(c)});
    if(add){sd.deck.splice(sd.deck.indexOf(add),1);shuffle(sd.deck);sd.hand.push(add);say(s,sd.name+" adds "+(isAI(s)?"an Equip Spell":add.name)+" to the hand.");}
    markOpt(m);render();return true;
  }
  if(m.fx.ignite==="fetchRider"&&m.jbOpt!==G.turn){
    const pool=[...sd.deck.filter(c=>c.id==="jb_rider"),...sd.gy.filter(c=>c.id==="jb_rider")];
    if(!pool.length)return false;
    const c=await requestChoice(s,pool,{title:"Masked Boy: add Rider Warrior",score:c=>sd.deck.includes(c)?2:1});
    if(!c)return false;
    const from=sd.deck.includes(c)?"deck":"gy";
    sd[from].splice(sd[from].indexOf(c),1);
    if(from==="deck")shuffle(sd.deck);
    sd.hand.push(c);say(s,sd.name+" adds Rider Warrior to the hand.");
    markOpt(m);render();return true;
  }
  if(m.fx.ignite==="fetchEquip"&&m.jbOpt!==G.turn){
    const pool=equipsIn(sd,"gy");
    if(!pool.length)return false;
    const c=await requestChoice(s,pool,{title:"Train Liner Dasher: add an Equip Spell from the Graveyard",score:c=>worth(c)});
    if(!c)return false;
    sd.gy.splice(sd.gy.indexOf(c),1);sd.hand.push(c);
    say(s,sd.name+" adds "+(isAI(s)?"an Equip Spell":c.name)+" from the Graveyard.");
    markOpt(m);render();return true;
  }
  if(m.id==="jb_liner"&&!sd.jbGeared)return gearLiner(s,m);
  if(m.fx.ignite==="wipe"&&m.jbOpt!==G.turn){
    if(sd.jbWiped)return false;
    const opp=mons(other(s)).filter(x=>!x.unaffected);
    if(!opp.length)return false;
    sd.jbWiped=1;m.jbNoAtk=G.turn;
    say(s,m.name+" burns every armour at once. It cannot attack this turn.");
    await destroyMonsters(opp);
    markOpt(m);return true;
  }
  if(equipsOn(m).some(e=>e.id==="jb_gun"&&e.jbBurn!==G.turn)){
    const gun=equipsOn(m).find(e=>e.id==="jb_gun");
    gun.jbBurn=G.turn;
    say(s,"Purple Dragon Gun Armour breathes fire.");
    await changeLP(other(s),-400);
    return true;
  }
  return false;
}
function igniteReady(m){
  if(!m||!m.faceUp||!G)return false;
  const sd=S(m.owner);
  if(m.jbOpt!==G.turn&&m.fx.ignite==="swap")return equipsIn(sd,"hand").length>0&&sd.deck.some(c=>isEquip(c));
  if(m.jbOpt!==G.turn&&m.fx.ignite==="fetchRider")return sd.deck.some(c=>c.id==="jb_rider")||sd.gy.some(c=>c.id==="jb_rider");
  if(m.jbOpt!==G.turn&&m.fx.ignite==="fetchEquip")return equipsIn(sd,"gy").length>0;
  if(m.jbOpt!==G.turn&&m.fx.ignite==="wipe")return !sd.jbWiped&&mons(other(m.owner)).some(x=>!x.unaffected);
  if(m.id==="jb_liner"&&!sd.jbGeared)return ARMOUR.some(id=>sd.hand.some(c=>c.id===id)||sd.deck.some(c=>c.id===id)||sd.gy.some(c=>c.id===id)||equipsOn(m).some(e=>e.id===id));
  if(equipsOn(m).some(e=>e.id==="jb_gun"&&e.jbBurn!==G.turn))return true;
  return false;
}
window.jbIgnite=ignite;
window.jbIgniteItem=function(c){
  if(!c||!igniteReady(c))return null;
  return {label:"✦ Activate effect",cls:"gold",fn:()=>act(()=>ignite("player",c))};
};

function climaxOk(s){
  const sd=S(s);
  const room=freeIdx(sd.monsters)>=0||mons(s).some(m=>m.id!=="jb_rider"&&m.id!=="jb_wing");
  if(!room)return false;
  if(!mons(s).some(m=>m.faceUp&&m.id==="jb_rider"))return false;
  const seen={};
  for(const z of ["hand","st","deck"])for(const c of sd[z])if(c&&isEquip(c))seen[c.id]=1;
  return Object.keys(seen).length>=5;
}
async function climax(s,spell){
  const sd=S(s);
  if(!climaxOk(s)){say(s,"Climax Form needs Rider Warrior and 5 different Equip Spells.");return;}
  const picked=[];
  const used={};
  const take=()=>{
    for(const z of ["hand","deck","st"]){
      for(const c of sd[z])if(c&&isEquip(c)&&!used[c.id]&&picked.length<5){picked.push({c:c,z:z});used[c.id]=1;}
    }
  };
  take();
  if(picked.length<5){say(s,"Not enough different Equip Spells.");return;}
  G.jbSending=1;
  for(const p of picked){
    const i=sd[p.z].indexOf(p.c);
    if(i>=0)sd[p.z].splice(i,1);
    toGY(p.c);
  }
  G.jbSending=0;
  if(freeIdx(sd.monsters)<0){
    const fodder=mons(s).find(m=>m.id!=="jb_rider"&&m.id!=="jb_wing");
    if(fodder){const f=find(fodder.uid);if(f&&f.zone==="monsters"){sd.monsters[f.idx]=null;toGY(fodder);say(s,fodder.name+" steps aside for the Climax.");}}
  }
  shuffle(sd.deck);
  const ff=find(spell.uid);
  if(ff&&ff.zone==="st"){sd.st[ff.idx]=null;toGY(spell);}
  else if(sd.hand.includes(spell)){sd.hand.splice(sd.hand.indexOf(spell),1);toGY(spell);}
  say(s,"Five armours fall away. Climax Form!");
  const wing=mk("jb_wing",s);
  wing.unaffected=true;wing.jbLeave=G.turn+2;
  sd.hand.push(wing);
  await specialSummon(s,wing,"hand");
  render();
}
if(typeof EXT_FX!=="undefined"&&EXT_FX.indexOf("climax")<0)EXT_FX.push("climax");
window.FX_EXT=window.FX_EXT||{};
FX_EXT.climax=function(s,fx,src){return climax(s,src);};

if(typeof spellCanActivate==="function"){
  const prev=spellCanActivate;
  spellCanActivate=function(s,c,ctx){
    if(c&&c.fx&&c.fx.k==="climax")return G.current===s&&climaxOk(s);
    if(c&&c.fx&&c.fx.k==="equip"){
      const tg=legalEquipTargets(s,c);
      if(!tg.length)return false;
      if(isAI(s)&&tg.every(m=>equipsOn(m).some(e=>worth(e)>=worth(c))))return false;
      if(isAI(s)&&S(s).hand.some(x=>x!==c&&isEquip(x)&&worth(x)>worth(c)+150))return false;
    }
    return prev.apply(this,arguments);
  };
}
function filterTargets(list,spell){
  if(!spell||!spell.fx||spell.fx.k!=="equip")return list;
  return (list||[]).filter(uid=>{const f=find(uid);return f&&f.card&&!(f.card.fx&&f.card.fx.noEquip)&&!f.card.unaffected;});
}
if(typeof spellTargets==="function"){const p=spellTargets;spellTargets=function(c){return filterTargets(p.apply(this,arguments),c);};}
if(typeof netSpellTargets==="function"){const p=netSpellTargets;netSpellTargets=function(s,c){return filterTargets(p.apply(this,arguments),c);};}

if(typeof canNormalSummon==="function"){
  const prevCN=canNormalSummon;
  canNormalSummon=function(s,c){if(c&&c.extra)return false;return prevCN.apply(this,arguments);};
}
if(typeof normalSummon==="function"){
  const prevNS=normalSummon;
  normalSummon=async function(s,uid,tributes,setMode,pref){
    const c=S(s).hand.find(x=>x.uid===uid);
    if(c&&(c.id==="jb_rider"||c.id==="jb_boy"))setMode=false;
    return prevNS.apply(this,arguments);
  };
}
if(typeof activateSpell==="function"){
  const prev=activateSpell;
  activateSpell=async function(s,uid,targetUid,ctx,pref){
    const pre=find(uid);const c=pre&&pre.card;
    if(c&&c.fx&&c.fx.k==="equip"&&targetUid){
      const t=find(targetUid);
      if(!t||!t.card||(t.card.fx&&t.card.fx.noEquip)||t.card.unaffected){
        say(s,"Equip Spells cannot be equipped to "+((t&&t.card&&t.card.name)||"that monster")+".");
        return null;
      }
      replaceEquips(t.card,c);
    }
    return prev.apply(this,arguments);
  };
}

if(typeof destroyMonsters==="function"){
  const prev=destroyMonsters;
  destroyMonsters=async function(list){
    const real=[],imm=[];
    for(const c of list||[]){
      if(!c)continue;
      const angel=equipsOn(c).find(e=>e.fx&&e.fx.grant&&e.fx.grant.angel);
      if(c.unaffected)imm.push(c);
      else if(angel&&c.jbAngel!==G.turn){c.jbAngel=G.turn;floatText(elOf(c.uid),"ANGEL","info");say(c.owner,c.name+" is saved by Gold Angel Dagger.");}
      else real.push(c);
    }
    for(const m of imm){try{floatText(elOf(m.uid),"UNAFFECTED","info");}catch(e){}say(m.owner,m.name+" is unaffected.");}
    if(!real.length)return;
    return prev.call(this,real);
  };
}
if(typeof addTemp==="function"){
  const prev=addTemp;
  addTemp=function(c,d){if(c&&c.unaffected)return;return prev.apply(this,arguments);};
}
if(typeof toGY==="function"){
  const prev=toGY;
  toGY=function(c){
    const boom=c&&c.id==="jb_boom"&&c.equippedTo&&!G.jbSending&&G&&S(c.owner).jbBoom!==G.turn;
    const r=prev.apply(this,arguments);
    if(boom){
      const sd=S(c.owner);const i=sd.gy.indexOf(c);
      if(i>=0){sd.gy.splice(i,1);sd.hand.push(c);c.equippedTo=null;sd.jbBoom=G.turn;say(c.owner,"Boomerang returns to the hand.");}
    }
    return r;
  };
}
if(typeof canAttackWith==="function"){
  const prev=canAttackWith;
  canAttackWith=function(s,c){
    if(c&&G&&c.jbNoAtk===G.turn)return false;
    if(prev.apply(this,arguments))return true;
    if(!c||!G||G.phase!=="battle"||G.current!==s||G.turn<=1||G.battleEnded)return false;
    if(!c.faceUp||c.pos!=="atk")return false;
    return !!(window.jbGrant&&jbGrant(c,"double")&&c.attackedTurn===G.turn&&c.attackCount<2);
  };
}
if(typeof attack==="function"){
  const prev=attack;
  attack=async function(s,attUid,tgtUid){
    const att=find(attUid)&&find(attUid).card;
    const tgt=tgtUid&&find(tgtUid)&&find(tgtUid).card;
    const smash=att&&tgt&&jbGrant(att,"smashDef")&&(tgt.pos==="def"||!tgt.faceUp);
    await prev.apply(this,arguments);
    if(smash&&!G.over&&tgt&&find(tgt.uid)&&find(tgt.uid).zone==="monsters"){
      say(s,att.name+"'s axe breaks the defense.");
      await destroyMonsters([tgt]);
    }
  };
}
if(typeof endPhase==="function"){
  const prev=endPhase;
  endPhase=async function(side){
    if(G&&!G.over&&S(side).jbLinerTurn===G.turn){
      S(side).jbLinerTurn=0;
      await linerReset(side);
    }
    if(G&&!G.over){
      for(const m of mons(side).slice()){
        if(m.jbLeave!=null&&G.turn>=m.jbLeave){
          const f=find(m.uid);
          if(f&&f.zone==="monsters"){S(side).monsters[f.idx]=null;say(side,m.name+"'s wings fold. It goes to the Graveyard.");toGY(m);}
        }
      }
      render();
    }
    return prev.apply(this,arguments);
  };
}
window.jbTrapEffect=async function(k,user,attacker,att,tgt,choice){
  if(k==="jbSwap"){
    const riders=mons(user).filter(m=>m.faceUp&&m.race===R&&!(m.fx&&m.fx.noEquip));
    const host=riders.find(m=>equipsOn(m).length)||riders[0];
    if(!host)return;
    for(const e of equipsOn(host)){const f=find(e.uid);if(f&&f.zone==="st"){S(user).st[f.idx]=null;toGY(e);}}
    const pool=S(user).deck.filter(isEquip);
    if(!pool.length){say(user,"Form Change finds no Equip Spell in the Deck.");return;}
    const c=await requestChoice(user,pool,{title:"Form Change: equip a different armour",score:c=>worth(c)});
    if(!c)return;
    S(user).deck.splice(S(user).deck.indexOf(c),1);shuffle(S(user).deck);
    if(freeIdx(S(user).st)<0){S(user).hand.push(c);say(user,"No room for the new armour.");return;}
    c.faceUp=true;c.equippedTo=host.uid;S(user).st[freeIdx(S(user).st)]=c;
    say(user,host.name+" locks on "+c.name+".");render();
  }
};

if(typeof aiTrapChoice==="function"){
  const prev=aiTrapChoice;
  aiTrapChoice=function(o,att,tgt,traps){
    const swap=traps.find(t=>t.fx.k==="jbSwap");
    if(swap&&mons(o).some(m=>m.faceUp&&m.id==="jb_rider")&&S(o).deck.some(isEquip)){
      const worn=mons(o).some(m=>equipsOn(m).length);
      if(!worn||(att&&atkOf(att)>=2000))return swap;
    }
    return prev.apply(this,arguments);
  };
}
if(typeof aiMain==="function"){
  const prev=aiMain;
  aiMain=async function(s,phase){
    if(!G.over){
      for(let n=0;n<4;n++){
        const m=mons(s).filter(x=>x.faceUp&&igniteReady(x)).sort((a,b)=>{
          const rank=x=>x.fx.ignite==="fetchRider"?3:x.fx.ignite==="swap"?2:x.fx.ignite==="wipe"?4:1;
          return rank(b)-rank(a);
        })[0];
        if(!m)break;
        if(m.fx.ignite==="wipe"){
          const opp=mons(other(s)).filter(x=>!x.unaffected);
          const threat=opp.reduce((a,x)=>a+(x.faceUp?atkOf(x):1500),0);
          if(opp.length<2&&threat<S(s).lp*0.6)break;
        }
        await ignite(s,m);
        if(G.over)return;
      }
    }
    await prev.apply(this,arguments);
    if(!G.over){
      for(let n=0;n<3;n++){
        const liner=mons(s).find(x=>x.faceUp&&x.id==="jb_liner"&&igniteReady(x));
        if(!liner)break;
        await ignite(s,liner);
        if(G.over)return;
      }
    }
    if(phase===1&&!G.over){
      const spell=S(s).hand.find(c=>c.fx&&c.fx.k==="climax");
      if(spell&&spellCanActivate(s,spell))await activateSpell(s,spell.uid);
    }
  };
}
const ARMOUR=["jb_red","jb_blue","jb_yellow","jb_gun","jb_angel"];
const MATS=["jb_rider","jb_boy","jb_wall"];
function zonesOf(sd,id){
  const out=[];
  for(const c of sd.gy)if(c&&c.id===id)out.push({z:"gy",c});
  for(const c of sd.deck)if(c&&c.id===id)out.push({z:"deck",c});
  for(const c of sd.monsters)if(c&&c.id===id)out.push({z:"monsters",c});
  for(const c of sd.hand)if(c&&c.id===id)out.push({z:"hand",c});
  return out;
}
function chooseMats(s){
  const sd=S(s);
  if(!sd||mons(s).some(m=>m.id==="jb_liner"))return null;
  if(MATS.some(id=>!zonesOf(sd,id).length))return null;
  const room=freeIdx(sd.monsters)>=0;
  const fieldIds=MATS.filter(id=>sd.monsters.some(c=>c&&c.id===id));
  if(!room&&!fieldIds.length)return null;
  let needField=!room;
  const picks=[];
  const order=needField?[...fieldIds,...MATS.filter(id=>fieldIds.indexOf(id)<0)]:MATS;
  for(const id of order){
    const opts=zonesOf(sd,id).filter(x=>!picks.some(p=>p.c===x.c));
    if(!opts.length)return null;
    let pick=opts[0];
    if(needField){
      const f=opts.find(x=>x.z==="monsters");
      if(f){pick=f;needField=false;}
    }else{
      const rank={gy:0,deck:1,monsters:2,hand:3};
      opts.sort((a,b)=>rank[a.z]-rank[b.z]);
      pick=opts[0];
    }
    picks.push(pick);
  }
  return picks;
}
function banishCard(c){
  const sd=S(c.owner);
  const f=find(c.uid);
  if(f){
    if(f.zone==="monsters"||f.zone==="st")sd[f.zone][f.idx]=null;
    else sd[f.zone].splice(f.idx,1);
  }
  if(c.type==="monster"){
    for(const side of ["player","enemy"])for(const e of S(side).st)if(e&&e.equippedTo===c.uid)e.equippedTo=null;
  }
  c.equippedTo=null;c.faceUp=true;
  sd.removed=sd.removed||[];
  sd.removed.push(c);
}
async function linerCut(){
  const old=document.getElementById("jbcut");if(old)old.remove();
  const d=document.createElement("div");d.id="jbcut";
  d.style.cssText="position:absolute;inset:0;z-index:960;display:flex;align-items:center;justify-content:center;pointer-events:none;background:rgba(0,0,0,.45)";
  d.innerHTML='<div style="text-align:center"><img src="'+ART.linerCut+'" alt="" style="height:300px;border:4px solid #fff;border-radius:14px;box-shadow:0 0 36px #3ec6ff"><div style="margin-top:8px;font-weight:800;letter-spacing:2px;color:#fff;text-shadow:0 0 12px #3ec6ff">LINER FORM</div></div>';
  ($("#app")||document.body).appendChild(d);
  await sleep(650);
  d.remove();
}
function tidyBack(c){
  c.equippedTo=null;c.faceUp=false;c.pos="atk";c.bonus=0;c.tempAtk=0;c.tempTurn=-1;c.guardUsed=false;
  c.attackCount=0;c.attackedTurn=-1;c.summonedTurn=-1;c.posChangedTurn=-1;c.jbLeave=null;c.jbStack=false;c.jbNoAtk=null;
  if(c.type==="monster"&&CARDS[c.id]){c.unaffected=!!CARDS[c.id].unaffected;c.fx=CARDS[c.id].fx;}
}
async function linerReset(side){
  const sd=S(side);
  const back=[];
  for(const z of ["monsters","st"]){
    for(let i=0;i<sd[z].length;i++){const c=sd[z][i];if(!c)continue;sd[z][i]=null;back.push(c);}
  }
  for(const c of (sd.removed||[]))back.push(c);
  sd.removed=[];
  let deckN=0;
  for(const c of back){
    tidyBack(c);
    if(c.token)continue;
    sd.deck.push(c);deckN++;
  }
  shuffle(sd.deck);
  say(side,"Liner Form ends. "+deckN+" of James's field and banished cards return to his Deck. The opponent's field is not affected.");
  render();await sleep(250);
  if(!G.over)await drawCards(side,Math.min(3,sd.deck.length));
}
async function gearLiner(s,m){
  const sd=S(s);
  if(sd.jbGeared)return false;
  const worn=new Set(equipsOn(m).map(e=>e.id));
  const found=[];
  for(const id of ARMOUR){
    if(worn.has(id))continue;
    const c=sd.hand.find(x=>x.id===id)||sd.gy.find(x=>x.id===id)||sd.deck.find(x=>x.id===id);
    if(c)found.push(c);
  }
  if(!found.length&&!worn.size)return false;
  sd.jbGeared=1;m.jbStack=true;
  let free=sd.st.filter(x=>!x).length;
  if(free<found.length){
    for(let i=0;i<sd.st.length&&sd.st.filter(x=>!x).length<found.length;i++){
      const e=sd.st[i];
      if(!e)continue;
      sd.st[i]=null;toGY(e);
    }
    say(s,"The spell row makes room so every armour can be worn at once.");
  }
  for(const c of found){
    for(const z of ["hand","gy","deck"]){const i=sd[z].indexOf(c);if(i>=0){sd[z].splice(i,1);break;}}
    const slot=freeIdx(sd.st);
    if(slot<0){sd.hand.push(c);continue;}
    c.faceUp=true;c.equippedTo=m.uid;c.eqT=G.turn;
    sd.st[slot]=c;
  }
  shuffle(sd.deck);
  say(s,m.name+" wears every armour at once. The one-equip rule is lifted for this card this turn.");
  render();
  return true;
}
async function linerSkill(s){
  const picks=chooseMats(s);
  if(!picks){say(s,"Liner Form needs Rider Warrior, Masked Boy and Train Liner Dasher.");return;}
  const fromDeck=picks.some(p=>p.z==="deck");
  for(const p of picks)banishCard(p.c);
  if(fromDeck)shuffle(S(s).deck);
  say(s,"Removed from play: Rider Warrior, Masked Boy and Train Liner Dasher.");
  await linerCut();
  if(G.over)return;
  if(freeIdx(S(s).monsters)<0){say(s,"No room to summon Liner Form.");return;}
  const liner=mk("jb_liner",s);
  liner.jbStack=true;
  S(s).jbLinerTurn=G.turn;
  S(s).hand.push(liner);
  say(s,"Liner Form!");
  await specialSummon(s,liner,"hand");
  render();
}
if(typeof LINKS!=="undefined"){
  LINKS.james2={
    name:"Liner Form",
    text:"Once per duel, while your LP is 4000 or less: banish Rider Warrior, Masked Boy and Train Liner Dasher from your hand, Deck, field and/or Graveyard, and Special Summon Rider Warrior Liner Form. It stays this turn only. Once per duel: equip it with all 5 armour Equip Spells from your hand, Deck and/or Graveyard at once. At the end of this turn, shuffle every card on your field and your banished cards into your Deck, then draw 3. Your opponent's field is not affected.",
    can:s=>!!chooseMats(s),
    ai:(s,ph)=>{
      if(ph===2)return 0;
      if(!chooseMats(s))return 0;
      if(mons(s).some(m=>m.id==="jb_wing"))return 0;
      const opp=mons(other(s));
      if(!opp.length&&S(s).lp>S(other(s)).lp)return 0;
      return opp.length?76:70;
    },
    run:linerSkill
  };
}
if(typeof LINK_PARAMS!=="undefined")LINK_PARAMS.james2={draw:3};
window.JB_ART=ART;
})();
