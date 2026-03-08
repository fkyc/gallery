/**
 * Attempt to prevent default on touch events to stop scrolling/zooming on canvas.
 */
export function preventCanvasScroll(canvas) {
  const el = canvas.elt || canvas;
  el.addEventListener('touchstart', (e) => e.preventDefault(), { passive: false });
  el.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false });
}

/**
 * Returns true if the device supports touch.
 */
export function isTouchDevice() {
  return 'ontouchstart' in window;
}

/**
 * Render a pixel-art sprite array to a p5.Graphics buffer.
 * Sprite is a 2D array of hex color strings (null = transparent).
 */
export function renderSprite(p, sprite) {
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
