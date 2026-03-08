// Sky gradient + procedural grass for the surreal Moon field

const GRASS_BLADE_COUNT = 200;
let grassBlades = [];

export function initBackground(p) {
  grassBlades = [];
  const grassLineY = p.height * 0.72;
  for (let i = 0; i < GRASS_BLADE_COUNT; i++) {
    grassBlades.push({
      x: p.random(0, p.width),
      baseY: p.random(grassLineY, p.height),
      h: p.random(8, 28),
      phase: p.random(p.TWO_PI),
      green: p.random(80, 180),
    });
  }
}

export function drawBackground(p) {
  // Surreal sky gradient — the inside of the Moon is ethereal
  const skyTop = p.color(180, 210, 235);
  const skyBottom = p.color(230, 240, 220);
  for (let y = 0; y < p.height * 0.72; y++) {
    const t = y / (p.height * 0.72);
    const c = p.lerpColor(skyTop, skyBottom, t);
    p.stroke(c);
    p.line(0, y, p.width, y);
  }

  // Ground fill
  const grassLineY = p.height * 0.72;
  p.noStroke();
  p.fill(90, 160, 70);
  p.rect(0, grassLineY, p.width, p.height - grassLineY);

  // Grass blades with sine-wave sway
  p.strokeWeight(2);
  for (const blade of grassBlades) {
    const sway = Math.sin(p.frameCount * 0.02 + blade.phase) * 4;
    p.stroke(40, blade.green, 40);
    p.line(blade.x, blade.baseY, blade.x + sway, blade.baseY - blade.h);
  }
}
