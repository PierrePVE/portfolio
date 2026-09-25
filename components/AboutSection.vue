<script setup lang="ts">
// Section « À propos » : pitch personnel + grille de faits clés.
// Faits clés affichés en cartes (icône + label + valeur).
const facts = [
  { icon: 'cap', label: 'Formation', value: 'Cycle ingénieur ESEO — Logiciels & Données' },
  { icon: 'pin', label: 'Localisation', value: 'France · ouvert à la mobilité' },
  { icon: 'globe', label: 'Langues', value: 'Français · Anglais (B1) · Espagnol (A2)' },
  { icon: 'spark', label: 'Recherche', value: 'Stage — à partir de février 2027' },
]

// Variante @vueuse/motion réutilisée : invisible et décalé vers le bas au
// départ, puis fondu + remontée la première fois que l'élément entre à l'écran.
const reveal = {
  initial: { opacity: 0, y: 40 },
  visibleOnce: { opacity: 1, y: 0, transition: { duration: 700 } },
}
</script>

<template>
  <section id="about" class="relative scroll-mt-24 py-28">
    <div class="mx-auto max-w-6xl px-5">
      <div class="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div v-motion="reveal">
          <p class="section-eyebrow"><span class="h-px w-8 bg-accent-300" /> À propos</p>
          <h2 class="section-title">
            Je transforme des idées<br />en produits <span class="text-gradient">web vivants</span>.
          </h2>
        </div>

        <div v-motion="reveal" class="space-y-5 text-lg leading-relaxed text-slate-400">
          <p>
            Étudiant ingénieur en informatique et électronique à l'<span class="text-slate-200">ESEO</span>,
            je me suis spécialisé dans le développement <span class="text-slate-200">logiciel et la donnée</span>.
            Au fil de mes stages — chez <span class="text-slate-200">SYSTRA à Dublin</span>,
            <span class="text-slate-200">Thales</span> et <span class="text-slate-200">Manitou</span> —
            j'ai appris à livrer des applications web concrètes, en équipe et en méthode Agile.
          </p>
          <p>
            J'aime autant <span class="text-slate-200">le détail d'une interface</span> que la
            <span class="text-slate-200">solidité d'un back-end</span> bien pensé. Curieux et rigoureux,
            je recherche un stage à partir de février 2027 pour mettre tout ça en pratique.
          </p>

          <div class="grid gap-4 pt-4 sm:grid-cols-2">
            <div v-for="f in facts" :key="f.label" class="glass flex items-start gap-3 p-4">
              <span class="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-accent-500/15 text-accent-300">
                <svg v-if="f.icon === 'cap'" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 10L12 5 2 10l10 5 10-5z" stroke-linejoin="round"/><path d="M6 12v5c0 1 2.5 3 6 3s6-2 6-3v-5" stroke-linejoin="round"/></svg>
                <svg v-else-if="f.icon === 'pin'" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7-6.5-7-11a7 7 0 1114 0c0 4.5-7 11-7 11z" stroke-linejoin="round"/><circle cx="12" cy="10" r="2.5"/></svg>
                <svg v-else-if="f.icon === 'globe'" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 2.5 15.5 0 18M12 3c-2.5 2.5-2.5 15.5 0 18"/></svg>
                <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3l1.8 4.8L18 9l-4.2 1.2L12 15l-1.8-4.8L6 9l4.2-1.2L12 3z" stroke-linejoin="round"/></svg>
              </span>
              <div>
                <p class="text-xs uppercase tracking-wider text-slate-500">{{ f.label }}</p>
                <p class="mt-0.5 text-sm font-medium text-slate-200">{{ f.value }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
