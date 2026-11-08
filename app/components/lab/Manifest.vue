<script setup lang="ts">
// Três promessas sobre o site do cliente, não regras minhas. Não são
// sequência, então não levam número.
const principios = [
  { t: 'Sem exagero', d: 'Seu site diz o que dá pra provar. Nada de "o melhor de Goiânia".' },
  { t: 'Nada sobrando', d: 'Cada coisa na página leva alguém até o seu WhatsApp.' },
  { t: 'Combinado antes', d: 'Escopo, prazo e valor fechados antes de começar.' }
]
</script>

<template>
  <section id="sobre" class="mf sec">
    <div class="sec-in">
      <h2 class="sec-rotulo">Quem faz</h2>
      <div>
      <p class="mf-big">
        Sou o Victor Kouichi, de Goiânia. Conserto o que quebra: o formulário
        que não envia, a página torta no celular, o site invadido que começou
        a mostrar aposta. Site bonito que não gera contato é despesa.
      </p>

      <p class="mf-honesto">
        Minha carteira é curta. Por isso prazo curto, valor justo e a regra de
        não pagar se não gostar do layout. Estou construindo reputação.
        Isso joga a seu favor.
      </p>

      <ul class="mf-princs">
        <li v-for="p in principios" :key="p.t" class="mf-princ">
          <h3 class="mf-t">{{ p.t }}</h3>
          <p class="mf-d">{{ p.d }}</p>
        </li>
      </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.mf-big {
  font-family: var(--font-display);
  font-weight: var(--w-display, 500);
  font-size: var(--t-h3);
  line-height: 1.3;
  letter-spacing: -0.02em;
  max-width: 36rem;
  text-wrap: pretty;
}

.mf-honesto {
  margin-top: var(--sp-4);
  padding-left: 1.25rem;
  border-left: 2px solid var(--lab-accent);
  max-width: 34rem;
  line-height: 1.6;
  color: var(--lab-dim);
}

.mf-princs {
  display: grid;
  gap: 1px;
  margin-top: var(--sp-5);
  background: var(--lab-line);
  border: 1px solid var(--lab-line);
}
@media (min-width: 820px) { .mf-princs { grid-template-columns: repeat(3, 1fr); } }

.mf-princ { background: var(--lab-surface); padding: var(--sp-3); }
.mf-t { font-family: var(--font-display); font-weight: var(--w-display, 500); font-size: var(--t-1); letter-spacing: -0.01em; }
.mf-d { margin-top: var(--sp-1); font-size: var(--t-s); line-height: 1.55; color: var(--lab-dim); }
</style>
