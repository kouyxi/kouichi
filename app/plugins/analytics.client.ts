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
  // Só o domínio de produção conta: o npm run dev, os previews do Cloudflare e
  // testes automatizados entravam nas métricas como se fossem visita de cliente.
  const producao = /(^|\.)kouichi\.com\.br$/.test(location.hostname)
  const { clarityId, gaId } = (producao ? useRuntimeConfig().public : { clarityId: '', gaId: '' }) as { clarityId: string; gaId: string }

  // As filas nascem já: um clique antes das tags chegarem fica guardado e é
  // enviado quando elas carregam.
  if (clarityId) {
    const w = window as any
    w.clarity = w.clarity || function () { (w.clarity.q = w.clarity.q || []).push(arguments) }
  }
  if (gaId) {
    window.dataLayer = window.dataLayer || []
    window.gtag = function () { window.dataLayer!.push(arguments) }
    window.gtag('js', new Date())
    window.gtag('config', gaId, { anonymize_ip: true })
  }

  // Os scripts em si só depois da página pronta e de um respiro. São ~200 KB
  // comprimidos (o GA4 sozinho, 177 KB; o Clarity, 25 KB), mais que todo o
  // JS do site: no 4G disputavam banda com a foto do topo e processador com
  // a hidratação, bem na hora em que a pessoa começa a ler.
  function injetar(src: string) {
    const s = document.createElement('script')
    s.async = true
    s.src = src
    document.head.appendChild(s)
  }
  function carregar() {
    if (clarityId) injetar('https://www.clarity.ms/tag/' + clarityId)
    if (gaId) injetar('https://www.googletagmanager.com/gtag/js?id=' + gaId)
  }
  const depois = () => ('requestIdleCallback' in window ? requestIdleCallback(carregar, { timeout: 3000 }) : setTimeout(carregar, 1500))
  if (clarityId || gaId) {
    if (document.readyState === 'complete') depois()
    else window.addEventListener('load', depois, { once: true })
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

  // --- rastreio delegado de clique ---
  // Um listener só pega todos os botões; o rótulo vem de data-track.
  // O evento depende do destino, não do data-track: antes qualquer
  // [data-track] virava whatsapp_click, então clicar no projeto do
  // portfólio inflava a métrica de conversão com um clique que não é
  // conversão nenhuma.
  document.addEventListener('click', (e) => {
    const el = (e.target as HTMLElement).closest('a[href], [data-track]') as HTMLElement | null
    if (!el) return
    const rotulo = el.getAttribute('data-track')
    const href = el.getAttribute('href') || ''

    if (href.includes('wa.me')) {
      track('whatsapp_click', { location: rotulo || 'wa_desconhecido' })
    } else if (href.startsWith('mailto:')) {
      track('email_click', { location: rotulo || 'email' })
    } else if (rotulo) {
      track('link_click', { location: rotulo })
    }
  })

  // --- profundidade de rolagem ---
  // Sem isso não dá pra saber onde a pessoa desiste, nem comparar a home
  // com a /lab, que é bem mais longa. Cada marca dispara uma vez só.
  const marcas = [25, 50, 75, 100]
  const vistas = new Set<number>()
  let agendado = false

  function medirRolagem() {
    agendado = false
    const alturaRolavel = document.documentElement.scrollHeight - window.innerHeight
    if (alturaRolavel <= 0) return
    const pct = (window.scrollY / alturaRolavel) * 100
    for (const m of marcas) {
      if (pct >= m && !vistas.has(m)) {
        vistas.add(m)
        track('scroll_depth', { percent: m, page: location.pathname })
      }
    }
  }

  window.addEventListener('scroll', () => {
    // rAF em vez de disparar a cada evento de scroll: com Lenis são
    // dezenas por segundo, e cada uma faria a conta inteira
    if (agendado) return
    agendado = true
    requestAnimationFrame(medirRolagem)
  }, { passive: true })

  nuxtApp.provide('track', track)
})
