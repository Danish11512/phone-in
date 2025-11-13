/*
 * Template JavaScript file
 * - Minimal DOM setup
 * - Demonstrates a simple animation using requestAnimationFrame
 * - Replace or import additional modules from here
 */

export function init() {
  const wrapper = document.querySelector('#wrapper')
  if (!wrapper) return

  const el = document.createElement('div')
  el.id = 'hello'
  el.textContent = 'Hello from template.js (JavaScript)'
  wrapper.appendChild(el)

  let start = performance.now()
  function tick(now) {
    const t = (now - start) / 1000
    el.style.transform = `translateY(${Math.sin(t) * 8}px)`
    requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}

export default init
