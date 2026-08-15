<script setup lang="ts">
import { faqs } from '~/data/faqs'
import { email, waLink } from '~/data/contato'

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
    // escura: esta página é fundo escuro de ponta a ponta
    { name: 'theme-color', content: '#0E0B04' },
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
            serviceType: 'Criação de sites e landing pages focados em conversão',
            knowsLanguage: 'pt-BR',
            founder: { '@type': 'Person', name: 'Kouichi' },
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'Sites',
              itemListElement: [
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Site de uma página' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Site institucional' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Site completo' } }
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
const noFecho = ref(false)

onMounted(() => {
  const fecho = document.querySelector('.ct-final')
  if (!fecho) return
  const io = new IntersectionObserver(
    ([e]) => { noFecho.value = !!e?.isIntersecting },
    { threshold: 0.35 }
  )
  io.observe(fecho)
  onBeforeUnmount(() => io.disconnect())
})
</script>

<template>
  <div class="lab" :class="{ 'no-fecho': noFecho }">
    <div class="lab-grao" aria-hidden="true" />
    <LabCursor />
    <LabChapters />

    <a
      :href="whatsapp"
      target="_blank"
      rel="noopener"
      data-track="wa_fab"
      class="lab-float"
      :class="{ 'is-oculto': noFecho }"
      :aria-hidden="noFecho"
      :tabindex="noFecho ? -1 : undefined"
    >
      <WaIcon :size="22" />
      <span class="lab-float-t">WhatsApp</span>
    </a>

    <main>
      <LabIntro />
      <LabVelocity />
      <LabServices />
      <LabProcess />
      <LabWork />
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
  --lab-fg: #F3EAD8;
  --lab-dim: rgba(243, 234, 216, 0.62);
  --lab-accent: #DC5B2C;
  --lab-line: rgba(243, 234, 216, 0.14);
  --lab-line-2: rgba(243, 234, 216, 0.28);
  --lab-edge: clamp(1.15rem, 4vw, 3.5rem);

  /* o fundo não é uma cor chapada: duas manchas muito fracas dão profundidade
     e tiram a sensação de "preto igual do começo ao fim" */
  background:
    radial-gradient(ellipse 90% 50% at 15% 0%, rgba(220, 91, 44, 0.07), transparent 60%),
    radial-gradient(ellipse 70% 60% at 90% 78%, rgba(111, 131, 71, 0.06), transparent 62%),
    var(--lab-bg);
  color: var(--lab-fg);
  overflow-x: clip;
}

/* a página é escura de ponta a ponta, inclusive no overscroll */
body:has(.lab) { background: #0E0B04; }

/* Grão de papel por cima de tudo. É o que mais tira o aspecto de tela
   chapada, e custa uma textura em SVG, sem imagem nenhuma. */
.lab-grao {
  position: fixed;
  inset: 0;
  z-index: 80;
  pointer-events: none;
  opacity: 0.055;
  mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

.lab .lab-index {
  display: block;
  font-family: var(--font-body);
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  font-size: 0.72rem;
  letter-spacing: 0.16em;
  color: var(--lab-accent);
}

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
