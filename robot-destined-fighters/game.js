// Robot Destined Fighters — Stage 1 map battle (G.Creation)
(function(){
const W=640,H=400,CW=10,CH=7,CS=44,OX=8,OY=30;
const cv=document.getElementById('view'),X=cv.getContext('2d');X.imageSmoothingEnabled=false;
const F=window.FONT,SM=window.SPRMETA;
const img=s=>{const i=new Image();i.src='assets/'+s;return i;};
const IM={spr:img('sprites.png'),sky:img('sky_sunset.png'),port:img('port_small.png')};
const MAPNAME='STAGE 1: CRIMSON HARBOR';
// terrain: . plain, # ruin (blocked), ^ forest (def+), = road
const TER=["..^...#...","..^.....^.","#...=.=...","....===..#",".^..=.=.^.","....#.....","...^......"];
const blocked=(x,y)=>TER[y][x]==='#';
const ETYPES=[
 ['HORNET DRONE','didle','ddmg',null,2400,320,1,2],['HORNET DRONE','didle','ddmg',null,2400,320,1,2],
 ['VIPER DRONE','didle','ddmg','#30c060',2800,380,2,3],['VIPER DRONE','didle','ddmg','#30c060',2800,380,2,3],
 ['GRAVTREAD WALKER','widle','wdmg',null,3600,450,1,2],['GRAVTREAD WALKER','widle','wdmg',null,3600,450,1,2],
 ['IRONHULL WALKER','widle','wdmg','#4060d0',4200,500,1,2],['SPECTER DRONE','didle','ddmg','#9050e0',3000,420,2,3],
 ['SPECTER DRONE','didle','ddmg','#9050e0',3000,420,2,3],['WARLORD BASTION','widle','wdmg','#e0b020',6000,650,2,2]];
const EPOS=[[6,0],[7,1],[8,2],[5,3],[7,3],[8,4],[6,5],[9,5],[9,0],[9,6]];
let G;
function newGame(){G={scene:'map',turn:1,phase:'player',sel:null,mode:'idle',moves:null,targets:null,msg:'Select DESTINED RED UNIT 01.',anim:null,q:[],t:0,banner:{txt:'PLAYER PHASE',t:1.2},
 u:{name:'DESTINED RED UNIT 01',pilot:'CLEMENT',x:1,y:3,hp:8000,mhp:8000,en:200,men:200,mv:5,acted:false,moved:false,ox:1,oy:3},
 e:ETYPES.map((t,i)=>({id:i,name:t[0],idle:t[1],dmgp:t[2],tint:t[3],hp:t[4],mhp:t[4],atk:t[5],rmax:t[6],mv:t[7],x:EPOS[i][0],y:EPOS[i][1],flash:0}))};}
const ATKS=[{n:'IRON KNUCKLE RUSH',r0:1,r1:1,p:1500,en:0,pose:'jab',fx:'fist'},{n:'CRIMSON RAIL BARRAGE',r0:1,r1:3,p:1200,en:15,pose:'cannon2',fx:'beam'},{n:'SCARLET TEMPEST EDGE',r0:1,r1:1,p:2200,en:30,pose:'s_mid',fx:'sword'},{n:'PRISM REQUIEM',r0:1,r1:2,p:4200,en:80,pose:'f_palm',fx:'ult'}];
const alive=()=>G.e.filter(e=>e.hp>0);
const occ=(x,y,ex)=>(G.u.hp>0&&G.u.x===x&&G.u.y===y&&ex!==G.u)||G.e.some(e=>e.hp>0&&e!==ex&&e.x===x&&e.y===y);
const dist=(a,b)=>Math.abs(a.x-b.x)+Math.abs(a.y-b.y);
function reach(sx,sy,mv,self){const d={},q=[[sx,sy,0]];d[sx+','+sy]=0;const isU=self===G.u;
 while(q.length){const [x,y,c]=q.shift();if(c>=mv)continue;for(const [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]]){const nx=x+dx,ny=y+dy;if(nx<0||ny<0||nx>=CW||ny>=CH||blocked(nx,ny))continue;
  const k=nx+','+ny;if(k in d)continue;if(isU?G.e.some(e=>e.hp>0&&e.x===nx&&e.y===ny):(G.u.x===nx&&G.u.y===ny))continue;d[k]=c+1;q.push([nx,ny,c+1]);}}
 return Object.keys(d).map(k=>k.split(',').map(Number)).filter(([x,y])=>!occ(x,y,self));}
const defT=e=>TER[e.y][e.x]==='^'?0.8:1;
// ---------- drawing helpers ----------
const tc={};function tinted(tint){if(!tint)return IM.spr;if(tc[tint])return tc[tint];if(!IM.spr.naturalWidth)return IM.spr;const c=document.createElement('canvas');c.width=IM.spr.width;c.height=IM.spr.height;const x=c.getContext('2d');x.drawImage(IM.spr,0,0);x.globalCompositeOperation='source-atop';x.globalAlpha=0.45;x.fillStyle=tint;x.fillRect(0,0,c.width,c.height);return tc[tint]=c;}
const wc={};function white(){if(wc.c)return wc.c;if(!IM.spr.naturalWidth)return IM.spr;const c=document.createElement('canvas');c.width=IM.spr.width;c.height=IM.spr.height;const x=c.getContext('2d');x.drawImage(IM.spr,0,0);x.globalCompositeOperation='source-atop';x.fillStyle='#fff';x.fillRect(0,0,c.width,c.height);return wc.c=c;}
function spr(name,x,y,s,flip,tint,flash){const m=SM[name];if(!m||!IM.spr.complete)return;const src=flash?white():tinted(tint);X.save();X.translate(Math.round(x),Math.round(y));if(flip)X.scale(-1,1);
 X.drawImage(src,m.x,m.y,m.w,m.h,Math.round(-m.ax*s),Math.round(-m.ay*s),Math.round(m.w*s),Math.round(m.h*s));X.restore();}
function panel(x,y,w,h){X.fillStyle='#05060c';X.fillRect(x-1,y-1,w+2,h+2);X.fillStyle='#9aa3bf';X.fillRect(x,y,w,h);X.fillStyle='#d8deec';X.fillRect(x,y,w,1);X.fillRect(x,y,1,h);X.fillStyle='#141828';X.fillRect(x+2,y+2,w-4,h-4);}
function bar(x,y,w,v,c){X.fillStyle='#05060c';X.fillRect(x-1,y-1,w+2,8);X.fillStyle='#2a2030';X.fillRect(x,y,w,6);X.fillStyle=c;X.fillRect(x,y,Math.round(w*Math.max(0,v)),6);X.fillStyle='rgba(255,255,255,.35)';X.fillRect(x,y,Math.round(w*Math.max(0,v)),2);}
const txt=(s,x,y,c='#f0f4ff',sc=1)=>F.draw(X,String(s),x,y,c,sc);
const tw=(s,sc=1)=>String(s).length*6*sc;
const BTN={end:[456,330,84,22],wait:[548,330,84,22]};
let menu=[];// action menu buttons
function button(r,label,on,hot){X.fillStyle='#05060c';X.fillRect(r[0]-1,r[1]-1,r[2]+2,r[3]+2);X.fillStyle=!on?'#3a3c46':hot?'#cf2a34':'#2b3f8c';X.fillRect(...r);X.fillStyle='rgba(255,255,255,.25)';X.fillRect(r[0],r[1],r[2],2);txt(label,r[0]+((r[2]-tw(label))>>1),r[1]+((r[3]-7)>>1),on?'#fff':'#888');}
let mouse={x:-1,y:-1};
function drawMap(){X.fillStyle='#0a0c18';X.fillRect(0,0,W,H);
 // header
 panel(4,4,632,22);txt(MAPNAME,12,12,'#ffd27a');txt('TURN '+G.turn,300,12);txt((G.phase==='player'?'PLAYER':'ENEMY')+' PHASE',380,12,G.phase==='player'?'#7eefff':'#ff715c');txt('ENEMIES LEFT: '+alive().length+'/10',510,12,'#ff715c');
 // grid
 for(let y=0;y<CH;y++)for(let x=0;x<CW;x++){const t=TER[y][x],px=OX+x*CS,py=OY+y*CS;
  X.fillStyle=t==='#'?'#3a3236':t==='^'?'#1f4a2c':t==='='?'#4a4a56':((x+y)&1?'#2e5a3a':'#326040');X.fillRect(px,py,CS,CS);
  if(t==='^'){X.fillStyle='#163a20';for(let i=0;i<3;i++){X.fillRect(px+8+i*12,py+14+(i&1)*10,8,12);}X.fillStyle='#2f7a3c';for(let i=0;i<3;i++)X.fillRect(px+9+i*12,py+12+(i&1)*10,6,6);}
  if(t==='#'){X.fillStyle='#59505a';X.fillRect(px+6,py+10,14,30);X.fillRect(px+24,py+18,14,22);X.fillStyle='#1a1418';for(let i=0;i<4;i++)X.fillRect(px+9+(i&1)*5,py+14+(i>>1)*8,3,4);}
  if(t==='='){X.fillStyle='#8a8a60';X.fillRect(px+20,py+4,4,10);X.fillRect(px+20,py+28,4,10);}
  X.fillStyle='rgba(0,0,0,.35)';X.fillRect(px,py,CS,1);X.fillRect(px,py,1,CS);}
 const hl=(arr,c)=>{if(!arr)return;X.fillStyle=c;for(const [x,y] of arr)X.fillRect(OX+x*CS+1,OY+y*CS+1,CS-2,CS-2);};
 if(G.mode==='move')hl(G.moves,'rgba(70,140,255,.45)');
 if(G.mode==='target')hl(G.trange,'rgba(255,60,60,.38)');
 // hover cursor
 const hx=Math.floor((mouse.x-OX)/CS),hy=Math.floor((mouse.y-OY)/CS);
 // units (sort by y)
 const list=[...alive().map(e=>({k:'e',o:e})),...(G.u.hp>0?[{k:'u',o:G.u}]:[])].sort((a,b)=>a.o.y-b.o.y);
 for(const it of list){const o=it.o;let px=OX+o.x*CS+CS/2,py=OY+o.y*CS+CS-3;if(o.dx!==undefined){px+=o.dx;py+=o.dy;}
  X.fillStyle='rgba(0,0,0,.4)';X.fillRect(px-14,py-2,28,4);
  if(it.k==='u'){spr(G.u.acted?'idle':'hover',px,py,G.u.acted?0.2:0.2,false,null,false);if(G.u.acted){X.fillStyle='rgba(0,0,0,.35)';}
   X.fillStyle='#2b6cff';X.fillRect(px-20,py-42,6,6);}
  else{spr(o.idle,px+2,py,o.idle==='widle'?0.24:0.21,false,o.tint,o.flash>0&&(G.t*20|0)%2);X.fillStyle='#ff3030';X.fillRect(px-20,py-42,6,6);
   bar(px-16,py+1,32,o.hp/o.mhp,'#ff5040');}
 }
 if(hx>=0&&hy>=0&&hx<CW&&hy<CH){const p=(G.t*4|0)%2;X.strokeStyle=p?'#fff':'#ffd27a';X.lineWidth=2;X.strokeRect(OX+hx*CS+2,OY+hy*CS+2,CS-4,CS-4);}
 // side panel
 const u=G.u;panel(456,30,176,128);X.drawImage(IM.port,462,36,48,56);txt('UNIT 01',516,38,'#ff715c');txt('PILOT',516,52,'#9aa3bf');txt(u.pilot,516,62);txt('MOVE '+u.mv,516,78,'#9aa3bf');
 txt('DESTINED RED UNIT 01',462,98,'#fff');txt('HP',462,112);txt(u.hp+'/'+u.mhp,486,112);bar(462,122,164,u.hp/u.mhp,'#40e070');txt('EN',462,134);txt(u.en+'/'+u.men,486,134);bar(462,144,164,u.en/u.men,'#40b0ff');
 // hover info
 panel(456,164,176,72);const he=G.e.find(e=>e.hp>0&&e.x===hx&&e.y===hy);
 if(he){txt(he.name,462,170,'#ff715c');txt('HP '+he.hp+'/'+he.mhp,462,184);bar(462,194,164,he.hp/he.mhp,'#ff5040');txt('ATK '+Math.round(he.atk*0.6)+'  RNG 1-'+he.rmax,462,206,'#9aa3bf');txt('MOVE '+he.mv,462,218,'#9aa3bf');}
 else if(hx>=0&&hy>=0&&hx<CW&&hy<CH){const t=TER[hy][hx];txt('TERRAIN',462,170,'#9aa3bf');txt({'.':'PLAINS','^':'FOREST  DEF UP','#':'RUINS  IMPASSABLE','=':'ROAD'}[t],462,184);txt('TILE '+hx+','+hy,462,198,'#9aa3bf');}
 else txt('HOVER A TILE',462,170,'#9aa3bf');
 // action menu
 panel(456,242,176,82);
 if(G.mode==='action'){txt('ACTION',462,247,'#ffd27a');menu=[];let yy=258;for(const a of ATKS){const ok=u.en>=a.en&&alive().some(e=>{const d=dist(u,e);return d>=a.r0&&d<=a.r1;});const r=[462,yy,164,13];menu.push({r,a,ok});const hot=ok&&inR(r);X.fillStyle=hot?'#cf2a34':ok?'#2b3f8c':'#2a2c36';X.fillRect(...r);txt(a.n,465,yy+3,ok?'#fff':'#777');txt(a.en?a.en+'EN':'',600,yy+3,ok?'#7eefff':'#777');yy+=15;}}
 else if(G.mode==='target'){txt('PICK TARGET',462,247,'#ffd27a');txt(G.atk.n,462,262);txt('PWR '+G.atk.p+' RNG '+G.atk.r0+'-'+G.atk.r1,462,276,'#9aa3bf');txt('RIGHT-CLICK: BACK',462,300,'#9aa3bf');}
 else{txt('COMMANDS',462,247,'#ffd27a');txt('CLICK UNIT 01 TO MOVE',462,262,'#9aa3bf');txt('CLICK AGAIN: ACT IN PLACE',462,274,'#9aa3bf');txt('RIGHT-CLICK / X: CANCEL',462,286,'#9aa3bf');txt('E: END TURN',462,298,'#9aa3bf');}
 const pp=G.phase==='player'&&!G.anim;button(BTN.end,'END TURN',pp,inR(BTN.end));button(BTN.wait,'WAIT',pp&&(G.mode==='action'),inR(BTN.wait));
 // message
 panel(4,360,632,36);txt(G.msg,14,374,'#f0f4ff');
 if(G.banner&&G.banner.t>0){const a=Math.min(1,G.banner.t*2);X.globalAlpha=a;X.fillStyle='rgba(5,6,12,.8)';X.fillRect(0,160,W,48);X.fillStyle=G.phase==='player'?'#2b6cff':'#cf2a34';X.fillRect(0,160,W,2);X.fillRect(0,206,W,2);txt(G.banner.txt,(W-tw(G.banner.txt,3))/2,174,'#fff',3);X.globalAlpha=1;}
}
const inR=r=>mouse.x>=r[0]&&mouse.y>=r[1]&&mouse.x<r[0]+r[2]&&mouse.y<r[1]+r[3];
// ---------- battle cut-in ----------
function startBattle(att,def,dmg,a,done){G.anim={att,def,dmg,a,t:0,len:2.0,done,hit:false,nums:[],parts:[]};}
function drawBattle(){const A=G.anim,t=A.t,pl=A.att===G.u;
 if(IM.sky.complete)X.drawImage(IM.sky,0,0,1280,720,0,-20,712,400);X.fillStyle='#3a3238';X.fillRect(0,300,W,100);X.fillStyle='#4e464c';for(let i=0;i<W;i+=32)X.fillRect((i-(t*120|0)%32+32)%W,300,16,2);
 const en=pl?A.def:A.att,ex=470,ey=300,hitT=0.85;
 let mx=150,pose='idle';
 if(pl){const f=A.a.fx;if(f==='fist'||f==='sword'){mx=t<0.5?150:t<hitT?150+(t-0.5)/(hitT-0.5)*(ex-120-150):ex-120;pose=t<0.5?'boost':t<hitT+0.4?A.a.pose:'hover';}else{pose=t<0.4?'idle':A.a.pose;}}
 const sh=A.hit&&t<hitT+0.25?Math.round(Math.sin(t*90)*4):0;
 const eflash=A.hit&&t<hitT+0.3&&pl&&(t*30|0)%2;
 spr(en.hp<=0&&A.hit&&pl?en.dmgp:en.idle,ex+(pl?sh:0),ey,en.idle==='widle'?1.0:0.85,false,en.tint,eflash);
 const uflash=A.hit&&!pl&&t<hitT+0.3&&(t*30|0)%2;
 spr(pose,mx+(!pl?sh:0),ey,0.85,false,null,uflash);
 // effects
 if(t>=hitT&&!A.hit){A.hit=true;applyDmg(A);}
 if(pl&&t>0.5&&t<hitT+0.35){const f=A.a.fx;if(f==='beam'||f==='ult'){const y0=f==='ult'?200:210,th=f==='ult'?18:8;X.fillStyle=f==='ult'?'#ffffff':'#ff715c';X.fillRect(mx+40,y0-th/2,ex-mx-40,th);X.fillStyle=f==='ult'?'#7eefff':'#ffd27a';X.fillRect(mx+40,y0-th/4,ex-mx-40,th/2);}}
 if(!pl&&t>0.5&&t<hitT+0.2){X.fillStyle='#b080ff';X.fillRect(mx+30,205,ex-mx-80,4);X.fillStyle='#fff';X.fillRect(mx+30,206,ex-mx-80,2);}
 if(A.hit&&t<hitT+0.4){const hx=pl?ex-20:mx+20,r=(t-hitT)*120;X.strokeStyle='#fff07a';X.lineWidth=3;X.beginPath();X.arc(hx,210,r,0,7);X.stroke();X.fillStyle='rgba(255,255,255,'+Math.max(0,0.6-(t-hitT)*2)+')';X.fillRect(0,0,W,H);}
 if(A.hit){const nx=pl?ex-40:mx-10,ny=150-Math.min(20,(t-hitT)*60);txt(String(A.dmg),nx,ny,'#fff07a',3);}
 // hud
 panel(8,8,250,46);txt(G.u.name,16,14,'#f0f4ff');txt('HP '+G.u.hp,16,28);bar(16,40,234,G.u.hp/G.u.mhp,'#40e070');
 panel(382,8,250,46);txt(en.name,390,14,'#ff715c');txt('HP '+Math.max(0,en.hp),390,28);bar(390,40,234,en.hp/en.mhp,'#ff5040');
 panel(36,318,568,70);X.drawImage(IM.port,44,324,48,56);txt(pl?'CLEMENT':en.name,100,328,'#ffd27a');
 txt(pl?(A.a.counter?'COUNTER! '+A.a.n:A.a.fx==='ult'?'PRISM REQUIEM... SHINE THROUGH!':A.a.n+'!'):A.a.n+'!',100,344,'#fff',2);
 if(A.hit&&t>hitT+0.3&&A.def.hp<=0)txt(pl?'TARGET DESTROYED!':'UNIT 01 IS DOWN...',100,366,'#ff715c',2);
}
function applyDmg(A){A.def.hp=Math.max(0,A.def.hp-A.dmg);}
// ---------- flow ----------
function doPlayerAttack(e){const a=G.atk,u=G.u;u.en-=a.en;const dmg=Math.round(a.p*defT(e)*(0.92+Math.random()*0.16)/10)*10;G.mode='idle';G.trange=null;
 startBattle(u,e,dmg,a,()=>{G.msg=e.hp<=0?e.name+' destroyed! '+alive().length+' enemies remain.':'Hit '+e.name+' for '+dmg+'.';u.acted=true;checkEnd()||endPlayer();});}
function checkEnd(){if(alive().length===0){G.scene='win';return true;}if(G.u.hp<=0){G.scene='lose';return true;}return false;}
function endPlayer(){G.mode='idle';G.moves=null;G.phase='enemy';G.banner={txt:'ENEMY PHASE',t:1.2};G.q=alive().slice();G.wait=1.2;}
function enemyStep(){const e=G.q.shift();if(!e){G.turn++;G.phase='player';G.u.acted=false;G.u.en=Math.min(G.u.men,G.u.en+20);G.banner={txt:'PLAYER PHASE',t:1.2};G.msg='Turn '+G.turn+': select DESTINED RED UNIT 01. EN RECOVERED 20.';return;}
 if(e.hp<=0)return enemyStep();const u=G.u;
 if(dist(e,u)>e.rmax){const opts=reach(e.x,e.y,e.mv,e);opts.push([e.x,e.y]);let best=null,bs=1e9;for(const [x,y] of opts){const d=Math.abs(x-u.x)+Math.abs(y-u.y);const s=d<1?99:Math.abs(d-e.rmax)*10+d;if(s<bs){bs=s;best=[x,y];}}e.x=best[0];e.y=best[1];}
 if(dist(e,u)<=e.rmax){const dmg=Math.round(e.atk*0.6*defT(u)*(0.9+Math.random()*0.2)/10)*10;G.msg=e.name+' attacks!';
  startBattle(e,u,dmg,{n:e.idle==='widle'?'GRAV CANNON':'PLASMA NEEDLE'},()=>{G.msg=e.name+' dealt '+dmg+' damage.';if(checkEnd())return;
   const d=dist(e,u),ca=d===1?ATKS[0]:(d<=3&&u.en>=15?ATKS[1]:null);
   if(!ca){G.wait=0.25;return;}u.en-=ca.en;const cd=Math.round(ca.p*0.8*defT(e)*(0.92+Math.random()*0.16)/10)*10;
   startBattle(u,e,cd,Object.assign({},ca,{counter:true}),()=>{G.msg='COUNTER! '+ca.n+' hit '+e.name+' for '+cd+(e.hp<=0?'. Destroyed!':'.');if(!checkEnd())G.wait=0.25;});});}
 else{G.msg=e.name+' advances.';G.wait=0.3;}}
function clickMap(cx,cy){if(G.phase!=='player'||G.anim)return;const u=G.u;
 if(G.mode==='idle'||G.mode==='done'){if(cx===u.x&&cy===u.y&&!u.acted){G.mode='move';G.moves=reach(u.x,u.y,u.mv,u);G.moves.push([u.x,u.y]);u.ox=u.x;u.oy=u.y;G.msg='Choose a blue tile to move (click Unit 01 again to stay).';}return;}
 if(G.mode==='move'){if(G.moves.some(([x,y])=>x===cx&&y===cy)){u.x=cx;u.y=cy;G.mode='action';G.msg='Choose an attack or WAIT.';}return;}
 if(G.mode==='target'){const e=G.e.find(e=>e.hp>0&&e.x===cx&&e.y===cy);if(e&&G.trange.some(([x,y])=>x===cx&&y===cy))doPlayerAttack(e);}}
function cancel(){const u=G.u;if(G.mode==='target'){G.mode='action';G.trange=null;}else if(G.mode==='action'){u.x=u.ox;u.y=u.oy;G.mode='move';}else if(G.mode==='move'){G.mode='idle';G.moves=null;}G.msg='Cancelled.';}
function chooseAtk(a){const u=G.u;G.atk=a;G.mode='target';G.trange=[];for(let y=0;y<CH;y++)for(let x=0;x<CW;x++){const d=Math.abs(x-u.x)+Math.abs(y-u.y);if(d>=a.r0&&d<=a.r1)G.trange.push([x,y]);}G.msg='Select a target for '+a.n+'.';}
function wait(){if(G.mode!=='action')return;G.u.acted=true;G.msg='Unit 01 waits.';endPlayer();}
function endTurn(){if(G.phase!=='player'||G.anim)return;if(G.mode==='action'||G.mode==='target'){}G.u.acted=true;endPlayer();}
cv.addEventListener('mousemove',ev=>{const r=cv.getBoundingClientRect();mouse.x=(ev.clientX-r.left)*W/r.width;mouse.y=(ev.clientY-r.top)*H/r.height;});
cv.addEventListener('contextmenu',ev=>{ev.preventDefault();if(G&&G.scene==='map')cancel();});
cv.addEventListener('mousedown',ev=>{if(ev.button!==0)return;const r=cv.getBoundingClientRect();mouse.x=(ev.clientX-r.left)*W/r.width;mouse.y=(ev.clientY-r.top)*H/r.height;click();});
function click(){if(!G||G.scene!=='map'){if(!G||G.scene==='win'||G.scene==='lose'||G.scene==='title'){newGame();}return;}
 if(G.anim){G.anim.t=Math.max(G.anim.t,G.anim.len-0.3);if(!G.anim.hit){G.anim.hit=true;applyDmg(G.anim);}return;}
 if(inR(BTN.end))return endTurn();if(inR(BTN.wait))return wait();
 if(G.mode==='action'){for(const m of menu)if(m.ok&&inR(m.r))return chooseAtk(m.a);}
 const cx=Math.floor((mouse.x-OX)/CS),cy=Math.floor((mouse.y-OY)/CS);if(cx>=0&&cy>=0&&cx<CW&&cy<CH){if(G.mode==='move'&&cx===G.u.x&&cy===G.u.y){G.mode='action';G.msg='Choose an attack or WAIT.';return;}clickMap(cx,cy);}}
addEventListener('keydown',ev=>{const k=ev.key.toLowerCase();if(!G||G.scene!=='map'){if(k==='enter'||k===' '||k==='z')newGame();return;}
 if(k==='x'||k==='escape')cancel();if(k==='e')endTurn();if(k==='w')wait();if(G.mode==='action'&&'1234'.includes(k)){const m=menu[+k-1];if(m&&m.ok)chooseAtk(m.a);}});
// ---------- title / end ----------
function drawTitle(t){if(IM.sky.complete)X.drawImage(IM.sky,0,0,1280,720,0,0,712,400);X.fillStyle='rgba(5,6,12,.45)';X.fillRect(0,0,W,H);
 spr('hero',470,370,1.25,false,null,false);
 txt('G.CREATION PRESENTS',40,60,'#ffd27a',2);txt('ROBOT',40,100,'#ff715c',6);txt('DESTINED',40,150,'#fff',6);txt('FIGHTERS',40,200,'#fff',6);
 X.fillStyle='#cf2a34';X.fillRect(40,252,300,3);txt('STAGE 1: CRIMSON HARBOR',40,264,'#7eefff',2);
 if((t*2|0)%2===0)txt('CLICK OR PRESS ENTER TO START',40,330,'#fff',2);}
function drawEnd(win){drawMap();X.fillStyle='rgba(5,6,12,.75)';X.fillRect(0,110,W,170);
 if(win){spr('hero2',540,280,0.75,false,null,false);txt('STAGE CLEAR!',40,130,'#fff07a',5);txt('ALL 10 ENEMIES DESTROYED',40,185,'#fff',2);txt('TURNS: '+G.turn+'   UNIT 01 HP: '+G.u.hp+'/'+G.u.mhp,40,210,'#7eefff',2);}
 else{txt('GAME OVER',40,130,'#ff715c',5);txt('DESTINED RED UNIT 01 WAS DESTROYED',40,185,'#fff',2);txt('ENEMIES LEFT: '+alive().length,40,210,'#ff715c',2);}
 txt('CLICK OR PRESS ENTER TO RETRY',40,250,'#9aa3bf',2);}
// ---------- loop ----------
G={scene:'title'};let last=performance.now(),T=0;
function frame(now){const dt=Math.min(0.05,(now-last)/1000);last=now;T+=dt;
 if(G.scene==='title'){drawTitle(T);}
 else if(G.scene==='map'){G.t+=dt;if(G.banner)G.banner.t-=dt;
  if(G.anim){G.anim.t+=dt;drawBattle();if(G.anim.t>=G.anim.len){const d=G.anim.done;G.anim=null;d();}}
  else{if(G.phase==='enemy'&&!G.anim){G.wait-=dt;if(G.wait<=0){G.wait=99;enemyStep();}}drawMap();}}
 else drawEnd(G.scene==='win');
 requestAnimationFrame(frame);}
requestAnimationFrame(frame);
window.RDF={get G(){return G},newGame,click,setMouse:(x,y)=>{mouse.x=x;mouse.y=y;},tile:(x,y)=>{mouse.x=OX+x*CS+22;mouse.y=OY+y*CS+22;click();},chooseAtk:i=>chooseAtk(ATKS[i]),drawEnd};
})();
