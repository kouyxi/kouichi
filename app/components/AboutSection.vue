<script setup lang="ts">
const principios = [
  { n: '01', t: 'Prova antes de promessa', d: 'Fato concreto no lugar de adjetivo. Se não dá pra provar, não vai pro site.' },
  { n: '02', t: 'Cada elemento tem função', d: 'Nada entra só por enfeite. Se não ajuda o visitante a agir, sai.' },
  { n: '03', t: 'Preço e escopo claros', d: 'Você sabe o que está incluso e quanto custa antes de fechar. Sem surpresa depois.' }
]

const { aboutPhoto } = useSite()
</script>

<template>
  <section id="sobre" class="section-ink about">
    <div class="craft-grid about-craft" aria-hidden="true" data-parallax="6" />
    <div class="container about-grid">
      <div class="about-copy" v-reveal>
        <div class="portrait" :class="{ empty: !aboutPhoto }">
          <img v-if="aboutPhoto" :src="aboutPhoto" alt="Kouichi" />
          <span v-else>Sua foto<br>aqui</span>
        </div>
        <span class="index">(04)</span>
        <p class="eyebrow accent">Sobre</p>
        <h2 class="display-2">
          Um dev que <em>audita</em> o próprio código — não só escreve.
        </h2>
        <div class="about-text">
          <p>
            Sou o Kouichi, desenvolvedor em Goiânia. Venho do backend
            (Laravel/Vue) e do estudo de segurança de aplicações — o que
            significa que eu olho um site pensando em <strong>o que pode
            dar errado</strong> e <strong>o que faz o visitante agir</strong>,
            não só se ficou bonito.
          </p>
          <p>
            Não vendo "um site". Vendo um canal que transforma quem chega
            em contato no WhatsApp — com estrutura, copy e cada decisão
            visual a serviço disso.
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
.about-craft { inset: 10% -5% 10% 45%; opacity: 0.7; --grid-line: rgba(243, 234, 216, 0.07); }

.about-grid {
  position: relative;
  z-index: 2;
  display: grid;
  gap: clamp(2.5rem, 5vw, 4rem);
}
@media (min-width: 900px) {
  .about-grid { grid-template-columns: 1.05fr 0.95fr; align-items: start; }
}

.portrait {
  width: clamp(6.5rem, 14vw, 8.5rem);
  aspect-ratio: 4 / 5;
  border: 2px solid var(--paper);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 5px 5px 0 0 var(--clay);
  background: var(--card);
  color: var(--ink);
  margin-bottom: 1.5rem;
}
.portrait img { width: 100%; height: 100%; object-fit: cover; }
.portrait.empty {
  display: grid;
  place-items: center;
  background: transparent;
  border-color: rgba(243, 234, 216, 0.35);
  border-style: dashed;
  box-shadow: none;
}
.portrait.empty span {
  font-size: 0.72rem;
  line-height: 1.3;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-align: center;
  color: rgba(243, 234, 216, 0.55);
}

.about-copy .index { display: block; }
.about-copy .eyebrow { margin: 0.75rem 0; }
.accent { color: var(--clay); }
.about-copy em { font-style: italic; color: var(--clay); }
.about-text { margin-top: 1.75rem; display: grid; gap: 1rem; max-width: 34rem; }
.about-text p { line-height: 1.6; opacity: 0.85; }
.about-text strong { color: var(--paper); opacity: 1; }

.principios {
  display: grid;
  gap: 0;
  border: 2px solid var(--ink);
  border-radius: 12px;
  overflow: hidden;
  background: var(--card);
  color: var(--ink);
  box-shadow: 6px 6px 0 0 var(--clay);
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
