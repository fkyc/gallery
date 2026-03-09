const rules = { F: 'FF+[+F-F-F]-[-F+F+F]' };

function generate(s) {
  let next = '';
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    next += ch in rules ? rules[ch] : ch;
  }
  return next;
}

export const sketch03 = (p, canvasW, canvasH) => {
  let sentence;
  const axiom = 'F';
  const generations = 4;

  p.setup = () => {
    p.createCanvas(canvasW, canvasH);
    p.frameRate(30);

    sentence = axiom;
    for (let i = 0; i < generations; i++) {
      sentence = generate(sentence);
    }
  };

  p.draw = () => {
    p.background(13);

    const angle = p.map(p.mouseX, 0, canvasW, p.radians(15), p.radians(35));
    const len = canvasH * 0.0045;

    p.resetMatrix();
    p.translate(canvasW / 2, canvasH - 20);

    p.strokeWeight(1);
    for (let i = 0; i < sentence.length; i++) {
      const ch = sentence[i];
      if (ch === 'F') {
        const depth = Math.min(i / sentence.length, 1);
        const g = p.lerp(80, 170, depth);
        p.stroke(60, g, 40, 200);
        p.line(0, 0, 0, -len);
        p.translate(0, -len);
      } else if (ch === '+') {
        p.rotate(angle);
      } else if (ch === '-') {
        p.rotate(-angle);
      } else if (ch === '[') {
        p.push();
      } else if (ch === ']') {
        p.pop();
      }
    }
  };
};
