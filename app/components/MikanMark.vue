<script setup lang="ts">
// Marca: mikan (laranja japonesa), neo-brutalista — contorno grosso, gloss,
// folha oliva e hard-shadow leve. A cor da sombra vem de --mark-shadow
// (ink por padrão; o footer sobrescreve pra creme, senão sumiria no escuro).
const leaf = 'M60 47 C 63 34, 79 24, 91 28 C 86 41, 73 49, 60 47 Z'
</script>

<template>
  <svg viewBox="0 0 128 128" class="mikan" aria-hidden="true">
    <g class="mk-shadow" transform="translate(3 3)">
      <ellipse cx="60" cy="74" rx="38" ry="34" />
      <path :d="leaf" />
    </g>
    <ellipse cx="60" cy="74" rx="38" ry="34" fill="var(--clay)" stroke="var(--ink)" stroke-width="5" />
    <ellipse cx="46" cy="61" rx="9" ry="5.5" fill="#F6EFDF" transform="rotate(-32 46 61)" />
    <path :d="leaf" fill="var(--moss-lit, #6F8347)" stroke="var(--ink)" stroke-width="4" />
    <path d="M63 45 L84 31" stroke="var(--ink)" stroke-width="2" fill="none" stroke-linecap="round" />
    <circle cx="56" cy="46" r="3.6" fill="var(--ink)" />
  </svg>
</template>

<style scoped>
.mikan { display: block; width: 100%; height: 100%; }
.mk-shadow {
  fill: var(--mark-shadow, #171309);
  stroke: var(--mark-shadow, #171309);
  stroke-width: 5;
}
</style>
