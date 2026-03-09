export const sketch06 = (p, canvasW, canvasH) => {
  p.setup = () => {
    p.createCanvas(canvasW, canvasH);
    p.frameRate(30);
  };

  p.draw = () => {
    p.background(13);

    const cx = canvasW / 2;
    const baseY = canvasH * 0.78;
    const morph = p.map(p.mouseY, 0, canvasH, 0.5, 3.0);

    // Trunk
    p.noStroke();
    p.fill(80, 55, 35);
    p.beginShape();
    p.vertex(cx - 12, baseY);
    p.vertex(cx - 8, baseY - canvasH * 0.25);
    p.vertex(cx + 8, baseY - canvasH * 0.25);
    p.vertex(cx + 12, baseY);
    p.endShape(p.CLOSE);

    const layers = [
      { r: 130, color: [20, 60, 20], freq: 3, yOff: -0.05 },
      { r: 120, color: [30, 90, 30], freq: 4, yOff: 0 },
      { r: 100, color: [40, 120, 40], freq: 5, yOff: 0.03 },
      { r: 80, color: [55, 150, 50], freq: 6, yOff: 0.05 },
    ];

    const canopyY = baseY - canvasH * 0.25;

    for (const layer of layers) {
      const ly = canopyY + layer.yOff * canvasH;
      p.fill(layer.color[0], layer.color[1], layer.color[2]);
      p.beginShape();
      for (let a = 0; a < p.TWO_PI; a += 0.05) {
        const noiseVal = p.noise(
          Math.cos(a) * layer.freq * morph + 10,
          Math.sin(a) * layer.freq * morph + 10,
          p.frameCount * 0.003
        );
        const r = layer.r * (0.6 + noiseVal * 0.8);
        const xr = r * 1.2;
        const yr = r * 0.9;
        p.vertex(cx + Math.cos(a) * xr, ly + Math.sin(a) * yr);
      }
      p.endShape(p.CLOSE);
    }
  };
};
