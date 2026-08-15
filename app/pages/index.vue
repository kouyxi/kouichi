<script setup lang="ts">
import { faqs } from '~/data/faqs'
import { email } from '~/data/contato'

const siteUrl = 'https://kouichi.com.br'
const title = 'Kouichi | Sites e landing pages que convertem em Goiânia'
const description =
  'Desenvolvimento de sites e landing pages focados em conversão para negócios de Goiânia e região. Estrutura, copy e design a serviço de gerar contato no WhatsApp.'
const ogImage = `${siteUrl}/og.png`

useHead({
  title,
  meta: [
    { name: 'description', content: description },
    { name: 'theme-color', content: '#F3EAD8' },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: 'Kouichi' },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:url', content: siteUrl },
    { property: 'og:image', content: ogImage },
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
</script>

<template>
  <div>
    <ScrollProgress />
    <AppHeader />
    <main>
      <HeroSection />
      <MarqueeStrip />
      <ServicesSection />
      <ProcessSection />
      <AboutSection />
      <PortfolioSection />
      <FaqSection />
    </main>
    <AppFooter />
    <WhatsAppButton />
  </div>
</template>
