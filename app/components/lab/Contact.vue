<script setup lang="ts">
import { faqs } from '~/data/faqs'
import { waLink, email, whatsappDisplay, cidade, nomeCompleto } from '~/data/contato'

const whatsapp = waLink('Oi, Kouichi! Vi seu site e queria um orçamento. Meu negócio é ')
const aberta = ref<number | null>(0)
const ano = new Date().getFullYear()

function alternar(i: number) {
  aberta.value = aberta.value === i ? null : i
}
</script>

<template>
  <section id="contato" class="ct">
    <div id="faq" class="ct-faq sec">
     <div class="sec-in">
      <p class="sec-rotulo">Dúvidas</p>
      <div>
      <h2 class="sec-h2">O que todo mundo pergunta.</h2>

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
          <!-- grid-template-rows 0fr → 1fr: a resposta abre deslizando, sem
               medir altura em JS. Responde ao toque da pessoa, não ao scroll. -->
          <div :id="`lab-faq-${i}`" class="ct-a" :aria-hidden="aberta !== i" :inert="aberta !== i">
            <div class="ct-a-in"><p>{{ f.a }}</p></div>
          </div>
        </li>
      </ul>
      </div>
     </div>
    </div>

    <div class="ct-final claro">
      <p class="ct-kicker">Sem compromisso. Respondo no mesmo dia.</p>
      <a
        :href="whatsapp"
        target="_blank"
        rel="noopener"
        data-track="wa_final"
        class="ct-huge"
      >
        Me chama no WhatsApp
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

      <!-- Rodapé como etiqueta costurada na peça: quem fez, onde, quando.
           Borda fina, texto pequeno, nada além do que uma etiqueta diz. -->
      <footer class="ct-foot">
        <dl class="ct-tag">
          <div class="ct-tag-kana"><span class="kana" lang="ja">コウイチ</span></div>
          <div><dt>Feito por</dt><dd>{{ nomeCompleto }}</dd></div>
          <div><dt>Em</dt><dd>{{ cidade }}</dd></div>
          <div><dt>Ano</dt><dd>{{ ano }}</dd></div>
        </dl>
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

.ct-a {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.35s var(--ease);
}
.ct-row.is-open .ct-a { grid-template-rows: 1fr; }
.ct-a-in { overflow: hidden; }
.ct-a p { max-width: 40rem; padding-bottom: var(--sp-3); line-height: 1.62; color: var(--lab-dim); }
@media (prefers-reduced-motion: reduce) { .ct-a { transition: none; } }

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
  /* clip, não hidden: hidden vira contêiner de rolagem e a animação de
     visão do convite passava a seguir ele, que nunca rola */
  overflow: clip;
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
}
.ct-huge:hover { color: var(--lab-accent); }
/* O convite cresce enquanto sobe: o último gesto da página é a chamada
   ficando grande demais pra ser ignorada. Ligado à rolagem, sem JS. */
@media (prefers-reduced-motion: no-preference) {
  @supports (animation-timeline: view()) {
    .ct-huge { animation: ctCresce linear both; animation-timeline: view(); animation-range: entry 0% cover 45%; }
  }
}
@keyframes ctCresce { from { transform: translateY(8%) scale(0.82); } }

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

.ct-foot { margin-top: var(--sp-5); font-size: var(--t-xs); }
.ct-tag {
  display: inline-block;
  margin: 0;
  padding: 0.85rem 1rem;
  border: 1px solid var(--lab-line-2);
  color: var(--lab-dim);
}
.ct-tag > div { display: flex; gap: 1rem; margin-top: 0.35rem; }
.ct-tag-kana { padding-bottom: 0.4rem; margin-top: 0 !important; border-bottom: 1px solid var(--lab-line); }
.ct-tag dt { flex: none; width: 4.5rem; margin: 0; }
.ct-tag dd { margin: 0; color: var(--lab-fg); }

</style>
