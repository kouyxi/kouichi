<script setup lang="ts">
const { waLink, plans: packages } = useSite()
const link = (text: string) => waLink(text)
</script>

<template>
  <section id="servicos" class="section-light services">
    <div class="container">
      <header class="sec-head" v-reveal>
        <span class="index">(03)</span>
        <div class="sec-head-main">
          <p class="eyebrow accent">Serviços &amp; pacotes</p>
          <h2 class="display-2">O que eu construo pra <em>você vender mais.</em></h2>
        </div>
        <p class="sec-note">
          Preço aberto de propósito — você já sabe onde entra antes da conversa.
          São <strong>valores de lançamento</strong>: sobem conforme a agenda enche.
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
          <span v-if="p.badge" class="badge">{{ p.badge }}</span>
          <div class="pkg-top">
            <span class="index">0{{ i + 1 }}</span>
            <h3 class="pkg-name">{{ p.name }}</h3>
            <p class="pkg-price">{{ p.price }}</p>
            <p class="pkg-for">{{ p.forWhom }}</p>
          </div>

          <ul class="pkg-feats">
            <li v-for="f in p.features" :key="f">{{ f }}</li>
          </ul>

          <div class="pkg-foot">
            <span class="pkg-prazo">⏱ {{ p.prazo }}</span>
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
              Quero este plano
            </a>
            <span class="cta-trigger">Resposta no mesmo dia · sem compromisso</span>
          </div>
        </article>
      </div>

      <p class="ajuste-note" v-reveal>
        <strong>Você aprova antes de publicar</strong> — 50% só na entrega, sem risco.
        Ajuste = texto, imagem, cor e correção, dentro do período de cada plano;
        página nova ou mudança de escopo entra à parte, combinada por escrito.
        Depois do período, cuido do site por uma <strong>mensalidade opcional</strong>.
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
.pkg-price {
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--clay);
  margin-top: 0.15rem;
}
.pkg.hot .pkg-price { color: var(--clay); }
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
.cta-trigger { width: 100%; text-align: center; font-size: 0.72rem; opacity: 0.65; margin-top: -0.35rem; }
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
