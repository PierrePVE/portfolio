<script setup lang="ts">
const year = new Date().getFullYear()

// Translated copy (see locales/*.ts).
const { t } = useLocale()
</script>

<template>
  <footer class="relative border-t border-white/5 py-10">
    <div class="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 sm:flex-row">
      <div class="flex items-center gap-2.5">
        <span class="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-glow-violet to-glow-cyan font-display text-xs font-bold text-ink-950">PV</span>
        <span class="text-sm text-slate-400">Pierre Van Elsuve</span>
      </div>
      <p class="text-sm text-slate-500">© {{ year }} — {{ t.footer.credits }}</p>
      <div class="flex items-center gap-5">
        <a
          href="https://github.com/PierrePVE"
          target="_blank"
          rel="noopener"
          class="text-sm text-slate-400 transition-colors hover:text-white"
          >GitHub ↗</a
        >
        <a href="#top" class="text-sm text-slate-400 transition-colors hover:text-white">{{ t.footer.backToTop }}</a>
      </div>
    </div>
  </footer>
</template>
