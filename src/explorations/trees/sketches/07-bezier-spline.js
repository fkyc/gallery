export const sketch07 = (p, canvasW, canvasH) => {
  let branches = [];
  let swayPhase = 0;

  p.setup = () => {
    p.createCanvas(canvasW, canvasH);
    p.frameRate(30);
    generateTree();
  };

  function generateTree() {
    branches = [];
    buildBranch(canvasW / 2, canvasH - 30, -Math.PI / 2, canvasH * 0.25, 10, 0);
  }

  function buildBranch(x, y, angle, len, weight, depth) {
    if (depth > 8 || len < 8) return;

    const cpOff = (Math.random() - 0.5) * len * 0.4;
    const ex = x + Math.cos(angle) * len;
    const ey = y + Math.sin(angle) * len;
    const cpx = x + Math.cos(angle) * len * 0.5 + Math.cos(angle + Math.PI / 2) * cpOff;
    const cpy = y + Math.sin(angle) * len * 0.5 + Math.sin(angle + Math.PI / 2) * cpOff;

    branches.push({ x, y, cpx, cpy, ex, ey, weight, depth });

    const numChildren = depth < 2 ? 3 : 2;
    for (let i = 0; i < numChildren; i++) {
      const spread = p.map(i, 0, numChildren - 1, -0.6, 0.6);
      const childAngle = angle + spread + (Math.random() - 0.5) * 0.3;
      const childLen = len * (0.6 + Math.random() * 0.15);
      const childWeight = weight * 0.65;
      buildBranch(ex, ey, childAngle, childLen, childWeight, depth + 1);
    }
  }

  p.draw = () => {
    p.background(13);
    swayPhase += 0.02;

    for (const b of branches) {
      const sway = Math.sin(swayPhase + b.depth * 0.5) * b.depth * 0.4;
      const g = p.map(b.depth, 0, 8, 70, 160);
      const r = p.map(b.depth, 0, 8, 100, 50);

      p.stroke(r, g, 40);
      p.strokeWeight(Math.max(b.weight, 0.5));
      p.noFill();

      // Convert quadratic control point to cubic bezier control points
      const sx = b.cpx + sway;
      const sy = b.cpy + sway * 0.5;
      const ex = b.ex + sway;
      const ey = b.ey + sway * 0.5;
      const cp1x = b.x + 2 / 3 * (sx - b.x);
      const cp1y = b.y + 2 / 3 * (sy - b.y);
      const cp2x = ex + 2 / 3 * (sx - ex);
      const cp2y = ey + 2 / 3 * (sy - ey);
      p.bezier(b.x, b.y, cp1x, cp1y, cp2x, cp2y, ex, ey);
    }

    p.noStroke();
    for (const b of branches) {
      if (b.depth >= 6) {
        const sway = Math.sin(swayPhase + b.depth * 0.5) * b.depth * 0.4;
        p.fill(50, 140 + Math.random() * 40, 40, 150);
        p.ellipse(b.ex + sway, b.ey + sway * 0.5, 5 + Math.random() * 4, 5 + Math.random() * 4);
      }
    }
  };

  p.mousePressed = () => {
    if (p.mouseX >= 0 && p.mouseX <= canvasW && p.mouseY >= 0 && p.mouseY <= canvasH) {
      generateTree();
    }
  };
};
