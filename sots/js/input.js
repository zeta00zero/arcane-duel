// Input abstraction: game code only asks about ACTIONS, never raw keys.
// Keyboard is bound below; touch buttons can call Input.press/release later
// (see Input.bindButton) without touching game logic.
(function () {
  const ACTIONS = ['left', 'right', 'up', 'down', 'light', 'heavy', 'ult', 'confirm', 'back', 'pause'];
  const KEYMAP = {
    ArrowLeft: 'left', KeyA: 'left', ArrowRight: 'right', KeyD: 'right',
    ArrowUp: 'up', KeyW: 'up', ArrowDown: 'down', KeyS: 'down',
    KeyJ: 'light', KeyK: 'heavy', KeyL: 'ult',
    Enter: 'confirm', Space: 'confirm', Escape: 'pause', KeyP: 'pause', Backspace: 'back'
  };
  const held = {}, sources = {}, pressedQ = {};
  ACTIONS.forEach(a => { held[a] = false; sources[a] = new Set(); pressedQ[a] = 0; });
  const listeners = [];
  function press(action, src = 'api') {
    if (!(action in held)) return;
    if (!sources[action].has(src)) {
      sources[action].add(src);
      if (!held[action]) { held[action] = true; pressedQ[action]++; listeners.forEach(fn => fn(action)); }
    }
  }
  function release(action, src = 'api') {
    if (!(action in held)) return;
    sources[action].delete(src);
    if (sources[action].size === 0) held[action] = false;
  }
  window.addEventListener('keydown', e => {
    const a = KEYMAP[e.code]; if (!a) return;
    const t = e.target && e.target.tagName;
    if (t === 'INPUT' && e.target.type === 'range' && (a === 'left' || a === 'right')) return;
    if (['up','down','left','right','confirm','back'].includes(a)) e.preventDefault();
    if (!e.repeat) press(a, 'kb:' + e.code);
  });
  window.addEventListener('keyup', e => { const a = KEYMAP[e.code]; if (a) release(a, 'kb:' + e.code); });
  window.addEventListener('blur', () => ACTIONS.forEach(a => { sources[a].clear(); held[a] = false; }));
  window.Input = {
    ACTIONS, KEYMAP,
    isDown: a => held[a],
    // consume one buffered press of an action (edge-triggered)
    consume(a) { if (pressedQ[a] > 0) { pressedQ[a] = 0; return true; } return false; },
    clear() { ACTIONS.forEach(a => pressedQ[a] = 0); },
    press, release,
    onPress(fn) { listeners.push(fn); },
    // Future phone support: Input.bindButton(document.getElementById('btnJ'), 'light')
    bindButton(el, action) {
      const id = 'touch:' + Math.random().toString(36).slice(2);
      const down = e => { e.preventDefault(); press(action, id); };
      const up = e => { e.preventDefault(); release(action, id); };
      el.addEventListener('pointerdown', down); el.addEventListener('pointerup', up);
      el.addEventListener('pointercancel', up); el.addEventListener('pointerleave', up);
    }
  };
})();
