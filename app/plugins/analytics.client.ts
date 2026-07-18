// Métricas: Microsoft Clarity (heatmap/gravação/onde saem) + GA4 (eventos/funil).
// Carrega só se os IDs existirem (NUXT_PUBLIC_CLARITY_ID / NUXT_PUBLIC_GA_ID).
// Sem IDs = nenhum script, nenhum request, nenhum erro.
declare global {
  interface Window {
    clarity?: (...args: any[]) => void
    dataLayer?: any[]
    gtag?: (...args: any[]) => void
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  const { clarityId, gaId } = useRuntimeConfig().public as { clarityId: string; gaId: string }

  // --- Microsoft Clarity ---
  if (clarityId) {
    ;(function (c: any, l: Document, a: string, r: string, i: string) {
      c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) }
      const t = l.createElement(r) as HTMLScriptElement
      t.async = true
      t.src = 'https://www.clarity.ms/tag/' + i
      const y = l.getElementsByTagName(r)[0]
      y.parentNode!.insertBefore(t, y)
    })(window, document, 'clarity', 'script', clarityId)
  }

  // --- GA4 (gtag) ---
  if (gaId) {
    const s = document.createElement('script')
    s.async = true
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + gaId
    document.head.appendChild(s)
    window.dataLayer = window.dataLayer || []
    window.gtag = function () { window.dataLayer!.push(arguments) }
    window.gtag('js', new Date())
    window.gtag('config', gaId, { anonymize_ip: true })
  }

  // --- helper de evento (no-op gracioso se nada carregado) ---
  function track(event: string, params: Record<string, any> = {}) {
    try {
      if (window.gtag) window.gtag('event', event, params)
      if (window.clarity) {
        window.clarity('event', event)
        for (const [k, v] of Object.entries(params)) window.clarity('set', k, String(v))
      }
    } catch { /* silencioso */ }
  }

  // --- rastreio delegado de clique nos CTAs de WhatsApp ---
  // Um listener só pega todos os botões; o rótulo vem de data-track.
  document.addEventListener('click', (e) => {
    const el = (e.target as HTMLElement).closest('a[href*="wa.me"], [data-track]') as HTMLElement | null
    if (!el) return
    const location = el.getAttribute('data-track') || 'wa_desconhecido'
    track('whatsapp_click', { location })
  })

  nuxtApp.provide('track', track)
})
