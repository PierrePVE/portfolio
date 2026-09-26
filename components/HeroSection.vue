<script setup lang="ts">
// Section d'accueil : titre animé (révélation ligne par ligne au GSAP),
// carte « portrait » avec parallaxe à la souris, et appels à l'action.
import { gsap } from 'gsap'

// URL de l'app Récurra (configurable via NUXT_PUBLIC_RECURRA_URL).
const config = useRuntimeConfig()
const recurraUrl = config.public.recurraUrl

// Translated copy (see locales/*.ts).
const { t } = useLocale()

// Racine de la section : sert de portée à gsap.context (sélecteurs limités à
// cet élément, et nettoyage automatique via ctx.revert()).
const root = ref<HTMLElement | null>(null)

onMounted(() => {
  // gsap.context confine les sélecteurs à `root` et permet un revert propre.
  const ctx = gsap.context(() => {
    // Timeline d'entrée jouée une fois au chargement.
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    // 1) Les lignes du nom montent depuis sous leur masque (overflow-hidden).
    tl.from('[data-hero="line"]', {
      yPercent: 120,
      opacity: 0,
      duration: 1,
      stagger: 0.12, // léger décalage entre « Pierre » et « Van Elsuve »
    })
      // 2) Les blocs secondaires (texte, boutons, stats) apparaissent en fondu.
      .from('[data-hero="fade"]', { y: 24, opacity: 0, duration: 0.8, stagger: 0.1 }, '-=0.5')
      // 3) Les puces techno « pop » en dernier. ('-=0.6' = chevauchement)
      .from('[data-hero="chip"]', { scale: 0.6, opacity: 0, duration: 0.5, stagger: 0.06 }, '-=0.6')
  }, root.value!)

  // Parallaxe léger : la carte suit doucement la souris (effet de profondeur).
  const onMove = (e: MouseEvent) => {
    // Position souris normalisée dans [-1, 1] par rapport au centre de l'écran.
    const x = (e.clientX / window.innerWidth - 0.5) * 2
    const y = (e.clientY / window.innerHeight - 0.5) * 2
    // Déplacement max de ±18 px, lissé par une transition GSAP.
    gsap.to('[data-hero="orbit"]', { x: x * 18, y: y * 18, duration: 0.8, ease: 'power2.out' })
  }
  window.addEventListener('mousemove', onMove)

  // Nettoyage : retire l'écouteur et annule toutes les animations GSAP.
  onBeforeUnmount(() => {
    window.removeEventListener('mousemove', onMove)
    ctx.revert()
  })
})
</script>

<template>
  <section ref="root" id="top" class="relative flex min-h-[100svh] items-center overflow-hidden pt-28">
    <div class="mx-auto w-full max-w-6xl px-5">
      <div class="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <!-- Colonne texte -->
        <div>
          <div
            data-hero="fade"
            class="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-slate-300"
          >
            <span class="relative flex h-2 w-2">
              <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span class="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {{ t.hero.availability }}
          </div>

          <h1 class="font-display text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-7xl">
            <span class="block overflow-hidden"><span data-hero="line" class="block">Pierre</span></span>
            <span class="block overflow-hidden"
              ><span data-hero="line" class="block text-gradient">Van Elsuve</span></span
            >
          </h1>

          <!-- v-html: static, trusted copy from locales/*.ts (<b> = highlight). -->
          <p
            data-hero="fade"
            class="rich mt-6 max-w-xl text-balance text-lg leading-relaxed text-slate-400"
            v-html="t.hero.intro"
          />

          <div data-hero="fade" class="mt-9 flex flex-wrap items-center gap-3">
            <a :href="recurraUrl" class="btn-primary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              {{ t.hero.primaryCta }}
            </a>
            <a href="#projects" class="btn-ghost">{{ t.hero.secondaryCta }}</a>
          </div>

          <!-- Stats -->
          <dl data-hero="fade" class="mt-12 grid max-w-md grid-cols-3 gap-6">
            <div v-for="s in t.hero.stats" :key="s.value">
              <dt class="font-display text-3xl font-bold text-white">{{ s.value }}</dt>
              <dd class="mt-1 text-xs leading-snug text-slate-500">{{ s.label }}</dd>
            </div>
          </dl>
        </div>

        <!-- Colonne visuelle : carte « portrait » orbitale -->
        <div class="relative hidden lg:block">
          <div data-hero="orbit" class="relative mx-auto aspect-[4/5] w-full max-w-sm">
            <div class="gradient-border glass h-full w-full p-1.5">
              <div class="relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br from-ink-800 to-ink-950">
                <!-- Monogramme géant -->
                <div class="absolute inset-0 grid place-items-center">
                  <span class="font-display text-[10rem] font-bold leading-none text-white/[0.04]">PV</span>
                </div>
                <!-- Contenu de la carte -->
                <div class="absolute inset-x-0 bottom-0 p-6">
                  <p class="font-display text-sm font-semibold uppercase tracking-widest text-accent-300">
                    {{ t.hero.cardRole }}
                  </p>
                  <p class="mt-2 text-sm text-slate-400">
                    Vue · Nuxt · React · Spring · Express · Docker
                  </p>
                </div>
                <!-- Puces techno flottantes -->
                <div class="absolute right-5 top-5 flex flex-col items-end gap-2">
                  <span data-hero="chip" class="rounded-full bg-white/10 px-3 py-1 text-xs text-white backdrop-blur">Vue / Nuxt</span>
                  <span data-hero="chip" class="rounded-full bg-white/10 px-3 py-1 text-xs text-white backdrop-blur">TypeScript</span>
                  <span data-hero="chip" class="rounded-full bg-white/10 px-3 py-1 text-xs text-white backdrop-blur">Docker</span>
                </div>
              </div>
            </div>
            <!-- Halo flottant derrière la carte -->
            <div class="absolute -bottom-8 -right-8 -z-10 h-40 w-40 animate-float rounded-full bg-glow-cyan/30 blur-3xl" />
          </div>
        </div>
      </div>
    </div>

    <!-- Indicateur de scroll -->
    <div class="absolute inset-x-0 bottom-8 flex justify-center">
      <div class="flex h-10 w-6 items-start justify-center rounded-full border border-white/15 p-1.5">
        <span class="h-2 w-1 animate-float rounded-full bg-white/60" />
      </div>
    </div>
  </section>
</template>
