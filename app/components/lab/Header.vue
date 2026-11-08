<script setup lang="ts">
import { waLink } from '~/data/contato'

// Barra fixa em creme, a mesma cor do topo e do fecho: é a borda do
// "cartão" que acompanha a pessoa pelo miolo escuro. Os dois serviços
// aparecem aqui porque é o único lugar que existe em toda a página, e o
// dono de site invadido chega procurando exatamente essa palavra.
const links = [
  { label: 'Sites', href: '#servicos' },
  { label: 'Site invadido', href: '#site-invadido' },
  { label: 'Como funciona', href: '#processo', so: 'desktop' },
  { label: 'Quem faz', href: '#sobre', so: 'desktop' }
]
const whatsapp = waLink('Oi, Kouichi! Vim pelo seu site e queria um orçamento. Meu negócio é ')
</script>

<template>
  <header class="hd claro">
    <a href="#topo" class="hd-logo" aria-label="Kouichi, início">
      <MikanMark class="hd-mark" />
      <span>Kouichi</span>
    </a>

    <nav class="hd-nav" aria-label="Seções">
      <a
        v-for="l in links"
        :key="l.href"
        :href="l.href"
        :class="{ 'so-desktop': l.so === 'desktop' }"
      >{{ l.label }}</a>
    </nav>

    <a
      :href="whatsapp"
      target="_blank"
      rel="noopener"
      data-track="wa_header"
      class="hd-cta"
      aria-label="Pedir orçamento no WhatsApp"
    >
      <WaIcon :size="18" />
      <span class="so-desktop">Pedir orçamento</span>
    </a>
  </header>
</template>

<style scoped>
.hd {
  position: sticky;
  top: 0;
  z-index: 60;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.65rem var(--lab-edge);
  background: var(--lab-bg);
  color: var(--lab-fg);
  border-bottom: 1px solid var(--lab-line);
}
.hd-logo {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 1.2rem;
  letter-spacing: -0.01em;
}
.hd-mark { width: 1.9rem; height: 1.9rem; --clay: var(--lab-accent); --ink: var(--lab-fg); --mark-shadow: transparent; }

.hd-nav { display: flex; gap: clamp(0.9rem, 2.5vw, 1.6rem); font-size: 0.92rem; }
.hd-nav a { color: var(--lab-dim); padding-block: 0.25rem; border-bottom: 1px solid transparent; }
.hd-nav a:hover { color: var(--lab-fg); border-color: currentColor; }

.hd-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1rem;
  border-radius: 999px;
  background: var(--lab-accent);
  color: #0E0B04;
  font-weight: 600;
  font-size: 0.88rem;
  white-space: nowrap;
}
.hd-cta:hover { background: var(--lab-fg); color: var(--lab-bg); }

/* no celular ficam a marca, os dois serviços e o ícone: cabe em 375px */
@media (max-width: 720px) {
  .so-desktop { display: none; }
  .hd-nav { font-size: 0.85rem; }
  .hd-cta { padding: 0.6rem; }
}
</style>
