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
  { label: 'Quem faz', href: '#sobre', so: 'desktop' },
  { label: 'Dúvidas', href: '#faq', so: 'desktop' }
]
const whatsapp = waLink('Oi, Kouichi! Vim pelo seu site e queria um orçamento. Meu negócio é ')

// Linha de progresso na base da barra: quanto da página já foi lida. É o
// índice de capítulos do celular, onde a mikan não cabe.
const progresso = ref(0)
onMounted(() => {
  let agendado = false
  const medir = () => {
    agendado = false
    const total = document.documentElement.scrollHeight - window.innerHeight
    progresso.value = total > 0 ? Math.min(1, window.scrollY / total) : 0
  }
  const onScroll = () => {
    if (agendado) return
    agendado = true
    requestAnimationFrame(medir)
  }
  window.addEventListener('scroll', onScroll, { passive: true })
  medir()
  onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
})
</script>

<template>
  <header class="hd claro">
   <div class="hd-in">
    <a href="#topo" class="hd-logo" aria-label="Kouichi, início">
      <MikanMark class="hd-mark" />
      <span>Kouichi</span>
      <!-- o nome em katakana: etiqueta, não tradução; fonte do sistema,
           que já tem kana em qualquer celular -->
      <span class="kana" lang="ja" aria-hidden="true">コウイチ</span>
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
   </div>
   <span class="hd-prog" aria-hidden="true" :style="{ transform: `scaleX(${progresso})` }" />
  </header>
</template>

<style scoped>
.hd {
  position: sticky;
  top: 0;
  z-index: 60;
  padding: 0 var(--lab-edge);
  background: var(--lab-bg);
  color: var(--lab-fg);
  border-bottom: 1px solid var(--lab-line);
}
.hd-in {
  max-width: var(--lab-wrap);
  margin-inline: auto;
  min-height: 3.75rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}
.hd-logo {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-family: var(--font-display);
  /* a Young Serif só tem o 400; pedir 600 fazia o navegador engrossar no
     braço, com a letra borrada */
  font-weight: var(--w-display);
  font-size: 1.2rem;
  letter-spacing: -0.01em;
  white-space: nowrap;
}
.hd-logo .kana { margin-left: 0.15rem; }
/* .hd-logo na frente de propósito: o .mikan do componente tem a mesma
   especificidade, e antes do JS chegar o CSS dele vinha depois e ganhava.
   A marca nascia gigante e encolhia em 2 s, empurrando a página inteira. */
.hd-logo .hd-mark { width: 1.9rem; height: 1.9rem; --clay: var(--lab-accent); --ink: var(--lab-fg); --mark-shadow: transparent; }

.hd-nav { display: flex; gap: clamp(0.9rem, 2.5vw, 1.6rem); font-size: 0.92rem; }
.hd-nav a { white-space: nowrap; color: var(--lab-dim); padding-block: 0.25rem; border-bottom: 1px solid transparent; }
.hd-nav a:hover { color: var(--lab-fg); border-color: currentColor; }

.hd-prog {
  position: absolute;
  left: 0;
  right: 0;
  bottom: -1px;
  height: 2px;
  background: var(--lab-accent);
  transform-origin: left;
  transform: scaleX(0);
}
.hd-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  min-height: 2.75rem;
  padding: 0.6rem 1rem;
  border-radius: 999px;
  background: var(--lab-accent);
  color: #0E0B04;
  font-weight: 600;
  font-size: 0.88rem;
  white-space: nowrap;
}

/* Até 960px ficam a marca, os dois serviços e o ícone (cabe em 360px). A
   barra completa, com os cinco links e o botão escrito, precisa de ~900px:
   abaixo disso os links quebravam em duas linhas. */
@media (max-width: 959px) {
  .so-desktop { display: none; }
  .hd-in { gap: 0.75rem; }
  .hd-nav { font-size: 0.85rem; }
  /* círculo de 44px, o alvo de toque recomendado */
  .hd-cta { padding: 0.6rem; min-width: 2.75rem; justify-content: center; }
}
/* Celular em pé: com o katakana a linha só cabe a partir de 413px, e antes
   ele quebrava em duas. Nessa largura ele fica só na etiqueta do rodapé. */
@media (max-width: 479px) {
  .hd-logo .kana { display: none; }
}
</style>
