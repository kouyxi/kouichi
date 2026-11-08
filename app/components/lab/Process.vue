<script setup lang="ts">
const passos = [
  {
    n: '01',
    t: 'A gente conversa',
    d: 'Você conta o que faz e pra quem. Eu digo tamanho, prazo e valor. Se não precisar de site, eu falo.',
    marco: 'Sai sabendo quanto custa'
  },
  {
    n: '02',
    t: 'Você vê o layout',
    d: 'Antes de uma linha de código, você vê o site. Ajusta até ficar do seu jeito.',
    marco: 'Só sigo com o seu ok'
  },
  {
    n: '03',
    t: 'No ar',
    d: 'Publicado, rápido no celular, WhatsApp no lugar. Você aprende a ver quem está chamando.',
    marco: 'Duas rodadas de ajuste inclusas'
  }
]
</script>

<template>
  <section id="processo" class="pr sec">
   <div class="sec-in">
    <p class="sec-rotulo">Como funciona</p>
    <div>
    <header class="pr-head">
      <h2 class="sec-h2">Você sabe onde pisa.</h2>
      <p class="sec-lead">Três etapas. Você aprova cada uma. Sem letra miúda.</p>
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
      Não gostou do layout? Não paga. Encerramos ali.
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
  font-weight: var(--w-display, 500);
  font-size: var(--t-h3);
  line-height: 1;
  letter-spacing: -0.03em;
  color: var(--lab-accent);
  font-variant-numeric: tabular-nums;
}
.pr-body { max-width: 34rem; }
.pr-t {
  font-family: var(--font-display);
  font-weight: var(--w-display, 500);
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

/* Filete laranja à esquerda: é a marca de compromisso do site inteiro, a
   mesma da regra do site invadido e do "minha carteira ainda é curta". */
.pr-garantia {
  margin-top: var(--sp-5);
  padding-left: var(--sp-3);
  border-left: 2px solid var(--lab-accent);
  font-family: var(--font-display);
  font-weight: var(--w-display, 500);
  font-size: var(--t-h3);
  line-height: 1.2;
  letter-spacing: -0.02em;
  max-width: 34rem;
}

/* A carta que ficou embaixo encolhe e apaga enquanto a próxima sobe por
   cima: a pilha ganha profundidade em vez de virar retângulos sobrepostos.
   Cada carta segue a linha do tempo de visão da seguinte, no compositor,
   sem JS. Navegador sem suporte fica com a pilha parada, que funciona igual. */
@media (prefers-reduced-motion: no-preference) {
  @supports (animation-timeline: view()) {
    .pr-stack { timeline-scope: --pr-2, --pr-3; }
    .pr-card:nth-child(2) { view-timeline-name: --pr-2; }
    .pr-card:nth-child(3) { view-timeline-name: --pr-3; }
    .pr-card:nth-child(1),
    .pr-card:nth-child(2) { animation: prRecua linear both; animation-range: entry 0% exit 0%; }
    .pr-card:nth-child(1) { animation-timeline: --pr-2; }
    .pr-card:nth-child(2) { animation-timeline: --pr-3; }
  }
}
@keyframes prRecua { to { transform: scale(0.92); opacity: 0.35; } }

@media (max-width: 720px) {
  .pr-card-in { grid-template-columns: 1fr; gap: var(--sp-2); padding: var(--sp-3); min-height: auto; }
  .pr-marco { justify-self: start; margin-top: var(--sp-1); white-space: normal; }
}
</style>
