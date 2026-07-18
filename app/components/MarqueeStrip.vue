<script setup lang="ts">
const items = [
  'Landing pages',
  'Design de conversão',
  'Sites institucionais',
  'SEO técnico',
  'UX aplicado a vendas',
  'Goiânia & região'
]
</script>

<template>
  <div class="marquee-band">
    <div class="marquee-track">
      <div v-for="n in 2" :key="n" class="marquee-group" aria-hidden="true">
        <span v-for="item in items" :key="item + n" class="marquee-item">
          {{ item }}
          <span class="star">✳</span>
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.marquee-band {
  background: var(--clay);
  color: var(--ink);
  overflow: hidden;
  border-block: 2px solid var(--ink);
  padding-block: 1.05rem;
}
.marquee-track {
  display: flex;
  width: max-content;
  animation: marquee 32s linear infinite;
}
.marquee-group { display: flex; }
.marquee-item {
  display: inline-flex;
  align-items: center;
  gap: 1.75rem;
  padding-inline: 1.75rem;
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 500;
  font-size: clamp(1.35rem, 2.6vw, 2.1rem);
  white-space: nowrap;
}
.star {
  font-family: var(--font-body);
  font-style: normal;
  font-size: 0.7em;
  opacity: 0.6;
}
.marquee-band:hover .marquee-track { animation-play-state: paused; }

@media (prefers-reduced-motion: reduce) {
  .marquee-track { animation: none; }
}
</style>
