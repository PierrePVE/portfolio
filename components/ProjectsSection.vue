<script setup lang="ts">
// Section projets : Récurra et Revu en « projets phares » (captures des démos,
// liens vers les apps en ligne et leur code), suivis d'une grille de projets
// secondaires avec effet d'inclinaison 3D.
const config = useRuntimeConfig()

// Translated copy (see locales/*.ts).
const { t } = useLocale()

/**
 * URL of a screenshot in public/images/projects/.
 * Prefixed with the base URL: plain hrefs to public files are not rewritten by
 * Nuxt and would break on the /portfolio/ sub-path deployment.
 * @param file - File name inside public/images/projects/.
 * @returns Absolute path including the app base URL.
 */
const shot = (file: string) => `${config.app.baseURL}images/projects/${file}`

// Flagship projects, rendered by a single template. Computed so the copy
// follows the selected language. `reversed` alternates text / visuals columns
// on desktop; `glow` positions and tints the background halo (literal classes
// so Tailwind generates them).
const featured = computed(() => [
  {
    name: 'Récurra',
    // App URL is env-driven (NUXT_PUBLIC_RECURRA_URL): reverse proxy vs Vercel.
    url: config.public.recurraUrl,
    repo: 'https://github.com/PierrePVE/recurra',
    copy: t.value.projects.recurra,
    stack: ['Nuxt 3', 'TypeScript', 'Prisma', 'PostgreSQL', 'Vitest', 'Docker'],
    main: { src: shot('recurra-dashboard.jpg') },
    secondary: { src: shot('recurra-subscriptions.jpg'), phone: false },
    reversed: false,
    glow: '-right-20 bg-accent-500/20',
  },
  {
    name: 'Revu',
    url: config.public.revuUrl,
    repo: 'https://github.com/PierrePVE/revu',
    copy: t.value.projects.revu,
    stack: ['Nuxt 3', 'TypeScript', 'PostgreSQL', 'Tailwind CSS', 'Vercel', 'Neon'],
    main: { src: shot('revu-dashboard.jpg') },
    secondary: { src: shot('revu-review-mobile.jpg'), phone: true },
    reversed: true,
    glow: '-left-20 bg-emerald-500/15',
  },
])

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

      <!-- Projets phares : texte + captures réelles, colonnes alternées d'une carte à l'autre -->
      <div
        v-for="(p, i) in featured"
        :key="p.name"
        v-motion="reveal"
        class="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-ink-800 to-ink-950 p-8 sm:p-10"
        :class="i === 0 ? 'mt-12' : 'mt-6'"
      >
        <div class="pointer-events-none absolute -top-20 h-72 w-72 rounded-full blur-3xl transition-all duration-700 group-hover:bg-glow-cyan/25" :class="p.glow" />
        <div
          class="relative grid gap-10 lg:items-center"
          :class="p.reversed ? 'lg:grid-cols-[1.15fr_1fr]' : 'lg:grid-cols-[1fr_1.15fr]'"
        >
          <div :class="{ 'lg:order-2': p.reversed }">
            <div class="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-accent-300">
              <span class="h-1.5 w-1.5 rounded-full bg-emerald-400" /> {{ p.copy.badge }}
            </div>
            <h3 class="font-display text-3xl font-bold text-white sm:text-4xl">{{ p.name }}</h3>
            <p class="mt-3 text-lg leading-relaxed text-slate-400">{{ p.copy.description }}</p>

            <!-- What was actually solved, not just what the app does. -->
            <ul class="mt-5 space-y-2.5">
              <li v-for="h in p.copy.highlights" :key="h" class="flex gap-2.5 text-sm leading-relaxed text-slate-300">
                <svg class="mt-0.5 shrink-0 text-accent-300" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12l5 5L19 8" stroke-linecap="round" stroke-linejoin="round" /></svg>
                <span>{{ h }}</span>
              </li>
            </ul>

            <ul class="mt-5 flex flex-wrap gap-2">
              <li v-for="tech in p.stack" :key="tech" class="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-300">{{ tech }}</li>
            </ul>

            <!-- New tab: visitors keep the portfolio open behind the app / repo. -->
            <div class="mt-7 flex flex-wrap gap-3">
              <a :href="p.url" target="_blank" rel="noopener" class="btn-primary">
                {{ t.projects.openApp }}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M9 7h8v8" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </a>
              <a :href="p.repo" target="_blank" rel="noopener" class="btn-ghost">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49v-1.7c-2.78.62-3.37-1.37-3.37-1.37-.46-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.57 2.34 1.12 2.91.85.09-.66.35-1.12.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.3 9.3 0 0112 6.84c.85 0 1.71.12 2.51.34 1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9v2.81c0 .27.18.6.69.49A10.1 10.1 0 0022 12.25C22 6.58 17.52 2 12 2z"/></svg>
                {{ t.projects.sourceCode }}
              </a>
            </div>
          </div>

          <!-- Captures : écran principal dans un cadre de navigateur + écran secondaire superposé -->
          <div class="relative" :class="[{ 'lg:order-1': p.reversed }, p.secondary.phone ? 'pr-6 sm:pr-10' : 'pb-6 sm:pb-10']">
            <div class="gradient-border glass overflow-hidden p-2">
              <div class="flex items-center gap-1.5 px-2 pb-2 pt-1">
                <span class="h-2.5 w-2.5 rounded-full bg-glow-pink/70" />
                <span class="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
                <span class="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
              </div>
              <img
                :src="p.main.src"
                :alt="p.copy.alt.main"
                width="1440"
                height="900"
                loading="lazy"
                decoding="async"
                class="aspect-[16/10] w-full rounded-lg object-cover object-top"
              >
            </div>
            <!-- Phone frame (Revu's customer page) or smaller desktop window (Récurra's list). -->
            <img
              v-if="p.secondary.phone"
              :src="p.secondary.src"
              :alt="p.copy.alt.secondary"
              width="390"
              height="694"
              loading="lazy"
              decoding="async"
              class="absolute -bottom-6 right-0 aspect-[9/16] w-[28%] rounded-[1.25rem] border-4 border-ink-950 object-cover object-top shadow-2xl shadow-black/60"
            >
            <img
              v-else
              :src="p.secondary.src"
              :alt="p.copy.alt.secondary"
              width="1440"
              height="900"
              loading="lazy"
              decoding="async"
              class="absolute bottom-0 -left-2 hidden aspect-[16/10] w-1/2 rounded-xl border border-white/15 object-cover object-top shadow-2xl shadow-black/60 sm:block"
            >
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
