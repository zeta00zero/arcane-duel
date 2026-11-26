// ============================================================
//  CHARACTER DATA  - add a new hero by adding an entry here.
//  Every path is relative to index.html. Replace placeholder
//  files with the real ones (same filename) or change paths.
// ============================================================
window.SOTS_DATA = window.SOTS_DATA || {};
// Menu / title music (Vitalization). Reusable later as a gameplay song: add it to a character's songs list.
SOTS_DATA.music = { title: 'assets/audio/vitalization.mp3' };
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
      // v8: 4 frames per step (sprint4/9 were near-duplicates of 3/8 with the same foot still planted -> skating hitch).
      // dists = body travel (sheet px) while each frame shows, measured from the planted foot: contact->mid 60, mid->push 46,
      // push-off 30, flight 76 (sprint3/8 sit 8 px off the ground). 212 px per step = the art's real stride, so no foot sliding.
      walk:    { sprite: 'transformed', frames: ['sprint0', 'sprint1', 'sprint2', 'sprint3', 'sprint5', 'sprint6', 'sprint7', 'sprint8'],
                 stride: 424, dists: [60, 46, 30, 76, 60, 46, 30, 76], loop: true },
      jump:    { sprite: 'transformed', rise: 'sprint3', fall: 'sprint4' },                   // airborne: rise / fall frames
      land:    { sprite: 'transformed', frames: ['up0'], durs: [7], loop: false },              // landing crouch
      dash:    { sprite: 'transformed', frames: ['dash0'], durs: [99], loop: false },          // v8: forward-leaning lunge (sprint3 leaned 13 deg) + afterimages + speed lines
      charge:  { sprite: 'transformed', frames: ['charge0', 'charge1', 'charge2', 'charge3'], durs: [8, 8, 8, 8], loop: true },  // v10: staged 4-frame wind-up loop
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
      // v8 simplified ground combat.  A: J-J-J = right punch, left punch, POWER right punch.  B: J-J-K = right, left, DASH KNEE.
      // K alone = power right punch; hold K to charge (glow + shake), release = dash punch that travels further / hits harder.
      // stepT = ticks the forward step is spread over (default: startup).  trail = afterimages while it moves.
      light1: { frames: ['jab0', 'jab1', 'jab2'],          durs: [3, 4, 8],      hit: [1],    dmg: 6,  reach: [0, 95],  depth: 34, knock: 2.5, hitstun: 18, meter: 5, step: 2, chain: { light: 'light2' }, sfx: 'light' },
      light2: { frames: ['cross0', 'cross1', 'cross2'],    durs: [3, 4, 9],      hit: [1],    dmg: 7,  reach: [0, 105], depth: 34, knock: 3,   hitstun: 18, meter: 5, step: 3, chain: { light: 'power', heavy: 'knee' }, sfx: 'light' },
      power:  { frames: ['jab0', 'heavy1', 'heavy1', 'heavy3'], durs: [6, 4, 6, 14], hit: [1], dmg: 16, reach: [0, 125], depth: 40, knock: 18, hitstun: 32, meter: 10, step: 10, chain: {}, sfx: 'heavy', shake: 9 },
      knee:   { frames: ['kick0', 'knee0', 'knee0', 'kick2'], durs: [4, 5, 5, 14], hit: [1, 2], dmg: 15, reach: [-10, 115], depth: 40, knock: 14, hitstun: 30, meter: 10, step: 64, stepT: 12, trail: true, launch: 5, chain: {}, sfx: 'heavy', shake: 8 },
      // K: tap = power punch (charge k = 0), held up to charge.cap ticks: step / dmg / knock grow linearly with k (0..1)
      heavyPunch: { frames: ['charge0', 'dpunch0', 'dpunch0', 'heavy3'], durs: [3, 5, 7, 15], hit: [1, 2], dmg: 15, reach: [-10, 125], depth: 42, knock: 13, hitstun: 30, meter: 10,
                    step: 14, stepT: 15, chain: {}, sfx: 'heavy', shake: 7,
                    // hold K: staged L1 punch / L2 upper / L3 drill (frames were built in v8, never wired until v10)
                    charge: { cap: 60, min: 8, levels: [
                      { at: 0.34, move: 'charge_l1' },
                      { at: 0.67, move: 'charge_l2' },
                      { at: 1.00, move: 'charge_l3' }
                    ] } },
      // L1: rise -> punch tween -> charged punch (feet planted, small step)
      charge_l1: { frames: ['rise0', 'tw_punch0', 'cpunch1', 'cpunch1', 'rise0'], durs: [4, 3, 5, 8, 12], hit: [2, 3], dmg: 22, reach: [-20, 140], depth: 46, knock: 18, hitstun: 34, meter: 12, step: 18, stepT: 12, chain: {}, sfx: 'heavy', shake: 10, fx: 'impact' },
      // L2: uppercut launch (hop is the jump of the upper, not slash jitter)
      charge_l2: { frames: ['rise0', 'tw_upper0', 'upper2', 'upper2', 'tw_upper1', 'upper3', 'rise0'], durs: [4, 3, 5, 8, 5, 6, 10], hit: [2, 3], dmg: 20, reach: [-10, 130], depth: 48, knock: 12, launch: 14, hop: 14, hitstun: 36, meter: 12, step: 8, stepT: 10, multi: true, chain: {}, sfx: 'launch', shake: 10, fx: 'uppercut' },
      // L3: coil -> drill dash -> multi-hit drill -> skid / settle
      charge_l3: { frames: ['coil0', 'coil1', 'coil2', 'drill0', 'drill1', 'drill2', 'drill3', 'drill4', 'drill5', 'drillhit0', 'drillhit1', 'drillhit2', 'tw_brake0', 'skid0', 'skid1', 'skid2', 'tw_settle0', 'settle0'],
                   durs: [5, 5, 6, 3, 3, 3, 3, 3, 3, 4, 5, 6, 5, 5, 5, 6, 6, 10], hit: [6, 7, 8, 9, 10, 11], dmg: 8, reach: [-30, 170], depth: 48, knock: 10, hitstun: 28, meter: 4, step: 190, stepT: 34, trail: true, multi: true, fx: 'drill', chain: {}, sfx: 'heavy', shake: 8,
                   finisher: { dmg: 18, knock: 16, shake: 12, hitstun: 36, meter: 10 } },
      // air moves (Space then J / K). air: true = lasts until landing; slam = shockwave when it lands
      jumpKick: { frames: ['kick0', 'kick1'],               durs: [4, 999],       hit: [1],    dmg: 9,  reach: [0, 115], depth: 40, knock: 7,   hitstun: 24, meter: 6, air: true, chain: {}, sfx: 'heavy', shake: 3 },
      // dive: wind-up (fist raised) -> plunge (heavy1 punch pose rotated fist-down, rot = radians per frame) -> GROUND SMASH
      dive:     { frames: ['up2', 'heavy1'],                durs: [7, 999],       hit: [1],    dmg: 12, reach: [-30, 90], depth: 44, knock: 4, hitstun: 28, meter: 8, air: true, dive: 26,
                  rot: [0, 1.45], landPose: 'down2', landTicks: 16,
                  slam: { dmg: 14, radius: 190, depth: 80, knock: 12, launch: 11, hitstun: 36, meter: 8, sfx: 'boom', shake: 22, hitstop: 9, crack: 70 }, chain: {}, sfx: 'heavy', shake: 5 }
    },
    starters: { light: 'light1', heavy: 'heavyPunch' },       // heavy starts in the 'charge' state (hold K), see game.js
    dashMoves: {},                                               // v8: no dash+J / dash+K strikes
    airMoves: { light: 'jumpKick', heavy: 'dive' },             // J / K while airborne
    // staged v8 charge aura / fist glow (drawn behind + in front of her while holding K)
    chargeAura: { x: 46, y: -89, rgb: [255, 190, 80] },
    chargeFx: { sheet: 'fx_charge_v8', levels: [
      { at: 0.34, row: 'L1' },
      { at: 0.67, row: 'L2' },
      { at: 1.00, row: 'L3' }
    ] },
    // short opt-in intros; same keys as Tsubasa, Hibiki frames only
    transitions: {
      'idle>walk': { frames: ['sprint0'], durs: [3] },
      'walk>idle': { frames: ['sprint3', 'idle0'], durs: [3, 3] },
      'idle>dash': { frames: ['sprint3'], durs: [3] },
      'walk>dash': { frames: ['sprint3'], durs: [3] },
      'dash>idle': { frames: ['dash0', 'sprint3'], durs: [3, 3] },
      'dash>walk': { frames: ['dash0'], durs: [3] },
      'dash>attack': { frames: ['dash0'], durs: [3] },
      'attack>idle': { frames: ['__last__'], durs: [5] },
      'attack>attack': { frames: ['__last__'], durs: [2] },
      'charge>attack': { frames: ['charge0'], durs: [3] },
      'land>idle': { frames: ['up0'], durs: [4] }
    },
    dash: { ticks: 22, speed: 15, cooldown: 26, iframes: 19, easeIn: 3 },  // Shift: ~0.37 s burst (~1.7x v4 distance), i-frames for the first 19 ticks, ~0.45 s cooldown
    jump: { vz: 13.5, air: 0.9 },                               // Space: launch speed, air control (x speed factor)
    transform: {
      phraseText: 'Balwisyall Nescell gungnir tron',     // shown on screen while the phrase mp3 plays
      phraseAudio: 'assets/audio/hibiki_transform_phrase.mp3',
      video: 'assets/video/hibiki_transform.mp4'
    },
    ultimate: {
      name: "Hibiki Style: Spear's Violent Destruction", jp: '我流・撃槍烈破',
      video: 'assets/video/hibiki_ultimate.mp4',
      damage: 90, bossDamage: 140, meterMax: 140
    },
    // Songs: previewStart / previewLength in seconds (preview on the song select screen)
    songs: [
      { id: 'song1', title: 'Gekisō Gungnir', cover: 'assets/img/covers/gekiso_gungnir.webp', artist: 'Hibiki', file: 'assets/audio/hibiki_song1.mp3', previewStart: 12, previewLength: 15 },
      { id: 'song2', title: 'Song 2 (placeholder)', artist: 'Hibiki', file: 'assets/audio/hibiki_song2.mp3', previewStart: 12, previewLength: 15 },
      { id: 'song3', title: 'Song 3 (placeholder)', artist: 'Hibiki', file: 'assets/audio/hibiki_song3.mp3', previewStart: 12, previewLength: 15 }
    ]
  },
  // Tsubasa (v2 sprites). Playable locally so her combos / charges can be judged. No deploy.
  tsubasa: {
    id: 'tsubasa',
    name: 'Tsubasa',
    color: '#4a8dff',
    chargeAura: { x: -38, y: -168, rgb: [140, 210, 255], ring: '140,210,255' },
    hudCrop: { x: 0.25, y: 16, size: 0.38 },   // face window in dagger select portrait (Hibiki default is 0.27, 20, 0.46)
    select: { card: 'assets/img/tsubasa_select.png', title: 'Ame-no-Habakiri', blurb: 'A swordswoman who fights with her blade and her song.', previewAnim: 'idle', previewScale: 1.35 },
    portraits: {
      uniform: 'assets/img/tsubasa_uniform.png',
      transformed: 'assets/img/tsubasa_select.png',   // song select, HUD, shared select-card art
      reveal: 'assets/img/tsubasa_transformed.png'    // post-transform reveal only (greatsword)
    },
    sprites: {
      transformed: { sheet: 'tsubasa_anim', scale: 0.82 },
      uniform: { sheet: 'tsubasa_uniform_px', scale: 0.82 }
    },
    anims: {
      idle:    { sprite: 'transformed', frames: ['idle0', 'idle1', 'idle2', 'idle3'], durs: [16, 12, 16, 12], loop: true },
      walk:    { sprite: 'transformed', frames: ['run0', 'run1', 'run2', 'run3', 'run4', 'run5', 'run6', 'run7'],
                 stride: 424, dists: [60, 46, 30, 76, 60, 46, 30, 76], loop: true },
      jump:    { sprite: 'transformed', rise: 'run3', fall: 'run4' },
      land:    { sprite: 'transformed', frames: ['up0', 'idle0'], durs: [8, 5], loop: false, landTicks: 13 },
      dash:    { sprite: 'transformed', frames: ['dash0'], durs: [99], loop: false },
      charge:  { sprite: 'transformed', frames: ['charge0', 'charge1', 'charge2', 'charge3'], durs: [7, 7, 7, 7], loop: true },
      hit:     { sprite: 'transformed', frames: ['hurt0', 'hurt1'], durs: [8, 14], loop: false },
      down:    { sprite: 'transformed', frames: ['down0', 'down1', 'down2'], durs: [0, 34, 20], air: 'down0', loop: false },
      ko:      { sprite: 'transformed', frames: ['down0', 'down1'], air: 'down0', durs: [0, 999], loop: false },
      ultpose: { sprite: 'transformed', frames: ['ult0', 'ult1', 'ult2'], durs: [8, 9, 99], loop: false },
      victory: { sprite: 'transformed', frames: ['win0', 'win1', 'win2'], durs: [14, 16, 999], loop: false },
      pose:    { sprite: 'transformed', frames: ['idle0', 'idle1', 'idle2', 'idle3'], durs: [16, 12, 16, 12], loop: true },
      civilian: { sprite: 'uniform', frames: ['idle0','idle1','idle2','idle3','idle4','idle5','idle6','idle7','idle8'], fps: 4.5 }
    },
    stats: { hp: 120, speed: 5.4, depthSpeed: 3.4, invuln: 45 },
    moves: {
      light1: { frames: ['light1_wu', 'light1_mid', 'light1_hit', 'light1_rec'], durs: [3, 3, 4, 8], hit: [2], dmg: 6,  reach: [0, 110], depth: 34, knock: 2.5, hitstun: 18, meter: 5, step: 2, chain: { light: 'light2' }, sfx: 'light' },
      light2: { frames: ['light2_wu', 'light2_mid', 'light2_hit', 'light2_rec'], durs: [3, 3, 4, 9], hit: [2], dmg: 7,  reach: [0, 120], depth: 34, knock: 3,   hitstun: 18, meter: 5, step: 3, chain: { light: 'c1_upper', heavy: 'c1_upper' }, sfx: 'light' },
      // Combo 1 (L L H H): after two lights, upper then spin
      c1_upper: { frames: ['upper_wu', 'upper_mid', 'upper_hit', 'upper_rec'], durs: [5, 4, 5, 12], hit: [2], dmg: 16, reach: [0, 130], depth: 40, knock: 16, hitstun: 32, meter: 10, step: 6, launch: 6, chain: { heavy: 'c1_spin' }, sfx: 'heavy', shake: 9 },
      c1_spin:  { frames: ['spin_a', 'spin_mid', 'spin_b', 'spin_rec'], durs: [4, 4, 5, 12], hit: [0, 1, 2], dmg: 18, reach: [-20, 140], depth: 44, knock: 16, hitstun: 32, meter: 10, step: 12, trail: true, multi: true, chain: {}, sfx: 'heavy', shake: 10 },
      // Combo 2 (H H H): tap K starts here; hold K uses charge.levels (L1 / L2 / L3)
      c2_upper: { frames: ['upper_wu', 'upper_mid', 'upper_hit', 'upper_rec'], durs: [5, 4, 5, 12], hit: [2], dmg: 16, reach: [0, 130], depth: 40, knock: 16, hitstun: 32, meter: 10, step: 6, launch: 6, chain: { heavy: 'c2_down' }, sfx: 'heavy', shake: 9,
                  charge: { cap: 60, min: 8, levels: [
                    { at: 0.34, move: 'charge_l1' },
                    { at: 0.67, move: 'charge_l2' },
                    { at: 1.00, move: 'charge_l3' }
                  ] } },
      c2_down:  { frames: ['down_wu', 'down_in', 'down_mid', 'down_fin', 'light1_rec'], durs: [5, 3, 4, 5, 10], hit: [2, 3], dmg: 18, reach: [0, 140], depth: 42, knock: 14, hitstun: 30, meter: 10, step: 8, multi: true, chain: { heavy: 'c2_curve' }, sfx: 'heavy', shake: 9 },
      c2_curve: { frames: ['curve_wu', 'curve_mid', 'curve_hit', 'light1_rec'], durs: [5, 4, 6, 12], hit: [2], dmg: 20, reach: [-10, 150], depth: 44, knock: 18, hitstun: 34, meter: 12, step: 10, chain: {}, sfx: 'heavy', shake: 10 },
      charge_l1: { frames: ['l1_wu', 'l1_mid', 'l1_hit', 'l1_fol'], durs: [5, 4, 8, 14], hit: [2], dmg: 22, reach: [-20, 170], depth: 46, knock: 18, hitstun: 34, meter: 12, step: 16, stepT: 12, chain: {}, sfx: 'heavy', shake: 10 },
      charge_l2: { frames: ['l2_launch', 'l2_launch', 'l2_launch', 'light1_rec'], durs: [5, 6, 8, 12], hit: [0, 1, 2], dmg: 20, reach: [-10, 140], depth: 48, knock: 12, launch: 14, hop: 16, hitstun: 36, meter: 12, step: 8, multi: true, chain: {}, sfx: 'launch', shake: 10 },
      charge_l3: { frames: ['l3_in', 'l3_in_b', 'l3_back', 'light1_rec'], durs: [6, 8, 8, 12], hit: [0, 1], dmg: 24, reach: [-30, 160], depth: 48, knock: 16, hitstun: 36, meter: 14, step: 140, stepT: 14, trail: true, multi: true, fx: 'fire', chain: {}, sfx: 'heavy', shake: 12 },
      jumpKick: { frames: ['light2_hit', 'spin_a'],               durs: [4, 999], hit: [1], dmg: 9,  reach: [0, 120], depth: 40, knock: 7, hitstun: 24, meter: 6, air: true, chain: {}, sfx: 'heavy', shake: 3 },
      dive:     { frames: ['upper_wu', 'down_mid'],               durs: [7, 999], hit: [1], dmg: 12, reach: [-30, 100], depth: 44, knock: 4, hitstun: 28, meter: 8, air: true, dive: 26,
                  rot: [0, 0], landPose: 'charge0', landTicks: 16,
                  slam: { dmg: 14, radius: 190, depth: 80, knock: 12, launch: 11, hitstun: 36, meter: 8, sfx: 'boom', shake: 22, hitstop: 9, crack: 70 }, chain: {}, sfx: 'heavy', shake: 5 }
    },
    starters: { light: 'light1', heavy: 'c2_upper' },
    dashMoves: {},
    airMoves: { light: 'jumpKick', heavy: 'dive' },
    dash: { ticks: 22, speed: 15, cooldown: 26, iframes: 19, easeIn: 3 },
    jump: { vz: 13.5, air: 0.9 },
    // Optional move-to-move intros (Hibiki omits this and keeps the old snaps).
    // frames: '__last__' = the pose that was on screen when the switch happened.
    transitions: {
      'idle>walk': { frames: ['run0'], durs: [3] },
      'walk>idle': { frames: ['run3', 'idle0'], durs: [3, 3] },
      'walk>dash': { frames: ['dash_in'], durs: [3] },
      'idle>dash': { frames: ['dash_in'], durs: [3] },
      'dash>idle': { frames: ['dash_in', 'run3'], durs: [3, 4] },
      'dash>walk': { frames: ['dash_in'], durs: [3] },
      'dash>attack': { frames: ['dash_in'], durs: [3] },
      'attack>idle': { frames: ['__last__'], durs: [5] },
      'attack>attack': { frames: ['__last__'], durs: [2] },
      'charge>attack': { frames: ['charge0'], durs: [2] },
      'land>idle': { frames: ['idle0'], durs: [4] }
    },
    transform: {
      phraseText: 'Imyuteus Ame-no-Habakiri tron',
      phraseAudio: 'assets/audio/tsubasa_transform_phrase.mp3',
      video: 'assets/video/tsubasa_transform.mp4'
    },
    ultimate: {
      name: 'Blue Flash', jp: '蒼ノ一閃',
      video: 'assets/video/tsubasa_ultimate.mp4',
      damage: 90, bossDamage: 140, meterMax: 140
    },
    moveHelp: [
      ['J J', 'Light slash, rising slash'],
      ['J J K K', 'Upper slash, then spin slash'],
      ['K K K', 'Upper, downward, curved slash'],
      ['Hold K', 'Charge: L1 greatsword / L2 launch / L3 dash'],
      ['Jump + J', 'Air slash'],
      ['Jump + K', 'Dive slash']
    ],
    songs: [
      { id: 'song1', title: 'Zettō Ame-no-Habakiri', cover: 'assets/img/covers/zettou_ameno_habakiri.webp', artist: 'Tsubasa', file: 'assets/audio/tsubasa_song1.mp3', previewStart: 18, previewLength: 15 }
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
    { id: 'hibiki',  name: 'Hibiki Tachibana',        jp: '立花 響',     color: '#ff9a2a', art: 'assets/img/chars/hibiki.webp',  face: 'assets/img/chars/hibiki_bust.webp', preview: 'assets/img/chars/hibiki_preview.jpg', hoverVoice: 'assets/audio/hibiki_hover.mp3', petalY: 0.40,
      blurb: 'A cheerful high-school girl who wields the Gungnir Symphogear.' },
    { id: 'tsubasa',  name: 'Tsubasa Kazanari',        jp: '風鳴 翼',     color: '#4a8dff', art: 'assets/img/chars/tsubasa.webp', face: 'assets/img/chars/tsubasa_bust.webp', preview: 'assets/img/chars/tsubasa_preview.jpg', hoverVoice: 'assets/audio/tsubasa_hover.mp3',
      blurb: 'A top idol singer and veteran wielder of the Ame-no-Habakiri Symphogear.' },
    { id: 'chris', artFx: { s: 1.3, y: -169 }, petalY: 0.47,    name: 'Chris Yukine',            jp: '雪音 クリス', color: '#ff3b4a', art: 'assets/img/chars/chris.webp',   face: 'assets/img/chars/chris_bust.webp',
      blurb: 'A tough, sharp-tongued girl who wields the Ichii-Bal Symphogear.' },
    { id: 'kanade', artFx: { s: 1.03, y: -123 }, petalX: -0.10,   name: 'Kanade Amou',             jp: '天羽 奏',     color: '#ff6a2a', art: 'assets/img/chars/kanade.webp',  face: 'assets/img/chars/kanade_bust.webp',
      blurb: "Tsubasa's partner in the duo Zwei Wing and the original wielder of Gungnir." },
    { id: 'miku', artFx: { s: 1.3, y: 7 }, petalX: -0.09,     name: 'Miku Kohinata',           jp: '小日向 未来', color: '#a07aff', art: 'assets/img/chars/miku.webp',    face: 'assets/img/chars/miku_bust.webp',
      blurb: "Hibiki's best friend and classmate at Lydian Academy." },
    { id: 'maria', artFx: { s: 1.28, y: -48 },   name: 'Maria Cadenzavna Eve',    jp: 'マリア・カデンツァヴナ・イヴ', color: '#ff7ab8', art: 'assets/img/chars/maria.webp', face: 'assets/img/chars/maria_bust.webp',
      blurb: 'A world-famous singer and the eldest of the F.I.S. Symphogear wielders.' },
    { id: 'shirabe', artFx: { s: 1.28, y: -103 }, petalX: 0.10,  name: 'Shirabe Tsukuyomi',       jp: '月読 調',     color: '#ff4aa0', art: 'assets/img/chars/shirabe.webp', face: 'assets/img/chars/shirabe_bust.webp',
      blurb: 'A quiet F.I.S. girl who wields the Shul Shagana Symphogear.' },
    { id: 'kirika', artFx: { s: 1.11, y: -103 },  name: 'Kirika Akatsuki',         jp: '暁 切歌',     color: '#7ae05a', art: 'assets/img/chars/kirika.webp',  face: 'assets/img/chars/kirika_bust.webp',
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
  },
  flying_armor: {
    name: 'Flying Armor Noise', sheet: 'ch1/flying_armor_sheet', frame: 'fly_idle0',
    anims: {
      fly: { frames: ['fly_idle0', 'fly_idle1', 'fly_idle2'], fps: 8, loop: true },
      flap: { frames: ['fly_flap0', 'fly_flap1', 'fly_flap2'], fps: 10, loop: true },
      swoop: { frames: ['swoop0', 'swoop1', 'swoop2', 'swoop3'], fps: 8, loop: false },
      xform: { frames: ['xform0', 'xform1', 'xform2', 'xform3'], fps: 6, loop: false },
      armor: { frames: ['armor_idle'], fps: 1, loop: true },
      ram: { frames: ['armor_ram0', 'armor_ram1', 'armor_ram2'], fps: 10, loop: true },
      hurt: { frames: ['hurt'], fps: 1 },
      defeat: { frames: ['defeat0', 'defeat1', 'defeat2'], fps: 6, loop: false }
    },
    facesRight: false, scale: 1.0, flyingArmor: true,
    hp: 680, speed: 2.2, width: 180, weight: 5, armor: true, boss: true,
    attack: { range: 140, windup: 20, lunge: 28, lungeSpeed: 14, dmg: 18, cooldown: [90, 140], shake: 10, knockdown: 0.45 },
    dust: ['#1a3a3a', '#2a5550', '#0a2020', '#5ad0c8', '#144']
  }
};
