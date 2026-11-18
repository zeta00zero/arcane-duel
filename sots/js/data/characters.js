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
    portraits: {                       // VN / menu art
      uniform: 'assets/img/hibiki_uniform.png',
      transformed: 'assets/img/hibiki_transformed.png'
    },
    sprites: {                         // sheet keys from js/data/sprite_meta.js (built by tools/build_art.py)
      transformed: { sheet: 'hibiki_sheet', scale: 0.82 },
      uniform: { sheet: 'hibiki_uniform_px', scale: 0.82 }
    },
    // animations: frame names inside the sheet, fps
    anims: {
      idle:   { sprite: 'transformed', frames: ['idle'], fps: 1, breathe: true },
      walk:   { sprite: 'transformed', frames: ['walk1', 'idle', 'walk2', 'idle'], fps: 9 },
      hit:    { sprite: 'transformed', frames: ['hit'], fps: 1 },
      ko:     { sprite: 'transformed', frames: ['ko'], fps: 1 },
      ult:    { sprite: 'transformed', frames: ['ult'], fps: 1 },
      pose:   { sprite: 'transformed', frames: ['pose'], fps: 1, breathe: true },
      civilian: { sprite: 'uniform', frames: ['idle0','idle1','idle2','idle3','idle4','idle5','idle6','idle7','idle8'], fps: 4.5 }
    },
    stats: { hp: 120, speed: 3.6, depthSpeed: 2.4, invuln: 45 },
    // Combo moves. startup/active/recovery are in frames (60 fps).
    // reach = [min,max] px in front, depth = lane tolerance, chain = next move by button.
    // cancelFrom = frame from which the next chained input is accepted (buffered).
    moves: {
      light1: { frame: 'light1', startup: 3, active: 4, recovery: 9,  dmg: 6,  reach: [0, 95],  depth: 34, knock: 2.5, hitstun: 18, meter: 5, step: 2, chain: { light: 'light2', heavy: 'heavy1' }, sfx: 'light' },
      light2: { frame: 'light2', startup: 3, active: 4, recovery: 10, dmg: 7,  reach: [0, 105], depth: 34, knock: 3,   hitstun: 18, meter: 5, step: 3, chain: { light: 'light3', heavy: 'heavy1' }, sfx: 'light' },
      light3: { frame: 'light3', startup: 5, active: 5, recovery: 16, dmg: 11, reach: [0, 115], depth: 38, knock: 9,   hitstun: 26, meter: 8, step: 6, chain: { heavy: 'heavy1' }, sfx: 'heavy' },
      heavy1: { frame: 'heavy1', startup: 7, active: 6, recovery: 18, dmg: 15, reach: [0, 125], depth: 40, knock: 12,  hitstun: 30, meter: 10, step: 4, chain: { heavy: 'heavy2' }, sfx: 'heavy', shake: 5 },
      heavy2: { frame: 'heavy2', startup: 6, active: 6, recovery: 24, dmg: 16, reach: [0, 100], depth: 40, knock: 3,   hitstun: 40, meter: 12, step: 2, launch: 13, chain: {}, sfx: 'launch', shake: 7 }
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
//  ENEMY DATA (Noisy)
// ============================================================
SOTS_DATA.enemies = {
  noisy: {
    name: 'Noisy', sheet: 'noisy_humanoid', frame: 'idle', facesRight: false, scale: 0.95,
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
    name: 'Giant Noisy', sheet: 'noisy_boss', frame: 'idle', facesRight: false, scale: 0.88,
    hp: 420, speed: 1.1, width: 150, weight: 4, armor: true, boss: true,
    attack: { range: 150, windup: 46, lunge: 18, lungeSpeed: 6, dmg: 16, cooldown: [80, 130], shake: 10 },
    dust: ['#2b2b2b', '#444', '#5a5550', '#1a1a1a', '#77706a']
  }
};
