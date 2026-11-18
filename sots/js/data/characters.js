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
      walk:    { sprite: 'transformed', frames: ['run0', 'run1', 'run2', 'run3', 'run4', 'run5', 'run6', 'run7'], stride: 300, loop: true },
      hit:     { sprite: 'transformed', frames: ['hurt0', 'hurt1'], durs: [8, 14], loop: false },
      down:    { sprite: 'transformed', frames: ['down0', 'down1', 'down2'], durs: [0, 34, 20], air: 'down0', loop: false },  // knockdown: down0 while airborne
      ko:      { sprite: 'transformed', frames: ['down0', 'down1'], air: 'down0', durs: [0, 999], loop: false },
      ultpose: { sprite: 'transformed', frames: ['ult0', 'ult1', 'ult2'], durs: [8, 9, 99], loop: false },
      victory: { sprite: 'transformed', frames: ['win0', 'win1', 'win2'], durs: [14, 16, 999], loop: false },
      pose:    { sprite: 'transformed', frames: ['idle0', 'idle1', 'idle2', 'idle3'], durs: [16, 12, 16, 12], loop: true },
      civilian: { sprite: 'uniform', frames: ['idle0','idle1','idle2','idle3','idle4','idle5','idle6','idle7','idle8'], fps: 4.5 }
    },
    stats: { hp: 120, speed: 4.8, depthSpeed: 3.2, invuln: 45 },   // px per tick (60/s); was 3.6 / 2.4
    // Combo moves. Each move plays its own frames: durs = ticks per frame, hit = indexes of the
    // strike frames (hitbox is live ONLY on those). startup/active/recovery are derived from that.
    // reach = [min,max] px in front, depth = lane tolerance, chain = next move by button
    // (accepted once the strike frames are over, buffered).
    moves: {
      light1: { frames: ['jab0', 'jab1', 'jab2'],          durs: [3, 4, 9],      hit: [1],    dmg: 6,  reach: [0, 95],  depth: 34, knock: 2.5, hitstun: 18, meter: 5, step: 2, chain: { light: 'light2', heavy: 'heavy1' }, sfx: 'light' },
      light2: { frames: ['cross0', 'cross1', 'cross2'],    durs: [3, 4, 10],     hit: [1],    dmg: 7,  reach: [0, 105], depth: 34, knock: 3,   hitstun: 18, meter: 5, step: 3, chain: { light: 'light3', heavy: 'heavy1' }, sfx: 'light' },
      light3: { frames: ['kick0', 'kick1', 'kick2'],       durs: [5, 5, 16],     hit: [1],    dmg: 11, reach: [0, 115], depth: 38, knock: 9,   hitstun: 26, meter: 8, step: 6, chain: { heavy: 'heavy1' }, sfx: 'heavy' },
      heavy1: { frames: ['heavy0', 'heavy1', 'heavy2', 'heavy3'], durs: [7, 6, 8, 10], hit: [1], dmg: 15, reach: [0, 125], depth: 40, knock: 12,  hitstun: 30, meter: 10, step: 4, chain: { heavy: 'heavy2' }, sfx: 'heavy', shake: 5 },
      heavy2: { frames: ['up0', 'up1', 'up2', 'up3'],      durs: [6, 3, 3, 24],  hit: [1, 2], dmg: 16, reach: [0, 100], depth: 40, knock: 3,   hitstun: 40, meter: 12, step: 2, launch: 13, chain: {}, sfx: 'launch', shake: 7 }
    },
    starters: { light: 'light1', heavy: 'heavy1' },
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
  columns: 3,                 // grid columns; more slots than fit just scroll
  slots: [
    'hibiki',
    { locked: true, name: 'Coming Soon' },
    { locked: true, name: 'Coming Soon' },
    { locked: true, name: 'Coming Soon' },
    { locked: true, name: 'Coming Soon' },
    { locked: true, name: 'Coming Soon' }
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
