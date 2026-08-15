<script setup lang="ts">
const real = {
  nome: 'Gabo Garcia Gallery',
  url: 'https://gabogarciagallery.pages.dev/',
  shot: '/img/proj-gabo.webp',
  // Só o que dá pra confirmar: é vitrine, está no ar, está crescendo.
  objetivo: 'Vitrine pro trabalho de um ilustrador. No ar e crescendo.',
  tags: ['Portfólio', 'Sanity CMS']
}

const conceitos = [
  {
    nicho: 'Clínica odontológica',
    objetivo: 'Transformar busca no Google em agendamento pelo WhatsApp.',
    tags: ['Landing page', 'SEO local'],
    tone: 'moss'
  },
  {
    nicho: 'Escritório de advocacia',
    objetivo: 'Passar confiança antes de a pessoa ligar.',
    tags: ['Institucional', 'FAQ'],
    tone: 'clay'
  }
]
</script>

<template>
  <section id="portfolio" class="section-light portfolio">
    <div class="container">
      <header class="sec-head" v-reveal>
        <span class="index">(05)</span>
        <div>
          <p class="eyebrow accent">Portfólio</p>
          <h2 class="display-2" data-split-lines>Projetos.</h2>
        </div>
        <p class="sec-note">Um cliente real e dois conceitos.</p>
      </header>

      <div class="grid">
        <article class="proj" v-reveal>
          <a :href="real.url" target="_blank" rel="noopener" data-track="proj_gabo" class="real-shot">
            <img
              :src="real.shot"
              :alt="`Site do ${real.nome}, feito por Kouichi`"
              width="1600"
              height="1000"
              loading="lazy"
              decoding="async"
            />
            <span class="live-tag"><span class="live-dot" />No ar</span>
          </a>
          <div class="proj-body">
            <h3 class="proj-nicho">{{ real.nome }}</h3>
            <p class="proj-obj">{{ real.objetivo }}</p>
            <ul class="proj-tags">
              <li v-for="t in real.tags" :key="t">{{ t }}</li>
            </ul>
          </div>
        </article>

        <article
          v-for="(p, i) in conceitos"
          :key="p.nicho"
          class="proj"
          v-reveal="{ delay: (i + 1) * 90 }"
        >
          <div class="preview" :class="p.tone">
            <div class="craft-grid preview-grid" />
            <div class="browser">
              <span class="dots"><i /><i /><i /></span>
              <div class="wire">
                <span class="wire-title" />
                <span class="wire-line" />
                <span class="wire-line short" />
                <span class="wire-cta">WhatsApp</span>
              </div>
            </div>
            <span class="demo-tag">Conceito</span>
          </div>

          <div class="proj-body">
            <h3 class="proj-nicho">{{ p.nicho }}</h3>
            <p class="proj-obj">{{ p.objetivo }}</p>
            <ul class="proj-tags">
              <li v-for="t in p.tags" :key="t">{{ t }}</li>
            </ul>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.portfolio { padding-block: clamp(3rem, 6vw, 5rem); background: var(--paper-2); }

.sec-head {
  display: grid;
  gap: 1rem;
  padding-bottom: clamp(2rem, 4vw, 2.75rem);
}
.sec-head .index { display: block; }
.sec-head .eyebrow { margin-bottom: 0.6rem; }
.accent { color: var(--clay); }
.sec-head em { font-style: italic; color: var(--clay); }
.sec-note { max-width: 28rem; opacity: 0.72; line-height: 1.5; font-size: 0.92rem; }
@media (min-width: 900px) {
  .sec-head { grid-template-columns: auto 1fr auto; align-items: end; column-gap: 2.5rem; }
}

.grid { display: grid; gap: 1.25rem; }
@media (min-width: 700px) { .grid { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1000px) { .grid { grid-template-columns: repeat(3, 1fr); } }

.proj {
  display: flex;
  flex-direction: column;
  background: var(--card);
  border: 2px solid var(--ink);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: var(--hard);
  transition: transform 0.2s var(--ease), box-shadow 0.2s var(--ease);
}
.proj:hover { transform: translate(-2px, -2px); box-shadow: 6px 6px 0 0 var(--ink); }

/* projeto real */
.real-shot {
  position: relative;
  display: block;
  aspect-ratio: 16 / 10;
  background: var(--ink);
  border-bottom: 2px solid var(--ink);
  overflow: hidden;
}
.real-shot img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top left;
  transition: transform 0.5s var(--ease);
}
.real-shot:hover img { transform: scale(1.03); }

.live-tag {
  /* à direita de propósito: à esquerda cobre a logo do cliente no screenshot */
  position: absolute;
  top: 0.6rem;
  right: 0.6rem;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: var(--card);
  color: var(--ink);
  border: 2px solid var(--ink);
  border-radius: 999px;
  padding: 0.18rem 0.6rem;
  font-size: 0.64rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.live-dot {
  width: 6px; height: 6px;
  border-radius: 999px;
  background: var(--moss-lit, #6F8347);
  animation: livePulse 2.4s infinite;
}
@keyframes livePulse {
  0% { box-shadow: 0 0 0 0 rgba(111, 131, 71, 0.6); }
  70% { box-shadow: 0 0 0 5px rgba(111, 131, 71, 0); }
  100% { box-shadow: 0 0 0 0 rgba(111, 131, 71, 0); }
}

/* conceitos */
.preview {
  position: relative;
  aspect-ratio: 16 / 10;
  padding: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 2px solid var(--ink);
  overflow: hidden;
}
.preview.moss { background: var(--moss); }
.preview.clay { background: var(--clay); }
.preview-grid { inset: 0; opacity: 0.5; --grid-line: rgba(255,255,255,0.14); -webkit-mask-image: none; mask-image: none; }

.browser {
  position: relative;
  z-index: 1;
  width: min(82%, 15rem);
  background: var(--card);
  border: 2px solid var(--ink);
  border-radius: 6px;
  box-shadow: 3px 3px 0 0 rgba(0,0,0,0.35);
  overflow: hidden;
}
.dots { display: flex; gap: 4px; padding: 0.4rem 0.55rem; border-bottom: 1.5px solid var(--ink); }
.dots i { width: 7px; height: 7px; border-radius: 999px; border: 1.5px solid var(--ink); }
.dots i:nth-child(1) { background: var(--clay); }
.dots i:nth-child(2) { background: var(--paper-2); }
.dots i:nth-child(3) { background: var(--moss); }
.wire { padding: 0.75rem; display: flex; flex-direction: column; gap: 0.4rem; }
.wire-title { height: 10px; width: 70%; background: var(--ink); border-radius: 3px; }
.wire-line { height: 6px; width: 100%; background: rgba(23,19,9,0.22); border-radius: 3px; }
.wire-line.short { width: 55%; }
.wire-cta {
  align-self: flex-start;
  margin-top: 0.3rem;
  font-size: 0.56rem;
  font-weight: 600;
  background: var(--clay);
  color: var(--ink);
  border: 1.5px solid var(--ink);
  border-radius: 999px;
  padding: 0.16rem 0.5rem;
}

.demo-tag {
  position: absolute;
  z-index: 2;
  bottom: 0.6rem;
  left: 0.6rem;
  background: var(--card);
  color: var(--ink);
  border: 2px solid var(--ink);
  border-radius: 999px;
  padding: 0.18rem 0.6rem;
  font-size: 0.62rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.proj-body { padding: 1.15rem 1.25rem 1.35rem; }
.proj-nicho { font-family: var(--font-display); font-weight: 600; font-size: 1.15rem; line-height: 1.15; }
.proj-obj { margin-top: 0.4rem; font-size: 0.88rem; line-height: 1.45; opacity: 0.8; }
.proj-tags { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-top: 0.9rem; }
.proj-tags li {
  font-size: 0.7rem;
  font-weight: 500;
  padding: 0.22rem 0.55rem;
  border: 1.5px solid var(--ink);
  border-radius: 999px;
  opacity: 0.85;
}
</style>
