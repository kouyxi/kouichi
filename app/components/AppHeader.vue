<script setup lang="ts">
const links = [
  { label: 'Serviços', href: '#servicos' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Portfólio', href: '#portfolio' },
  { label: 'FAQ', href: '#faq' }
]
const { waLink, waHello } = useSite()
const whatsapp = waLink(waHello)

const open = ref(false)
</script>

<template>
  <header class="header">
    <div class="container bar">
      <a href="#topo" class="logo">
        <MikanMark class="logo-mark" />
        <span class="logo-word">Kouichi<span class="dot">.</span></span>
      </a>

      <nav class="nav">
        <a v-for="(l, i) in links" :key="l.href" :href="l.href" class="link-sweep">
          <span class="nav-idx">0{{ i + 1 }}</span>{{ l.label }}
        </a>
      </nav>

      <a v-magnetic="{ strength: 0.2 }" :href="whatsapp" target="_blank" rel="noopener" data-track="wa_header" class="btn btn-cta header-cta">
        <WaIcon class="wa" :size="17" />
        WhatsApp
      </a>

      <button
        class="burger"
        :class="{ open }"
        :aria-expanded="open"
        :aria-label="open ? 'Fechar menu' : 'Abrir menu'"
        @click="open = !open"
      >
        <span /><span /><span />
      </button>
    </div>

    <Transition name="sheet">
      <nav v-if="open" class="mobile-menu">
        <a
          v-for="(l, i) in links"
          :key="l.href"
          :href="l.href"
          class="mobile-link"
          @click="open = false"
        >
          <span class="nav-idx">0{{ i + 1 }}</span>{{ l.label }}
        </a>
        <a
          :href="whatsapp"
          target="_blank"
          rel="noopener"
          data-track="wa_menu"
          class="btn btn-cta mobile-cta"
          @click="open = false"
        >
          <WaIcon class="wa" :size="18" />
          Começar no WhatsApp
        </a>
      </nav>
    </Transition>
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
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
}
.logo-mark { width: 1.55em; height: 1.55em; flex-shrink: 0; }
.logo-word {
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 600;
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

/* hamburger */
.burger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 44px;
  height: 44px;
  padding: 0 10px;
  border: 2px solid var(--ink);
  border-radius: 8px;
  background: var(--card);
  cursor: pointer;
}
.burger span {
  display: block;
  height: 2.5px;
  width: 100%;
  background: var(--ink);
  border-radius: 2px;
  transition: transform 0.25s var(--ease), opacity 0.2s var(--ease);
}
.burger.open span:nth-child(1) { transform: translateY(7.5px) rotate(45deg); }
.burger.open span:nth-child(2) { opacity: 0; }
.burger.open span:nth-child(3) { transform: translateY(-7.5px) rotate(-45deg); }

.mobile-menu {
  display: flex;
  flex-direction: column;
  padding: 0.75rem 1.25rem 1.5rem;
  border-top: 2px solid var(--ink);
  background: rgba(243, 234, 216, 0.98);
  backdrop-filter: blur(14px);
}
.mobile-link {
  display: flex;
  align-items: baseline;
  gap: 0.6rem;
  padding: 0.9rem 0.25rem;
  font-size: 1.1rem;
  font-weight: 500;
  border-bottom: 1.5px solid var(--line);
}
.mobile-link .nav-idx { font-size: 0.7rem; color: var(--clay); }
.mobile-cta { margin-top: 1.1rem; width: 100%; justify-content: center; }

.sheet-enter-active, .sheet-leave-active { transition: opacity 0.2s var(--ease), transform 0.25s var(--ease); }
.sheet-enter-from, .sheet-leave-to { opacity: 0; transform: translateY(-8px); }

@media (min-width: 900px) {
  .nav { display: flex; }
}
@media (max-width: 899px) {
  .header-cta { display: none; }
  .burger { display: flex; }
}
@media (prefers-reduced-motion: reduce) {
  .burger span, .sheet-enter-active, .sheet-leave-active { transition: none; }
}
</style>
