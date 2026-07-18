# Kouichi — site

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

## Deploy — Cloudflare Pages (grátis, sem cold-start, CI do GitHub)

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

- [ ] Trocar número de WhatsApp real (buscar `556200000000` no projeto)
- [ ] Trocar e-mail `contato@kouichi.dev`
- [ ] Trocar domínio `kouichi.dev` (em `app/app.vue`, `public/robots.txt`, `public/sitemap.xml`)
- [ ] Imagem do hero: substituir `public/img/hero-placeholder.jpg` (é referência, trocar por arte própria/licenciada)
- [ ] Gerar imagem OG 1200×630 em `public/og.png` (preview ao compartilhar no WhatsApp)
- [ ] Adicionar métricas (Microsoft Clarity + GA4) — ver passo 3
