import { renderSprite } from '../../../shared/utils.js';

const _ = null;
const T = '#5c3a1a';
const t = '#7a5030';
const L = '#2e7d32';
const l = '#4caf50';
const lf = '#66bb6a';
const ld = '#1b5e20';

const TREE_SPRITE = [
  [_,_,_,_,_,_,_,_,_,_,_,L,L,l,l,l,l,l,L,L,_,_,_,_,_,_,_,_,_,_,_,_],
  [_,_,_,_,_,_,_,_,_,L,L,l,l,lf,lf,lf,lf,l,l,L,L,_,_,_,_,_,_,_,_,_,_,_],
  [_,_,_,_,_,_,_,L,L,l,l,lf,lf,lf,lf,lf,lf,lf,l,l,L,L,_,_,_,_,_,_,_,_,_,_],
  [_,_,_,_,_,_,L,l,l,lf,lf,lf,lf,lf,lf,lf,lf,lf,lf,l,l,L,_,_,_,_,_,_,_,_,_,_],
  [_,_,_,_,_,L,l,lf,lf,lf,lf,lf,lf,lf,lf,lf,lf,lf,lf,lf,l,L,_,_,_,_,_,_,_,_,_,_],
  [_,_,_,_,L,l,lf,lf,lf,lf,lf,l,lf,lf,lf,l,lf,lf,lf,lf,lf,l,L,_,_,_,_,_,_,_,_,_],
  [_,_,_,L,l,lf,lf,lf,l,lf,lf,lf,lf,lf,lf,lf,lf,lf,l,lf,lf,lf,l,L,_,_,_,_,_,_,_,_],
  [_,_,L,l,lf,lf,lf,lf,lf,lf,l,ld,l,lf,lf,l,ld,l,lf,lf,lf,lf,lf,l,L,_,_,_,_,_,_,_],
  [_,_,L,l,lf,lf,lf,l,lf,lf,lf,lf,lf,lf,lf,lf,lf,lf,lf,l,lf,lf,lf,l,L,_,_,_,_,_,_,_],
  [_,L,l,lf,lf,l,lf,lf,lf,lf,lf,lf,l,lf,l,lf,lf,lf,lf,lf,lf,l,lf,lf,l,L,_,_,_,_,_,_],
  [_,L,l,lf,lf,lf,lf,lf,l,ld,l,lf,lf,lf,lf,lf,l,ld,l,lf,lf,lf,lf,lf,l,L,_,_,_,_,_,_],
  [_,L,l,lf,lf,lf,lf,lf,lf,lf,lf,lf,lf,lf,lf,lf,lf,lf,lf,lf,lf,lf,lf,lf,l,L,_,_,_,_,_,_],
  [L,l,lf,lf,l,lf,lf,lf,lf,lf,lf,l,lf,lf,lf,l,lf,lf,lf,lf,lf,l,lf,lf,lf,l,L,_,_,_,_,_],
  [L,l,lf,lf,lf,lf,l,lf,lf,lf,lf,lf,lf,lf,lf,lf,lf,lf,lf,l,lf,lf,lf,lf,lf,l,L,_,_,_,_,_],
  [L,l,l,lf,lf,lf,lf,lf,l,ld,lf,lf,lf,lf,lf,lf,lf,ld,l,lf,lf,lf,lf,lf,l,l,L,_,_,_,_,_],
  [_,L,l,l,lf,lf,lf,lf,lf,lf,lf,lf,lf,lf,lf,lf,lf,lf,lf,lf,lf,lf,lf,l,l,L,_,_,_,_,_,_],
  [_,_,L,l,l,lf,lf,lf,lf,lf,lf,lf,l,lf,l,lf,lf,lf,lf,lf,lf,lf,l,l,L,_,_,_,_,_,_,_],
  [_,_,_,L,l,l,lf,lf,l,lf,lf,lf,lf,lf,lf,lf,lf,lf,l,lf,lf,l,l,L,_,_,_,_,_,_,_,_],
  [_,_,_,_,L,l,l,lf,lf,lf,l,lf,lf,lf,lf,lf,l,lf,lf,lf,l,l,L,_,_,_,_,_,_,_,_,_],
  [_,_,_,_,_,L,L,l,l,lf,lf,lf,lf,lf,lf,lf,lf,lf,l,l,L,L,_,_,_,_,_,_,_,_,_,_],
  [_,_,_,_,_,_,L,L,l,l,l,lf,lf,lf,lf,lf,l,l,l,L,L,_,_,_,_,_,_,_,_,_,_,_],
  [_,_,_,_,_,_,_,L,L,l,l,l,l,l,l,l,l,l,L,L,_,_,_,_,_,_,_,_,_,_,_,_],
  [_,_,_,_,_,_,_,_,_,L,L,l,l,l,l,l,L,L,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
  [_,_,_,_,_,_,_,_,_,_,_,T,T,t,t,T,T,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
  [_,_,_,_,_,_,_,_,_,_,_,T,T,t,t,T,T,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
  [_,_,_,_,_,_,_,_,_,_,T,T,T,t,t,T,T,T,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
  [_,_,_,_,_,_,_,_,_,_,T,T,t,t,t,t,T,T,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
  [_,_,_,_,_,_,_,_,_,_,T,T,t,t,t,t,T,T,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
  [_,_,_,_,_,_,_,_,_,_,T,T,t,t,t,t,T,T,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
  [_,_,_,_,_,_,_,_,_,_,T,T,t,t,t,t,T,T,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
  [_,_,_,_,_,_,_,_,_,T,T,T,t,t,t,t,T,T,T,_,_,_,_,_,_,_,_,_,_,_,_,_],
  [_,_,_,_,_,_,_,_,T,T,T,t,t,t,t,t,t,T,T,T,_,_,_,_,_,_,_,_,_,_,_,_],
  [_,_,_,_,_,_,_,T,T,T,t,t,t,t,t,t,t,t,T,T,T,_,_,_,_,_,_,_,_,_,_,_],
  [_,_,_,_,_,_,T,T,T,t,t,t,t,t,t,t,t,t,t,T,T,T,_,_,_,_,_,_,_,_,_,_],
  [_,_,_,_,_,T,T,T,t,t,t,_,_,_,_,_,_,t,t,t,T,T,T,_,_,_,_,_,_,_,_,_],
  [_,_,_,_,T,T,t,t,t,_,_,_,_,_,_,_,_,_,t,t,t,T,T,T,_,_,_,_,_,_,_,_],
  [_,_,_,T,T,t,t,_,_,_,_,_,_,_,_,_,_,_,_,_,t,t,T,T,T,_,_,_,_,_,_,_],
  [_,_,T,T,t,t,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,t,t,T,T,T,_,_,_,_,_,_],
  [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
  [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
];

export const sketch01 = (p, canvasW, canvasH) => {
  let treeBuffer;
  let showGrid = false;

  p.setup = () => {
    p.createCanvas(canvasW, canvasH);
    p.frameRate(30);
    p.noSmooth();
    treeBuffer = renderSprite(p, TREE_SPRITE);
    p.noLoop();
  };

  p.draw = () => {
    p.background(13);

    const rows = TREE_SPRITE.length;
    const cols = TREE_SPRITE[0].length;
    const scale = Math.min((canvasW * 0.8) / cols, (canvasH * 0.8) / rows);
    const treeW = cols * scale;
    const treeH = rows * scale;
    const ox = (canvasW - treeW) / 2;
    const oy = (canvasH - treeH) / 2;

    p.image(treeBuffer, ox, oy, treeW, treeH);

    if (showGrid) {
      p.stroke(255, 40);
      p.strokeWeight(0.5);
      for (let x = 0; x <= cols; x++) {
        p.line(ox + x * scale, oy, ox + x * scale, oy + treeH);
      }
      for (let y = 0; y <= rows; y++) {
        p.line(ox, oy + y * scale, ox + treeW, oy + y * scale);
      }

      const gx = Math.floor((p.mouseX - ox) / scale);
      const gy = Math.floor((p.mouseY - oy) / scale);
      if (gx >= 0 && gx < cols && gy >= 0 && gy < rows && TREE_SPRITE[gy][gx]) {
        p.fill(255, 60);
        p.noStroke();
        p.rect(ox + gx * scale, oy + gy * scale, scale, scale);

        p.fill(255);
        p.textSize(10);
        p.textAlign(p.CENTER);
        p.text(TREE_SPRITE[gy][gx], ox + gx * scale + scale / 2, oy + gy * scale - 4);
      }
    }
  };

  p.mouseMoved = () => {
    const rows = TREE_SPRITE.length;
    const cols = TREE_SPRITE[0].length;
    const scale = Math.min((canvasW * 0.8) / cols, (canvasH * 0.8) / rows);
    const treeW = cols * scale;
    const treeH = rows * scale;
    const ox = (canvasW - treeW) / 2;
    const oy = (canvasH - treeH) / 2;

    const over = p.mouseX >= ox && p.mouseX <= ox + treeW &&
                 p.mouseY >= oy && p.mouseY <= oy + treeH;
    if (over !== showGrid) {
      showGrid = over;
      p.redraw();
    }
  };
};
