<script setup lang="ts">
const siteUrl = 'https://kouichi.com.br'
const title = 'mikan — Sites e landing pages que convertem | Goiânia'
const description =
  'Desenvolvimento de sites e landing pages focados em conversão para negócios de Goiânia e região. Estrutura, copy e design a serviço de gerar contato no WhatsApp.'
// Cartão de compartilhamento (1200x630) em /public/og.png
const ogImage = `${siteUrl}/og.png`
const { heroImage } = useSite()

useHead({
  title,
  meta: [
    { name: 'description', content: description },
    { name: 'theme-color', content: '#EAE3D5' },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: 'mikan' },
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
    { rel: 'preload', as: 'image', href: heroImage, fetchpriority: 'high' },
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
        name: 'mikan — Desenvolvimento Web',
        description,
        url: siteUrl,
        areaServed: { '@type': 'City', name: 'Goiânia' },
        serviceType: 'Criação de sites e landing pages focados em conversão',
        priceRange: 'R$350–R$1.400+',
        knowsLanguage: 'pt-BR',
        makesOffer: [
          { '@type': 'Offer', name: 'Landing page (One Page)', priceCurrency: 'BRL', price: '350' },
          { '@type': 'Offer', name: 'Site institucional', priceCurrency: 'BRL', price: '650' },
          { '@type': 'Offer', name: 'Site completo', priceCurrency: 'BRL', price: '1400' }
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
      <ProcessSection />
      <ServicesSection />
      <AboutSection />
      <PortfolioSection />
      <FaqSection />
    </main>
    <AppFooter />
    <WhatsAppButton />
  </div>
</template>
