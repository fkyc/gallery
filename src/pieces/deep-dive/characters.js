// DK and Pauline pixel-art sprites + mouse-follow + speed lines
import { isTouchDevice, renderSprite } from '../../shared/utils.js';
import { getTunnelCenter, getInnermostRadius } from './tunnel.js';

const _ = null;

// DK colors
const Br = '#6b3a1a'; // brown fur dark
const br = '#8b5e3c'; // brown fur mid
const bl = '#a07048'; // brown fur light
const Sk = '#d4a060'; // skin (face/hands)
const Rd = '#cc2020'; // red (necktie)
const Bk = '#1a1a1a'; // black (eyes/outline)

// Pauline colors
const Rp = '#cc2030'; // red dress
const Rpl = '#e04050'; // dress highlight
const Rpd = '#a01828'; // dress shadow
const Ha = '#301818'; // dark hair
const Hal = '#4a2828'; // hair highlight
const Sp = '#f0c8a0'; // skin
const Sh = '#d8a880'; // skin shadow
const Lb = '#e08090'; // lips

// DK diving sprite (~20x24)
const DK_SPRITE = [
  [_,_,_,_,_,_,_,Br,Br,Br,Br,Br,_,_,_,_,_,_,_,_],
  [_,_,_,_,_,_,Br,br,br,br,br,Br,Br,_,_,_,_,_,_,_],
  [_,_,_,_,_,Br,br,bl,bl,bl,br,br,Br,_,_,_,_,_,_,_],
  [_,_,_,_,_,Br,br,bl,bl,bl,bl,br,Br,_,_,_,_,_,_,_],
  [_,_,_,_,Br,br,Sk,Sk,Sk,Sk,Sk,Sk,br,Br,_,_,_,_,_,_],
  [_,_,_,_,Br,Sk,Sk,Bk,Sk,Sk,Bk,Sk,Sk,Br,_,_,_,_,_,_],
  [_,_,_,_,Br,Sk,Sk,Sk,Sk,Sk,Sk,Sk,Sk,Br,_,_,_,_,_,_],
  [_,_,_,_,_,Br,Sk,Sk,Bk,Bk,Sk,Sk,Br,_,_,_,_,_,_,_],
  [_,_,_,_,_,_,Br,Sk,Sk,Sk,Sk,Br,_,_,_,_,_,_,_,_],
  [_,_,_,_,_,Br,br,br,br,br,br,br,Br,_,_,_,_,_,_,_],
  [_,_,_,_,Br,br,br,Rd,Rd,Rd,Rd,br,br,Br,_,_,_,_,_,_],
  [_,_,_,Br,br,br,Rd,Rd,Rd,Rd,Rd,Rd,br,br,Br,_,_,_,_,_],
  [_,_,Br,br,br,br,Rd,Rd,Rd,Rd,Rd,Rd,br,br,br,Br,_,_,_,_],
  [_,Br,br,br,br,br,br,br,br,br,br,br,br,br,br,br,Br,_,_,_],
  [_,Br,br,Br,br,br,br,br,br,br,br,br,br,br,Br,br,Br,_,_,_],
  [Br,br,Br,_,Br,br,br,br,br,br,br,br,br,Br,_,Br,br,Br,_,_],
  [Sk,Sk,Br,_,_,Br,br,br,br,br,br,br,Br,_,_,Br,Sk,Sk,_,_],
  [Sk,Sk,_,_,_,_,Br,br,br,br,br,Br,_,_,_,_,_,Sk,Sk,_],
  [_,_,_,_,_,_,_,Br,br,br,br,Br,_,_,_,_,_,_,_,_],
  [_,_,_,_,_,_,Br,br,br,br,br,br,Br,_,_,_,_,_,_,_],
  [_,_,_,_,_,Br,br,Br,_,_,Br,br,br,Br,_,_,_,_,_,_],
  [_,_,_,_,Br,br,Br,_,_,_,_,Br,br,Br,_,_,_,_,_,_],
  [_,_,_,Sk,Sk,Sk,_,_,_,_,_,_,Sk,Sk,Sk,_,_,_,_,_],
  [_,_,_,Sk,Sk,_,_,_,_,_,_,_,_,Sk,Sk,_,_,_,_,_],
];

// Pauline diving sprite (~16x24)
const PAULINE_SPRITE = [
  [_,_,_,_,_,_,Ha,Ha,Ha,Ha,_,_,_,_,_,_],
  [_,_,_,_,_,Ha,Ha,Hal,Hal,Ha,Ha,_,_,_,_,_],
  [_,_,_,_,Ha,Ha,Hal,Hal,Hal,Ha,Ha,Ha,_,_,_,_],
  [_,_,_,_,Ha,Ha,Hal,Hal,Hal,Hal,Ha,Ha,_,_,_,_],
  [_,_,_,_,Ha,Sp,Sp,Sp,Sp,Sp,Sp,Ha,_,_,_,_],
  [_,_,_,_,Ha,Sp,Bk,Sp,Sp,Bk,Sp,Ha,_,_,_,_],
  [_,_,_,_,_,Sp,Sp,Sp,Sp,Sp,Sp,_,_,_,_,_],
  [_,_,_,_,_,Sp,Sp,Lb,Lb,Sp,Sp,_,_,_,_,_],
  [_,_,_,_,_,_,Sh,Sp,Sp,Sh,_,_,_,_,_,_],
  [_,_,_,_,_,Rp,Rp,Rp,Rp,Rp,Rp,_,_,_,_,_],
  [_,_,_,_,Rp,Rpl,Rp,Rp,Rp,Rp,Rpl,Rp,_,_,_,_],
  [_,_,_,Rp,Rpl,Rp,Rp,Rp,Rp,Rp,Rp,Rpl,Rp,_,_,_],
  [_,_,_,Rp,Rp,Rpd,Rp,Rp,Rp,Rp,Rpd,Rp,Rp,_,_,_],
  [_,_,Sp,Rpd,Rp,Rpd,Rp,Rp,Rp,Rp,Rpd,Rp,Rpd,Sp,_,_],
  [_,Sp,Sp,_,Rp,Rp,Rp,Rp,Rp,Rp,Rp,Rp,_,Sp,Sp,_],
  [_,Sp,_,_,_,Rp,Rp,Rp,Rp,Rp,Rp,_,_,_,Sp,_],
  [_,_,_,_,_,_,Rp,Rpd,Rpd,Rp,_,_,_,_,_,_],
  [_,_,_,_,_,_,Rpd,Rp,Rp,Rpd,_,_,_,_,_,_],
  [_,_,_,_,_,Sp,Sp,Rp,Rp,Sp,Sp,_,_,_,_,_],
  [_,_,_,_,_,Sp,Sh,_,_,Sh,Sp,_,_,_,_,_],
  [_,_,_,_,_,Sp,Sp,_,_,Sp,Sp,_,_,_,_,_],
  [_,_,_,_,_,_,Sp,_,_,Sp,_,_,_,_,_,_],
  [_,_,_,_,_,Rp,Rp,_,_,Rp,Rp,_,_,_,_,_],
  [_,_,_,_,_,Rp,_,_,_,_,Rp,_,_,_,_,_],
];

let dkBuffer = null;
let paulineBuffer = null;

let posX, posY;
let targetX, targetY;
let idleAngle = 0;

const isTouch = isTouchDevice();

// Speed line state
const NUM_SPEED_LINES = 6;
let speedLines = [];

function initSpeedLines(p) {
  speedLines = [];
  for (let i = 0; i < NUM_SPEED_LINES; i++) {
    speedLines.push({
      x: p.random(-40, 40),
      y: p.random(-80, 80),
      len: p.random(15, 40),
      speed: p.random(4, 8),
    });
  }
}

export function initCharacters(p) {
  dkBuffer = renderSprite(p, DK_SPRITE);
  paulineBuffer = renderSprite(p, PAULINE_SPRITE);
  posX = p.width / 2;
  posY = p.height / 2;
  targetX = posX;
  targetY = posY;
  idleAngle = 0;
  initSpeedLines(p);
}

export function drawCharacters(p) {
  const center = getTunnelCenter();
  const innerR = getInnermostRadius();

  // Update target from input
  if (isTouch) {
    if (p.mouseIsPressed) {
      targetX = p.mouseX;
      targetY = p.mouseY;
    } else {
      idleAngle += 0.008;
      targetX = center.x + Math.sin(idleAngle) * 20;
      targetY = center.y + Math.cos(idleAngle * 0.7) * 15;
    }
  } else {
    targetX = p.mouseX;
    targetY = p.mouseY;
  }

  // Smooth follow
  posX = p.lerp(posX, targetX, 0.08);
  posY = p.lerp(posY, targetY, 0.08);

  // Clamp within tunnel opening
  const dx = posX - center.x;
  const dy = posY - center.y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const clampR = Math.max(innerR * 0.6, 30);
  if (dist > 0 && dist > clampR) {
    posX = center.x + (dx / dist) * clampR;
    posY = center.y + (dy / dist) * clampR;
  }

  // Bobbing
  const bob = Math.sin(p.frameCount * 0.04) * 3;
  const bobDK = Math.sin(p.frameCount * 0.04 + 1) * 3;

  const scale = Math.min(p.width / 800, p.height / 600);
  const charScale = scale * 3;

  // Speed lines (drawn behind characters)
  p.stroke(255, 255, 255, 80);
  p.strokeWeight(1);
  for (const line of speedLines) {
    const lx = posX + line.x;
    const ly = posY + line.y;
    p.line(lx, ly, lx, ly - line.len);
    line.y += line.speed;
    if (line.y > 80) {
      line.y = -80;
      line.x = (Math.random() - 0.5) * 80;
      line.len = 15 + Math.random() * 25;
    }
  }
  p.noStroke();

  // DK — offset left and above
  const dkW = DK_SPRITE[0].length * charScale;
  const dkH = DK_SPRITE.length * charScale;
  const dkX = posX - dkW / 2 - dkW * 0.3;
  const dkY = posY - dkH / 2 + bobDK - 5;

  p.push();
  p.noSmooth();
  p.image(dkBuffer, dkX, dkY, dkW, dkH);
  p.pop();

  // Pauline — offset right and below
  const pW = PAULINE_SPRITE[0].length * charScale;
  const pH = PAULINE_SPRITE.length * charScale;
  const pX = posX - pW / 2 + pW * 0.3;
  const pY = posY - pH / 2 + bob + 5;

  p.push();
  p.noSmooth();
  p.image(paulineBuffer, pX, pY, pW, pH);
  p.pop();
}
