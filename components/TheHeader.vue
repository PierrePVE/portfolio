<script setup lang="ts">
// En-tête fixe « verre dépoli » avec navigation par ancres et smooth-scroll.
// Le fond ne devient opaque qu'une fois la page défilée (effet flottant en haut).

// Liens de navigation -> ancres des <section id="..."> de la page.
const links = [
  { label: 'À propos', href: '#about' },
  { label: 'Compétences', href: '#skills' },
  { label: 'Parcours', href: '#experience' },
  { label: 'Projets', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

// scrolled : la barre a-t-elle quitté le haut ? (déclenche le style glass)
const scrolled = ref(false)
// menuOpen : état du menu déroulant sur mobile.
const menuOpen = ref(false)

// Met à jour `scrolled` selon la position de défilement (seuil de 24 px).
function onScroll() {
  scrolled.value = window.scrollY > 24
}

onMounted(() => {
  onScroll() // état initial correct si la page est rechargée déjà défilée
  window.addEventListener('scroll', onScroll, { passive: true })
})
// Nettoyage de l'écouteur pour éviter toute fuite mémoire.
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))

// Navigue en douceur vers une ancre ; '#' = retour tout en haut de page.
function go(href: string) {
  menuOpen.value = false // referme le menu mobile après un clic
  if (href === '#') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 transition-all duration-500"
    :class="scrolled ? 'py-3' : 'py-5'"
  >
    <div class="mx-auto max-w-6xl px-5">
      <nav
        class="flex items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500"
        :class="scrolled ? 'glass' : 'border border-transparent'"
      >
        <a href="#" class="group flex items-center gap-2.5" @click.prevent="go('#')">
          <span
            class="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-glow-violet to-glow-cyan font-display text-sm font-bold text-ink-950"
          >
            PV
          </span>
          <span class="hidden font-display text-sm font-semibold tracking-tight text-white sm:block">
            Pierre Van Elsuve
          </span>
        </a>

        <ul class="hidden items-center gap-1 md:flex">
          <li v-for="l in links" :key="l.href">
            <a
              :href="l.href"
              class="rounded-full px-3.5 py-2 text-sm text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
              @click.prevent="go(l.href)"
              >{{ l.label }}</a
            >
          </li>
        </ul>

        <div class="flex items-center gap-2">
          <a href="#contact" class="hidden btn-primary !px-5 !py-2 text-sm sm:inline-flex" @click.prevent="go('#contact')">
            Me contacter
          </a>
          <button
            class="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-white md:hidden"
            aria-label="Menu"
            @click="menuOpen = !menuOpen"
          >
            <svg v-if="!menuOpen" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 7h16M4 12h16M4 17h16" stroke-linecap="round" />
            </svg>
            <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M6 6l12 12M18 6L6 18" stroke-linecap="round" />
            </svg>
          </button>
        </div>
      </nav>

      <!-- Menu mobile -->
      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        leave-active-class="transition duration-200 ease-in"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <div v-if="menuOpen" class="glass mt-2 overflow-hidden p-2 md:hidden">
          <a
            v-for="l in links"
            :key="l.href"
            :href="l.href"
            class="block rounded-xl px-4 py-3 text-slate-200 transition-colors hover:bg-white/5"
            @click.prevent="go(l.href)"
            >{{ l.label }}</a
          >
        </div>
      </Transition>
    </div>
  </header>
</template>
