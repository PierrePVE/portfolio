<script setup lang="ts">
// Section parcours : timeline des stages (gauche) + formation et loisirs (droite).
// Données issues du CV ; ordre = du plus récent au plus ancien.
// Experiences, education and hobbies are translated in locales/*.ts.
const { t } = useLocale()

// Variante de révélation au scroll (cf. AboutSection pour le détail).
const reveal = {
  initial: { opacity: 0, y: 40 },
  visibleOnce: { opacity: 1, y: 0, transition: { duration: 700 } },
}
</script>

<template>
  <section id="experience" class="relative scroll-mt-24 py-28">
    <div class="mx-auto max-w-6xl px-5">
      <div v-motion="reveal" class="max-w-2xl">
        <p class="section-eyebrow"><span class="h-px w-8 bg-accent-300" /> {{ t.experience.eyebrow }}</p>
        <h2 class="section-title">{{ t.experience.title.before }}<span class="text-gradient">{{ t.experience.title.highlight }}</span>{{ t.experience.title.after }}</h2>
      </div>

      <div class="mt-14 grid gap-14 lg:grid-cols-[1.4fr_1fr]">
        <!-- Timeline expériences -->
        <ol class="relative space-y-8 border-l border-white/10 pl-8">
          <li
            v-for="(e, i) in t.experience.items"
            :key="e.company"
            v-motion="{ initial: { opacity: 0, x: 30 }, visibleOnce: { opacity: 1, x: 0, transition: { duration: 600, delay: i * 120 } } }"
            class="relative"
          >
            <span class="absolute -left-[39px] top-1.5 grid h-5 w-5 place-items-center rounded-full border border-accent-500/50 bg-ink-900">
              <span class="h-2 w-2 rounded-full bg-gradient-to-br from-glow-violet to-glow-cyan" />
            </span>
            <div class="glass p-6 transition-colors duration-300 hover:border-accent-500/30">
              <div class="flex flex-wrap items-center justify-between gap-2">
                <h3 class="font-display text-lg font-semibold text-white">{{ e.company }}</h3>
                <span class="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-400">{{ e.period }}</span>
              </div>
              <p class="mt-1 text-sm font-medium text-accent-300">{{ e.role }}</p>
              <p class="text-xs text-slate-500">{{ e.place }}</p>
              <p class="mt-3 text-sm leading-relaxed text-slate-400">{{ e.description }}</p>
              <ul class="mt-4 flex flex-wrap gap-2">
                <li v-for="t in e.tags" :key="t" class="rounded-md border border-white/5 bg-white/5 px-2 py-0.5 text-[11px] text-slate-300">{{ t }}</li>
              </ul>
            </div>
          </li>
        </ol>

        <!-- Formation -->
        <div v-motion="reveal">
          <h3 class="mb-5 flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-widest text-slate-400">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 10L12 5 2 10l10 5 10-5z" stroke-linejoin="round"/><path d="M6 12v5c0 1 2.5 3 6 3s6-2 6-3v-5" stroke-linejoin="round"/></svg>
            {{ t.experience.educationTitle }}
          </h3>
          <div class="space-y-4">
            <div v-for="ed in t.experience.education" :key="ed.period" class="gradient-border glass p-5">
              <p class="text-xs text-accent-300">{{ ed.period }}</p>
              <p class="mt-1 font-medium text-white">{{ ed.title }}</p>
              <p class="text-sm text-slate-500">{{ ed.school }}</p>
            </div>
          </div>

          <!-- Petit bloc « en dehors du code » -->
          <div class="mt-8 glass p-5">
            <h4 class="font-display text-sm font-semibold text-white">{{ t.experience.hobbiesTitle }}</h4>
            <p class="mt-2 text-sm leading-relaxed text-slate-400">
              {{ t.experience.hobbies }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
