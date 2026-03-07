// Young Link + Skull Kid pixel art sprites as code arrays + gaze logic
import { getTarget } from './fairies.js';

const _ = null; // transparent
const G = '#2d8a3e'; // green (hat/tunic)
const g = '#3aaf50'; // light green
const Y = '#e8c840'; // yellow (hair)
const S = '#f0d8a0'; // skin
const B = '#4060c0'; // blue (tunic dark)
const b = '#5080e0'; // blue light
const W = '#ffffff'; // white (eyes)
const K = '#1a1a1a'; // black (outline/pupils)
const Br = '#8b5e3c'; // brown (belt/boots)
const Bt = '#6b4226'; // boot dark

// Skull Kid colors
const O = '#d08030'; // orange body
const o = '#c06020'; // dark orange
const M = '#e04050'; // mask red
const P = '#8040c0'; // mask purple
const Mg = '#40b060'; // mask green
const My = '#e8d040'; // mask yellow
const Mw = '#f0e0c0'; // mask base
const Sh = '#705030'; // straw hat

// -- Young Link sitting sprite (24x28) --
// Sitting cross-legged, facing forward, green cap, yellow hair, blue tunic
const LINK_SPRITE = [
  // Row 0-3: Hat top
  [_,_,_,_,_,_,_,_,_,_,G,G,G,G,G,_,_,_,_,_,_,_,_,_],
  [_,_,_,_,_,_,_,_,_,G,G,g,g,G,G,G,_,_,_,_,_,_,_,_],
  [_,_,_,_,_,_,_,_,G,G,g,g,g,G,G,G,G,_,_,_,_,_,_,_],
  [_,_,_,_,_,_,_,G,G,g,g,g,g,G,G,G,G,G,_,_,_,_,_,_],
  // Row 4-5: Hat brim + hair
  [_,_,_,_,_,_,G,G,G,G,G,G,G,G,G,G,G,G,G,_,_,_,_,_],
  [_,_,_,_,_,_,Y,Y,Y,Y,Y,Y,Y,Y,Y,Y,Y,Y,_,_,_,_,_,_],
  // Row 6-7: Hair + forehead
  [_,_,_,_,_,Y,Y,Y,Y,S,S,S,S,S,S,Y,Y,Y,Y,_,_,_,_,_],
  [_,_,_,_,_,Y,Y,Y,S,S,S,S,S,S,S,S,Y,Y,Y,_,_,_,_,_],
  // Row 8-9: Eyes (columns 8-10 = left eye, 13-15 = right eye)
  [_,_,_,_,_,Y,Y,S,S,W,W,W,S,W,W,W,S,Y,Y,_,_,_,_,_],
  [_,_,_,_,_,Y,Y,S,S,W,W,W,S,W,W,W,S,Y,Y,_,_,_,_,_],
  // Row 10-11: Nose + mouth
  [_,_,_,_,_,_,Y,S,S,S,S,S,S,S,S,S,S,Y,_,_,_,_,_,_],
  [_,_,_,_,_,_,_,S,S,S,S,Br,S,S,S,S,S,_,_,_,_,_,_,_],
  [_,_,_,_,_,_,_,S,S,S,S,S,S,S,S,S,S,_,_,_,_,_,_,_],
  // Row 13: Neck
  [_,_,_,_,_,_,_,_,S,S,S,S,S,S,S,S,_,_,_,_,_,_,_,_],
  // Row 14-17: Tunic body
  [_,_,_,_,_,_,G,G,G,G,G,G,G,G,G,G,G,G,_,_,_,_,_,_],
  [_,_,_,_,_,G,G,G,G,G,G,G,G,G,G,G,G,G,G,_,_,_,_,_],
  [_,_,_,_,S,G,G,G,G,Br,Br,Br,Br,Br,G,G,G,G,S,_,_,_,_,_],
  [_,_,_,_,S,G,G,G,B,B,B,B,B,B,B,G,G,G,S,_,_,_,_,_],
  // Row 18-19: Belt + lower tunic
  [_,_,_,_,_,S,G,G,B,B,B,B,B,B,B,G,G,S,_,_,_,_,_,_],
  [_,_,_,_,_,_,G,B,B,b,b,b,b,b,B,B,G,_,_,_,_,_,_,_],
  // Row 20-23: Sitting legs (cross-legged)
  [_,_,_,_,_,G,G,B,b,b,b,b,b,b,b,B,G,G,_,_,_,_,_,_],
  [_,_,_,_,G,G,B,b,b,b,_,_,_,b,b,b,B,G,G,_,_,_,_,_],
  [_,_,_,G,G,Br,Br,b,b,_,_,_,_,_,b,b,Br,Br,G,G,_,_,_,_],
  [_,_,_,Bt,Bt,Br,Br,_,_,_,_,_,_,_,_,_,Br,Br,Bt,Bt,_,_,_,_],
  // Row 24-27: Boots at bottom
  [_,_,Bt,Bt,Bt,Br,_,_,_,_,_,_,_,_,_,_,_,Br,Bt,Bt,Bt,_,_,_],
  [_,_,Bt,Bt,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,Bt,Bt,_,_],
  [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
  [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
];

// Eye regions in sprite coordinates (col, row)
const LINK_LEFT_EYE = { cx: 10, cy: 9, r: 1 };  // center of left eye
const LINK_RIGHT_EYE = { cx: 14, cy: 9, r: 1 }; // center of right eye

// -- Skull Kid sitting sprite (24x28) --
const SKULL_KID_SPRITE = [
  // Row 0-2: Straw hat
  [_,_,_,_,_,_,_,_,Sh,Sh,Sh,Sh,Sh,Sh,Sh,Sh,_,_,_,_,_,_,_,_],
  [_,_,_,_,_,_,_,Sh,Sh,Sh,Sh,Sh,Sh,Sh,Sh,Sh,Sh,_,_,_,_,_,_,_],
  [_,_,_,_,_,_,Sh,Sh,Sh,Sh,Sh,Sh,Sh,Sh,Sh,Sh,Sh,Sh,_,_,_,_,_,_],
  // Row 3-4: Hat brim
  [_,_,_,_,_,Sh,Sh,Sh,Sh,Sh,Sh,Sh,Sh,Sh,Sh,Sh,Sh,Sh,Sh,_,_,_,_,_],
  [_,_,_,_,Sh,Sh,Sh,Sh,Sh,Sh,Sh,Sh,Sh,Sh,Sh,Sh,Sh,Sh,Sh,Sh,_,_,_,_],
  // Row 5-9: Majora's Mask (heart-shaped, colorful)
  [_,_,_,_,_,_,_,M,M,Mw,Mw,Mw,Mw,Mw,Mw,M,M,_,_,_,_,_,_,_],
  [_,_,_,_,_,_,M,M,My,My,Mw,Mw,Mw,My,My,M,M,M,_,_,_,_,_,_],
  [_,_,_,_,_,_,M,P,My,K,K,Mw,K,K,My,P,M,M,_,_,_,_,_,_],
  [_,_,_,_,_,_,_,M,Mg,Mg,Mw,Mw,Mw,Mg,Mg,M,_,_,_,_,_,_,_,_],
  [_,_,_,_,_,_,_,_,M,M,M,M,M,M,M,M,_,_,_,_,_,_,_,_],
  // Row 10-11: Neck
  [_,_,_,_,_,_,_,_,_,O,O,o,o,O,O,_,_,_,_,_,_,_,_,_],
  [_,_,_,_,_,_,_,_,_,O,O,o,o,O,O,_,_,_,_,_,_,_,_,_],
  // Row 12-17: Body (sitting)
  [_,_,_,_,_,_,_,O,O,O,O,O,O,O,O,O,O,_,_,_,_,_,_,_],
  [_,_,_,_,_,_,O,O,O,o,o,O,O,o,o,O,O,O,_,_,_,_,_,_],
  [_,_,_,_,_,O,O,O,o,o,o,o,o,o,o,o,O,O,O,_,_,_,_,_],
  [_,_,_,_,_,o,O,O,o,o,o,o,o,o,o,o,O,O,o,_,_,_,_,_],
  [_,_,_,_,_,_,O,O,O,o,o,o,o,o,o,O,O,O,_,_,_,_,_,_],
  [_,_,_,_,_,_,_,O,O,O,O,O,O,O,O,O,O,_,_,_,_,_,_,_],
  // Row 18-21: Arms + legs sitting
  [_,_,_,_,O,o,_,O,O,O,o,o,o,O,O,O,_,o,O,_,_,_,_,_],
  [_,_,_,O,o,o,_,_,O,o,o,_,o,o,O,_,_,o,o,O,_,_,_,_],
  [_,_,_,o,o,_,_,O,o,o,_,_,_,_,o,o,O,_,_,o,o,_,_,_],
  [_,_,_,_,_,_,Br,Br,o,_,_,_,_,_,_,o,Br,Br,_,_,_,_,_,_],
  // Row 22-27: Feet
  [_,_,_,_,_,Br,Br,Br,_,_,_,_,_,_,_,_,Br,Br,Br,_,_,_,_,_],
  [_,_,_,_,Br,Br,_,_,_,_,_,_,_,_,_,_,_,_,Br,Br,_,_,_,_],
  [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
  [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
  [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
  [_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
];

// -- Tree sprite (32x40) --
const T = '#5c3a1a'; // trunk
const t = '#7a5030'; // trunk light
const L = '#2e7d32'; // leaf dark
const l = '#4caf50'; // leaf mid
const lf = '#66bb6a'; // leaf light
const ld = '#1b5e20'; // leaf deep shadow

const TREE_SPRITE = [
  // Row 0-3: Tree top canopy
  [_,_,_,_,_,_,_,_,_,_,_,L,L,l,l,l,l,l,L,L,_,_,_,_,_,_,_,_,_,_,_,_],
  [_,_,_,_,_,_,_,_,_,L,L,l,l,lf,lf,lf,lf,l,l,L,L,_,_,_,_,_,_,_,_,_,_,_],
  [_,_,_,_,_,_,_,L,L,l,l,lf,lf,lf,lf,lf,lf,lf,l,l,L,L,_,_,_,_,_,_,_,_,_,_],
  [_,_,_,_,_,_,L,l,l,lf,lf,lf,lf,lf,lf,lf,lf,lf,lf,l,l,L,_,_,_,_,_,_,_,_,_,_],
  // Row 4-7: Upper canopy
  [_,_,_,_,_,L,l,lf,lf,lf,lf,lf,lf,lf,lf,lf,lf,lf,lf,lf,l,L,_,_,_,_,_,_,_,_,_,_],
  [_,_,_,_,L,l,lf,lf,lf,lf,lf,l,lf,lf,lf,l,lf,lf,lf,lf,lf,l,L,_,_,_,_,_,_,_,_,_],
  [_,_,_,L,l,lf,lf,lf,l,lf,lf,lf,lf,lf,lf,lf,lf,lf,l,lf,lf,lf,l,L,_,_,_,_,_,_,_,_],
  [_,_,L,l,lf,lf,lf,lf,lf,lf,l,ld,l,lf,lf,l,ld,l,lf,lf,lf,lf,lf,l,L,_,_,_,_,_,_,_],
  // Row 8-11: Middle canopy
  [_,_,L,l,lf,lf,lf,l,lf,lf,lf,lf,lf,lf,lf,lf,lf,lf,lf,l,lf,lf,lf,l,L,_,_,_,_,_,_,_],
  [_,L,l,lf,lf,l,lf,lf,lf,lf,lf,lf,l,lf,l,lf,lf,lf,lf,lf,lf,l,lf,lf,l,L,_,_,_,_,_,_],
  [_,L,l,lf,lf,lf,lf,lf,l,ld,l,lf,lf,lf,lf,lf,l,ld,l,lf,lf,lf,lf,lf,l,L,_,_,_,_,_,_],
  [_,L,l,lf,lf,lf,lf,lf,lf,lf,lf,lf,lf,lf,lf,lf,lf,lf,lf,lf,lf,lf,lf,lf,l,L,_,_,_,_,_,_],
  // Row 12-15: Lower canopy
  [L,l,lf,lf,l,lf,lf,lf,lf,lf,lf,l,lf,lf,lf,l,lf,lf,lf,lf,lf,l,lf,lf,lf,l,L,_,_,_,_,_],
  [L,l,lf,lf,lf,lf,l,lf,lf,lf,lf,lf,lf,lf,lf,lf,lf,lf,lf,l,lf,lf,lf,lf,lf,l,L,_,_,_,_,_],
  [L,l,l,lf,lf,lf,lf,lf,l,ld,lf,lf,lf,lf,lf,lf,lf,ld,l,lf,lf,lf,lf,lf,l,l,L,_,_,_,_,_],
  [_,L,l,l,lf,lf,lf,lf,lf,lf,lf,lf,lf,lf,lf,lf,lf,lf,lf,lf,lf,lf,lf,l,l,L,_,_,_,_,_,_],
  // Row 16-19: Bottom canopy
  [_,_,L,l,l,lf,lf,lf,lf,lf,lf,lf,l,lf,l,lf,lf,lf,lf,lf,lf,lf,l,l,L,_,_,_,_,_,_,_],
  [_,_,_,L,l,l,lf,lf,l,lf,lf,lf,lf,lf,lf,lf,lf,lf,l,lf,lf,l,l,L,_,_,_,_,_,_,_,_],
  [_,_,_,_,L,l,l,lf,lf,lf,l,lf,lf,lf,lf,lf,l,lf,lf,lf,l,l,L,_,_,_,_,_,_,_,_,_],
  [_,_,_,_,_,L,L,l,l,lf,lf,lf,lf,lf,lf,lf,lf,lf,l,l,L,L,_,_,_,_,_,_,_,_,_,_],
  // Row 20-23: Bottom canopy + trunk starts
  [_,_,_,_,_,_,L,L,l,l,l,lf,lf,lf,lf,lf,l,l,l,L,L,_,_,_,_,_,_,_,_,_,_,_],
  [_,_,_,_,_,_,_,L,L,l,l,l,l,l,l,l,l,l,L,L,_,_,_,_,_,_,_,_,_,_,_,_],
  [_,_,_,_,_,_,_,_,_,L,L,l,l,l,l,l,L,L,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
  [_,_,_,_,_,_,_,_,_,_,_,T,T,t,t,T,T,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
  // Row 24-31: Trunk
  [_,_,_,_,_,_,_,_,_,_,_,T,T,t,t,T,T,_,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
  [_,_,_,_,_,_,_,_,_,_,T,T,T,t,t,T,T,T,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
  [_,_,_,_,_,_,_,_,_,_,T,T,t,t,t,t,T,T,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
  [_,_,_,_,_,_,_,_,_,_,T,T,t,t,t,t,T,T,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
  [_,_,_,_,_,_,_,_,_,_,T,T,t,t,t,t,T,T,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
  [_,_,_,_,_,_,_,_,_,_,T,T,t,t,t,t,T,T,_,_,_,_,_,_,_,_,_,_,_,_,_,_],
  [_,_,_,_,_,_,_,_,_,T,T,T,t,t,t,t,T,T,T,_,_,_,_,_,_,_,_,_,_,_,_,_],
  // Row 31-35: Trunk base + roots
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

// Pre-rendered buffers
let linkBuffer = null;
let skullKidBuffer = null;
let treeBuffer = null;

// Gaze tracking state
let pupilOffsetX = 0;
let pupilOffsetY = 0;

function renderSprite(p, sprite) {
  const rows = sprite.length;
  const cols = sprite[0].length;
  const buf = p.createGraphics(cols, rows);
  buf.pixelDensity(1);
  buf.loadPixels();
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const hex = sprite[y][x];
      if (hex) {
        const c = p.color(hex);
        const idx = (y * cols + x) * 4;
        buf.pixels[idx] = p.red(c);
        buf.pixels[idx + 1] = p.green(c);
        buf.pixels[idx + 2] = p.blue(c);
        buf.pixels[idx + 3] = 255;
      }
    }
  }
  buf.updatePixels();
  return buf;
}

export function initCharacters(p) {
  treeBuffer = renderSprite(p, TREE_SPRITE);
  linkBuffer = renderSprite(p, LINK_SPRITE);
  skullKidBuffer = renderSprite(p, SKULL_KID_SPRITE);
}

export function drawCharacters(p, scale) {
  const grassLine = p.height * 0.72;
  const centerX = p.width / 2;

  // -- Tree --
  const treeScale = scale * 5;
  const treeCols = TREE_SPRITE[0].length;
  const treeRows = TREE_SPRITE.length;
  const treeW = treeCols * treeScale;
  const treeH = treeRows * treeScale;
  const treeX = centerX - treeW / 2;
  const treeY = grassLine - treeH + treeScale * 10; // roots go below grass line

  p.push();
  p.noSmooth();
  p.image(treeBuffer, treeX, treeY, treeW, treeH);
  p.pop();

  // -- Gaze tracking --
  const target = getTarget();
  const charScale = scale * 4;
  const linkCols = LINK_SPRITE[0].length;
  const linkW = linkCols * charScale;
  const linkX = centerX - linkW / 2 - linkW * 0.35;
  const linkY = grassLine - LINK_SPRITE.length * charScale + charScale * 4;

  // Compute gaze direction
  const linkEyeWorldX = linkX + LINK_LEFT_EYE.cx * charScale + (LINK_RIGHT_EYE.cx - LINK_LEFT_EYE.cx) * charScale / 2;
  const linkEyeWorldY = linkY + LINK_LEFT_EYE.cy * charScale;
  const dx = target.x - linkEyeWorldX;
  const dy = target.y - linkEyeWorldY;
  const maxOffset = charScale * 0.8;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const targetPupilX = dist > 0 ? (dx / dist) * Math.min(maxOffset, dist * 0.01) : 0;
  const targetPupilY = dist > 0 ? (dy / dist) * Math.min(maxOffset * 0.6, Math.abs(dy) * 0.01) : 0;
  pupilOffsetX = p.lerp(pupilOffsetX, targetPupilX, 0.1);
  pupilOffsetY = p.lerp(pupilOffsetY, targetPupilY, 0.1);

  // -- Draw Link --
  p.push();
  p.noSmooth();
  p.image(linkBuffer, linkX, linkY, linkW, LINK_SPRITE.length * charScale);
  p.pop();

  // Draw pupils on top of Link sprite
  p.fill(20, 20, 60);
  p.noStroke();
  const pupilSize = charScale * 0.9;
  // Left eye pupil
  const leftPupilX = linkX + LINK_LEFT_EYE.cx * charScale + pupilOffsetX;
  const leftPupilY = linkY + LINK_LEFT_EYE.cy * charScale + pupilOffsetY;
  p.ellipse(leftPupilX, leftPupilY, pupilSize, pupilSize);
  // Right eye pupil
  const rightPupilX = linkX + LINK_RIGHT_EYE.cx * charScale + pupilOffsetX;
  const rightPupilY = linkY + LINK_RIGHT_EYE.cy * charScale + pupilOffsetY;
  p.ellipse(rightPupilX, rightPupilY, pupilSize, pupilSize);

  // -- Draw Skull Kid --
  const skullCols = SKULL_KID_SPRITE[0].length;
  const skullW = skullCols * charScale;
  const skullX = centerX - skullW / 2 + linkW * 0.4;
  const skullY = grassLine - SKULL_KID_SPRITE.length * charScale + charScale * 4;

  // Subtle idle rocking
  const rock = Math.sin(p.frameCount * 0.015) * 1.5;

  p.push();
  p.noSmooth();
  p.translate(skullX + skullW / 2, skullY + SKULL_KID_SPRITE.length * charScale);
  p.rotate(p.radians(rock));
  p.translate(-(skullX + skullW / 2), -(skullY + SKULL_KID_SPRITE.length * charScale));
  p.image(skullKidBuffer, skullX, skullY, skullW, SKULL_KID_SPRITE.length * charScale);
  p.pop();
}
