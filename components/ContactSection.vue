<script setup lang="ts">
// Section contact : CTA email principal + cartes email / LinkedIn / GitHub / téléphone.
const email = 'pierre.vanelsuve@gmail.com'
const channels = [
  {
    label: 'Email',
    value: email,
    href: `mailto:${email}`,
    icon: 'mail',
  },
  {
    label: 'LinkedIn',
    value: 'in/pierre-van-elsuve',
    href: 'https://www.linkedin.com/in/pierre-van-elsuve',
    icon: 'linkedin',
  },
  {
    label: 'GitHub',
    value: 'PierrePVE',
    href: 'https://github.com/PierrePVE',
    icon: 'github',
  },
  {
    label: 'Téléphone',
    value: '+33 6 09 08 79 26',
    href: 'tel:+33609087926',
    icon: 'phone',
  },
]

// Variante de révélation au scroll (cf. AboutSection pour le détail).
const reveal = {
  initial: { opacity: 0, y: 40 },
  visibleOnce: { opacity: 1, y: 0, transition: { duration: 700 } },
}
</script>

<template>
  <section id="contact" class="relative scroll-mt-24 py-28">
    <div class="mx-auto max-w-5xl px-5">
      <div
        v-motion="reveal"
        class="gradient-border relative overflow-hidden rounded-3xl bg-gradient-to-br from-ink-800 to-ink-950 p-8 text-center sm:p-14"
      >
        <div class="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-accent-500/20 blur-3xl" />
        <div class="relative">
          <p class="section-eyebrow justify-center"><span class="h-px w-8 bg-accent-300" /> Contact</p>
          <h2 class="section-title">Construisons quelque chose <span class="text-gradient">ensemble</span></h2>
          <p class="mx-auto mt-4 max-w-xl text-lg text-slate-400">
            Un stage, un projet ou simplement envie d'échanger ? Ma boîte mail est toujours ouverte.
          </p>

          <div class="mt-8 flex justify-center">
            <a :href="`mailto:${email}`" class="btn-primary text-base">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6" stroke-linecap="round" stroke-linejoin="round"/></svg>
              {{ email }}
            </a>
          </div>

          <div class="mt-10 grid gap-4 sm:grid-cols-2">
            <!-- External profiles (https) open in a new tab; mailto/tel links stay in place. -->
            <a
              v-for="c in channels"
              :key="c.label"
              :href="c.href"
              :target="c.href.startsWith('https://') ? '_blank' : undefined"
              rel="noopener"
              class="glass group flex items-center gap-3 p-4 text-left transition-colors hover:border-accent-500/40"
            >
              <span class="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent-500/15 text-accent-300 transition-transform group-hover:scale-110">
                <svg v-if="c.icon === 'mail'" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>
                <svg v-else-if="c.icon === 'linkedin'" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.76-2.05C20.4 8.65 21 11 21 14.1V21h-4v-6.1c0-1.45-.03-3.3-2-3.3-2 0-2.3 1.57-2.3 3.2V21H9z"/></svg>
                <svg v-else-if="c.icon === 'github'" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49v-1.7c-2.78.62-3.37-1.37-3.37-1.37-.46-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.57 2.34 1.12 2.91.85.09-.66.35-1.12.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.3 9.3 0 0112 6.84c.85 0 1.71.12 2.51.34 1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9v2.81c0 .27.18.6.69.49A10.1 10.1 0 0022 12.25C22 6.58 17.52 2 12 2z"/></svg>
                <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 4h4l2 5-3 2a12 12 0 005 5l2-3 5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" stroke-linejoin="round"/></svg>
              </span>
              <div class="min-w-0">
                <p class="text-xs uppercase tracking-wider text-slate-500">{{ c.label }}</p>
                <p class="truncate text-sm font-medium text-slate-200">{{ c.value }}</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
