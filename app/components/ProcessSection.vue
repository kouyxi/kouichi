<script setup lang="ts">
import { waLink } from '~/data/contato'

const whatsapp = waLink('Oi, Kouichi! Queria entender como funciona. Meu negócio é ')

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
</script>

<template>
  <section id="processo" class="section-ink processo">
    <div class="craft-grid proc-craft" aria-hidden="true" data-parallax="4" />
    <div class="grain" />

    <div class="container proc-inner">
      <header class="proc-head">
        <span class="index">(03)</span>
        <p class="eyebrow accent">Como funciona</p>
        <h2 class="display-2" data-split-lines>
          Você sabe onde <em>pisa</em> em cada etapa.
        </h2>
        <p class="proc-note">
          A parte que mais trava gente na hora de contratar site é não saber o que vem
          depois do "pode fazer". Então aqui vai, sem letra miúda.
        </p>
      </header>

      <ol class="passos">
        <li v-for="p in passos" :key="p.n" class="passo" v-reveal="{ delay: 80 }">
          <span class="passo-n">{{ p.n }}</span>
          <div class="passo-body">
            <h3 class="passo-t">{{ p.t }}</h3>
            <p class="passo-d">{{ p.d }}</p>
            <span class="passo-marco">{{ p.marco }}</span>
          </div>
        </li>
      </ol>

      <div class="proc-cta" v-reveal>
        <p class="garantia">
          <strong>Se o layout não te agradar, você não paga e a gente encerra ali.</strong>
          Eu prefiro perder um projeto do que entregar um site que você não tem orgulho de mandar pros seus clientes.
        </p>
        <a
          v-magnetic="{ strength: 0.26 }"
          :href="whatsapp"
          target="_blank"
          rel="noopener"
          data-track="wa_processo"
          class="btn btn-cta"
        >
          <WaIcon class="wa" :size="18" />
          Começar pela conversa
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.processo {
  position: relative;
  overflow: hidden;
  padding-block: clamp(3.5rem, 8vw, 6.5rem);
  border-block: 2px solid var(--ink);
}
.proc-craft {
  inset: 0;
  --grid-line: rgba(243, 234, 216, 0.07);
}
.processo .grain { mix-blend-mode: screen; opacity: 0.05; }
.proc-inner { position: relative; z-index: 2; }

.proc-head .index { display: block; color: var(--paper); opacity: 0.5; }
.proc-head .eyebrow { margin: 0.9rem 0 1rem; }
.accent { color: var(--clay); }
.proc-head em { font-style: italic; color: var(--clay); }
.proc-note {
  margin-top: 1.5rem;
  max-width: 38rem;
  opacity: 0.78;
  line-height: 1.6;
}

.passos {
  margin-top: clamp(2.5rem, 5vw, 4rem);
  display: grid;
  gap: 0;
  border-top: 2px solid rgba(243, 234, 216, 0.2);
}
.passo {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1.25rem;
  padding-block: clamp(1.5rem, 3vw, 2.25rem);
  border-bottom: 2px solid rgba(243, 234, 216, 0.2);
}
.passo-n {
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 600;
  font-size: clamp(1.75rem, 4vw, 2.75rem);
  color: var(--clay);
  line-height: 1;
}
.passo-t {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: clamp(1.35rem, 3vw, 1.9rem);
  line-height: 1.1;
}
.passo-d {
  margin-top: 0.6rem;
  max-width: 44rem;
  line-height: 1.6;
  opacity: 0.8;
  font-size: 0.98rem;
}
.passo-marco {
  display: inline-block;
  margin-top: 0.9rem;
  padding: 0.25rem 0.7rem;
  border: 1.5px solid var(--clay);
  border-radius: 999px;
  color: var(--clay);
  font-size: 0.74rem;
  font-weight: 600;
  letter-spacing: 0.04em;
}

@media (min-width: 900px) {
  .passo { grid-template-columns: 6rem 1fr; gap: 2.5rem; align-items: start; }
}

.proc-cta {
  margin-top: clamp(2.5rem, 5vw, 3.5rem);
  display: grid;
  gap: 1.75rem;
  align-items: center;
}
.garantia {
  max-width: 42rem;
  line-height: 1.6;
  opacity: 0.85;
  font-size: 0.98rem;
}
.garantia strong {
  display: block;
  margin-bottom: 0.4rem;
  color: var(--paper);
  opacity: 1;
  font-size: 1.06rem;
}
.proc-cta .btn { justify-self: start; }
.proc-cta .btn-cta {
  border-color: var(--paper);
  box-shadow: 4px 4px 0 0 var(--paper);
}
.proc-cta .btn-cta:hover { box-shadow: 2px 2px 0 0 var(--paper); }
.proc-cta .btn-cta:active { box-shadow: 0 0 0 0 var(--paper); }

@media (min-width: 900px) {
  .proc-cta { grid-template-columns: 1fr auto; gap: 3rem; }
}
</style>
