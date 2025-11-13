<script lang="ts">
  // Minimal TypeScript script block for the app
</script>

<!-- removed background image layers for a basic template -->

<main>
  <section class="section">
    <div class="section-inner">Section 1</div>
  </section>
  <section class="section">
    <div class="section-inner">Section 2</div>
  </section>
  <section class="section">
    <div class="section-inner">Section 3</div>
  </section>
</main>

<style>
  :global(html), :global(body) { height: 100%; }
  :global(body) { margin: 0; }

  /* No background image layers in this minimal template */

  main { position: relative; z-index: 1; }
  .section { height: 100vh; display: flex; align-items: center; justify-content: center; }
  .section-inner { color: white; font-size: 3rem; text-shadow: 0 2px 8px rgba(0,0,0,0.6); }
</style>
