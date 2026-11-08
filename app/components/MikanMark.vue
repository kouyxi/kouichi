<script setup lang="ts">
// Marca: a mikan (laranja japonesa) em silhueta. O corpo achatado, mais largo
// que alto, é o que separa ela de uma laranja qualquer. Duas cores: o corpo na
// cor da marca (--clay) e o cabinho e a folha na cor do texto (currentColor),
// então a folha acompanha o fundo sozinha. Sem contorno nem brilho, lê inteira
// até em 16 px. A mesma forma está em public/favicon.svg.
//
// O tamanho vem de quem usa. Com width/height aqui, o CSS deste componente
// disputava com o do pai e, conforme a ordem em que chegava, a marca nascia
// gigante antes do JS.
</script>

<template>
  <svg viewBox="0 0 64 64" class="mikan" aria-hidden="true">
    <path d="M32 18C46.9 18 56 25.8 56 38.5S46.9 59 32 59 8 51.2 8 38.5 17.1 18 32 18Z" fill="var(--clay, #E8631F)" />
    <path d="M28 19.6C28.6 15.9 35.4 15.9 36 19.6Z" fill="currentColor" />
    <path d="M33.5 17C35.5 10 43 5 51 5.5 49 12.5 42 17.5 33.5 17Z" fill="currentColor" />
  </svg>
</template>

<style scoped>
.mikan { display: block; }
</style>
