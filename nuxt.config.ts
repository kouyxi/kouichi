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
      // /lab não é linkado de lugar nenhum (é experimento, e está noindex),
      // então o crawler não acha sozinho — precisa ser listado na mão.
      routes: ['/', '/lab'],
      failOnError: true
    }
  },

  fonts: {
    // self-hosted at build time (no external Google request → faster LCP, privacy-friendly)
    // Português cabe inteiro no subconjunto latin, ç e ã inclusos. Sem isso
    // vinham também latin-ext e vietnamita, que nenhuma página usa.
    defaults: { subsets: ['latin'] },
    families: [
      // Título da home. Um peso só: a hierarquia vem de tamanho e cor.
      // Pré-carregada, junto com a do corpo: no 4G as duas chegavam ~1,8 s e
      // o topo trocava de letra na frente da pessoa. São dois arquivos, 40 KB.
      { name: 'Young Serif', provider: 'google', weights: [400], preload: true },
      // Fraunces fica só pelo /lab, que é a versão de controle.
      { name: 'Fraunces', provider: 'google', weights: [400, 500, 600, 700, 900], styles: ['normal', 'italic'] },
      { name: 'Space Grotesk', provider: 'google', weights: [400, 500, 600, 700], preload: true }
    ]
  },

  // IDs de métricas (são públicos, aparecem no HTML de qualquer forma).
  // Cravados como padrão pra funcionar sem depender de env var; ainda dá pra
  // sobrescrever via NUXT_PUBLIC_CLARITY_ID / NUXT_PUBLIC_GA_ID no Cloudflare.
  runtimeConfig: {
    public: {
      clarityId: 'xoelmjczir',
      gaId: 'G-FSXL9WXYXS'
    }
  },

  // Página única, sem navegação entre rotas no cliente: os dados vão
  // dentro do HTML (sem o _payload.json) e o manifesto de builds sai (era
  // mais um request na carga e uma consulta a cada hora).
  experimental: {
    payloadExtraction: false,
    appManifest: false
  },

  app: {
    head: {
      htmlAttrs: { lang: 'pt-BR' }
    }
  }
})
