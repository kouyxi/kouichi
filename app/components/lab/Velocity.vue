<script setup lang="ts">
// Faixa que responde à velocidade do scroll: acelera, inverte a direção
// quando você sobe e inclina de leve. É o truque que faz a página parecer
// que tem inércia física em vez de só rolar.
const root = ref<HTMLElement | null>(null)

const itens = [
  'Clínica',
  'Escritório',
  'Consultório',
  'Prestador de serviço',
  'Quem atende com hora marcada'
]

onMounted(async () => {
  if (!root.value || prefersReducedMotion()) return
  const el = root.value
  const { gsap, ScrollTrigger } = await useGsap()

  const ctx = gsap.context(() => {
    const track = el.querySelector('.vel-track') as HTMLElement
    if (!track) return

    let direction = 1
    const roll = gsap.to(track, {
      xPercent: -50,
      repeat: -1,
      duration: 22,
      ease: 'none'
    })

    // clamp: um flick violento no trackpad não pode mandar a faixa pro infinito
    const toSkew = gsap.quickTo(track, 'skewX', { duration: 0.5, ease: 'power3' })

    ScrollTrigger.create({
      trigger: el,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate(self: any) {
        const v = self.getVelocity()
        const dir = v > 0 ? 1 : -1
        if (dir !== direction) {
          direction = dir
          roll.timeScale(dir)
        }
        const boost = gsap.utils.clamp(1, 6, 1 + Math.abs(v) / 900)
        gsap.to(roll, { timeScale: dir * boost, duration: 0.25, overwrite: true })
        toSkew(gsap.utils.clamp(-8, 8, -v / 320))
      },
      onLeave: () => gsap.to(roll, { timeScale: direction, duration: 0.6 }),
      onLeaveBack: () => gsap.to(roll, { timeScale: direction, duration: 0.6 })
    })
  }, el)

  onBeforeUnmount(() => ctx.revert())
})
</script>

<template>
  <section ref="root" class="vel" aria-label="Para quem eu trabalho">
    <div class="vel-track">
      <span v-for="n in 2" :key="n" class="vel-set" :aria-hidden="n === 2 ? 'true' : undefined">
        <span v-for="i in itens" :key="i" class="vel-item">
          {{ i }}<i class="vel-dot" />
        </span>
      </span>
    </div>
  </section>
</template>

<style scoped>
.vel {
  position: relative;
  overflow: hidden;
  /* Era 4vw de respiro com fonte de 4vw, o que dava uns 144px de altura a
     1440px. É faixa de transição, não seção: pesava mais que o conteúdo. */
  padding-block: clamp(0.85rem, 1.5vw, 1.4rem);
  border-block: 1px solid var(--lab-line);
  background: var(--lab-accent);
  color: var(--lab-bg);
}
.vel-track {
  display: flex;
  width: max-content;
  will-change: transform;
}
.vel-set { display: flex; }
.vel-item {
  display: inline-flex;
  align-items: center;
  gap: clamp(1.1rem, 2.2vw, 2.2rem);
  padding-right: clamp(1.1rem, 2.2vw, 2.2rem);
  font-family: var(--font-display);
  font-weight: 600;
  font-size: clamp(1.05rem, 2.1vw, 1.8rem);
  line-height: 1;
  letter-spacing: -0.02em;
  white-space: nowrap;
}
.vel-dot {
  width: 0.42em;
  height: 0.42em;
  border-radius: 999px;
  border: 2px solid currentColor;
}
</style>
