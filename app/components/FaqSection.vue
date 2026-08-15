<script setup lang="ts">
import { faqs } from '~/data/faqs'
import { waLink } from '~/data/contato'

const whatsapp = waLink('Oi, Kouichi! Fiquei com uma dúvida sobre o site.')
</script>

<template>
  <section id="faq" class="section-light faq">
    <div class="container faq-grid">
      <header class="faq-head" v-reveal>
        <span class="index">(06)</span>
        <p class="eyebrow accent">Dúvidas</p>
        <h2 class="display-2" data-split-lines>Antes de você <em>perguntar.</em></h2>
        <p class="faq-note">
          Ficou faltando alguma? Me chama no WhatsApp. Quem responde sou eu, não um robô.
        </p>
        <a :href="whatsapp" target="_blank" rel="noopener" data-track="wa_faq" class="btn btn-cta faq-cta" v-magnetic="{ strength: 0.24 }">
          <WaIcon class="wa" :size="18" />
          Tirar dúvida
        </a>
      </header>

      <div class="faq-list" v-reveal="{ delay: 100 }">
        <details v-for="(f, i) in faqs" :key="i" class="faq-item">
          <summary>
            <span class="q-idx">0{{ i + 1 }}</span>
            <span class="q-text">{{ f.q }}</span>
            <span class="q-mark" aria-hidden="true" />
          </summary>
          <p class="q-answer">{{ f.a }}</p>
        </details>
      </div>
    </div>
  </section>
</template>

<style scoped>
.faq { padding-block: clamp(3.5rem, 8vw, 6.5rem); }
.faq-grid { display: grid; gap: clamp(2.5rem, 5vw, 4rem); }
@media (min-width: 900px) {
  .faq-grid { grid-template-columns: 0.85fr 1.15fr; align-items: start; }
  .faq-head { position: sticky; top: 6rem; }
}

.faq-head .index { display: block; }
.faq-head .eyebrow { margin: 0.75rem 0; }
.accent { color: var(--clay); }
.faq-head em { font-style: italic; color: var(--clay); }
.faq-note { margin-top: 1.25rem; max-width: 24rem; opacity: 0.8; line-height: 1.5; }
.faq-cta { margin-top: 1.5rem; }

.faq-list {
  border: 2px solid var(--ink);
  border-radius: 12px;
  overflow: hidden;
  background: var(--card);
  box-shadow: var(--hard-lg);
}
.faq-item + .faq-item { border-top: 2px solid var(--ink); }

summary {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem 1.4rem;
  cursor: pointer;
  list-style: none;
  transition: background 0.2s var(--ease);
}
summary::-webkit-details-marker { display: none; }
summary:hover { background: var(--paper-2); }
.q-idx {
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--clay);
  font-variant-numeric: tabular-nums;
}
.q-text { font-weight: 600; font-size: 1rem; flex: 1; }
.q-mark {
  position: relative;
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}
.q-mark::before, .q-mark::after {
  content: '';
  position: absolute;
  background: var(--ink);
  transition: transform 0.25s var(--ease), opacity 0.25s var(--ease);
}
.q-mark::before { top: 7px; left: 0; width: 16px; height: 2px; }
.q-mark::after { left: 7px; top: 0; width: 2px; height: 16px; }
details[open] .q-mark::after { transform: scaleY(0); opacity: 0; }

.q-answer {
  padding: 0 1.4rem 1.4rem calc(1.4rem + 0.72rem + 1rem);
  line-height: 1.55;
  font-size: 0.94rem;
  opacity: 0.85;
  max-width: 42rem;
}

@media (prefers-reduced-motion: no-preference) {
  details[open] .q-answer { animation: faqOpen 0.35s var(--ease); }
  @keyframes faqOpen {
    from { opacity: 0; transform: translateY(-6px); }
    to { opacity: 0.85; transform: none; }
  }
}
</style>
