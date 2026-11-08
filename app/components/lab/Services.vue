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
  <section id="servicos" class="sv">
    <h2 class="sv-h2">O que eu faço</h2>

    <div class="sv-grid">
      <article class="sv-bloco">
        <h3 class="sv-t">Site novo pro seu negócio</h3>
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
        <h3 class="sv-t">Limpeza de site invadido</h3>
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
  </section>
</template>

<style scoped>
.sv {
  padding: clamp(3.5rem, 10vh, 7rem) var(--lab-edge);
  background: var(--lab-bg);
  color: var(--lab-fg);
}
.sv-h2 {
  font-size: 0.86rem;
  font-weight: 500;
  color: var(--lab-dim);
}
.sv-grid {
  display: grid;
  gap: clamp(3rem, 8vh, 5rem);
  margin-top: 1.5rem;
}
@media (min-width: 900px) {
  .sv-grid { grid-template-columns: 1.1fr 1fr; gap: clamp(3rem, 6vw, 6rem); }
}

.sv-t {
  font-family: var(--font-display);
  font-weight: 500;
  font-size: clamp(1.7rem, 3vw, 2.4rem);
  line-height: 1.08;
  letter-spacing: -0.025em;
}
.sv-p { margin-top: 1rem; max-width: 34rem; line-height: 1.6; color: var(--lab-dim); }
.sv-code {
  font-family: var(--font-body);
  font-weight: 600;
  color: var(--lab-fg);
  white-space: nowrap;
}

/* lista dos tamanhos: hairlines, sem card */
.sv-lista { margin-top: 2rem; border-top: 1px solid var(--lab-line); }
.sv-item {
  display: grid;
  gap: 0.4rem;
  padding: 1.25rem 0;
  border-bottom: 1px solid var(--lab-line);
}
.sv-item-cab { display: flex; justify-content: space-between; align-items: baseline; gap: 1rem; }
.sv-nome { font-family: var(--font-display); font-weight: 500; font-size: 1.3rem; letter-spacing: -0.01em; }
.sv-prazo { font-size: 0.85rem; color: var(--lab-dim); white-space: nowrap; }
.sv-para { color: var(--lab-dim); font-size: 0.95rem; line-height: 1.5; max-width: 30rem; }
.sv-link {
  justify-self: start;
  margin-top: 0.25rem;
  font-weight: 600;
  font-size: 0.92rem;
  color: var(--lab-accent);
  border-bottom: 1px solid transparent;
}
.sv-link:hover { border-color: currentColor; }
.sv-comum { margin-top: 1.25rem; font-size: 0.9rem; line-height: 1.5; color: var(--lab-dim); max-width: 34rem; }

/* site invadido */
.sv-passos { display: grid; gap: 0.55rem; margin-top: 1.5rem; }
.sv-passos li { display: flex; gap: 0.7rem; line-height: 1.45; }
.sv-passos li::before { content: ''; flex: none; width: 6px; height: 6px; margin-top: 0.6em; border-radius: 999px; background: var(--lab-accent); }
.sv-regra {
  margin-top: 1.5rem;
  padding-left: 1rem;
  border-left: 2px solid var(--lab-accent);
  line-height: 1.55;
  max-width: 32rem;
}
.sv-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  margin-top: 1.75rem;
  padding: 0.85rem 1.5rem;
  border: 1px solid var(--lab-line-2);
  border-radius: 999px;
  font-weight: 600;
  font-size: 0.95rem;
  transition: background 0.3s var(--ease), color 0.3s var(--ease);
}
.sv-cta:hover { background: var(--lab-fg); color: var(--lab-bg); }
</style>
