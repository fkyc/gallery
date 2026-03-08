import p5 from 'p5';
import { initBackground, drawBackground } from './background.js';
import { initCharacters, drawCharacters } from './characters.js';
import { initFairies, updateAndDrawFairies } from './fairies.js';
import { preventCanvasScroll, isTouchDevice } from '../../../shared/utils.js';

const sketch = (p) => {
  let canvas;

  p.setup = () => {
    canvas = p.createCanvas(p.windowWidth, p.windowHeight);
    canvas.parent('sketch-container');
    preventCanvasScroll(canvas);

    if (!isTouchDevice()) {
      p.noCursor();
    }

    p.noSmooth();
    initBackground(p);
    initCharacters(p);
    initFairies(p);
  };

  p.draw = () => {
    drawBackground(p);

    // Scale factor based on canvas size
    const viewScale = Math.min(p.width / 800, p.height / 600);

    drawCharacters(p, viewScale);
    updateAndDrawFairies(p);
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    initBackground(p);
  };

  p.touchStarted = () => false;
  p.touchMoved = () => false;
  p.touchEnded = () => false;
};

new p5(sketch);
