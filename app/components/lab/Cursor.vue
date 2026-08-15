<script setup lang="ts">
// Cursor próprio. O teste é por ponteiro GROSSO, não por ponteiro fino:
// (pointer: fine) volta falso em ambiente que não declara dispositivo
// apontador, e aí o cursor simplesmente nunca aparecia no desktop.
// (pointer: coarse) é o sinal confiável de toque, que é o caso a excluir.
const ativo = ref(false)
const rotulo = ref('')
const dot = ref<HTMLElement | null>(null)
const ring = ref<HTMLElement | null>(null)

// Registrado no setup, não depois de um await: hook de ciclo de vida
// registrado após await não acha mais a instância ativa e nunca roda.
let limpar: (() => void) | null = null
onBeforeUnmount(() => {
  document.documentElement.classList.remove('lab-has-cursor')
  limpar?.()
})

onMounted(async () => {
  const toque = window.matchMedia('(pointer: coarse)').matches
  if (toque || prefersReducedMotion()) return
  ativo.value = true
  document.documentElement.classList.add('lab-has-cursor')
  await nextTick()
  if (!dot.value || !ring.value) return

  const { gsap } = await useGsap()

  // quickTo: um setter compilado por eixo. Anima a cada mousemove sem
  // criar um tween novo a cada evento.
  const dx = gsap.quickTo(dot.value, 'x', { duration: 0.12, ease: 'power3' })
  const dy = gsap.quickTo(dot.value, 'y', { duration: 0.12, ease: 'power3' })
  const rx = gsap.quickTo(ring.value, 'x', { duration: 0.5, ease: 'power3' })
  const ry = gsap.quickTo(ring.value, 'y', { duration: 0.5, ease: 'power3' })

  function mover(e: MouseEvent) {
    dx(e.clientX); dy(e.clientY)
    rx(e.clientX); ry(e.clientY)

    const alvo = (e.target as HTMLElement)?.closest?.('[data-cursor], a, button') as HTMLElement | null
    const modo = alvo?.dataset?.cursor
    rotulo.value = modo === 'ver' ? 'Ver' : ''
    // cores literais, não var(): o GSAP precisa interpolar entre dois valores
    gsap.to(ring.value, {
      scale: alvo ? (modo === 'ver' ? 2.6 : 1.9) : 1,
      borderColor: alvo ? '#DC5B2C' : 'rgba(243, 234, 216, 0.28)',
      duration: 0.35,
      ease: 'power3.out',
      overwrite: 'auto'
    })
  }

  window.addEventListener('mousemove', mover, { passive: true })
  limpar = () => window.removeEventListener('mousemove', mover)
})
</script>

<template>
  <ClientOnly>
    <div v-if="ativo" class="cur" aria-hidden="true">
      <span ref="ring" class="cur-ring"><span class="cur-label">{{ rotulo }}</span></span>
      <span ref="dot" class="cur-dot" />
    </div>
  </ClientOnly>
</template>

<style scoped>
.cur { position: fixed; inset: 0; z-index: 90; pointer-events: none; }
/* Centralização por margem negativa, e SÓ por ela.
   Tinha também um transform: translate(-50%, -50%) aqui, e os dois se
   somavam. O GSAP não descarta a parte percentual de um transform que já
   existe: ele lê translate(-50%, -50%) como xPercent/yPercent -50 e
   preserva isso ao escrever x/y. Resultado, cada peça saía deslocada
   metade do próprio tamanho pra cima e pra esquerda: 3px o ponto, 17px o
   anel. A diferença de 14px entre eles é o raio do anel, que é
   exatamente por que o ponto aparecia grudado na borda em vez do centro. */
.cur-dot,
.cur-ring {
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 999px;
  will-change: transform;
}
.cur-dot {
  width: 6px;
  height: 6px;
  margin: -3px 0 0 -3px;
  background: var(--lab-accent);
}
.cur-ring {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  margin: -17px 0 0 -17px;
  border: 1px solid var(--lab-line-2);
}
.cur-label {
  font-size: 0.34rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--lab-accent);
}

/* o cursor do sistema some só quando o nosso está de pé */
:global(.lab-has-cursor), :global(.lab-has-cursor *) { cursor: none; }
</style>
