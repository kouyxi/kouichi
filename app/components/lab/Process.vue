<script setup lang="ts">
const passos = [
  {
    n: '01',
    t: 'A gente conversa',
    d: 'Você me conta o que o seu negócio faz e quem você quer atender. Eu te digo o tamanho de site que resolve, o prazo e o valor. Se eu achar que você não precisa de site agora, eu falo.',
    marco: 'Sai daqui sabendo quanto custa'
  },
  {
    n: '02',
    t: 'Eu mostro o layout',
    d: 'Antes de programar qualquer coisa, você vê como o site vai ficar. É aqui que a gente ajusta o que não ficou do seu jeito, quantas vezes precisar.',
    marco: 'Só depois do seu ok eu sigo'
  },
  {
    n: '03',
    t: 'Coloco no ar',
    d: 'Site publicado, funcionando no celular, botão de WhatsApp no lugar. Te mostro como acompanhar quantas pessoas estão chamando você.',
    marco: 'Mais 2 rodadas de ajuste inclusas'
  }
]

const root = ref<HTMLElement | null>(null)

onMounted(async () => {
  if (!root.value || prefersReducedMotion()) return
  const el = root.value
  const { gsap } = await useGsap()

  const ctx = gsap.context(() => {
    // As cartas são sticky no CSS: elas param e a de baixo sobe por cima.
    // O GSAP só cuida do que o sticky não faz — encolher e apagar a carta
    // que ficou embaixo, pra pilha ganhar profundidade em vez de virar
    // um monte de retângulos sobrepostos.
    const cards = gsap.utils.toArray<HTMLElement>('.pr-card')
    cards.forEach((card, i) => {
      if (i === cards.length - 1) return
      gsap.to(card, {
        scale: 0.92,
        opacity: 0.35,
        ease: 'none',
        scrollTrigger: {
          trigger: cards[i + 1],
          start: 'top bottom',
          end: 'top top',
          scrub: true
        }
      })
    })

    gsap.from('.pr-head-in', {
      yPercent: 105,
      duration: 0.9,
      stagger: 0.08,
      ease: 'expo.out',
      scrollTrigger: { trigger: el, start: 'top 70%', once: true }
    })
  }, el)

  onBeforeUnmount(() => ctx.revert())
})
</script>

<template>
  <section id="processo" ref="root" class="pr">
    <header class="pr-head">
      <span class="lab-index">(03)</span>
      <h2 class="pr-title">
        <span class="pr-mask"><span class="pr-head-in">Você sabe</span></span>
        <span class="pr-mask"><span class="pr-head-in">onde <em>pisa</em></span></span>
        <span class="pr-mask"><span class="pr-head-in">em cada etapa.</span></span>
      </h2>
      <p class="pr-note">
        A parte que mais trava gente na hora de contratar site é não saber o que vem
        depois do "pode fazer". Então aqui vai, sem letra miúda.
      </p>
    </header>

    <ol class="pr-stack">
      <li v-for="p in passos" :key="p.n" class="pr-card">
        <div class="pr-card-in">
          <span class="pr-n">{{ p.n }}</span>
          <div class="pr-body">
            <h3 class="pr-t">{{ p.t }}</h3>
            <p class="pr-d">{{ p.d }}</p>
            <span class="pr-marco">{{ p.marco }}</span>
          </div>
        </div>
      </li>
    </ol>

    <p class="pr-garantia">
      Se o layout não te agradar, você não paga e a gente encerra ali.
    </p>
  </section>
</template>

<style scoped>
.pr {
  position: relative;
  padding: clamp(4rem, 12vh, 8rem) var(--lab-edge) clamp(3rem, 8vh, 6rem);
  background: var(--lab-fg);
  color: var(--lab-bg);
}

.pr-head { max-width: 60rem; margin-bottom: clamp(2.5rem, 6vh, 4rem); }
.pr-head .lab-index { color: rgba(23, 19, 9, 0.5); }
.pr-title {
  margin-top: 1rem;
  font-family: var(--font-display);
  font-weight: 900;
  font-size: clamp(2.4rem, 7vw, 5.5rem);
  line-height: 0.9;
  letter-spacing: -0.035em;
  text-transform: uppercase;
}
.pr-title em { font-style: italic; color: var(--lab-accent); }
.pr-mask { display: block; overflow: hidden; padding-bottom: 0.05em; }
.pr-head-in { display: block; }
.pr-note {
  margin-top: 1.5rem;
  max-width: 32rem;
  line-height: 1.6;
  opacity: 0.68;
}

/* pilha: cada carta gruda um pouco mais abaixo que a anterior, então
   as bordas superiores ficam visíveis como abas de fichário */
/* o reset global zera só ul; sem isso o ol imprime "1." ao lado das cartas */
.pr-stack { display: grid; gap: clamp(1.5rem, 4vh, 3rem); list-style: none; padding: 0; margin: 0; }
.pr-card {
  position: sticky;
  top: calc(14vh + var(--i, 0) * 1.5rem);
  will-change: transform;
}
.pr-card:nth-child(1) { --i: 0; z-index: 1; }
.pr-card:nth-child(2) { --i: 1; z-index: 2; }
.pr-card:nth-child(3) { --i: 2; z-index: 3; }

.pr-card-in {
  display: flex;
  gap: clamp(1.25rem, 4vw, 3rem);
  align-items: start;
  padding: clamp(1.75rem, 4vw, 3rem);
  background: var(--lab-bg);
  color: var(--lab-fg);
  border-radius: 4px;
  min-height: clamp(15rem, 42vh, 22rem);
}
.pr-n {
  font-family: var(--font-display);
  font-weight: 900;
  font-size: clamp(2.5rem, 7vw, 6rem);
  line-height: 0.8;
  letter-spacing: -0.05em;
  color: var(--lab-accent);
}
.pr-body { max-width: 34rem; }
.pr-t {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: clamp(1.5rem, 3vw, 2.4rem);
  line-height: 1.05;
  letter-spacing: -0.02em;
}
.pr-d { margin-top: 0.9rem; line-height: 1.6; color: var(--lab-dim); }
.pr-marco {
  display: inline-block;
  margin-top: 1.25rem;
  padding: 0.35rem 0.85rem;
  border-radius: 999px;
  background: var(--lab-accent);
  color: var(--lab-bg);
  font-size: 0.76rem;
  font-weight: 600;
  letter-spacing: 0.04em;
}

.pr-garantia {
  margin-top: clamp(3rem, 8vh, 5rem);
  padding-top: 1.5rem;
  border-top: 1px solid rgba(23, 19, 9, 0.2);
  font-family: var(--font-display);
  font-size: clamp(1.15rem, 2.4vw, 1.9rem);
  line-height: 1.25;
  max-width: 40rem;
}

@media (max-width: 720px) {
  .pr-card-in { flex-direction: column; min-height: auto; }
}
</style>
