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

  // IDs de métricas (públicos — aparecem no HTML de qualquer forma).
  // Cravados como padrão pra funcionar sem depender de env var; ainda dá pra
  // sobrescrever via NUXT_PUBLIC_CLARITY_ID / NUXT_PUBLIC_GA_ID no Cloudflare.
  runtimeConfig: {
    public: {
      clarityId: 'xoelmjczir',
      gaId: 'G-FSXL9WXYXS'
    }
  },

  app: {
    head: {
      htmlAttrs: { lang: 'pt-BR' }
    }
  }
})
