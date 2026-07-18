<script setup lang="ts">
const steps = [
  { n: '01', t: 'Conversa no WhatsApp', d: 'A gente alinha objetivo, prazo e escopo. Sem compromisso — você já sai sabendo se faz sentido.' },
  { n: '02', t: 'Você manda o material', d: 'Textos, fotos e dados do negócio. Eu te envio uma lista simples do que preciso pra começar.' },
  { n: '03', t: 'Desenho e desenvolvo', d: 'Layout sob medida, copy de conversão e métrica embutida. Você acompanha o rascunho.' },
  { n: '04', t: 'Você aprova e publico', d: '50% só na entrega, antes de ir ao ar. Ajustes inclusos no período do plano.' }
]
</script>

<template>
  <section id="como-funciona" class="section-light process">
    <div class="container">
      <header class="sec-head" v-reveal>
        <span class="index">(02)</span>
        <div class="sec-head-main">
          <p class="eyebrow accent">Como funciona</p>
          <h2 class="display-2">Do <em>oi</em> ao site no ar.</h2>
        </div>
        <p class="sec-note">
          Processo simples e sem enrolação — você sabe exatamente o que acontece em cada etapa.
        </p>
      </header>

      <ol class="steps">
        <li v-for="(s, i) in steps" :key="s.n" class="step" v-reveal="{ delay: i * 90 }">
          <span class="step-num">{{ s.n }}</span>
          <h3 class="step-title">{{ s.t }}</h3>
          <p class="step-desc">{{ s.d }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.process { padding-block: clamp(3.5rem, 8vw, 6.5rem); }

.sec-head {
  display: grid;
  gap: 1.5rem;
  padding-bottom: clamp(2.5rem, 5vw, 3.5rem);
}
.sec-head .index { display: block; }
.sec-head-main .eyebrow { margin-bottom: 0.75rem; }
.accent { color: var(--clay); }
.sec-head-main em { font-style: italic; color: var(--clay); }
.sec-note { max-width: 30rem; opacity: 0.78; line-height: 1.55; font-size: 0.98rem; }
@media (min-width: 900px) {
  .sec-head { grid-template-columns: auto 1fr auto; align-items: end; column-gap: 2.5rem; }
  .sec-note { max-width: 22rem; }
}

.steps { display: grid; gap: 1.75rem; list-style: none; padding: 0; margin: 0; }
@media (min-width: 820px) { .steps { grid-template-columns: repeat(4, 1fr); gap: 1.5rem; } }

.step { padding-top: 1.25rem; border-top: 2px solid var(--ink); }
.step-num {
  display: block;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 2.1rem;
  line-height: 1;
  color: var(--clay);
}
.step-title { font-size: 1.1rem; font-weight: 600; margin-top: 0.6rem; }
.step-desc { margin-top: 0.5rem; font-size: 0.92rem; line-height: 1.5; opacity: 0.8; }
</style>
