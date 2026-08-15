<script setup lang="ts">
const root = ref<HTMLElement | null>(null)

const principios = [
  { n: '01', t: 'Prefiro fato a adjetivo', d: 'Se a gente não consegue provar, não entra no site.' },
  { n: '02', t: 'Se não serve, sai', d: 'Cada coisa na página tem que ajudar alguém a te procurar.' },
  { n: '03', t: 'Você sabe onde está pisando', d: 'Escopo, prazo e valor combinados antes.' }
]

onMounted(async () => {
  if (!root.value || prefersReducedMotion()) return
  const el = root.value
  const { gsap, SplitText } = await useGsap()
  await document.fonts?.ready

  const ctx = gsap.context(() => {
    const alvo = el.querySelector('.mf-big') as HTMLElement
    if (!alvo) return

    // Palavra a palavra amarrado ao scroll: o texto acende conforme você
    // desce, em vez de aparecer todo de uma vez. Como a página está presa
    // aqui, ler e rolar viram o mesmo gesto.
    const split = SplitText.create(alvo, { type: 'words', wordsClass: 'mf-word' })
    gsap.fromTo(
      split.words,
      { opacity: 0.12 },
      {
        opacity: 1,
        ease: 'none',
        stagger: 1,
        scrollTrigger: {
          trigger: el,
          pin: true,
          start: 'top top',
          end: '+=110%',
          scrub: 0.5
        }
      }
    )

    gsap.from('.mf-princ', {
      opacity: 0,
      y: 22,
      duration: 0.6,
      stagger: 0.08,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.mf-princs', start: 'top 88%', once: true }
    })
  }, el)

  onBeforeUnmount(() => ctx.revert())
})
</script>

<template>
  <section id="sobre" ref="root" class="mf">
    <div class="mf-inner">
      <span class="lab-index">(05)</span>
      <p class="mf-big">
        Sou o Kouichi, de Goiânia. Trabalho com backend e estudo segurança de
        aplicação, que é a mania de ficar procurando onde as coisas quebram.
        Isso me estragou de um jeito útil: eu não consigo olhar um site e ver
        só se está bonito. Site bonito que não gera contato é despesa.
      </p>

      <p class="mf-honesto">
        Minha carteira ainda é curta. É por isso que eu topo prazo curto, valor
        justo e a regra de você não pagar se o layout não te agradar: estou
        construindo reputação, e isso joga a seu favor.
      </p>

      <ul class="mf-princs">
        <li v-for="p in principios" :key="p.n" class="mf-princ">
          <span class="mf-n">{{ p.n }}</span>
          <h3 class="mf-t">{{ p.t }}</h3>
          <p class="mf-d">{{ p.d }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.mf {
  position: relative;
  min-height: 100svh;
  display: grid;
  align-content: center;
  padding: clamp(3.5rem, 10vh, 6rem) var(--lab-edge);
  background: var(--lab-bg);
  color: var(--lab-fg);
  border-top: 1px solid var(--lab-line);
}
.mf-inner { max-width: 68rem; margin-inline: auto; width: 100%; }

.mf-big {
  margin-top: 1.25rem;
  font-family: var(--font-display);
  font-weight: 500;
  font-size: clamp(1.5rem, 3.6vw, 3.1rem);
  line-height: 1.18;
  letter-spacing: -0.02em;
}
/* SplitText gera .mf-word; sem isso o espaço entre palavras some no reflow */
.mf-big :deep(.mf-word) { will-change: opacity; }

.mf-honesto {
  margin-top: clamp(1.75rem, 4vh, 2.75rem);
  padding-left: 1.25rem;
  border-left: 2px solid var(--lab-accent);
  max-width: 34rem;
  line-height: 1.6;
  color: var(--lab-dim);
}

.mf-princs {
  display: grid;
  gap: 1px;
  margin-top: clamp(2.5rem, 6vh, 4rem);
  background: var(--lab-line);
  border: 1px solid var(--lab-line);
}
@media (min-width: 820px) { .mf-princs { grid-template-columns: repeat(3, 1fr); } }
.mf-princ { background: var(--lab-bg); padding: 1.5rem; }
.mf-n {
  font-family: var(--font-display);
  font-weight: 900;
  font-size: 1.3rem;
  color: var(--lab-accent);
}
.mf-t { margin-top: 0.6rem; font-size: 1.02rem; font-weight: 600; }
.mf-d { margin-top: 0.4rem; font-size: 0.88rem; line-height: 1.5; color: var(--lab-dim); }
</style>
