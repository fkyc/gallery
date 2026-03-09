export const sketch02 = (p, canvasW, canvasH) => {
  p.setup = () => {
    p.createCanvas(canvasW, canvasH);
    p.frameRate(30);
  };

  p.draw = () => {
    p.background(13);

    const angle = p.map(p.mouseX, 0, canvasW, Math.PI / 12, Math.PI / 3);
    const maxDepth = Math.floor(p.map(p.mouseY, 0, canvasH, 10, 3));

    p.translate(canvasW / 2, canvasH - 40);
    p.stroke(140, 100, 60);
    p.strokeWeight(6);
    const trunkLen = canvasH * 0.22;
    p.line(0, 0, 0, -trunkLen);
    p.translate(0, -trunkLen);
    branch(p, trunkLen * 0.7, angle, maxDepth, 1);
  };
};

function branch(p, len, angle, maxDepth, depth) {
  if (depth > maxDepth || len < 2) return;

  const sw = p.map(depth, 1, maxDepth, 4, 0.5);
  const g = p.map(depth, 1, maxDepth, 80, 180);
  p.strokeWeight(sw);

  p.push();
  p.rotate(-angle);
  p.stroke(100 - depth * 5, g, 50 - depth * 2);
  p.line(0, 0, 0, -len);
  p.translate(0, -len);
  branch(p, len * 0.72, angle, maxDepth, depth + 1);
  p.pop();

  p.push();
  p.rotate(angle);
  p.stroke(100 - depth * 5, g, 50 - depth * 2);
  p.line(0, 0, 0, -len);
  p.translate(0, -len);
  branch(p, len * 0.72, angle, maxDepth, depth + 1);
  p.pop();
}
