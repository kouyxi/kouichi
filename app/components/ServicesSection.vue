<script setup lang="ts">
import { waLink } from '~/data/contato'

const link = waLink

const packages = [
  {
    name: 'Uma página',
    forWhom: 'Pra quem vende um serviço só e precisa de um caminho curto até o WhatsApp.',
    features: ['1 página, rápida no celular', 'Texto escrito pra gerar contato', 'Botão de WhatsApp sempre à vista', 'Publicado, com 2 rodadas de ajuste'],
    prazo: '5 a 7 dias úteis',
    highlight: false,
    waText: 'Oi, Kouichi! Queria um site de uma página. Meu negócio é '
  },
  {
    name: 'Institucional',
    forWhom: 'Pra clínica, escritório e consultório, onde o cliente pesquisa bastante antes de escolher.',
    features: ['Uma seção pra cada dúvida do cliente', 'Lugar pra depoimento e foto do seu trabalho', 'SEO técnico pra achar no Google', 'Publicado, com 2 rodadas de ajuste'],
    prazo: '7 a 10 dias úteis',
    highlight: true,
    waText: 'Oi, Kouichi! Queria um site institucional. Meu negócio é '
  },
  {
    name: 'Completo',
    forWhom: 'Pra quem tem vários serviços, mais páginas e quer medir de onde vem cada contato.',
    features: ['Uma página pra cada serviço', 'Formulário, agenda ou o que seu negócio já usa', 'Você vê de onde veio cada contato', 'Publicado, com 2 rodadas de ajuste'],
    prazo: '10 a 15 dias úteis',
    highlight: false,
    waText: 'Oi, Kouichi! Queria um site completo. Meu negócio é '
  }
]
</script>

<template>
  <section id="servicos" class="section-light services">
    <div class="container">
      <header class="sec-head" v-reveal>
        <span class="index">(02)</span>
        <div class="sec-head-main">
          <p class="eyebrow accent">O que eu faço</p>
          <h2 class="display-2" data-split-lines>Três tamanhos de <em>site.</em></h2>
        </div>
        <p class="sec-note">
          Trabalho melhor com quem vive de cliente novo chegando: clínica, escritório,
          consultório, prestador de serviço. Se um cliente perdido dói no seu caixa,
          a gente se entende rápido.
        </p>
      </header>

      <div class="cards">
        <article
          v-for="(p, i) in packages"
          :key="p.name"
          class="pkg"
          :class="{ hot: p.highlight }"
          v-reveal="{ delay: i * 90 }"
        >
          <span v-if="p.highlight" class="badge">Mais pedido</span>
          <div class="pkg-top">
            <span class="index">0{{ i + 1 }}</span>
            <h3 class="pkg-name">{{ p.name }}</h3>
            <p class="pkg-for">{{ p.forWhom }}</p>
          </div>

          <ul class="pkg-feats">
            <li v-for="f in p.features" :key="f">{{ f }}</li>
          </ul>

          <div class="pkg-foot">
            <span class="pkg-prazo">Prazo: {{ p.prazo }}</span>
            <a
              v-magnetic="{ strength: 0.2 }"
              :href="link(p.waText)"
              target="_blank"
              rel="noopener"
              :data-track="'wa_plano_' + p.name.toLowerCase().replace(/\s+/g, '')"
              class="btn"
              :class="p.highlight ? 'btn-cta' : 'btn-outline'"
            >
              <WaIcon class="wa" :size="17" />
              Pedir orçamento
            </a>
          </div>
        </article>
      </div>

      <p class="ajuste-note" v-reveal>
        O valor depende do tamanho e eu falo ele na primeira conversa, antes de você
        se comprometer com qualquer coisa. Todo site inclui <strong>2 rodadas de ajuste</strong>,
        e o que vier depois vira orçamento à parte, combinado por escrito.
      </p>
    </div>
  </section>
</template>

<style scoped>
.services { padding-block: clamp(3.5rem, 8vw, 6.5rem); }

.sec-head {
  display: grid;
  gap: 1.5rem;
  padding-bottom: clamp(2.5rem, 5vw, 3.5rem);
}
.sec-head .index { display: block; }
.sec-head-main .eyebrow { margin-bottom: 0.75rem; }
.accent { color: var(--clay); }
.sec-head-main em { font-style: italic; color: var(--clay); }
.sec-note { max-width: 34rem; opacity: 0.78; line-height: 1.55; font-size: 0.98rem; }

@media (min-width: 900px) {
  .sec-head { grid-template-columns: auto 1fr auto; align-items: end; column-gap: 2.5rem; }
  .sec-note { max-width: 22rem; }
}

.cards {
  display: grid;
  gap: 1.5rem;
}
@media (min-width: 820px) {
  .cards { grid-template-columns: repeat(3, 1fr); align-items: stretch; }
}

.pkg {
  position: relative;
  display: flex;
  flex-direction: column;
  background: var(--card);
  border: 2px solid var(--ink);
  border-radius: 12px;
  box-shadow: var(--hard-lg);
  padding: 1.75rem 1.5rem;
  transition: transform 0.2s var(--ease), box-shadow 0.2s var(--ease);
}
.pkg:hover { transform: translate(-2px, -2px); box-shadow: 8px 8px 0 0 var(--ink); }
.pkg.hot { background: var(--ink); color: var(--paper); }
.pkg.hot .pkg-for, .pkg.hot .pkg-feats li { opacity: 0.85; }

.badge {
  position: absolute;
  top: -0.85rem;
  right: 1.25rem;
  background: var(--clay);
  color: var(--ink);
  border: 2px solid var(--ink);
  border-radius: 999px;
  padding: 0.2rem 0.7rem;
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.pkg-top .index { color: var(--clay); opacity: 1; }
.pkg-name {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 1.7rem;
  margin-top: 0.35rem;
}
.pkg-for { margin-top: 0.75rem; font-size: 0.9rem; line-height: 1.45; opacity: 0.8; }

.pkg-feats {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  margin-top: 1.5rem;
  padding-top: 1.25rem;
  border-top: 2px solid currentColor;
  font-size: 0.9rem;
}
.pkg-feats li { display: flex; align-items: flex-start; gap: 0.55rem; }
.pkg-feats li::before { content: '→'; color: var(--clay); font-weight: 700; }

.pkg-foot {
  margin-top: auto;
  padding-top: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-start;
}
.pkg-prazo { font-size: 0.82rem; opacity: 0.7; }
.pkg-foot .btn { width: 100%; justify-content: center; }
.pkg.hot .btn-outline { background: transparent; color: var(--paper); }
.pkg.hot .btn-outline::before { background: var(--paper); }
.pkg.hot .btn-outline:hover { color: var(--ink); }

.ajuste-note {
  margin-top: clamp(2rem, 4vw, 3rem);
  padding: 1.25rem 1.5rem;
  border: 2px dashed var(--ink);
  border-radius: 10px;
  font-size: 0.92rem;
  line-height: 1.5;
  max-width: 46rem;
}
.ajuste-note strong { color: var(--clay); }
</style>
