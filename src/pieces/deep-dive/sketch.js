import p5 from 'p5';
import { initTunnel, drawTunnel } from './tunnel.js';
import { drawGlow } from './glow.js';
import { initCharacters, drawCharacters } from './characters.js';
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
    initTunnel(p);
    initCharacters(p);
  };

  p.draw = () => {
    p.background(0);

    const { glowColor, pulsePhase } = drawTunnel(p);
    drawGlow(p, glowColor, pulsePhase);
    drawCharacters(p);
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    initTunnel(p);
  };

  p.touchStarted = () => false;
  p.touchMoved = () => false;
  p.touchEnded = () => false;
};

new p5(sketch);
