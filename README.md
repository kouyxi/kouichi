# Kouichi

Landing page estática (Nuxt 4, pré-renderizada). Foco em conversão para negócios de Goiânia.

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
- [ ] Trocar domínio `kouichi.dev` (em `app/app.vue`, `public/robots.txt`, `public/sitemap.xml`)
- [x] Imagem do hero: foto própria tratada em halftone (`public/img/hero-kouichi.jpg`)
- [ ] Gerar imagem OG 1200×630 em `public/og.png` (preview ao compartilhar no WhatsApp)
- [ ] Adicionar métricas (Microsoft Clarity + GA4), ver passo 3
