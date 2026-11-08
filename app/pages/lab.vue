<script setup lang="ts">
// Versão anterior do site, guardada como referência e controle de comparação.
//
// Fica fora do índice do Google: ela cobre exatamente as mesmas buscas da
// home, então indexar as duas seria competir consigo mesmo. Pelo mesmo
// motivo não carrega o schema de negócio nem a FAQPage, que descrevem a
// mesma entidade e devem existir num lugar só.
useHead({
  title: 'Kouichi | versão anterior',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' },
    { name: 'theme-color', content: '#F3EAD8' }
  ],
  link: [
    { rel: 'canonical', href: 'https://kouichi.com.br' },
    // ico com sizes e antes do SVG: sem isso o Chrome baixava o ico, de
    // 15 KB, em vez do SVG de meio KB
    { rel: 'icon', href: '/favicon.ico', sizes: '32x32' },
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
  ]
})

// Camada de rolagem desta versão: Lenis, parallax, títulos em máscara e
// filetes, tudo GSAP. Era um plugin global e carregava na home também, onde
// nada disso é usado; aqui ela fica igual ao que era.
let lenis: any = null
onBeforeUnmount(() => lenis?.destroy())
onMounted(async () => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
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
  lenis = new Lenis({ duration: 1.05, smoothWheel: true })
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
})
</script>

<template>
  <div>
    <ScrollProgress />
    <AppHeader />
    <main>
      <HeroSection />
      <MarqueeStrip />
      <ServicesSection />
      <ProcessSection />
      <AboutSection />
      <PortfolioSection />
      <FaqSection />
    </main>
    <AppFooter />
    <WhatsAppButton />
  </div>
</template>
