<script setup lang="ts">
const { projects: projetos } = useSite()
</script>

<template>
  <section id="portfolio" class="section-light portfolio">
    <div class="container">
      <header class="sec-head" v-reveal>
        <span class="index">(05)</span>
        <div>
          <p class="eyebrow accent">Portfólio</p>
          <h2 class="display-2">O método, <em>aplicado.</em></h2>
        </div>
        <p class="sec-note">
          Conceitos que mostram o método aplicado a nichos reais de Goiânia.
          Casos com clientes reais entram aqui conforme forem ao ar — os
          primeiros projetos saem a valor de lançamento.
        </p>
      </header>

      <div class="grid">
        <component
          :is="p.url ? 'a' : 'article'"
          v-for="(p, i) in projetos"
          :key="p.nicho"
          class="proj"
          :class="{ 'is-link': p.url }"
          :href="p.url || undefined"
          :target="p.url ? '_blank' : undefined"
          :rel="p.url ? 'noopener' : undefined"
          v-reveal="{ delay: i * 110 }">
          <div class="preview" :class="p.tone">
            <img v-if="p.image" :src="p.image" :alt="p.nicho" class="proj-photo" width="1000" height="625" loading="lazy" decoding="async" />
            <template v-else>
            <div class="craft-grid preview-grid" />
            <div class="browser" data-parallax="7">
              <span class="dots"><i /><i /><i /></span>
              <div class="wire">
                <span class="wire-title" />
                <span class="wire-line" />
                <span class="wire-line short" />
                <span class="wire-cta">WhatsApp</span>
              </div>
            </div>
            </template>
            <span v-if="!p.image" class="demo-tag">Projeto demonstrativo</span>
          </div>

          <div class="proj-body">
            <h3 class="proj-nicho">{{ p.nicho }}</h3>
            <p class="proj-obj">{{ p.objetivo }}</p>
            <ul class="proj-tags">
              <li v-for="t in p.tags" :key="t">{{ t }}</li>
            </ul>
          </div>
        </component>
      </div>
    </div>
  </section>
</template>

<style scoped>
.portfolio {
  padding-block: clamp(3.5rem, 8vw, 6.5rem);
  background:
    radial-gradient(52% 42% at 10% 16%, rgba(61, 75, 44, 0.05), transparent 60%),
    var(--paper);
}

.sec-head {
  display: grid;
  gap: 1.25rem;
  padding-bottom: clamp(2.5rem, 5vw, 3.5rem);
}
.sec-head .index { display: block; }
.sec-head .eyebrow { margin-bottom: 0.6rem; }
.accent { color: var(--clay); }
.sec-head em { font-style: italic; color: var(--clay); }
.sec-note { max-width: 32rem; opacity: 0.78; line-height: 1.55; font-size: 0.98rem; }
@media (min-width: 900px) {
  .sec-head { grid-template-columns: auto 1fr auto; align-items: end; column-gap: 2.5rem; }
  .sec-note { max-width: 22rem; }
}

.grid { display: grid; gap: 1.75rem; }
@media (min-width: 760px) { .grid { grid-template-columns: repeat(2, 1fr); } }

.proj {
  background: var(--card);
  border: 2px solid var(--ink);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: var(--hard-lg);
  transition: transform 0.2s var(--ease), box-shadow 0.2s var(--ease);
}
.proj:hover { transform: translate(-2px, -2px); box-shadow: 8px 8px 0 0 var(--ink); }
.proj.is-link { display: block; color: inherit; text-decoration: none; cursor: pointer; }

.preview {
  position: relative;
  aspect-ratio: 16 / 10;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 2px solid var(--ink);
  overflow: hidden;
}
.preview.moss { background: var(--moss); }
.preview.clay { background: var(--clay); }
.preview-grid { inset: 0; opacity: 0.5; --grid-line: rgba(255,255,255,0.14); -webkit-mask-image: none; mask-image: none; }
.proj-photo { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }

.browser {
  position: relative;
  z-index: 1;
  width: min(80%, 20rem);
  background: var(--card);
  border: 2px solid var(--ink);
  border-radius: 8px;
  box-shadow: 4px 4px 0 0 rgba(0,0,0,0.35);
  overflow: hidden;
}
.dots { display: flex; gap: 5px; padding: 0.5rem 0.65rem; border-bottom: 1.5px solid var(--ink); }
.dots i { width: 8px; height: 8px; border-radius: 999px; border: 1.5px solid var(--ink); }
.dots i:nth-child(1) { background: var(--clay); }
.dots i:nth-child(2) { background: var(--paper-2); }
.dots i:nth-child(3) { background: var(--moss); }
.wire { padding: 0.9rem; display: flex; flex-direction: column; gap: 0.5rem; }
.wire-title { height: 12px; width: 70%; background: var(--ink); border-radius: 3px; }
.wire-line { height: 7px; width: 100%; background: rgba(23,19,9,0.22); border-radius: 3px; }
.wire-line.short { width: 55%; }
.wire-cta {
  align-self: flex-start;
  margin-top: 0.35rem;
  font-size: 0.6rem;
  font-weight: 600;
  background: var(--clay);
  color: var(--ink);
  border: 1.5px solid var(--ink);
  border-radius: 999px;
  padding: 0.2rem 0.6rem;
}

.demo-tag {
  position: absolute;
  z-index: 2;
  bottom: 0.75rem;
  left: 0.75rem;
  background: var(--card);
  color: var(--ink);
  border: 2px solid var(--ink);
  border-radius: 999px;
  padding: 0.2rem 0.7rem;
  font-size: 0.66rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.proj-body { padding: 1.5rem; }
.proj-nicho { font-family: var(--font-display); font-weight: 600; font-size: 1.5rem; }
.proj-obj { margin-top: 0.5rem; font-size: 0.95rem; line-height: 1.5; opacity: 0.82; }
.proj-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 1.25rem; }
.proj-tags li {
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.28rem 0.65rem;
  border: 1.5px solid var(--ink);
  border-radius: 999px;
}
</style>
