export const sketch10 = (p, canvasW, canvasH) => {
  const seasons = ['Spring', 'Summer', 'Autumn', 'Winter'];

  const palettes = {
    spring: { leaves: ['#ffb7c5', '#ff91a4', '#98e698', '#c8f7c8'], trunk: '#8b6b4a', bg: '#1a2a1a' },
    summer: { leaves: ['#2e7d32', '#4caf50', '#66bb6a', '#388e3c'], trunk: '#5c3a1a', bg: '#1b3a1b' },
    autumn: { leaves: ['#e65100', '#ff8f00', '#f9a825', '#d84315'], trunk: '#6d4c3a', bg: '#2a1a0e' },
    winter: { leaves: [], trunk: '#7a6855', bg: '#1a2030' },
  };

  p.setup = () => {
    p.createCanvas(canvasW, canvasH);
    p.frameRate(30);
  };

  p.draw = () => {
    p.background(13);

    const halfW = Math.floor(canvasW / 2);
    const halfH = Math.floor(canvasH / 2);
    const margin = 6;

    const quadrants = [
      { x: 0, y: 0, season: 'spring' },
      { x: halfW, y: 0, season: 'summer' },
      { x: 0, y: halfH, season: 'autumn' },
      { x: halfW, y: halfH, season: 'winter' },
    ];

    for (let i = 0; i < quadrants.length; i++) {
      const q = quadrants[i];
      const qw = (i % 2 === 0) ? halfW - margin : canvasW - halfW - margin;
      const qh = (i < 2) ? halfH - margin : canvasH - halfH - margin;

      p.push();
      p.translate(q.x + margin / 2, q.y + margin / 2);

      const pal = palettes[q.season];
      p.fill(pal.bg);
      p.noStroke();
      p.rect(0, 0, qw, qh, 4);

      // Clip manually by drawing within bounds
      drawSeasonTree(p, qw, qh, q.season, pal);

      // Label
      p.fill(255, 180);
      p.noStroke();
      p.textSize(10);
      p.textAlign(p.LEFT, p.TOP);
      p.text(seasons[i], 8, 8);

      p.pop();
    }
  };
};

function drawSeasonTree(p, w, h, season, pal) {
  const cx = w / 2;
  const baseY = h * 0.85;
  const trunkH = h * 0.35;

  p.stroke(pal.trunk);
  p.strokeWeight(5);
  p.line(cx, baseY, cx, baseY - trunkH);

  drawBranch(p, cx, baseY - trunkH, -Math.PI / 2, trunkH * 0.45, 0, 5, season, pal);

  if (season === 'winter') {
    p.noStroke();
    p.fill(200, 210, 230, 60);
    p.ellipse(cx, baseY + 8, w * 0.7, 16);

    p.fill(220, 230, 240, 150);
    for (let i = 0; i < 20; i++) {
      const sx = (p.noise(i * 0.3, p.frameCount * 0.01) - 0.5) * w * 0.8 + cx;
      const sy = p.noise(i * 0.3 + 100, p.frameCount * 0.008) * h;
      p.ellipse(sx, sy, 2, 2);
    }
  }

  if (season === 'spring') {
    p.noStroke();
    for (let i = 0; i < 10; i++) {
      const px = (p.noise(i * 0.5, p.frameCount * 0.006) - 0.5) * w * 0.8 + cx;
      const py = p.noise(i * 0.5 + 50, p.frameCount * 0.008) * h;
      p.fill(255, 183, 197, 160);
      p.ellipse(px, py, 3, 3);
    }
  }
}

function drawBranch(p, x, y, angle, len, depth, maxDepth, season, pal) {
  if (depth > maxDepth || len < 3) return;

  const ex = x + Math.cos(angle) * len;
  const ey = y + Math.sin(angle) * len;

  const sw = p.map(depth, 0, maxDepth, 4, 0.5);
  p.stroke(pal.trunk);
  p.strokeWeight(sw);
  p.line(x, y, ex, ey);

  if (season !== 'winter' && depth >= 3 && pal.leaves.length > 0) {
    p.noStroke();
    const c = pal.leaves[depth % pal.leaves.length];
    const sway = Math.sin(p.frameCount * 0.03 + depth + x * 0.01) * 2;
    p.fill(c);
    const leafSize = p.map(depth, 3, maxDepth, 8, 4);
    p.ellipse(ex + sway, ey, leafSize, leafSize * 0.7);
  }

  if (season === 'winter' && depth >= 4) {
    p.noStroke();
    p.fill(200, 220, 240, 100);
    p.ellipse(ex, ey, 4, 4);
  }

  const spread = 0.5;
  drawBranch(p, ex, ey, angle - spread, len * 0.68, depth + 1, maxDepth, season, pal);
  drawBranch(p, ex, ey, angle + spread, len * 0.68, depth + 1, maxDepth, season, pal);
}
