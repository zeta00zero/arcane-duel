// All sound goes through AudioManager so the volume settings apply everywhere.
(function () {
  const KEY = 'sots_settings_v1';
  const settings = Object.assign({ master: 0.8, music: 0.8, voice: 1.0, sfx: 0.7 }, JSON.parse(localStorage.getItem(KEY) || '{}'));
  let ctx = null, sfxGain = null;
  const music = new Audio(); music.preload = 'auto';
  const voice = new Audio(); voice.preload = 'auto';
  let musicDuck = 1, previewTimer = null, fadeTimer = null;
  const videos = new Set();
  function apply() {
    music.volume = clamp(settings.master * settings.music * musicDuck);
    voice.volume = clamp(settings.master * settings.voice);
    videos.forEach(v => v.volume = clamp(settings.master * settings.voice));
    if (sfxGain) sfxGain.gain.value = settings.master * settings.sfx;
  }
  function clamp(v) { return Math.max(0, Math.min(1, v)); }
  function ensureCtx() {
    if (!ctx) {
      try { ctx = new (window.AudioContext || window.webkitAudioContext)(); sfxGain = ctx.createGain(); sfxGain.connect(ctx.destination); apply(); } catch (e) { ctx = null; }
    }
    if (ctx && ctx.state === 'suspended') ctx.resume();
  }
  function noiseBuf(dur) {
    const b = ctx.createBuffer(1, Math.floor(ctx.sampleRate * dur), ctx.sampleRate), d = b.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1; return b;
  }
  // tiny synth SFX (no files needed)
  const SFX = {
    light: { f: 520, f2: 180, dur: 0.08, type: 'square', noise: 0.25, vol: 0.35 },
    heavy: { f: 260, f2: 60, dur: 0.16, type: 'sawtooth', noise: 0.5, vol: 0.5 },
    launch: { f: 180, f2: 900, dur: 0.2, type: 'sawtooth', noise: 0.4, vol: 0.45 },
    whiff: { f: 900, f2: 400, dur: 0.06, type: 'triangle', noise: 0.3, vol: 0.12 },
    hurt: { f: 300, f2: 90, dur: 0.22, type: 'square', noise: 0.3, vol: 0.5 },
    heal: { f: 523, f2: 1568, dur: 0.45, type: 'triangle', noise: 0, vol: 0.28 },
    dash: { f: 300, f2: 900, dur: 0.16, type: 'sine', noise: 0.5, vol: 0.18 },
    dust: { f: 120, f2: 40, dur: 0.4, type: 'triangle', noise: 0.8, vol: 0.35 },
    select: { f: 880, f2: 1320, dur: 0.07, type: 'square', noise: 0, vol: 0.18 },
    confirm: { f: 660, f2: 1760, dur: 0.18, type: 'square', noise: 0, vol: 0.22 },
    shine: { f: 1200, f2: 2400, dur: 0.6, type: 'sine', noise: 0.05, vol: 0.3 },
    boom: { f: 90, f2: 30, dur: 0.7, type: 'sawtooth', noise: 0.9, vol: 0.7 },
    alarm: { f: 700, f2: 950, dur: 0.35, type: 'square', noise: 0, vol: 0.2 }
  };
  function sfx(name) {
    ensureCtx(); if (!ctx) return; const s = SFX[name]; if (!s) return;
    const t = ctx.currentTime, g = ctx.createGain();
    g.gain.setValueAtTime(s.vol, t); g.gain.exponentialRampToValueAtTime(0.001, t + s.dur); g.connect(sfxGain);
    const o = ctx.createOscillator(); o.type = s.type; o.frequency.setValueAtTime(s.f, t);
    o.frequency.exponentialRampToValueAtTime(Math.max(20, s.f2), t + s.dur); o.connect(g); o.start(t); o.stop(t + s.dur);
    if (s.noise) {
      const n = ctx.createBufferSource(); n.buffer = noiseBuf(s.dur); const ng = ctx.createGain();
      ng.gain.setValueAtTime(s.vol * s.noise, t); ng.gain.exponentialRampToValueAtTime(0.001, t + s.dur);
      n.connect(ng); ng.connect(sfxGain); n.start(t);
    }
  }
  function stopMusic() { clearTimeout(previewTimer); clearInterval(fadeTimer); music.pause(); musicDuck = 1; apply(); }
  window.AudioManager = {
    settings, unlock: ensureCtx, sfx,
    set(k, v) { settings[k] = v; localStorage.setItem(KEY, JSON.stringify(settings)); apply(); },
    playMusic(src, { loop = true, start = 0 } = {}) {
      stopMusic(); if (!src) return;
      if (!music.src.endsWith(src)) music.src = src;
      music.loop = loop;
      const go = () => { try { music.currentTime = start; } catch (e) {} music.play().catch(() => {}); };
      if (music.readyState >= 1) go(); else music.addEventListener('loadedmetadata', go, { once: true });
      apply();
    },
    // play a song excerpt: start..start+len, fade out at end
    preview(src, start, len) {
      this.playMusic(src, { loop: false, start });
      previewTimer = setTimeout(() => {
        let v = 1; clearInterval(fadeTimer);
        fadeTimer = setInterval(() => { v -= 0.1; musicDuck = Math.max(0, v); apply(); if (v <= 0) { clearInterval(fadeTimer); music.pause(); musicDuck = 1; } }, 60);
      }, Math.max(0, len - 0.6) * 1000);
    },
    stopMusic,
    pauseMusic() { music.pause(); }, resumeMusic() { if (music.src) music.play().catch(() => {}); },
    duck(v) { musicDuck = v; apply(); },
    get musicEl() { return music; },
    playVoice(src) {
      return new Promise(res => {
        voice.src = src; voice.currentTime = 0; apply();
        let done = false; const fin = () => { if (!done) { done = true; res(); } };
        voice.onended = fin; voice.onerror = fin;
        voice.play().catch(fin);
        setTimeout(fin, 15000);
      });
    },
    stopVoice() { voice.pause(); if (voice.onended) voice.onended(); },
    registerVideo(v) { videos.add(v); apply(); }
  };
  apply();
})();
