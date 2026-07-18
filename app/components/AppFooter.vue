<script setup lang="ts">
const { waLink, email } = useSite()
const whatsapp = waLink('Oi! Quero começar meu site.')

const links = [
  { label: 'Serviços', href: '#servicos' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Portfólio', href: '#portfolio' },
  { label: 'FAQ', href: '#faq' }
]

const year = new Date().getFullYear()
</script>

<template>
  <footer id="contato" class="section-ink footer">
    <div class="craft-grid footer-craft" aria-hidden="true" data-parallax="5" />
    <div class="grain" />

    <div class="container footer-close" v-reveal>
      <span class="index">(07)</span>
      <p class="eyebrow accent">Vamos conversar</p>
      <h2 class="close-title">
        Seu próximo cliente já está <em>procurando</em> você.
      </h2>
      <div class="close-actions">
        <a
          v-magnetic="{ strength: 0.3 }"
          :href="whatsapp"
          target="_blank"
          rel="noopener"
          data-track="wa_footer"
          class="btn btn-cta close-cta"
        >
          <WaIcon class="wa" :size="22" />
          Começar meu site
        </a>
        <span class="status"><span class="pulse" />Aberto para 2 projetos este mês</span>
      </div>
    </div>

    <div class="footer-base">
    <div class="container footer-bottom">
      <a href="#topo" class="foot-logo">
        <MikanMark class="foot-mark" />
        <span class="foot-word">Kouichi<span class="dot">.</span></span>
      </a>

      <div class="footer-cols">
        <div class="footer-col">
          <p class="eyebrow accent">Navegação</p>
          <ul>
            <li v-for="l in links" :key="l.href"><a :href="l.href" class="link-sweep">{{ l.label }}</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <p class="eyebrow accent">Contato</p>
          <ul>
            <li><a :href="whatsapp" target="_blank" rel="noopener" class="link-sweep">WhatsApp</a></li>
            <li><a :href="`mailto:${email}`" class="link-sweep">{{ email }}</a></li>
            <li>{{ useSite().location }}</li>
          </ul>
        </div>
      </div>

      <a href="#topo" class="to-top link-sweep">Voltar ao topo ↑</a>
    </div>

    <div class="container colophon">
      <p>© {{ year }} Kouichi — design &amp; desenvolvimento próprios.</p>
      <p class="made">Feito em Goiânia, com café.</p>
    </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  position: relative;
  overflow: hidden;
  border-top: 2px solid var(--ink);
  padding-top: clamp(3.5rem, 8vw, 6rem);
}
.footer-craft {
  inset: 0 0 40% 0;
  --grid-line: rgba(243, 234, 216, 0.06);
  -webkit-mask-image: radial-gradient(ellipse 70% 60% at 50% 30%, #000, transparent 75%);
  mask-image: radial-gradient(ellipse 70% 60% at 50% 30%, #000, transparent 75%);
}
.footer .grain { mix-blend-mode: screen; opacity: 0.05; }

.footer-close {
  position: relative;
  z-index: 2;
  padding-bottom: clamp(3rem, 6vw, 4.5rem);
}
.footer-base {
  position: relative;
  z-index: 2;
  background: #0a0703;
  border-top: 2px solid rgba(243, 234, 216, 0.16);
}
.footer-close .index { display: block; color: var(--paper); opacity: 0.5; }
.footer-close .eyebrow { margin: 0.9rem 0 1.25rem; }
.accent { color: var(--clay); }
.close-title {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: clamp(2.4rem, 6vw, 5rem);
  line-height: 0.98;
  letter-spacing: -0.02em;
  max-width: 16ch;
}
.close-title em { font-style: italic; color: var(--clay); }
.close-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.5rem 2rem;
  margin-top: 2.5rem;
}
.close-cta {
  font-size: 1.05rem;
  padding: 1.1rem 2rem;
  border-color: var(--paper);
  box-shadow: 4px 4px 0 0 var(--paper);
}
.close-cta:hover { box-shadow: 2px 2px 0 0 var(--paper); }
.close-cta:active { box-shadow: 0 0 0 0 var(--paper); }
.status {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  font-size: 0.86rem;
  opacity: 0.8;
}
.pulse {
  width: 8px; height: 8px;
  border-radius: 999px;
  background: var(--moss-lit, #9BB06E);
  animation: pulse 2.4s infinite;
}
@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(155, 176, 110, 0.5); }
  70% { box-shadow: 0 0 0 7px rgba(155, 176, 110, 0); }
  100% { box-shadow: 0 0 0 0 rgba(155, 176, 110, 0); }
}

.footer-bottom {
  position: relative;
  z-index: 2;
  display: grid;
  gap: 2.5rem;
  padding-block: clamp(2.5rem, 5vw, 3.5rem);
}
.foot-logo {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  font-size: 1.8rem;
}
.foot-mark { width: 1.5em; height: 1.5em; flex-shrink: 0; --mark-shadow: var(--paper); }
.foot-word {
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 600;
}
.foot-logo .dot { color: var(--clay); }

.footer-cols { display: flex; gap: 3.5rem; flex-wrap: wrap; }
.footer-col ul {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  margin-top: 0.9rem;
  font-size: 0.92rem;
  opacity: 0.85;
}
.footer-col a { transition: color 0.2s var(--ease); }
.footer-col a:hover { color: var(--clay); }

.to-top {
  align-self: start;
  font-size: 0.85rem;
  opacity: 0.75;
  transition: opacity 0.2s var(--ease);
}
.to-top:hover { opacity: 1; }

.colophon {
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding-block: 1.5rem;
  border-top: 2px solid rgba(243, 234, 216, 0.18);
  font-size: 0.8rem;
  opacity: 0.6;
}

@media (min-width: 820px) {
  .footer-bottom {
    grid-template-columns: auto 1fr auto;
    align-items: start;
    column-gap: 3rem;
  }
}
</style>
