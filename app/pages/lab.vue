<script setup lang="ts">
// Versão anterior do site, guardada como referência e controle de comparação.
//
// Fica fora do índice do Google: ela cobre exatamente as mesmas buscas da
// home, então indexar as duas seria competir consigo mesmo. Pelo mesmo
// motivo não carrega o schema de negócio nem a FAQPage, que descrevem a
// mesma entidade e devem existir num lugar só.
useHead({
  title: 'Kouichi | versão anterior',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' },
    { name: 'theme-color', content: '#F3EAD8' }
  ],
  link: [
    { rel: 'canonical', href: 'https://kouichi.com.br' },
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
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
