<script setup lang="ts">
import { waLink, cidade, disponibilidade } from '~/data/contato'
import { projetos } from '~/data/projetos'

const whatsapp = waLink('Oi, Kouichi! Vi seu site e queria um orçamento. Meu negócio é ')

// As fotos que giram em volta do retrato são os mesmos três projetos do
// bloco (04). Gabo tem link de verdade porque está no ar; os outros dois
// levam pro card deles, que já avisa que ainda não tem domínio.
const orbita = projetos.map(p => ({ ...p, href: p.url || '#portfolio' }))

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
      // As fotinhos "estouram" em volta do retrato depois que ele revela.
      // clearProps depois: sem isso a transform inline do GSAP fica presa
      // no elemento pra sempre e o :hover (que também mexe em transform)
      // para de responder.
      .from('.orbit-inner', {
        opacity: 0,
        scale: 0.4,
        duration: 0.9,
        stagger: 0.15,
        ease: 'back.out(1.6)',
        clearProps: 'transform'
      }, '-=0.5')

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
    // Mais rápido que a foto: a sensação é de as fotinhos flutuarem na
    // frente dela, não coladas. Anima o grupo, não cada item — cada item já
    // tem a própria animação de flutuação em CSS, e as duas competindo pela
    // mesma propriedade travariam uma na outra.
    gsap.to('.intro-orbit', {
      yPercent: -30,
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

    <div class="intro-portrait">
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

      <div class="intro-orbit">
        <a
          v-for="(p, i) in orbita"
          :key="p.nome"
          :href="p.href"
          :target="p.url ? '_blank' : undefined"
          :rel="p.url ? 'noopener' : undefined"
          :data-track="`orbit_${p.nome.toLowerCase()}`"
          :aria-label="p.url ? `Ver o site de ${p.nome} (abre em nova aba)` : `Ver o projeto ${p.nome}`"
          data-cursor="ver"
          class="orbit-item"
          :class="`orbit-${i + 1}`"
        >
          <span class="orbit-inner">
            <img :src="p.shot" alt="" width="320" height="200" loading="lazy" decoding="async" />
            <span v-if="p.url" class="orbit-live" aria-hidden="true" />
          </span>
        </a>
      </div>
    </div>

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
        data-track="wa_hero"
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

/* moldura: alta, encostada na direita, atravessada pelas linhas do título.
   A foto e as fotinhos que giram em volta dividem esse retângulo — a foto
   fica com overflow: hidden pro próprio recorte dela, e por isso as
   fotinhos não podiam morar dentro dela: qualquer uma que passasse da
   borda seria cortada antes de aparecer. */
.intro-portrait {
  position: absolute;
  /* Sem z-index aqui: se essa div virasse contexto de empilhamento, a foto
     (2) e as fotinhos (5) ficariam presas dentro dele e nunca se
     comparariam de verdade com o título (3) — as fotinhos, principalmente,
     precisam vencer o título onde cruzarem, senão ficam ali só de enfeite,
     sem clique. Cada uma define o próprio z-index e disputa direto lá em
     cima, no contexto do .intro. */
  /* Descida proposital: as linhas do título cruzam o tronco, não o rosto. */
  top: 26%;
  /* recuada da borda: encostada, ela ficava embaixo do índice de capítulos */
  right: clamp(4.5rem, 9vw, 7.5rem);
  width: min(24vw, 18rem);
  aspect-ratio: 4 / 5;
}
.intro-media {
  position: absolute;
  z-index: 2;
  inset: 0;
  margin: 0;
  overflow: hidden;
  border: 1px solid var(--lab-line);
  will-change: transform;
}
.intro-media img { width: 100%; height: 100%; object-fit: cover; }

/* fotinhos dos projetos, penduradas na borda do retrato. z-index acima do
   título (3): de nada adianta girar em volta da foto se ficam clicáveis só
   nos trechos onde o título não passa por cima. */
.intro-orbit {
  position: absolute;
  inset: 0;
  z-index: 5;
  pointer-events: none;
}
.orbit-item {
  position: absolute;
  display: block;
  pointer-events: auto;
}
.orbit-1 { width: 52%; aspect-ratio: 16 / 10; top: -16%; left: -46%; animation: orbFloatA 6.5s ease-in-out infinite; }
.orbit-2 { width: 40%; aspect-ratio: 16 / 10; bottom: -8%; right: -34%; animation: orbFloatB 5.6s ease-in-out infinite 0.4s; }
.orbit-3 { width: 32%; aspect-ratio: 16 / 10; top: 50%; left: -30%; animation: orbFloatC 7.2s ease-in-out infinite 0.9s; }

.orbit-inner {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  overflow: hidden;
  background: var(--lab-bg);
  border: 1.5px solid var(--lab-line-2);
  box-shadow: 0 14px 30px -14px rgba(0, 0, 0, 0.75);
  transition: transform 0.4s var(--ease), border-color 0.4s var(--ease), box-shadow 0.4s var(--ease);
}
.orbit-item:hover .orbit-inner {
  transform: scale(1.06);
  border-color: var(--lab-accent);
  box-shadow: 0 16px 34px -12px rgba(220, 91, 44, 0.45);
}
.orbit-inner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  filter: grayscale(1) contrast(1.08);
  transition: filter 0.5s var(--ease), transform 0.6s var(--ease);
}
.orbit-item:hover .orbit-inner img { filter: grayscale(0) contrast(1); transform: scale(1.08); }

/* só o projeto no ar ganha o pontinho — é sinal de "de verdade", não decoração.
   Tamanho fixo, não %: numa foto retangular grande, uma % do lado vira uma
   bola enorme. */
.orbit-live {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: var(--lab-accent);
  box-shadow: 0 0 0 2px var(--lab-bg);
  animation: orbPulse 2.4s infinite;
}

@keyframes orbFloatA { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-14px); } }
@keyframes orbFloatB { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
@keyframes orbFloatC { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
@keyframes orbPulse {
  0% { box-shadow: 0 0 0 2px var(--lab-bg), 0 0 0 2px rgba(220, 91, 44, 0.7); }
  70% { box-shadow: 0 0 0 2px var(--lab-bg), 0 0 0 8px rgba(220, 91, 44, 0); }
  100% { box-shadow: 0 0 0 2px var(--lab-bg), 0 0 0 0 rgba(220, 91, 44, 0); }
}

@media (prefers-reduced-motion: reduce) {
  .orbit-item, .orbit-live { animation: none; }
}

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
  .intro-portrait { top: auto; bottom: 26%; right: var(--lab-edge); width: 38vw; opacity: 0.45; }
  /* girar fotinho em volta de uma foto que já encolheu e perdeu opacidade
     pra dar lugar ao texto é só ruído */
  .intro-orbit { display: none; }
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
