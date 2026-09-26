<script setup lang="ts">
// Section compétences : 4 groupes thématiques en cartes + bandeau défilant.
// Chaque groupe = un domaine, avec son icône et la liste des technos.
// Groups are translated (locales/*.ts); the marquee below is language-neutral.
const { t } = useLocale()

// Bandeau défilant — duplication de la liste pour une boucle continue.
const marquee = [
  'Vue', 'Nuxt', 'React', 'TypeScript', 'Tailwind', 'Express', 'Spring',
  'Java', 'Python', 'C', 'Docker', 'Git', 'SQL', 'Jest', 'Playwright', 'STM32',
]

// Variante de révélation au scroll (cf. AboutSection pour le détail).
const reveal = {
  initial: { opacity: 0, y: 40 },
  visibleOnce: { opacity: 1, y: 0, transition: { duration: 700 } },
}
</script>

<template>
  <section id="skills" class="relative scroll-mt-24 py-28">
    <div class="mx-auto max-w-6xl px-5">
      <div v-motion="reveal" class="mx-auto max-w-2xl text-center">
        <p class="section-eyebrow justify-center"><span class="h-px w-8 bg-accent-300" /> {{ t.skills.eyebrow }}</p>
        <h2 class="section-title">{{ t.skills.title.before }}<span class="text-gradient">{{ t.skills.title.highlight }}</span>{{ t.skills.title.after }}</h2>
        <p class="mt-4 text-lg text-slate-400">
          {{ t.skills.subtitle }}
        </p>
      </div>

      <!-- Grille des groupes -->
      <div class="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="(g, i) in t.skills.groups"
          :key="g.icon"
          v-motion="{ initial: { opacity: 0, y: 40 }, visibleOnce: { opacity: 1, y: 0, transition: { duration: 600, delay: i * 100 } } }"
          class="glass group p-6 transition-colors duration-300 hover:border-accent-500/40"
        >
          <span class="grid h-11 w-11 place-items-center rounded-xl bg-accent-500/15 text-accent-300 transition-transform duration-300 group-hover:scale-110">
            <svg v-if="g.icon === 'layout'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
            <svg v-else-if="g.icon === 'server'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="7" rx="2"/><rect x="3" y="13" width="18" height="7" rx="2"/><path d="M7 7.5h.01M7 16.5h.01"/></svg>
            <svg v-else-if="g.icon === 'box'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l9 5v10l-9 5-9-5V7l9-5z" stroke-linejoin="round"/><path d="M3 7l9 5 9-5M12 12v10"/></svg>
            <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </span>
          <h3 class="mt-4 font-display text-lg font-semibold text-white">{{ g.title }}</h3>
          <ul class="mt-4 flex flex-wrap gap-2">
            <li
              v-for="item in g.items"
              :key="item"
              class="rounded-lg border border-white/5 bg-white/5 px-2.5 py-1 text-xs text-slate-300"
            >
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Bandeau défilant pleine largeur -->
    <div class="relative mt-16 flex select-none overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]">
      <div class="flex shrink-0 animate-marquee items-center gap-4 pr-4">
        <span
          v-for="(m, i) in [...marquee, ...marquee]"
          :key="i"
          class="whitespace-nowrap font-display text-2xl font-semibold text-white/15 transition-colors hover:text-white/40"
        >
          {{ m }} <span class="px-2 text-accent-500/40">/</span>
        </span>
      </div>
    </div>
  </section>
</template>
