<script setup lang="ts">
// Três regras de trabalho. Não são sequência, então não levam número.
const principios = [
  { t: 'Prefiro fato a adjetivo', d: 'Se a gente não consegue provar, não entra no site.' },
  { t: 'Se não serve, sai', d: 'Cada coisa na página tem que ajudar alguém a te procurar.' },
  { t: 'Você sabe onde está pisando', d: 'Escopo, prazo e valor combinados antes.' }
]
</script>

<template>
  <section id="sobre" class="mf sec">
    <div class="sec-in">
      <h2 class="sec-rotulo">Quem faz</h2>
      <div>
      <p class="mf-big">
        Sou o Victor Kouichi, de Goiânia. Passo o dia procurando onde as coisas
        quebram: o formulário que não envia, a página que abre torta no
        celular, a porta aberta que derruba o site num sábado. E estudo o que
        faz alguém decidir, porque uma página faz a pessoa te chamar e a
        outra faz ela fechar a aba. Site bonito que não gera contato é despesa.
      </p>

      <p class="mf-honesto">
        Minha carteira ainda é curta. É por isso que eu topo prazo curto, valor
        justo e a regra de você não pagar se o layout não te agradar: estou
        construindo reputação, e isso joga a seu favor.
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
  font-weight: 500;
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
.mf-t { font-family: var(--font-display); font-weight: 500; font-size: var(--t-1); letter-spacing: -0.01em; }
.mf-d { margin-top: var(--sp-1); font-size: var(--t-s); line-height: 1.55; color: var(--lab-dim); }
</style>
