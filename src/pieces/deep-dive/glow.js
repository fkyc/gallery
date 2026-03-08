// Center light source — concentric semi-transparent ellipses
import LAYERS from './layers.js';

let currentColor = [...LAYERS[0].glowColor];

export function drawGlow(p, glowColor, pulsePhase) {
  const cx = p.width / 2;
  const cy = p.height / 2;

  // Smooth color transition
  for (let i = 0; i < 3; i++) {
    currentColor[i] += (glowColor[i] - currentColor[i]) * 0.03;
  }

  const pulse = 1 + Math.sin(pulsePhase) * 0.12;
  const r = currentColor[0];
  const g = currentColor[1];
  const b = currentColor[2];

  p.noStroke();

  // Outer haze
  p.fill(r, g, b, 15);
  p.ellipse(cx, cy, 180 * pulse, 180 * pulse);

  // Mid glow
  p.fill(r, g, b, 35);
  p.ellipse(cx, cy, 100 * pulse, 100 * pulse);

  // Inner bright
  p.fill(r * 1.1, g * 1.1, b * 1.05, 80);
  p.ellipse(cx, cy, 50 * pulse, 50 * pulse);

  // Hot white core
  p.fill(255, 255, 240, 140);
  p.ellipse(cx, cy, 18 * pulse, 18 * pulse);
}
