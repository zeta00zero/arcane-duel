// ============================================================
//  MISSIONS + STORY. Story text lives here so it can be swapped
//  for the real script later. portrait: key of character.portraits
//  or null; side: 'left'|'right'|'center'.
// ============================================================
window.SOTS_DATA = window.SOTS_DATA || {};
SOTS_DATA.missions = [
  {
    id: 'm1',
    title: 'Mission 1 - First Song',
    blurb: 'Noisy have appeared downtown. Clear the street!',
    character: 'hibiki',
    vnBackground: 'assets/img/bg_vn_city.jpg',
    dialogue: [
      { speaker: 'Narrator', text: 'An ordinary afternoon in the city... until the sirens start to wail.' },
      { speaker: 'Announcement', text: 'Noisy alert! Noisy alert! All citizens, evacuate to the nearest shelter immediately!' },
      { speaker: 'Hibiki', portrait: 'uniform', text: 'Noisy... right here in the shopping district?!' },
      { speaker: 'Hibiki', portrait: 'uniform', text: 'Everyone is still running. If nobody stops them, people will get hurt.' },
      { speaker: 'Hibiki', portrait: 'uniform', text: "Okay. I won't run away. I'll sing - and I'll fight!" }
    ],
    stage: {
      background: {                 // 3 parallax layers, drawn back to front
          layers: [
            { src: 'assets/img/bg3_sky.jpg',    y: 0,        parallax: 0.06 },   // L3 sky: sun + clouds (slowest)
            { src: 'assets/img/bg3_city.png',   bottom: 432, parallax: 0.45 },   // L2 buildings, trees, lamps, fence (alpha sky)
            { src: 'assets/img/bg3_ground.jpg', y: 430,      parallax: 1 }       // L1 road the fighters stand on (fastest)
          ],
          shadow: 0.5, rim: 'rgba(16,20,40,0.85)'
        },   // daytime city, 3 layers built by tools/build_bg3.py
      // health drops per enemy type: rolled in order, first hit wins (chance 1 = guaranteed).
      // item types are in SOTS_DATA.items (below): small = +20% HP, big = +50% HP.
      drops: {
        noisy: [ { item: 'big', chance: 0.05 }, { item: 'small', chance: 0.20 } ],
        blob:  [ { item: 'big', chance: 0.05 }, { item: 'small', chance: 0.20 } ],
        boss:  [ { item: 'big', chance: 1 } ]
      },
      length: 5600,
      laneTop: 520, laneBottom: 700,
      waves: [
        { triggerX: 700,  label: 'WAVE 1', spawns: [ { type: 'noisy', side: 'right', delay: 0 }, { type: 'noisy', side: 'right', delay: 40 }, { type: 'noisy', side: 'left', delay: 90 } ] },
        { triggerX: 1900, label: 'WAVE 2', spawns: [ { type: 'blob', side: 'right', delay: 0 }, { type: 'noisy', side: 'right', delay: 30 }, { type: 'blob', side: 'left', delay: 60 }, { type: 'noisy', side: 'left', delay: 120 } ] },
        { triggerX: 3200, label: 'WAVE 3', spawns: [ { type: 'noisy', side: 'right', delay: 0 }, { type: 'noisy', side: 'right', delay: 20 }, { type: 'blob', side: 'left', delay: 40 }, { type: 'blob', side: 'right', delay: 100 }, { type: 'noisy', side: 'left', delay: 150 } ] },
        { triggerX: 4700, label: 'WARNING - GIANT NOISY', boss: true, spawns: [ { type: 'boss', side: 'right', delay: 30 }, { type: 'blob', side: 'left', delay: 200 }, { type: 'blob', side: 'right', delay: 420 } ] }
      ]
    }
  },
  {
    id: 'ch1',
    title: 'Chapter 1 - Night Express',
    blurb: 'A night run through the forest and a mountain tunnel. Protect the transport carrying the Solomon\u2019s Cane.',
    character: 'hibiki',
    vnBackground: 'assets/img/ch1/bg_vn_night.jpg',
    stage: {
      kind: 'train',
      background: {
        kind: 'train',
        sky: 'assets/img/ch1/bg_forest_sky.png',
        far: 'assets/img/ch1/bg_forest_far.png',
        mid: 'assets/img/ch1/bg_forest_mid.png',
        tunnel: 'assets/img/ch1/bg_tunnel.png',
        train: 'assets/img/ch1/bg_train.png',
        portalBack: 'assets/img/ch1/portal_back_v6.png',
        portalFrame: 'assets/img/ch1/portal_frame_v6.png',
        shadow: 0.45, rim: 'rgba(8,10,20,0.85)'
      },
      drops: {
        noisy: [ { item: 'big', chance: 0.05 }, { item: 'small', chance: 0.20 } ],
        blob:  [ { item: 'big', chance: 0.05 }, { item: 'small', chance: 0.20 } ],
        flying_armor: [ { item: 'big', chance: 1 } ]
      },
      length: 19000,
      speed: 6,
      laneTop: 520, laneBottom: 700,
      trainTop: 430, trainX: 40,
      entryWorld: 11680,
      exitWorld: 18880,
      segments: [
        { id: 'forest',       start: 0,     end: 10200 },
        { id: 'tunnel_entry', start: 10200, end: 11400 },
        { id: 'tunnel',       start: 11400, end: 16400 },
        { id: 'decouple',     start: 16400, end: 17400 },
        { id: 'tunnel_exit',  start: 17400, end: 19000 }
      ],
      events: [
        { at: 9200,  id: 'boss_arrive' },
        { at: 10000, id: 'tunnel_ahead' },
        { at: 16400, id: 'decouple' },
        { at: 17600, id: 'finale' }
      ],
      waves: [
        { triggerX: 900,  label: 'WAVE 1', spawns: [
            { type: 'noisy', side: 'right', delay: 0 },
            { type: 'noisy', side: 'right', delay: 40 },
            { type: 'noisy', side: 'left', delay: 90 }
          ] },
        { triggerX: 3200, label: 'WAVE 2', spawns: [
            { type: 'noisy', side: 'right', delay: 0 },
            { type: 'blob',  side: 'right', delay: 30 },
            { type: 'noisy', side: 'left', delay: 70 },
            { type: 'blob',  side: 'left', delay: 120 }
          ] },
        { triggerX: 5600, label: 'WAVE 3', spawns: [
            { type: 'noisy', side: 'right', delay: 0 },
            { type: 'noisy', side: 'right', delay: 20 },
            { type: 'blob',  side: 'left', delay: 50 },
            { type: 'noisy', side: 'left', delay: 90 },
            { type: 'blob',  side: 'right', delay: 130 }
          ] },
        { triggerX: 8000, label: 'WAVE 4', spawns: [
            { type: 'blob',  side: 'right', delay: 0 },
            { type: 'noisy', side: 'right', delay: 16 },
            { type: 'noisy', side: 'left', delay: 36 },
            { type: 'blob',  side: 'left', delay: 70 },
            { type: 'noisy', side: 'right', delay: 110 },
            { type: 'blob',  side: 'right', delay: 150 },
            { type: 'noisy', side: 'left', delay: 190 }
          ] },
        { triggerX: 11800, label: 'WAVE 5', spawns: [
            { type: 'noisy', side: 'right', delay: 0 },
            { type: 'blob',  side: 'left', delay: 24 },
            { type: 'noisy', side: 'right', delay: 50 },
            { type: 'noisy', side: 'left', delay: 90 },
            { type: 'blob',  side: 'right', delay: 130 },
            { type: 'noisy', side: 'left', delay: 170 }
          ] },
        { triggerX: 14800, label: 'WAVE 6', spawns: [
            { type: 'blob',  side: 'right', delay: 0 },
            { type: 'noisy', side: 'right', delay: 16 },
            { type: 'blob',  side: 'left', delay: 36 },
            { type: 'noisy', side: 'left', delay: 60 },
            { type: 'noisy', side: 'right', delay: 100 },
            { type: 'blob',  side: 'right', delay: 140 },
            { type: 'noisy', side: 'left', delay: 180 },
            { type: 'blob',  side: 'left', delay: 220 }
          ] }
      ]
    }
  }
];

// ============================================================
//  STORY MODE. Chapters are data-driven. Fill these fields when the
//  user supplies the anime-based script and a new story mission:
//    dialogue       — lines before the character pick
//                      { speaker, text, portrait? }  (speaker '$char' = chosen name)
//    choice         — forced pick, e.g. ['hibiki','chris'] (any playable ids)
//    dialogueAfter  — lines after the pick; '$char' resolves to the chosen name
//    mission        — id of a NEW story mission (do not reuse Free Mission's city m1)
//    vnBackground   — VN art
//    locked/comingSoon — set both false when the chapter is ready to play
// ============================================================
SOTS_DATA.story = {
  chapters: [
    {
      id: 'ch1',
      title: 'Chapter 1',
      blurb: 'Three months after Fin\u00e9. Protect the transport carrying the Solomon\u2019s Cane.',
      locked: false,
      comingSoon: false,
      vnBackground: 'assets/img/ch1/bg_vn_night.jpg',
      dialogue: [
        { speaker: 'Narrator', text: 'Three months after the battle with Fin\u00e9\u2026' },
        { speaker: 'Genjuro', comms: true, text: "Both of you \u2014 the transport is on the night express. It\u2019s carrying the Solomon\u2019s Cane. Noise are already on the roofs. Don\u2019t let them reach the cargo." },
        { speaker: 'Dr. Ver', comms: true, text: 'That relic may be the key to fighting the Noise. I would prefer it arrived in one piece.' },
        { speaker: 'Chris', portrait: 'assets/img/chars/chris.webp', text: "Tch. A moving train, at night, and this guy\u2019s talking about relics. Just don\u2019t get in my way, Hibiki." },
        { speaker: 'Hibiki', portrait: 'uniform', text: "We\u2019ll protect it together! Let\u2019s go, Chris!" }
      ],
      choice: ['hibiki', 'chris'],
      dialogueAfter: [
        { speaker: '$char', portrait: 'uniform', text: "They\u2019re on the roof!" },
        { speaker: 'Genjuro', comms: true, text: 'Stay with the cargo car. If that Cane is lost, we lose more than a train.' },
        { speaker: 'Chris', comms: true, portrait: 'assets/img/chars/chris.webp', text: "I\u2019ll cover the other cars. Don\u2019t do anything stupid." },
        { speaker: 'Hibiki', portrait: 'uniform', text: 'Leave this roof to me!' }
      ],
      mission: 'ch1'
    }
  ]
};

// ============================================================
//  PICKUP ITEMS (health drops). heal = fraction of max HP.
// ============================================================
SOTS_DATA.items = {
  small: { heal: 0.20, size: 1,   color: '#ff6a8a', glow: '#ffd0dc', label: '+20%' },
  big:   { heal: 0.50, size: 1.5, color: '#ffd36a', glow: '#fff3b0', label: '+50%' },
  life: 600, blinkAt: 150          // ticks on the ground (10 s), blinks for the last 2.5 s
};
