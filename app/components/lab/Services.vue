<script setup lang="ts">
import { waLink } from '~/data/contato'

// Os três tamanhos de site. O que era repetido nos três ("publicado, 2
// rodadas, WhatsApp à vista") virou uma linha só embaixo da lista.
const tamanhos = [
  {
    nome: 'Uma página',
    para: 'Você vende um serviço só e precisa de um caminho curto até o WhatsApp.',
    prazo: '5 a 7 dias úteis',
    wa: 'Oi, Kouichi! Queria um site de uma página. Meu negócio é '
  },
  {
    nome: 'Institucional',
    para: 'Clínica, escritório e consultório, onde o cliente pesquisa bastante antes de escolher.',
    prazo: '7 a 10 dias úteis',
    wa: 'Oi, Kouichi! Queria um site institucional. Meu negócio é '
  },
  {
    nome: 'Completo',
    para: 'Vários serviços, mais páginas, e você quer saber de onde vem cada contato.',
    prazo: '10 a 15 dias úteis',
    wa: 'Oi, Kouichi! Queria um site completo. Meu negócio é '
  }
]

const waInvadido = waLink('Oi, Kouichi! Acho que meu site foi invadido. O endereço é ')
</script>

<template>
  <section id="servicos" class="sv sec">
   <div class="sec-in">
    <p class="sec-rotulo">O que eu faço</p>

    <div class="sv-grid">
      <article class="sv-bloco">
        <h2 class="sec-h3">Site novo pro seu negócio</h2>
        <p class="sv-p">
          Pra clínica, escritório e prestador de serviço que vive de cliente novo
          chegando. Três tamanhos, e o valor eu falo na primeira conversa.
        </p>

        <ul class="sv-lista">
          <li v-for="t in tamanhos" :key="t.nome" class="sv-item">
            <div class="sv-item-cab">
              <h4 class="sv-nome">{{ t.nome }}</h4>
              <span class="sv-prazo">{{ t.prazo }}</span>
            </div>
            <p class="sv-para">{{ t.para }}</p>
            <a
              :href="waLink(t.wa)"
              target="_blank"
              rel="noopener"
              :data-track="`wa_plano_${t.nome.toLowerCase().replace(/\s+/g, '_')}`"
              class="sv-link"
              data-cursor="grow"
            >Quero esse</a>
          </li>
        </ul>

        <p class="sv-comum">
          Todos saem publicados, rápidos no celular, com o botão de WhatsApp
          sempre à vista e 2 rodadas de ajuste inclusas.
        </p>
      </article>

      <!-- Segundo serviço. Sem medo, sem pressa, sem nome de casa de aposta:
           o dono chega aqui desconfiado, e o que convence é o passo a passo
           e a regra de pagar depois de conferir. -->
      <article id="site-invadido" class="sv-bloco sv-invadido">
        <h2 class="sec-h3">Limpeza de site invadido</h2>
        <p class="sv-p">
          Às vezes o site de uma empresa aparece no Google com páginas de aposta
          que o dono nunca criou. É invasão, acontece com site de clínica, de
          escritório e de loja, e normalmente o dono só descobre quando alguém avisa.
        </p>
        <p class="sv-p">
          Pra conferir sozinho, pesquise no Google
          <code class="sv-code">site:seudominio.com.br</code>
          e veja se aparece página que você não reconhece.
        </p>

        <ul class="sv-passos">
          <li>Backup antes de mexer em qualquer coisa</li>
          <li>Limpeza do que foi colocado no site</li>
          <li>Troca de senhas</li>
          <li>Atualização do que estava vulnerável</li>
          <li>Pedido pro Google revisar e tirar as páginas da busca</li>
          <li>Relatório escrito do que encontrei</li>
        </ul>

        <p class="sv-regra">
          Autorização por escrito antes de qualquer acesso. Valor combinado antes.
          Você paga depois de conferir que o site ficou limpo.
        </p>

        <a
          :href="waInvadido"
          target="_blank"
          rel="noopener"
          data-track="wa_invadido"
          class="sv-cta"
          data-cursor="grow"
        >
          <WaIcon :size="18" />
          Falar sobre o meu site
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
