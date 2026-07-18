<template>
  <svg viewBox="0 0 400 480" fill="none" xmlns="http://www.w3.org/2000/svg" class="blueprint" aria-hidden="true">
    <circle cx="200" cy="200" r="150" stroke="currentColor" stroke-width="0.75" stroke-dasharray="2 6" opacity="0.6" />
    <circle cx="200" cy="200" r="96" stroke="currentColor" stroke-width="0.75" opacity="0.4" />
    <path d="M200 50 A150 150 0 0 1 350 200" stroke="currentColor" stroke-width="1" opacity="0.8" />

    <line x1="20" y1="200" x2="380" y2="200" stroke="currentColor" stroke-width="0.5" opacity="0.35" />
    <line x1="200" y1="20" x2="200" y2="460" stroke="currentColor" stroke-width="0.5" opacity="0.35" />

    <g opacity="0.85">
      <path d="M14 60 h18 M14 60 v18" stroke="currentColor" stroke-width="1" />
      <path d="M386 420 h-18 M386 420 v18" stroke="currentColor" stroke-width="1" />
    </g>

    <g font-family="Inter, sans-serif" font-size="9" letter-spacing="0.08em" fill="currentColor" opacity="0.7">
      <text x="26" y="52">N.01</text>
      <text x="304" y="440">φ 1.618</text>
      <text x="212" y="466">KOUICHI — TRAÇADO</text>
    </g>

    <path d="M60 300 Q 40 340 70 380 Q 100 410 90 450" stroke="currentColor" stroke-width="1.25" opacity="0.75" />
    <circle cx="90" cy="450" r="3" fill="currentColor" opacity="0.75" />
  </svg>
</template>

<style scoped>
.blueprint {
  width: 100%;
  height: 100%;
  color: var(--paper);
}
</style>
