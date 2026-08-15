<script setup lang="ts">
import { faqs } from '~/data/faqs'
import { waLink, email, whatsappDisplay, cidade } from '~/data/contato'

const whatsapp = waLink('Oi, Kouichi! Vi seu site e queria um orçamento. Meu negócio é ')
const aberta = ref<number | null>(0)
const root = ref<HTMLElement | null>(null)
const ano = new Date().getFullYear()

function alternar(i: number) {
  aberta.value = aberta.value === i ? null : i
}

onMounted(async () => {
  if (!root.value || prefersReducedMotion()) return
  const el = root.value
  const { gsap } = await useGsap()

  const ctx = gsap.context(() => {
    // O nome cresce enquanto a seção sobe: o último gesto da página é a
    // chamada ficando grande demais pra ser ignorada.
    gsap.fromTo(
      '.ct-huge',
      { scale: 0.82, yPercent: 8 },
      {
        scale: 1,
        yPercent: 0,
        ease: 'none',
        scrollTrigger: { trigger: '.ct-final', start: 'top bottom', end: 'top 20%', scrub: 0.6 }
      }
    )

    gsap.from('.ct-row', {
      opacity: 0,
      y: 20,
      duration: 0.55,
      stagger: 0.05,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.ct-faq', start: 'top 80%', once: true }
    })
  }, el)

  onBeforeUnmount(() => ctx.revert())
})
</script>

<template>
  <section id="contato" ref="root" class="ct">
    <div class="ct-faq">
      <header class="ct-faq-head">
        <span class="lab-index">(06)</span>
        <h2 class="ct-faq-title">Perguntas que<br><em>sempre chegam.</em></h2>
      </header>

      <ul class="ct-rows">
        <li v-for="(f, i) in faqs" :key="f.q" class="ct-row" :class="{ 'is-open': aberta === i }">
          <button
            type="button"
            class="ct-q"
            :aria-expanded="aberta === i"
            :aria-controls="`lab-faq-${i}`"
            @click="alternar(i)"
          >
            <span class="ct-q-n">{{ String(i + 1).padStart(2, '0') }}</span>
            <span class="ct-q-t">{{ f.q }}</span>
            <span class="ct-q-sign" aria-hidden="true" />
          </button>
          <div :id="`lab-faq-${i}`" class="ct-a" :hidden="aberta !== i">
            <p>{{ f.a }}</p>
          </div>
        </li>
      </ul>
    </div>

    <div class="ct-final">
      <LabDecor grade="fina" halo="base-centro" />
      <p class="ct-kicker">Sem compromisso, respondo no mesmo dia</p>
      <a
        :href="whatsapp"
        target="_blank"
        rel="noopener"
        data-track="wa_final"
        class="ct-huge"
        data-cursor="grow"
      >
        Vamos conversar
        <span class="ct-arrow" aria-hidden="true">→</span>
      </a>

      <div class="ct-baixo">
        <div class="ct-lines">
          <a :href="whatsapp" target="_blank" rel="noopener" data-track="wa_numero" class="ct-line">
            {{ whatsappDisplay }}
          </a>
          <a :href="`mailto:${email}`" class="ct-line">{{ email }}</a>
          <span class="ct-line ct-mute">{{ cidade }}</span>
        </div>
        <LabBadge class="ct-selo" />
      </div>

      <footer class="ct-foot">
        <span>Kouichi, {{ ano }}</span>
        <NuxtLink to="/lab" class="ct-back" rel="nofollow">Ver a versão anterior</NuxtLink>
      </footer>
    </div>
  </section>
</template>

<style scoped>
.ct { background: var(--lab-bg); color: var(--lab-fg); }

/* ---- FAQ ---- */
.ct-faq {
  padding: clamp(4rem, 12vh, 7rem) var(--lab-edge) clamp(3rem, 8vh, 5rem);
  border-top: 1px solid var(--lab-line);
}
.ct-faq-title {
  margin-top: 1rem;
  font-family: var(--font-display);
  font-weight: 900;
  font-size: clamp(2.2rem, 6vw, 4.5rem);
  line-height: 0.92;
  letter-spacing: -0.035em;
  text-transform: uppercase;
}
.ct-faq-title em { font-style: italic; color: var(--lab-accent); }

.ct-rows { margin-top: clamp(2rem, 5vh, 3rem); border-top: 1px solid var(--lab-line); }
.ct-row { border-bottom: 1px solid var(--lab-line); }
.ct-q {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 1.25rem;
  width: 100%;
  padding: 1.35rem 0;
  color: inherit;
  text-align: left;
}
.ct-q-n {
  font-family: var(--font-body);
  font-variant-numeric: tabular-nums;
  font-size: 0.74rem;
  letter-spacing: 0.1em;
  color: var(--lab-accent);
}
.ct-q-t {
  font-family: var(--font-display);
  font-weight: 500;
  font-size: clamp(1.05rem, 2.1vw, 1.55rem);
  line-height: 1.2;
  letter-spacing: -0.01em;
}
.ct-q-sign {
  position: relative;
  width: 15px;
  height: 15px;
  flex: none;
}
.ct-q-sign::before,
.ct-q-sign::after {
  content: '';
  position: absolute;
  background: var(--lab-fg);
  transition: transform 0.35s var(--ease), opacity 0.35s var(--ease);
}
.ct-q-sign::before { inset: 50% 0 auto 0; height: 1.5px; transform: translateY(-50%); }
.ct-q-sign::after { inset: 0 50% 0 auto; width: 1.5px; transform: translateX(50%); }
.ct-row.is-open .ct-q-sign::after { transform: translateX(50%) scaleY(0); opacity: 0; }
.ct-row.is-open .ct-q-sign::before { background: var(--lab-accent); }

.ct-a { padding: 0 0 1.5rem calc(0.74rem + 2.5rem); }
.ct-a p { max-width: 44rem; line-height: 1.62; color: var(--lab-dim); }

/* ---- finale ---- */
.ct-final {
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: clamp(1.5rem, 4vh, 2.5rem);
  padding: clamp(3rem, 8vh, 5rem) var(--lab-edge);
  border-top: 1px solid var(--lab-line);
  overflow: hidden;
  position: relative;
}
.ct-final > *:not(.dec) { position: relative; z-index: 1; }
.ct-kicker {
  font-size: 0.72rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--lab-accent);
}
.ct-huge {
  display: block;
  font-family: var(--font-display);
  font-weight: 900;
  font-size: clamp(2.6rem, 11.5vw, 11rem);
  line-height: 0.86;
  letter-spacing: -0.045em;
  text-transform: uppercase;
  transform-origin: left center;
  transition: color 0.4s var(--ease);
  will-change: transform;
}
.ct-huge:hover { color: var(--lab-accent); }
.ct-arrow { display: inline-block; transition: transform 0.4s var(--ease); }
.ct-huge:hover .ct-arrow { transform: translateX(0.12em); }

.ct-baixo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  padding-top: clamp(1.5rem, 4vh, 2.5rem);
  border-top: 1px solid var(--lab-line);
}
.ct-lines {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 2.5rem;
  font-size: clamp(0.95rem, 1.6vw, 1.15rem);
}
/* o selo é o único elemento à direita aqui; abaixo de 700px ele vai pra baixo
   das linhas de contato, senão espreme o e-mail */
@media (max-width: 700px) {
  .ct-baixo { flex-direction: column; align-items: flex-start; }
}
.ct-line { transition: color 0.3s var(--ease); }
a.ct-line:hover { color: var(--lab-accent); }
.ct-mute { color: var(--lab-dim); }

.ct-foot {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1rem;
  margin-top: auto;
  padding-top: clamp(2rem, 5vh, 3rem);
  font-size: 0.74rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--lab-dim);
}
.ct-back { border-bottom: 1px solid currentColor; }
.ct-back:hover { color: var(--lab-accent); }

@media (max-width: 620px) {
  .ct-a { padding-left: 0; }
}
</style>
