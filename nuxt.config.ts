// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-06-01',
  devtools: { enabled: false },

  modules: ['@nuxtjs/tailwindcss', '@vueuse/motion/nuxt', '@nuxt/fonts'],

  css: ['~/assets/css/main.css'],

  // Le portfolio est servi à la racine du domaine ; Récurra vit sous /recurra/.
  // L'URL de l'app Récurra est surchargeable via NUXT_PUBLIC_RECURRA_URL.
  runtimeConfig: {
    public: {
      recurraUrl: '/recurra/',
    },
  },

  fonts: {
    families: [
      { name: 'Sora', provider: 'google' },
      { name: 'Space Grotesk', provider: 'google' },
      { name: 'Inter', provider: 'google' },
    ],
  },

  app: {
    // Servi sous /portfolio/ : Pierre différencie ses apps par un segment d'URL
    // derrière son DNS (ex. mondomaine.fr/portfolio/, mondomaine.fr/recurra/).
    // Tous les liens et assets Nuxt sont automatiquement préfixés par ce baseURL.
    baseURL: '/portfolio/',
    head: {
      htmlAttrs: { lang: 'fr' },
      title: 'Pierre Van Elsuve — Développeur Full-Stack',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Pierre Van Elsuve — Étudiant ingénieur ESEO et développeur full-stack. Portfolio, projets et expériences.',
        },
        { name: 'theme-color', content: '#0a0a0f' },
        { property: 'og:title', content: 'Pierre Van Elsuve — Développeur Full-Stack' },
        {
          property: 'og:description',
          content: 'Étudiant ingénieur ESEO, développeur full-stack. Projets, expériences et contact.',
        },
        { property: 'og:type', content: 'website' },
      ],
      // href absolu incluant le baseURL (les liens du <head> ne sont pas
      // préfixés automatiquement, contrairement aux assets ~/).
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/portfolio/favicon.svg' }],
    },
  },
})
