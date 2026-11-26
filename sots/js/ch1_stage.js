// Chapter 1 night-train stage (forest → tunnel → decouple → finale).
// Loaded after sprite_meta.js; hooks are called from game.js when stage.kind === 'train'.
(function () {
  'use strict';
  const META = window.SOTS_SPRITE_META = window.SOTS_SPRITE_META || {};
  META['ch1/flying_armor_sheet'] = {
    cell: [560, 360], anchor: [280, 230], cols: 6,
    frames: {
      fly_idle0: 0, fly_idle1: 1, fly_idle2: 2,
      fly_flap0: 3, fly_flap1: 4, fly_flap2: 5,
      swoop0: 6, swoop1: 7, swoop2: 8, swoop3: 9,
      xform0: 10, xform1: 11, xform2: 12, xform3: 13,
      armor_idle: 14, armor_ram0: 15, armor_ram1: 16, armor_ram2: 17,
      hurt: 18, defeat0: 19, defeat1: 20, defeat2: 21
    }
  };

  const W = 1280, H = 720;
  const FRONT_CX = 408, BACK_CX = 420, FRONT_RX = 258;
  const FAR_K = 9 / 6, MID_K = 13 / 6;           // preview 36/24 and 52/24 vs ground speed
  const MOON = { x: 1180, y: 128, r: 58 };

  const TALK = {
    tunnel_ahead: [
      { speaker: 'Genjuro', comms: true, text: "Tunnel ahead. Once you're in, there's no easy jump-off. Stay with the Cane." },
      { speaker: 'Chris', comms: true, text: "I see it. Hibiki, don't get cute in there." }
    ],
    decouple: [
      { speaker: 'Hibiki', text: "Chris! I've got a plan — uncouple the rear cars! Get the Cane clear!" },
      { speaker: 'Chris', comms: true, text: "You're insane— …fine. Do it on my mark!" },
      { speaker: 'Dr. Ver', comms: true, text: 'The relic is in the forward section. If you separate now, it can pull ahead.' },
      { speaker: 'Hibiki', text: 'Leave the Noise to me!' }
    ],
    finale: [
      { speaker: 'Genjuro', comms: true, text: "Exit light ahead. Hibiki, finish it — and don't bring the mountain down on the Cane." },
      { speaker: 'Hibiki', text: "I won't let it follow them. Gungnir—!" }
    ]
  };

  const rnd = (a, b) => a + Math.random() * (b - a);
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  function img(src) {
    const S = window.SOTS;
    return (S && S.img) ? S.img(src) : null;
  }
  function ctx2d() { return window.SOTS && window.SOTS.ctx; }
  function animFrame(anim, t) {
    if (window.SOTS && window.SOTS.animFrame) return window.SOTS.animFrame(anim, t);
    if (!anim || !anim.frames || !anim.frames.length) return 0;
    const n = anim.frames.length, fps = anim.fps || 8;
    const i = Math.floor(t / (60 / fps));
    return anim.loop === false ? anim.frames[Math.min(n - 1, i)] : anim.frames[((i % n) + n) % n];
  }

  const CH1 = {
    isTrain(st) { return !!(st && st.kind === 'train'); },

    segment(F) {
      const segs = (F.st && F.st.segments) || [];
      const x = F.stageX || 0;
      for (const s of segs) if (x >= s.start && x < s.end) return s.id;
      if (x >= (segs[segs.length - 1] && segs[segs.length - 1].end)) return segs[segs.length - 1].id;
      return 'forest';
    },

    enter(F) {
      const st = F.st;
      F.stageX = F.stageX || 0;
      F.worldScroll = F.worldScroll || 0;
      F.stageHold = false;
      F.scriptLock = false;
      F.ch1Phase = 'run';
      F.ch1Talk = null;
      F.ch1Events = Object.create(null);
      F.gap = 0;
      F.exitBloom = 0;
      F.collapseT = 0;
      F.debris = [];
      F.finaleKill = false;
      F.camX = 0;
      F.lock = null;
      if (F.p) { F.p.x = 420; F.p.y = 610; }
    },

    jumpTo(F, where) {
      const st = F.st || {};
      where = String(where || '').toLowerCase();
      if (where === 'ch1boss') where = 'boss';
      if (where === 'ch1finale') where = 'finale';
      F.ch1Events = F.ch1Events || Object.create(null);
      F.banner = null;
      const markPast = (x) => {
        for (const ev of (F.st && F.st.events) || []) {
          if (ev.at < x) F.ch1Events[ev.id] = true;
        }
      };
      if (where === 'boss') {
        F.stageX = 9200;
        F.worldScroll = 9200;
        F.waveIdx = 4;                  // waves 1–4 already cleared
        F.wave = null; F.pending = []; F.stageHold = false;
        F.ch1Phase = 'run';
        markPast(9200);
        F.ch1Events.boss_arrive = true;
        this.spawnBoss(F);
        F.banner = { text: 'WARNING', sub: 'A Flying Armor Noise approaches!', t: 0, dur: 120, warn: true };
      } else if (where === 'finale') {
        F.stageX = 17400;
        F.worldScroll = 17400;
        F.waveIdx = 6; F.wave = null; F.pending = []; F.enemies = F.enemies.filter(e => e.def && e.def.flyingArmor);
        F.stageHold = false;
        F.ch1Events.boss_arrive = true;
        F.ch1Events.tunnel_ahead = true;
        F.ch1Events.decouple = true;
        markPast(17400);
        F.ch1Events.decouple = true; F.ch1Events.finale = true;
        if (!F.boss || F.boss.gone) this.spawnBoss(F);
        const b = F.boss;
        if (b) { b.phase = 'armor'; b.state = 'armor'; b.z = 0; b.x = 900; b.y = 600; b.hp = Math.max(1, Math.floor(b.hpMax * 0.2)); }
        F.banner = null;
        this.startFinale(F);
      } else {
        F.stageX = 0; F.worldScroll = 0;
      }
    },

    update(F) {
      if (!this.isTrain(F.st)) return;
      const st = F.st, speed = st.speed || 6;
      if (!F.scriptLock && F.ch1Phase === 'run' && F.state === 'play' && !F.stageHold) {
        F.stageX = Math.min((st.length || 19000), (F.stageX || 0) + speed);
      }
      // background / lamps keep moving even during a held wave, so the train never looks parked
      if (F.state === 'play' || F.ch1Phase === 'talk' || F.ch1Phase === 'decouple' || F.ch1Phase === 'exchange') {
        F.worldScroll = (F.worldScroll || 0) + speed;
      }
      F.camX = 0;
      this.runEvents(F);
      this.updateTalk(F);
      if (F.ch1Phase === 'decouple') this.updateDecouple(F);
      if (F.ch1Phase === 'exchange') this.updateExchange(F);
      if (F.ch1Phase === 'finale') this.updateFinale(F);
      if (F.ch1Phase === 'smash') this.updateSmash(F);
      if (F.ch1Phase === 'collapse') this.updateCollapse(F);
      if (F.ch1Phase === 'emerge') this.updateEmerge(F);
    },

    runEvents(F) {
      const evs = (F.st && F.st.events) || [];
      for (const ev of evs) {
        if (F.ch1Events[ev.id] || (F.stageX || 0) < ev.at) continue;
        if (F.scriptLock) continue;
        if (ev.id === 'boss_arrive') { F.ch1Events[ev.id] = true; this.spawnBoss(F); continue; }
        if (ev.id === 'tunnel_ahead') { F.ch1Events[ev.id] = true; this.startTalk(F, TALK.tunnel_ahead, false); continue; }
        if (ev.id === 'decouple') {
          if (F.waveIdx < 6) continue;          // all six waves must be cleared first
          F.ch1Events[ev.id] = true; this.startDecouple(F); continue;
        }
        if (ev.id === 'finale') {
          if (F.ch1Phase !== 'exchange' && F.ch1Phase !== 'run') continue;
          if (F.waveIdx < 6) continue;
          F.ch1Events[ev.id] = true; this.startFinale(F);
        }
      }
    },

    onLastWaveCleared(F) {
      // Wave 6 done: resume the scroll toward the decouple / exit.
      F.stageHold = false;
      if ((F.stageX || 0) >= 16400 && !F.ch1Events.decouple) {
        F.ch1Events.decouple = true; this.startDecouple(F);
      }
    },

    startTalk(F, lines, lock) {
      if (!lines || !lines.length) return;
      F.ch1Talk = { lines, i: 0, t: 0, lock: !!lock, done: false };
      if (lock) { F.scriptLock = true; F.ch1Phase = F.ch1Phase === 'run' ? 'talk' : F.ch1Phase; }
    },

    updateTalk(F) {
      const T = F.ch1Talk; if (!T || T.done) return;
      T.t++;
      const line = T.lines[T.i];
      const hold = 90 + Math.min(280, (line.text || '').length * 2.2);
      const Input = window.SOTS && window.SOTS.Input;
      const skip = Input && Input.consume && (Input.consume('confirm') || Input.consume('light'));
      if (T.t > hold || skip) {
        T.i++; T.t = 0;
        if (T.i >= T.lines.length) {
          T.done = true; F.ch1Talk = null;
          if (T.lock && F.ch1Phase === 'talk') { F.scriptLock = false; F.ch1Phase = 'run'; }
          if (F._talkDone) { const fn = F._talkDone; F._talkDone = null; fn(); }
        }
      }
    },

    spawnBoss(F) {
      if (F.boss && !F.boss.gone) return;
      const D = window.SOTS_DATA, def = D.enemies.flying_armor;
      const e = {
        id: (window.SOTS && typeof window.SOTS.nextUid === 'function') ? window.SOTS.nextUid() : (F.t + 9000 + Math.floor(Math.random()*99)),
        type: 'flying_armor', def, x: W + 160, y: 600, z: 240, vx: 0, vz: 0,
        hp: def.hp, hpMax: def.hp, face: -1, state: 'fly', phase: 'fly',
        t: 0, cd: 80, flash: 0, stun: 0, seed: Math.random() * 100, offscreen: true,
        wd: 0, still: 0, swoop: 0, ramDir: -1
      };
      F.enemies.push(e); F.boss = e;
      if (F.ch1Phase === 'run' && !F.banner) {
        F.banner = { text: 'WARNING', sub: 'A Flying Armor Noise approaches!', t: 0, dur: 150, warn: true };
      }
      try { window.AudioManager && AudioManager.sfx('alarm'); } catch (err) {}
    },

    startDecouple(F) {
      F.ch1Phase = 'decouple'; F.scriptLock = true; F.gap = 0; F.decoupleT = 0;
      this.startTalk(F, TALK.decouple, true);
      F._talkDone = () => { /* uncouple continues until timer ends */ };
    },

    updateDecouple(F) {
      F.decoupleT = (F.decoupleT || 0) + 1;
      if (F.decoupleT > 40) F.gap = Math.min(520, (F.gap || 0) + 4.2);
      if (F.decoupleT % 4 === 0 && F.decoupleT < 160) {
        F.fx.push({ type: 'spark', x: 40 + (F.gap || 0) * 0.15, y: 500 + rnd(-10, 20), s: 1.2,
          rays: Array.from({ length: 7 }, () => ({ a: rnd(0, Math.PI * 2), l: rnd(20, 50) })), life: 10, max: 10 });
        if (F.decoupleT % 12 === 0) try { AudioManager.sfx('thump', { pitch: rnd(0.8, 1.1), vol: 0.45 }); } catch (e) {}
      }
      // After the lines and the cars have slid back, return control for a last exchange.
      if (F.decoupleT > 280 && (!F.ch1Talk || F.ch1Talk.done)) {
        F.ch1Phase = 'exchange'; F.scriptLock = false; F.exchangeT = 0;
        F.banner = { text: "HIBIKI'S PLAN", sub: 'The forward cars pull for the exit!', t: 0, dur: 100 };
      }
    },

    updateExchange(F) {
      F.exchangeT = (F.exchangeT || 0) + 1;
      // A short last fight; then the finale takes over as the exit mouth arrives (or after a few seconds).
      const exitSx = (F.st.exitWorld || 18880) - (F.stageX || 0);
      if (F.exchangeT > 240 || exitSx < 900) {
        if (!F.ch1Events.finale) { F.ch1Events.finale = true; this.startFinale(F); }
      }
    },

    startFinale(F) {
      F.ch1Phase = 'finale'; F.scriptLock = true; F.finaleT = 0; F.exitBloom = 0.4;
      this.startTalk(F, TALK.finale, true);
      F._talkDone = () => this.playFinaleUlt(F);
    },

    updateFinale(F) {
      F.finaleT = (F.finaleT || 0) + 1;
      F.exitBloom = Math.min(1, (F.exitBloom || 0) + 0.012);
      // If talk is skipped / empty, start the clip after a short hold.
      if ((!F.ch1Talk || F.ch1Talk.done) && F.finaleT > 40 && !F._finaleVid && !F._talkDone) this.playFinaleUlt(F);
    },

    playFinaleUlt(F) {
      if (F._finaleVid) return;
      F._finaleVid = true;
      const c = F.c, u = c && c.ultimate;
      const src = (u && u.video) || 'assets/video/hibiki_ultimate.mp4';
      const playVideo = window.SOTS && window.SOTS.playVideo;
      const after = () => {
        if (window.SOTS && window.SOTS.show) window.SOTS.show(null);
        F.state = 'play'; F.ch1Phase = 'smash'; F.smashT = 0; F.scriptLock = true;
        try { AudioManager.duck(1); } catch (e) {}
      };
      F.state = 'video';
      try { AudioManager.duck(0.85); } catch (e) {}
      if (playVideo) playVideo(src, after); else after();
    },

    updateSmash(F) {
      F.smashT = (F.smashT || 0) + 1;
      if (F.smashT === 1) {
        F.flash = 28; F.flashColor = '#fff8d0'; F.shake = 22;
        try { AudioManager.sfx('boom'); } catch (e) {}
        if (F.boss && !F.boss.gone) {
          F.finaleKill = true;
          F.boss.hp = 0; F.boss.dead = true; F.boss.state = 'dying'; F.boss.t = 0; F.boss.phase = 'defeat';
          F.stats.kills++;
        }
      }
      if (F.smashT > 28) { F.ch1Phase = 'collapse'; F.collapseT = 0; this.seedDebris(F); }
    },

    seedDebris(F) {
      F.debris = [];
      for (let i = 0; i < 46; i++) {
        F.debris.push({
          x: rnd(80, 1200), y: rnd(-80, 200), vx: rnd(-6, 6), vy: rnd(1, 9),
          r: rnd(8, 28), rot: rnd(0, 6), vr: rnd(-0.2, 0.2), life: 180,
          c: Math.random() < 0.5 ? '#3a322c' : '#2a2420'
        });
      }
    },

    updateCollapse(F) {
      F.collapseT = (F.collapseT || 0) + 1;
      F.shake = Math.max(F.shake, 14 - F.collapseT * 0.06);
      if (F.collapseT % 8 === 0) F.flash = Math.max(F.flash, 6);
      F.flashColor = '#f4e6c0';
      for (const d of F.debris) { d.x += d.vx; d.y += d.vy; d.vy += 0.25; d.rot += d.vr; d.life--; }
      if (F.collapseT > 160) { F.ch1Phase = 'emerge'; F.emergeT = 0; F.exitBloom = 0; }
    },

    updateEmerge(F) {
      F.emergeT = (F.emergeT || 0) + 1;
      F.stageX = Math.max(F.stageX, (F.st.exitWorld || 18880) + 200);
      F.shake *= 0.9;
      if (F.emergeT === 20) F.banner = { text: 'MISSION CLEAR!', sub: '', t: 0, dur: 999 };
      if (F.emergeT === 20) try { AudioManager.sfx('confirm'); } catch (e) {}
      if (F.emergeT > 150 && F.state === 'play') {
        F.state = 'clear'; F.endT = 40; F.scriptLock = true;
      }
    },

    updateBoss(F, e) {
      const p = F.p, def = e.def, A = def.attack; e.t++;
      if (e.flash > 0) e.flash--;
      e.x += e.vx; e.vx *= 0.9; if (Math.abs(e.vx) < 0.05) e.vx = 0;
      if (e.state === 'dying' || e.phase === 'defeat') {
        e.z = Math.max(0, (e.z || 0) - 2);
        if (e.t > 90) e.gone = true;
        F.dustFx && F.dustFx(e);
        return true;
      }
      if (F.scriptLock && F.ch1Phase !== 'exchange' && F.ch1Phase !== 'run' && F.ch1Phase !== 'talk') {
        return true; // frozen during scripted beats (except ambient hover during talk)
      }
      const inTunnel = (F.stageX || 0) >= 11400 && (F.stageX || 0) < (F.st.exitWorld || 18880);
      // Transform once, in the tunnel, at half health (or on the first tunnel frame if already low).
      if (e.phase === 'fly' && inTunnel && e.hp <= e.hpMax * 0.5 && e.state !== 'xform') {
        e.phase = 'xform'; e.state = 'xform'; e.t = 0; e.vx = 0;
        F.banner = { text: 'ARMOR PHASE', sub: 'The shell is closing — dodge the rams!', t: 0, dur: 110, warn: true };
        try { AudioManager.sfx('alarm'); } catch (err) {}
      }
      if (e.state === 'hit') {
        if (e.t > (e.stun || 16)) { e.state = e.phase === 'armor' ? 'armor' : 'fly'; e.t = 0; e.cd = 40; }
        return true;
      }
      if (e.state === 'xform') {
        e.z += (40 - e.z) * 0.08;
        e.x += (900 - e.x) * 0.04;
        if (e.t > 70) { e.phase = 'armor'; e.state = 'armor'; e.t = 0; e.z = 0; e.cd = 50; }
        return true;
      }
      if (e.phase === 'fly' || e.state === 'fly' || e.state === 'swoop' || e.state === 'flap') {
        this.aiFly(F, e, p, inTunnel);
        return true;
      }
      if (e.phase === 'armor' || e.state === 'armor' || e.state === 'ram' || e.state === 'recover') {
        this.aiRam(F, e, p, A);
        return true;
      }
      return true;
    },

    aiFly(F, e, p, inTunnel) {
      const hoverZ = inTunnel ? 150 : 250;
      const lowZ = inTunnel ? 18 : 28;
      if (e.state === 'swoop') {
        const dur = inTunnel ? 70 : 90;
        const k = e.t / dur;
        if (k < 0.45) e.z += (lowZ - e.z) * 0.18;
        else e.z += (hoverZ - e.z) * 0.1;
        e.x += e.face * (inTunnel ? 7 : 8);
        if (k > 0.15 && k < 0.55) {
          const reach = e.def.width * 0.45 + 30;
          if (Math.abs(p.x - e.x) < reach && Math.abs(p.y - e.y) < 50 && p.z < 50 && e.z < 70) {
            F.hurtPlayer(e.def.attack.dmg, e.face, 8, 0.3);
          }
        }
        if (e.t > dur || e.x < 60 || e.x > W - 60) {
          e.state = 'fly'; e.t = 0; e.cd = rnd(70, 120); e.face = e.x > p.x ? -1 : 1;
        }
        return;
      }
      // hover + drift
      e.state = 'fly';
      e.z += (hoverZ + Math.sin((F.t + e.seed) * 0.05) * 12 - e.z) * 0.08;
      const tx = clamp(p.x + Math.sin((F.t + e.seed) * 0.02) * 180, 180, W - 180);
      if (Math.abs(tx - e.x) > 8) e.x += Math.sign(tx - e.x) * e.def.speed;
      e.y += (clamp(p.y, F.st.laneTop, F.st.laneBottom) - e.y) * 0.04;
      e.face = e.x > p.x ? -1 : 1;
      e.cd--;
      if (e.cd <= 0 && F.state === 'play' && !F.scriptLock) {
        e.state = 'swoop'; e.t = 0; e.face = e.x > p.x ? -1 : 1;
      }
    },

    aiRam(F, e, p, A) {
      e.z += (0 - e.z) * 0.2;
      e.y = clamp(e.y + Math.sign((p.y || 610) - e.y) * 0.8, F.st.laneTop, F.st.laneBottom);
      if (e.state === 'ram') {
        e.vx = e.ramDir * (A.lungeSpeed || 14);
        const reach = e.def.width * 0.5 + 36;
        if (Math.abs(p.x - e.x) < reach && Math.abs(p.y - e.y) < 36 && p.z < 40 && e.z < 40) {
          F.hurtPlayer(A.dmg, e.ramDir, A.shake, A.knockdown);
        }
        if (e.x < 50 || e.x > W - 50 || e.t > 70) {
          e.state = 'recover'; e.t = 0; e.vx = 0;
          e.x = clamp(e.x, 60, W - 60);
        }
        return;
      }
      if (e.state === 'recover') {
        // brief vulnerable window after a missed ram
        if (e.t > 55) { e.state = 'armor'; e.t = 0; e.cd = rnd(A.cooldown[0], A.cooldown[1]); }
        return;
      }
      e.state = 'armor';
      e.cd--;
      const park = e.ramDir < 0 ? W - 160 : 160;
      if (Math.abs(e.x - park) > 10) e.x += Math.sign(park - e.x) * 3;
      e.face = e.ramDir;
      if (e.cd <= 0 && F.state === 'play' && !F.scriptLock) {
        e.state = 'ram'; e.t = 0; e.ramDir = e.x > p.x ? -1 : 1; e.face = e.ramDir;
      }
    },

    bossFrame(e) {
      const A = e.def.anims || {};
      if (e.state === 'dying' || e.phase === 'defeat') return animFrame(A.defeat || { frames: ['defeat0'] }, e.t);
      if (e.state === 'hit') return 'hurt';
      if (e.state === 'xform') return animFrame(A.xform, e.t);
      if (e.state === 'ram') return animFrame(A.ram, e.t);
      if (e.phase === 'armor' || e.state === 'armor' || e.state === 'recover') return 'armor_idle';
      if (e.state === 'swoop') return animFrame(A.swoop, e.t);
      if (e.t % 80 < 18) return animFrame(A.flap, e.t);
      return animFrame(A.fly, e.t);
    },

    tile(ctx, im, scroll, y, dw, dh) {
      if (!im || !im.naturalWidth) return;
      const w = dw || im.naturalWidth, h = dh || im.naturalHeight;
      let o = -Math.round(scroll) % w; if (o > 0) o -= w;
      for (let x = o; x < W; x += w) ctx.drawImage(im, x, y, w, h);
    },

    placePortal(ctx, im, openingSx, cx, flip) {
      if (!im || !im.naturalWidth) return;
      const acx = flip ? (im.naturalWidth - 1 - cx) : cx;
      const x = openingSx - acx;
      if (x > W || x + im.naturalWidth < 0) return;
      if (!flip) { ctx.drawImage(im, x, 0); return; }
      ctx.save(); ctx.translate(x + im.naturalWidth, 0); ctx.scale(-1, 1); ctx.drawImage(im, 0, 0); ctx.restore();
    },

    insideAt(F, sx) {
      const entry = (F.st.entryWorld || 11680) - (F.stageX || 0);
      const exit = (F.st.exitWorld || 18880) - (F.stageX || 0);
      const a = entry - FRONT_RX, b = exit - FRONT_RX;
      return sx >= a && sx < b ? 1 : 0;
    },

    drawMoon(ctx, a) {
      if (a <= 0) return;
      const { x, y, r } = MOON;
      ctx.save(); ctx.globalAlpha = a;
      const g = ctx.createRadialGradient(x, y, r * 0.2, x, y, r * 2.2);
      g.addColorStop(0, 'rgba(255,244,210,0.55)'); g.addColorStop(1, 'rgba(255,244,210,0)');
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r * 2.2, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#fff6e4'; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    },

    drawBG(F) {
      const ctx = ctx2d(); if (!ctx) return;
      const st = F.st, bg = st.background || {}, world = F.worldScroll || 0, stageX = F.stageX || 0;
      const sky = img(bg.sky), far = img(bg.far), mid = img(bg.mid), tun = img(bg.tunnel), train = img(bg.train);
      const back = img(bg.portalBack);
      const entrySx = (st.entryWorld || 11680) - stageX;
      const exitSx = (st.exitWorld || 18880) - stageX;
      const emerge = F.ch1Phase === 'emerge' || stageX > (st.exitWorld || 18880) + 80;
      const kIn = this.insideAt(F, W * 0.5);

      // sky
      this.tile(ctx, sky, world * 0.08, 0, sky && sky.naturalWidth, H);
      if (!sky || !sky.naturalWidth) { ctx.fillStyle = '#071018'; ctx.fillRect(0, 0, W, H); }
      this.tile(ctx, far, world * FAR_K, 428 - (far && far.naturalHeight || 220));
      if (!emerge && kIn < 0.95) this.drawMoon(ctx, 1 - kIn);
      this.tile(ctx, mid, world * MID_K, 432 - (mid && mid.naturalHeight || 460));

      // tunnel fill between the mouths
      const fill0 = entrySx - FRONT_RX, fill1 = exitSx - FRONT_RX;
      if (tun && tun.naturalWidth && fill1 > fill0 && fill1 > 0 && fill0 < W && !emerge) {
        ctx.save();
        ctx.beginPath(); ctx.rect(Math.max(0, fill0), 0, Math.min(W, fill1) - Math.max(0, fill0), H); ctx.clip();
        this.tile(ctx, tun, world, 0);
        // lamp streaks
        ctx.globalAlpha = 0.7;
        ctx.strokeStyle = 'rgba(255,196,100,0.55)'; ctx.lineWidth = 2;
        for (let i = 0; i < 6; i++) {
          const lx = ((-world * 1.15 + i * 280) % (W + 200)) - 40;
          if (lx > fill0 && lx < fill1) { ctx.beginPath(); ctx.moveTo(lx, 70); ctx.lineTo(lx + 50, 70); ctx.stroke(); }
        }
        ctx.restore();
      }

      if (back && !emerge) {
        this.placePortal(ctx, back, entrySx, BACK_CX, false);
        this.placePortal(ctx, back, exitSx, BACK_CX, true);
      }
      if (F.exitBloom && !emerge) {
        const a = F.exitBloom * 0.55;
        const g = ctx.createRadialGradient(exitSx, 320, 10, exitSx, 320, 520);
        g.addColorStop(0, `rgba(210,230,255,${a})`); g.addColorStop(1, 'rgba(210,230,255,0)');
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(exitSx, 320, 520, 0, Math.PI * 2); ctx.fill();
      }

      // static train (plus a sliding rear car during decouple)
      this.drawTrain(F, ctx, train, kIn, world);
      this.drawWind(F, ctx, kIn);
    },

    drawTrain(F, ctx, train, kIn, world) {
      const top = (F.st.trainTop != null) ? F.st.trainTop : 430;
      const xoff = (F.st.trainX != null) ? F.st.trainX : 40;
      if (!train || !train.naturalWidth) {
        ctx.fillStyle = '#2a3344'; ctx.fillRect(0, top, W, H - top); return;
      }
      const drawOne = (im, x, alpha) => { ctx.globalAlpha = alpha; ctx.drawImage(im, x, top); ctx.globalAlpha = 1; };
      // forest-lit vs tunnel-tinted: simple multiply overlay after blit
      drawOne(train, xoff, 1);
      if (F.gap > 8) drawOne(train, xoff - 720 - F.gap, 1);  // rear consist sliding away (joint at 720)
      if (kIn > 0.02) {
        ctx.save();
        ctx.globalAlpha = 0.38 * kIn;
        ctx.fillStyle = '#1a0e0c';
        ctx.fillRect(0, top, W, H - top);
        ctx.restore();
        // warm lamp pools sliding over the roof
        const lw = (img(F.st.background.tunnel) || {}).naturalWidth || 1710;
        for (let i = 0; i < 4; i++) {
          const px = ((-world + i * (lw / 3)) % lw + lw) % lw;
          const sx = xoff + (px - 200) * 0.35;
          const g = ctx.createRadialGradient(sx, top + 80, 10, sx, top + 80, 160);
          g.addColorStop(0, `rgba(255,180,80,${0.22 * kIn})`); g.addColorStop(1, 'rgba(255,180,80,0)');
          ctx.fillStyle = g; ctx.beginPath(); ctx.arc(sx, top + 90, 160, 0, Math.PI * 2); ctx.fill();
        }
      }
    },

    drawWind(F, ctx, kIn) {
      if (kIn > 0.8) return;
      ctx.save(); ctx.strokeStyle = `rgba(200,220,255,${0.22})`; ctx.lineWidth = 2;
      for (let i = 0; i < 8; i++) {
        const y = 60 + ((i * 47 + (F.worldScroll || 0) * 0.2) % 360);
        const x = W - ((F.worldScroll * 3 + i * 160) % (W + 200));
        ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - 70, y + 2); ctx.stroke();
      }
      ctx.restore();
    },

    drawFG(F) {
      const ctx = ctx2d(); if (!ctx) return;
      const st = F.st, bg = st.background || {}, stageX = F.stageX || 0;
      const frame = img(bg.portalFrame);
      const emerge = F.ch1Phase === 'emerge' || stageX > (st.exitWorld || 18880) + 80;
      if (frame && !emerge) {
        const entrySx = (st.entryWorld || 11680) - stageX;
        const exitSx = (st.exitWorld || 18880) - stageX;
        this.placePortal(ctx, frame, entrySx, FRONT_CX, false);
        this.placePortal(ctx, frame, exitSx, FRONT_CX, true);
      }
      if (F.ch1Phase === 'collapse' || F.ch1Phase === 'emerge') this.drawDebris(F, ctx);
      this.drawTalk(F, ctx);
    },

    drawDebris(F, ctx) {
      const a = F.ch1Phase === 'emerge' ? Math.max(0, 1 - (F.emergeT || 0) / 80) : 1;
      for (const d of (F.debris || [])) {
        ctx.save(); ctx.globalAlpha = a * Math.max(0, d.life / 180);
        ctx.translate(d.x, d.y); ctx.rotate(d.rot);
        ctx.fillStyle = d.c; ctx.fillRect(-d.r, -d.r * 0.6, d.r * 2, d.r * 1.2);
        ctx.restore();
      }
      if (F.ch1Phase === 'collapse') {
        ctx.globalAlpha = Math.min(0.55, (F.collapseT || 0) / 40);
        ctx.fillStyle = '#1a140c'; ctx.fillRect(0, 0, W, H);
        ctx.globalAlpha = 1;
      }
    },

    drawTalk(F, ctx) {
      const T = F.ch1Talk; if (!T || T.done || !T.lines[T.i]) return;
      const line = T.lines[T.i], name = (line.speaker || '') + (line.comms ? ' (comms)' : '');
      ctx.save();
      ctx.fillStyle = 'rgba(6,8,16,0.78)'; ctx.fillRect(70, 520, 1140, 118);
      ctx.strokeStyle = 'rgba(255,176,74,0.85)'; ctx.lineWidth = 3; ctx.strokeRect(70, 520, 1140, 118);
      ctx.font = "700 22px Pixelify, sans-serif"; ctx.fillStyle = '#ffd36a'; ctx.textAlign = 'left';
      ctx.fillText(name, 96, 552);
      ctx.font = '22px Pixelify, sans-serif'; ctx.fillStyle = '#fff8ea';
      const text = line.text || '';
      // simple wrap
      const words = text.split(' '), lines = []; let cur = '';
      for (const w of words) {
        const t = cur ? cur + ' ' + w : w;
        if (ctx.measureText(t).width > 1080) { if (cur) lines.push(cur); cur = w; } else cur = t;
      }
      if (cur) lines.push(cur);
      lines.slice(0, 3).forEach((ln, i) => ctx.fillText(ln, 96, 586 + i * 26));
      ctx.restore();
    }
  };

  window.SOTS_CH1 = CH1;
})();
