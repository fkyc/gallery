// Concentric irregular rings expanding outward from center
import LAYERS from './layers.js';

const NUM_VERTICES = 60;
const MAX_RINGS = 35;
const SPAWN_INTERVAL = 4; // frames between new ring spawns
const EXPANSION_RATE = 0.018;
const LAYER_ADVANCE_RATE = 0.0008;

// Pre-computed unit circle lookup table
const cosTable = new Float64Array(NUM_VERTICES);
const sinTable = new Float64Array(NUM_VERTICES);
for (let i = 0; i < NUM_VERTICES; i++) {
  const angle = (i / NUM_VERTICES) * Math.PI * 2;
  cosTable[i] = Math.cos(angle);
  sinTable[i] = Math.sin(angle);
}

let rings = [];
let layerProgress = 0;
let currentGlowColor = [...LAYERS[0].glowColor];
let pulsePhase = 0;
let centerX, centerY, maxRadius;

function noiseOffset(seed, i) {
  const v = Math.sin(seed * 127.1 + i * 311.7) * 43758.5453;
  return (v - Math.floor(v)) * 2 - 1;
}

function createRing(p) {
  const li = Math.floor(layerProgress) % LAYERS.length;
  const layer = LAYERS[li];
  const frac = layerProgress - Math.floor(layerProgress);
  const nextLayer = LAYERS[(li + 1) % LAYERS.length];

  let color;
  if (frac > 0.7) {
    const t = (frac - 0.7) / 0.3;
    const ci = Math.floor(p.random(3));
    const c1 = p.color(layer.colors[ci]);
    const c2 = p.color(nextLayer.colors[ci]);
    color = p.lerpColor(c1, c2, t);
  } else {
    color = p.color(p.random(layer.colors));
  }

  const seed = p.random(10000);
  const bump = layer.bumpiness;
  const offsets = new Float64Array(NUM_VERTICES);
  for (let i = 0; i < NUM_VERTICES; i++) {
    offsets[i] = noiseOffset(seed, i) * bump;
  }

  return { scale: 0.5, color, offsets };
}

export function initTunnel(p) {
  centerX = p.width / 2;
  centerY = p.height / 2;
  maxRadius = Math.sqrt(centerX * centerX + centerY * centerY) * 1.2;
  rings = [];
  layerProgress = 0;
  currentGlowColor = [...LAYERS[0].glowColor];

  // Pre-fill with largest rings first so array order = draw order (largest first)
  for (let i = MAX_RINGS - 1; i >= 0; i--) {
    const ring = createRing(p);
    ring.scale = 0.5 * Math.pow(1 + EXPANSION_RATE * 8, i * SPAWN_INTERVAL);
    rings.push(ring);
  }
}

export function drawTunnel(p) {
  layerProgress += LAYER_ADVANCE_RATE;
  pulsePhase = p.frameCount * 0.03;

  // Spawn new rings (smallest scale, appended at end = drawn last = on top)
  if (p.frameCount % SPAWN_INTERVAL === 0 && rings.length < MAX_RINGS) {
    rings.push(createRing(p));
  }

  // Update ring scales and cull oversized rings (swap-and-pop)
  let writeIdx = 0;
  for (let i = 0; i < rings.length; i++) {
    rings[i].scale += rings[i].scale * EXPANSION_RATE;
    if (rings[i].scale <= 2) {
      rings[writeIdx++] = rings[i];
    }
  }
  rings.length = writeIdx;

  // Backfill if rings were culled
  while (rings.length < MAX_RINGS) {
    rings.push(createRing(p));
  }

  // Update glow color
  const li = Math.floor(layerProgress) % LAYERS.length;
  const targetGlow = LAYERS[li].glowColor;
  for (let i = 0; i < 3; i++) {
    currentGlowColor[i] += (targetGlow[i] - currentGlowColor[i]) * 0.02;
  }

  // Draw rings — array is naturally ordered largest-first (oldest expand most)
  // New rings pushed at end have smallest scale, drawn last (overdraw = correct)
  p.noStroke();
  for (let ri = 0; ri < rings.length; ri++) {
    const ring = rings[ri];
    const baseR = ring.scale * maxRadius;
    if (baseR < 0.5) continue;

    p.fill(ring.color);
    p.beginShape();
    for (let i = 0; i <= NUM_VERTICES; i++) {
      const idx = i % NUM_VERTICES;
      const r = baseR * (1 + ring.offsets[idx]);
      p.vertex(centerX + cosTable[idx] * r, centerY + sinTable[idx] * r);
    }
    p.endShape(p.CLOSE);
  }

  return { glowColor: currentGlowColor, pulsePhase };
}

export function getTunnelCenter() {
  return { x: centerX, y: centerY };
}

export function getInnermostRadius() {
  if (rings.length === 0) return 50;
  let minScale = Infinity;
  for (const ring of rings) {
    if (ring.scale < minScale) minScale = ring.scale;
  }
  return minScale * maxRadius * 0.8;
}
