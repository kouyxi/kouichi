<script setup lang="ts">
const scale = ref(0)
let raf = 0
let reduce = false

function onScroll() {
  cancelAnimationFrame(raf)
  raf = requestAnimationFrame(() => {
    const h = document.documentElement.scrollHeight - window.innerHeight
    scale.value = h > 0 ? Math.min(window.scrollY / h, 1) : 0
  })
}

onMounted(() => {
  reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
  cancelAnimationFrame(raf)
})
</script>

<template>
  <div class="progress" aria-hidden="true">
    <div class="progress-bar" :style="{ transform: `scaleX(${scale})` }" />
  </div>
</template>

<style scoped>
.progress {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  z-index: 60;
  pointer-events: none;
  background: transparent;
}
.progress-bar {
  height: 100%;
  background: var(--clay);
  transform-origin: left;
  transform: scaleX(0);
  will-change: transform;
}
</style>
