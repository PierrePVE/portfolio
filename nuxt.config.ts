// https://nuxt.com/docs/api/configuration/nuxt-config

// Base path is env-driven so the same codebase deploys to two targets:
// - Vercel (dedicated *.vercel.app domain, served at the root): "/" — the default
// - Freebox (reverse proxy, apps split by URL segment): set NUXT_APP_BASE_URL=/portfolio/
// Root is the default so the hosted case needs zero config; only the sub-path
// deployment sets the env var (done in the Dockerfile). Evaluated here (not only
// via Nuxt's runtime env) because baseURL is baked into client asset paths at
// build time and cannot be fixed at runtime.
const baseURL = process.env.NUXT_APP_BASE_URL || '/'

export default defineNuxtConfig({
  compatibilityDate: '2026-06-01',
  devtools: { enabled: false },

  modules: ['@nuxtjs/tailwindcss', '@vueuse/motion/nuxt', '@nuxt/fonts'],

  css: ['~/assets/css/main.css'],

  // Link to the Récurra app. Default assumes same-domain reverse proxy;
  // override with NUXT_PUBLIC_RECURRA_URL (e.g. the absolute DNS URL on Vercel,
  // where /recurra/ does not exist).
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
    // All Nuxt links/assets are automatically prefixed with this base path.
    baseURL,
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
      // <head> link hrefs are NOT auto-prefixed (unlike ~/ assets), so build the
      // favicon URL from baseURL to keep it correct on both targets.
      link: [{ rel: 'icon', type: 'image/svg+xml', href: `${baseURL}favicon.svg` }],
    },
  },
})
