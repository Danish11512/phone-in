/*
 * Template TypeScript file
 * - Minimal DOM setup
 * - Demonstrates a simple animation using requestAnimationFrame
 * - Replace or import additional modules from here
 */

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import SimplexNoise from 'simplex-noise'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

export function init(): void {
  const content = document.querySelector('#content') as HTMLElement | null
  if (!content) return

  /* Make some circles with noise */
  const simplex = new SimplexNoise()
  const circles: HTMLElement[] = []
  for (let i = 0; i < 5000; i++) {
    const div = document.createElement('div')
    div.classList.add('circle')
    const n1 = simplex.noise2D(i * 0.003, i * 0.0033)
    const n2 = simplex.noise2D(i * 0.002, i * 0.001)
    const style = {
      transform: `translate(${n2 * 200}px) rotate(${n2 * 270}deg) scale(${3 + n1 * 2}, ${3 + n2 * 2})`,
      boxShadow: `0 0 0 .2px hsla(${Math.floor(i * 0.3)}, 70%, 70%, .6)`,
    }
    Object.assign(div.style, style)
    content.appendChild(div)
    circles.push(div)
  }

  const Circles = content.querySelectorAll<HTMLElement>('.circle')

  // find a wrapper element; prefer #wrapper, fallback to #app if present
  const wrapperEl = document.getElementById('wrapper') || document.getElementById('app')
  const scrollerSmoother: any = ScrollSmoother.create({
    content: content,
    wrapper: wrapperEl || '#wrapper',
    smooth: 1,
    effects: false,
  })
  ;(window as any).__scrollerSmoother = scrollerSmoother

  const main = gsap.timeline({
    scrollTrigger: {
      trigger: content,
      scrub: 0.7,
      start: 'top 25%',
      end: 'bottom bottom',
    },
  })

  Circles.forEach((circle) => main.to(circle as HTMLElement, { opacity: 1 }))
}

export default init
