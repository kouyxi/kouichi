<script setup lang="ts">
import { waLink } from '~/data/contato'

// Mesma oferta da home, sem preço. Só o texto foi encurtado pro formato
// de painel: aqui cada card ocupa quase a tela toda e não aguenta parágrafo.
const pacotes = [
  {
    n: '01',
    nome: 'Uma página',
    para: 'Você vende um serviço só e precisa de um caminho curto até o WhatsApp.',
    itens: ['1 página, rápida no celular', 'Texto escrito pra gerar contato', 'Botão de WhatsApp sempre à vista', 'Publicado, com 2 rodadas de ajuste'],
    prazo: '5 a 7 dias úteis',
    wa: 'Oi, Kouichi! Queria um site de uma página. Meu negócio é '
  },
  {
    n: '02',
    nome: 'Institucional',
    para: 'Clínica, escritório e consultório, onde o cliente pesquisa bastante antes de escolher.',
    itens: ['Uma seção pra cada dúvida do cliente', 'Lugar pra depoimento e foto do seu trabalho', 'SEO técnico pra achar no Google', 'Publicado, com 2 rodadas de ajuste'],
    prazo: '7 a 10 dias úteis',
    wa: 'Oi, Kouichi! Queria um site institucional. Meu negócio é '
  },
  {
    n: '03',
    nome: 'Completo',
    para: 'Você tem vários serviços, mais páginas e quer medir de onde vem cada contato.',
    itens: ['Uma página pra cada serviço', 'Formulário, agenda ou o que seu negócio já usa', 'Você vê de onde veio cada contato', 'Publicado, com 2 rodadas de ajuste'],
    prazo: '10 a 15 dias úteis',
    wa: 'Oi, Kouichi! Queria um site completo. Meu negócio é '
  }
]

const root = ref<HTMLElement | null>(null)
const progresso = ref(0)

onMounted(async () => {
  if (!root.value) return
  const el = root.value
  // Abaixo de 860px o pin horizontal briga com o scroll do dedo: vira
  // uma lista vertical normal, que no celular funciona melhor mesmo.
  if (prefersReducedMotion() || window.innerWidth < 860) {
    el.classList.add('is-stacked')
    return
  }

  const { gsap } = await useGsap()
  const ctx = gsap.context(() => {
    const track = el.querySelector('.sv-track') as HTMLElement
    if (!track) return

    const distancia = () => track.scrollWidth - window.innerWidth

    const horizontal = gsap.to(track, {
      x: () => -distancia(),
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        pin: true,
        scrub: 0.8,
        // a altura da rolagem vira a largura do trilho: 1px pra baixo = 1px pro lado
        end: () => '+=' + distancia(),
        invalidateOnRefresh: true,
        onUpdate: (self: any) => { progresso.value = self.progress }
      }
    })

    // cada painel entra com a numeração e o conteúdo levemente atrasados
    gsap.utils.toArray<HTMLElement>('.sv-card').forEach((card) => {
      gsap.from(card.querySelectorAll('.sv-stagger'), {
        opacity: 0,
        y: 26,
        duration: 0.6,
        stagger: 0.07,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          containerAnimation: horizontal,
          start: 'left 78%',
          once: true
        }
      })
    })
  }, el)

  onBeforeUnmount(() => ctx.revert())
})
</script>

<template>
  <section id="servicos" ref="root" class="sv">
    <LabDecor grade="larga" halo="centro-esq" />
    <div class="sv-track">
      <header class="sv-panel sv-intro">
        <span class="lab-index">(02)</span>
        <h2 class="sv-title">
          Três<br>tamanhos<br><em>de site.</em>
        </h2>
        <p class="sv-note">
          Trabalho melhor com quem vive de cliente novo chegando.
          Se um cliente perdido dói no seu caixa, a gente se entende rápido.
        </p>
        <span class="sv-hint">Role para o lado</span>
      </header>

      <article v-for="p in pacotes" :key="p.n" class="sv-panel sv-card">
        <span class="sv-n sv-stagger">{{ p.n }}</span>
        <h3 class="sv-nome sv-stagger">{{ p.nome }}</h3>
        <p class="sv-para sv-stagger">{{ p.para }}</p>
        <ul class="sv-itens">
          <li v-for="i in p.itens" :key="i" class="sv-stagger">{{ i }}</li>
        </ul>
        <div class="sv-foot sv-stagger">
          <span class="sv-prazo">{{ p.prazo }}</span>
          <a
            :href="waLink(p.wa)"
            target="_blank"
            rel="noopener"
            :data-track="`wa_lab_${p.nome.toLowerCase().replace(/\s+/g, '_')}`"
            class="sv-cta"
            data-cursor="grow"
          >
            Quero esse
            <span class="sv-arrow">→</span>
          </a>
        </div>
      </article>
    </div>

    <div class="sv-bar" aria-hidden="true">
      <span class="sv-bar-fill" :style="{ transform: `scaleX(${progresso})` }" />
    </div>
  </section>
</template>

<style scoped>
.sv { position: relative; overflow: hidden; background: var(--lab-bg); }
.sv-track {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: stretch;
  height: 100svh;
  width: max-content;
  will-change: transform;
}

.sv-panel {
  position: relative;
  flex: 0 0 auto;
  width: min(86vw, 34rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  padding: clamp(2.5rem, 6vh, 4.5rem) clamp(1.75rem, 4vw, 3.25rem);
  border-right: 1px solid var(--lab-line);
}

/* painel de abertura: tipografia grande, sem card */
.sv-intro { width: min(92vw, 42rem); justify-content: center; }
.sv-title {
  font-family: var(--font-display);
  font-weight: 900;
  font-size: clamp(2.8rem, 7.5vw, 6rem);
  line-height: 0.88;
  letter-spacing: -0.035em;
  text-transform: uppercase;
  color: var(--lab-fg);
}
.sv-title em { font-style: italic; color: var(--lab-accent); }
.sv-note { max-width: 24rem; color: var(--lab-dim); line-height: 1.55; }
.sv-hint {
  margin-top: 1.5rem;
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--lab-accent);
}

/* espalhado, não centralizado: o número ancora no topo e o CTA no pé, então
   o painel fica emoldurado em vez de flutuar num vazio no meio da tela */
.sv-card { justify-content: flex-start; }
.sv-card .sv-itens { margin-top: auto; padding-top: 2rem; }
.sv-n {
  font-family: var(--font-display);
  font-weight: 900;
  font-size: clamp(4rem, 11vw, 9rem);
  line-height: 0.8;
  letter-spacing: -0.05em;
  color: transparent;
  -webkit-text-stroke: 1px var(--lab-line-2);
}
.sv-nome {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: clamp(1.75rem, 3.4vw, 2.6rem);
  line-height: 1;
  letter-spacing: -0.02em;
  color: var(--lab-fg);
}
.sv-para { max-width: 26rem; color: var(--lab-dim); line-height: 1.55; font-size: 0.95rem; }
.sv-itens { display: grid; gap: 0.55rem; margin-top: 0.5rem; }
.sv-itens li {
  display: flex;
  gap: 0.7rem;
  font-size: 0.9rem;
  color: var(--lab-fg);
  opacity: 0.86;
}
.sv-itens li::before { content: '—'; color: var(--lab-accent); }

.sv-foot {
  display: flex;
  align-items: center;
  /* alinhado à esquerda de propósito: encostado na direita do painel, o CTA
     ficava embaixo do botão flutuante de WhatsApp no painel da ponta */
  justify-content: flex-start;
  gap: 2rem;
  margin-top: 1.5rem;
  padding-top: 1.1rem;
  border-top: 1px solid var(--lab-line);
}
.sv-prazo { font-size: 0.78rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--lab-dim); }
.sv-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  font-size: 0.92rem;
  color: var(--lab-accent);
}
.sv-arrow { transition: transform 0.3s var(--ease); }
.sv-cta:hover .sv-arrow { transform: translateX(5px); }

/* barra de progresso do trecho horizontal */
.sv-bar {
  position: absolute;
  left: 0; right: 0; bottom: 0;
  height: 2px;
  background: var(--lab-line);
}
.sv-bar-fill {
  display: block;
  height: 100%;
  background: var(--lab-accent);
  transform-origin: left;
  transform: scaleX(0);
}

/* fallback: sem pin, vira uma pilha vertical comum */
.sv.is-stacked { overflow: visible; }
.sv.is-stacked .sv-track {
  flex-direction: column;
  width: 100%;
  height: auto;
}
.sv.is-stacked .sv-panel {
  width: 100%;
  border-right: none;
  border-bottom: 1px solid var(--lab-line);
  min-height: auto;
  padding-block: clamp(2.5rem, 8vw, 4rem);
}
.sv.is-stacked .sv-bar { display: none; }
</style>
