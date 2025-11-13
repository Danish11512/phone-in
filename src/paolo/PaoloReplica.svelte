<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import gsap from 'gsap'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'

  gsap.registerPlugin(ScrollTrigger)

  let sections: HTMLElement[] = []
  let images: HTMLImageElement[] = []
  let s0!: HTMLElement
  let s1!: HTMLElement
  let s2!: HTMLElement
  let i0!: HTMLImageElement
  let i1!: HTMLImageElement
  let i2!: HTMLImageElement

  onMount(() => {
    sections = [s0, s1, s2]
    images = [i0, i1, i2]

    gsap.set(images, { opacity: 0, xPercent: 0 })
    gsap.set(i0, { opacity: 1, zIndex: 2 })

    const triggers: ScrollTrigger[] = []
    sections.forEach((section, idx) => {
      const next = idx + 1
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top center',
          end: 'bottom center',
          scrub: true,
        }
      })

      if (images[next]) {
        tl.fromTo(images[next], { opacity: 0 }, { opacity: 1, ease: 'none' }, 0)
        tl.to(images[idx], { opacity: 0, ease: 'none' }, 0)
        gsap.set(images[next], { zIndex: 3 })
      }
      if (tl.scrollTrigger) triggers.push(tl.scrollTrigger)
    })
    onDestroy(() => triggers.forEach(t => t.kill()))
  })
</script>

<div class="paolo-wrapper">
  <div class="paolo-bg">
    <img class="paolo-img" bind:this={i0} src="/front.png" alt="front" />
    <img class="paolo-img" bind:this={i1} src="/rear.png" alt="rear" />
    <img class="paolo-img" bind:this={i2} src="/sides.png" alt="sides" />
  </div>
  <main class="paolo-main">
    <section class="paolo-section" bind:this={s0}><h2>Works</h2></section>
    <section class="paolo-section" bind:this={s1}><h2>About</h2></section>
    <section class="paolo-section" bind:this={s2}><h2>Contact</h2></section>
  </main>
</div>

<style>
  :global(html), :global(body) { margin: 0; height: 100%; }
  .paolo-wrapper { min-height: 100vh; }
  .paolo-bg { position: fixed; inset: 0; z-index: -1; background: #000; }
  .paolo-img { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); max-width: 60vw; height: auto; }
  .paolo-main { position: relative; z-index: 1; }
  .paolo-section { height: 100vh; display:flex; align-items:center; justify-content:center; color:#fff; font-size: 2.5rem; }
</style>
