<script setup lang="ts">
const { waLink, heroImage, waHello } = useSite()
const whatsapp = waLink(waHello)

const provas = [
  'Você aprova antes de publicar · 50% só na entrega',
  'Conversão medida, não achismo',
  'Goiânia & região'
]

const reduceMotion = ref(false)
const mx = ref(0)
const my = ref(0)
const visualEl = ref<HTMLElement | null>(null)

function onMove(e: MouseEvent) {
  if (reduceMotion.value || !visualEl.value) return
  const rect = visualEl.value.getBoundingClientRect()
  mx.value = ((e.clientX - rect.left) / rect.width - 0.5) * 2
  my.value = ((e.clientY - rect.top) / rect.height - 0.5) * 2
}
function onLeave() { mx.value = 0; my.value = 0 }
function layer(depth: number) {
  if (reduceMotion.value) return {}
  return { transform: `translate(${mx.value * depth}px, ${my.value * depth}px)` }
}

onMounted(() => {
  reduceMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
})
</script>

<template>
  <section id="topo" class="section-light hero">
    <div class="craft-grid hero-craft" aria-hidden="true" />
    <div class="hero-glow" aria-hidden="true" />
    <div class="grain" />
    <span class="hero-spine" aria-hidden="true">Design de conversão · Goiânia</span>

    <div class="container hero-inner">
      <div class="meta-row" v-reveal>
        <span class="index">(01)</span>
        <span class="eyebrow">Estúdio de conversão</span>
        <span class="status"><span class="pulse" />Aberto para 2 projetos este mês</span>
      </div>

      <div class="hero-grid">
        <div class="hero-copy">
          <h1 class="display-1 hero-title">
            <span class="title-line">Seu trabalho</span>
            <span class="title-line">é bom.</span>
            <span class="title-line">Seu site precisa</span>
            <span class="title-line"><em>mostrar isso.</em></span>
          </h1>

          <p class="body-lg hero-sub" v-reveal="{ delay: 90 }">
            Sites e landing pages que transformam quem te encontra em contato no
            WhatsApp — cada detalhe pensado pra gerar cliente, não só pra ficar bonito.
          </p>

          <div class="hero-actions" v-reveal="{ delay: 160 }">
            <a v-magnetic="{ strength: 0.28 }" :href="whatsapp" target="_blank" rel="noopener" data-track="wa_hero" class="btn btn-cta">
              <WaIcon class="wa" :size="19" />
              Começar no WhatsApp
            </a>
            <a href="#como-funciona" class="text-link">Ver como funciona <span aria-hidden="true">→</span></a>
          </div>
          <p class="cta-note" v-reveal="{ delay: 190 }">Resposta no mesmo dia · sem compromisso</p>

          <ul class="provas" v-reveal="{ delay: 220 }">
            <li v-for="p in provas" :key="p">{{ p }}</li>
          </ul>
        </div>

        <div ref="visualEl" class="hero-visual" @mousemove="onMove" @mouseleave="onLeave" data-parallax="3">
          <div class="layer panel-terracotta" :style="layer(14)" />
          <div class="layer photo-frame" :style="layer(6)">
            <img :src="heroImage" alt="" class="photo" width="800" height="999" fetchpriority="high" decoding="async" />
            <div class="photo-scrim" />
          </div>
          <div class="layer floating-card card-a" :style="layer(24)">
            <span class="eyebrow accent">Método</span>
            <p>Cada decisão — estrutura, texto e visual — pensada pra virar contato.</p>
          </div>
        </div>
      </div>

      <a href="#servicos" class="scroll-cue" aria-label="Rolar para serviços">
        <span>Role</span>
        <span class="cue-line" />
      </a>
    </div>
  </section>
</template>

<style scoped>
.hero {
  padding-block: clamp(1.5rem, 3vw, 2.75rem) clamp(1.5rem, 3vw, 2.5rem);
  overflow: hidden;
  position: relative;
}

/* substrate 1 — faint blueprint grid: structure + "designed" texture, fades at edges */
.hero-craft {
  inset: 0;
  z-index: 0;
  --grid-line: rgba(23, 19, 9, 0.08);
  /* center the substrate low + right so it stays clear of the meta banner strip up top */
  -webkit-mask-image: radial-gradient(ellipse 78% 70% at 66% 60%, #000 0%, transparent 82%);
          mask-image: radial-gradient(ellipse 78% 70% at 66% 60%, #000 0%, transparent 82%);
}
/* substrate 2 — atmospheric depth: warm mikan light top-right, cool leaf pool bottom-left */
.hero-glow {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background:
    radial-gradient(58% 52% at 80% 26%, rgba(234, 106, 30, 0.12), transparent 62%),
    radial-gradient(48% 48% at 10% 92%, rgba(61, 75, 44, 0.08), transparent 60%);
}

.hero-inner { position: relative; z-index: 2; }

/* meta row */
.meta-row {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  flex-wrap: wrap;
  padding-bottom: clamp(1rem, 2.5vw, 1.75rem);
  border-bottom: 2px solid var(--line);
}
.meta-row .eyebrow { opacity: 1; }
.meta-row .index { opacity: 0.75; }
.status {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: auto;
  font-size: 0.82rem;
  opacity: 0.85;
}
.pulse {
  width: 8px; height: 8px;
  border-radius: 999px;
  background: var(--moss);
  box-shadow: 0 0 0 0 rgba(61, 75, 44, 0.5);
  animation: pulse 2.4s infinite;
}
@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(61, 75, 44, 0.45); }
  70% { box-shadow: 0 0 0 7px rgba(61, 75, 44, 0); }
  100% { box-shadow: 0 0 0 0 rgba(61, 75, 44, 0); }
}

.hero-grid {
  display: grid;
  gap: clamp(2rem, 5vw, 3.75rem);
  align-items: center;
  padding-top: clamp(1.75rem, 4vw, 3rem);
}

.accent { color: var(--clay); }

/* one focal move: the headline is bigger and carries the hero */
.hero-copy .display-1 em {
  font-style: italic;
  color: var(--clay);
}
.hero-title { font-size: clamp(2.35rem, 5.6vw, 4.25rem); text-wrap: balance; }
.hero-title .title-line { display: block; }
.hero-sub {
  margin-top: 1.4rem;
  max-width: 33rem;
  opacity: 0.82;
}
.cta-note { margin-top: 0.85rem; font-size: 0.8rem; opacity: 0.6; }

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem 1.5rem;
  margin-top: 1.6rem;
}
/* secondary action demoted to a text link so the orange CTA is the single clear choice */
.text-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 0.95rem;
  padding-block: 0.9rem;
  position: relative;
}
.text-link span { transition: transform 0.25s var(--ease); }
.text-link:hover span { transform: translateX(4px); }
.text-link::after {
  content: '';
  position: absolute;
  left: 0; bottom: 0.65rem;
  width: 100%; height: 2px;
  background: var(--ink);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s var(--ease);
}
.text-link:hover::after { transform: scaleX(1); }

/* editorial spine — vertical margin label, a tategaki nod; desktop only */
.hero-spine {
  display: none;
  position: absolute;
  left: clamp(0.5rem, 1.8vw, 1.6rem);
  top: 50%;
  writing-mode: vertical-rl;
  transform: translateY(-50%) rotate(180deg);
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 0.7rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--ink);
  opacity: 0.4;
  pointer-events: none;
  z-index: 2;
}

.provas {
  margin-top: 1.75rem;
  padding-top: 1.1rem;
  border-top: 2px solid var(--ink);
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem 2rem;
  font-size: 0.85rem;
  opacity: 0.82;
}
.provas li { display: flex; align-items: center; gap: 0.55rem; }
.provas li::before {
  content: '';
  width: 7px; height: 7px;
  background: var(--clay);
  border: 1px solid var(--ink);
}

/* collage visual — pared to 3 elements: accent panel, framed photo, one credibility chip */
.hero-visual {
  position: relative;
  justify-self: center;
  width: min(100%, 25rem);
  aspect-ratio: 4 / 4.5;
}
.layer { position: absolute; transition: transform 0.14s var(--ease); will-change: transform; }

.photo-frame {
  inset: 4% 8% 3% 2%;
  border-radius: 999px 999px 28px 28px;
  overflow: hidden;
  border: 2px solid var(--ink);
  box-shadow: var(--hard-lg);
  transform: rotate(-2.5deg);
  background: var(--moss);
}
.photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(0.15) contrast(1.04);
}
/* scrim (layout.md): subtle bottom-anchored gradient for legibility/depth — not a muddy color wash */
.photo-scrim {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 45%, rgba(23, 19, 9, 0.32) 100%);
  pointer-events: none;
}
.panel-terracotta {
  top: -4%;
  right: -5%;
  width: 44%;
  height: 32%;
  background: var(--clay);
  border: 2px solid var(--ink);
  border-radius: 22px;
  transform: rotate(8deg);
}

.floating-card {
  background: var(--card);
  color: var(--ink);
  border: 2px solid var(--ink);
  border-radius: 10px;
  box-shadow: var(--hard-lg);
}
.card-a {
  bottom: -4%;
  left: -8%;
  max-width: 12.5rem;
  padding: 1.05rem 1.2rem;
}
.card-a .eyebrow { display: block; margin-bottom: 0.4rem; }
.card-a p { font-size: 0.85rem; line-height: 1.4; }

/* scroll cue */
.scroll-cue {
  display: none;
  align-items: center;
  gap: 0.75rem;
  margin-top: clamp(2rem, 5vw, 3.5rem);
  font-size: 0.75rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  opacity: 0.6;
}
.cue-line {
  width: 3rem; height: 2px;
  background: var(--ink);
  position: relative;
  overflow: hidden;
}
.cue-line::after {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--clay);
  transform: translateX(-100%);
  animation: cue 2.2s var(--ease) infinite;
}
@keyframes cue {
  0% { transform: translateX(-100%); }
  60%, 100% { transform: translateX(100%); }
}

@media (min-width: 900px) {
  .hero-grid { grid-template-columns: 1.25fr 0.75fr; }
  .hero-visual { justify-self: end; margin-right: -0.5rem; }
  .scroll-cue { display: inline-flex; }
}
@media (min-width: 1180px) {
  .hero-spine { display: block; }
}
@media (max-width: 560px) {
  .status { margin-left: 0; width: 100%; }
}
@media (prefers-reduced-motion: reduce) {
  .pulse, .cue-line::after { animation: none; }
}
</style>
