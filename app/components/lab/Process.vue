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

  }, el)

  onBeforeUnmount(() => ctx.revert())
})
</script>

<template>
  <section id="processo" ref="root" class="pr sec">
   <div class="sec-in">
    <p class="sec-rotulo">Como funciona um site novo</p>
    <div>
    <header class="pr-head">
      <h2 class="sec-h2">Você sabe onde pisa em cada etapa.</h2>
      <p class="sec-lead">
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
          </div>
          <span class="pr-marco">{{ p.marco }}</span>
        </div>
      </li>
    </ol>

    <p class="pr-garantia">
      Se o layout não te agradar, você não paga e a gente encerra ali.
    </p>
    </div>
   </div>
  </section>
</template>

<style scoped>
.pr-head { margin-bottom: var(--sp-4); }

/* pilha: cada carta gruda um pouco mais abaixo que a anterior, então
   as bordas superiores ficam visíveis como abas de fichário */
/* o reset global zera só ul; sem isso o ol imprime "1." ao lado das cartas */
.pr-stack { display: grid; gap: var(--sp-3); list-style: none; padding: 0; margin: 0; }
.pr-card {
  position: sticky;
  top: calc(14vh + var(--i, 0) * 1.5rem);
  will-change: transform;
}
.pr-card:nth-child(1) { --i: 0; z-index: 1; }
.pr-card:nth-child(2) { --i: 1; z-index: 2; }
.pr-card:nth-child(3) { --i: 2; z-index: 3; }

/* número numa coluna fixa, texto na outra: os três títulos alinham entre
   si e com a margem do conteúdo da seção */
.pr-card-in {
  display: grid;
  grid-template-columns: 3.5rem minmax(0, 1fr) auto;
  gap: var(--sp-3);
  align-items: start;
  padding: var(--sp-4) var(--sp-4) var(--sp-4) var(--sp-3);
  background: var(--lab-surface);
  color: var(--lab-fg);
  border: 1px solid var(--lab-line);
  border-radius: 4px;
  min-height: clamp(12rem, 34vh, 17rem);
}
.pr-n {
  font-family: var(--font-display);
  font-weight: 500;
  font-size: var(--t-h3);
  line-height: 1;
  letter-spacing: -0.03em;
  color: var(--lab-accent);
  font-variant-numeric: tabular-nums;
}
.pr-body { max-width: 34rem; }
.pr-t {
  font-family: var(--font-display);
  font-weight: 500;
  font-size: var(--t-h3);
  line-height: 1.1;
  letter-spacing: -0.025em;
}
.pr-d { margin-top: var(--sp-2); line-height: 1.6; color: var(--lab-dim); }
/* o marco é o que você leva da etapa, não um botão: fica em contorno */
.pr-marco {
  display: inline-block;
  align-self: end;
  white-space: nowrap;
  padding: 0.35rem 0.85rem;
  border: 1px solid var(--lab-line-2);
  border-radius: 999px;
  font-size: var(--t-xs);
  font-weight: 600;
}

.pr-garantia {
  margin-top: var(--sp-5);
  padding-top: var(--sp-3);
  border-top: 1px solid var(--lab-line);
  font-family: var(--font-display);
  font-weight: 500;
  font-size: var(--t-h3);
  line-height: 1.2;
  letter-spacing: -0.02em;
  max-width: 34rem;
}

@media (max-width: 720px) {
  .pr-card-in { grid-template-columns: 1fr; gap: var(--sp-2); padding: var(--sp-3); min-height: auto; }
  .pr-marco { justify-self: start; margin-top: var(--sp-1); white-space: normal; }
}
</style>
