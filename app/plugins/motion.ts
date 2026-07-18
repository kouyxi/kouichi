// Magnetic hover: element gently follows the cursor to pull attention toward it.
// Applied to primary CTAs — motion with a conversion purpose, not decoration.
// Registered universally so SSR can resolve the directive; wiring is client-only.
export default defineNuxtPlugin((nuxtApp) => {
  const fine = import.meta.client && window.matchMedia('(pointer: fine)').matches
  const reduce = import.meta.client && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  nuxtApp.vueApp.directive('magnetic', {
    mounted(el: HTMLElement & { _magClean?: () => void }, binding) {
      if (!import.meta.client || !fine || reduce) return
      const strength = (binding.value?.strength as number) ?? 0.3
      let raf = 0

      const onMove = (e: MouseEvent) => {
        const r = el.getBoundingClientRect()
        const x = e.clientX - (r.left + r.width / 2)
        const y = e.clientY - (r.top + r.height / 2)
        cancelAnimationFrame(raf)
        raf = requestAnimationFrame(() => {
          el.style.transform = `translate(${x * strength}px, ${y * strength}px)`
        })
      }
      const onLeave = () => {
        cancelAnimationFrame(raf)
        el.style.transform = ''
      }

      el.addEventListener('mousemove', onMove)
      el.addEventListener('mouseleave', onLeave)
      el._magClean = () => {
        el.removeEventListener('mousemove', onMove)
        el.removeEventListener('mouseleave', onLeave)
      }
    },
    unmounted(el: HTMLElement & { _magClean?: () => void }) {
      el._magClean?.()
    }
  })
})
