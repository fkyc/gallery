export const sketch09 = (p, canvasW, canvasH) => {
  let startTime;
  const growDuration = 3000;
  let segments = [];

  p.setup = () => {
    p.createCanvas(canvasW, canvasH);
    p.frameRate(30);
    restart();
  };

  function restart() {
    startTime = p.millis();
    segments = [];
    buildTree(canvasW / 2, canvasH - 30, -Math.PI / 2, canvasH * 0.2, 0, 9);
    p.loop();
  }

  function buildTree(x, y, angle, len, depth, maxDepth) {
    if (depth > maxDepth || len < 3) return;

    const ex = x + Math.cos(angle) * len;
    const ey = y + Math.sin(angle) * len;

    const delay = depth / maxDepth;
    segments.push({ x, y, ex, ey, depth, delay, maxDepth });

    const spread = 0.45 + depth * 0.03;
    buildTree(ex, ey, angle - spread, len * 0.7, depth + 1, maxDepth);
    buildTree(ex, ey, angle + spread, len * 0.7, depth + 1, maxDepth);
  }

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  p.draw = () => {
    p.background(13);

    const elapsed = p.millis() - startTime;
    const globalProgress = Math.min(elapsed / growDuration, 1);

    let allDone = true;

    for (const seg of segments) {
      const segProgress = Math.max(0, (globalProgress - seg.delay * 0.7) / 0.3);
      const t = easeOutCubic(Math.min(segProgress, 1));

      if (t <= 0) {
        allDone = false;
        continue;
      }
      if (t < 1) allDone = false;

      const cx = p.lerp(seg.x, seg.ex, t);
      const cy = p.lerp(seg.y, seg.ey, t);

      const sw = p.map(seg.depth, 0, seg.maxDepth, 6, 0.5);
      const g = p.map(seg.depth, 0, seg.maxDepth, 70, 170);
      p.stroke(90 - seg.depth * 5, g, 40);
      p.strokeWeight(sw * t);
      p.line(seg.x, seg.y, cx, cy);

      if (seg.depth >= 7 && t > 0.8) {
        p.noStroke();
        p.fill(50, 150, 45, t * 180);
        p.ellipse(cx, cy, 4 * t, 4 * t);
      }
    }

    if (allDone) {
      p.noLoop();
    }
  };

  p.mousePressed = () => {
    if (p.mouseX >= 0 && p.mouseX <= canvasW && p.mouseY >= 0 && p.mouseY <= canvasH) {
      restart();
    }
  };
};
