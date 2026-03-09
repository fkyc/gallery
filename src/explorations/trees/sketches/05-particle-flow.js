export const sketch05 = (p, canvasW, canvasH) => {
  let particles = [];
  const maxParticles = 400;
  let noiseOffset = 0;

  p.setup = () => {
    p.createCanvas(canvasW, canvasH);
    p.frameRate(30);
  };

  p.draw = () => {
    p.background(13, 30);

    noiseOffset = p.map(p.mouseX, 0, canvasW, 0, 5);

    for (let i = 0; i < 3; i++) {
      if (particles.length < maxParticles) {
        particles.push({
          x: canvasW / 2 + (Math.random() - 0.5) * 20,
          y: canvasH - 20,
          vx: 0,
          vy: -2 - Math.random(),
          life: 1,
          size: 2 + Math.random() * 3,
          hue: 80 + Math.random() * 60,
        });
      }
    }

    for (let i = particles.length - 1; i >= 0; i--) {
      const pt = particles[i];
      const nx = p.noise(pt.x * 0.005 + noiseOffset, pt.y * 0.005, p.frameCount * 0.005);
      const ny = p.noise(pt.x * 0.005 + 100, pt.y * 0.005 + noiseOffset, p.frameCount * 0.005);

      pt.vx += (nx - 0.5) * 1.5;
      pt.vy += (ny - 0.5) * 0.5 - 0.15;

      pt.vx *= 0.92;
      pt.vy *= 0.92;

      pt.x += pt.vx;
      pt.y += pt.vy;
      pt.life -= 0.004;

      if (Math.random() < 0.008 && particles.length < maxParticles && pt.life > 0.3) {
        const dir = Math.random() < 0.5 ? -1 : 1;
        particles.push({
          x: pt.x,
          y: pt.y,
          vx: dir * (1 + Math.random()),
          vy: pt.vy * 0.5,
          life: pt.life * 0.7,
          size: pt.size * 0.8,
          hue: pt.hue + (Math.random() - 0.5) * 20,
        });
      }

      if (pt.life <= 0 || pt.y < -10 || pt.x < -10 || pt.x > canvasW + 10) {
        particles.splice(i, 1);
        continue;
      }

      const alpha = pt.life * 200;
      const g = p.map(pt.hue, 80, 140, 120, 200);
      p.noStroke();
      p.fill(60, g, 40, alpha);
      p.ellipse(pt.x, pt.y, pt.size * pt.life, pt.size * pt.life);
    }

    p.stroke(100, 75, 50);
    p.strokeWeight(8);
    p.line(canvasW / 2, canvasH, canvasW / 2, canvasH - 30);
    p.strokeWeight(5);
    p.line(canvasW / 2, canvasH - 30, canvasW / 2, canvasH - 50);
  };
};
