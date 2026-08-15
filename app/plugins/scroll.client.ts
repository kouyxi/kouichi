// Premium scroll layer: Lenis smooth scroll + GSAP ScrollTrigger parallax.
// Loaded client-only and lazily (after mount) so it never touches SSR/SEO/LCP.
// Fully disabled under prefers-reduced-motion; native scroll + IO reveals remain.
export default defineNuxtPlugin((nuxtApp) => {
  if (import.meta.server) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  nuxtApp.hook('app:mounted', async () => {
    const [lenisMod, gsapMod, stMod, splitMod] = await Promise.all([
      import('lenis'),
      import('gsap'),
      import('gsap/ScrollTrigger'),
      import('gsap/SplitText')
    ])
    const Lenis = lenisMod.default
    const gsap = (gsapMod as any).default ?? (gsapMod as any).gsap
    const ScrollTrigger = (stMod as any).ScrollTrigger ?? (stMod as any).default
    const SplitText = (splitMod as any).SplitText ?? (splitMod as any).default
    gsap.registerPlugin(ScrollTrigger, SplitText)

    // --- smooth scroll ---
    document.documentElement.style.scrollBehavior = 'auto'
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true })
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
      lenis.scrollTo(target as HTMLElement, { offset: -76, duration: 1.1 })
    })

    // --- scrubbed parallax (elements with no mouse-transform, so no conflict) ---
    gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
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

    // --- masked line reveal on section headings ---
    // Each line rides up from behind its own clipping mask. Split only after the
    // webfonts land, otherwise the line boxes are measured against fallback metrics
    // and the mask lands in the wrong place.
    const splitTargets = gsap.utils.toArray<HTMLElement>('[data-split-lines]')
    if (splitTargets.length) {
      await document.fonts?.ready
      splitTargets.forEach((el) => {
        SplitText.create(el, {
          type: 'lines',
          mask: 'lines',
          autoSplit: true,
          linesClass: 'split-line',
          onSplit(self: any) {
            return gsap.from(self.lines, {
              yPercent: 115,
              duration: 0.72,
              ease: 'power3.out',
              stagger: 0.09,
              scrollTrigger: {
                trigger: el,
                start: 'top 82%',
                once: true
              }
            })
          }
        })
      })
    }

    // --- chapter rules draw themselves in as each section arrives ---
    gsap.utils.toArray<HTMLElement>('.sec-head, .proc-head, .faq-head').forEach((head) => {
      const rule = head.querySelector('.index')
      if (!rule) return
      gsap.from(rule, {
        opacity: 0,
        x: -14,
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: { trigger: head, start: 'top 85%', once: true }
      })
    })

    // refresh once fonts/layout settle
    requestAnimationFrame(() => ScrollTrigger.refresh())

    nuxtApp.hook('app:beforeMount', () => lenis.destroy())
  })
})
