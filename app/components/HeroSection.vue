<script setup lang="ts">
// TODO: trocar pelo número real de WhatsApp (formato: 55DDDNÚMERO)
const whatsapp = 'https://wa.me/556200000000'

const provas = [
  'Conversão medida, não achismo',
  'Contato direto pelo WhatsApp',
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
    <div class="grain" />
    <p class="ghost-word" aria-hidden="true" data-parallax="7">CONVERTE</p>

    <div class="container hero-inner">
      <div class="meta-row" v-reveal>
        <span class="index">(01)</span>
        <span class="eyebrow">Estúdio de conversão</span>
        <span class="status"><span class="pulse" />Aberto para 2 projetos este mês</span>
      </div>

      <div class="hero-grid">
        <div class="hero-copy">
          <h1 class="display-1 hero-title">
            <span class="title-line">Seu site pode</span>
            <span class="title-line">fazer o <em>telefone</em></span>
            <span class="title-line"><em>tocar.</em></span>
          </h1>

          <p class="body-lg hero-sub" v-reveal="{ delay: 90 }">
            Sites e landing pages desenhados pra transformar visita em contato —
            cada seção pensada pra gerar cliente, não só pra ficar bonita.
          </p>

          <div class="hero-actions" v-reveal="{ delay: 160 }">
            <a v-magnetic="{ strength: 0.28 }" :href="whatsapp" target="_blank" rel="noopener" class="btn btn-cta">
              <WaIcon class="wa" :size="19" />
              Começar no WhatsApp
            </a>
            <a href="#servicos" class="btn btn-outline">Ver como funciona</a>
          </div>

          <ul class="provas" v-reveal="{ delay: 220 }">
            <li v-for="p in provas" :key="p">{{ p }}</li>
          </ul>
        </div>

        <div ref="visualEl" class="hero-visual" @mousemove="onMove" @mouseleave="onLeave" data-parallax="3">
          <div class="layer panel-terracotta" :style="layer(16)" />
          <div class="layer photo-frame" :style="layer(6)">
            <!-- TODO: placeholder de referência (Pinterest) — trocar por foto/arte própria ou licenciada antes de publicar -->
            <img src="/img/hero-placeholder.jpg" alt="" class="photo" />
            <div class="photo-tint" />
          </div>
          <div class="layer blueprint-layer" :style="layer(11)"><BlueprintOverlay /></div>

          <div class="layer floating-card card-a" :style="layer(28)">
            <span class="eyebrow accent">Método</span>
            <p>UX &amp; design comportamental aplicado a negócio local</p>
          </div>
          <div class="layer floating-card card-b" :style="layer(20)">
            <span class="tag">Traçado&nbsp;N.01</span>
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
  padding-block: clamp(1.75rem, 4vw, 2.75rem) clamp(2rem, 5vw, 3.5rem);
  overflow: hidden;
  position: relative;
}

/* craft grid patch — confined to the visual side, subtle */
.hero-craft {
  left: auto;
  right: -4%;
  width: 55%;
  top: 8%;
  bottom: 0;
  opacity: 0.9;
}

.ghost-word {
  position: absolute;
  top: 6rem;
  left: 0;
  right: 0;
  text-align: center;
  font-family: var(--font-display);
  font-weight: 900;
  font-size: clamp(6rem, 20vw, 16rem);
  color: var(--ink);
  opacity: 0.05;
  letter-spacing: -0.03em;
  white-space: nowrap;
  pointer-events: none;
  z-index: 0;
}

.hero-inner { position: relative; z-index: 2; }

/* meta row */
.meta-row {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  flex-wrap: wrap;
  padding-bottom: clamp(1.75rem, 4vw, 3rem);
  border-bottom: 2px solid var(--ink);
}
.meta-row .eyebrow { opacity: 0.9; }
.status {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: auto;
  font-size: 0.82rem;
  opacity: 0.75;
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
  gap: clamp(2.5rem, 6vw, 4rem);
  align-items: center;
  padding-top: clamp(2rem, 5vw, 3.5rem);
}

.accent { color: var(--clay); }

.hero-copy .display-1 em {
  font-style: italic;
  color: var(--clay);
}
.hero-sub {
  margin-top: 1.6rem;
  max-width: 33rem;
  opacity: 0.82;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 2.25rem;
}

.provas {
  margin-top: 2.5rem;
  padding-top: 1.5rem;
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

/* collage visual */
.hero-visual {
  position: relative;
  justify-self: center;
  width: min(100%, 28rem);
  aspect-ratio: 4 / 5;
}
.layer { position: absolute; transition: transform 0.14s var(--ease); will-change: transform; }

.photo-frame {
  inset: 6% 10% 4% 0;
  border-radius: 999px 999px 30px 30px;
  overflow: hidden;
  border: 2px solid var(--ink);
  box-shadow: var(--hard-lg);
  transform: rotate(-3deg);
  background: var(--moss);
}
.photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(0.2) contrast(1.05) brightness(0.86);
}
.photo-tint {
  position: absolute;
  inset: 0;
  background: linear-gradient(160deg, var(--clay) 0%, transparent 45%, var(--moss) 100%);
  mix-blend-mode: color;
  opacity: 0.6;
}
.panel-terracotta {
  top: -5%;
  right: -6%;
  width: 46%;
  height: 34%;
  background: var(--clay);
  border: 2px solid var(--ink);
  border-radius: 22px;
  transform: rotate(9deg);
}
.blueprint-layer { inset: 4% 6%; opacity: 0.9; }

.floating-card {
  background: var(--card);
  color: var(--ink);
  border: 2px solid var(--ink);
  border-radius: 10px;
  box-shadow: var(--hard-lg);
}
.card-a {
  bottom: -5%;
  left: -9%;
  max-width: 12.5rem;
  padding: 1.05rem 1.2rem;
}
.card-a .eyebrow { display: block; margin-bottom: 0.4rem; }
.card-a p { font-size: 0.85rem; line-height: 1.4; }
.card-b {
  top: 5%;
  left: -4%;
  padding: 0.55rem 0.9rem;
  transform: rotate(-6deg);
}
.card-b .tag {
  font-weight: 600;
  font-size: 0.72rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--moss);
}

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
  .hero-grid { grid-template-columns: 1.08fr 0.92fr; }
  .hero-visual { justify-self: end; margin-right: -1rem; }
  .scroll-cue { display: inline-flex; }
}
@media (max-width: 899px) {
  .hero-craft { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .pulse, .cue-line::after { animation: none; }
}
</style>
