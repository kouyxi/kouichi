<script setup lang="ts">
import { waLink } from '~/data/contato'

// Dois tamanhos, só o primeiro com preço: é o único número que existe.
// O segundo tem o mesmo peso e botão próprio, porque oferta sozinha faz a
// pessoa sair pra comparar (Mochon 2013; Evangelidis et al. 2023). O
// "depois" usa o menor valor, que é a referência plausível (Krishna et al.
// 2002), e o limite é regra fixa: contador esquecido vira mentira.
// O que vale pros dois ("publicado, 2 rodadas") fica numa linha embaixo.
const tamanhos = [
  {
    id: 'ate_5_paginas',
    nome: 'Até 5 páginas',
    para: 'Um serviço ou poucos. Um caminho curto até o WhatsApp.',
    prazo: '5 a 10 dias úteis',
    valor: 'R$ 600',
    nota: 'Preço de começo, até o 5º cliente. Depois, a partir de R$ 900.',
    wa: 'Oi, Kouichi! Queria um site de até 5 páginas. Meu negócio é '
  },
  {
    id: 'mais_de_5_paginas',
    nome: 'Mais de 5 páginas',
    para: 'Vários serviços, várias páginas. Você vê de onde vem cada contato.',
    prazo: '10 a 15 dias úteis',
    nota: 'Valor na primeira conversa.',
    wa: 'Oi, Kouichi! Queria um site com mais de 5 páginas. Meu negócio é '
  }
]

const waInvadido = waLink('Oi, Kouichi! Queria o diagnóstico grátis do meu site. O endereço é ')
</script>

<template>
  <section id="servicos" class="sv sec">
   <div class="sec-in">
    <p class="sec-rotulo">Serviços</p>

    <div class="sv-grid">
      <article class="sv-bloco">
        <h2 class="sec-h3">Site novo</h2>
        <p class="sv-p">Pra quem vive de cliente novo chegando.</p>

        <ul class="sv-lista">
          <li v-for="t in tamanhos" :key="t.id" class="sv-item">
            <div class="sv-item-cab">
              <h4 class="sv-nome">{{ t.nome }}</h4>
              <span class="sv-prazo">{{ t.prazo }}</span>
            </div>
            <p class="sv-para">{{ t.para }}</p>
            <p class="sv-preco">
              <strong v-if="t.valor" class="sv-valor">{{ t.valor }}</strong>
              <span class="sv-nota">{{ t.nota }}</span>
            </p>
            <a
              :href="waLink(t.wa)"
              target="_blank"
              rel="noopener"
              :data-track="`wa_plano_${t.id}`"
              class="sv-link"
            >Quero esse</a>
          </li>
        </ul>

        <p class="sv-comum">
          Tudo publicado, rápido no celular, WhatsApp à vista. Duas rodadas de ajuste
          inclusas. Domínio próprio, se quiser, é à parte.
        </p>
      </article>

      <!-- Segundo serviço. Sem medo, sem pressa, sem nome de casa de aposta:
           o dono chega aqui desconfiado, e o que convence é o passo a passo
           e a regra de pagar depois de conferir. -->
      <article id="site-invadido" class="sv-bloco sv-invadido">
        <h2 class="sec-h3">Limpeza de site invadido</h2>
        <p class="sv-p">
          Seu site apareceu no Google com páginas de aposta que você nunca criou?
          É invasão. Acontece com clínica, escritório e loja, e o dono costuma ser
          o último a saber.
        </p>
        <p class="sv-p">
          Confira você mesmo: pesquise no Google
          <code class="sv-code">site:seudominio.com.br aposta</code>.
        </p>
        <!-- O primeiro passo de quem só desconfia, sem custo. "Sem acesso"
             porque é feito só com o que aparece no Google: o bloco promete
             autorização por escrito antes de qualquer acesso. -->
        <p class="sv-p">
          <strong class="sv-forte">Diagnóstico grátis, sem acesso ao site:</strong>
          te mando o que achei e o passo a passo pra resolver sozinho, se quiser.
        </p>

        <ul class="sv-passos">
          <li>Backup antes de tudo</li>
          <li>Limpeza</li>
          <li>Troca de senhas</li>
          <li>Atualização do que estava aberto</li>
          <li>Pedido de revisão ao Google</li>
          <li>Relatório escrito do que encontrei</li>
        </ul>

        <!-- Preço com o que ele cobre do lado: preço publicado obriga. O
             "conferir" fica definido porque a busca site: leva dias pra
             limpar, e sem critério o dono confere por ela e não paga. -->
        <p class="sv-preco">
          <strong class="sv-valor">R$ 300</strong>
          <span class="sv-nota">Por site WordPress. Preço de começo, até a 5ª limpeza. Depois, R$ 450.</span>
        </p>
        <p class="sv-excecao">
          Loja virtual, mais de um site ou invasão que vem da hospedagem: eu aviso o valor antes de seguir.
        </p>

        <p class="sv-regra">
          Autorização por escrito antes de qualquer acesso. Você paga depois de
          conferir duas coisas: as páginas de aposta dando "página não encontrada"
          e o teste ao vivo do Google mostrando o site limpo. Se voltar em até
          90 dias, eu limpo de novo sem custo.
        </p>

        <a
          :href="waInvadido"
          target="_blank"
          rel="noopener"
          data-track="wa_invadido"
          class="sv-cta"
        >
          <WaIcon :size="18" />
          Pedir diagnóstico grátis
        </a>
      </article>
    </div>
   </div>
  </section>
</template>

<style scoped>
.sv-grid { display: grid; gap: var(--sp-5); }
@media (min-width: 1100px) {
  .sv-grid { grid-template-columns: 1.1fr 1fr; gap: var(--sp-5); }
}

.sv-p { margin-top: var(--sp-3); max-width: 34rem; line-height: 1.6; color: var(--lab-dim); }
.sv-p + .sv-p { margin-top: var(--sp-2); }
.sv-forte { font-weight: 600; color: var(--lab-fg); }
.sv-code {
  font-family: var(--font-body);
  font-weight: 600;
  color: var(--lab-fg);
  white-space: nowrap;
}

/* lista dos tamanhos: hairlines, sem card */
.sv-lista { margin-top: var(--sp-4); border-top: 1px solid var(--lab-line); }
.sv-item {
  display: grid;
  gap: var(--sp-1);
  padding: var(--sp-3) 0;
  border-bottom: 1px solid var(--lab-line);
}
.sv-item-cab { display: flex; justify-content: space-between; align-items: baseline; gap: 1rem; }
.sv-nome { font-family: var(--font-display); font-weight: var(--w-display, 500); font-size: var(--t-1); letter-spacing: -0.01em; }
.sv-prazo { font-size: var(--t-s); color: var(--lab-dim); white-space: nowrap; }
.sv-para { color: var(--lab-dim); font-size: var(--t-s); line-height: 1.55; max-width: 30rem; }
/* o valor na fonte de título, a regra do preço miúda do lado */
.sv-preco { display: flex; flex-wrap: wrap; align-items: baseline; gap: 0.15rem 0.6rem; margin-top: var(--sp-1); }
.sv-valor { font-family: var(--font-display); font-weight: var(--w-display, 500); font-size: var(--t-1); letter-spacing: -0.01em; }
.sv-nota { font-size: var(--t-xs); line-height: 1.5; color: var(--lab-dim); }
.sv-link {
  justify-self: start;
  margin-top: var(--sp-1);
  font-weight: 600;
  font-size: var(--t-s);
  color: var(--lab-accent);
  border-bottom: 1px solid currentColor;
  transition: color 0.3s var(--ease);
}
.sv-link:hover { color: var(--lab-fg); }
.sv-comum { margin-top: var(--sp-3); font-size: var(--t-s); line-height: 1.55; color: var(--lab-dim); max-width: 34rem; }

/* site invadido */
.sv-invadido .sv-preco { margin-top: var(--sp-4); }
.sv-excecao { margin-top: var(--sp-1); font-size: var(--t-xs); line-height: 1.5; color: var(--lab-dim); max-width: 32rem; }
.sv-passos { display: grid; gap: var(--sp-1); margin-top: var(--sp-4); }
.sv-passos li { display: flex; gap: 0.7rem; line-height: 1.45; }
.sv-passos li::before { content: ''; flex: none; width: 6px; height: 6px; margin-top: 0.6em; border-radius: 999px; background: var(--lab-accent); }
.sv-regra {
  margin-top: var(--sp-4);
  padding-left: 1rem;
  border-left: 2px solid var(--lab-accent);
  line-height: 1.55;
  max-width: 32rem;
}
.sv-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  margin-top: var(--sp-4);
  padding: 0.9rem 1.6rem;
  border: 1px solid var(--lab-line-2);
  border-radius: 999px;
  font-weight: 600;
  font-size: 0.95rem;
  transition: background 0.3s var(--ease), color 0.3s var(--ease);
}
.sv-cta:hover { background: var(--lab-fg); color: var(--lab-bg); }
</style>
