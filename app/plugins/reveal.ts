export default defineNuxtPlugin((nuxtApp) => {
  // Registered on both server and client so SSR can resolve the directive.
  // The IntersectionObserver only exists on the client.
  let io: IntersectionObserver | null = null
  let reduce = false

  if (import.meta.client) {
    reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!reduce) {
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              e.target.classList.add('is-visible')
              io?.unobserve(e.target)
            }
          }
        },
        { threshold: 0.14, rootMargin: '0px 0px -8% 0px' }
      )
    }
  }

  nuxtApp.vueApp.directive('reveal', {
    mounted(el: HTMLElement, binding) {
      if (!import.meta.client || reduce || !io) {
        el.classList.add('is-visible')
        return
      }
      el.classList.add('reveal')
      if (binding.value?.delay) el.style.transitionDelay = `${binding.value.delay}ms`
      io.observe(el)
    }
  })
})
