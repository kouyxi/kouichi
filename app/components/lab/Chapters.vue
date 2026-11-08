<script setup lang="ts">
// Índice fixo: mostra em que capítulo você está e serve de navegação.
// Numa página que rola muito e quebra o layout o tempo todo, é o que
// impede a pessoa de se perder.
//
// A forma é a marca: uma mikan cortada, um gomo por capítulo, que vai
// enchendo conforme você desce. Antes era uma coluna de "01 02 03" com
// filetes — o índice vertical numerado que toda landing escura tem. A
// fruta faz o mesmo trabalho (onde estou, quanto falta), só que é a única
// coisa na página que não caberia em nenhum outro site.
// `claro`: o capítulo é em creme, e o índice inverte as cores pra não virar
// um disco escuro flutuando no papel.
const capitulos = [
  { id: 'topo', nome: 'Início', claro: true },
  { id: 'servicos', nome: 'Serviços' },
  { id: 'processo', nome: 'Processo' },
  { id: 'sobre', nome: 'Sobre' },
  { id: 'contato', nome: 'Contato', claro: true }
]

// Geometria dos gomos. Fatia de 60° a partir do topo, com 5° de folga de cada
// lado: essa folga é a membrana branca da fruta, e é ela que faz ler como
// gomo em vez de gráfico de pizza. Os gomos convergem no centro — com um furo
// no meio virava eixo de roda.
const RE = 17.5
const ponto = (grau: number) => {
  const r = ((grau - 90) * Math.PI) / 180
  return `${(30 + RE * Math.cos(r)).toFixed(2)} ${(30 + RE * Math.sin(r)).toFixed(2)}`
}
const FATIA = 360 / capitulos.length
const gomos = capitulos.map((_, i) =>
  `M 30 30 L ${ponto(i * FATIA + 6)} A ${RE} ${RE} 0 0 1 ${ponto((i + 1) * FATIA - 6)} Z`
)

const atual = ref(0)
const sobre = ref<number | null>(null)
// Só no gomo apontado. Fixo pro capítulo atual, o rótulo sentava em cima da
// foto do topo — e a fruta já diz onde você está sem precisar do nome.
const rotulo = computed(() => (sobre.value === null ? '' : capitulos[sobre.value]?.nome ?? ''))

onMounted(() => {
  const secoes = capitulos
    .map((c) => document.getElementById(c.id))
    .filter(Boolean) as HTMLElement[]
  if (!secoes.length) return

  // IntersectionObserver em vez de ScrollTrigger: isso precisa funcionar
  // mesmo com prefers-reduced-motion, quando o GSAP nem carrega.
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return
        const i = secoes.indexOf(e.target as HTMLElement)
        if (i >= 0) atual.value = i
      })
    },
    { rootMargin: '-45% 0px -45% 0px' }
  )
  secoes.forEach((s) => io.observe(s))
  onBeforeUnmount(() => io.disconnect())
})
</script>

<template>
  <nav class="ch" :class="{ claro: capitulos[atual]?.claro }" aria-label="Capítulos" @mouseleave="sobre = null">
    <span class="ch-rotulo" aria-hidden="true">{{ rotulo }}</span>

    <!-- sem role="presentation": o svg contém os links dos capítulos, e
         marcá-lo como decorativo esconderia navegação de quem usa leitor -->
    <svg class="ch-fruta" viewBox="0 0 60 60">
      <!-- disco escuro: o índice cruza a foto do topo e o print do portfólio,
           e sem um chão próprio ele some em cima das imagens claras -->
      <circle class="ch-chao" cx="30" cy="30" r="27" />

      <a
        v-for="(c, i) in capitulos"
        :key="c.id"
        :href="`#${c.id}`"
        :aria-label="c.nome"
        :aria-current="atual === i ? 'true' : undefined"
        class="ch-gomo"
        :class="{ 'e-feito': i <= atual, 'e-atual': i === atual }"
        @mouseenter="sobre = i"
        @focus="sobre = i"
        @blur="sobre = null"
      >
        <path :d="gomos[i]" />
      </a>

      <circle class="ch-casca" cx="30" cy="30" r="23.5" />
    </svg>
  </nav>
</template>

<style scoped>
.ch {
  position: fixed;
  z-index: 60;
  top: 50%;
  right: clamp(0.75rem, 2vw, 1.75rem);
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.ch-rotulo {
  font-size: 0.66rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  white-space: nowrap;
  color: var(--lab-fg);
  opacity: 0.62;
}

.ch-fruta {
  width: clamp(3rem, 4.5vw, 3.6rem);
  height: auto;
  overflow: visible;
}

.ch-chao { fill: var(--lab-bg); opacity: 0.7; }
.ch-casca {
  fill: none;
  stroke: var(--lab-line-2);
  stroke-width: 1;
}

/* Sem contorno nos gomos: o que os separa é a membrana em negativo. Com
   traço, as seis linhas convergindo no centro viravam raios de roda e a
   coisa toda lia como leme de navio. */
.ch-gomo path {
  fill: var(--lab-accent);
  fill-opacity: 0.1;
  transition: fill-opacity 0.45s var(--ease);
}
/* enche o que já foi lido: a fruta se completa até o contato */
.ch-gomo.e-feito path { fill-opacity: 0.38; }
.ch-gomo.e-atual path { fill-opacity: 1; }
.ch-gomo:hover path { fill-opacity: 0.7; }

.ch-gomo { cursor: pointer; }
.ch-gomo:focus-visible {
  outline: 2px solid var(--lab-accent);
  outline-offset: 3px;
}

@media (prefers-reduced-motion: reduce) {
  .ch-gomo path { transition: none; }
}

@media (max-width: 860px) { .ch { display: none; } }
</style>
