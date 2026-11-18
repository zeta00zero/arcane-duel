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
  }
];

// ============================================================
//  PICKUP ITEMS (health drops). heal = fraction of max HP.
// ============================================================
SOTS_DATA.items = {
  small: { heal: 0.20, size: 1,   color: '#ff6a8a', glow: '#ffd0dc', label: '+20%' },
  big:   { heal: 0.50, size: 1.5, color: '#ffd36a', glow: '#fff3b0', label: '+50%' },
  life: 600, blinkAt: 150          // ticks on the ground (10 s), blinks for the last 2.5 s
};
