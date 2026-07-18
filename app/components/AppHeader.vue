<script setup lang="ts">
const links = [
  { label: 'Serviços', href: '#servicos' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Portfólio', href: '#portfolio' },
  { label: 'FAQ', href: '#faq' }
]
// TODO: trocar pelo número real de WhatsApp (formato: 55DDDNÚMERO)
const whatsapp = 'https://wa.me/556200000000'
</script>

<template>
  <header class="header">
    <div class="container bar">
      <a href="#topo" class="logo">
        Kouichi<span class="dot">.</span>
      </a>

      <nav class="nav">
        <a v-for="(l, i) in links" :key="l.href" :href="l.href" class="link-sweep">
          <span class="nav-idx">0{{ i + 1 }}</span>{{ l.label }}
        </a>
      </nav>

      <a v-magnetic="{ strength: 0.2 }" :href="whatsapp" target="_blank" rel="noopener" class="btn btn-cta header-cta">
        <WaIcon class="wa" :size="17" />
        WhatsApp
      </a>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 40;
  background: rgba(243, 234, 216, 0.82);
  backdrop-filter: blur(14px);
  border-bottom: 2px solid var(--ink);
}
.bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-block: 1rem;
  color: var(--ink);
}
.logo {
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 600;
  font-size: 1.5rem;
  letter-spacing: -0.01em;
}
.logo .dot { color: var(--clay); }

.nav {
  display: none;
  gap: 2.25rem;
  font-size: 0.9rem;
  font-weight: 500;
}
.nav a {
  display: inline-flex;
  align-items: baseline;
  gap: 0.4rem;
  opacity: 0.82;
  transition: opacity 0.2s var(--ease);
}
.nav a:hover { opacity: 1; }
.nav-idx {
  font-size: 0.65rem;
  color: var(--clay);
  font-variant-numeric: tabular-nums;
}

.header-cta { font-size: 0.85rem; padding: 0.55rem 1.1rem; }

@media (min-width: 900px) {
  .nav { display: flex; }
}
</style>
