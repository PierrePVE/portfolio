<script setup lang="ts">
// Section projets : Récurra et Revu en « projets phares » (liens vers les apps
// en ligne), suivis d'une grille de projets secondaires avec effet d'inclinaison 3D.
const config = useRuntimeConfig()
// URL de l'app Récurra liée par le bouton « Ouvrir l'application ».
const recurraUrl = config.public.recurraUrl
// URL de l'app Revu (configurable via NUXT_PUBLIC_REVU_URL).
const revuUrl = config.public.revuUrl

// Translated copy (see locales/*.ts).
const { t } = useLocale()

// Hover gradient of each secondary project card, matched by index to
// t.projects.others. Kept here rather than in the locale files so Tailwind
// (which does not scan locales/) still generates these classes.
const accents = [
  'from-glow-cyan/20 to-transparent',
  'from-glow-pink/20 to-transparent',
  'from-accent-500/20 to-transparent',
  'from-glow-violet/20 to-transparent',
]

const reveal = {
  initial: { opacity: 0, y: 40 },
  visibleOnce: { opacity: 1, y: 0, transition: { duration: 700 } },
}

// Effet d'inclinaison 3D : la carte pivote selon la position du curseur.
// Nécessite un parent `.perspective` et `transform-style: preserve-3d`.
function onTilt(e: MouseEvent) {
  const el = e.currentTarget as HTMLElement
  const r = el.getBoundingClientRect()
  // Position du curseur dans la carte, ramenée à [-0.5, 0.5].
  const px = (e.clientX - r.left) / r.width - 0.5
  const py = (e.clientY - r.top) / r.height - 0.5
  // Rotation max ±8° ; l'axe Y suit X, l'axe X suit Y inversé (effet naturel).
  el.style.transform = `rotateY(${px * 8}deg) rotateX(${-py * 8}deg) translateZ(0)`
}
// Remet la carte à plat quand le curseur la quitte.
function resetTilt(e: MouseEvent) {
  ;(e.currentTarget as HTMLElement).style.transform = ''
}
</script>

<template>
  <section id="projects" class="relative scroll-mt-24 py-28">
    <div class="mx-auto max-w-6xl px-5">
      <div v-motion="reveal" class="max-w-2xl">
        <p class="section-eyebrow"><span class="h-px w-8 bg-accent-300" /> {{ t.projects.eyebrow }}</p>
        <h2 class="section-title">{{ t.projects.title.before }}<span class="text-gradient">{{ t.projects.title.highlight }}</span>{{ t.projects.title.after }}</h2>
      </div>

      <!-- Projet phare : Récurra -->
      <div
        v-motion="reveal"
        class="group relative mt-12 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-ink-800 to-ink-950 p-8 sm:p-10"
      >
        <div class="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-accent-500/20 blur-3xl transition-all duration-700 group-hover:bg-glow-cyan/25" />
        <div class="relative grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <div>
            <div class="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-accent-300">
              <span class="h-1.5 w-1.5 rounded-full bg-emerald-400" /> {{ t.projects.recurra.badge }}
            </div>
            <h3 class="font-display text-3xl font-bold text-white sm:text-4xl">Récurra</h3>
            <p class="mt-3 max-w-lg text-lg leading-relaxed text-slate-400">
              {{ t.projects.recurra.description }}
            </p>
            <ul class="mt-5 flex flex-wrap gap-2">
              <li v-for="t in ['Nuxt 3', 'Vue', 'Prisma', 'PostgreSQL', 'Docker', 'ApexCharts']" :key="t" class="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-300">{{ t }}</li>
            </ul>
            <div class="mt-7 flex flex-wrap gap-3">
              <a :href="recurraUrl" class="btn-primary">
                {{ t.projects.openApp }}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M9 7h8v8" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </a>
            </div>
          </div>

          <!-- Aperçu stylisé -->
          <div class="relative">
            <div class="gradient-border glass overflow-hidden p-4">
              <div class="flex items-center gap-1.5 pb-3">
                <span class="h-2.5 w-2.5 rounded-full bg-glow-pink/70" />
                <span class="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
                <span class="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
              </div>
              <div class="space-y-3 rounded-xl bg-ink-950/60 p-4">
                <div class="flex items-end justify-between gap-3">
                  <div>
                    <div class="h-2 w-16 rounded bg-white/10" />
                    <div class="mt-2 h-5 w-24 rounded bg-white/20" />
                  </div>
                  <div class="flex h-20 items-end gap-1.5">
                    <span class="w-3 rounded-t bg-accent-500/60" style="height: 40%" />
                    <span class="w-3 rounded-t bg-accent-500/80" style="height: 70%" />
                    <span class="w-3 rounded-t bg-glow-violet/80" style="height: 55%" />
                    <span class="w-3 rounded-t bg-glow-cyan/80" style="height: 90%" />
                    <span class="w-3 rounded-t bg-glow-cyan/60" style="height: 60%" />
                  </div>
                </div>
                <div class="grid grid-cols-3 gap-2 pt-1">
                  <div class="rounded-lg bg-white/5 p-2"><div class="h-1.5 w-8 rounded bg-white/15" /><div class="mt-1.5 h-3 w-10 rounded bg-white/25" /></div>
                  <div class="rounded-lg bg-white/5 p-2"><div class="h-1.5 w-8 rounded bg-white/15" /><div class="mt-1.5 h-3 w-10 rounded bg-white/25" /></div>
                  <div class="rounded-lg bg-white/5 p-2"><div class="h-1.5 w-8 rounded bg-white/15" /><div class="mt-1.5 h-3 w-10 rounded bg-white/25" /></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Projet phare : Revu -->
      <div
        v-motion="reveal"
        class="group relative mt-6 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-ink-800 to-ink-950 p-8 sm:p-10"
      >
        <div class="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-emerald-500/15 blur-3xl transition-all duration-700 group-hover:bg-glow-cyan/25" />
        <!-- Colonnes inversées sur desktop pour alterner avec la carte Récurra. -->
        <div class="relative grid gap-8 lg:grid-cols-[1fr_1.3fr] lg:items-center">
          <div class="lg:order-2">
            <div class="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-accent-300">
              <span class="h-1.5 w-1.5 rounded-full bg-emerald-400" /> {{ t.projects.revu.badge }}
            </div>
            <h3 class="font-display text-3xl font-bold text-white sm:text-4xl">Revu</h3>
            <p class="mt-3 max-w-lg text-lg leading-relaxed text-slate-400">
              {{ t.projects.revu.description }}
            </p>
            <ul class="mt-5 flex flex-wrap gap-2">
              <li v-for="t in ['Nuxt', 'Vue', 'Tailwind CSS', 'QR codes', 'Vercel']" :key="t" class="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-300">{{ t }}</li>
            </ul>
            <div class="mt-7 flex flex-wrap gap-3">
              <a :href="revuUrl" class="btn-primary">
                {{ t.projects.openApp }}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M9 7h8v8" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </a>
            </div>
          </div>

          <!-- Aperçu stylisé : note moyenne, répartition des notes et alerte -->
          <div class="relative lg:order-1">
            <div class="gradient-border glass overflow-hidden p-4">
              <div class="flex items-center gap-1.5 pb-3">
                <span class="h-2.5 w-2.5 rounded-full bg-glow-pink/70" />
                <span class="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
                <span class="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
              </div>
              <div class="space-y-3 rounded-xl bg-ink-950/60 p-4">
                <div class="flex items-center justify-between gap-3">
                  <div>
                    <div class="h-2 w-16 rounded bg-white/10" />
                    <div class="mt-2 flex items-baseline gap-2">
                      <span class="font-display text-2xl font-bold text-white">{{ t.projects.revu.rating }}</span>
                      <span class="text-sm tracking-widest text-amber-400">★★★★★</span>
                    </div>
                  </div>
                  <!-- Mini QR code décoratif (cases pleines choisies à la main) -->
                  <div class="grid grid-cols-5 gap-0.5 rounded-md bg-white/10 p-1.5">
                    <span v-for="n in 25" :key="n" class="h-1.5 w-1.5 rounded-[1px]" :class="[1, 2, 3, 5, 6, 8, 11, 13, 15, 17, 19, 21, 22, 23, 25].includes(n) ? 'bg-white/70' : 'bg-transparent'" />
                  </div>
                </div>
                <!-- Répartition des notes, de 5 à 1 étoile -->
                <div class="space-y-1.5">
                  <div v-for="w in [82, 45, 18, 8, 4]" :key="w" class="h-1.5 rounded bg-white/5">
                    <div class="h-full rounded bg-emerald-400/70" :style="{ width: w + '%' }" />
                  </div>
                </div>
                <!-- Alerte « problème récurrent » -->
                <div class="flex items-center gap-2 rounded-lg border border-glow-pink/30 bg-glow-pink/10 px-3 py-2">
                  <span class="h-1.5 w-1.5 rounded-full bg-glow-pink" />
                  <div class="h-2 w-32 rounded bg-white/20" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Autres projets -->
      <div class="perspective mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <article
          v-for="(p, i) in t.projects.others"
          :key="i"
          v-motion="{ initial: { opacity: 0, y: 40 }, visibleOnce: { opacity: 1, y: 0, transition: { duration: 600, delay: i * 90 } } }"
          class="glass group relative overflow-hidden p-6 transition-[transform,border-color] duration-300 will-change-transform hover:border-accent-500/40"
          style="transform-style: preserve-3d"
          @mousemove="onTilt"
          @mouseleave="resetTilt"
        >
          <div class="pointer-events-none absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100" :class="accents[i]" />
          <div class="relative">
            <span class="grid h-10 w-10 place-items-center rounded-xl bg-white/5 text-accent-300">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 9l-3 3 3 3M16 9l3 3-3 3M14 5l-4 14" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </span>
            <h3 class="mt-4 font-display text-base font-semibold text-white">{{ p.name }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-slate-400">{{ p.blurb }}</p>
            <ul class="mt-4 flex flex-wrap gap-1.5">
              <li v-for="s in p.stack" :key="s" class="rounded-md bg-white/5 px-2 py-0.5 text-[11px] text-slate-300">{{ s }}</li>
            </ul>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
