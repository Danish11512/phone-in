<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import gsap from 'gsap'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'

  gsap.registerPlugin(ScrollTrigger)

  let sectionEls: HTMLElement[] = []
  let bgEls: HTMLElement[] = []
  let s0!: HTMLElement
  let s1!: HTMLElement
  let s2!: HTMLElement
  let bg0!: HTMLElement
  let bg1!: HTMLElement
  let bg2!: HTMLElement

  onMount(() => {
    // Populate arrays from bound vars
    sectionEls = [s0, s1, s2]
    bgEls = [bg0, bg1, bg2]

    // Set initial state
    bgEls.forEach((el, idx) => gsap.set(el, { opacity: idx === 0 ? 1 : 0 }))
    const triggers: ScrollTrigger[] = []

    // For each section we create a tween that fades the corresponding
    // background into view while the section is centered in the viewport.
    sectionEls.forEach((section, i) => {
      const trigger = ScrollTrigger.create({
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        scrub: true,
        // Use onEnter/onLeave to update state but using a tween per bg is simpler.
      })

      // Create a tween that fades the associated background in while this
      // section is centered (scrub synchronized with scroll).
      gsap.to(bgEls[i], {
        opacity: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top center',
          end: 'bottom center',
          scrub: true,
        },
      })

      triggers.push(trigger)
    })

    onDestroy(() => triggers.forEach(t => t.kill()))
  })
</script>

<div class="bg-wrapper" aria-hidden="true">
  <div class="bg" bind:this={bg0} style="background-image: url('/bg1.svg')"></div>
  <div class="bg" bind:this={bg1} style="background-image: url('/bg2.svg')"></div>
  <div class="bg" bind:this={bg2} style="background-image: url('/bg3.svg')"></div>
</div>

<main>
  <section class="section" bind:this={s0}>
    <div class="section-inner">Section 1</div>
  </section>
  <section class="section" bind:this={s1}>
    <div class="section-inner">Section 2</div>
  </section>
  <section class="section" bind:this={s2}>
    <div class="section-inner">Section 3</div>
  </section>
</main>

<style>
  :global(html), :global(body) { height: 100%; }
  :global(body) { margin: 0; }

  .bg-wrapper { position: fixed; inset: 0; z-index: -1; overflow: hidden; }
  .bg { position: absolute; inset: 0; background-size: cover; background-position: center; opacity: 0; transition: opacity 0.2s linear; }

  main { position: relative; z-index: 1; }
  .section { height: 100vh; display: flex; align-items: center; justify-content: center; }
  .section-inner { color: white; font-size: 3rem; text-shadow: 0 2px 8px rgba(0,0,0,0.6); }
</style>
