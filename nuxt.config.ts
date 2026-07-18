// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/fonts'],
  css: ['~/assets/css/main.css'],

  // Static site: prerender everything to HTML → served from CDN, zero cold-start.
  ssr: true,
  nitro: {
    preset: 'static',
    prerender: {
      crawlLinks: true,
      routes: ['/'],
      failOnError: true
    }
  },

  fonts: {
    // self-hosted at build time (no external Google request → faster LCP, privacy-friendly)
    families: [
      { name: 'Fraunces', provider: 'google', weights: [400, 500, 600, 700, 900], styles: ['normal', 'italic'] },
      { name: 'Space Grotesk', provider: 'google', weights: [400, 500, 600, 700] }
    ]
  },

  app: {
    head: {
      htmlAttrs: { lang: 'pt-BR' }
    }
  }
})
