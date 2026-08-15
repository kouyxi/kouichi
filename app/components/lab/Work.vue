<script setup lang="ts">
// Um cliente real e dois conceitos. O card real só carrega o que dá pra
// confirmar olhando o site dele — nada de história inventada.
const real = {
  nome: 'Gabo Garcia Gallery',
  url: 'https://gabogarciagallery.pages.dev/',
  shot: '/img/proj-gabo.webp',
  objetivo: 'Vitrine pro trabalho de um ilustrador. No ar e crescendo.',
  tags: ['Portfólio', 'Sanity CMS']
}

const conceitos = [
  { nicho: 'Clínica odontológica', objetivo: 'Busca no Google virando agendamento no WhatsApp.' },
  { nicho: 'Escritório de advocacia', objetivo: 'Passar confiança antes de a pessoa ligar.' }
]

const root = ref<HTMLElement | null>(null)

onMounted(async () => {
  if (!root.value || prefersReducedMotion()) return
  const el = root.value
  const { gsap } = await useGsap()

  const ctx = gsap.context(() => {
    // A moldura fica parada e a imagem corre por dentro dela. É o parallax
    // que dá sensação de profundidade sem mexer no layout da página.
    gsap.fromTo(
      '.wk-shot img',
      { yPercent: -12, scale: 1.18 },
      {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: { trigger: '.wk-shot', start: 'top bottom', end: 'bottom top', scrub: true }
      }
    )

    // A moldura abre no scroll, em vez de simplesmente aparecer.
    gsap.from('.wk-shot', {
      clipPath: 'inset(12% 18% 12% 18%)',
      duration: 1.1,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.wk-shot', start: 'top 85%', once: true }
    })

    gsap.from('.wk-head-in', {
      yPercent: 105,
      duration: 0.85,
      stagger: 0.08,
      ease: 'expo.out',
      scrollTrigger: { trigger: el, start: 'top 72%', once: true }
    })

    gsap.from('.wk-concept', {
      opacity: 0,
      y: 34,
      duration: 0.7,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.wk-concepts', start: 'top 82%', once: true }
    })
  }, el)

  onBeforeUnmount(() => ctx.revert())
})
</script>

<template>
  <section id="portfolio" ref="root" class="wk">
    <LabDecor grade="larga" halo="base-centro" />
    <header class="wk-head">
      <span class="lab-index">(04)</span>
      <h2 class="wk-title">
        <span class="wk-mask"><span class="wk-head-in">Projetos.</span></span>
      </h2>
      <p class="wk-note">Um cliente real e dois conceitos.</p>
    </header>

    <a
      :href="real.url"
      target="_blank"
      rel="noopener"
      data-track="proj_gabo_lab"
      class="wk-shot"
      data-cursor="ver"
    >
      <img
        :src="real.shot"
        :alt="`Site do ${real.nome}, feito por Kouichi`"
        width="1600"
        height="1000"
        loading="lazy"
        decoding="async"
      />
      <span class="wk-live"><i />No ar</span>
    </a>

    <div class="wk-real">
      <h3 class="wk-nome">{{ real.nome }}</h3>
      <p class="wk-obj">{{ real.objetivo }}</p>
      <ul class="wk-tags">
        <li v-for="t in real.tags" :key="t">{{ t }}</li>
      </ul>
    </div>

    <div class="wk-concepts">
      <article v-for="c in conceitos" :key="c.nicho" class="wk-concept">
        <span class="wk-label">Conceito</span>
        <h3 class="wk-nome">{{ c.nicho }}</h3>
        <p class="wk-obj">{{ c.objetivo }}</p>
      </article>
    </div>
  </section>
</template>

<style scoped>
.wk {
  position: relative;
  padding: clamp(4rem, 12vh, 8rem) 0 clamp(4rem, 10vh, 7rem);
  background: var(--lab-bg);
  color: var(--lab-fg);
}
.wk-head { position: relative; z-index: 1; padding-inline: var(--lab-edge); margin-bottom: clamp(2rem, 5vh, 3.25rem); }
.wk-shot, .wk-real, .wk-concepts { position: relative; z-index: 1; }
.wk-title {
  margin-top: 1rem;
  font-family: var(--font-display);
  font-weight: 900;
  font-size: clamp(2.6rem, 9vw, 7rem);
  line-height: 0.88;
  letter-spacing: -0.04em;
  text-transform: uppercase;
}
.wk-mask { display: block; overflow: hidden; padding-bottom: 0.05em; }
.wk-head-in { display: block; }
.wk-note { margin-top: 1rem; color: var(--lab-dim); }

/* sangra de ponta a ponta: sem container, sem margem */
.wk-shot {
  position: relative;
  display: block;
  width: 100%;
  aspect-ratio: 16 / 8;
  overflow: hidden;
  background: #000;
  border-block: 1px solid var(--lab-line);
}
.wk-shot img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  will-change: transform;
}
.wk-live {
  position: absolute;
  top: 1.1rem;
  right: 1.1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.3rem 0.8rem;
  border-radius: 999px;
  background: var(--lab-bg);
  color: var(--lab-fg);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
.wk-live i {
  width: 6px; height: 6px;
  border-radius: 999px;
  background: var(--lab-accent);
  animation: wkPulse 2.4s infinite;
}
@keyframes wkPulse {
  0% { box-shadow: 0 0 0 0 rgba(220, 91, 44, 0.7); }
  70% { box-shadow: 0 0 0 6px rgba(220, 91, 44, 0); }
  100% { box-shadow: 0 0 0 0 rgba(220, 91, 44, 0); }
}

.wk-real {
  padding: clamp(1.5rem, 4vh, 2.5rem) var(--lab-edge) 0;
  max-width: 40rem;
}
.wk-nome {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: clamp(1.4rem, 2.8vw, 2.1rem);
  line-height: 1.05;
  letter-spacing: -0.02em;
}
.wk-obj { margin-top: 0.6rem; color: var(--lab-dim); line-height: 1.55; }
.wk-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 1.1rem; }
.wk-tags li {
  padding: 0.25rem 0.7rem;
  border: 1px solid var(--lab-line-2);
  border-radius: 999px;
  font-size: 0.72rem;
  color: var(--lab-dim);
}

.wk-concepts {
  display: grid;
  gap: 1px;
  margin-top: clamp(3rem, 8vh, 5rem);
  background: var(--lab-line);
  border-block: 1px solid var(--lab-line);
}
@media (min-width: 760px) { .wk-concepts { grid-template-columns: 1fr 1fr; } }
.wk-concept {
  background: var(--lab-bg);
  padding: clamp(1.75rem, 4vw, 3rem) var(--lab-edge);
}
.wk-label {
  display: inline-block;
  margin-bottom: 0.9rem;
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--lab-accent);
}
</style>
