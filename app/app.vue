<script setup lang="ts">
// TODO: trocar pelo domínio real quando publicar
const siteUrl = 'https://kouichi.dev'
const title = 'Kouichi — Sites e landing pages que convertem | Goiânia'
const description =
  'Desenvolvimento de sites e landing pages focados em conversão para negócios de Goiânia e região. Estrutura, copy e design a serviço de gerar contato no WhatsApp.'
// TODO: gerar uma imagem de compartilhamento real (1200x630) e colocar em /public/og.png
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
        '@type': 'ProfessionalService',
        name: 'Kouichi — Desenvolvimento Web',
        description,
        url: siteUrl,
        areaServed: { '@type': 'City', name: 'Goiânia' },
        serviceType: 'Criação de sites e landing pages focados em conversão',
        priceRange: 'R$500–R$1.200+',
        knowsLanguage: 'pt-BR',
        makesOffer: [
          { '@type': 'Offer', name: 'Landing page (One Page)', priceCurrency: 'BRL', price: '500' },
          { '@type': 'Offer', name: 'Site institucional', priceCurrency: 'BRL', price: '700' },
          { '@type': 'Offer', name: 'Site completo', priceCurrency: 'BRL', price: '1200' }
        ]
      })
    }
  ]
})
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <ScrollProgress />
    <AppHeader />
    <main>
      <HeroSection />
      <MarqueeStrip />
      <ServicesSection />
      <AboutSection />
      <PortfolioSection />
      <FaqSection />
    </main>
    <AppFooter />
    <WhatsAppButton />
  </div>
</template>
