<script setup lang="ts">
const { waLink, waHello } = useSite()
const whatsapp = waLink(waHello)
</script>

<template>
  <a
    :href="whatsapp"
    target="_blank"
    rel="noopener"
    data-track="wa_fab"
    class="wa-fab"
    aria-label="Falar no WhatsApp"
  >
    <svg viewBox="0 0 32 32" fill="currentColor" width="26" height="26">
      <path d="M16.02 3C9.4 3 4 8.4 4 15.02c0 2.36.66 4.55 1.8 6.43L4 29l7.73-1.75a12.94 12.94 0 0 0 4.29.74c6.62 0 12.02-5.4 12.02-12.02C28.04 8.4 22.64 3 16.02 3zm0 21.9c-1.37 0-2.7-.32-3.9-.94l-.28-.15-4.6 1.04 1.06-4.48-.18-.29a9.87 9.87 0 0 1-1.5-5.16c0-5.46 4.44-9.9 9.9-9.9 5.46 0 9.9 4.44 9.9 9.9 0 5.46-4.44 9.9-9.9 9.9zm5.42-7.42c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.24-.46-2.36-1.46-.87-.78-1.46-1.74-1.63-2.04-.17-.3-.02-.46.13-.6.13-.13.3-.35.44-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.87 1.22 3.07c.15.2 2.1 3.2 5.09 4.49.71.31 1.27.49 1.7.62.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35z"/>
    </svg>
  </a>
</template>

<style scoped>
.wa-fab {
  position: fixed;
  right: 1.25rem;
  bottom: 1.25rem;
  z-index: 50;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #25D366;
  color: #0b1a10;
  box-shadow: 0 10px 30px rgba(0,0,0,0.35);
  transition: transform 0.15s ease;
}
.wa-fab:hover { transform: scale(1.06); }
</style>
