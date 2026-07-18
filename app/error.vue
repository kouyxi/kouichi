<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()
const { waLink, waHello } = useSite()
const whatsapp = waLink(waHello)

const is404 = computed(() => props.error?.statusCode === 404)
useHead({ title: (is404.value ? '404' : 'Erro') + ' — Kouichi' })
</script>

<template>
  <div class="err">
    <div class="craft-grid err-grid" aria-hidden="true" />
    <div class="container err-inner">
      <MikanMark class="err-mark" />
      <p class="err-code">{{ error?.statusCode || 500 }}</p>
      <h1 class="err-title">
        {{ is404 ? 'Essa página saiu do ar.' : 'Algo deu errado.' }}
      </h1>
      <p class="err-sub">
        {{ is404
          ? 'O link pode estar quebrado ou a página nunca existiu — sem problema, te levo de volta.'
          : 'Um erro inesperado aconteceu. Tenta de novo ou me chama no WhatsApp.' }}
      </p>
      <div class="err-actions">
        <button class="btn btn-cta" @click="clearError({ redirect: '/' })">
          Voltar ao início
        </button>
        <a :href="whatsapp" target="_blank" rel="noopener" data-track="wa_404" class="btn btn-outline">
          <WaIcon class="wa" :size="18" />
          Falar no WhatsApp
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.err {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: var(--paper);
  color: var(--ink);
}
.err-grid { inset: 0; opacity: 0.6; }
.err-inner {
  position: relative;
  z-index: 2;
  text-align: center;
  padding-block: clamp(3rem, 8vw, 5rem);
}
.err-mark { width: clamp(3.5rem, 9vw, 5rem); height: clamp(3.5rem, 9vw, 5rem); margin: 0 auto 1.5rem; }
.err-code {
  font-family: var(--font-display);
  font-weight: 900;
  font-size: clamp(4rem, 16vw, 9rem);
  line-height: 0.9;
  color: var(--clay);
  letter-spacing: -0.03em;
}
.err-title {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: clamp(1.6rem, 5vw, 2.75rem);
  margin-top: 0.5rem;
}
.err-sub {
  max-width: 34rem;
  margin: 1.1rem auto 0;
  opacity: 0.8;
  line-height: 1.55;
}
.err-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  margin-top: 2.25rem;
}
</style>
