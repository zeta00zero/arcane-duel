/* Songs of the Symphony - prototype engine
 * Data:   js/data/characters.js, js/data/missions.js, js/data/sprite_meta.js
 * Flow:   Title > Mission select > Song select > VN > Transformation > Fight > Clear / Game Over
 */
(() => {
'use strict';
const D = window.SOTS_DATA, META = window.SOTS_SPRITE_META;
const W = 1280, H = 720;
const $ = id => document.getElementById(id);
const stage = $('stage'), canvas = $('game'), ctx = canvas.getContext('2d');
const params = new URLSearchParams(location.search);
const G = { mission: null, char: null, song: null, scene: null, debug: { god: params.has('god') }, log: [] };
window.SOTS = { G };

// ---------- scaling (fit any window; phones later) ----------
function fit() { const s = Math.min(innerWidth / W, innerHeight / H); stage.style.transform = `scale(${s})`; }
addEventListener('resize', fit); fit();

// ---------- assets ----------
const IMG = {};
function loadImg(src) {
  if (IMG[src]) return IMG[src].p;
  const im = new Image(); const p = new Promise(res => { im.onload = () => res(im); im.onerror = () => { console.warn('missing image', src); res(im); }; });
  im.src = src; IMG[src] = { im, p }; return p;
}
const img = src => (IMG[src] ? IMG[src].im : (loadImg(src), IMG[src].im));
const sheetSrc = key => `assets/img/${key}.png`;
const TINT = {};
function tinted(key, color) {   // silhouette version of a sheet (hit flash, windup, carbonised)
  const id = key + color; if (TINT[id]) return TINT[id];
  const im = img(sheetSrc(key)); if (!im.complete || !im.naturalWidth) return null;
  const c = document.createElement('canvas'); c.width = im.width; c.height = im.height;
  const x = c.getContext('2d'); x.drawImage(im, 0, 0); x.globalCompositeOperation = 'source-atop'; x.fillStyle = color; x.fillRect(0, 0, c.width, c.height);
  return (TINT[id] = c);
}
function preloadAll() {
  const list = ['assets/img/title_v5.jpg', 'assets/img/title_logo.png', 'assets/img/bg_vn_city.jpg'];
  // only the sheets the data actually uses (old unused sheets in sprite_meta.js are not downloaded)
  const used = new Set();
  Object.values(D.characters).forEach(c => Object.values(c.sprites).forEach(sp => used.add(sp.sheet)));
  Object.values(D.enemies).forEach(e => used.add(e.sheet));
  used.forEach(k => META[k] && list.push(sheetSrc(k)));
  Object.values(D.characters).forEach(c => Object.values(c.portraits).forEach(p => list.push(p)));
  Object.values(D.characters).forEach(c => (c.songs || []).forEach(s => s.cover && list.push(s.cover)));
  D.missions.forEach(m => { const b = m.stage.background; list.push(m.vnBackground, ...(b.layers ? b.layers.map(l => l.src) : [b.far, b.near])); });
  return Promise.all(list.map(loadImg));
}
// draw a frame of a sheet. (x,y) = foot position on screen. flip = mirror horizontally.
function drawFrame(key, frame, x, y, scale = 1, flip = false, src = null, sy = 1) {
  const m = META[key]; if (!m) return;
  const im = src || img(sheetSrc(key)); if (!im || (im.complete === false)) return;
  const i = typeof frame === 'number' ? frame : (m.frames[frame] ?? 0);
  const [cw, ch] = m.cell, [ax, ay] = m.anchor, cols = m.cols || 1e9;
  ctx.save(); ctx.translate(x, y); ctx.scale(flip ? -scale : scale, scale * sy);
  ctx.drawImage(im, (i % cols) * cw, Math.floor(i / cols) * ch, cw, ch, -ax, -ay, cw, ch); ctx.restore();
}
// ---------- frame animation (data-driven, see js/data/characters.js) ----------
// anim = { frames:[...], durs:[ticks...] | fps, loop }. Zero-length frames are skipped (used for 'air' frames).
function animFrame(anim, t) {
  const n = anim.frames.length; if (n === 1) return anim.frames[0];
  const durs = anim.durs || anim.frames.map(() => 60 / (anim.fps || 8));
  const total = durs.reduce((a, b) => a + b, 0);
  if (anim.loop !== false) t = ((t % total) + total) % total;
  let acc = 0;
  for (let i = 0; i < n; i++) { acc += durs[i]; if (t < acc) return anim.frames[i]; }
  return anim.frames[n - 1];
}
// stride-driven cycle: frame chosen from distance travelled so the feet don't slide
// stride = sheet px per cycle; optional anim.dists = sheet px travelled during each frame (planted-foot travel),
// so contact / push frames last longer than flight frames and the planted foot doesn't slide.
function strideFrame(anim, dist, scale) {
  const n = anim.frames.length;
  if (!anim.dists) return anim.frames[Math.floor(dist / (anim.stride * scale) * n) % n];
  const tot = anim.dists.reduce((a, b) => a + b, 0);
  let d = (dist / scale) % tot;
  for (let i = 0; i < n; i++) { if (d < anim.dists[i]) return anim.frames[i]; d -= anim.dists[i]; }
  return anim.frames[n - 1];
}
// derive startup / active / recovery (ticks) from a move's per-frame durations and strike frames
function prepMoves(c) {
  for (const m of Object.values(c.moves)) {
    if (!m.frames || !m.durs) continue;
    const hits = m.hit || [1], first = Math.min(...hits), last = Math.max(...hits);
    m.startup = m.durs.slice(0, first).reduce((a, b) => a + b, 0);
    m.active = m.durs.slice(first, last + 1).reduce((a, b) => a + b, 0);
    m.recovery = m.durs.slice(last + 1).reduce((a, b) => a + b, 0);
  }
}
Object.values(D.characters).forEach(prepMoves);
// index of the frame a move is showing at tick t (frames may repeat names, so by index)
function moveIdx(m, t) { let acc = 0; for (let i = 0; i < m.durs.length; i++) { acc += m.durs[i]; if (t < acc) return i; } return m.durs.length - 1; }
// health pickup icon: pixel heart with a music note, built once per item type
const HEART = ['..XXX...XXX..', '.XXXXX.XXXXX.', 'XXXXXXXXXXXXX', 'XXXXXXXXXXXXX', 'XXXXXXXXXXXXX', 'XXXXXXXXXXXXX', '.XXXXXXXXXXX.', '..XXXXXXXXX..', '...XXXXXXX...', '....XXXXX....', '.....XXX.....', '......X......'];
const NOTE = [[7, 2], [8, 2], [9, 3], [7, 3], [7, 4], [7, 5], [7, 6], [7, 7], [6, 7], [5, 7], [5, 8], [6, 8]];
const ICONS = {};
function itemIcon(type) {
  if (ICONS[type]) return ICONS[type];
  const it = D.items[type], px = Math.round(3 * it.size), c = document.createElement('canvas');
  c.width = 15 * px; c.height = 14 * px; const g = c.getContext('2d');
  const cell = (x, y, col) => { g.fillStyle = col; g.fillRect((x + 1) * px, (y + 1) * px, px, px); };
  HEART.forEach((r, y) => [...r].forEach((ch, x) => { if (ch === 'X') for (const [ox, oy] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) cell(x + ox, y + oy, '#2a0a18'); }));
  HEART.forEach((r, y) => [...r].forEach((ch, x) => { if (ch === 'X') cell(x, y, y < 3 && x > 1 && x < 5 ? it.glow : it.color); }));
  NOTE.forEach(([x, y]) => cell(x, y, '#ffffff'));
  return ICONS[type] = c;
}

const esc = t => String(t).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
// ---------- screens ----------
let curScreen = null;
function show(id) {
  document.querySelectorAll('.screen').forEach(s => { if (s.id !== 'scr-overlay') s.classList.remove('on'); });
  if (id) $(id).classList.add('on'); curScreen = id; Input.clear();
}
function overlay(html) { const o = $('scr-overlay'); o.classList.remove('result', 'pausemenu'); if (html == null) { o.classList.remove('on'); return; } $('overlay-panel').innerHTML = html; o.classList.add('on'); }
const overlayOn = () => $('scr-overlay').classList.contains('on');

// generic keyboard focus for DOM lists
let focus = { items: [], i: 0, onMove: null };
function setFocus(items, i = 0, onMove = null) { focus = { items, i, onMove }; markFocus(); }
function markFocus() { focus.items.forEach((el, k) => el.classList.toggle('sel', k === focus.i)); if (focus.onMove) focus.onMove(focus.i); }
function moveFocus(d) { if (!focus.items.length) return; focus.i = (focus.i + d + focus.items.length) % focus.items.length; AudioManager.sfx('select'); markFocus(); }

// ---------- options panel ----------
function optionsHTML(back) {
  const s = AudioManager.settings, row = (k, n) => `<label>${n}</label><input type="range" min="0" max="100" value="${Math.round(s[k] * 100)}" data-vol="${k}"><span id="v-${k}">${Math.round(s[k] * 100)}</span>`;
  return `<h2>Options</h2><div class="vol">${row('master', 'Master')}${row('music', 'Music / Songs')}${row('voice', 'Voice / Video')}${row('sfx', 'Effects')}</div>
    <div class="row"><button class="btn" data-ov="${back}">Back</button></div>`;
}
document.addEventListener('input', e => {
  const k = e.target.dataset && e.target.dataset.vol; if (!k) return;
  AudioManager.set(k, e.target.value / 100); $('v-' + k).textContent = e.target.value; AudioManager.sfx('select');
});

// ============================================================
// TITLE
// ============================================================
// menu music (Vitalization) keeps looping across title / mission / character select
function menuMusic() {
  const src = D.music && D.music.title, m = AudioManager.musicEl; if (!src) return;
  if (!(m.src.endsWith(src) && !m.paused)) AudioManager.playMusic(src, { loop: true, start: 0 });
}
// INTRO: gate (browser autoplay needs a gesture) -> characters pop in from the sides with the music -> white flash -> title card
const INTRO_ORDER = ['maria', 'tsubasa', 'shirabe', 'chris', 'kirika', 'kanade', 'miku', 'hibiki'];
const Intro = {
  enter() {
    show('scr-intro'); this.phase = 'gate'; $('intro-gate').classList.remove('off'); $('intro-skip').style.display = 'none';
    const st = $('intro-stage'); st.classList.remove('go'); st.innerHTML = '';
    const ros = Object.fromEntries(((D.roster && D.roster.slots) || []).map(r => [r.id, r]));
    const side = INTRO_ORDER.filter(id => id !== 'hibiki' && ros[id]);
    side.forEach((id, k) => {           // 3 + 4 split: left side / right side, staggered, overlapping toward the middle
      const left = k % 2 === 0, slot = Math.floor(k / 2), im = document.createElement('img');
      im.src = ros[id].art; im.alt = ''; im.className = left ? 'l' : 'r';
      im.style.setProperty('--d', (0.1 + k * 0.17).toFixed(2) + 's');
      im.style[left ? 'left' : 'right'] = (-90 + slot * 170) + 'px'; im.style.zIndex = 4 - slot;
      st.appendChild(im);
    });
    if (ros.hibiki) { const im = document.createElement('img'); im.src = ros.hibiki.art; im.alt = ''; im.className = 'c';
      im.style.setProperty('--d', (0.25 + side.length * 0.17).toFixed(2) + 's'); im.style.left = '50%'; im.style.marginLeft = '-300px'; im.style.zIndex = 9; st.appendChild(im); }
  },
  begin() {
    if (this.phase !== 'gate') return; this.phase = 'pop'; G.unlocked = true; AudioManager.unlock();
    $('intro-gate').classList.add('off'); $('intro-skip').style.display = '';
    menuMusic(); $('intro-stage').classList.add('go');
    this._t = setTimeout(() => this.flash(), 2700);
  },
  flash() {
    if (this.phase === 'flash' || this.phase === 'gate') return; this.phase = 'flash'; clearTimeout(this._t);
    const f = $('flash'); f.className = 'up'; AudioManager.sfx('shine');
    setTimeout(() => { go(Title); f.className = 'down'; }, 300);
  },
  act() { if (this.phase === 'gate') this.begin(); else if (this.phase === 'pop') this.flash(); },
  exit() { clearTimeout(this._t); }
};
$('scr-intro').addEventListener('click', () => Intro.act());

const Title = {
  enter() {
    show('scr-title'); menuMusic();
    const menu = $('title-menu'), press = $('title-press');
    if (G.started) { menu.classList.add('on'); press.style.display = 'none'; setFocus([...menu.querySelectorAll('.btn')]); }
    else { menu.classList.remove('on'); press.style.display = ''; setFocus([]); }
  },
  unlock() {
    if (G.started) return; G.started = G.unlocked = true; AudioManager.unlock(); AudioManager.sfx('confirm'); menuMusic();
    $('title-menu').classList.add('on'); $('title-press').style.display = 'none'; setFocus([...$('title-menu').querySelectorAll('.btn')]);
  },
  act(a) {
    if (a === 'start') { AudioManager.sfx('confirm'); go(Missions); }
    if (a === 'options') { AudioManager.sfx('select'); overlay(optionsHTML('close')); }
  }
};
$('scr-title').addEventListener('click', e => { if (!G.started) { Title.unlock(); return; } const b = e.target.closest('[data-act]'); if (b) Title.act(b.dataset.act); });

// ============================================================
// MISSION SELECT
// ============================================================
const Missions = {
  enter() {
    show('scr-missions'); menuMusic();
    const list = $('mission-list'); list.innerHTML = '';
    D.missions.forEach((m, i) => {
      const c = D.characters[m.character];
      const el = document.createElement('div'); el.className = 'item';
      el.innerHTML = `<div class="grow"><div class="ttl">${m.title}</div><div class="sub">${m.blurb}</div></div><div class="sub">Hero: ${c.name}</div>`;
      el.onclick = () => { focus.i = i; Missions.pick(); };
      el.onmouseenter = () => { focus.i = i; markFocus(); };
      list.appendChild(el);
    });
    setFocus([...list.children]);
  },
  pick() { G.mission = D.missions[focus.i]; if (!G.char) G.char = D.characters[G.mission.character]; AudioManager.sfx('confirm'); go(CharSelect); }
};
$('scr-missions').addEventListener('click', e => { const b = e.target.closest('[data-act=back]'); if (b) go(Title); });

// One background layer: { src, parallax (0 = fixed, 1 = moves with the ground), y | bottom, scale }.
// Tiles horizontally at its own width (layer art is built seamless by tools/build_bg3.py).
function drawBGLayer(L, cam) {
  const im = img(L.src); if (!im.naturalWidth) return;
  const k = L.scale || 1, w = Math.round(im.width * k), h = Math.round(im.height * k);
  const y = L.bottom != null ? L.bottom - h : (L.y || 0);
  let o = -Math.round(cam * (L.parallax ?? 1)) % w; if (o > 0) o -= w;
  for (let x = o; x < W; x += w) ctx.drawImage(im, x, y, w, h);
}

// ============================================================
// CHARACTER SELECT (grid from SOTS_DATA.roster; scales to any number of slots)
// ============================================================
const SVGNS = 'http://www.w3.org/2000/svg';
function svgEl(tag, attrs, parent) { const e = document.createElementNS(SVGNS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); if (parent) parent.appendChild(e); return e; }
const CharSelect = {
  t: 0,
  // 8-point star: each slot is a tall diamond petal from the shared centre, touching its neighbours edge to edge.
  // Slots go clockwise from the top (SOTS_DATA.roster.slots); geometry from roster.star (screen px).
  enter() {
    show('scr-chars'); this.t = 0; this._hov = -1; menuMusic();
    const R = D.roster, S = R.star || { cx: 640, cy: 392, len: 292, inner: 168 };
    this.slots = R.slots.map(s => ({ ...s, c: D.characters[s.id] || null, locked: !D.characters[s.id] || !!s.locked }));
    const n = this.slots.length, half = Math.PI / n, ix = S.inner * Math.sin(half), iy = -S.inner * Math.cos(half);
    const poly = `0,0 ${-ix},${iy} 0,${-S.len} ${ix},${iy}`;
    const svg = $('cs-svg'); svg.innerHTML = '';
    const defs = svgEl('defs', {}, svg);
    defs.innerHTML = `<filter id="csglow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      <radialGradient id="csgreen" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="scale(600)"><stop offset="0" stop-color="#7aff6a" stop-opacity=".55"/><stop offset=".55" stop-color="#3ad04a" stop-opacity=".18"/><stop offset="1" stop-color="#3ad04a" stop-opacity="0"/></radialGradient>
      <linearGradient id="cssilver" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f4f6fc"/><stop offset=".5" stop-color="#8a90a4"/><stop offset="1" stop-color="#dfe3ee"/></linearGradient>
      <radialGradient id="csfeatherg" cx=".5" cy=".46" r=".52"><stop offset=".62" stop-color="#fff"/><stop offset="1" stop-color="#000"/></radialGradient><mask id="csfeather" maskContentUnits="objectBoundingBox"><rect width="1" height="1" fill="url(#csfeatherg)"/></mask>
      <linearGradient id="csfade" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#05061a" stop-opacity=".85"/><stop offset=".45" stop-color="#05061a" stop-opacity="0"/></linearGradient>`;
    const root = svgEl('g', { transform: `translate(${S.cx} ${S.cy})` }, svg);
    // background: faint fan of light, emblem rings + spokes, the selected slot's green wedge
    const bg = svgEl('g', {}, root);
    for (let i = 0; i < n * 2; i++) { const a0 = i * half - half / 2, a1 = a0 + half, r = 640;
      svgEl('path', { d: `M0 0 L${Math.sin(a0) * r} ${-Math.cos(a0) * r} L${Math.sin(a1) * r} ${-Math.cos(a1) * r}Z`, fill: i % 2 ? '#9ab4ff' : '#ffffff', opacity: i % 2 ? .045 : .025 }, bg); }
    for (const r of [S.len + 34, S.len + 58, 120]) svgEl('circle', { r, fill: 'none', stroke: '#a8b8ff', 'stroke-opacity': .16, 'stroke-width': r > 200 ? 1.2 : 1 }, bg);
    for (let i = 0; i < n; i++) { const a = (i + .5) * 2 * half; svgEl('line', { x1: Math.sin(a) * (S.inner + 10), y1: -Math.cos(a) * (S.inner + 10), x2: Math.sin(a) * (S.len + 58), y2: -Math.cos(a) * (S.len + 58), stroke: '#a8b8ff', 'stroke-opacity': .14 }, bg); }
    this.wedge = svgEl('path', { d: `M0 0 L${-Math.tan(half * 1.15) * 640} -640 L${Math.tan(half * 1.15) * 640} -640Z`, fill: 'url(#csgreen)' }, bg);
    // petals (focus items, in roster order)
    const grid = svgEl('g', { id: 'cs-grid' }, root);
    this.slots.forEach((s, i) => {
      const deg = i * 360 / n, g = svgEl('g', { class: 'cs-card' + (s.locked ? ' locked' : '') }, grid); g.style.transform = `rotate(${deg}deg)`;   // inline style: beats the generic .cs-card.sel rule
      const cp = svgEl('clipPath', { id: 'cscp' + i }, defs); svgEl('polygon', { points: poly }, cp);
      svgEl('polygon', { points: poly, fill: s.color || '#3a3a6a', opacity: .55 }, g);
      // portrait stays UPRIGHT (counter-rotated) and centred in the wide part of the petal so every face is readable
      const pc = svgEl('g', { 'clip-path': `url(#cscp${i})` }, g), up = svgEl('g', { transform: `translate(0 ${-S.len * 0.52}) rotate(${-deg})` }, pc);
      const PS = S.portrait || 172; svgEl('image', { href: s.face, mask: 'url(#csfeather)', x: -PS * (0.5 - (s.petalX || 0)), y: -PS * (s.petalY ?? S.petalY ?? 0.57), width: PS, height: PS, preserveAspectRatio: 'xMidYMid slice' }, up);
      svgEl('polygon', { points: poly, fill: 'url(#csfade)', 'clip-path': `url(#cscp${i})` }, g);
      svgEl('polygon', { points: poly, fill: 'none', stroke: '#1c1e2a', 'stroke-width': 8, 'stroke-linejoin': 'round' }, g);     // dark metal frame
      svgEl('polygon', { points: poly, fill: 'none', stroke: 'url(#cssilver)', 'stroke-width': 3.2, 'stroke-linejoin': 'miter' }, g);
      svgEl('path', { d: `M0 ${-S.len + 16} L5 ${-S.len + 26} L0 ${-S.len + 36} L-5 ${-S.len + 26}Z`, fill: '#e8ecf6', opacity: .85 }, g);   // tip ornament
      g.onclick = () => { if (focus.i === i) this.confirm(); else { focus.i = i; markFocus(); AudioManager.sfx('select'); } };
      g.onmouseenter = () => { if (focus.i !== i) { focus.i = i; markFocus(); } };
    });
    // selection highlight on top: green glowing frame, beam past the tip, gem
    this.hl = svgEl('g', { 'pointer-events': 'none' }, root);
    svgEl('polygon', { points: poly, fill: '#7aff6a', 'fill-opacity': .08, stroke: '#8aff6a', 'stroke-width': 4, filter: 'url(#csglow)' }, this.hl);
    svgEl('line', { x1: 0, y1: -S.len - 4, x2: 0, y2: -S.len - 70, stroke: '#b8ff9a', 'stroke-width': 3, filter: 'url(#csglow)' }, this.hl);
    svgEl('path', { d: `M0 ${-S.len - 22} L9 ${-S.len - 6} L0 ${-S.len + 10} L-9 ${-S.len - 6}Z`, fill: '#d8ffc8', filter: 'url(#csglow)' }, this.hl);
    svgEl('circle', { r: 10, fill: '#e8ffe0', filter: 'url(#csglow)', opacity: .9 }, this.hl);
    this.pos = this.slots.map((s, i) => { const a = i * 2 * half; return [S.cx + Math.sin(a) * S.len * .55, S.cy - Math.cos(a) * S.len * .55]; });
    const def = Math.max(0, this.slots.findIndex(s => G.char ? s.c === G.char : s.id === (G.mission && G.mission.character)));
    setFocus([...grid.children], def, i => this.describe(i));
  },
  describe(i) {
    const s = this.slots[i]; if (!s) return;
    const deg = i * 360 / this.slots.length;
    this.hl.setAttribute('transform', `rotate(${deg})`); this.wedge.setAttribute('transform', `rotate(${deg})`);
    $('cs-name').textContent = s.name; $('cs-jp').textContent = s.jp || '';
    $('cs-blurb').textContent = s.blurb || '';
    const u = !s.locked && s.c.ultimate;
    $('cs-move').innerHTML = s.locked ? 'Coming Soon' : u ? `${esc(u.name)}${u.jp ? `<span class="jp">${esc(u.jp)}</span>` : ''}` : '';
    if (this._hov !== i) {               // cursor just landed on this petal: character's hover cue (Hibiki: 'video project 12')
      this._hov = i;
      if (s.hoverVoice) AudioManager.playVoice(s.hoverVoice); else AudioManager.stopVoice();
    }
    $('cs-prev').innerHTML = !s.locked && s.preview ? `<img src="${s.preview}" alt="">` : '<div class="cs-prev-soon">Coming Soon</div>';
    const art = $('cs-art'), box = art.parentNode; box.classList.toggle('locked', s.locked);
    const src = s.art || (s.c && s.c.portraits.transformed) || '';
    art.onerror = () => { art.style.opacity = 0; };
    art.style.opacity = 1; if (src && !art.src.endsWith(src)) art.src = src;
    const fx = s.artFx || {};                       // per-character big-art framing: s = scale, y = px (negative = up)
    art.style.transformOrigin = '50% 100%'; art.style.transform = `translateX(-50%) translateY(${fx.y || 0}px) scale(${fx.s || 1})`;
    $('cs-confirm').disabled = !!s.locked;
  },
  // arrows: move to the nearest petal in that direction (works for any number of slots)
  move(a) {
    const d = { left: [-1, 0], right: [1, 0], up: [0, -1], down: [0, 1] }[a], [x0, y0] = this.pos[focus.i];
    let best = -1, bs = 1e9;
    this.pos.forEach(([x, y], j) => {
      if (j === focus.i) return; const dx = x - x0, dy = y - y0, along = dx * d[0] + dy * d[1]; if (along <= 1) return;
      const score = Math.hypot(dx, dy) + Math.abs(dx * d[1] - dy * d[0]) * 1.5; if (score < bs) { bs = score; best = j; }
    });
    if (best < 0) best = (focus.i + (a === 'left' || a === 'up' ? -1 : 1) + this.slots.length) % this.slots.length;
    focus.i = best; AudioManager.sfx('select'); markFocus();
  },
  confirm() {
    const s = this.slots[focus.i];
    if (!s || s.locked) { this.hl.classList.remove('deny'); AudioManager.sfx('select'); const g = this.hl; g.style.transition = 'opacity .08s'; g.style.opacity = .2; setTimeout(() => g.style.opacity = 1, 120); return; }
    if (G.char !== s.c) G.song = null;
    G.char = s.c; AudioManager.stopVoice(); AudioManager.sfx('pick');
    preloadVideo(charVideos(G.char));          // start the big downloads now (transform first, then ultimate)
    go(Songs);
  },
  update() { this.t++; },
  exit() { AudioManager.stopVoice(); }
};
$('scr-chars').addEventListener('click', e => {
  const b = e.target.closest('[data-act]'); if (!b) return;
  if (b.dataset.act === 'back') go(Missions); if (b.dataset.act === 'confirm') CharSelect.confirm();
});

// ============================================================
// SONG SELECT (with preview)
// ============================================================
const Songs = {
  playing: -1,
  enter() {
    show('scr-songs');
    const c = G.char; $('songs-portrait').src = c.portraits.transformed; $('songs-charname').textContent = c.name;
    const list = $('song-list'); list.innerHTML = '';
    c.songs.forEach((s, i) => {
      const el = document.createElement('div'); el.className = 'item song';
      el.innerHTML = `<div class="eq"><i></i><i></i><i></i></div>${s.cover ? `<img class="cover" src="${s.cover}" alt="">` : ''}<div class="grow"><div class="ttl">${s.title}</div><div class="sub">${s.artist} &middot; preview ${s.previewLength}s</div></div><button class="btn small ghost" data-prev="${i}">&#9654; Preview</button>`;
      el.addEventListener('click', e => { if (e.target.closest('[data-prev]')) { this.preview(i); return; } focus.i = i; markFocus(); this.preview(i); });
      el.querySelector('[data-prev]').addEventListener('mouseenter', () => this.preview(i));
      list.appendChild(el);
    });
    const sel = Math.max(0, c.songs.findIndex(s => G.song && s.id === G.song.id));
    this.playing = -1;
    setFocus([...list.children], sel, k => this.cover(k));
  },
  cover(i) {                           // big cover + song name for the focused song (if it has one)
    const s = G.char.songs[i], w = $('songs-cover-wrap'); w.classList.toggle('on', !!(s && s.cover));
    if (s && s.cover) { $('songs-cover').src = s.cover; $('songs-cover-name').textContent = s.title; }
  },
  preview(i) {
    this.cover(i);
    if (this.playing === i) return;
    const s = G.char.songs[i]; this.playing = i; focus.i = i; markFocus();
    [...$('song-list').children].forEach((el, k) => el.classList.toggle('playing', k === i));
    AudioManager.preview(s.file, s.previewStart, s.previewLength);
    clearTimeout(this._t); this._t = setTimeout(() => { if (this.playing === i) { this.playing = -1; [...$('song-list').children].forEach(el => el.classList.remove('playing')); } }, s.previewLength * 1000);
  },
  confirm() { G.song = G.char.songs[focus.i]; AudioManager.stopMusic(); AudioManager.sfx('confirm'); this.playing = -1; go(VN); },
  exit() { AudioManager.stopMusic(); clearTimeout(this._t); }
};
$('scr-songs').addEventListener('click', e => {
  const b = e.target.closest('[data-act]'); if (!b) return;
  if (b.dataset.act === 'back') go(CharSelect); if (b.dataset.act === 'confirm') Songs.confirm();
});

// ============================================================
// VISUAL NOVEL
// ============================================================
const VN = {
  enter() {
    show('scr-vn'); this.lines = G.mission.dialogue; this.i = -1;
    $('vn-bg').src = G.mission.vnBackground; this.next();
    preloadVideo(charVideos(G.char));             // no-op if already queued at character select
  },
  next() {
    if (this.typing) { this.finishTyping(); return; }
    this.i++; if (this.i >= this.lines.length) { this.end(); return; }
    const L = this.lines[this.i], por = $('vn-portrait');
    $('vn-name').textContent = L.speaker || '';
    if (L.portrait) { por.src = G.char.portraits[L.portrait] || L.portrait; por.classList.remove('hide'); } else por.classList.add('hide');
    if (/announce/i.test(L.speaker || '')) { AudioManager.sfx('alarm'); setTimeout(() => AudioManager.sfx('alarm'), 400); }
    this.full = L.text; this.n = 0; this.typing = true; $('vn-next').style.display = 'none';
    clearInterval(this.timer);
    this.timer = setInterval(() => { this.n += 1; $('vn-text').textContent = this.full.slice(0, this.n); if (this.n >= this.full.length) this.finishTyping(); }, 22);
  },
  finishTyping() { clearInterval(this.timer); this.typing = false; $('vn-text').textContent = this.full; $('vn-next').style.display = 'block'; },
  end() { clearInterval(this.timer); this.typing = false; go(Transform); },
  exit() { clearInterval(this.timer); }
};
$('scr-vn').addEventListener('click', e => { if (e.target.id === 'vn-skip') { AudioManager.sfx('select'); VN.end(); return; } VN.next(); });

// ============================================================
// VIDEO MANAGER (transformation / ultimate / any cut-in video)
//  - preload(list): downloads the files one after another (first = most urgent) with fetch() into memory,
//    then gives each its own <video> element (created once, reused; src assigned once -> no double download).
//    Why not just <video preload=auto>? Chrome stops pre-buffering a paused video at ~75% (it waits for play),
//    so on slow links the end of the clip stalled. A fully downloaded file can never stall or restart.
//  - play(src, done): if the file is ready it plays at once; otherwise a spinner shows "Loading NN%" until it is.
//    Transient 'waiting' / 'stalled' only show the spinner, they never restart or skip the video.
//    It skips only on a real error or when no data at all arrives for WAIT_MS. Skip / Enter / Esc always skip.
//  - If fetch() is unavailable (file:// pages) it falls back to streaming and starts once the measured
//    download speed says the clip can play through.
//  All paths come from character data (transform.video, ultimate.video).
// ============================================================
const VideoManager = (() => {
  const box = $('scr-video'), spinner = $('vid-loading'), WAIT_MS = 25000;
  const pool = new Map();            // src -> entry
  const queue = []; let loading = null;
  const pctEl = () => $('vid-pct');
  const spin = on => { spinner && spinner.classList.toggle('on', !!on); if (!on && pctEl()) pctEl().textContent = ''; };
  function entry(src) {
    let e = pool.get(src); if (e) return e;
    const el = document.createElement('video');
    el.setAttribute('playsinline', ''); el.playsInline = true; el.preload = 'auto'; el.dataset.src = src;
    e = { el, src, ready: false, failed: false, done: false, streamed: false, got: 0, total: 0, lastProg: performance.now() };
    el.addEventListener('canplaythrough', () => { e.ready = true; pump(); });
    el.addEventListener('error', () => { e.failed = true; console.warn('video failed to load', src); pump(); });
    box.insertBefore(el, box.firstChild); AudioManager.registerVideo(el);
    pool.set(src, e); download(e);
    return e;
  }
  async function download(e) {
    try {
      if (location.protocol === 'file:' || !window.fetch || !window.ReadableStream) throw new Error('no fetch');
      const r = await fetch(e.src); if (!r.ok) throw new Error('HTTP ' + r.status);
      e.total = +r.headers.get('content-length') || 0;
      const rd = r.body.getReader(), parts = [];
      for (;;) { const { done, value } = await rd.read(); if (done) break; parts.push(value); e.got += value.length; e.lastProg = performance.now(); }
      e.el.src = URL.createObjectURL(new Blob(parts, { type: 'video/mp4' }));   // the ONLY src assignment
      e.done = true;
    } catch (err) {
      if (!e.el.src) { e.streamed = true; e.el.src = e.src; }                     // fallback: stream it
    }
    pump();
  }
  const bufferedAhead = el => { const b = el.buffered; for (let i = 0; i < b.length; i++) if (b.start(i) <= el.currentTime + 0.1 && b.end(i) > el.currentTime) return b.end(i) - el.currentTime; return 0; };
  const loaded = e => e.failed || (e.done && (e.ready || e.el.readyState >= 3)) || (e.streamed && (e.ready || e.el.readyState >= 4));
  function pump() {                  // sequential preloading: next file once this one is in
    if (loading && !loaded(loading)) return;
    loading = null;
    while (queue.length) { const e = entry(queue.shift()); if (loaded(e)) continue; loading = e; break; }
  }
  function preload(list) {
    (Array.isArray(list) ? list : [list]).filter(Boolean).forEach(src => { if (!pool.has(src) && !queue.includes(src)) queue.push(src); });
    pump();
  }
  // streaming fallback only: can we start now and reach the end without stalling at the measured speed?
  function canFinish(e, st) {
    const el = e.el, dur = el.duration;
    if (!(dur > 0) || el.readyState < 3) return false;
    const ahead = bufferedAhead(el), end = el.currentTime + ahead, left = dur - el.currentTime;
    if (end >= dur - 0.1) return true;
    const now = performance.now(); st.samples.push([now, end]); while (st.samples.length > 2 && now - st.samples[0][0] > 6000) st.samples.shift();
    const [t0, b0] = st.samples[0], span = (now - t0) / 1000;
    if (span < 1.5) return false;
    const rate = (end - b0) / span;
    return ahead >= 3 && ahead >= left * Math.max(0, 1 - rate) * 1.2 + 2;
  }
  const playable = (e, st) => e.done ? e.el.readyState >= 3 : e.streamed ? canFinish(e, st) : false;
  let current = null;
  function play(src, done) {
    show('scr-video');
    const e = entry(src), el = e.el;
    pool.forEach(o => o.el.classList.toggle('active', o === e));
    let finished = false, started = false, poll = null;
    const st = { samples: [], lastEnd: -1, lastProg: performance.now() };
    const off = () => { el.removeEventListener('ended', fin); el.removeEventListener('waiting', onWait); el.removeEventListener('playing', onPlaying); el.removeEventListener('error', onErr); };
    function fin() {
      if (finished) return; finished = true; clearInterval(poll); off(); spin(false);
      el.pause(); el.classList.remove('active'); current = null;
      try { el.currentTime = 0; } catch (err) {}
      done && done();
    }
    const onWait = () => { if (started) spin(true); };              // transient: spinner only, never restart / skip
    const onPlaying = () => spin(false);
    const onErr = () => { console.warn('video failed', src); fin(); };
    function start() {
      if (started || finished) return; started = true; clearInterval(poll); spin(false);
      el.muted = false;
      el.play().catch(() => { el.muted = true; el.play().catch(fin); });
    }
    el.addEventListener('ended', fin); el.addEventListener('waiting', onWait); el.addEventListener('playing', onPlaying); el.addEventListener('error', onErr);
    if (e.failed) { fin(); return; }
    try { if (el.currentTime > 0) el.currentTime = 0; } catch (err) {}
    { const qi = queue.indexOf(src); if (qi >= 0) queue.splice(qi, 1); }    // this one jumps the preload queue
    if (playable(e, st)) start();
    else {
      spin(true);
      poll = setInterval(() => {
        if (e.failed) return fin();
        if (playable(e, st)) return start();
        const now = performance.now(); let p = 0;
        if (e.streamed) { const end = el.currentTime + bufferedAhead(el); if (end > st.lastEnd + 0.01) { st.lastEnd = end; st.lastProg = now; } p = el.duration > 0 ? end / el.duration : 0; }
        else { st.lastProg = Math.max(st.lastProg, e.lastProg); p = e.total ? e.got / e.total : 0; }
        if (pctEl()) pctEl().textContent = p ? ' ' + Math.min(99, Math.floor(p * 100)) + '%' : '';
        // give up only when NOTHING arrives for WAIT_MS (a slow-but-moving download keeps going; Skip is always there)
        if (now - st.lastProg > WAIT_MS) { if (el.readyState >= 3) start(); else { console.warn('video too slow, skipping', src); fin(); } }
      }, 200);
    }
    current = { src, skip: fin };
  }
  const status = () => [...pool.values()].map(e => ({ src: e.src, got: e.got, total: e.total, done: e.done, streamed: e.streamed, readyState: e.el.readyState }));
  return { preload, play, status, skip: () => current && current.skip(), get playing() { return current; }, pool, el: src => pool.get(src) && pool.get(src).el };
})();
const preloadVideo = list => VideoManager.preload(list);
const playVideo = (src, done) => VideoManager.play(src, done);
playVideo.skip = () => VideoManager.skip();
// videos a character needs: transformation first (it plays first), then the ultimate
const charVideos = c => [c.transform && c.transform.video, c.ultimate && c.ultimate.video].filter(Boolean);
$('vid-skip').addEventListener('click', () => VideoManager.skip());
window.SOTS.videos = VideoManager;


// ============================================================
// TRANSFORMATION (canvas)
// ============================================================
const Transform = {
  canvasScene: true,
  enter() {
    show(null); this.phase = 'phrase'; this.t = 0; this.textN = 0; this.parts = [];
    const tr = G.char.transform;
    preloadVideo(charVideos(G.char));
    AudioManager.playVoice(tr.phraseAudio).then(() => { if (this.phase === 'phrase') this.toShine(); });
    this.voiceStart = performance.now();
  },
  toShine() { this.phase = 'shine'; this.t = 0; AudioManager.sfx('shine'); },
  toVideo() {
    if (!G.char.transform || !G.char.transform.video) {   // Tsubasa (and anyone without a clip): shine -> reveal
      show(null); this.phase = 'reveal'; this.t = 0; AudioManager.sfx('boom'); return;
    }
    this.phase = 'video';
    playVideo(G.char.transform.video, () => { show(null); this.phase = 'reveal'; this.t = 0; AudioManager.sfx('boom'); });
  },
  skip() { if (this.phase === 'phrase') { AudioManager.stopVoice(); } else if (this.phase === 'shine') this.toVideo(); else if (this.phase === 'reveal') this.t = 999; },
  update() {
    this.t++;
    if (Input.consume('confirm')) this.skip();
    const tr = G.char.transform;
    if (this.phase === 'phrase') this.textN = Math.min(tr.phraseText.length, this.textN + 0.45);
    if (this.phase === 'shine' && this.t > 80) this.toVideo();
    if (this.phase === 'reveal' && this.t > 110) go(Fight);
    if (this.phase !== 'video' && Math.random() < 0.5) this.parts.push({ x: 640 + (Math.random() - .5) * 300, y: 560, vy: -1 - Math.random() * 3, vx: (Math.random() - .5), life: 80, c: Math.random() < .5 ? '#ffd36a' : '#fff' });
    this.parts.forEach(p => { p.x += p.vx; p.y += p.vy; p.life--; }); this.parts = this.parts.filter(p => p.life > 0);
  },
  draw() {
    const bg = img(G.mission.vnBackground);
    ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);
    if (this.phase === 'reveal') return this.drawReveal();
    ctx.globalAlpha = 0.35; ctx.drawImage(bg, 0, 0, W, H); ctx.globalAlpha = 1;
    const rays = this.phase === 'shine' ? this.t / 80 : 0.15 + 0.05 * Math.sin(this.t * 0.1);
    drawRays(640, 420, rays, this.t);
    const an = G.char.anims.civilian, sp = G.char.sprites[an.sprite];
    const f = an.frames[Math.floor(this.t / 60 * an.fps) % an.frames.length];
    drawFrame(sp.sheet, f, 640, 600, 1.5);
    if (this.phase === 'shine') { const w = tinted(sp.sheet, '#fff'); ctx.globalAlpha = Math.min(1, this.t / 50); drawFrame(sp.sheet, f, 640, 600, 1.5, false, w); ctx.globalAlpha = 1; }
    this.parts.forEach(p => { ctx.globalAlpha = p.life / 80; ctx.fillStyle = p.c; ctx.fillRect(p.x, p.y, 4, 4); }); ctx.globalAlpha = 1;
    const txt = G.char.transform.phraseText.slice(0, Math.floor(this.textN));
    ctx.font = '700 46px Pixelify'; ctx.textAlign = 'center'; ctx.lineWidth = 8; ctx.strokeStyle = '#7a2a08'; ctx.fillStyle = '#ffe9c2';
    ctx.strokeText(txt, 640, 130); ctx.fillText(txt, 640, 130);
    ctx.font = '22px Pixelify'; ctx.fillStyle = '#fff9'; ctx.fillText('Enter: skip', 1180, 700);
    if (this.phase === 'shine') { ctx.fillStyle = `rgba(255,255,255,${Math.max(0, (this.t - 40) / 40)})`; ctx.fillRect(0, 0, W, H); }
  },
  drawReveal() {
    const t = this.t; drawRays(640, 360, 1, t);
    const por = img(G.char.portraits.transformed); const s = 1 + Math.max(0, 1 - t / 30) * 0.1;
    ctx.save(); ctx.translate(640, 720); ctx.scale(s, s); ctx.drawImage(por, -por.width / 2, -720, por.width, 720); ctx.restore();
    ctx.font = '700 64px Pixelify'; ctx.textAlign = 'center'; ctx.lineWidth = 10; ctx.strokeStyle = '#7a2a08'; ctx.fillStyle = '#fff';
    const a = Math.min(1, Math.max(0, (t - 15) / 15)); ctx.globalAlpha = a;
    ctx.strokeText(G.char.name.toUpperCase() + '  -  SYMPHONY ON!', 640, 90); ctx.fillText(G.char.name.toUpperCase() + '  -  SYMPHONY ON!', 640, 90); ctx.globalAlpha = 1;
    ctx.fillStyle = `rgba(255,255,255,${Math.max(0, 1 - t / 25)})`; ctx.fillRect(0, 0, W, H);
  },
  exit() { AudioManager.stopVoice(); }
};
function drawRays(cx, cy, k, t) {
  const g = ctx.createRadialGradient(cx, cy, 10, cx, cy, 700);
  g.addColorStop(0, `rgba(255,230,160,${0.6 * k + 0.2})`); g.addColorStop(1, 'rgba(255,120,40,0)');
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  ctx.save(); ctx.translate(cx, cy); ctx.rotate(t * 0.004); ctx.fillStyle = `rgba(255,240,200,${0.25 * k + 0.05})`;
  for (let i = 0; i < 16; i++) { ctx.rotate(Math.PI / 8); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(1200, -60); ctx.lineTo(1200, 60); ctx.fill(); }
  ctx.restore();
}

// ============================================================
// FIGHT
// ============================================================
const GRAV = 0.75;
const rnd = (a, b) => a + Math.random() * (b - a);
// ---------- result: score + rank ----------
// score = 10000 clear bonus + time bonus 100/s under par (mission.parTime, default 180 s) + Noisy 300 each
//       + max combo 400 each + hits 20 each - damage taken 60 per HP + 5000 no-damage bonus.  Rank by score (RANKS).
const RANKS = [{ r: 'D', at: 0 }, { r: 'C', at: 12000 }, { r: 'B', at: 22000 }, { r: 'A', at: 32000 }, { r: 'S', at: 42000 }];
function resultScore(m, s, secs) {
  const par = (m && m.parTime) || 180;
  const score = Math.max(0, Math.round(10000 + Math.max(0, par - secs) * 100 + s.kills * 300 + s.maxCombo * 400 + s.hits * 20 - s.dmgTaken * 60 + (s.dmgTaken === 0 ? 5000 : 0)));
  let ri = 0; RANKS.forEach((r, i) => { if (score >= r.at) ri = i; });
  const hi = i => (RANKS[i + 1] ? RANKS[i + 1].at : RANKS[i].at * 1.25);                // bar: 5 equal segments, filled within the band
  const bar = Math.min(1, (ri + Math.min(1, (score - RANKS[ri].at) / (hi(ri) - RANKS[ri].at))) / RANKS.length);
  const nx = RANKS[ri + 1];
  return { score, rank: RANKS[ri].r, bar, next: nx ? { r: nx.r, need: nx.at - score } : null };
}
const pad3 = n => String(n ?? 0).padStart(3, '0'), pad6 = n => String(n ?? 0).padStart(6, '0');
const fmtTime = t => t == null ? '--:--.--' : `${String(Math.floor(t / 60)).padStart(2, '0')}:${(t % 60).toFixed(2).padStart(5, '0')}`;
window.SOTS_resultScore = resultScore;
const A_DASH = c => (c.anims.dash ? c.anims.dash.frames[0] : 'idle0');
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
let uid = 0;
const Fight = {
  canvasScene: true,
  enter() {
    show(null); overlay(null);
    const st = G.mission.stage, c = G.char;
    this.st = st; this.c = c; this.t = 0; this.hitstop = 0; this.shake = 0; this.flash = 0; this.flashColor = '#fff';
    this.camX = 0; this.lock = null; this.waveIdx = 0; this.wave = null; this.pending = []; this.enemies = []; this.fx = []; this.texts = [];
    this.banner = null; this.goArrow = 0; this.done = false; this.paused = false; this.state = 'play';
    this.stats = { hits: 0, maxCombo: 0, dmgTaken: 0, frames: 0, kills: 0 };
    this.combo = 0; this.comboT = 0; this.comboPop = 0; this.slowmo = 0; this.zoom = 1; this.zoomX = W / 2; this.hpShake = 0;
    this.p = { x: 200, y: 610, z: 0, vx: 0, vz: 0, face: 1, hp: c.stats.hp, hpMax: c.stats.hp, meter: 0, state: 'idle', t: 0, move: null, mt: 0, buf: [], inv: 0, hitIds: new Set(), trail: [], dashCd: 0, dashLate: 0 };
    this.items = []; this.decals = [];
    preloadVideo(charVideos(c));                    // ultimate must be ready before L is pressed
    AudioManager.playMusic(G.song.file, { loop: true, start: 0 });
    this.songT = 240; Input.clear();
    this.banner = { text: 'MISSION START', sub: G.mission.title, t: 0, dur: 120 };
  },
  exit() { overlay(null); },
  // ---------------- update ----------------
  update() {
    if (this.paused || this.state === 'video') { if (this.paused && Input.consume('pause')) this.resume(); return; }
    if (Input.consume('pause') && this.state === 'play') { this.pause(); return; }
    if (this.slowmo > 0 && this.state === 'play') { this.slowmo--; if (this.slowmo % 2) return; }   // finisher slow-mo: half speed
    this.t++;
    if (this.banner) { this.banner.t++; if (this.banner.t > this.banner.dur) this.banner = null; }
    if (this.flash > 0) this.flash--;
    if (this.shake > 0) this.shake *= 0.85, this.shake < 0.5 && (this.shake = 0);
    if (this.zoom > 1) { this.zoom = 1 + (this.zoom - 1) * 0.88; if (this.zoom < 1.002) this.zoom = 1; }
    if (this.songT > 0) this.songT--;
    if (this.comboT > 0 && --this.comboT === 0) this.combo = 0;
    if (this.comboPop > 0) this.comboPop--;
    this.fx.forEach(f => f.update ? f.update(f) : 0); this.fx = this.fx.filter(f => f.life-- > 0);
    this.decals = this.decals.filter(d => d.life-- > 0);
    this.texts.forEach(t => { t.y -= 1; t.life--; }); this.texts = this.texts.filter(t => t.life > 0);
    if (this.hitstop > 0) { this.hitstop--; return; }
    if (this.state === 'play') this.stats.frames++;
    this.updatePlayer(); this.updateItems(); this.updateWaves();
    this.enemies.forEach(e => {
      const ox = e.x, oy = e.y; this.updateEnemy(e);
      const d = Math.hypot(e.x - ox, e.y - oy);
      if (e.state === 'walk' || e.state === 'enter') { e.wd = (e.wd || 0) + d; e.still = d < 0.3 ? (e.still || 0) + 1 : 0; }
    });
    this.enemies = this.enemies.filter(e => !e.gone);
    this.updateCamera();
    if (this.state === 'clear' && --this.endT <= 0) this.showClear();
    if (this.state === 'ko' && --this.endT <= 0) this.showGameOver();
  },
  updatePlayer() {
    const p = this.p, c = this.c, S = c.stats;
    p.t++; if (p.inv > 0) p.inv--;
    // buffer attack presses (input abstraction)
    if (this.state === 'play') {
      if (Input.consume('light')) p.buf.push({ b: 'light', t: 14 });
      if (Input.consume('heavy')) p.buf.push({ b: 'heavy', t: 14 });
      if (Input.consume('jump')) p.buf.push({ b: 'jump', t: 8 });
      if (Input.consume('dash')) p.buf.push({ b: 'dash', t: 8 });
      if (Input.consume('ult')) this.tryUlt();
    } else Input.clear();
    p.buf.forEach(b => b.t--); p.buf = p.buf.filter(b => b.t > 0);
    if (p.dashCd > 0) p.dashCd--; if (p.dashLate > 0) p.dashLate--;
    p.trail.forEach(g => g.life--); p.trail = p.trail.filter(g => g.life > 0);
    // physics
    p.x += p.vx; p.vx *= 0.82; if (Math.abs(p.vx) < 0.05) p.vx = 0;
    if (p.z > 0 || p.vz) { p.vz -= GRAV; p.z += p.vz; if (p.z <= 0) { p.z = 0; p.vz = 0; } }
    if (p.z > 0) p.landT = p.t;                     // time since landing drives down / ko frames
    if (p.state === 'ko' || this.state === 'clear') { this.clampPlayer(); return; }
    if (p.state === 'hit') { if (p.t > 22) this.setP('idle'); this.clampPlayer(); return; }
    if (p.state === 'down') {                         // knockdown: fly, lie, get up
      const a = c.anims.down, lie = a.durs[1], up = a.durs[2];
      if (p.z <= 0 && p.t - (p.landT || 0) > lie + up) { this.setP('idle'); p.inv = Math.max(p.inv, 30); }
      this.clampPlayer(); return;
    }
    if (p.state === 'ultpose') { if (p.t > 26) this.startUltVideo(); return; }
    if (p.state === 'attack') {
      const m = c.moves[p.move]; p.mt++;
      if (m.air) { this.updateAirMove(m); return; }
      const ck = m.charge ? p.chg || 0 : 0, stT = m.stepT || m.startup;          // charged heavy: further / harder
      if (p.mt <= stT) p.x += p.face * ((m.step || 0) + (ck ? m.charge.step * ck : 0)) / Math.max(1, stT);
      const fi = moveIdx(m, p.mt - 1);
      if ((m.trail || ck > 0.25) && p.mt <= stT && p.mt % 2 === 0) p.trail.push({ x: p.x, y: p.y, z: p.z, frame: m.frames[fi], face: p.face, life: 12 });
      if (fi !== p.mfi) { p.mfi = fi; if (m.multi && m.hit.includes(fi)) p.hitIds = new Set(); }   // multi-hit: each strike frame hits again
      if (m.hop && p.mt === m.startup + 1) { p.vz = m.hop; p.z = Math.max(p.z, 1); }
      let mm = m.finisher && fi === Math.max(...m.hit) ? { ...m, ...m.finisher } : m;
      if (ck) mm = { ...mm, dmg: Math.round(mm.dmg + m.charge.dmg * ck), knock: mm.knock + m.charge.knock * ck, shake: (mm.shake || 0) + m.charge.shake * ck };
      if (p.mt > m.startup && p.mt <= m.startup + m.active) this.checkHits(mm);
      if (p.mt === m.startup + 1) AudioManager.sfx('whiff');
      if (p.mt >= m.startup + m.active) {        // chain window (dash cancels recovery too)
        if (p.z <= 0 && this.tryDash()) return;
        const nb = p.buf.find(b => m.chain && m.chain[b.b]);
        if (nb) { p.buf = []; this.startMove(m.chain[nb.b]); return; }
      }
      if (p.mt >= m.startup + m.active + m.recovery) this.setP(p.z > 0 ? 'jump' : 'idle');
      this.clampPlayer(); return;
    }
    if (p.state === 'charge') {                       // holding K: glow + shake; release (or dash) = heavy dash punch
      const m = c.moves[c.starters.heavy], C = m.charge, held = this.state === 'play' && Input.isDown('heavy');
      if (this.tryDash()) return;
      if (!held || p.t > C.cap + 90) {                // auto-release 1.5 s after full charge
        const k = p.t < C.min ? 0 : Math.min(1, (p.t - C.min) / (C.cap - C.min));
        p.chgK = 0; this.startMove(c.starters.heavy, k); if (k > 0.5) { AudioManager.sfx('launch', { pitch: 1 + k * 0.3 }); this.shake = Math.max(this.shake, 4); } return;
      }
      p.chgK = Math.min(1, Math.max(0, (p.t - C.min) / (C.cap - C.min)));
      if (p.t === C.cap) { AudioManager.sfx('shine', { vol: 0.6 }); this.fx.push({ type: 'ring', x: p.x + p.face * 50, y: p.y - 115, r: 70, life: 14, max: 14, w: 6, c: '255,214,106' }); }
      else if (p.t > C.min && p.t % 9 === 0) this.fx.push({ type: 'ring', x: p.x + p.face * 50, y: p.y - 115, r: 26 + 40 * p.chgK, life: 10, max: 10, w: 3, c: '255,190,90' });
      this.clampPlayer(); return;
    }
    if (p.state === 'dash') {                         // Shift: short burst, invulnerable, leaves afterimages
      const DS = c.dash, k = 0.35 + 0.65 * Math.max(0, 1 - p.t / DS.ticks);
      p.x += p.dashDx * DS.speed * k; p.y += p.dashDy * DS.speed * 0.45 * k;
      if (p.t % 2 === 0) p.trail.push({ x: p.x, y: p.y, z: p.z, frame: A_DASH(c), face: p.face, life: 14 });
      const b = p.buf.find(b => c.dashMoves[b.b]);
      if (b) { p.buf = []; this.startMove(c.dashMoves[b.b]); return; }
      if (p.t >= DS.ticks) { this.setP('idle'); p.dashLate = 10; }
      this.clampPlayer(); return;
    }
    if (p.state === 'jump') {                         // Space: airborne, steerable, J / K = air moves
      const dx = this.state === 'play' ? (Input.isDown('right') ? 1 : 0) - (Input.isDown('left') ? 1 : 0) : 0;
      const dy = this.state === 'play' ? (Input.isDown('down') ? 1 : 0) - (Input.isDown('up') ? 1 : 0) : 0;
      p.x += dx * S.speed * c.jump.air; p.y += dy * S.depthSpeed * 0.6; if (dx) p.face = dx;
      const b = p.buf.find(b => c.airMoves[b.b]);
      if (b && p.z > 12) { p.buf = []; this.startMove(c.airMoves[b.b]); return; }
      if (p.z <= 0 && p.t > 1) { this.setP('land'); AudioManager.sfx('dust'); }
      this.clampPlayer(); return;
    }
    if (p.state === 'land' && p.t < (p.landTicks || 6)) { this.clampPlayer(); return; }
    // idle / walk
    if (p.ultQ && this.state === 'play') { this.tryUlt(); if (p.state === 'ultpose') return; }
    if (this.tryDash()) return;
    const jb = p.buf.findIndex(b => b.b === 'jump');
    if (jb >= 0) { p.buf.splice(jb, 1); p.vz = c.jump.vz; p.z = 0.1; this.setP('jump'); AudioManager.sfx('whiff'); return; }
    const b = p.buf.find(b => c.starters[b.b]);
    if (b) {
      p.buf = []; const id = p.dashLate > 0 && c.dashMoves[b.b] ? c.dashMoves[b.b] : c.starters[b.b];
      if (c.moves[id].charge) { this.setP('charge'); p.chgK = 0; return; }           // K: start charging (tap = instant power punch)
      this.startMove(id); return;
    }
    let dx = (Input.isDown('right') ? 1 : 0) - (Input.isDown('left') ? 1 : 0);
    let dy = (Input.isDown('down') ? 1 : 0) - (Input.isDown('up') ? 1 : 0);
    if (this.state !== 'play') dx = dy = 0;
    const ox = p.x, oy = p.y;
    p.x += dx * S.speed; p.y += dy * S.depthSpeed;
    if (dx) p.face = dx;
    const moving = dx || dy;
    if (moving && p.state !== 'walk') { this.setP('walk'); p.wd = 0; } else if (!moving && p.state !== 'idle') this.setP('idle');
    this.clampPlayer();
    p.wd = (p.wd || 0) + Math.hypot(p.x - ox, p.y - oy);   // walk anim advances by real distance moved
  },
  clampPlayer() {
    const p = this.p, st = this.st;
    p.y = clamp(p.y, st.laneTop, st.laneBottom);
    const lo = this.lock ? this.lock + 40 : 40, hi = this.lock ? this.lock + W - 40 : st.length - 40;
    p.x = clamp(p.x, Math.max(lo, this.camX + 30), Math.min(hi, this.camX + W - 30));
  },
  tryDash() {
    const p = this.p, c = this.c, i = p.buf.findIndex(b => b.b === 'dash');
    if (i < 0 || p.dashCd > 0 || p.z > 0 || this.state !== 'play') return false;
    p.buf.splice(i, 1);
    let dx = (Input.isDown('right') ? 1 : 0) - (Input.isDown('left') ? 1 : 0), dy = (Input.isDown('down') ? 1 : 0) - (Input.isDown('up') ? 1 : 0);
    if (!dx && !dy) dx = p.face; if (dx) p.face = dx;
    const l = Math.hypot(dx, dy); p.dashDx = dx / l; p.dashDy = dy / l;
    this.setP('dash'); p.dashCd = c.dash.ticks + c.dash.cooldown; AudioManager.sfx('dash');
    for (let k = 0; k < 6; k++) this.fx.push({ type: 'dot', x: p.x - p.dashDx * 20, y: p.y - 4, vx: -p.dashDx * rnd(1, 4), vy: rnd(-2, 0), c: '#d8d0c0', life: 18, max: 18, sz: rnd(4, 8), update: f => { f.x += f.vx; f.y += f.vy; } });
    return true;
  },
  updateAirMove(m) {                                   // jump kick / dive: active until landing
    const p = this.p, S = this.c.stats;
    if (m.dive) {
      if (p.mt <= m.startup) { p.vz = Math.max(p.vz, 1.2); p.vx = 0; }                       // hang + wind-up
      else { p.vz = -m.dive; p.vx = 0; }                                                       // straight down, fast
    }
    else { const dx = this.state === 'play' ? (Input.isDown('right') ? 1 : 0) - (Input.isDown('left') ? 1 : 0) : 0; p.x += dx * S.speed * this.c.jump.air * 0.7; }
    if (p.mt === m.startup + 1) AudioManager.sfx('whiff');
    if (p.mt > m.startup && p.z > 0) this.checkHits(m);
    if (p.z <= 0 && p.mt > 1) { if (m.slam) this.slam(m.slam); this.setP('land'); p.landPose = m.slam ? m.landPose : null; p.landTicks = m.slam ? m.landTicks : 6; }
    this.clampPlayer();
  },
  slam(sl) {                                           // GROUND SMASH: flash, shake, crack decal, debris, flattened rings, knock-up
    const p = this.p; this.shake = Math.max(this.shake, sl.shake || 8); this.flash = 7; this.flashColor = '#fff6d8';
    this.fx.push({ type: 'ring', x: p.x, y: p.y, r: sl.radius * 1.15, life: 22, max: 22, w: 10, c: '255,236,170' });
    this.fx.push({ type: 'ring', x: p.x, y: p.y, r: sl.radius * 0.7, life: 14, max: 14, w: 14, c: '255,255,255' });
    this.fx.push({ type: 'burst', x: p.x, y: p.y - 10, life: 10, max: 10 });                         // bright impact flash at the fist
    if (sl.crack) this.decals.push({ x: p.x, y: p.y, life: sl.crack, max: sl.crack, cracks: Array.from({ length: 9 }, (_, i) => {
      const a = (i / 9) * Math.PI * 2 + rnd(-0.25, 0.25), pts = [[0, 0]]; let r = 0, ang = a;
      while (r < sl.radius * rnd(0.55, 0.9)) { r += rnd(14, 26); ang += rnd(-0.35, 0.35); pts.push([Math.cos(ang) * r, Math.sin(ang) * r * 0.3]); }
      return pts; }) });
    for (const side of [-1, 1]) {
      for (let k = 0; k < 12; k++) this.fx.push({ type: 'dot', x: p.x + side * rnd(10, 50), y: p.y + rnd(-4, 4), vx: side * rnd(2, 9), vy: rnd(-11, -3), c: ['#8a7a66', '#b8a88e', '#5a4e44', '#ffd36a'][k % 4], life: 34, max: 34, sz: rnd(5, 11),
        floorY: p.y + rnd(0, 10), update: f => { f.x += f.vx; f.y += f.vy; f.vy += 0.6; if (f.y > f.floorY) { f.y = f.floorY; f.vy *= -0.3; f.vx *= 0.6; } } });
      for (let k = 0; k < 8; k++) this.fx.push({ type: 'puff', x: p.x + side * rnd(20, 90), y: p.y + rnd(-8, 6), vx: side * rnd(2, 5), vy: rnd(-1.5, 0), c: '#d8cbb4', sz: rnd(16, 30), life: 40, max: 40, update: f => { f.x += f.vx; f.y += f.vy; f.vx *= 0.92; } });
    }
    for (const e of this.enemies) {
      if (e.dead || e.state === 'enter' && e.offscreen) continue;
      if (Math.abs(e.x - p.x) > sl.radius + e.def.width / 2 || Math.abs(e.y - p.y) > sl.depth || e.z > 60) continue;
      this.hitEnemy(e, sl, e.x >= p.x ? 1 : -1);
    }
    AudioManager.sfx(sl.sfx || 'boom'); AudioManager.sfx('heavy');
    this.hitstop = Math.max(this.hitstop, sl.hitstop || 8);
  },
  // ---------------- pickups ----------------
  rollDrop(e) {
    const tbl = (this.st.drops || {})[e.type]; if (!tbl) return;
    for (const d of tbl) if (Math.random() < d.chance) { this.dropItem(d.item, e.x, e.y); break; }
  },
  dropItem(type, x, y) {
    const st = this.st; this.items.push({ type, x: clamp(x, this.camX + 40, this.camX + W - 40), y: clamp(y, st.laneTop, st.laneBottom), z: 30, vz: 7, t: 0 });
  },
  updateItems() {
    const p = this.p, I = D.items;
    for (const it of this.items) {
      it.t++; if (it.z > 0 || it.vz) { it.vz -= GRAV; it.z += it.vz; if (it.z <= 0) { it.z = 0; it.vz = it.vz < -3 ? -it.vz * 0.35 : 0; } }
      if (it.t > I.life) { it.gone = true; continue; }
      if (it.t > 15 && p.state !== 'ko' && Math.abs(it.x - p.x) < 46 && Math.abs(it.y - p.y) < 32 && p.z < 50) {
        const def = I[it.type], heal = Math.round(p.hpMax * def.heal), got = Math.min(heal, p.hpMax - p.hp);
        p.hp = Math.min(p.hpMax, p.hp + heal); it.gone = true; this.stats.pickups = (this.stats.pickups || 0) + 1;
        this.texts.push({ x: p.x, y: p.y - 190, s: `+${got} HP`, life: 50, c: '#7dff8a' });
        AudioManager.sfx('heal');
        for (let k = 0; k < 12; k++) this.fx.push({ type: 'dot', x: it.x, y: it.y - 30, vx: rnd(-3, 3), vy: rnd(-6, -1), c: k % 2 ? def.color : '#ffffff', life: 26, max: 26, sz: rnd(3, 6), update: f => { f.x += f.vx; f.y += f.vy; f.vy += 0.15; } });
      }
    }
    this.items = this.items.filter(it => !it.gone);
  },
  drawDecals(cam) {                                     // ground cracks (smash): glow hot at first, fade out at the end
    for (const d of this.decals) {
      const age = d.max - d.life, a = Math.min(1, d.life / 20), hot = Math.max(0, 1 - age / 25), x = d.x - cam;
      ctx.save(); ctx.translate(x, d.y); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
      ctx.fillStyle = `rgba(20,14,10,${0.45 * a})`; ctx.beginPath(); ctx.ellipse(0, 0, 46, 13, 0, 0, Math.PI * 2); ctx.fill();
      for (const pass of [[7, `rgba(30,22,16,${0.85 * a})`], [3, `rgba(255,${180 + 60 * hot | 0},90,${hot * a})`]]) {
        if (pass[0] === 3 && hot <= 0) continue;
        ctx.lineWidth = pass[0]; ctx.strokeStyle = pass[1];
        for (const c of d.cracks) { ctx.beginPath(); c.forEach(([px, py], i) => i ? ctx.lineTo(px, py) : ctx.moveTo(px, py)); ctx.stroke(); }
      }
      ctx.restore();
    }
  },
  drawItems(cam) {
    const I = D.items;
    for (const it of this.items) {
      const left = I.life - it.t; if (left < I.blinkAt && Math.floor(it.t / 5) % 2) continue;   // blink before despawn
      const ic = itemIcon(it.type), def = I[it.type], x = it.x - cam, bob = Math.sin(it.t * 0.09) * 5, y = it.y - 26 - it.z + bob;
      ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.beginPath(); ctx.ellipse(x, it.y, 16 * def.size, 5, 0, 0, Math.PI * 2); ctx.fill();
      const gr = ctx.createRadialGradient(x, y, 2, x, y, 34 * def.size); gr.addColorStop(0, def.glow + 'cc'); gr.addColorStop(1, def.glow + '00');
      ctx.globalAlpha = 0.55 + 0.25 * Math.sin(it.t * 0.15); ctx.fillStyle = gr; ctx.fillRect(x - 40 * def.size, y - 40 * def.size, 80 * def.size, 80 * def.size); ctx.globalAlpha = 1;
      ctx.imageSmoothingEnabled = false; ctx.drawImage(ic, Math.round(x - ic.width / 2), Math.round(y - ic.height / 2));
    }
  },
  setP(s) { this.p.state = s; this.p.t = 0; this.p.landT = 0; },
  startMove(id, k = 0) {
    const p = this.p, m0 = this.c.moves[id], lv = m0 && m0.charge && m0.charge.levels;
    if (lv && k > 0) { let pick = id; for (const L of lv) if (k >= L.at) pick = L.move; id = pick; }
    p.state = 'attack'; p.move = id; p.mt = 0; p.t = 0; p.hitIds = new Set(); p.chg = k;
  },
  checkHits(m) {
    const p = this.p;
    for (const e of this.enemies) {
      if (e.dead || p.hitIds.has(e.id) || e.state === 'enter' && e.offscreen) continue;
      const dx = (e.x - p.x) * p.face, hw = e.def.width / 2;
      if (dx < m.reach[0] - hw || dx > m.reach[1] + hw) continue;
      if (Math.abs(e.y - p.y) > m.depth + (e.def.boss ? 30 : 0)) continue;
      if (Math.abs(e.z - p.z) > 150) continue;
      p.hitIds.add(e.id); this.hitEnemy(e, m, p.face);
    }
  },
  hitEnemy(e, m, dir) {
    const def = e.def; e.hp -= m.dmg; e.flash = 6;
    this.combo++; this.comboT = 100; this.comboPop = 10; this.stats.hits++; this.stats.maxCombo = Math.max(this.stats.maxCombo, this.combo);
    const p = this.p; p.meter = Math.min(this.c.ultimate.meterMax, p.meter + m.meter);
    // finisher = big hit (>= 15 dmg) or the last strike of a combo chain (no follow-up)
    const fin = m.dmg >= 15 || (!m.multi && m.chain && !Object.keys(m.chain).length && m.dmg >= 9);
    this.hitstop = fin ? 12 : m.launch || m.dmg >= 12 ? 7 : 4; this.shake = Math.max(this.shake, (m.shake || 2) + (fin ? 4 : 0));
    AudioManager.sfx(m.sfx || 'light', { pitch: rnd(0.9, 1.12) });
    if (fin || m.dmg >= 11) AudioManager.sfx('thump', { pitch: rnd(0.88, 1.1), vol: fin ? 1 : 0.7 });
    const hy = e.y - e.z - this.eHeight(e) * 0.55, hx = e.x - dir * def.width * 0.15;
    this.spark(hx, hy, fin ? 2.4 : m.dmg >= 12 ? 1.6 : 1);
    if (fin) {
      this.fx.push({ type: 'burst', x: hx, y: hy, life: 9, max: 9 });
      this.slowmo = 14; this.zoom = 1.07; this.zoomX = e.x - this.camX; this.zoomY = hy;
    }
    this.texts.push({ x: e.x + rnd(-15, 15), y: hy - 30, s: String(m.dmg), life: fin ? 55 : 40, c: fin ? '#ff9a3c' : m.dmg >= 12 ? '#ffd36a' : '#fff', sz: fin ? 52 : m.dmg >= 12 ? 36 : 30 });
    e.hitPose = (e.hitPose || 0) ^ 1;
    const armored = def.armor && !(m.dmg >= 15 && Math.random() < 0.35) && e.hp > 0;
    if (!armored) {
      e.face = -dir; e.vx = dir * m.knock * (fin ? 1.6 : 1.3) / def.weight;            // slide back (dust in updateEnemy)
      if (m.launch && !def.boss) { e.vz = m.launch; e.z = Math.max(e.z, 1); e.state = 'air'; e.t = 0; }
      else if (e.state === 'air' || e.z > 0) { e.vz = Math.max(e.vz, 6.5); e.vx *= 0.6; e.state = 'air'; }   // juggle: every hit keeps them up
      else { e.state = 'hit'; e.t = 0; e.stun = m.hitstun; }
    } else { e.vx = dir * 1; }
    if (e.hp <= 0) { e.dead = true; if (e.state !== 'air') this.killEnemy(e); }
  },
  killEnemy(e) { e.dead = true; e.state = 'dying'; e.t = 0; this.stats.kills++; AudioManager.sfx('dust'); this.rollDrop(e); },
  eHeight(e) { const m = META[e.def.sheet]; return m.cell[1] * e.def.scale * 0.9; },
  spark(x, y, s) {
    const rays = Array.from({ length: 9 }, () => ({ a: rnd(0, Math.PI * 2), l: rnd(30, 70) * s }));
    this.fx.push({ type: 'spark', x, y, s, rays, life: 12, max: 12 });
    for (let i = 0; i < 8 * s; i++) this.fx.push({ type: 'dot', x, y, vx: rnd(-7, 7), vy: rnd(-8, 3), c: Math.random() < .5 ? '#ffd36a' : '#fff', life: 22, max: 22, sz: rnd(3, 6), update: f => { f.x += f.vx; f.y += f.vy; f.vy += 0.5; } });
  },
  tryUlt() {
    const p = this.p, u = this.c.ultimate;
    if (p.meter >= u.meterMax && (p.state === 'hit' || p.state === 'down')) { p.ultQ = true; return; }   // buffered: fires on recovery
    if (p.meter < u.meterMax || !['idle', 'walk', 'attack'].includes(p.state)) { this.meterShake = 15; return; }
    p.ultQ = false;
    p.meter = 0; this.setP('ultpose'); AudioManager.sfx('shine'); this.flash = 10; this.flashColor = '#ffd36a';
  },
  startUltVideo() {
    const apply = () => {
      show(null); this.state = 'play'; AudioManager.duck(1); this.setP('idle');
      this.flash = 30; this.flashColor = '#fff'; this.shake = 16; AudioManager.sfx('boom');
      const u = this.c.ultimate;
      for (const e of this.enemies) {
        if (e.dead || e.x < this.camX - 40 || e.x > this.camX + W + 40) continue;
        this.hitEnemy(e, { dmg: e.def.boss ? u.bossDamage : u.damage, knock: 14, launch: 14, hitstun: 50, meter: 0, sfx: 'heavy', shake: 16 }, e.x >= this.p.x ? 1 : -1);
      }
      this.p.meter = 0; this.hitstop = 0;
    };
    if (!this.c.ultimate || !this.c.ultimate.video) { apply(); return; }   // no clip yet: burst after the pose
    this.state = 'video'; AudioManager.duck(0.85);   // music stays almost full volume under the ultimate video
    playVideo(this.c.ultimate.video, apply);
  },
  hurtPlayer(dmg, dir, shake, knockdown) {
    const p = this.p; if (p.state === 'dash' && p.t <= this.c.dash.iframes) return;   // dash i-frames
    if (p.inv > 0 || p.state === 'ko' || p.state === 'ultpose' || this.state !== 'play') return;
    if (G.debug.god) dmg = 0;
    p.hp = Math.max(0, p.hp - dmg); this.stats.dmgTaken += dmg; p.inv = this.c.stats.invuln; p.vx = dir * 10; p.buf = [];
    if (dmg > 0) { this.texts.push({ x: p.x + rnd(-10, 10), y: p.y - 200, s: '-' + dmg, life: 45, c: '#ff4a4a', sz: 40 }); this.hpShake = 18; }
    this.shake = Math.max(this.shake, shake || 6); this.flash = 6; this.flashColor = '#ff3030'; AudioManager.sfx('hurt');
    this.spark(p.x, p.y - 110, 0.8);
    if (p.hp <= 0) { this.setP('ko'); p.vz = 6; p.z = 1; this.state = 'ko'; this.endT = 110; AudioManager.duck(0.3); }
    else if (knockdown && Math.random() < (knockdown === true ? 1 : knockdown) && this.c.anims.down) { this.setP('down'); p.vz = 5; p.z = 1; p.vx = dir * 7; const a = this.c.anims.down; p.inv = Math.max(p.inv, 40 + a.durs[1] + a.durs[2]); }
    else this.setP('hit');
  },
  // ---------------- enemies ----------------
  updateWaves() {
    const st = this.st, p = this.p;
    if (!this.wave && this.waveIdx < st.waves.length && p.x >= st.waves[this.waveIdx].triggerX && this.state === 'play') {
      const w = st.waves[this.waveIdx]; this.wave = w; this.lock = clamp(w.triggerX - 450, 0, st.length - W);
      this.pending = w.spawns.map(s => ({ ...s, at: this.t + s.delay })); this.goArrow = 0;
      this.banner = { text: w.label, sub: w.boss ? 'A giant Noisy approaches!' : '', t: 0, dur: w.boss ? 150 : 90, warn: !!w.boss };
      if (w.boss) AudioManager.sfx('alarm');
    }
    for (const s of this.pending) if (!s.done && this.t >= s.at) { s.done = true; this.spawn(s); }
    if (this.wave && this.pending.every(s => s.done) && this.enemies.length === 0) {
      const last = this.waveIdx === st.waves.length - 1;
      this.wave = null; this.lock = null; this.waveIdx++;
      if (last) { this.state = 'clear'; this.endT = 170; this.setP('victory'); this.banner = { text: 'MISSION CLEAR!', sub: '', t: 0, dur: 999 }; AudioManager.sfx('confirm'); }
      else this.goArrow = 1;
    }
  },
  spawn(s) {
    const def = D.enemies[s.type], st = this.st, L = this.lock ?? this.camX;
    const x = s.side === 'left' ? L - 80 : L + W + 80;
    const e = { id: ++uid, type: s.type, def, x, y: rnd(st.laneTop + 10, st.laneBottom - 10), z: 0, vx: 0, vz: 0, hp: def.hp, hpMax: def.hp, face: s.side === 'left' ? 1 : -1,
      state: 'enter', t: 0, cd: rnd(30, 80), flash: 0, stun: 0, seed: Math.random() * 100, offscreen: true };
    this.enemies.push(e);
    if (def.boss) this.boss = e;
  },
  updateEnemy(e) {
    const p = this.p, def = e.def, A = def.attack; e.t++; if (e.flash > 0) e.flash--;
    e.x += e.vx; e.vx *= 0.86; if (Math.abs(e.vx) < 0.05) e.vx = 0;
    if (e.state === 'dying') { if (e.t > 70) e.gone = true; this.dustFx(e); return; }
    if (e.state === 'air') {
      e.vz -= GRAV; e.z += e.vz;
      const Lb = this.lock ?? this.camX;                 // launched into the screen edge: bounce back with an impact
      if ((e.x < Lb + 40 && e.vx < -1.5) || (e.x > Lb + W - 40 && e.vx > 1.5)) {
        e.x = clamp(e.x, Lb + 40, Lb + W - 40); e.vx = -e.vx * 0.55; e.vz = Math.max(e.vz, 4); this.shake = Math.max(this.shake, 7);
        this.spark(e.x, e.y - e.z - this.eHeight(e) * 0.5, 1.1); AudioManager.sfx('thump', { pitch: rnd(1.1, 1.3), vol: 0.6 });
      }
      if (e.z <= 0) { e.z = 0; e.vz = 0; this.shake = Math.max(this.shake, 3); if (e.dead) this.killEnemy(e); else { e.state = 'down'; e.t = 0; } }
      return;
    }
    if (e.state === 'down') { if (e.t > 40) { e.state = 'walk'; e.t = 0; e.cd = rnd(40, 70); } return; }
    if (e.state === 'hit') {
      if (Math.abs(e.vx) > 1.5 && e.t % 3 === 0) this.fx.push({ type: 'puff', x: e.x - Math.sign(e.vx) * e.def.width * 0.3, y: e.y + rnd(-3, 3), vx: -e.vx * 0.15, vy: rnd(-0.8, 0), c: '#d8cbb4', sz: rnd(10, 18), life: 24, max: 24, update: f => { f.x += f.vx; f.y += f.vy; } });
      if (this.lock != null) e.x = clamp(e.x, this.lock + 40, this.lock + W - 40);
      if (e.t > e.stun) { e.state = 'walk'; e.t = 0; } return;
    }
    const L = this.lock ?? this.camX;
    // once in the arena, keep enemies inside the locked screen (prevents a knocked-back / spaced-out enemy softlocking the wave offscreen)
    if (this.lock != null && e.state !== 'enter') e.x = clamp(e.x, L + 40, L + W - 40);
    e.offscreen = e.x < L - 20 || e.x > L + W + 20;
    if (e.state === 'enter') { e.x += e.face * def.speed * 1.6; if (!e.offscreen && e.x > L + 60 && e.x < L + W - 60) { e.state = 'walk'; e.t = 0; } return; }
    const dx = p.x - e.x, dy = p.y - e.y;
    if (e.state === 'walk') {
      e.face = dx > 0 ? 1 : -1; e.cd--;
      const want = A.range * 0.75 + def.width * 0.3;
      const tx = p.x - e.face * want, sp = def.speed * (def.hops ? (0.6 + Math.abs(Math.sin(e.t * 0.12))) : 1);
      if (Math.abs(tx - e.x) > 6) e.x += Math.sign(tx - e.x) * sp;
      if (Math.abs(dy) > 4) e.y += Math.sign(dy) * sp * 0.6;
      // separation
      for (const o of this.enemies) if (o !== e && !o.dead) { const ox = e.x - o.x, oy = e.y - o.y; if (Math.abs(ox) < 50 && Math.abs(oy) < 20) { e.x += Math.sign(ox || 1) * 0.8; e.y += Math.sign(oy || 1) * 0.5; } }
      e.y = clamp(e.y, this.st.laneTop, this.st.laneBottom);
      const attackers = this.enemies.filter(o => o.state === 'windup' || o.state === 'lunge').length;
      if (e.cd <= 0 && Math.abs(dx) < A.range + def.width * 0.5 && Math.abs(dy) < 22 && attackers < 2 && p.state !== 'ko' && this.state === 'play') { e.state = 'windup'; e.t = 0; }
      return;
    }
    if (e.state === 'windup') { if (e.t > A.windup) { e.state = 'lunge'; e.t = 0; e.vx = e.face * A.lungeSpeed; if (def.boss) this.shake = Math.max(this.shake, A.shake || 6); } return; }
    if (e.state === 'lunge') {
      e.vx = e.face * A.lungeSpeed * (1 - e.t / A.lunge);
      if (def.hops) e.z = Math.sin(e.t / A.lunge * Math.PI) * 40;
      const reach = def.width * 0.5 + 34 + (def.boss ? 30 : 0);
      if (Math.abs(p.x - e.x) < reach && Math.abs(p.y - e.y) < 28 + (def.boss ? 20 : 0) && p.z < 40) this.hurtPlayer(A.dmg, e.face, A.shake, A.knockdown);
      if (e.t > A.lunge) { e.state = 'recover'; e.t = 0; e.z = 0; }
      return;
    }
    if (e.state === 'recover') { if (e.t > 30) { e.state = 'walk'; e.t = 0; e.cd = rnd(A.cooldown[0], A.cooldown[1]); } }
  },
  dustFx(e) {
    if (e.t < 12 || e.t > 60) return;
    const h = this.eHeight(e), k = (e.t - 12) / 48, y = e.y - h * (1 - k), w = e.def.width * e.def.scale * 1.1;
    for (let i = 0; i < 5; i++) this.fx.push({ type: 'dust', x: e.x + rnd(-w / 2, w / 2), y: y + rnd(-6, 6), vx: rnd(-1.2, 1.2) + e.vx * 0.2, vy: rnd(-1, 1), c: e.def.dust[Math.floor(Math.random() * e.def.dust.length)], sz: rnd(3, 8), life: 50, max: 50, floor: e.y + rnd(-6, 8),
      update: f => { f.x += f.vx; f.y += f.vy; f.vy += 0.3; if (f.y > f.floor) { f.y = f.floor; f.vy = 0; f.vx *= 0.8; } } });
  },
  updateCamera() {
    const p = this.p, st = this.st;
    const target = this.lock != null ? this.lock : clamp(p.x - 480, 0, st.length - W);
    this.camX += (target - this.camX) * 0.12; if (Math.abs(target - this.camX) < 0.5) this.camX = target;
  },
  // ---------------- overlays ----------------
  pause() { this.paused = true; AudioManager.pauseMusic(); this.pauseMenu(); },
  pauseMenu() {
    const row = (k, v) => `<div class="pm-row"><span class="pm-k">${k}</span><span class="pm-v">${v}</span></div>`;
    overlay(`<h2>Paused</h2><div class="pm-cols">
      <div class="pm-col"><h3>Controls</h3>${row('Arrows / WASD', 'Move')}${row('J', 'Light attack')}${row('K', 'Heavy attack')}${row('Space', 'Jump')}${row('Shift', 'Dash')}${row('L', 'Ultimate (meter full)')}${row('P / Esc', 'Pause')}</div>
      <div class="pm-col"><h3>Moves</h3>${(this.c.moveHelp || [['J J J', 'Punch, punch, Power Punch'],['J J K', 'Punch, punch, Dash Knee'],['K', 'Power Punch'],['Hold K', 'Charge, release: Dash Punch'],['Jump + J', 'Air Kick'],['Jump + K', 'Dive smash']]).map(([k, v]) => row(k, v)).join('')}${this.c.ultimate ? row('L', esc(this.c.ultimate.name)) : ''}</div>
    </div><div class="row"><button class="btn" data-ov="resume">Resume</button><button class="btn" data-ov="retry">Retry</button><button class="btn ghost" data-ov="options">Options</button><button class="btn ghost" data-ov="title">Quit to Title</button></div>`);
    $('scr-overlay').classList.add('pausemenu');
  },
  resume() { this.paused = false; overlay(null); AudioManager.resumeMusic(); Input.clear(); },
  showGameOver() {
    this.state = 'over'; AudioManager.stopMusic();
    overlay(`<h2>Game Over</h2><div class="stats">The Noisy overwhelmed ${this.c.name}...</div><div class="row"><button class="btn big" data-ov="retry">Retry</button><button class="btn ghost" data-ov="title">Title</button></div>`);
  },
  showClear() {
    this.state = 'done'; const s = this.stats, secs = s.frames / 60, R = resultScore(G.mission, s, secs);
    AudioManager.duck(0.4);
    // bests per mission (localStorage)
    const KEY = 'sots_best_v1', all = JSON.parse(localStorage.getItem(KEY) || '{}'), old = all[G.mission.id] || null;
    const nb = { time: !old || secs < old.time, kills: !old || s.kills > old.kills, combo: !old || s.maxCombo > old.combo, score: !old || R.score > old.score };
    all[G.mission.id] = { time: Math.min(secs, old ? old.time : 1e9), kills: Math.max(s.kills, old ? old.kills : 0), combo: Math.max(s.maxCombo, old ? old.combo : 0), score: Math.max(R.score, old ? old.score : 0) };
    try { localStorage.setItem(KEY, JSON.stringify(all)); } catch (e) {}
    const slot = ((D.roster && D.roster.slots) || []).find(r => r.id === this.c.id) || {}, art = slot.art || this.c.portraits.transformed;
    const best = (k, v) => nb[k] ? '<span class="rs-best">NEW BEST</span>' : old ? `<span class="rs-prev">Best ${v}</span>` : '';
    const row = (k, icon, label, id, bestTxt) => `<div class="rs-row" style="--d:${k * 0.18 + 0.35}s"><span class="rs-ic">${icon}</span><span class="rs-lab">${label}</span><span class="rs-val" id="${id}">0</span>${bestTxt}</div>`;
    const segs = RANKS.map(r => `<div class="rs-seg"><b>${r.r}</b></div>`).join('');
    overlay(`<div class="rs-title">Result</div><div class="rs-sub">${esc(G.mission.title)} &middot; Mission Clear!</div>
      <img class="rs-art" src="${art}" alt="">
      <div class="rs-stats">
        ${row(0, '&#9201;', 'Time', 'rs-time', best('time', fmtTime(old && old.time)))}
        ${row(1, '&#9673;', 'Noisy defeated', 'rs-kills', best('kills', old && pad3(old.kills)))}
        ${row(2, '&#10022;', 'Max Combo', 'rs-combo', best('combo', old && pad3(old.combo)))}
        <div class="rs-bar" style="--d:1s"><div class="rs-fill" id="rs-fill"></div>${segs}</div>
        <div class="rs-score" style="--d:1.15s"><span class="rs-lab">Score</span><span class="rs-val big" id="rs-score">000000</span>${best('score', old && pad6(old.score))}</div>
        <div class="rs-rankwrap"><div class="rs-badge" id="rs-badge"><span>${R.rank}</span></div><div class="rs-ranklab">Rank</div></div>
        ${R.next ? `<div class="rs-next" style="--d:1.3s">Next Rank <b>${R.next.r}</b> &nbsp; +${R.next.need.toLocaleString()} pts</div>` : '<div class="rs-next" style="--d:1.3s">Top rank!</div>'}
      </div>
      <div class="rs-btns"><button class="btn small ghost" data-ov="retry"><kbd>&#8592;</kbd> Retry</button><button class="btn small" data-ov="missions">Next <kbd>Enter</kbd></button></div>`);
    $('scr-overlay').classList.add('result');
    setFocus([...$('overlay-panel').querySelectorAll('.btn')], 1);
    // count up, then stamp the rank
    const t0 = performance.now(), D1 = 1300, ease = k => 1 - Math.pow(1 - Math.min(1, Math.max(0, k)), 3);
    const tick = now => {
      if (!$('rs-score')) return; const k = ease((now - t0 - 450) / D1);
      $('rs-time').textContent = fmtTime(secs * k); $('rs-kills').textContent = pad3(Math.round(s.kills * k)); $('rs-combo').textContent = pad3(Math.round(s.maxCombo * k));
      $('rs-score').textContent = pad6(Math.round(R.score * k)); $('rs-fill').style.width = (R.bar * 100 * k).toFixed(1) + '%';
      if (k < 1) { if (Math.floor(now / 70) % 2) AudioManager.sfx('select', { vol: 0.25, pitch: 0.9 + k * 0.5 }); requestAnimationFrame(tick); }
      else setTimeout(() => { const b = $('rs-badge'); if (!b) return; b.classList.add('on'); AudioManager.sfx('boom', { vol: 0.6 }); AudioManager.sfx('confirm'); }, 250);
    };
    requestAnimationFrame(tick);
    G.lastClear = { rank: R.rank, score: R.score, ...s };
  },
  // ---------------- draw ----------------
  draw() {
    const sx = this.shake ? rnd(-this.shake, this.shake) : 0, sy = this.shake ? rnd(-this.shake, this.shake) : 0;
    ctx.save(); ctx.translate(sx, sy);
    if (this.zoom > 1) { const zx = this.zoomX, zy = this.zoomY || H * 0.6; ctx.translate(zx, zy); ctx.scale(this.zoom, this.zoom); ctx.translate(-zx, -zy); }   // finisher punch-in
    this.drawBG();
    const cam = Math.round(this.camX);
    const list = [...this.enemies.map(e => ({ y: e.y, e })), { y: this.p.y + 0.1, p: this.p }].sort((a, b) => a.y - b.y);
    for (const o of list) { const x = (o.e || o.p).x - cam, y = (o.e || o.p).y; ctx.fillStyle = `rgba(0,0,0,${this.st.background.shadow ?? 0.35})`; ctx.beginPath(); const k = o.p ? Math.max(0.45, 1 - o.p.z / 320) : 1; ctx.ellipse(x, y, o.e ? o.e.def.width * 0.55 : 45 * k, o.e ? 10 + o.e.def.width * 0.05 : 11 * k, 0, 0, Math.PI * 2); ctx.fill(); }
    this.drawDecals(cam); this.drawItems(cam);
    for (const o of list) o.e ? this.drawEnemy(o.e, cam) : this.drawPlayer(cam);
    this.drawFx(cam);
    ctx.restore();
    if (this.state !== 'done') this.drawHUD();                 // result screen: clean backdrop
    if (this.flash) { ctx.globalAlpha = Math.min(0.8, this.flash / 12); ctx.fillStyle = this.flashColor; ctx.fillRect(0, 0, W, H); ctx.globalAlpha = 1; }
  },
  drawBG() {
    const bg = this.st.background, cam = this.camX;
    if (bg.layers) { for (const L of bg.layers) drawBGLayer(L, cam); return; }   // data-driven parallax layers, back to front
    const far = img(bg.far), near = img(bg.near);                               // legacy 2-layer stages
    const fw = far.naturalWidth ? far.width * (H / far.height) : W, fy = bg.farY ?? -60;
    const fo = -(cam * 0.2) % fw;
    for (let x = fo; x < W; x += fw) ctx.drawImage(far, x, fy, fw, H);
    if (near.naturalWidth) { const nw = near.width, o = -(cam % nw); for (let x = o; x < W; x += nw) ctx.drawImage(near, x, bg.nearY); }
  },
  drawPlayer(cam) {
    const p = this.p, c = this.c, A = c.anims, sp = c.sprites.transformed;
    let frame;
    if (p.state === 'walk') frame = strideFrame(A.walk, p.wd || 0, sp.scale);
    else if (p.state === 'jump') frame = p.vz > 1 ? A.jump.rise : A.jump.fall;
    else if (p.state === 'attack') { const m = c.moves[p.move]; frame = animFrame({ frames: m.frames, durs: m.durs, loop: false }, p.mt - 1); }
    else if ((p.state === 'down' || p.state === 'ko') && A[p.state]) { const a = A[p.state]; frame = p.z > 0 && a.air ? a.air : animFrame(a, p.t - (p.landT || 0)); }
    else if (A[p.state]) frame = animFrame(A[p.state], p.t);
    else frame = animFrame(A.idle, p.t);
    let x = p.x - cam; const y = p.y - p.z;
    if (p.state === 'charge') x += (p.chgK || 0) * 3 * (p.t % 4 < 2 ? -1 : 1);       // charge shake
    if (p.state === 'dash') {                          // speed lines streaming behind her
      ctx.save(); ctx.strokeStyle = 'rgba(255,255,255,0.7)'; ctx.lineCap = 'round';
      for (let i = 0; i < 6; i++) { const ly = y - 30 - i * 30 - (i * 13 % 11), l = 60 + (i * 47 % 70), off = (this.t * 9 + i * 37) % 50;
        ctx.lineWidth = i % 2 ? 2 : 3.5; ctx.beginPath(); ctx.moveTo(x - p.face * (50 + off), ly); ctx.lineTo(x - p.face * (50 + off + l), ly); ctx.stroke(); }
      ctx.restore();
    }
    if (p.trail.length) {                              // dash afterimages
      const ghost = tinted(sp.sheet, '#6ad8ff');
      for (const g of p.trail) { ctx.globalAlpha = g.life / 14 * 0.55; drawFrame(sp.sheet, g.frame, g.x - cam, g.y - g.z, sp.scale, g.face < 0, ghost); }
      ctx.globalAlpha = 1;
    }
    if (p.inv > 0 && p.state !== 'ko' && p.state !== 'down' && Math.floor(p.t / 3) % 2) ctx.globalAlpha = 0.45;
    if (p.state === 'ultpose') { drawRays(x, y - 110, 0.6, this.t); }
    const rim = this.st.background.rim; if (rim) ctx.filter = `drop-shadow(0 0 1.5px ${rim})`;   // dark rim so white armour reads on bright stages
    const mv = p.state === 'attack' && c.moves[p.move], rot = mv && mv.rot ? mv.rot[moveIdx(mv, p.mt - 1)] || 0 : 0;
    if (rot && mv.dive && p.z > 0) {                   // plunge: speed streaks above her
      ctx.save(); ctx.filter = 'none'; ctx.strokeStyle = 'rgba(255,240,200,0.75)'; ctx.lineCap = 'round';
      for (let i = 0; i < 7; i++) { const sx = x + (i - 3) * 16 + Math.sin(this.t * 1.7 + i) * 4, l = 90 + (i * 37 % 70); ctx.lineWidth = i % 2 ? 3 : 5; ctx.beginPath(); ctx.moveTo(sx, y - 230 - l); ctx.lineTo(sx, y - 120); ctx.stroke(); }
      ctx.restore();
    }
    if (p.state === 'land' && p.landPose) frame = p.landPose;
    if (p.state === 'charge' && p.chgK > 0) {            // charge glow at the gauntlet
      const gx = x + p.face * 52, gy = y - 118, r = 18 + 34 * p.chgK + Math.sin(this.t * 0.6) * 4;
      ctx.save(); ctx.globalCompositeOperation = 'lighter'; const g = ctx.createRadialGradient(gx, gy, 2, gx, gy, r);
      g.addColorStop(0, 'rgba(255,255,230,0.95)'); g.addColorStop(0.4, `rgba(255,190,80,${0.5 + 0.4 * p.chgK})`); g.addColorStop(1, 'rgba(255,120,30,0)');
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(gx, gy, r, 0, 7); ctx.fill(); ctx.restore();
    }
    if (rot) {                                         // rotate the frame about the body centre (fist points down)
      const py = y - 130 * sp.scale; ctx.save(); ctx.translate(x, py); ctx.rotate(rot * p.face); ctx.translate(-x, -py);
      drawFrame(sp.sheet, frame, x, y, sp.scale, p.face < 0); ctx.restore();
    } else drawFrame(sp.sheet, frame, x, y, sp.scale, p.face < 0);
    ctx.filter = 'none';
    ctx.globalAlpha = 1;
  },
  drawEnemy(e, cam) {
    const def = e.def, flip = def.facesRight ? e.face < 0 : e.face > 0;
    let x = e.x - cam, y = e.y - e.z, sy = 1, rot = 0, fr = def.frame;
    const wa = def.anims && def.anims.walk;
    if (wa && (e.state === 'walk' || e.state === 'enter') && (e.still || 0) < 10) fr = strideFrame(wa, e.wd || 0, def.scale);
    if (e.state === 'walk' || e.state === 'enter') { if (def.hops) { y -= Math.abs(Math.sin(e.t * 0.12)) * 16; sy = 1 + Math.sin(e.t * 0.24) * 0.06; } else if (!wa) { rot = Math.sin(e.t * 0.15 + e.seed) * 0.05; } }
    if (e.state === 'windup') { x += Math.sin(e.t * 1.7) * 3; sy = 1 - 0.06 * Math.min(1, e.t / def.attack.windup); }
    if (e.state === 'hit') {                           // two stagger poses (alternating per hit): lean back / crumple
      const k = Math.max(0.35, 1 - e.t / 18); x += Math.sin(e.t * 2) * 3 * k;
      if (e.hitPose) { rot = -e.face * 0.2 * k; sy = 1 - 0.05 * k; } else { rot = e.face * 0.1 * k; sy = 1 - 0.14 * k; }
    }
    if (e.state === 'air') rot = -e.face * Math.min(1.2, e.t * 0.08);
    if (e.state === 'down') { rot = -e.face * 1.4; }
    ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.translate(-x, -y);
    if (e.state === 'dying') {
      const k = e.t, h = this.eHeight(e) / 0.9 + 10;
      const cut = k < 12 ? 0 : Math.min(1, (k - 12) / 48);
      ctx.beginPath(); ctx.rect(x - 400, y - h + h * cut, 800, h * (1 - cut) + 4); ctx.clip();
      drawFrame(def.sheet, fr, x, y, def.scale, flip);
      const dark = tinted(def.sheet, '#2a2622'); ctx.globalAlpha = Math.min(1, k / 10); if (dark) drawFrame(def.sheet, fr, x, y, def.scale, flip, dark);
      ctx.restore(); ctx.globalAlpha = 1; return;
    }
    const rim = this.st.background.rim; if (rim) ctx.filter = `drop-shadow(0 0 1.5px ${rim})`;
    drawFrame(def.sheet, fr, x, y, def.scale, flip, null, sy);
    ctx.filter = 'none';
    if (e.state === 'windup') { const r = tinted(def.sheet, '#ff2a2a'); ctx.globalAlpha = 0.25 + 0.3 * Math.abs(Math.sin(e.t * 0.35)); r && drawFrame(def.sheet, fr, x, y, def.scale, flip, r, sy); ctx.globalAlpha = 1; }
    if (e.flash) { const w = tinted(def.sheet, '#ffffff'); ctx.globalAlpha = e.flash / 6 * 0.85; w && drawFrame(def.sheet, fr, x, y, def.scale, flip, w, sy); ctx.globalAlpha = 1; }
    ctx.restore();
    if (!def.boss && e.hp < e.hpMax && !e.dead) { const bw = 60; ctx.fillStyle = '#000a'; ctx.fillRect(x - bw / 2, y - this.eHeight(e) - 18, bw, 6); ctx.fillStyle = '#7dff6a'; ctx.fillRect(x - bw / 2, y - this.eHeight(e) - 18, bw * Math.max(0, e.hp / e.hpMax), 6); }
  },
  drawFx(cam) {
    for (const f of this.fx) {
      const a = f.life / f.max, x = f.x - cam;
      if (f.type === 'spark') {
        ctx.save(); ctx.translate(x, f.y); ctx.strokeStyle = `rgba(255,240,180,${a})`; ctx.lineWidth = 5 * a * f.s; ctx.lineCap = 'round';
        const g = 1 - a; for (const r of f.rays) { ctx.beginPath(); ctx.moveTo(Math.cos(r.a) * r.l * g * 0.4, Math.sin(r.a) * r.l * g * 0.4); ctx.lineTo(Math.cos(r.a) * r.l * (0.3 + g), Math.sin(r.a) * r.l * (0.3 + g)); ctx.stroke(); }
        ctx.fillStyle = `rgba(255,255,255,${a})`; ctx.beginPath(); ctx.arc(0, 0, 22 * f.s * a, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = `rgba(255,170,60,${a})`; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(0, 0, 50 * f.s * g + 8, 0, Math.PI * 2); ctx.stroke(); ctx.restore();
      } else if (f.type === 'ring') {
        const e = 1 - a * a; ctx.strokeStyle = `rgba(${f.c || '255,220,140'},${a})`; ctx.lineWidth = (f.w || 8) * a + 2; ctx.beginPath(); ctx.ellipse(x, f.y, f.r * (0.2 + e), f.r * (0.2 + e) * 0.24, 0, 0, Math.PI * 2); ctx.stroke();
      } else if (f.type === 'puff') {
        ctx.globalAlpha = a * 0.6; ctx.fillStyle = f.c; ctx.beginPath(); ctx.ellipse(x, f.y, f.sz * (1.6 - a), f.sz * (1.6 - a) * 0.6, 0, 0, Math.PI * 2); ctx.fill(); ctx.globalAlpha = 1;
      } else if (f.type === 'burst') {
        const r = 60 + (1 - a) * 120, gr = ctx.createRadialGradient(x, f.y, 0, x, f.y, r); gr.addColorStop(0, `rgba(255,255,255,${a})`); gr.addColorStop(0.35, `rgba(255,230,150,${a * 0.8})`); gr.addColorStop(1, 'rgba(255,180,60,0)');
        ctx.fillStyle = gr; ctx.beginPath(); ctx.ellipse(x, f.y, r * 1.4, r * 0.7, 0, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = `rgba(255,255,255,${a})`; ctx.lineWidth = 4 * a; for (let i = 0; i < 10; i++) { const an = Math.PI + (i / 9) * Math.PI, l = 90 + (1 - a) * 160; ctx.beginPath(); ctx.moveTo(x + Math.cos(an) * 30, f.y + Math.sin(an) * 20); ctx.lineTo(x + Math.cos(an) * l, f.y + Math.sin(an) * l * 0.8); ctx.stroke(); }
      } else { ctx.globalAlpha = Math.min(1, a * 1.5); ctx.fillStyle = f.c; ctx.fillRect(x - f.sz / 2, f.y - f.sz / 2, f.sz, f.sz); ctx.globalAlpha = 1; }
    }
    ctx.textAlign = 'center';
    for (const t of this.texts) { ctx.globalAlpha = Math.min(1, t.life / 15); ctx.font = `700 ${t.sz || 30}px Pixelify`; ctx.lineWidth = t.sz > 40 ? 7 : 5; ctx.strokeStyle = '#000'; ctx.strokeText(t.s, t.x - cam, t.y); ctx.fillStyle = t.c; ctx.fillText(t.s, t.x - cam, t.y); }
    ctx.globalAlpha = 1;
  },
  drawHUD() {
    const p = this.p, c = this.c, u = c.ultimate;
    // portrait badge
    const por = img(c.portraits.transformed);
    ctx.save(); ctx.beginPath(); ctx.arc(70, 66, 46, 0, Math.PI * 2); ctx.fillStyle = '#1a1020'; ctx.fill(); ctx.clip();
    if (por.naturalWidth) ctx.drawImage(por, por.width * 0.27, 20, por.width * 0.46, por.width * 0.46, 24, 20, 92, 92);
    ctx.restore(); ctx.lineWidth = 4; ctx.strokeStyle = c.color; ctx.beginPath(); ctx.arc(70, 66, 46, 0, Math.PI * 2); ctx.stroke();
    ctx.textAlign = 'left'; ctx.font = '700 26px Pixelify'; this.txt(c.name.toUpperCase(), 128, 38, '#fff');
    const hs = this.hpShake > 0 ? (this.hpShake--, rnd(-1, 1) * this.hpShake * 0.4) : 0;   // health bar shakes when hurt
    bar(128 + hs, 48, 340, 20, p.hp / p.hpMax, this.hpShake > 10 && this.hpShake % 4 < 2 ? '#ffffff' : '#ff5a3c', '#ffb04a');
    ctx.font = '18px Pixelify'; this.txt(`${Math.ceil(p.hp)} / ${p.hpMax}`, 134, 64, '#fff');
    const mx = this.meterShake > 0 ? (this.meterShake--, rnd(-3, 3)) : 0, full = p.meter >= u.meterMax;
    bar(128 + mx, 78, 280, 14, p.meter / u.meterMax, full ? `hsl(${(this.t * 6) % 360},100%,60%)` : '#ffd36a', '#fff3b0');
    ctx.font = '700 18px Pixelify'; this.txt(full ? 'ULTIMATE READY  [L]' : 'SONG METER', 128, 112, full ? '#ffe08a' : '#ffd36acc');
    // song
    ctx.textAlign = 'center'; ctx.font = '20px Pixelify';
    const cov = G.song.cover && img(G.song.cover), covOk = cov && cov.complete && cov.naturalWidth;
    if (this.songT > 0 && covOk) {      // song card for the first 4 s: cover + name, slides down from the top
      const k = Math.min(1, (240 - this.songT) / 14, this.songT / 14), y = -120 + 150 * (1 - Math.pow(1 - Math.max(0, k), 3));
      ctx.save(); ctx.globalAlpha = Math.max(0, k);
      ctx.fillStyle = '#0a0716d8'; ctx.strokeStyle = '#ffe08a'; ctx.lineWidth = 2; ctx.beginPath(); ctx.roundRect(470, y - 6, 400, 112, 10); ctx.fill(); ctx.stroke();
      ctx.drawImage(cov, 480, y + 4, 92, 92); ctx.strokeStyle = '#fff6'; ctx.strokeRect(480, y + 4, 92, 92);
      ctx.textAlign = 'left'; ctx.font = '18px Pixelify'; ctx.fillStyle = '#ffe08acc'; ctx.fillText('\u266A NOW SINGING', 588, y + 28);
      ctx.font = '700 30px Pixelify'; ctx.lineWidth = 5; ctx.strokeStyle = '#000'; ctx.strokeText(G.song.title, 588, y + 64); ctx.fillStyle = '#fff'; ctx.fillText(G.song.title, 588, y + 64);
      ctx.font = '16px Pixelify'; ctx.fillStyle = '#fffa'; ctx.fillText(G.song.artist || '', 588, y + 88);
      ctx.restore(); ctx.textAlign = 'center'; ctx.font = '20px Pixelify';
    } else {
      if (covOk) ctx.drawImage(cov, 640 - ctx.measureText(`\u266A Now singing: ${G.song.title}`).width / 2 - 34, 10, 26, 26);
      this.txt(`\u266A Now singing: ${G.song.title}`, 640, 30, this.songT > 0 ? '#ffe08a' : '#ffffffaa');
    }
    // wave / go
    ctx.textAlign = 'right'; ctx.font = '700 24px Pixelify';
    const alive = this.enemies.filter(e => !e.dead).length + this.pending.filter(s => !s.done).length;
    if (this.wave) this.txt(`${this.wave.boss ? 'BOSS' : this.wave.label}  -  Noisy: ${alive}`, 1260, 38, '#fff');
    else this.txt(`Stage ${Math.min(this.waveIdx + 1, this.st.waves.length)} / ${this.st.waves.length}`, 1260, 38, '#fffa');
    if (this.goArrow && !this.wave && this.state === 'play' && Math.floor(this.t / 20) % 2) { ctx.font = '700 64px Pixelify'; this.txt('GO \u25B6', 1240, 220, '#ffd36a', 8); }
    // combo
    if (this.combo >= 2) {
      const s = 1 + this.comboPop * 0.04; ctx.save(); ctx.translate(1180, 300); ctx.scale(s, s); ctx.textAlign = 'right';
      ctx.font = '700 72px Pixelify'; this.txt(String(this.combo), 0, 0, '#ffd36a', 8); ctx.font = '700 28px Pixelify'; this.txt('HIT COMBO!', 0, 34, '#fff', 6); ctx.restore();
    }
    // boss bar
    const b = this.boss; if (b && !b.gone && this.wave && this.wave.boss) { ctx.textAlign = 'left'; ctx.font = '700 22px Pixelify'; this.txt(b.def.name.toUpperCase(), 290, 622, '#ff9a6a'); bar(290, 630, 700, 18, Math.max(0, b.hp) / b.hpMax, '#c22', '#ff6a3c'); }
    // controls + move list live on the pause screen now (v8); just a small hint here
    ctx.textAlign = 'right'; ctx.font = '16px Pixelify'; this.txt('P / Esc: Pause & Moves', W - 14, H - 12, '#ffffff88', 0);
    // banner
    if (this.banner) {
      const bn = this.banner, a = Math.min(1, bn.t / 10, (bn.dur - bn.t) / 15 + (bn.dur > 900 ? 1 : 0));
      ctx.globalAlpha = Math.max(0, a); ctx.fillStyle = bn.warn ? 'rgba(160,0,0,.55)' : 'rgba(0,0,0,.45)'; ctx.fillRect(0, 280, W, 120);
      ctx.font = '700 70px Pixelify'; ctx.textAlign = 'center'; this.txt(bn.text, 640 + (1 - Math.min(1, bn.t / 10)) * 300, 352, bn.warn && Math.floor(bn.t / 10) % 2 ? '#ff5a5a' : '#fff', 8);
      if (bn.sub) { ctx.font = '26px Pixelify'; this.txt(bn.sub, 640, 388, '#ffe9c2', 4); }
      ctx.globalAlpha = 1;
    }
    function bar(x, y, w, h, k, c1, c2) {
      ctx.fillStyle = '#000b'; ctx.fillRect(x - 3, y - 3, w + 6, h + 6);
      const g = ctx.createLinearGradient(x, y, x, y + h); g.addColorStop(0, c2); g.addColorStop(1, c1);
      ctx.fillStyle = g; ctx.fillRect(x, y, w * clamp(k, 0, 1), h);
    }
  },
  txt(s, x, y, col, lw = 5) { if (lw) { ctx.lineWidth = lw; ctx.strokeStyle = '#000c'; ctx.strokeText(s, x, y); } ctx.fillStyle = col; ctx.fillText(s, x, y); }
};

// ============================================================
// scene switching, overlay buttons, keyboard routing, loop
// ============================================================
function go(scene) { if (G.scene && G.scene.exit) G.scene.exit(); overlay(null); G.scene = scene; G.log.push(Object.keys(SCENES).find(k => SCENES[k] === scene)); scene.enter(); }
const SCENES = { Intro, Title, Missions, CharSelect, Songs, VN, Transform, Fight };
window.SOTS.SCENES = SCENES; window.SOTS.go = go;

$('scr-overlay').addEventListener('click', e => {
  const b = e.target.closest('[data-ov]'); if (!b) return; const a = b.dataset.ov; AudioManager.sfx('select');
  if (a === 'close') overlay(null);
  if (a === 'resume') Fight.resume();
  if (a === 'retry') { AudioManager.duck(1); go(Fight); }
  if (a === 'title') go(Title);
  if (a === 'missions') go(Missions);
  if (a === 'options') overlay(optionsHTML(G.scene === Fight ? 'pause' : 'close'));
  if (a === 'pause') Fight.pauseMenu();
});

Input.onPress(a => {
  if (overlayOn()) {
    const btns = [...$('overlay-panel').querySelectorAll('.btn')];
    if (a === 'pause' && G.scene === Fight && Fight.paused) { Input.consume('pause'); Fight.resume(); return; }
    if (a === 'pause' || a === 'back') { const back = btns.find(b => ['close', 'pause'].includes(b.dataset.ov)); back && back.click(); return; }
    if (focus.items.length !== btns.length || focus.items.some((b, i) => b !== btns[i])) setFocus(btns, $('scr-overlay').classList.contains('result') ? 1 : 0);
    if (a === 'left' || a === 'up') moveFocus(-1); if (a === 'right' || a === 'down') moveFocus(1);
    if (a === 'confirm' && btns[focus.i]) btns[focus.i].click();
    return;
  }
  const s = G.scene;
  if (s === Intro) { Intro.act(); return; }
  if (s === Title) {
    if (!G.started) { if (a === 'confirm') Title.unlock(); return; }
    if (a === 'up') moveFocus(-1); if (a === 'down') moveFocus(1);
    if (a === 'confirm') focus.items[focus.i].click();
  } else if (s === Missions) {
    if (a === 'up') moveFocus(-1); if (a === 'down') moveFocus(1);
    if (a === 'confirm') Missions.pick(); if (a === 'pause' || a === 'back') go(Title);
  } else if (s === Songs) {
    if (a === 'up') { moveFocus(-1); Songs.preview(focus.i); } if (a === 'down') { moveFocus(1); Songs.preview(focus.i); }
    if (a === 'confirm' || a === 'light') Songs.confirm(); if (a === 'pause' || a === 'back' || a === 'heavy') go(CharSelect);
  } else if (s === CharSelect) {
    if (['left', 'right', 'up', 'down'].includes(a)) CharSelect.move(a);
    if (a === 'confirm' || a === 'light') CharSelect.confirm(); if (a === 'pause' || a === 'back' || a === 'heavy') go(Missions);
  } else if (s === VN) {
    if (a === 'confirm') VN.next(); if (a === 'pause') VN.end();
  }
  if (curScreen === 'scr-video' && (a === 'confirm' || a === 'pause')) playVideo.skip && playVideo.skip();
});

// fixed-step loop (60 updates / s)
let last = performance.now(), acc = 0;
function frame(now) {
  acc += Math.min(100, now - last); last = now;
  const s = G.scene;
  while (acc >= 1000 / 60) { if (s && s.update) s.update(); acc -= 1000 / 60; }
  if (s && s.canvasScene && curScreen !== 'scr-video') s.draw(); else if (!s || !s.canvasScene) { ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H); }
  requestAnimationFrame(frame);
}

// debug / test hooks
window.SOTS.debug = {
  fillMeter() { if (G.scene === Fight) Fight.p.meter = G.char.ultimate.meterMax; },
  startAt(sceneName, charId, mi = 0) {
    G.started = G.unlocked = true; AudioManager.unlock();
    G.mission = D.missions[mi] || D.missions[0];
    if (charId && D.characters[charId]) G.char = D.characters[charId];
    else G.char = G.char || D.characters[G.mission.character];
    G.song = (G.char.songs && G.char.songs[0]) || G.song;
    const key = Object.keys(SCENES).find(k => k.toLowerCase() === String(sceneName || '').toLowerCase());
    go(SCENES[key] || CharSelect);
  },
  startFight(mi = 0) { this.startAt('Fight', (G.char && G.char.id), mi); },
  startTransform(charId = 'tsubasa') { this.startAt('Transform', charId); },
  drop(type = 'small', dx = 120) { if (G.scene === Fight) Fight.dropItem(type, Fight.p.x + dx, Fight.p.y); },
  killAll() { if (G.scene === Fight) Fight.enemies.forEach(e => { e.hp = 0; Fight.killEnemy(e); }); },
  hurt(n) { if (G.scene === Fight) { Fight.p.inv = 0; const god = G.debug.god; G.debug.god = false; Fight.hurtPlayer(n, -1); G.debug.god = god; } },
  state() { const f = Fight; return { scene: G.log[G.log.length - 1], fight: G.scene === Fight ? { state: f.state, hp: f.p.hp, meter: f.p.meter, x: Math.round(f.p.x), wave: f.waveIdx, enemies: f.enemies.length, combo: f.combo, maxCombo: f.stats.maxCombo, hits: f.stats.hits, pstate: f.p.state, lock: f.lock, z: Math.round(f.p.z), hpMax: f.p.hpMax, items: f.items.length, trail: f.p.trail.length, pickups: f.stats.pickups || 0, move: f.p.move } : null, screen: curScreen, overlay: overlayOn() }; }
};

preloadAll().then(() => {
  document.fonts && document.fonts.load('20px Pixelify');
  requestAnimationFrame(frame);
  const bootChar = params.get('char'), bootScene = params.get('scene');
  if (bootChar && D.characters[bootChar] && bootScene) {
    SOTS.debug.startAt(bootScene, bootChar);
  } else {
    go(Intro);
  }
});
})();
