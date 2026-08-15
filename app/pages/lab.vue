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
</script>

<template>
  <div class="lab">
    <LabCursor />
    <LabChapters />

    <a :href="whatsapp" target="_blank" rel="noopener" data-track="wa_lab_flutuante" class="lab-float">
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

  background: var(--lab-bg);
  color: var(--lab-fg);
  overflow-x: clip;
}

/* a página é escura de ponta a ponta, inclusive no overscroll */
body:has(.lab) { background: #0E0B04; }

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
  transition: transform 0.3s var(--ease);
}
.lab-float:hover { transform: translateY(-3px); }
.lab-float-t { display: none; }
@media (min-width: 640px) { .lab-float-t { display: inline; } }
</style>
