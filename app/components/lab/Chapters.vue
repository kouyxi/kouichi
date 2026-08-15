<script setup lang="ts">
// Índice fixo: mostra em que capítulo você está e serve de navegação.
// Numa página que rola muito e quebra o layout o tempo todo, é o que
// impede a pessoa de se perder.
const capitulos = [
  { id: 'topo', n: '01', nome: 'Início' },
  { id: 'servicos', n: '02', nome: 'Serviços' },
  { id: 'processo', n: '03', nome: 'Processo' },
  { id: 'portfolio', n: '04', nome: 'Projetos' },
  { id: 'sobre', n: '05', nome: 'Sobre' },
  { id: 'contato', n: '06', nome: 'Contato' }
]

const atual = ref(0)

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
  <nav class="ch" aria-label="Capítulos">
    <ul>
      <li v-for="(c, i) in capitulos" :key="c.id">
        <a
          :href="`#${c.id}`"
          class="ch-link"
          :class="{ 'is-atual': atual === i }"
          :aria-current="atual === i ? 'true' : undefined"
        >
          <span class="ch-n">{{ c.n }}</span>
          <span class="ch-nome">{{ c.nome }}</span>
          <span class="ch-rule" aria-hidden="true" />
        </a>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.ch {
  position: fixed;
  z-index: 60;
  top: 50%;
  right: clamp(0.75rem, 2vw, 1.75rem);
  transform: translateY(-50%);
  mix-blend-mode: difference;
}
.ch ul { display: grid; gap: 0.7rem; }
.ch-link {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.6rem;
  font-size: 0.66rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #F3EAD8;
  opacity: 0.62;
  transition: opacity 0.35s var(--ease);
}
.ch-link:hover, .ch-link.is-atual { opacity: 1; }
.ch-n { font-variant-numeric: tabular-nums; }
.ch-nome {
  max-width: 0;
  overflow: hidden;
  white-space: nowrap;
  opacity: 0;
  transition: max-width 0.4s var(--ease), opacity 0.3s var(--ease);
}
.ch-link:hover .ch-nome, .ch-link.is-atual .ch-nome { max-width: 7rem; opacity: 1; }
.ch-rule {
  width: 1.4rem;
  height: 1px;
  background: currentColor;
  transition: width 0.35s var(--ease);
}
.ch-link.is-atual .ch-rule { width: 2.6rem; }

@media (max-width: 860px) { .ch { display: none; } }
</style>
