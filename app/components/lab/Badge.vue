<script setup lang="ts">
import { waLink, disponibilidade } from '~/data/contato'

// Selo giratório. É ornamento, mas não só: carrega escassez real ("2 vagas")
// no ponto de decisão. Perda pesa mais que ganho equivalente, então o
// contador de vagas trabalha mais que qualquer adjetivo aqui.
const whatsapp = waLink('Oi, Kouichi! Vi que tem vaga esse mês. Meu negócio é ')

// Sem o "FALE COMIGO" que existia aqui: 48 letras não cabiam na volta e as
// largas se sobrepunham. O ícone de WhatsApp no miolo já diz isso.
const texto = `${disponibilidade.toUpperCase()} • `
const letras = texto.split('')
const passo = 360 / letras.length
</script>

<template>
  <a
    :href="whatsapp"
    target="_blank"
    rel="noopener"
    data-track="wa_lab_selo"
    class="selo"
    data-cursor="grow"
    :aria-label="`${disponibilidade}. Falar no WhatsApp`"
  >
    <span class="selo-anel" aria-hidden="true">
      <span
        v-for="(c, i) in letras"
        :key="i"
        class="selo-letra"
        :style="{ transform: `rotate(${i * passo}deg) translateY(-5.6em)` }"
      >{{ c }}</span>
    </span>
    <span class="selo-miolo" aria-hidden="true">
      <WaIcon :size="22" />
    </span>
  </a>
</template>

<style scoped>
.selo {
  position: relative;
  display: grid;
  place-items: center;
  width: 11.5rem;
  height: 11.5rem;
  flex: none;
  color: var(--lab-fg);
}

.selo-anel {
  position: absolute;
  inset: 0;
  font-family: var(--font-body);
  font-size: 0.64rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  animation: seloGira 22s linear infinite;
}
.selo-letra {
  position: absolute;
  top: 50%;
  left: 50%;
  /* As margens negativas põem o CENTRO da caixa da letra no centro do selo.
     O transform-origin fica no padrão (o centro da caixa), então rotate +
     translateY descrevem um círculo em volta do miolo. Com origin em 0 0 o
     eixo cai no canto superior esquerdo da letra e o anel inteiro nasce
     deslocado meio em pra cima e pra esquerda, que era o defeito. */
  margin: -0.5em 0 0 -0.5em;
  width: 1em;
  height: 1em;
  text-align: center;
}

.selo-miolo {
  display: grid;
  place-items: center;
  width: 4.4rem;
  height: 4.4rem;
  border-radius: 999px;
  background: var(--lab-accent);
  color: var(--lab-bg);
  transition: transform 0.35s var(--ease);
}
.selo:hover .selo-miolo { transform: scale(1.1); }
.selo:hover .selo-anel { animation-duration: 8s; }

@keyframes seloGira {
  to { transform: rotate(360deg); }
}

@media (prefers-reduced-motion: reduce) {
  .selo-anel { animation: none; }
}
</style>
