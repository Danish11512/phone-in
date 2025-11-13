/*
 * Template TypeScript file
 * - Minimal DOM setup
 * - Demonstrates a simple animation using requestAnimationFrame
 * - Replace or import additional modules from here
 */

export function init(): void {
  const wrapper = document.querySelector('#wrapper') as HTMLDivElement | null
  if (!wrapper) return

  const el = document.createElement('div')
  el.id = 'hello'
  el.textContent = 'Hello from template.ts (TypeScript)'
  wrapper.appendChild(el)

  let start = performance.now()
  function tick(now: number) {
    const t = (now - start) / 1000
    el.style.transform = `translateY(${Math.sin(t) * 8}px)`
    requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}

// Optionally call init automatically if desired
// init()

export default init
