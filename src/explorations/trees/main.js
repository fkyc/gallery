import p5 from 'p5';
import { sketch01 } from './sketches/01-pixel-sprite.js';
import { sketch02 } from './sketches/02-recursive-fractal.js';
import { sketch03 } from './sketches/03-l-system.js';
import { sketch04 } from './sketches/04-space-colonization.js';
import { sketch05 } from './sketches/05-particle-flow.js';
import { sketch06 } from './sketches/06-noise-silhouette.js';
import { sketch07 } from './sketches/07-bezier-spline.js';
import { sketch08 } from './sketches/08-recursive-polygon.js';
import { sketch09 } from './sketches/09-animated-growth.js';
import { sketch10 } from './sketches/10-seasonal.js';

const sketches = [
  sketch01, sketch02, sketch03, sketch04, sketch05,
  sketch06, sketch07, sketch08, sketch09, sketch10,
];

sketches.forEach((sketchFn, i) => {
  const id = String(i + 1).padStart(2, '0');
  const container = document.querySelector(`#demo-${id} .canvas-wrap`);
  if (container) {
    const w = container.clientWidth;
    const h = container.clientHeight;
    new p5((p) => sketchFn(p, w, h), container);
  }
});
