// ============================================================
//  CHARACTER DATA  - add a new hero by adding an entry here.
//  Every path is relative to index.html. Replace placeholder
//  files with the real ones (same filename) or change paths.
// ============================================================
window.SOTS_DATA = window.SOTS_DATA || {};
SOTS_DATA.characters = {
  hibiki: {
    id: 'hibiki',
    name: 'Hibiki',
    color: '#ff8a2a',
    // character select: card art, blurb, and the animation shown in the big preview
    select: { card: 'assets/img/hibiki_transformed.png', title: 'Gungnir', blurb: 'A brawler who fights with her fists and her song.', previewAnim: 'idle', previewScale: 1.35 },
    portraits: {                       // VN / menu art
      uniform: 'assets/img/hibiki_uniform.png',
      transformed: 'assets/img/hibiki_transformed.png'
    },
    sprites: {                         // sheet keys from js/data/sprite_meta.js (built by tools/build_anims.py / build_art.py)
      transformed: { sheet: 'hibiki_anim', scale: 0.82 },
      uniform: { sheet: 'hibiki_uniform_px', scale: 0.82 }
    },
    // Animations: frame names inside the sprite's sheet.
    //   durs  = ticks (1/60 s) per frame (or fps for an even rate). loop:false holds the last frame.
    //   stride = sheet px travelled per full cycle -> walk speed is tied to actual movement (no foot sliding).
    anims: {
      idle:    { sprite: 'transformed', frames: ['idle0', 'idle1', 'idle2', 'idle3'], durs: [16, 12, 16, 12], loop: true },
      // run cycle: 8 frames = 2 steps (run0-3 left leg lands / right leg pushes off and swings, run4-7 swapped). ~38 sheet px of ground per frame.
      // sprint: contact, down (mid-stance), push-off, flight x2 per step; dists = planted-foot travel per frame (sheet px)
      walk:    { sprite: 'transformed', frames: ['sprint0', 'sprint1', 'sprint2', 'sprint3', 'sprint4', 'sprint5', 'sprint6', 'sprint7', 'sprint8', 'sprint9'],
                 stride: 360, dists: [55, 45, 30, 25, 25, 55, 45, 30, 25, 25], loop: true },
      jump:    { sprite: 'transformed', rise: 'sprint3', fall: 'sprint4' },                   // airborne: rise / fall frames
      land:    { sprite: 'transformed', frames: ['up0'], durs: [7], loop: false },              // landing crouch
      dash:    { sprite: 'transformed', frames: ['sprint0'], durs: [99], loop: false },        // + afterimage trail
      hit:     { sprite: 'transformed', frames: ['hurt0', 'hurt1'], durs: [8, 14], loop: false },
      down:    { sprite: 'transformed', frames: ['down0', 'down1', 'down2'], durs: [0, 34, 20], air: 'down0', loop: false },  // knockdown: down0 while airborne
      ko:      { sprite: 'transformed', frames: ['down0', 'down1'], air: 'down0', durs: [0, 999], loop: false },
      ultpose: { sprite: 'transformed', frames: ['ult0', 'ult1', 'ult2'], durs: [8, 9, 99], loop: false },
      victory: { sprite: 'transformed', frames: ['win0', 'win1', 'win2'], durs: [14, 16, 999], loop: false },
      pose:    { sprite: 'transformed', frames: ['idle0', 'idle1', 'idle2', 'idle3'], durs: [16, 12, 16, 12], loop: true },
      civilian: { sprite: 'uniform', frames: ['idle0','idle1','idle2','idle3','idle4','idle5','idle6','idle7','idle8'], fps: 4.5 }
    },
    stats: { hp: 120, speed: 5.4, depthSpeed: 3.4, invuln: 45 },   // px per tick (60/s); was 3.6 / 2.4
    // Combo moves. Each move plays its own frames: durs = ticks per frame, hit = indexes of the
    // strike frames (hitbox is live ONLY on those). startup/active/recovery are derived from that.
    // reach = [min,max] px in front, depth = lane tolerance, chain = next move by button
    // (accepted once the strike frames are over, buffered).
    moves: {
      light1: { frames: ['jab0', 'jab1', 'jab2'],          durs: [3, 4, 9],      hit: [1],    dmg: 6,  reach: [0, 95],  depth: 34, knock: 2.5, hitstun: 18, meter: 5, step: 2, chain: { light: 'light2', heavy: 'rising' }, sfx: 'light' },
      light2: { frames: ['cross0', 'cross1', 'cross2'],    durs: [3, 4, 10],     hit: [1],    dmg: 7,  reach: [0, 105], depth: 34, knock: 3,   hitstun: 18, meter: 5, step: 3, chain: { light: 'light3', heavy: 'heavy1' }, sfx: 'light' },
      light3: { frames: ['kick0', 'kick1', 'kick2'],       durs: [5, 5, 16],     hit: [1],    dmg: 11, reach: [0, 115], depth: 38, knock: 9,   hitstun: 26, meter: 8, step: 6, chain: { heavy: 'rush' }, sfx: 'heavy' },
      heavy1: { frames: ['heavy0', 'heavy1', 'heavy2', 'heavy3'], durs: [7, 6, 8, 10], hit: [1], dmg: 15, reach: [0, 125], depth: 40, knock: 12,  hitstun: 30, meter: 10, step: 4, chain: { heavy: 'heavy2' }, sfx: 'heavy', shake: 5 },
      heavy2: { frames: ['up0', 'up1', 'up2', 'up3'],      durs: [6, 3, 3, 24],  hit: [1, 2], dmg: 16, reach: [0, 100], depth: 40, knock: 3,   hitstun: 40, meter: 12, step: 2, launch: 13, chain: {}, sfx: 'launch', shake: 7 },
      // --- v4 combos (reuse the attack frames with new timing). multi: true = every strike frame can hit again.
      // J-J-J-K  RUSH FINISHER: flurry of jabs/crosses ending in a kick
      rush:    { frames: ['jab1', 'cross1', 'jab1', 'cross1', 'kick0', 'kick1', 'kick2'], durs: [4, 4, 4, 4, 4, 6, 18], hit: [0, 1, 2, 3, 5], multi: true,
                 dmg: 5, reach: [0, 115], depth: 38, knock: 1.5, hitstun: 22, meter: 4, step: 10, chain: {}, sfx: 'light', shake: 3, finisher: { dmg: 16, knock: 15, sfx: 'heavy', shake: 9 } },
      // J-K-K  RISING FOLLOW-UP: knee lifts the Noisy, second K hops up after it
      rising:  { frames: ['kick0', 'kick1', 'kick2'],       durs: [4, 5, 12],     hit: [1],    dmg: 9,  reach: [0, 110], depth: 36, knock: 2,   hitstun: 30, meter: 7, step: 4, launch: 9, chain: { heavy: 'rising2' }, sfx: 'heavy', shake: 4 },
      rising2: { frames: ['up0', 'up1', 'up2', 'up3'],      durs: [4, 4, 4, 20],  hit: [1, 2], multi: true, dmg: 9, reach: [0, 110], depth: 40, knock: 3, hitstun: 40, meter: 8, step: 6, launch: 14, hop: 10, chain: {}, sfx: 'launch', shake: 6 },
      // dash + J / dash + K
      dashStrike: { frames: ['cross0', 'cross1', 'cross2'], durs: [2, 6, 12],     hit: [1],    dmg: 10, reach: [0, 120], depth: 36, knock: 8,   hitstun: 24, meter: 7, step: 28, chain: { light: 'light2' }, sfx: 'light', shake: 3 },
      shoulder:   { frames: ['heavy0', 'heavy1', 'heavy3'], durs: [4, 10, 14],    hit: [1],    dmg: 13, reach: [-10, 120], depth: 40, knock: 17, hitstun: 32, meter: 9, step: 46, chain: {}, sfx: 'heavy', shake: 7 },
      // air moves (Space then J / K). air: true = lasts until landing; slam = shockwave when it lands
      jumpKick: { frames: ['kick0', 'kick1'],               durs: [4, 999],       hit: [1],    dmg: 9,  reach: [0, 115], depth: 40, knock: 7,   hitstun: 24, meter: 6, air: true, chain: {}, sfx: 'heavy', shake: 3 },
      // dive: wind-up (fist raised) -> plunge (heavy1 punch pose rotated fist-down, rot = radians per frame) -> GROUND SMASH
      dive:     { frames: ['up2', 'heavy1'],                durs: [7, 999],       hit: [1],    dmg: 12, reach: [-30, 90], depth: 44, knock: 4, hitstun: 28, meter: 8, air: true, dive: 26,
                  rot: [0, 1.45], landPose: 'down2', landTicks: 16,
                  slam: { dmg: 14, radius: 190, depth: 80, knock: 12, launch: 11, hitstun: 36, meter: 8, sfx: 'boom', shake: 22, hitstop: 9, crack: 70 }, chain: {}, sfx: 'heavy', shake: 5 }
    },
    starters: { light: 'light1', heavy: 'heavy1' },
    dashMoves: { light: 'dashStrike', heavy: 'shoulder' },      // J / K during (or right after) a dash
    airMoves: { light: 'jumpKick', heavy: 'dive' },             // J / K while airborne
    dash: { ticks: 22, speed: 15, cooldown: 26, iframes: 19 },  // Shift: ~0.37 s burst (~1.7x v4 distance), i-frames for the first 19 ticks, ~0.45 s cooldown
    jump: { vz: 13.5, air: 0.9 },                               // Space: launch speed, air control (x speed factor)
    transform: {
      phraseText: 'Balwisyall Nescell gungnir tron',     // shown on screen while the phrase mp3 plays
      phraseAudio: 'assets/audio/hibiki_transform_phrase.mp3',
      video: 'assets/video/hibiki_transform.mp4'
    },
    ultimate: {
      name: 'Ultimate Song Burst',
      video: 'assets/video/hibiki_ultimate.mp4',
      damage: 90, bossDamage: 140, meterMax: 140
    },
    // Songs: previewStart / previewLength in seconds (preview on the song select screen)
    songs: [
      { id: 'song1', title: 'Song 1', artist: 'Hibiki', file: 'assets/audio/hibiki_song1.mp3', previewStart: 12, previewLength: 15 },
      { id: 'song2', title: 'Song 2 (placeholder)', artist: 'Hibiki', file: 'assets/audio/hibiki_song2.mp3', previewStart: 12, previewLength: 15 },
      { id: 'song3', title: 'Song 3 (placeholder)', artist: 'Hibiki', file: 'assets/audio/hibiki_song3.mp3', previewStart: 12, previewLength: 15 }
    ]
  }
};

// ============================================================
//  CHARACTER SELECT ROSTER - order of the grid. A string = a playable
//  character id from SOTS_DATA.characters; an object = a locked slot.
//  To add a hero: add her entry above (sprites, anims, moves, songs,
//  transform/ultimate videos) and put her id here.
// ============================================================
SOTS_DATA.roster = {
  title: 'Select your Symphogear',
  star: { cx: 640, cy: 392, len: 292, inner: 168 },   // petal star geometry (screen px): centre, tip length, side-corner radius
  // Slots go clockwise round the star starting at the top. id = key in SOTS_DATA.characters -> playable;
  // anything else is shown dimmed as 'Coming Soon'. art = big left-side art, face = diamond portrait
  // (petal portrait; built by tools/build_chars.py into assets/img/chars/), preview = picture in the info panel. Add more slots and the ring spreads them out.
  slots: [
    { id: 'hibiki',  name: 'Hibiki Tachibana',        jp: '立花 響',     color: '#ff9a2a', art: 'assets/img/chars/hibiki.webp',  face: 'assets/img/chars/hibiki_petal.webp', preview: 'assets/img/chars/hibiki_preview.jpg',
      blurb: 'A cheerful high-school girl who wields the Gungnir Symphogear.' },
    { id: 'tsubasa', name: 'Tsubasa Kazanari',        jp: '風鳴 翼',     color: '#4a8dff', art: 'assets/img/chars/tsubasa.webp', face: 'assets/img/chars/tsubasa_petal.webp',
      blurb: 'A top idol singer and veteran wielder of the Ame-no-Habakiri Symphogear.' },
    { id: 'chris',   name: 'Chris Yukine',            jp: '雪音 クリス', color: '#ff3b4a', art: 'assets/img/chars/chris.webp',   face: 'assets/img/chars/chris_petal.webp',
      blurb: 'A tough, sharp-tongued girl who wields the Ichii-Bal Symphogear.' },
    { id: 'kanade',  name: 'Kanade Amou',             jp: '天羽 奏',     color: '#ff6a2a', art: 'assets/img/chars/kanade.webp',  face: 'assets/img/chars/kanade_petal.webp',
      blurb: "Tsubasa's partner in the duo Zwei Wing and the original wielder of Gungnir." },
    { id: 'miku',    name: 'Miku Kohinata',           jp: '小日向 未来', color: '#a07aff', art: 'assets/img/chars/miku.webp',    face: 'assets/img/chars/miku_petal.webp',
      blurb: "Hibiki's best friend and classmate at Lydian Academy." },
    { id: 'maria',   name: 'Maria Cadenzavna Eve',    jp: 'マリア・カデンツァヴナ・イヴ', color: '#ff7ab8', art: 'assets/img/chars/maria.webp', face: 'assets/img/chars/maria_petal.webp',
      blurb: 'A world-famous singer and the eldest of the F.I.S. Symphogear wielders.' },
    { id: 'shirabe', name: 'Shirabe Tsukuyomi',       jp: '月読 調',     color: '#ff4aa0', art: 'assets/img/chars/shirabe.webp', face: 'assets/img/chars/shirabe_petal.webp',
      blurb: 'A quiet F.I.S. girl who wields the Shul Shagana Symphogear.' },
    { id: 'kirika',  name: 'Kirika Akatsuki',         jp: '暁 切歌',     color: '#7ae05a', art: 'assets/img/chars/kirika.webp',  face: 'assets/img/chars/kirika_petal.webp',
      blurb: "An energetic F.I.S. girl who wields the Igalima Symphogear; Shirabe's best friend." }
  ]
};

// ============================================================
//  ENEMY DATA (Noisy)
// ============================================================
SOTS_DATA.enemies = {
  // anims.walk: frames played while walking, advanced by distance moved (stride = sheet px per cycle).
  // 'frame' is the still used for windup / lunge / hit / dying.
  noisy: {
    name: 'Noisy', sheet: 'noisy_anim', frame: 'idle',
    anims: { walk: { frames: ['walk0', 'walk1', 'walk2', 'walk3'], stride: 150 } },   facesRight: false, scale: 0.95,
    hp: 34, speed: 1.5, width: 60, weight: 1,
    attack: { range: 80, windup: 34, lunge: 14, lungeSpeed: 7, dmg: 9, cooldown: [70, 130] },
    dust: ['#2b2b2b', '#444', '#5a5550', '#1a1a1a', '#77706a']
  },
  blob: {
    name: 'Blob Noisy', sheet: 'noisy_blob', frame: 'idle', facesRight: false, scale: 0.85,
    hp: 22, speed: 1.9, width: 70, weight: 0.8, hops: true,
    attack: { range: 90, windup: 26, lunge: 16, lungeSpeed: 8, dmg: 7, cooldown: [60, 110] },
    dust: ['#232a33', '#3a3f48', '#555', '#1a1a1a']
  },
  boss: {
    name: 'Giant Noisy', sheet: 'boss_anim', frame: 'idle',
    anims: { walk: { frames: ['walk0', 'walk1', 'walk2', 'walk3'], stride: 230 } }, facesRight: false, scale: 0.88,
    hp: 420, speed: 1.1, width: 150, weight: 4, armor: true, boss: true,
    attack: { range: 150, windup: 46, lunge: 18, lungeSpeed: 6, dmg: 16, cooldown: [80, 130], shake: 10, knockdown: 0.5 },   // knockdown = chance a hit floors Hibiki
    dust: ['#2b2b2b', '#444', '#5a5550', '#1a1a1a', '#77706a']
  }
};
