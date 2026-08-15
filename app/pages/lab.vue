<script setup lang="ts">
import { waLink } from '~/data/contato'

// Experimento de layout. Fica fora do índice do Google enquanto for teste:
// se ranquear, briga com a home pelas mesmas buscas.
useHead({
  title: 'Kouichi — Lab',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' },
    { name: 'theme-color', content: '#0E0B04' }
  ]
})

const whatsapp = waLink('Oi, Kouichi! Vi seu site e queria um orçamento. Meu negócio é ')

// O botão flutuante some no fecho. Lá já existem o CTA gigante e o selo:
// três chamadas de WhatsApp empilhadas no mesmo canto viram ruído bem no
// momento em que a pessoa está decidindo.
const floatVisivel = ref(true)

onMounted(() => {
  const fecho = document.querySelector('.ct-final')
  if (!fecho) return
  const io = new IntersectionObserver(
    ([e]) => { floatVisivel.value = !e!.isIntersecting },
    { threshold: 0.35 }
  )
  io.observe(fecho)
  onBeforeUnmount(() => io.disconnect())
})
</script>

<template>
  <div class="lab">
    <div class="lab-grao" aria-hidden="true" />
    <LabCursor />
    <LabChapters />

    <a
      :href="whatsapp"
      target="_blank"
      rel="noopener"
      data-track="wa_lab_flutuante"
      class="lab-float"
      :class="{ 'is-oculto': !floatVisivel }"
      :aria-hidden="!floatVisivel"
      :tabindex="floatVisivel ? undefined : -1"
    >
      <WaIcon :size="22" />
      <span class="lab-float-t">WhatsApp</span>
    </a>

    <main>
      <LabIntro />
      <LabVelocity />
      <LabServices />
      <LabProcess />
      <LabWork />
      <LabManifest />
      <LabContact />
    </main>
  </div>
</template>

<style>
/* Tokens do lab. Não são escopados de propósito: os componentes filhos
   leem daqui. Ficam presos a .lab, então nada vaza pra home. */
.lab {
  --lab-bg: #0E0B04;
  --lab-fg: #F3EAD8;
  --lab-dim: rgba(243, 234, 216, 0.62);
  --lab-accent: #DC5B2C;
  --lab-line: rgba(243, 234, 216, 0.14);
  --lab-line-2: rgba(243, 234, 216, 0.28);
  --lab-edge: clamp(1.15rem, 4vw, 3.5rem);

  /* o fundo não é uma cor chapada: duas manchas muito fracas dão profundidade
     e tiram a sensação de "preto igual do começo ao fim" */
  background:
    radial-gradient(ellipse 90% 50% at 15% 0%, rgba(220, 91, 44, 0.07), transparent 60%),
    radial-gradient(ellipse 70% 60% at 90% 78%, rgba(111, 131, 71, 0.06), transparent 62%),
    var(--lab-bg);
  color: var(--lab-fg);
  overflow-x: clip;
}

/* a página é escura de ponta a ponta, inclusive no overscroll */
body:has(.lab) { background: #0E0B04; }

/* Grão de papel por cima de tudo. É o que mais tira o aspecto de tela
   chapada, e custa uma textura em SVG — nada de imagem. */
.lab-grao {
  position: fixed;
  inset: 0;
  z-index: 80;
  pointer-events: none;
  opacity: 0.055;
  mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

.lab .lab-index {
  display: block;
  font-family: var(--font-body);
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  font-size: 0.72rem;
  letter-spacing: 0.16em;
  color: var(--lab-accent);
}

.lab ::selection { background: var(--lab-accent); color: var(--lab-bg); }

.lab-float {
  position: fixed;
  z-index: 70;
  /* à direita: à esquerda ele cobria o pé do título em quase toda seção */
  right: clamp(1rem, 3vw, 2rem);
  bottom: clamp(1rem, 3vw, 2rem);
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.75rem 1.15rem;
  border-radius: 999px;
  background: var(--lab-accent);
  color: var(--lab-bg);
  font-weight: 600;
  font-size: 0.88rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.45);
  transition: transform 0.35s var(--ease), opacity 0.35s var(--ease);
}
.lab-float:hover { transform: translateY(-3px); }
.lab-float.is-oculto {
  opacity: 0;
  transform: translateY(1rem) scale(0.9);
  pointer-events: none;
}
.lab-float-t { display: none; }
@media (min-width: 640px) { .lab-float-t { display: inline; } }
</style>
