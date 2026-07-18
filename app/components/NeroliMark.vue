<script setup lang="ts">
// Marca da flor de neroli — pétalas terracota, miolo ink.
// Usada no header e no footer. Escala pela CSS (width/height do pai).
const petal = 'M64 16 C 53 30, 53 52, 64 61 C 75 52, 75 30, 64 16 Z'
const angles = [0, 72, 144, 216, 288]
</script>

<template>
  <svg viewBox="0 0 128 128" class="neroli" aria-hidden="true">
    <g fill="var(--clay)">
      <path v-for="a in angles" :key="a" :d="petal" :transform="`rotate(${a} 64 64)`" />
    </g>
    <circle cx="64" cy="64" r="8" fill="var(--amber)" />
  </svg>
</template>

<style scoped>
.neroli { display: block; width: 100%; height: 100%; }
</style>
