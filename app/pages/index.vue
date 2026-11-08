<script setup lang="ts">
import { faqs } from '~/data/faqs'
import { email, nomeCompleto, waLink } from '~/data/contato'

const siteUrl = 'https://kouichi.com.br'
const title = 'Kouichi | Sites e landing pages que convertem em Goiânia'
// Escrita na mesma voz do site, não em terceira pessoa corporativa: é o que
// a pessoa lê no Google antes de decidir clicar, e vinha falando "copy" e
// "estrutura", que o cliente dele não usa. 150 caracteres, dentro do que o
// Google mostra sem cortar.
const description =
  'Site e landing page pra clínica, escritório e prestador de serviço em Goiânia. Feito pra gerar contato no WhatsApp, com orçamento na primeira conversa.'
const ogImage = `${siteUrl}/og.png`

useHead({
  title,
  meta: [
    { name: 'description', content: description },
    // creme: é a cor do topo e da barra fixa
    { name: 'theme-color', content: '#F3EAD8' },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: 'Kouichi' },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:url', content: siteUrl },
    { property: 'og:image', content: ogImage },
    // Dimensões e alt declarados: sem eles o WhatsApp às vezes não monta o
    // card, e o WhatsApp é justamente por onde o link vai circular.
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:image:alt', content: 'Kouichi, sites que geram contato em Goiânia' },
    { property: 'og:locale', content: 'pt_BR' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: ogImage }
  ],
  link: [
    { rel: 'canonical', href: siteUrl },
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'ProfessionalService',
            '@id': `${siteUrl}/#business`,
            name: 'Kouichi Desenvolvimento Web',
            description,
            url: siteUrl,
            image: ogImage,
            telephone: '+5562981277721',
            email,
            contactPoint: {
              '@type': 'ContactPoint',
              contactType: 'sales',
              telephone: '+5562981277721',
              email,
              availableLanguage: 'pt-BR'
            },
            areaServed: [
              { '@type': 'City', name: 'Goiânia' },
              { '@type': 'State', name: 'Goiás' }
            ],
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Goiânia',
              addressRegion: 'GO',
              addressCountry: 'BR'
            },
            serviceType: [
              'Criação de sites e landing pages focados em conversão',
              'Limpeza e recuperação de sites invadidos'
            ],
            knowsLanguage: 'pt-BR',
            founder: { '@type': 'Person', name: nomeCompleto, alternateName: 'Kouichi' },
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'Serviços',
              itemListElement: [
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Site de uma página' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Site institucional' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Site completo' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Limpeza de site invadido', url: `${siteUrl}/#site-invadido` } }
              ]
            }
          },
          {
            // As perguntas saem de data/faqs.ts, a mesma fonte da seção
            // visível: o Google exige que o schema bata com a tela.
            '@type': 'FAQPage',
            '@id': `${siteUrl}/#faq`,
            mainEntity: faqs.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a }
            }))
          }
        ]
      })
    }
  ]
})

const whatsapp = waLink('Oi, Kouichi! Vi seu site e queria um orçamento. Meu negócio é ')

// No fecho somem o botão flutuante e o índice de capítulos. O flutuante,
// porque lá já existem o CTA gigante e o selo, e três chamadas de WhatsApp
// no mesmo canto viram ruído na hora de decidir. O índice, porque ele é
// fixo à direita e passava por cima do selo, e nesse ponto não sobrou
// capítulo nenhum pra navegar.
// No topo ele some também: ali já estão o botão do cabeçalho e o do hero.
const noFecho = ref(false)
const noTopo = ref(false)

const semFlutuante = computed(() => noFecho.value || noTopo.value)

onMounted(() => {
  const alvos: Array<[string, Ref<boolean>]> = [['.ct-final', noFecho], ['#topo', noTopo]]
  const ios = alvos.flatMap(([sel, flag]) => {
    const el = document.querySelector(sel)
    if (!el) return []
    const io = new IntersectionObserver(([e]) => { flag.value = !!e?.isIntersecting }, { threshold: 0.35 })
    io.observe(el)
    return [io]
  })
  onBeforeUnmount(() => ios.forEach((io) => io.disconnect()))
})
</script>

<template>
  <div class="lab" :class="{ 'no-fecho': noFecho }">
    <LabHeader />
    <LabChapters />

    <a
      :href="whatsapp"
      target="_blank"
      rel="noopener"
      data-track="wa_fab"
      class="lab-float"
      :class="{ 'is-oculto': semFlutuante }"
      :aria-hidden="semFlutuante"
      :tabindex="semFlutuante ? -1 : undefined"
    >
      <WaIcon :size="22" />
      <span class="lab-float-t">WhatsApp</span>
    </a>

    <main>
      <LabIntro />
      <LabServices />
      <LabProcess />
      <LabManifest />
      <LabContact />
    </main>
  </div>
</template>

<style>
/* Tokens desta página. Não são escopados de propósito: os componentes filhos
   leem daqui. Ficam presos a .lab, então nada vaza pra outra rota.
   O nome "lab" vem de quando esta era a versão experimental. */
.lab {
  --lab-bg: #0E0B04;
  /* Um degrau acima do fundo, quente igual. Os cards da página eram pintados
     com o próprio --lab-bg, então painel e página tinham exatamente a mesma
     cor e só o filete de 1px os separava — daí a sensação de chapado. A
     diferença é de propósito pequena (1.09:1): a graça do layout são as
     hairlines, não caixas empilhadas. */
  --lab-surface: #1C1509;
  --lab-fg: #F3EAD8;
  --lab-dim: rgba(243, 234, 216, 0.62);
  --lab-accent: #E8631F;
  --lab-line: rgba(243, 234, 216, 0.14);
  --lab-line-2: rgba(243, 234, 216, 0.28);
  --lab-edge: clamp(1.15rem, 4vw, 3.5rem);

  /* Young Serif: um peso só, gorda e arredondada como a mikan. Um degrau
     abaixo da escala da Fraunces, porque ela ocupa mais caixa no mesmo corpo. */
  --font-display: 'Young Serif', Georgia, serif;
  --w-display: 400;

  /* Sistema: uma largura, um ritmo de respiro e uma escala de tipo (1.25).
     Cada seção lê daqui, então nada é medido no olho. */
  --lab-wrap: 76rem;
  --sec: clamp(4rem, 10vh, 7rem);
  --sp-1: 0.5rem;
  --sp-2: 1rem;
  --sp-3: 1.5rem;
  --sp-4: 2.5rem;
  --sp-5: 4rem;
  --t-xs: 0.8rem;
  --t-s: 0.9rem;
  --t-1: 1.25rem;
  --t-h3: clamp(1.4rem, 2.2vw, 1.75rem);
  --t-h2: clamp(1.75rem, 3vw, 2.6rem);

  background: var(--lab-bg);
  color: var(--lab-fg);
  overflow-x: clip;
}

/* Cartão: topo e fecho em creme, miolo escuro. Um bloco com .claro inverte
   os tokens e todo componente dentro dele continua lendo as mesmas
   variáveis, então nenhum filho precisa saber em que lado está. */
.lab .claro {
  --lab-bg: #F3EAD8;
  --lab-surface: #FBF6EC;
  --lab-fg: #0E0B04;
  --lab-dim: rgba(14, 11, 4, 0.68);
  --lab-line: rgba(14, 11, 4, 0.16);
  --lab-line-2: rgba(14, 11, 4, 0.32);
}

/* o overscroll em cima é creme (barra e topo) e embaixo também (fecho) */
body:has(.lab) { background: #F3EAD8; }

/* Seção padrão: rótulo numa coluna estreita à esquerda, conteúdo à direita.
   É a mesma proporção do topo (foto 5, texto 7), então a margem esquerda
   do conteúdo cai sempre no mesmo lugar da página pra baixo. */
.lab .sec {
  padding: var(--sec) var(--lab-edge);
  border-top: 1px solid var(--lab-line);
  background: var(--lab-bg);
  color: var(--lab-fg);
}
.lab .sec-in {
  max-width: var(--lab-wrap);
  margin-inline: auto;
  display: grid;
  gap: var(--sp-3);
}
.lab .sec-rotulo { font-size: var(--t-s); font-weight: 500; color: var(--lab-dim); }
@media (min-width: 900px) {
  .lab .sec-in { grid-template-columns: minmax(0, 3fr) minmax(0, 9fr); gap: var(--sp-5); align-items: start; }
  /* o rótulo acompanha a leitura, como margem de livro */
  .lab .sec-rotulo { position: sticky; top: 5rem; }
}
.lab .sec-h2 {
  font-family: var(--font-display);
  font-weight: var(--w-display, 500);
  font-size: var(--t-h2);
  line-height: 1.05;
  letter-spacing: -0.03em;
  text-wrap: balance;
  max-width: 22ch;
}
.lab .sec-h3 {
  font-family: var(--font-display);
  font-weight: var(--w-display, 500);
  font-size: var(--t-h3);
  line-height: 1.1;
  letter-spacing: -0.025em;
  text-wrap: balance;
}
.lab .sec-lead { margin-top: var(--sp-3); max-width: 34rem; line-height: 1.6; color: var(--lab-dim); }

/* sem palavra solta no fim do parágrafo */
.lab p { text-wrap: pretty; }

/* Botão primário: um comportamento só em toda a página. Hover físico
   (sobe e ganha sombra), não troca de cor; pressionar devolve ao lugar. */
.lab :is(.intro-cta, .hd-cta, .lab-float, .ct-huge) {
  transition: transform 0.25s var(--ease), box-shadow 0.25s var(--ease), color 0.25s var(--ease);
}
.lab :is(.intro-cta, .hd-cta, .lab-float):hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 24px -10px rgba(232, 99, 31, 0.6);
}
.lab :is(.intro-cta, .hd-cta, .lab-float):active { transform: translateY(0); box-shadow: none; }

/* ponto pulsando: a vaga está aberta agora, não num texto antigo */
.lab .pulso {
  position: relative;
  flex: none;
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: var(--lab-accent);
}
.lab .pulso::after {
  content: '';
  position: absolute;
  inset: -4px;
  border-radius: 999px;
  border: 1.5px solid var(--lab-accent);
  animation: labPulso 2.4s var(--ease) infinite;
}
@keyframes labPulso {
  0% { transform: scale(0.6); opacity: 0.9; }
  100% { transform: scale(1.6); opacity: 0; }
}
@media (prefers-reduced-motion: reduce) {
  .lab .pulso::after { animation: none; opacity: 0.5; }
  .lab :is(.intro-cta, .hd-cta, .lab-float):hover { transform: none; }
}

/* katakana do nome: fonte do sistema, miúdo, na cor apagada */
.lab .kana {
  font-family: system-ui, -apple-system, 'Hiragino Sans', 'Noto Sans CJK JP', sans-serif;
  font-size: 0.68em;
  font-weight: 400;
  letter-spacing: 0.08em;
  color: var(--lab-dim);
}

/* foco visível em tudo que é clicável, na cor da marca */
.lab :is(a, button, summary):focus-visible { outline: 2px solid var(--lab-accent); outline-offset: 3px; }
/* âncora para por baixo da barra fixa, não embaixo dela */
.lab [id] { scroll-margin-top: 4.5rem; }

.lab ::selection { background: var(--lab-accent); color: var(--lab-bg); }

.lab-float {
  position: fixed;
  z-index: 70;
  /* à direita: à esquerda ele cobria o pé do título em quase toda seção */
  right: clamp(1rem, 3vw, 2rem);
  bottom: clamp(1rem, 3vw, 2rem);
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.75rem 1.15rem;
  border-radius: 999px;
  background: var(--lab-accent);
  color: var(--lab-bg);
  font-weight: 600;
  font-size: 0.88rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.45);
  transition: transform 0.35s var(--ease), opacity 0.35s var(--ease);
}
.lab-float:hover { transform: translateY(-3px); }
.lab-float.is-oculto {
  opacity: 0;
  transform: translateY(1rem) scale(0.9);
  pointer-events: none;
}

/* O índice de capítulos é fixo à direita e o selo do fecho fica embaixo
   dele. Some no fecho. Regra sem escopo de propósito: precisa alcançar o
   .ch, que mora no componente Chapters. */
.lab .ch { transition: opacity 0.4s var(--ease); }
.lab.no-fecho .ch { opacity: 0; pointer-events: none; }
.lab-float-t { display: none; }
@media (min-width: 640px) { .lab-float-t { display: inline; } }
</style>
