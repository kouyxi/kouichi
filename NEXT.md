# Próximos passos

Nota de passagem de 2026-11-08, pra ler depois do `/clear`. Apague quando
tudo aqui estiver resolvido.

## Onde está

- Branch `redesign`, tudo commitado, **nada enviado**. O push publica no
  Cloudflare, então ele é decisão sua.
- `npm run generate` passa.
- Feito nesta sessão:
  - Otimização: GSAP e Lenis fora da home, efeitos de rolagem em CSS, foto
    em AVIF, fontes pré-carregadas, métricas carregadas depois da página.
  - Marca nova: a mikan em silhueta, com favicon, ícone do iPhone e `og.jpg`.
- Números no 4G lento simulado:
  - Celular: LCP 2,2 s → 1,7 s, CLS 0,062 → 0, 353 KB → 205 KB.
  - Desktop: CLS 0,27 → 0.

## Como trabalhar a partir daqui

1. Agentes **auditam em paralelo e só devolvem relatório**: copy, vieses e
   conversão, design e acessibilidade, desempenho. Nenhum deles edita código.
2. O orquestrador junta os relatórios, tira repetição e conflito, e traz
   **uma decisão por vez**.
3. As edições saem numa linha só, em commits pequenos em português.

## Decisões que só você pode tomar

- [ ] **Preço visível.** A recomendação é mostrar "a partir de" em cada
  tamanho (Uma página, Institucional, Completo), com valor redondo e sem
  R$ 1.497. Precisa dos seus valores reais: nada de número inventado. A
  limpeza de site invadido continua "valor combinado antes". Se o preço
  entrar, a pergunta "Por que eu não vejo preço no site?" do FAQ
  (`app/data/faqs.ts`) precisa ser reescrita.
- [ ] **Prova social.** É a maior lacuna da página. Precisa de um
  depoimento real (o do Gabo ou de outro cliente), com nome, negócio e
  foto, e com autorização.
- [ ] **"Aberto para 2 projetos este mês"** (`app/data/contato.ts`). Isso
  é verdade? Precisa ser atualizado todo mês, ou sai do site.

## Pronto pra aplicar, falta o seu ok

- [ ] **Recomendação entre os três tamanhos:** um "Na dúvida, é esse" no
  Institucional. Hoje os três têm o mesmo peso e a pessoa trava.
- [ ] **Ajustes de copy:**
  - "E estudo o que faz alguém decidir." soa manipulador. Trocar por algo
    como "...e sei o que faz alguém chamar no WhatsApp em vez de fechar a
    aba." (`Manifest.vue`)
  - O botão "Vamos conversar" do fim não diz o que acontece. Trocar por
    "Me chama no WhatsApp". (`Contact.vue`)
  - Os princípios "Fato, não adjetivo" e "Se não serve, sai" falam de você,
    não do cliente. Cortar, ou transformar em promessa. (`Manifest.vue`)
  - "Você sabe onde pisa." é enigmático. Mudar é opcional. (`Process.vue`)

## Depois do deploy

- [ ] Rodar o PageSpeed Insights em `kouichi.com.br` pra ter o número real.
- [ ] Com esse número, a prova pelo próprio site: "Este site abre em X s
  num 4G. Teste você mesmo." (mesma ideia do teste `site:`)
- [ ] Conferir o card no WhatsApp mandando o link pra você mesmo. A imagem
  agora é `/og.jpg`.

## Pendências manuais, fora do código

Estão no README, em "Depende de você":

- Marcar `whatsapp_click` como conversão no GA4.
- Search Console e envio do `sitemap.xml`.
- Google Business Profile.
- DNS SPF/DMARC no Cloudflare.
- WhatsApp Business.
- Página `/site-invadido`: só depois que o teste de demanda passar.
