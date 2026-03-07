import p5 from 'p5';
import { initBackground, drawBackground } from './background.js';
import { initCharacters, drawCharacters } from './characters.js';
import {
  initFairies,
  updateAndDrawFairies,
  handleTouchStart,
  handleTouchMoved,
  handleTouchEnded,
} from './fairies.js';
import { preventCanvasScroll, isTouchDevice } from '../../shared/utils.js';

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
    const scale = Math.min(p.width / 800, p.height / 600);

    drawCharacters(p, scale);
    updateAndDrawFairies(p);
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    initBackground(p);
  };

  p.touchStarted = () => {
    handleTouchStart(p);
    return false; // prevent default
  };

  p.touchMoved = () => {
    handleTouchMoved(p);
    return false;
  };

  p.touchEnded = () => {
    handleTouchEnded(p);
    return false;
  };
};

new p5(sketch);
