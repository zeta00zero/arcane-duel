// PASS 3j/4a: per-unit original themes, fully synthesized (no samples).
// THEMES[themeId] = {name,key,bpm,off,cues:{cueId:arrangement}}. Each unit has a theme id (unit.theme); every attack of that unit plays
// a cue (an edit/variation) of the SAME theme. window.PLAYTHEME(themeId,cueId,ctx,dest,EVW,ENDW,noise): EVW = {cueName:wallSeconds}.
(function(){
// ---------- shared instrument kit (band + buses) ----------
function KIT(c,dest,ENDW,noiseBuf,BPM,OFF){
 const T0=c.currentTime+0.02,E8=60/BPM/2,S16=E8/2;
 const at=i8=>T0+OFF+i8*E8;                       // 8th index -> ctx time
 const snap=w=>Math.round((w-OFF)/E8);            // wall -> nearest 8th
 const mf=n=>440*Math.pow(2,(n-69)/12);
 const noise=noiseBuf||(()=>{const b=c.createBuffer(1,c.sampleRate,c.sampleRate),d=b.getChannelData(0);let s=777;for(let i=0;i<d.length;i++){s=(s*1103515245+12345)>>>0;d[i]=s/2147483648-1;}return b;})();
 // ---------- buses ----------
 const mus=c.createGain();mus.gain.value=1;const comp=c.createDynamicsCompressor();comp.threshold.value=-12;comp.ratio.value=4;comp.attack.value=0.005;comp.release.value=0.15;
 const mvol=c.createGain();mvol.gain.value=0.9;mus.connect(comp);comp.connect(mvol);mvol.connect(dest);
 const curve=k=>{const n=2048,a=new Float32Array(n);for(let i=0;i<n;i++){const x=i/(n-1)*2-1;a[i]=Math.tanh(k*x)/Math.tanh(k);}return a;};
 function ampChain(pan,drive,lp){const pre=c.createGain();pre.gain.value=drive;const hp=c.createBiquadFilter();hp.type='highpass';hp.frequency.value=80;
  const ws=c.createWaveShaper();ws.curve=curve(3.2);ws.oversample='4x';const mid=c.createBiquadFilter();mid.type='peaking';mid.frequency.value=1600;mid.Q.value=0.8;mid.gain.value=3;
  const sc=c.createBiquadFilter();sc.type='peaking';sc.frequency.value=420;sc.Q.value=1;sc.gain.value=-3;
  const cab1=c.createBiquadFilter();cab1.type='lowpass';cab1.frequency.value=lp;cab1.Q.value=0.7;const cab2=c.createBiquadFilter();cab2.type='lowpass';cab2.frequency.value=lp+800;cab2.Q.value=0.5;
  const g=c.createGain();g.gain.value=0.16;const p=c.createStereoPanner?c.createStereoPanner():null;
  pre.connect(hp);hp.connect(ws);ws.connect(mid);mid.connect(sc);sc.connect(cab1);cab1.connect(cab2);cab2.connect(g);if(p){p.pan.value=pan;g.connect(p);p.connect(mus);}else g.connect(mus);return {in:pre,out:g};}
 const GL=ampChain(-0.7,7,5200),GR=ampChain(0.7,7,5000);
 const LEADA=ampChain(0.1,5,4500);LEADA.out.gain.value=0.13;
 const dl=c.createDelay(1);dl.delayTime.value=E8*3;const fb=c.createGain();fb.gain.value=0.28;const dlo=c.createGain();dlo.gain.value=0.35;
 LEADA.out.connect(dl);dl.connect(fb);fb.connect(dl);dl.connect(dlo);dlo.connect(mus);
 const DR=c.createGain();DR.gain.value=0.9;DR.connect(mus);
 const BS=c.createGain();BS.gain.value=0.45;BS.connect(mus);
 const PD=c.createGain();PD.gain.value=0.10;PD.connect(mus);
 // ---------- instruments ----------
 function gtrHit(root,t,dur,mute,vol=1,fifth=true){// power chord root/5th/octave, double-tracked L/R
  [[GL,0,-6],[GR,0.008,6]].forEach(([A,dt,det])=>{const tt=t+dt,g=c.createGain(),f=c.createBiquadFilter();f.type='lowpass';f.frequency.setValueAtTime(mute?1300:5000,tt);if(mute)f.frequency.exponentialRampToValueAtTime(380,tt+dur);
   const rel=mute?Math.min(dur,0.11):dur;g.gain.setValueAtTime(0.0001,tt);g.gain.exponentialRampToValueAtTime(0.5*vol,tt+0.004);g.gain.exponentialRampToValueAtTime(mute?0.05*vol:0.28*vol,tt+rel);g.gain.exponentialRampToValueAtTime(0.0005,tt+rel+0.06);
   f.connect(g);g.connect(A.in);for(const iv of fifth?[0,7,12]:[0,12]){const o=c.createOscillator();o.type='sawtooth';o.frequency.value=mf(root+iv);o.detune.value=det+(iv?3:0);o.connect(f);o.start(tt);o.stop(tt+rel+0.08);}});}
 function lead(n,t,dur,bendFrom=null,vib=true,vol=1){const g=c.createGain(),o=c.createOscillator(),o2=c.createOscillator();o.type='sawtooth';o2.type='square';o2.detune.value=8;
  const f=mf(n);if(bendFrom!=null){o.frequency.setValueAtTime(mf(bendFrom),t);o.frequency.linearRampToValueAtTime(f,t+Math.min(0.12,dur*0.4));o2.frequency.setValueAtTime(mf(bendFrom),t);o2.frequency.linearRampToValueAtTime(f,t+Math.min(0.12,dur*0.4));}else{o.frequency.setValueAtTime(f,t);o2.frequency.setValueAtTime(f,t);}
  if(vib&&dur>0.25){const l=c.createOscillator(),lg=c.createGain();l.frequency.value=5.8;lg.gain.setValueAtTime(0,t);lg.gain.linearRampToValueAtTime(f*0.012,t+dur*0.6);l.connect(lg);lg.connect(o.frequency);lg.connect(o2.frequency);l.start(t);l.stop(t+dur+0.1);}
  g.gain.setValueAtTime(0.0001,t);g.gain.exponentialRampToValueAtTime(0.35*vol,t+0.01);g.gain.setValueAtTime(0.3*vol,t+dur*0.8);g.gain.exponentialRampToValueAtTime(0.0005,t+dur+0.05);
  const m=c.createGain();m.gain.value=0.5;o.connect(g);o2.connect(m);m.connect(g);g.connect(LEADA.in);o.start(t);o2.start(t);o.stop(t+dur+0.1);o2.stop(t+dur+0.1);}
 function bass(n,t,dur,vol=1){const o=c.createOscillator(),s=c.createOscillator(),f=c.createBiquadFilter(),g=c.createGain();o.type='sawtooth';s.type='sine';o.frequency.value=mf(n);s.frequency.value=mf(n);f.type='lowpass';f.frequency.setValueAtTime(1400,t);f.frequency.exponentialRampToValueAtTime(500,t+dur);
  g.gain.setValueAtTime(0.0001,t);g.gain.exponentialRampToValueAtTime(0.5*vol,t+0.006);g.gain.exponentialRampToValueAtTime(0.25*vol,t+dur*0.9);g.gain.exponentialRampToValueAtTime(0.0005,t+dur+0.03);
  o.connect(f);f.connect(g);const sg=c.createGain();sg.gain.value=0.8;s.connect(sg);sg.connect(g);g.connect(BS);o.start(t);s.start(t);o.stop(t+dur+0.05);s.stop(t+dur+0.05);}
 function nz(t,dur,type,fq,q,vol,dst=DR){const s=c.createBufferSource(),f=c.createBiquadFilter(),g=c.createGain();s.buffer=noise;s.loop=true;f.type=type;f.frequency.value=fq;f.Q.value=q;g.gain.setValueAtTime(vol,t);g.gain.exponentialRampToValueAtTime(0.0005,t+dur);s.connect(f);f.connect(g);g.connect(dst);s.start(t,((t*7.31)%1)*0.5);s.stop(t+dur+0.02);return {s,f,g};}
 function kick(t,v=1){const o=c.createOscillator(),g=c.createGain();o.frequency.setValueAtTime(160,t);o.frequency.exponentialRampToValueAtTime(45,t+0.12);g.gain.setValueAtTime(0.7*v,t);g.gain.exponentialRampToValueAtTime(0.001,t+0.32);o.connect(g);g.connect(DR);o.start(t);o.stop(t+0.35);nz(t,0.015,'highpass',3000,0.7,0.25*v);}
 function snare(t,v=1){nz(t,0.18,'bandpass',2200,0.6,0.55*v);nz(t,0.08,'highpass',5000,0.7,0.25*v);const o=c.createOscillator(),g=c.createGain();o.type='triangle';o.frequency.setValueAtTime(220,t);o.frequency.exponentialRampToValueAtTime(160,t+0.08);g.gain.setValueAtTime(0.4*v,t);g.gain.exponentialRampToValueAtTime(0.001,t+0.12);o.connect(g);g.connect(DR);o.start(t);o.stop(t+0.15);}
 function hat(t,v=1,open=false){nz(t,open?0.25:0.045,'highpass',8000,0.8,0.16*v);}
 function ride(t,v=1){nz(t,0.4,'bandpass',6500,2,0.08*v);}
 function crash(t,v=1){nz(t,1.8,'highpass',5000,0.5,0.32*v);nz(t,0.9,'bandpass',3500,0.8,0.15*v);}
 function tom(t,f0,v=1){const o=c.createOscillator(),g=c.createGain();o.frequency.setValueAtTime(f0,t);o.frequency.exponentialRampToValueAtTime(f0*0.6,t+0.2);g.gain.setValueAtTime(0.6*v,t);g.gain.exponentialRampToValueAtTime(0.001,t+0.25);o.connect(g);g.connect(DR);o.start(t);o.stop(t+0.3);}
 function fill(i8,n8){for(let k=0;k<n8*2;k++){const t=at(i8)+k*S16;tom(t,[220,180,150,120][Math.floor(k/Math.max(1,n8/2))%4],0.8);if(k%2)snare(t,0.5);}}
 function pad(notes,t,dur,vol=1){notes.forEach(n=>[-9,0,9].forEach(d=>{const o=c.createOscillator(),f=c.createBiquadFilter(),g=c.createGain();o.type='sawtooth';o.frequency.value=mf(n);o.detune.value=d;f.type='lowpass';f.frequency.value=1800;
  g.gain.setValueAtTime(0.0001,t);g.gain.exponentialRampToValueAtTime(0.25*vol,t+Math.min(0.6,dur*0.3));g.gain.setValueAtTime(0.25*vol,t+dur*0.7);g.gain.exponentialRampToValueAtTime(0.0005,t+dur);o.connect(f);f.connect(g);g.connect(PD);o.start(t);o.stop(t+dur+0.05);}));}
 function riser(t0,t1){const r=nz(t0,t1-t0+0.05,'bandpass',400,2,0.18,mus);r.g.gain.cancelScheduledValues(t0);r.g.gain.setValueAtTime(0.02,t0);r.g.gain.exponentialRampToValueAtTime(0.22,t1);r.g.gain.linearRampToValueAtTime(0,t1+0.04);r.f.frequency.setValueAtTime(400,t0);r.f.frequency.exponentialRampToValueAtTime(7000,t1);
  const o=c.createOscillator(),g=c.createGain();o.type='sawtooth';o.frequency.setValueAtTime(mf(40),t0);o.frequency.exponentialRampToValueAtTime(mf(76),t1);g.gain.setValueAtTime(0.0001,t0);g.gain.exponentialRampToValueAtTime(0.5,t1);g.gain.linearRampToValueAtTime(0,t1+0.03);o.connect(g);g.connect(GL.in);o.start(t0);o.stop(t1+0.05);}
 return {T0,E8,S16,at,snap,mf,mus,mvol,GL,GR,gtrHit,lead,bass,nz,kick,snare,hat,ride,crash,tom,fill,pad,riser};}
// ---------- UNIT 01 theme: "DESTINED RED" (E minor, 158.5 BPM, anime-opening hard rock) ----------
const E=40,G=43,A=45,B=47,C=48,D=50;
const RIFF=[[E,1],[E,1],[G,0,2],null,[E,1],[A,0,2],null,[E,1],[E,1],[D,0,2],null,[C,0,1],[B,0,1],[E,1],[E,1],[B,0,1]];// intro riff (2 bars)
const CHORD=[E,C,D,B];// chorus per bar: Em C D B
const HOOK=[ // [8th offset in 4-bar phrase, midi, len8, bendFrom]
  [0,76,2],[2,79,1],[3,81,1],[4,83,3,81],[7,81,1], [8,84,2],[10,83,1],[11,81,1],[12,79,2],[14,76,2],
  [16,78,2],[18,79,1],[19,81,1],[20,86,4,84], [24,83,3,82],[27,81,1],[28,78,2],[30,75,2]];
// cue: ultimate (PRISM REQUIEM, full 40 s arrangement)
function U01_ultimate(k,K,endI,EVW){const {T0,E8,S16,at,snap,mf,mus,mvol,GL,GR,gtrHit,lead,bass,nz,kick,snare,hat,ride,crash,tom,fill,pad,riser}=k;
 
 const iWings=K.wings,iDash=K.dash,iLaunch=K.launch,iJump=K.crouch,iFly=K.fly,iX=K.xstart,iLock=K.xlock,iBeam=K.beam,iFace=K.cutface,iEye=K.eyezoom,iStrip=K.eyestrip,iBack=K.cutback,iEx5=K.ex5,iHero=K.hero;
 const SEC=i=>i<iWings?'intro0':i<iDash?'intro':i<iJump?'verse':i<iFly?'build':i<iBeam?'chorus':i<iFace?'beam':i<iBack?'brk':i<iHero?'boom':'end';

 for(let i=0;i<=endI;i++){const sc=SEC(i),t=at(i),bar=Math.floor(i/8),b8=((i%8)+8)%8;
  if(sc==='intro0'){// quote: sparse clean-ish stabs + ride, cymbal swell into wings
   if(i===K.dlg){crash(t,0.6);pad([40,47,52,59],t+0.3,Math.max(1,at(iWings)-t-0.3),0.8);gtrHit(E,t,1.4,false,0.7);bass(E-12+12,t,1.4);kick(t);}
   if(i>K.dlg+8&&b8===0&&(bar%2===0)){gtrHit(E,t,0.9,false,0.45);bass(E,t,0.9,0.7);}
   if(i>K.dlg+4&&i%2===0)ride(t,1.0);if(i>K.dlg+4&&b8===0)kick(t,0.6);
   if(i>=iWings-4)snare(t,0.5+0.1*(i-iWings+4));continue;}
  if(sc==='intro'){const r=RIFF[(i-iWings)%16];if(r){gtrHit(r[0],t,(r[2]||1)*E8*0.95,!!r[1],1);bass(r[0],t,(r[2]||1)*E8*0.9);}
   if(i===iWings)crash(t);if(b8===0||b8===3||b8===5)kick(t);if(b8===2||b8===6)snare(t);hat(t,b8%2?0.6:1);
   if(i>=iDash-4)fill(i,1);continue;}
  if(sc==='verse'){// driving 16th chug on E with accents
   for(let h=0;h<2;h++){const tt=t+h*S16,acc=(b8===3&&h===1)||(b8===7&&h===0);gtrHit(acc?G:E,tt,S16*0.9,!acc,acc?1:0.8);}
   bass(E,t,E8*0.9);kick(t,0.9);if(b8%2===1)kick(t+S16,0.6);if(b8===2||b8===6)snare(t);hat(t);hat(t+S16,0.5);
   if(i===iDash||i===iLaunch){crash(t);gtrHit(i===iLaunch?A:E,t,E8*3,false,1.1);}continue;}
  if(sc==='build'){const u=(i-iJump)/(iFly-iJump);// tremolo chord climbing, snare roll accelerating
   const root=[E,G,A,B][Math.min(3,Math.floor(u*4))];gtrHit(root,t,S16*0.8,true,0.6+0.5*u);gtrHit(root,t+S16,S16*0.8,true,0.6+0.5*u);bass(root,t,E8*0.9,0.8);
   const sub=u<0.5?1:u<0.8?2:4;for(let h=0;h<sub;h++)snare(t+h*E8/sub,0.3+0.6*u);if(b8%2===0)kick(t,0.8);
   if(i===iJump)riser(t,at(iFly));if(i===K.leap)crash(t,0.7);continue;}
  if(sc==='chorus'){const ph=(i-iFly),pb=Math.floor(ph/8)%4,root=CHORD[pb];
   if(ph===0)crash(t,1.1);if(b8===0&&ph>0)crash(t,0.5);
   gtrHit(root,t,E8*0.95,b8%2===1,b8%2?0.7:1);bass(root,t,E8*0.9);
   if(b8===0||b8===3||b8===4||b8===7)kick(t);if(b8===2||b8===6)snare(t);ride(t,b8%2?0.5:0.9);
   const inShred=i>=iX&&i<iLock+2;
   if(!inShred){const h=HOOK.filter(x=>x[0]===ph%32);for(const x of h)lead(x[1],t,x[2]*E8*0.95,x[3]??null);}
   else{// transform shred: 16th arpeggio run climbing Em -> B
    const ARP=[64,67,71,76,79,83,88,83];for(let h=0;h<2;h++){const k=(i-iX)*2+h,n=ARP[k%8]+12*Math.floor(k/16)*0+((k>=16)?2:0);lead(Math.min(91,n+Math.floor(k/8)*0),t+h*S16,S16*0.9,null,false,0.85);}}
   if(i===iX||i===iLock)crash(t);if(i>=iBeam-2)fill(i,1);continue;}
  if(sc==='beam'){// biggest moment: double-kick, open huge chords, high hook, pad
   const ph=i-iBeam,pb=Math.floor(ph/8)%4,root=[C,D,E,E][pb];
   if(ph===0){crash(t,1.4);crash(t+0.01,0.8);pad([64,67,71,76],t,at(iFace)-t,1.2);}
   if(b8===0)crash(t,0.6);if(b8===0||b8===4)gtrHit(root,t,E8*3.8,false,1.15);if(b8===2||b8===6)gtrHit(root,t,E8*0.9,true,0.7);
   bass(root,t,E8*0.9);kick(t);kick(t+S16,0.7);if(b8===2||b8===6)snare(t,1.1);ride(t,0.8);
   const hk=HOOK.filter(x=>x[0]===ph%32);for(const x of hk)lead(x[1]+12>91?x[1]:x[1]+12-12,t,x[2]*E8*0.95,x[3]??null,true,1.1);
   continue;}
  if(sc==='brk'){// stop-time on the pilot close-up: hits only on cues, silence between
   if(i===iFace){gtrHit(E,t,E8*1.5,false,1.1);kick(t);crash(t,0.7);bass(E,t,E8*1.5);}
   if(i===iFace+4||i===iFace+6){gtrHit(E,t,E8*0.6,true,0.9);kick(t);snare(t,0.8);}
   if(i===iEye){gtrHit(B,t,E8*3,false,1.2);bass(B,t,E8*3);kick(t,1.2);crash(t,1);lead(83,t,E8*3,81,true,0.9);}
   if(i===iStrip){gtrHit(C,t,E8*1.5,false,1.1);kick(t);snare(t);}
   if(i>iStrip&&i<iBack){hat(t,0.7);if(i>=iBack-3)fill(i,1);}continue;}
  if(sc==='boom'){// half-time heavy chug with a crash on every explosion
   const r=b8<4?E:C;gtrHit(r,t,E8*0.9,b8%4!==0,b8%4===0?1.15:0.8);bass(r,t,E8*0.9);if(b8===0||b8===1||b8===5)kick(t);if(b8===4)snare(t,1.2);hat(t,0.7);
   for(const k of ['palm','ex1','ex2','ex3','ex4','ex5'])if(i===K[k])crash(t,k==='ex5'?1.4:0.7);
   if(i===iEx5){gtrHit(E,t,E8*2,false,1.2);}
   if(i>=iHero-3)fill(i,1);continue;}
  if(sc==='end'){// held power chord with the pose, ring out
   if(i===iHero){const L=Math.max(2,at(endI)-t-0.3);crash(t,1.4);kick(t,1.2);gtrHit(E,t,L,false,1.1);gtrHit(E-12+12,t+0.02,L,false,0.6,false);bass(E,t,L*0.8);pad([52,59,64,67,71],t,L,1);lead(88,t+E8*2,L*0.55,86,true,0.8);
    snare(t+E8*2,0.8);}
   continue;}}
 return [['dash',0.5,0.35],['launch',0.45,0.4],['leap',0.5,0.4],['air1',0.6,0.2],['air2',0.6,0.2],['air3',0.6,0.2],['beam',0.4,1.2],['palm',0.5,0.4],['ex1',0.55,0.35],['ex2',0.55,0.35],['ex3',0.55,0.35],['ex4',0.55,0.35],['ex5',0.45,0.6],['eyezoom',0.7,0.3]];}
// cue: fist (IRON KNUCKLE RUSH, ~14 s edit of the same theme: riff -> verse chug on the punches -> build -> hook stab on the kick -> held chord)
function U01_fist(k,K,endI,EVW){const {T0,E8,S16,at,snap,mf,mus,mvol,GL,GR,gtrHit,lead,bass,nz,kick,snare,hat,ride,crash,tom,fill,pad,riser}=k;
 for(let i=0;i<=endI;i++){const t=at(i),b8=((i%8)+8)%8;
  if(i<K.drop){if(i===K.dlg){gtrHit(E,t,1.2,false,0.6);bass(E,t,1.2,0.7);kick(t,0.8);crash(t,0.5);}if(i>K.dlg+2&&i%2===0)ride(t,0.8);continue;}
  if(i<K.dash){const r=RIFF[(i-K.drop)%16];if(r){gtrHit(r[0],t,(r[2]||1)*E8*0.95,!!r[1],0.9);bass(r[0],t,(r[2]||1)*E8*0.9);}
   if(i===K.drop)crash(t,0.8);if(b8===0||b8===3||b8===5)kick(t);if(b8===2||b8===6)snare(t);hat(t,b8%2?0.6:1);if(i>=K.dash-2)fill(i,1);continue;}
  if(i<K.cutin){for(let h=0;h<2;h++){const tt=t+h*S16;gtrHit(E,tt,S16*0.9,true,0.8);}bass(E,t,E8*0.9);kick(t,0.9);if(b8===2||b8===6)snare(t);hat(t);hat(t+S16,0.5);
   for(const n of ['dash','jab','cross','upper'])if(i===K[n]){crash(t,n==='upper'?1:0.6);gtrHit(n==='upper'?A:n==='cross'?G:E,t,E8*2,false,1.05);}continue;}
  if(i<K.khit){const u=(i-K.cutin)/Math.max(1,K.khit-K.cutin),root=[E,G,A,B][Math.min(3,Math.floor(u*4))];gtrHit(root,t,S16*0.8,true,0.6+0.5*u);gtrHit(root,t+S16,S16*0.8,true,0.6+0.5*u);bass(root,t,E8*0.9,0.8);
   const sub=u<0.5?1:2;for(let h=0;h<sub;h++)snare(t+h*E8/sub,0.3+0.6*u);if(i===K.cutin)riser(t,at(K.khit));continue;}
  if(i<K.ret){const ph=i-K.khit,root=CHORD[Math.floor(ph/8)%4];if(ph===0){crash(t,1.4);kick(t,1.2);}
   gtrHit(root,t,E8*0.95,b8%2===1,b8%2?0.7:1);bass(root,t,E8*0.9);if(b8===0||b8===3||b8===4||b8===7)kick(t);if(b8===2||b8===6)snare(t);ride(t,b8%2?0.5:0.9);
   for(const x of HOOK.filter(x=>x[0]===ph%32))lead(x[1],t,x[2]*E8*0.95,x[3]??null);continue;}
  if(i===K.pose){const L=Math.max(1.5,at(endI)-t-0.2);crash(t,1.2);kick(t,1.1);gtrHit(E,t,L,false,1.05);bass(E,t,L*0.8);pad([52,59,64,67],t,L,0.9);lead(83,t+E8,L*0.5,81,true,0.7);}
  else if(i>=K.ret&&i<K.pose){gtrHit(i%2?B:E,t,E8*0.6,true,0.8);kick(t,0.8);if(i>=K.pose-2)fill(i,1);}}
 return [['jab',0.65,0.15],['cross',0.65,0.15],['upper',0.6,0.2],['khit',0.45,0.5],['drop',0.7,0.2]];}
// cue: beam (CRIMSON RAIL BARRAGE, ~17.7 s edit: riff -> 16th chug with stabs on the 3 shots -> tom run over the vault -> stop on BEHIND -> pedal under the cut-in -> riser charge -> hook on the big beam -> fly-out chug -> held chord)
function U01_beam(k,K,endI,EVW){const {T0,E8,S16,at,snap,mf,mus,mvol,GL,GR,gtrHit,lead,bass,nz,kick,snare,hat,ride,crash,tom,fill,pad,riser}=k;
 for(let i=0;i<=endI;i++){const t=at(i),b8=((i%8)+8)%8;
  if(i<K.arm){if(i===K.dlg){gtrHit(E,t,1.2,false,0.6);bass(E,t,1.2,0.7);kick(t,0.8);crash(t,0.5);}if(i>K.dlg+2&&i%2===0)ride(t,0.8);continue;}
  if(i<K.dash){const r=RIFF[(i-K.arm)%16];if(r){gtrHit(r[0],t,(r[2]||1)*E8*0.95,!!r[1],0.9);bass(r[0],t,(r[2]||1)*E8*0.9);}
   if(i===K.arm)crash(t,0.8);if(b8===0||b8===3||b8===5)kick(t);if(b8===2||b8===6)snare(t);hat(t,b8%2?0.6:1);if(i>=K.dash-2)fill(i,1);continue;}
  if(i<K.vault){for(let h=0;h<2;h++)gtrHit(E,t+h*S16,S16*0.9,true,0.8);bass(E,t,E8*0.9);kick(t,0.9);if(b8===2||b8===6)snare(t);hat(t);hat(t+S16,0.5);
   for(const n of ['dash','s1','s2','s3'])if(i===K[n]){crash(t,n==='s3'?1:0.6);gtrHit(n==='s3'?A:n==='s2'?G:n==='s1'?D:E,t,E8*1.5,false,1.05);}continue;}
  if(i<K.behind){tom(t,[220,180,150,120][(i-K.vault)%4],0.9);tom(t+S16,[200,165,135,110][(i-K.vault)%4],0.7);if(i===K.vault)riser(t,at(K.behind));continue;}
  if(i<K.cutin){if(i===K.behind){crash(t,1.2);kick(t,1.2);gtrHit(B,t,E8*2.5,false,1.15);bass(B,t,E8*2.5);}continue;}
  if(i<K.charge){bass(E,t,E8*0.8,0.7);if(b8%2===0)kick(t,0.7);hat(t,0.6);if(i===K.cutin){gtrHit(E,t,E8*2,false,0.9);crash(t,0.6);}continue;}
  if(i<K.fire){const u=(i-K.charge)/Math.max(1,K.fire-K.charge),root=[E,G,A,B][Math.min(3,Math.floor(u*4))];gtrHit(root,t,S16*0.8,true,0.6+0.5*u);gtrHit(root,t+S16,S16*0.8,true,0.6+0.5*u);bass(root,t,E8*0.9,0.8);
   const sub=u<0.5?1:2;for(let h=0;h<sub;h++)snare(t+h*E8/sub,0.3+0.6*u);if(i===K.charge)riser(t,at(K.fire));continue;}
  if(i<K.fly){const ph=i-K.fire,root=CHORD[Math.floor(ph/8)%4];if(ph===0||i===K.big){crash(t,1.4);kick(t,1.2);}
   gtrHit(root,t,E8*0.95,b8%2===1,b8%2?0.7:1);bass(root,t,E8*0.9);if(b8===0||b8===3||b8===4||b8===7)kick(t);if(b8===2||b8===6)snare(t);ride(t,b8%2?0.5:0.9);
   for(const x of HOOK.filter(x=>x[0]===ph%32))lead(x[1],t,x[2]*E8*0.95,x[3]??null);continue;}
  if(i===K.pose){const L=Math.max(1.5,at(endI)-t-0.2);crash(t,1.2);kick(t,1.1);gtrHit(E,t,L,false,1.05);bass(E,t,L*0.8);pad([52,59,64,67],t,L,0.9);lead(83,t+E8,L*0.5,81,true,0.7);}
  else if(i>=K.fly&&i<K.pose){gtrHit(i%2?B:E,t,E8*0.6,true,0.8);kick(t,0.8);if(i===K.ex)crash(t,1);if(i>=K.pose-2)fill(i,1);}}
 return [['h1',0.65,0.15],['h2',0.65,0.15],['h3',0.65,0.15],['fire',0.45,0.5],['big',0.45,0.5]];}
function U01_sword(k,K,endI,EVW){const {T0,E8,S16,at,snap,mf,mus,mvol,GL,GR,gtrHit,lead,bass,nz,kick,snare,hat,ride,crash,tom,fill,pad,riser}=k;
 const RISE=[0,0,3,3,5,5,7,7,10,12];// combo stabs climb E -> E' with the hit counter
 for(let i=1;i<=10;i++){const t=T0+EVW['h'+i],r=E+RISE[i-1];gtrHit(r,t,i===10?E8*2:S16*1.6,false,0.85+i*0.025);bass(r,t,S16*1.6);kick(t,0.9);if(i===10){crash(t,1.3);snare(t,1);}}
 {const t=T0+EVW.pierce;crash(t,1.5);kick(t,1.3);gtrHit(B,t,E8*1.2,false,1.15);bass(B,t,E8);}
 for(const n of ['ex1','ex2','ex3']){const t=T0+EVW[n];kick(t,1.1);crash(t,n==='ex3'?1.3:0.7);}
 for(let i=0;i<=endI;i++){const t=at(i),b8=((i%8)+8)%8;
  if(i<K.ignite){if(i===K.dlg){gtrHit(E,t,1.2,false,0.6);bass(E,t,1.2,0.7);kick(t,0.8);crash(t,0.5);}if(i>K.dlg+2&&i%2===0)ride(t,0.8);continue;}
  if(i<K.dash){const r=RIFF[(i-K.ignite)%16];if(r){gtrHit(r[0],t,(r[2]||1)*E8*0.95,!!r[1],0.9);bass(r[0],t,(r[2]||1)*E8*0.9);}
   if(i===K.ignite)crash(t,0.8);if(b8===0||b8===3||b8===5)kick(t);if(b8===2||b8===6)snare(t);hat(t,b8%2?0.6:1);if(i>=K.dash-2)fill(i,1);continue;}
  if(i<K.h1){tom(t,[200,170][i%2],0.8);tom(t+S16,[180,150][i%2],0.6);continue;}
  if(i<K.launch){const u=(i-K.h1)/Math.max(1,K.h10-K.h1);gtrHit(E,t,S16*0.9,true,0.55+0.25*u);gtrHit(E,t+S16,S16*0.9,true,0.5+0.25*u);if(b8===2||b8===6)snare(t,0.7);hat(t);hat(t+S16,0.4+0.5*u);
   if(u>0.5){hat(t+S16/2,0.4);}continue;}
  if(i<K.cutin){if(i===K.launch){riser(t,at(K.launch+3));tom(t,220,0.9);tom(t+S16,180,0.8);tom(t+E8,150,0.8);tom(t+E8+S16,120,0.9);}
   if(i===K.launch+4){gtrHit(B,t,E8*3,false,0.9);bass(B,t,E8*3);crash(t,0.7);}if(i>K.launch+7&&b8%4===0)bass(E,t,E8*0.6,0.5);continue;}
  if(i<K.glint){bass(E,t,E8*0.8,0.7);if(b8%2===0)kick(t,0.7);hat(t,0.6);if(i===K.cutin){gtrHit(E,t,E8*2,false,0.9);crash(t,0.6);}if(i===K.glint-3)riser(t,at(K.dash2));continue;}
  if(i<K.pierce)continue;// silence: glint + approach
  if(i<K.land)continue;// freeze frame hangs on the pierce chord
  if(i<K.ex3){bass(E,t,E8*0.7,0.6);if(b8%2===0)hat(t,0.5);continue;}
  if(i<K.pose){const ph=i-K.ex3,root=CHORD[Math.floor(ph/4)%4];gtrHit(root,t,E8*0.95,b8%2===1,b8%2?0.7:1);bass(root,t,E8*0.9);if(b8===0||b8===3||b8===4||b8===7)kick(t);if(b8===2||b8===6)snare(t);ride(t,b8%2?0.5:0.9);
   for(const x of HOOK.filter(x=>x[0]===ph%32))lead(x[1],t,x[2]*E8*0.95,x[3]??null);if(i>=K.pose-2)fill(i,1);continue;}
  if(i===K.pose){const L=Math.max(1.5,at(endI)-t-0.2);crash(t,1.2);kick(t,1.1);gtrHit(E,t,L,false,1.05);bass(E,t,L*0.8);pad([52,59,64,67],t,L,0.9);lead(83,t+E8,L*0.5,81,true,0.7);}}
 return [...[1,2,3,4,5,6,7,8,9,10].map(i=>['h'+i,0.75,0.08]),['pierce',0.45,0.4],['ex3',0.55,0.4]];}
function U01_wing(k,K,endI,EVW){const {T0,E8,S16,at,snap,mf,mus,mvol,GL,GR,gtrHit,lead,bass,nz,kick,snare,hat,ride,crash,tom,fill,pad,riser}=k;
 // the most epic Unit 01 cue: choir-like pad swells over the wing build, full band on the beam, hits locked to the ticks
 const CH=[[52,59,64,67,71],[48,55,64,67,72],[50,57,62,66,69],[47,54,62,66,71]];// Em - C - D - B (Em(add9)-ish voicings, layered as a "choir")
 const choir=(c,t,L,v)=>{pad(c,t,L,v);pad(c.map(n=>n+12),t+0.02,L,v*0.45);};
 {const t=T0+EVW.fire;crash(t,1.5);kick(t,1.4);gtrHit(E,t,E8*2,false,1.15);bass(E-12+12,t,E8*2);}
 {const t=T0+EVW.impact;crash(t,1.5);kick(t,1.4);snare(t,1.1);gtrHit(B,t,E8*1.5,false,1.1);}
 for(let i=1;i<=7;i++){const t=T0+EVW['t'+i];kick(t,1);snare(t,0.8);gtrHit(E+[0,3,5,7,10,12,15][i-1],t,E8*0.9,false,0.9);}
 {const t=T0+EVW.big;crash(t,1.6);kick(t,1.4);snare(t,1.2);gtrHit(E+12,t,E8*2,false,1.15);bass(E,t,E8*2);}
 for(const n of ['ex1','ex2','ex3']){const t=T0+EVW[n];kick(t,1.1);crash(t,n==='ex3'?1.3:0.7);}
 for(let i=0;i<=endI;i++){const t=at(i),b8=((i%8)+8)%8;
  if(i<K.raise){if(i===K.dlg){bass(E,t,2,0.6);crash(t,0.4);choir(CH[0],t,E8*9,0.45);}continue;}
  if(i<K.grow){if(i===K.raise){riser(t,at(K.grow));}continue;}
  if(i<K.cutin){const ph=i-K.grow;if(ph%8===0)choir(CH[Math.floor(ph/8)%4],t,E8*8.4,0.55+0.25*(i-K.grow)/(K.cutin-K.grow));
   if(ph%4===0)bass(CH[Math.floor(ph/8)%4][0]-12+12,t,E8*3.6,0.6);if(i>=K.mult&&b8%4===0)kick(t,0.7);if(i>=K.bright)hat(t,0.5);if(i===K.mult||i===K.bright)crash(t,0.6);
   if(i>=K.glint&&i<K.cutin){tom(t,[220,190][i%2],0.7);}continue;}
  if(i<K.dis){if(i===K.cutin){crash(t,1);gtrHit(E,t,E8*3,false,1);bass(E,t,E8*3);choir(CH[0],t,E8*8,0.8);lead(76,t+E8,E8*5,79,true,0.6);}continue;}
  if(i<K.fire){const ph=i-K.dis;if(ph%4===0)choir(CH[(Math.floor(ph/4)+1)%4],t,E8*4.2,0.6+0.35*ph/(K.fire-K.dis));if(b8%2===0)kick(t,0.5+0.4*ph/(K.fire-K.dis));hat(t,0.5);
   if(i===K.full)riser(t,at(K.fire));if(i>=K.fire-2)fill(i,1);continue;}
  if(i<K.back){const ph=i-K.fire,root=CHORD[Math.floor(ph/4)%4];if(!(['t1','t2','t3','t4','t5','t6','t7','impact','big'].some(n=>K[n]===i)))gtrHit(root,t,E8*0.9,b8%2===1,b8%2?0.6:0.85);bass(root,t,E8*0.9);
   if(b8===2||b8===6)snare(t,0.8);ride(t,b8%2?0.5:0.9);if(ph%8===0)choir(CH[Math.floor(ph/8)%4],t,E8*8,0.7);
   for(const x of HOOK.filter(x=>x[0]===ph%32))lead(x[1],t,x[2]*E8*0.95,x[3]??null);continue;}
  if(i<K.pose){const ph=i-K.back;if(ph%4===0)choir(CH[(Math.floor(ph/4)+2)%4],t,E8*4.2,0.6);bass(E,t,E8*0.7,0.5);if(b8%2===0)hat(t,0.5);if(i===K.reform)crash(t,0.6);if(i>=K.pose-2)fill(i,1);continue;}
  if(i===K.pose){const L=Math.max(1.5,at(endI)-t-0.2);crash(t,1.3);kick(t,1.2);gtrHit(E,t,L,false,1.05);bass(E,t,L*0.8);choir([52,59,64,67,71,76],t,L,1);lead(83,t+E8,L*0.5,88,true,0.7);}}
 return [['impact',0.5,0.3],...[1,2,3,4,5,6,7].map(i=>['t'+i,0.8,0.1]),['big',0.5,0.4],['ex3',0.55,0.4]];}

window.THEMES={unit01:{name:'DESTINED RED',key:'E minor',bpm:158.5,off:0.145,cues:{ultimate:U01_ultimate,fist:U01_fist,beam:U01_beam,sword:U01_sword,wing:U01_wing}}};
window.PLAYTHEME=function(themeId,cueId,c,dest,EVW,ENDW,noiseBuf){const th=THEMES[themeId]||THEMES.unit01,arr=th.cues[cueId]||th.cues.ultimate;
 const k=KIT(c,dest,ENDW,noiseBuf,th.bpm,th.off),K={};for(const n in EVW)K[n]=k.snap(EVW[n]);const endI=Math.floor((ENDW-th.off)/k.E8);
 const DUCK=arr(k,K,endI,EVW),mus=k.mus,T0=k.T0;
 mus.gain.setValueAtTime(1,T0);
 for(const [n,d,r] of DUCK){if(EVW[n]==null)continue;const t=T0+EVW[n];mus.gain.setValueAtTime(1,t-0.01);mus.gain.linearRampToValueAtTime(d,t+0.015);mus.gain.setValueAtTime(d,t+0.06);mus.gain.linearRampToValueAtTime(1,t+0.06+r);}
 k.mvol.gain.setValueAtTime(0.9,T0+ENDW-1.2);k.mvol.gain.linearRampToValueAtTime(0.0001,T0+ENDW);
 return {theme:themeId,cue:cueId,bpm:th.bpm,off:th.off,e8:k.E8,K};};
window.ROCKMUSIC=(c,dest,EVW,ENDW,nb)=>PLAYTHEME('unit01','ultimate',c,dest,EVW,ENDW,nb);// 3j compatibility
})();
