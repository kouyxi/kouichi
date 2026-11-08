<script setup lang="ts">
import { waLink, disponibilidade } from '~/data/contato'

const whatsapp = waLink('Oi, Kouichi! Vi seu site e queria um orçamento. Meu negócio é ')
</script>

<template>
  <section id="topo" class="intro claro">
    <!-- Mesma grade 3/9 das seções: a assinatura ocupa a coluna do rótulo,
         o texto começa na mesma linha vertical do resto da página e a foto
         fecha a direita com a altura do bloco inteiro. -->
    <div class="intro-in">
      <p class="intro-quem intro-fade">Victor Kouichi, desenvolvedor de sites. Goiânia.</p>

      <div class="intro-txt">
        <h1 class="intro-title intro-fade">Site que faz o telefone tocar.</h1>
        <p class="intro-sub intro-fade">
          Pra clínica, escritório e prestador de serviço. Pronto em 5 a 15 dias úteis.
          Cada cliente cai direto no seu WhatsApp.
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
          >
            <WaIcon :size="18" />
            Pedir orçamento no WhatsApp
          </a>
          <p class="intro-gatilho">Respondo no mesmo dia. Sem compromisso.</p>
          <p class="intro-vaga"><i class="pulso" aria-hidden="true" />{{ disponibilidade }}</p>
        </div>
      </div>

      <figure class="intro-media">
        <!-- AVIF em tons de cinza: 78 KB contra 160 KB do WebP, com a trama
             de meio-tom intacta (abaixo de q55 os pontos viram borrão).
             O WebP fica pra quem não lê AVIF. -->
        <picture>
          <source srcset="/img/hero-kouichi.avif" type="image/avif" />
          <img
            src="/img/hero-kouichi.webp"
            alt="Victor Kouichi, desenvolvedor de sites, em Goiânia"
            width="800"
            height="1000"
            fetchpriority="high"
          />
        </picture>
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
  /* A mesma foto em 20×25 px (228 caracteres): no 4G a foto chega ~1 s depois
     da primeira pintura, e sem isso a entrada abria uma caixa vazia. */
  background: url(data:image/webp;base64,UklGRqIAAABXRUJQVlA4IJYAAAAQBQCdASoUABkAPu1ur1IppiQiqAgBMB2JaQAAIvQncXH4Mb4o6fLdUaflLQ4K3uAAAPpDWA+82BM6Z9BGrmOu4MBOnTXost1UsvtY5xSdtY0c+fViTMX2GePGySpGKN+8fRSvh3i7o9BbQXLyU7QastZuAXDoPuqZ2TTdn3uOi+IKlMxjvu1PXt5zBEHMlrbNjnuAAAA=) center 22% / cover no-repeat;
}
.intro-media picture { display: block; height: 100%; }
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

/* A única entrada coreografada da página: a foto abre de baixo pra cima e o
   texto sobe atrás dela. Em CSS, roda no primeiro quadro. Antes era GSAP,
   que no 4G só chegava ~2 s depois: a página aparecia, sumia e entrava de
   novo. Quem pediu menos movimento recebe tudo parado. */
@media (prefers-reduced-motion: no-preference) {
  .intro-media { animation: introAbre 1.2s cubic-bezier(0.76, 0, 0.24, 1) both; }
  .intro-media img { animation: introFoto 1.5s cubic-bezier(0.215, 0.61, 0.355, 1) both; }
  .intro-fade { animation: introSobe 0.8s cubic-bezier(0.16, 1, 0.3, 1) both; }
  /* o texto não espera a foto: no celular ela costuma chegar depois */
  .intro-quem { animation-delay: 0.1s; }
  .intro-title { animation-delay: 0.16s; }
  .intro-sub { animation-delay: 0.22s; }
  .intro-acao { animation-delay: 0.28s; }

  /* A foto desce um pouco mais devagar que a página, ligada à rolagem e no
     compositor, sem JS. Navegador sem suporte fica com a foto parada. */
  @supports (animation-timeline: scroll()) {
    .intro-media {
      animation: introAbre 1.2s cubic-bezier(0.76, 0, 0.24, 1) both, introDesce linear both;
      animation-timeline: auto, scroll(root);
      animation-range: normal, 0 100vh;
    }
  }
}
@keyframes introAbre { from { clip-path: inset(100% 0 0 0); } to { clip-path: inset(0); } }
@keyframes introFoto { from { transform: scale(1.25); } }
@keyframes introSobe { from { opacity: 0; transform: translateY(22px); } }
@keyframes introDesce { to { transform: translateY(8%); } }
</style>
