// Carrega GSAP uma vez só e compartilha entre os componentes do /lab.
// Import dinâmico: nada disso entra no bundle inicial nem roda no SSR.
let cached: Promise<GsapKit> | null = null

export interface GsapKit {
  gsap: any
  ScrollTrigger: any
  SplitText: any
}

export function useGsap(): Promise<GsapKit> {
  if (!cached) {
    cached = Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger'),
      import('gsap/SplitText')
    ]).then(([g, st, sp]) => {
      const gsap = (g as any).default ?? (g as any).gsap
      const ScrollTrigger = (st as any).ScrollTrigger ?? (st as any).default
      const SplitText = (sp as any).SplitText ?? (sp as any).default
      gsap.registerPlugin(ScrollTrigger, SplitText)
      return { gsap, ScrollTrigger, SplitText }
    })
  }
  return cached
}

/** Quem pediu menos movimento recebe a página parada, sem exceção. */
export function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}
