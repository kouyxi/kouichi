<script setup lang="ts">
import { waLink, disponibilidade } from '~/data/contato'

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
    // A única entrada coreografada da página: a foto abre de baixo pra cima
    // e o texto sobe atrás dela. Tudo o que vem depois nasce no lugar.
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
    tl.from('.intro-media', { clipPath: 'inset(100% 0% 0% 0%)', duration: 1.2, ease: 'power4.inOut' })
      .from('.intro-media img', { scale: 1.25, duration: 1.5, ease: 'power3.out' }, '<')
      .from('.intro-fade', { opacity: 0, y: 22, duration: 0.8, stagger: 0.08 }, 0.35)

    // A foto desce um pouco mais devagar que a página: profundidade ligada
    // ao scroll, não um efeito que dispara sozinho.
    gsap.to('.intro-media', {
      yPercent: 8,
      ease: 'none',
      scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: 0.5 }
    })
  }, el)

  onBeforeUnmount(() => ctx.revert())
})
</script>

<template>
  <section id="topo" ref="root" class="intro claro">
    <!-- Mesma grade 3/9 das seções: a assinatura ocupa a coluna do rótulo,
         o texto começa na mesma linha vertical do resto da página e a foto
         fecha a direita com a altura do bloco inteiro. -->
    <div class="intro-in">
      <p class="intro-quem intro-fade">Victor Kouichi, desenvolvedor de sites em Goiânia.</p>

      <div class="intro-txt">
        <h1 class="intro-title intro-fade">Seu site pode fazer o telefone tocar.</h1>
        <p class="intro-sub intro-fade">
          Site e landing page pra clínica, escritório e prestador de serviço.
          Pronto em 5 a 15 dias úteis, e cada contato de cliente cai direto no seu WhatsApp.
        </p>
        <!-- O botão diz o que acontece ao clicar; as duas linhas embaixo
             respondem "quanto demora" e "o que me compromete", que é o que
             a pessoa pergunta antes de apertar. A vaga é escassez real, e
             pulsa de leve: sinal de "está no ar agora". -->
        <div class="intro-acao intro-fade">
          <a
            :href="whatsapp"
            target="_blank"
            rel="noopener"
            data-track="wa_hero"
            class="intro-cta"
            data-cursor="grow"
          >
            <WaIcon :size="18" />
            Pedir orçamento no WhatsApp
          </a>
          <p class="intro-gatilho">Respondo no mesmo dia, sem compromisso.</p>
          <p class="intro-vaga"><i class="pulso" aria-hidden="true" />{{ disponibilidade }}</p>
        </div>
      </div>

      <figure class="intro-media">
        <img
          src="/img/hero-kouichi.webp"
          alt="Victor Kouichi, desenvolvedor de sites, em Goiânia"
          width="800"
          height="1000"
          fetchpriority="high"
          decoding="async"
        />
      </figure>
    </div>
  </section>
</template>

<style scoped>
.intro {
  padding: clamp(1.5rem, 4vh, 3rem) var(--lab-edge) clamp(3rem, 8vh, 5rem);
  background: var(--lab-bg);
  color: var(--lab-fg);
}
.intro-in {
  max-width: var(--lab-wrap);
  margin-inline: auto;
  display: grid;
  gap: var(--sp-3);
}

/* celular: foto primeiro, em corte horizontal; o rosto é a primeira coisa
   na tela, antes de qualquer palavra */
.intro-media {
  order: -1;
  margin: 0;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  border: 1px solid var(--lab-line);
  will-change: clip-path;
}
.intro-media img { width: 100%; height: 100%; object-fit: cover; object-position: center 22%; }

.intro-quem { font-size: var(--t-s); font-weight: 500; color: var(--lab-dim); }
.intro-title {
  font-family: var(--font-display);
  font-weight: var(--w-display, 500);
  font-size: clamp(2.3rem, 4.6vw, 4rem);
  line-height: 1.02;
  letter-spacing: -0.03em;
  text-wrap: balance;
  /* três linhas equilibradas no desktop, duas no celular; com a coluna do
     meio em 5/12 a Young Serif não cabe em duas linhas sem encolher demais */
  max-width: 14ch;
}
.intro-sub {
  margin-top: var(--sp-3);
  max-width: 30rem;
  font-size: clamp(1rem, 1.2vw, 1.12rem);
  line-height: 1.6;
  color: var(--lab-dim);
}
.intro-acao { margin-top: var(--sp-4); }
.intro-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  min-height: 3rem;
  padding: 0.9rem 1.6rem;
  background: var(--lab-accent);
  color: #0E0B04;
  font-weight: 600;
  font-size: 0.95rem;
  border-radius: 999px;
}
.intro-gatilho { margin-top: var(--sp-2); font-size: var(--t-s); color: var(--lab-dim); }
.intro-vaga {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-top: var(--sp-1);
  font-size: var(--t-s);
  color: var(--lab-dim);
}

@media (min-width: 900px) {
  .intro { padding-block: clamp(3rem, 7vh, 5rem); }
  .intro-in {
    grid-template-columns: minmax(0, 3fr) minmax(0, 5fr) minmax(0, 4fr);
    gap: var(--sp-5);
    align-items: center;
  }
  /* a assinatura desce até a linha do título, como o rótulo das seções */
  .intro-quem { align-self: start; padding-top: 0.5rem; }
  .intro-media { order: 0; aspect-ratio: 4 / 5; max-height: 34rem; width: 100%; }
}

/* sem animação: tudo já nasce no lugar */
.intro.is-static .intro-media,
.intro.is-static .intro-fade { opacity: 1; transform: none; clip-path: none; }
</style>
