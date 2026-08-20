// Fonte única dos projetos. Aparecem em dois lugares (o bloco de trabalho
// e as fotos girando em volta do retrato no topo) e não podem divergir.

export interface Projeto {
  nome: string
  /** Vazio enquanto o domínio não estiver no ar: o card cai pra sem-link. */
  url: string
  shot: string
  objetivo: string
  tags: string[]
}

export const projetoDestaque: Projeto = {
  nome: 'Gabo Garcia Gallery',
  url: 'https://gabogarciagallery.pages.dev/',
  shot: '/img/proj-gabo.webp',
  objetivo: 'Vitrine pro trabalho de um ilustrador. No ar e crescendo.',
  tags: ['Portfólio', 'Sanity CMS']
}

export const outrosProjetos: Projeto[] = [
  {
    nome: 'Tenda Oriental',
    url: '',
    shot: '/img/proj-tenda.webp',
    objetivo: 'Catálogo online da loja: monta o pedido e retira no Setor Oeste.',
    tags: ['E-commerce', 'Catálogo']
  },
  {
    nome: 'Allegorio',
    url: '',
    shot: '/img/proj-allegorio.webp',
    objetivo: 'Publicação independente sobre moda masculina.',
    tags: ['Editorial', 'Newsletter']
  }
]

export const projetos: Projeto[] = [projetoDestaque, ...outrosProjetos]
