export const sketch08 = (p, canvasW, canvasH) => {
  let triangles = [];

  p.setup = () => {
    p.createCanvas(canvasW, canvasH);
    p.frameRate(30);
    generateTree();
    p.noLoop();
  };

  function generateTree() {
    triangles = [];

    const cx = canvasW / 2;
    const baseY = canvasH - 40;

    triangles.push({
      type: 'trunk',
      x1: cx - 10, y1: baseY,
      x2: cx + 10, y2: baseY,
      x3: cx + 6, y3: baseY - canvasH * 0.22,
      x4: cx - 6, y4: baseY - canvasH * 0.22,
    });

    const canopyBase = baseY - canvasH * 0.18;
    buildCanopy(cx, canopyBase, canvasW * 0.32, canvasH * 0.16, 5, 0);
  }

  function buildCanopy(cx, baseY, width, height, layers, depth) {
    if (layers <= 0) return;

    const jitter = () => (Math.random() - 0.5) * width * 0.1;

    const x1 = cx - width / 2 + jitter();
    const x2 = cx + width / 2 + jitter();
    const tipY = baseY - height + jitter() * 0.3;

    triangles.push({
      type: 'canopy',
      x1, y1: baseY,
      x2, y2: baseY,
      x3: cx + jitter(), y3: tipY,
      depth,
    });

    const overlap = height * 0.45;
    buildCanopy(cx, baseY - height + overlap, width * 0.85, height * 0.9, layers - 1, depth + 1);
  }

  p.draw = () => {
    p.background(13);

    for (const tri of triangles) {
      if (tri.type === 'trunk') {
        p.fill(90, 65, 40);
        p.stroke(60, 42, 25);
        p.strokeWeight(1);
        p.quad(tri.x1, tri.y1, tri.x2, tri.y2, tri.x3, tri.y3, tri.x4, tri.y4);
      } else {
        const g = p.map(tri.depth, 0, 5, 60, 160);
        p.fill(35 + tri.depth * 5, g, 30 + tri.depth * 5, 220);
        p.stroke(25, g - 20, 20);
        p.strokeWeight(1.5);
        p.triangle(tri.x1, tri.y1, tri.x2, tri.y2, tri.x3, tri.y3);
      }
    }
  };

  p.mousePressed = () => {
    if (p.mouseX >= 0 && p.mouseX <= canvasW && p.mouseY >= 0 && p.mouseY <= canvasH) {
      generateTree();
      p.redraw();
    }
  };
};
