// Premium scroll layer: Lenis smooth scroll + GSAP ScrollTrigger parallax.
// Loaded client-only and lazily (after mount) so it never touches SSR/SEO/LCP.
// Fully disabled under prefers-reduced-motion — native scroll + IO reveals remain.
export default defineNuxtPlugin((nuxtApp) => {
  if (import.meta.server) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  nuxtApp.hook('app:mounted', async () => {
    const [lenisMod, gsapMod, stMod] = await Promise.all([
      import('lenis'),
      import('gsap'),
      import('gsap/ScrollTrigger')
    ])
    const Lenis = lenisMod.default
    const gsap = (gsapMod as any).default ?? (gsapMod as any).gsap
    const ScrollTrigger = (stMod as any).ScrollTrigger ?? (stMod as any).default
    gsap.registerPlugin(ScrollTrigger)

    // --- smooth scroll ---
    document.documentElement.style.scrollBehavior = 'auto'
    const lenis = new Lenis({ duration: 0.8, smoothWheel: true })
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((t: number) => lenis.raf(t * 1000))
    gsap.ticker.lagSmoothing(0)

    // in-page anchors routed through Lenis for smooth, offset-aware jumps
    document.addEventListener('click', (e) => {
      const a = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null
      if (!a) return
      const id = a.getAttribute('href') || ''
      if (id.length < 2) return
      const target = document.querySelector(id)
      if (!target) return
      e.preventDefault()
      lenis.scrollTo(target as HTMLElement, { offset: -76, duration: 0.9 })
    })

    // --- scrubbed parallax (elements with no mouse-transform, so no conflict) ---
    gsap.utils.toArray('[data-parallax]').forEach((el: HTMLElement) => {
      const amount = parseFloat(el.dataset.parallax || '0')
      gsap.fromTo(
        el,
        { yPercent: -amount },
        {
          yPercent: amount,
          ease: 'none',
          scrollTrigger: {
            trigger: el.closest('section') || el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        }
      )
    })

    // refresh once fonts/layout settle
    requestAnimationFrame(() => ScrollTrigger.refresh())

    nuxtApp.hook('app:beforeMount', () => lenis.destroy())
  })
})
