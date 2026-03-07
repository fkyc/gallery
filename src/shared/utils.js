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
