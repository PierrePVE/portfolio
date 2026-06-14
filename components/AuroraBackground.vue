<script setup lang="ts">
// Fond « aurora » : trois taches de couleur floutées qui dérivent lentement,
// surmontées d'une grille subtile et d'un léger grain. Purement décoratif.
</script>

<template>
  <div class="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink-950" aria-hidden="true">
    <!-- Taches lumineuses -->
    <div
      class="absolute -left-[10%] -top-[20%] h-[55vw] w-[55vw] rounded-full bg-glow-violet/30 blur-[120px] animate-aurora-1"
    />
    <div
      class="absolute right-[-15%] top-[10%] h-[50vw] w-[50vw] rounded-full bg-glow-cyan/25 blur-[130px] animate-aurora-2"
    />
    <div
      class="absolute bottom-[-25%] left-[20%] h-[55vw] w-[55vw] rounded-full bg-accent-500/25 blur-[140px] animate-aurora-3"
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
