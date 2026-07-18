<script setup lang="ts">
withDefaults(defineProps<{ tone?: 'terracotta' | 'olive' | 'cream' }>(), { tone: 'terracotta' })
</script>

<template>
  <svg viewBox="0 0 200 220" fill="none" xmlns="http://www.w3.org/2000/svg" :class="['organic-mark', tone]">
    <path
      d="M100 210 C 96 160, 104 120, 92 78 C 84 50, 60 34, 40 22"
      stroke="currentColor" stroke-width="2.5" stroke-linecap="round"
    />
    <path
      d="M92 78 C 108 62, 130 56, 156 40"
      stroke="currentColor" stroke-width="2.5" stroke-linecap="round"
    />
    <path
      d="M96 120 C 76 112, 58 116, 34 106"
      stroke="currentColor" stroke-width="2.5" stroke-linecap="round"
    />
    <path
      d="M40 22 C 34 12, 34 4, 42 -2 M40 22 C 48 14, 56 12, 66 14"
      stroke="currentColor" stroke-width="2.5" stroke-linecap="round"
    />
    <circle cx="156" cy="40" r="5" fill="currentColor" />
    <circle cx="34" cy="106" r="4" fill="currentColor" />
    <circle cx="100" cy="210" r="4" fill="currentColor" />
  </svg>
</template>

<style scoped>
.organic-mark { width: 100%; height: 100%; }
.organic-mark.terracotta { color: var(--terracotta); }
.organic-mark.olive { color: var(--olive-light); }
.organic-mark.cream { color: var(--cream); }
</style>
