<script setup lang="ts">
import { faqs } from '~/data/faqs'
import { waLink, email, whatsappDisplay, cidade, nomeCompleto } from '~/data/contato'

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
    <div class="ct-faq sec">
     <div class="sec-in">
      <p class="sec-rotulo">Antes de chamar</p>
      <div>
      <h2 class="sec-h2">Perguntas que sempre chegam</h2>

      <ul class="ct-rows">
        <li v-for="(f, i) in faqs" :key="f.q" class="ct-row" :class="{ 'is-open': aberta === i }">
          <button
            type="button"
            class="ct-q"
            :aria-expanded="aberta === i"
            :aria-controls="`lab-faq-${i}`"
            @click="alternar(i)"
          >
            <span class="ct-q-t">{{ f.q }}</span>
            <span class="ct-q-sign" aria-hidden="true" />
          </button>
          <div :id="`lab-faq-${i}`" class="ct-a" :hidden="aberta !== i">
            <p>{{ f.a }}</p>
          </div>
        </li>
      </ul>
      </div>
     </div>
    </div>

    <div class="ct-final claro">
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
        <span>{{ nomeCompleto }}, {{ cidade }}, {{ ano }}</span>
        <NuxtLink to="/lab" class="ct-back" rel="nofollow">Ver a versão anterior</NuxtLink>
      </footer>
    </div>
  </section>
</template>

<style scoped>
.ct { background: var(--lab-bg); color: var(--lab-fg); }

/* ---- FAQ ---- */
.ct-rows { margin-top: var(--sp-4); border-top: 1px solid var(--lab-line); }
.ct-row { border-bottom: 1px solid var(--lab-line); }
.ct-q {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: var(--sp-3);
  width: 100%;
  padding: var(--sp-3) 0;
  color: inherit;
  text-align: left;
}
.ct-q-t {
  font-family: var(--font-display);
  font-weight: var(--w-display, 500);
  font-size: var(--t-1);
  line-height: 1.25;
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

.ct-a { padding: 0 0 var(--sp-3); }
.ct-a p { max-width: 40rem; line-height: 1.62; color: var(--lab-dim); }

/* ---- finale ---- */
.ct-final {
  background: var(--lab-bg);
  color: var(--lab-fg);
  min-height: min(100svh, 48rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: var(--sp-4);
  padding: var(--sec) var(--lab-edge);
  border-top: 1px solid var(--lab-line);
  overflow: hidden;
  position: relative;
}
.ct-final > * { width: 100%; max-width: var(--lab-wrap); margin-inline: auto; }
.ct-kicker { font-size: var(--t-s); font-weight: 500; color: var(--lab-dim); }
.ct-huge {
  display: block;
  font-family: var(--font-display);
  font-weight: var(--w-display, 500);
  font-size: clamp(2.8rem, 10vw, 9rem);
  line-height: 0.95;
  letter-spacing: -0.04em;
  transform-origin: left center;
  transition: color 0.4s var(--ease);
  will-change: transform;
}
.ct-huge:hover { color: var(--lab-accent); }

.ct-baixo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--sp-4);
  padding-top: var(--sp-4);
  border-top: 1px solid var(--lab-line);
}
.ct-lines {
  display: flex;
  flex-wrap: wrap;
  gap: var(--sp-2) var(--sp-4);
  font-size: var(--t-1);
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
  margin-top: var(--sp-5);
  padding-top: var(--sp-3);
  font-size: var(--t-xs);
  color: var(--lab-dim);
}
.ct-back { border-bottom: 1px solid currentColor; }
.ct-back:hover { color: var(--lab-accent); }

</style>
