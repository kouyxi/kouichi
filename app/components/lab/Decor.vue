<script setup lang="ts">
// Camada decorativa: grade fina, marcas de registro e elementos soltos que
// respondem ao mouse em velocidades diferentes. É o que tira o fundo da
// sensação de preto chapado sem competir com o texto.
//
// As posições são fixas, nunca sorteadas: número aleatório aqui geraria
// marcação diferente no servidor e no cliente, e o Vue reclamaria de
// hidratação.
const props = withDefaults(
  defineProps<{
    /** densidade da grade */
    grade?: 'fina' | 'larga' | 'nenhuma'
    /** halo de luz atrás do conteúdo, pra o fundo não ser uma cor só */
    halo?: 'topo-dir' | 'centro-esq' | 'base-centro' | 'nenhum'
    /** marcas soltas com parallax de mouse */
    marcas?: boolean
    /** campo de retícula, ecoando o tratamento da foto do hero */
    reticula?: boolean
    /** cor base: no claro as linhas precisam ser escuras */
    tom?: 'claro' | 'escuro'
  }>(),
  { grade: 'fina', halo: 'nenhum', marcas: true, reticula: false, tom: 'escuro' }
)

// x/y em %, escala, giro, e a velocidade com que cada uma reage ao mouse
const marcas = [
  { t: 'cruz', x: 8, y: 18, s: 1, r: 0, v: 22 },
  { t: 'alvo', x: 91, y: 12, s: 1.3, r: 0, v: 38 },
  { t: 'cruz', x: 78, y: 74, s: 0.8, r: 0, v: 30 },
  // Aqui morava um círculo tracejado. Saiu: com parallax de mouse ele
  // derivava junto do ponteiro sem estar em volta dele, e lia como cursor
  // quebrado. Campo de pontos não tem como ser confundido com cursor.
  { t: 'pontos', x: 14, y: 68, s: 1.2, r: 0, v: 46 },
  { t: 'canto', x: 95, y: 46, s: 1, r: 0, v: 26 },
  { t: 'canto', x: 4, y: 88, s: 1, r: 180, v: 34 },
  { t: 'hachura', x: 66, y: 8, s: 1, r: -12, v: 42 },
  { t: 'cruz', x: 34, y: 92, s: 0.7, r: 0, v: 18 },
  { t: 'cota', x: 20, y: 40, s: 1, r: 0, v: 28 }
]

const root = ref<HTMLElement | null>(null)

onMounted(async () => {
  if (!props.marcas || !root.value) return
  if (prefersReducedMotion() || !window.matchMedia('(pointer: fine)').matches) return

  const el = root.value
  const { gsap } = await useGsap()
  const nodes = Array.from(el.querySelectorAll<HTMLElement>('.dec-marca'))
  if (!nodes.length) return

  const setters = nodes.map((n) => ({
    x: gsap.quickTo(n, 'x', { duration: 0.9, ease: 'power3' }),
    y: gsap.quickTo(n, 'y', { duration: 0.9, ease: 'power3' }),
    v: Number(n.dataset.v || 20) / 1000
  }))

  function mover(e: MouseEvent) {
    const cx = e.clientX - window.innerWidth / 2
    const cy = e.clientY - window.innerHeight / 2
    setters.forEach((s) => { s.x(cx * s.v); s.y(cy * s.v) })
  }

  window.addEventListener('mousemove', mover, { passive: true })
  onBeforeUnmount(() => window.removeEventListener('mousemove', mover))
})
</script>

<template>
  <div
    ref="root"
    class="dec"
    :class="[`tom-${tom}`, `grade-${grade}`, halo !== 'nenhum' && `halo-${halo}`]"
    aria-hidden="true"
  >
    <div v-if="grade !== 'nenhuma'" class="dec-grade" />
    <div v-if="halo !== 'nenhum'" class="dec-halo" />
    <div v-if="reticula" class="dec-reticula" />

    <template v-if="props.marcas">
      <span
        v-for="(m, i) in marcas"
        :key="i"
        class="dec-marca"
        :data-v="m.v"
        :style="{ left: m.x + '%', top: m.y + '%' }"
      >
      <span class="dec-forma" :style="{ transform: `scale(${m.s}) rotate(${m.r}deg)` }">
        <svg v-if="m.t === 'cruz'" width="14" height="14" viewBox="0 0 14 14">
          <path d="M7 0v14M0 7h14" stroke="currentColor" stroke-width="1" />
        </svg>

        <svg v-else-if="m.t === 'alvo'" width="26" height="26" viewBox="0 0 26 26">
          <circle cx="13" cy="13" r="12" fill="none" stroke="currentColor" stroke-width="1" />
          <circle cx="13" cy="13" r="5" fill="none" stroke="currentColor" stroke-width="1" />
          <path d="M13 0v6M13 20v6M0 13h6M20 13h6" stroke="currentColor" stroke-width="1" />
        </svg>

        <svg v-else-if="m.t === 'pontos'" width="52" height="52" viewBox="0 0 52 52">
          <g fill="currentColor">
            <circle v-for="p in 25" :key="p" :cx="6 + ((p - 1) % 5) * 10" :cy="6 + Math.floor((p - 1) / 5) * 10" r="1.4" />
          </g>
        </svg>

        <svg v-else-if="m.t === 'canto'" width="18" height="18" viewBox="0 0 18 18">
          <path d="M0 6V0h6" fill="none" stroke="currentColor" stroke-width="1.2" />
        </svg>

        <svg v-else-if="m.t === 'hachura'" width="34" height="34" viewBox="0 0 34 34">
          <path
            d="M0 34L34 0M8 34L34 8M0 26L26 0"
            stroke="currentColor" stroke-width="0.8" fill="none"
          />
        </svg>

        <svg v-else width="72" height="10" viewBox="0 0 72 10">
          <path d="M1 0v10M71 0v10M1 5h70" stroke="currentColor" stroke-width="1" fill="none" />
        </svg>
      </span>
      </span>
    </template>
  </div>
</template>

<style scoped>
.dec {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
}
.tom-escuro { --dec-ink: rgba(243, 234, 216, 0.5); --dec-grid: rgba(243, 234, 216, 0.055); }
.tom-claro  { --dec-ink: rgba(23, 19, 9, 0.42);   --dec-grid: rgba(23, 19, 9, 0.07); }

/* ---- grade ---- */
.dec-grade {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(var(--dec-grid) 1px, transparent 1px),
    linear-gradient(90deg, var(--dec-grid) 1px, transparent 1px);
  -webkit-mask-image: radial-gradient(ellipse 78% 68% at 50% 45%, #000 20%, transparent 82%);
  mask-image: radial-gradient(ellipse 78% 68% at 50% 45%, #000 20%, transparent 82%);
}
.grade-fina .dec-grade { background-size: 4.5vw 4.5vw; }
.grade-larga .dec-grade { background-size: 11vw 11vw; }

/* ---- halo: o fundo deixa de ser uma cor chapada ---- */
.dec-halo { position: absolute; inset: -20%; }
.halo-topo-dir .dec-halo {
  background: radial-gradient(circle at 78% 12%, rgba(220, 91, 44, 0.13), transparent 55%);
}
.halo-centro-esq .dec-halo {
  background: radial-gradient(circle at 8% 50%, rgba(111, 131, 71, 0.12), transparent 52%);
}
.halo-base-centro .dec-halo {
  background: radial-gradient(circle at 50% 96%, rgba(220, 91, 44, 0.16), transparent 58%);
}

/* ---- retícula: mesma linguagem do halftone da foto ---- */
.dec-reticula {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(var(--dec-ink) 0.9px, transparent 0.9px);
  background-size: 7px 7px;
  opacity: 0.18;
  -webkit-mask-image: radial-gradient(ellipse 55% 45% at 82% 30%, #000, transparent 72%);
  mask-image: radial-gradient(ellipse 55% 45% at 82% 30%, #000, transparent 72%);
}

/* ---- marcas soltas ---- */
.dec-marca {
  position: absolute;
  display: block;
  color: var(--dec-ink);
  opacity: 0.55;
  will-change: transform;
}
/* o GSAP é dono do transform do span externo (translação do mouse); escala e
   giro moram no span interno, senão um sobrescreve o outro */
.dec-forma { display: block; }
.dec-forma > svg { display: block; }

@media (max-width: 860px) {
  /* menos ruído em tela pequena: lá o texto já ocupa quase tudo */
  /* of-type, não child: grade/halo/retícula são divs e desalinhariam a conta */
  .dec-marca:nth-of-type(n + 5) { display: none; }
  .dec-reticula { opacity: 0.1; }
}
</style>
