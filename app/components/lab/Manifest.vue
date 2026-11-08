<script setup lang="ts">
// Três regras de trabalho. Não são sequência, então não levam número.
const principios = [
  { t: 'Prefiro fato a adjetivo', d: 'Se a gente não consegue provar, não entra no site.' },
  { t: 'Se não serve, sai', d: 'Cada coisa na página tem que ajudar alguém a te procurar.' },
  { t: 'Você sabe onde está pisando', d: 'Escopo, prazo e valor combinados antes.' }
]
</script>

<template>
  <section id="sobre" class="mf">
    <div class="mf-inner">
      <h2 class="mf-h2">Quem faz</h2>
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
  </section>
</template>

<style scoped>
.mf {
  padding: clamp(3.5rem, 10vh, 7rem) var(--lab-edge);
  background: var(--lab-bg);
  color: var(--lab-fg);
  border-top: 1px solid var(--lab-line);
}
.mf-inner { max-width: 68rem; margin-inline: auto; width: 100%; }
.mf-h2 { font-size: 0.86rem; font-weight: 500; color: var(--lab-dim); }

.mf-big {
  margin-top: 1.25rem;
  font-family: var(--font-display);
  font-weight: 500;
  font-size: clamp(1.35rem, 2.6vw, 2.2rem);
  line-height: 1.25;
  letter-spacing: -0.02em;
  max-width: 40rem;
}

.mf-honesto {
  margin-top: clamp(1.75rem, 4vh, 2.5rem);
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
.mf-princ { background: var(--lab-surface); padding: 1.5rem; }
.mf-t { font-family: var(--font-display); font-weight: 500; font-size: 1.15rem; letter-spacing: -0.01em; }
.mf-d { margin-top: 0.5rem; font-size: 0.92rem; line-height: 1.5; color: var(--lab-dim); }
</style>
