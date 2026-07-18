// Acesso ao conteúdo do site (app.config.ts) + montador de link do WhatsApp.
// Auto-importado pelo Nuxt: use `const site = useSite()` em qualquer componente.
export function useSite() {
  const { site } = useAppConfig()

  // Monta o link wa.me. Passe um texto pra pré-preencher a mensagem.
  const waLink = (text?: string) =>
    `https://wa.me/${site.whatsapp}` + (text ? `?text=${encodeURIComponent(text)}` : '')

  return { ...site, waLink }
}
