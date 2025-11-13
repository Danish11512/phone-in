<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import gsap from 'gsap'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'
  import { ScrollSmoother } from 'gsap/ScrollSmoother'
  import SimplexNoise from 'simplex-noise'

  gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

  let wrapper: HTMLElement
  let content: HTMLElement

  let circles: HTMLElement[] = []
  let smoother: any
  let mainTl: any

  // removed openCodePenCopy (button removed from UI)

  onMount(() => {
    const simplex = new SimplexNoise()
    for (let i = 0; i < 5000; i++) {
      const div = document.createElement('div')
      div.classList.add('circle')
      const n1 = simplex.noise2D(i * 0.003, i * 0.0033)
      const n2 = simplex.noise2D(i * 0.002, i * 0.001)
      const style = {
        transform: `translate(${n2 * 200}px) rotate(${n2 * 270}deg) scale(${3 + n1 * 2}, ${3 + n2 * 2})`,
        boxShadow: `0 0 0 .2px hsla(${Math.floor(i*0.3)}, 70%, 70%, .6)`
      }
      Object.assign(div.style, style)
      content.appendChild(div)
      circles.push(div)
    }

    smoother = ScrollSmoother.create({
      content: content,
      wrapper: wrapper,
      smooth: 1,
      effects: false
    })

    mainTl = gsap.timeline({
      scrollTrigger: {
        trigger: content,
        scrub: 0.7,
        start: 'top 25%',
        end: 'bottom bottom'
      }
    })

    circles.forEach((c) => {
      mainTl.to(c, { opacity: 1 }, 0)
    })
  })

  onDestroy(() => {
    if (smoother) smoother.kill()
    if (mainTl) mainTl.kill()
    circles.forEach((c) => c.remove())
    circles = []
  })
</script>

<div id="wrapper" bind:this={wrapper}>
  <div id="content" bind:this={content}>
    <div class="scroll">
      <span>SCROLL</span>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <line class="st1" x1="12" y1="1" x2="12" y2="22.5" />
        <line class="st1" x1="12.1" y1="22.4" x2="18.9" y2="15.6" />
        <line class="st1" x1="11.9" y1="22.4" x2="5.1" y2="15.6" />
      </svg>
    </div>
  </div>
</div>

<style>
  /* No app controls */
</style>
