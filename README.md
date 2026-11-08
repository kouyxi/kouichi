# Kouichi

Landing page estática (Nuxt 4, pré-renderizada). Foco em conversão para negócios de Goiânia.

## As duas rotas

| Rota | O que é | Indexada |
|---|---|---|
| `/` | Cartão: topo e fecho em creme, miolo escuro. Cabeçalho fixo com a mikan, o nome e os dois serviços (site novo e limpeza de site invadido). Uma entrada animada no topo e as cartas sticky do processo; o resto nasce no lugar. Componentes em `app/components/lab/`. | sim, e carrega todo o schema |
| `/lab` | Versão anterior, clara e convencional. Guardada como controle de comparação. | não, `noindex` |

O schema de negócio e a FAQPage moram só na `/`: descrevem a mesma
entidade, e ter os dois em duas URLs é competir consigo mesmo.

Os rótulos de `data-track` são por posição (`wa_header`, `wa_hero`,
`wa_plano_*`, `wa_invadido`, `wa_fab`, `wa_final`, `wa_selo`, `wa_numero`),
iguais nas duas rotas onde a posição existe: o GA4 já separa por caminho,
então dá pra comparar a mesma posição entre os dois layouts. `wa_invadido`
é o funil do segundo serviço.

Projetos saiu da home até existir caso real pra mostrar. O componente
antigo está no histórico (`git show 6c2f63b:app/components/lab/Work.vue`).

## Rodar local

```bash
npm install
npm run dev        # http://localhost:3000
```

## Build estático (o que vai pro ar)

```bash
npm run generate   # gera .output/public (HTML/CSS/JS puro)
npx serve .output/public   # preview local do build
```

## Deploy no Cloudflare Pages (grátis, sem cold-start, CI do GitHub)

1. Suba este repositório no GitHub.
2. Cloudflare Dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git** → escolha o repo.
3. Configuração de build:
   - **Framework preset:** Nuxt
   - **Build command:** `npm run generate`
   - **Build output directory:** `.output/public`
   - **Environment variable:** `NODE_VERSION = 20`
4. Deploy. A cada `git push` na branch principal, o Cloudflare rebuilda e publica sozinho (CI).
5. Domínio próprio: Pages → **Custom domains** → adicionar quando comprar.

## TODO antes de divulgar

- [x] WhatsApp e e-mail reais (ficam em `app/data/contato.ts`, um lugar só)
- [x] Domínio real `kouichi.com.br` (em `app/pages/index.vue`, `public/robots.txt`, `public/sitemap.xml`)
- [x] Imagem do hero: foto própria tratada em halftone (`public/img/hero-kouichi.webp`)
- [x] Imagem OG 1200×630 em `public/og.png` (preview ao compartilhar no WhatsApp)
- [x] Métricas instaladas (Microsoft Clarity + GA4), com clique de CTA e profundidade de rolagem

## Depende de você, não dá pra fazer pelo código

- [ ] Marcar `whatsapp_click` como conversão no painel do GA4
- [ ] Verificar o domínio no Search Console e enviar o `sitemap.xml`
- [ ] Criar o Google Business Profile (pesa mais que qualquer HTML para "site em Goiânia")
- [ ] Passar os perfis reais (LinkedIn, GitHub) pra entrarem como `sameAs` no schema
- [ ] Uma frase do Gabo, ou qualquer número do site dele: continua sendo a maior lacuna de prova
- [ ] DNS no Cloudflare: o domínio não envia e-mail, então TXT `v=spf1 -all` em `kouichi.com.br` e TXT `v=DMARC1; p=reject` em `_dmarc.kouichi.com.br`. Se um dia usar e-mail no domínio, trocar o SPF.
- [ ] WhatsApp Business: perfil com nome, link do site e CNPJ quando tiver
- [ ] Página `/site-invadido` (schema Service, no sitemap): só depois que o teste de demanda passar
