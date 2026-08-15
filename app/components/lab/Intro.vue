<script setup lang="ts">
import { waLink, cidade, disponibilidade } from '~/data/contato'

const whatsapp = waLink('Oi, Kouichi! Vi seu site e queria um orçamento. Meu negócio é ')

const root = ref<HTMLElement | null>(null)

onMounted(async () => {
  if (!root.value) return
  const el = root.value

  if (prefersReducedMotion()) {
    el.classList.add('is-static')
    return
  }

  const { gsap } = await useGsap()
  const ctx = gsap.context(() => {
    const lines = gsap.utils.toArray<HTMLElement>('.ln-in')

    // Entrada: a foto abre de baixo pra cima enquanto as linhas sobem
    // por trás da própria máscara. Cada linha sai num tempo diferente,
    // senão o bloco inteiro parece um só objeto.
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
    tl.from(lines, { yPercent: 108, duration: 1.15, stagger: 0.075 })
      .from('.intro-media', {
        clipPath: 'inset(100% 0% 0% 0%)',
        duration: 1.3,
        ease: 'power4.inOut'
      }, 0.15)
      .from('.intro-media img', { scale: 1.35, duration: 1.6, ease: 'power3.out' }, '<')
      .from('.intro-fade', { opacity: 0, y: 18, duration: 0.7, stagger: 0.06 }, '-=0.7')

    // Saída no scroll: as linhas se separam horizontalmente em direções
    // e velocidades diferentes. É o que "quebra" o bloco de texto — na
    // saída ele deixa de ser um parágrafo e vira quatro objetos soltos.
    // Anima o invólucro, não o interior: o interior é o que sobe por dentro
    // da máscara na entrada, e arrastá-lo de lado o recortaria.
    const drift = [-14, 9, -6, 17]
    gsap.utils.toArray<HTMLElement>('.ln').forEach((ln, i) => {
      gsap.to(ln, {
        xPercent: drift[i % drift.length],
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: 0.6 }
      })
    })
    gsap.to('.intro-media', {
      yPercent: -18,
      ease: 'none',
      scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: 0.6 }
    })
    gsap.to('.intro-veil', {
      opacity: 1,
      ease: 'none',
      scrollTrigger: { trigger: el, start: 'center top', end: 'bottom top', scrub: true }
    })
  }, el)

  onBeforeUnmount(() => ctx.revert())
})
</script>

<template>
  <section id="topo" ref="root" class="intro">
    <LabDecor grade="fina" halo="topo-dir" reticula />

    <figure class="intro-media">
      <img
        src="/img/hero-kouichi.webp"
        alt="Kouichi, desenvolvedor de sites, em Goiânia"
        width="800"
        height="1000"
        fetchpriority="high"
        decoding="async"
      />
    </figure>

    <h1 class="intro-title">
      <span class="ln"><span class="ln-in">Seu site</span></span>
      <span class="ln ln-b"><span class="ln-in">pode fazer</span></span>
      <span class="ln ln-c"><span class="ln-in">o telefone</span></span>
      <span class="ln ln-d"><span class="ln-in"><em>tocar.</em></span></span>
    </h1>

    <div class="intro-foot">
      <p class="intro-sub intro-fade">
        Site pra negócio de Goiânia que vive de cliente novo chegando.
        A conversa começa e termina no seu WhatsApp.
      </p>
      <a
        :href="whatsapp"
        target="_blank"
        rel="noopener"
        data-track="wa_lab_hero"
        class="intro-cta intro-fade"
        data-cursor="grow"
      >
        <WaIcon :size="18" />
        Me chamar no WhatsApp
      </a>
    </div>

    <div class="intro-meta intro-fade">
      <span>(01)</span>
      <span>{{ cidade }}</span>
      <span class="intro-vaga"><i />{{ disponibilidade }}</span>
    </div>

    <div class="intro-veil" aria-hidden="true" />
  </section>
</template>

<style scoped>
.intro {
  position: relative;
  min-height: 100svh;
  display: grid;
  grid-template-rows: 1fr auto auto;
  align-content: center;
  padding: clamp(5rem, 9vh, 7rem) var(--lab-edge) clamp(1.5rem, 4vh, 2.5rem);
  overflow: hidden;
  isolation: isolate;
}

/* foto: alta, encostada na direita, atravessada pelas linhas do título */
.intro-media {
  position: absolute;
  z-index: 2;
  /* Descida proposital: as linhas do título cruzam o tronco, não o rosto. */
  top: 26%;
  /* recuada da borda: encostada, ela ficava embaixo do índice de capítulos */
  right: clamp(4.5rem, 9vw, 7.5rem);
  width: min(24vw, 18rem);
  aspect-ratio: 4 / 5;
  margin: 0;
  overflow: hidden;
  border: 1px solid var(--lab-line);
  will-change: transform;
}
.intro-media img { width: 100%; height: 100%; object-fit: cover; }

/* título: escala tipográfica presa ao viewport, sem container */
.intro-title {
  position: relative;
  z-index: 3;
  grid-row: 1;
  align-self: center;
  font-family: var(--font-display);
  font-weight: 900;
  /* Preso também à altura: são 4 linhas a 0.82 de entrelinha, então
     12vw num monitor baixo empurrava o CTA pra fora da dobra. */
  font-size: clamp(2.4rem, min(12.4vw, 14vh), 12rem);
  line-height: 0.82;
  letter-spacing: -0.045em;
  text-transform: uppercase;
  color: var(--lab-fg);
}
.intro-title em { font-style: italic; color: var(--lab-accent); }

/* cada linha é uma máscara de recorte própria */
.ln {
  display: block;
  overflow: hidden;
  padding-bottom: 0.06em;
  white-space: nowrap;
  will-change: transform;
}
.ln-in { display: block; }

/* deslocamentos irregulares: é o que tira o texto do eixo do container */
.ln-b { padding-left: 8vw; }
.ln-c { padding-left: 2vw; }
.ln-d { padding-left: 23vw; }

/* linhas 1 e 3 passam por trás da foto, 2 e 4 por cima */
.ln:nth-child(1), .ln:nth-child(3) { position: relative; z-index: 1; }
.ln:nth-child(2), .ln:nth-child(4) { position: relative; z-index: 4; }

/* Coluna, não linha. Lado a lado o botão parava no meio do vão, sem
   alinhar com a coluna de texto nem com a foto, e quase encostava nela.
   Empilhado, ele herda a mesma margem esquerda do título e do parágrafo,
   e a leitura vira uma linha vertical só: manchete, promessa, botão. */
.intro-foot {
  position: relative;
  z-index: 5;
  grid-row: 2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: clamp(1rem, 2.5vh, 1.5rem);
  padding-top: clamp(1.25rem, 3.5vh, 2.25rem);
}
.intro-sub {
  max-width: 27rem;
  font-size: clamp(0.95rem, 1.15vw, 1.1rem);
  line-height: 1.5;
  color: var(--lab-dim);
}

.intro-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.85rem 1.6rem;
  background: var(--lab-accent);
  color: var(--lab-bg);
  font-weight: 600;
  font-size: 0.95rem;
  border-radius: 999px;
  transition: transform 0.3s var(--ease), background 0.3s var(--ease);
}
.intro-cta:hover { transform: translateY(-2px); background: var(--lab-fg); }

.intro-meta {
  position: relative;
  z-index: 5;
  grid-row: 3;
  display: flex;
  gap: 1.75rem;
  flex-wrap: wrap;
  margin-top: clamp(1.75rem, 5vh, 3rem);
  padding-top: 1rem;
  border-top: 1px solid var(--lab-line);
  font-size: 0.72rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--lab-dim);
}
/* agrupada à esquerda com o resto: jogada pra direita, o botão flutuante de
   WhatsApp sentava exatamente em cima dela */
.intro-vaga { display: inline-flex; align-items: center; gap: 0.5rem; }
.intro-vaga i {
  width: 6px; height: 6px;
  border-radius: 999px;
  background: var(--lab-accent);
}

/* escurece a seção conforme ela sai, pra emendar no próximo capítulo */
.intro-veil {
  position: absolute;
  inset: 0;
  z-index: 6;
  pointer-events: none;
  opacity: 0;
  background: var(--lab-bg);
}

@media (max-width: 860px) {
  .intro-media { top: auto; bottom: 26%; right: var(--lab-edge); width: 38vw; opacity: 0.45; }
  .ln-b { padding-left: 4vw; }
  .ln-c { padding-left: 0; }
  .ln-d { padding-left: 12vw; }
  .intro-vaga { margin-left: 0; }
}

/* sem animação: tudo já nasce no lugar */
.intro.is-static .intro-media,
.intro.is-static .ln-in,
.intro.is-static .intro-fade {
  opacity: 1;
  transform: none;
  clip-path: none;
}
</style>
