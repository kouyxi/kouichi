// ┌─────────────────────────────────────────────────────────────┐
// │  EDITE AQUI — conteúdo do site em um só lugar.                │
// │  WhatsApp, contato, planos e projetos. Sem mexer no código.  │
// └─────────────────────────────────────────────────────────────┘
export default defineAppConfig({
  site: {
    // Número no formato 55 + DDD + número (só dígitos). Ex.: 5562999998888
    whatsapp: '5562981277721',

    // Mensagem que já vem escrita ao clicar nos botões gerais (topo, header, botão flutuante).
    // Reduz o atrito de "não sei o que escrever" — é só apertar enviar.
    waHello: 'Oi! Vim pelo site — quero conversar sobre um site que converte.',

    // E-mail e cidade que aparecem no rodapé
    email: 'victorkouichi40@gmail.com',
    location: 'Goiânia — GO',

    // Imagem grande do topo (arquivo em public/img/)
    heroImage: '/img/hero-placeholder.jpg',

    // ── PLANOS ─────────────────────────────────────────────────
    // Ordem = ordem na página. highlight:true dá o destaque visual.
    // badge: texto do selo (deixe '' pra não mostrar).
    plans: [
      {
        name: 'One Page',
        price: 'A partir de R$350',
        forWhom: 'Você tem um serviço ou uma oferta e quer um lugar simples e convincente pra mandar quem vê seu anúncio, Instagram ou Google. Uma página só, que rola de cima a baixo e termina no WhatsApp.',
        features: [
          '1 página só — rola tudo numa tela, sem menu',
          'Design sob medida (nada de template pronto)',
          'Copy de conversão + WhatsApp fixo',
          'Métrica de visita inclusa (GA4 + mapa de calor)',
          'HTTPS e boas práticas — sem porta aberta',
          'Ajustes inclusos por 15 dias'
        ],
        prazo: '5–7 dias úteis',
        highlight: false,
        badge: '',
        waText: 'Oi! Quero um One Page pro meu negócio.'
      },
      {
        name: 'Institucional',
        price: 'A partir de R$650',
        forWhom: 'Você tem vários serviços (ou quer explicar bem quem é) e precisa parecer estabelecido. Um site de verdade, com menu e várias páginas — Início, Serviços, Sobre, Contato.',
        features: [
          'Tudo do One Page, e mais:',
          'Várias páginas com menu (Início, Serviços, Sobre, Contato)',
          'Blog pronto pra publicar (autoridade + SEO)',
          'Uma página pra cada serviço → achado no Google de cada busca',
          'Espaço pra prova social, equipe e diferenciais',
          'Ajustes inclusos por 30 dias'
        ],
        prazo: '7–10 dias úteis',
        highlight: true,
        badge: 'Recomendado',
        waText: 'Oi! Quero um site Institucional pro meu negócio.'
      },
      {
        name: 'Completo',
        price: 'A partir de R$1.400',
        forWhom: 'Você não quer só um site que informa — quer um que faz. Agendamento online, catálogo ou loja, integrações. Estrutura pra crescer.',
        features: [
          'Tudo do Institucional, e mais:',
          'Funcionalidade sob medida: agendamento, catálogo, loja ou formulários',
          'Integrações (WhatsApp, Google Agenda, pagamento…)',
          'Rastreio de conversão completo (funil e origem do lead)',
          'Ajustes inclusos por 60 dias'
        ],
        prazo: '12–18 dias úteis',
        highlight: false,
        badge: '',
        waText: 'Oi! Quero um site Completo (com sistema) pro meu negócio.'
      }
    ],

    // ── PROJETOS (Portfólio) ───────────────────────────────────
    // image: caminho em public/img/ (ex.: '/img/projeto-clinica.jpg').
    //        Deixe '' pra manter o mockup ilustrado no lugar da foto.
    // tone:  'moss' (verde) ou 'clay' (terracota) — cor do fundo do card.
    projects: [
      {
        nicho: 'Clínica odontológica',
        objetivo: 'Transformar busca no Google em agendamento pelo WhatsApp.',
        tags: ['Landing page', 'Agendamento', 'SEO local'],
        tone: 'moss',
        image: ''
      },
      {
        nicho: 'Escritório de advocacia',
        objetivo: 'Passar autoridade e qualificar o contato antes da primeira conversa.',
        tags: ['Institucional', 'Prova social', 'FAQ'],
        tone: 'clay',
        image: ''
      }
    ]
  }
})
