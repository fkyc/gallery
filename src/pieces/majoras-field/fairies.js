// Tatl (cursor fairy) + Tael (follower fairy) + particle system
import { isTouchDevice } from '../../shared/utils.js';

// -- State --
const isTouch = isTouchDevice();
let tatlX, tatlY;
let taelX, taelY;
let targetX, targetY;
let idleAngle = 0;
let idleCenterX, idleCenterY;

const TRAIL_LENGTH = 20;
let taelTrail = [];

const MAX_PARTICLES = 60;
let particles = [];

// -- Init --
export function initFairies(p) {
  targetX = p.width / 2;
  targetY = p.height / 2;
  tatlX = targetX;
  tatlY = targetY;
  taelX = targetX - 30;
  taelY = targetY + 20;
  idleCenterX = targetX;
  idleCenterY = targetY;
  taelTrail = [];
  particles = [];
}

// -- Input handling --
export function updateTarget(p) {
  if (isTouch) {
    if (p.mouseIsPressed) {
      targetX = p.mouseX;
      targetY = p.mouseY;
      idleCenterX = targetX;
      idleCenterY = targetY;
      idleAngle = 0;
    } else {
      idleAngle += 0.01;
      targetX = idleCenterX + Math.sin(idleAngle) * 40;
      targetY = idleCenterY + Math.cos(idleAngle * 0.7) * 25;
    }
  } else {
    targetX = p.mouseX;
    targetY = p.mouseY;
  }
}

// -- Get target for gaze tracking --
export function getTarget() {
  return { x: tatlX, y: tatlY };
}

// -- Update + Draw --
export function updateAndDrawFairies(p) {
  updateTarget(p);

  // Tatl position (snap on desktop, lerp on mobile for smoothness)
  const tatlLerp = isTouch ? 0.15 : 0.3;
  tatlX = p.lerp(tatlX, targetX, tatlLerp);
  tatlY = p.lerp(tatlY, targetY, tatlLerp);

  // Tael follows Tatl with dreamy delay
  taelX = p.lerp(taelX, tatlX, 0.03);
  taelY = p.lerp(taelY, tatlY, 0.03);

  // Tael trail
  taelTrail.push({ x: taelX, y: taelY });
  if (taelTrail.length > TRAIL_LENGTH) taelTrail.shift();

  // Spawn particles near Tatl
  if (p.frameCount % 3 === 0) {
    particles.push({
      x: tatlX + p.random(-12, 12),
      y: tatlY + p.random(-12, 12),
      life: 1.0,
      decay: p.random(0.02, 0.05),
      size: p.random(2, 5),
      isTael: false,
    });
  }
  // Spawn particles near Tael
  if (p.frameCount % 5 === 0) {
    particles.push({
      x: taelX + p.random(-10, 10),
      y: taelY + p.random(-10, 10),
      life: 1.0,
      decay: p.random(0.02, 0.04),
      size: p.random(2, 4),
      isTael: true,
    });
  }

  // Update + draw particles
  p.noStroke();
  for (let i = particles.length - 1; i >= 0; i--) {
    const pt = particles[i];
    pt.life -= pt.decay;
    pt.y -= 0.3;
    if (pt.life <= 0) {
      particles.splice(i, 1);
      continue;
    }
    if (pt.isTael) {
      p.fill(180, 100, 255, pt.life * 200);
    } else {
      p.fill(255, 255, 180, pt.life * 200);
    }
    p.ellipse(pt.x, pt.y, pt.size * pt.life);
  }
  if (particles.length > MAX_PARTICLES) {
    particles.splice(0, particles.length - MAX_PARTICLES);
  }

  // Draw Tael trail
  for (let i = 0; i < taelTrail.length; i++) {
    const t = i / taelTrail.length;
    const pos = taelTrail[i];
    p.fill(160, 80, 220, t * 80);
    p.ellipse(pos.x, pos.y, 6 * t + 2);
  }

  // Draw Tael (purple fairy)
  const taelBob = Math.sin(p.frameCount * 0.06 + 2) * 3;
  const taelGlow = 14 + Math.sin(p.frameCount * 0.08) * 4;
  drawFairyGlow(p, taelX, taelY + taelBob, taelGlow, [160, 80, 220], [220, 180, 255]);

  // Draw Tatl (yellow fairy)
  const tatlBob = Math.sin(p.frameCount * 0.05) * 3;
  const tatlGlow = 16 + Math.sin(p.frameCount * 0.07) * 5;
  drawFairyGlow(p, tatlX, tatlY + tatlBob, tatlGlow, [255, 220, 60], [255, 255, 220]);
}

function drawFairyGlow(p, x, y, radius, outerColor, innerColor) {
  p.noStroke();
  // Outer glow
  p.fill(outerColor[0], outerColor[1], outerColor[2], 40);
  p.ellipse(x, y, radius * 2.5);
  // Mid glow
  p.fill(outerColor[0], outerColor[1], outerColor[2], 80);
  p.ellipse(x, y, radius * 1.5);
  // Core
  p.fill(innerColor[0], innerColor[1], innerColor[2], 220);
  p.ellipse(x, y, radius * 0.7);
  // Bright center
  p.fill(255, 255, 255, 200);
  p.ellipse(x, y, radius * 0.3);
}
