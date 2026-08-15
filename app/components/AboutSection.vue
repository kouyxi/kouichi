<script setup lang="ts">
const principios = [
  { n: '01', t: 'Prefiro fato a adjetivo', d: 'Se a gente não consegue provar, não entra no site. "Excelência em atendimento" não convence ninguém. "Atendo em até 24h" convence.' },
  { n: '02', t: 'Se não serve, sai', d: 'Cada coisa na página tem que ajudar alguém a te procurar. O que só está lá pra encher espaço eu tiro, mesmo que tenha dado trabalho.' },
  { n: '03', t: 'Você sabe onde está pisando', d: 'Escopo, prazo e valor combinados antes. Nunca vou aparecer no fim do mês com uma cobrança que a gente não conversou.' }
]
</script>

<template>
  <section id="sobre" class="section-light about">
    <div class="craft-grid about-craft" aria-hidden="true" data-parallax="4" />
    <div class="container about-grid">
      <div class="about-copy" v-reveal>
        <span class="index">(04)</span>
        <p class="eyebrow accent">Sobre</p>
        <h2 class="display-2" data-split-lines>
          Um dev que <em>audita</em> o que escreve.
        </h2>
        <div class="about-text">
          <p>
            Sou o Kouichi, de Goiânia. Trabalho com backend (Laravel e Vue) e
            estudo segurança de aplicação, que é a mania de ficar procurando
            <strong>onde as coisas quebram</strong>. Isso me estragou de um jeito
            útil: eu não consigo olhar um site e ver só se está bonito.
          </p>
          <p>
            Site bonito que não gera contato é despesa. Então eu construo pensando
            em uma pergunta só, que é o que faz alguém parar de rolar a página e
            te chamar. Se a resposta não estiver clara pra mim, também não vai
            estar pro seu cliente.
          </p>
          <p class="about-honest">
            Minha carteira ainda é curta. É por isso que eu topo prazo curto, valor
            justo e a regra de você não pagar se o layout não te agradar: estou
            construindo reputação, e isso joga a seu favor.
          </p>
        </div>
      </div>

      <ul class="principios" v-reveal="{ delay: 120 }">
        <li v-for="p in principios" :key="p.n" class="principio">
          <span class="p-num">{{ p.n }}</span>
          <div>
            <h3 class="p-title">{{ p.t }}</h3>
            <p class="p-desc">{{ p.d }}</p>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.about { padding-block: clamp(3.5rem, 8vw, 6.5rem); position: relative; overflow: hidden; }
.about-craft { inset: 10% -5% 10% 45%; opacity: 0.7; }

.about-grid {
  position: relative;
  z-index: 2;
  display: grid;
  gap: clamp(2.5rem, 5vw, 4rem);
}
@media (min-width: 900px) {
  .about-grid { grid-template-columns: 1.05fr 0.95fr; align-items: start; }
}

.about-copy .index { display: block; }
.about-copy .eyebrow { margin: 0.75rem 0; }
.accent { color: var(--clay); }
.about-copy em { font-style: italic; color: var(--clay); }
.about-text { margin-top: 1.75rem; display: grid; gap: 1rem; max-width: 34rem; }
.about-text p { line-height: 1.6; opacity: 0.85; }
.about-text strong { color: var(--ink); opacity: 1; }
.about-honest {
  margin-top: 0.5rem;
  padding-left: 1.1rem;
  border-left: 2px solid var(--clay);
  font-size: 0.95rem;
}

.principios {
  display: grid;
  gap: 0;
  border: 2px solid var(--ink);
  border-radius: 12px;
  overflow: hidden;
  background: var(--card);
  box-shadow: var(--hard-lg);
}
.principio {
  display: flex;
  gap: 1.15rem;
  padding: 1.4rem 1.5rem;
}
.principio + .principio { border-top: 2px solid var(--ink); }
.p-num {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 1.4rem;
  color: var(--clay);
  line-height: 1;
}
.p-title { font-size: 1.05rem; font-weight: 600; }
.p-desc { margin-top: 0.35rem; font-size: 0.9rem; line-height: 1.45; opacity: 0.78; }
</style>
