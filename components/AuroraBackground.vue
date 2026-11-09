<script setup lang="ts">
// Fond « aurora » : trois taches de couleur floues qui dérivent lentement,
// surmontées d'une grille subtile et d'un léger grain. Purement décoratif.
</script>

<template>
  <div class="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink-950" aria-hidden="true">
    <!-- Taches lumineuses.
         Soft edges come from a radial gradient, NOT `filter: blur()`: a blur
         filter on a ~1000px element (55vw on desktop) is re-rasterised every
         animation frame and was the main cause of jank on large screens.
         A gradient is painted once, then the GPU only moves the layer
         (`will-change: transform`). -->
    <div
      class="aurora-blob absolute -left-[10%] -top-[20%] h-[55vw] w-[55vw] animate-aurora-1"
      style="--c: rgba(167, 139, 250, 0.3)"
    />
    <div
      class="aurora-blob absolute right-[-15%] top-[10%] h-[50vw] w-[50vw] animate-aurora-2"
      style="--c: rgba(34, 211, 238, 0.25)"
    />
    <div
      class="aurora-blob absolute bottom-[-25%] left-[20%] h-[55vw] w-[55vw] animate-aurora-3"
      style="--c: rgba(99, 102, 241, 0.25)"
    />

    <!-- Grille discrète -->
    <div
      class="absolute inset-0 opacity-[0.18]"
      style="
        background-image:
          linear-gradient(to right, rgba(255, 255, 255, 0.06) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255, 255, 255, 0.06) 1px, transparent 1px);
        background-size: 64px 64px;
        mask-image: radial-gradient(ellipse 80% 60% at 50% 30%, #000 40%, transparent 100%);
      "
    />

    <!-- Vignette pour le contraste du texte -->
    <div
      class="absolute inset-0"
      style="background: radial-gradient(ellipse 90% 70% at 50% 0%, transparent 40%, rgba(7, 7, 11, 0.85) 100%)"
    />
  </div>
</template>

<style scoped>
/* Blurred-looking blob: colour `--c` at the centre fading to transparent,
   which mimics the former `rounded-full` + `blur()` look at a fraction of the
   cost. Promoted to its own compositor layer so the drift animation (transform
   only) never triggers a repaint. */
.aurora-blob {
  background: radial-gradient(circle closest-side, var(--c), transparent);
  will-change: transform;
}
</style>
