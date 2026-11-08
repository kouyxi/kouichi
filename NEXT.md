# Próximos passos

Nota de passagem de 2026-11-08, pra ler depois do `/clear`. Apague quando
tudo aqui estiver resolvido.

## Onde está

- No ar desde 08/11: a `redesign` foi pra `main` com push forçado, por
  cima de 4 commits de agosto (Tenda Oriental, Allegorio e fotos girando
  no topo). Eles estão guardados na branch local `projetos-agosto`.
- Commit novo fica só aqui até você publicar com
  `git push origin redesign:main`. O push publica no Cloudflare, então ele
  continua sendo decisão sua.
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

- [x] **Preço do site novo** (08/11): "Até 5 páginas" com R$ 600, preço
  de começo até o 5º cliente, e "depois, a partir de R$ 900". "Mais de 5
  páginas" com valor na conversa. A base da escolha está no commit.
  No 5º cliente, a linha vira "a partir de R$ 900" (`Services.vue` e
  `faqs.ts`).
- [ ] **Preço da limpeza:** R$ 300 por site WordPress, R$ 450 depois do 5º,
  pago depois de conferir. Antes de publicar falta decidir:
  - o que acontece se o spam voltar depois do pagamento;
  - como o dono confere: as páginas de spam dando "página não
    encontrada" e o teste ao vivo do Search Console;
  - as exceções escritas do lado do preço: loja virtual, mais de um
    site, invasão que vem da hospedagem.
- [ ] **Quando o cliente paga a primeira metade do site.** O FAQ diz
  "metade pra começar", e o site promete "não gostou do layout, não paga".
  Recomendação: a primeira metade quando o layout for aprovado.
- [ ] **Diagnóstico grátis** no bloco da limpeza, se ele for feito sem
  acesso ao site.
- [ ] **Manutenção mensal (R$ 79):** fica fora do site por enquanto. Falta
  dizer o que ela cobre, e o valor não é redondo.
- [ ] **Prova social.** É a maior lacuna da página. Precisa de um
  depoimento real (o do Gabo ou de outro cliente), com nome, negócio e
  foto, e com autorização.
- [ ] **"Aberto para 2 projetos este mês"** (`app/data/contato.ts`). Isso
  é verdade? Precisa ser atualizado todo mês, ou sai do site.

## Pronto pra aplicar, falta o seu ok

- [ ] **Cartões do "Como funciona" sem sobra:** tirar a altura mínima e
  pôr o selo ("Sai sabendo quanto custa") logo embaixo do texto, como já é
  no celular. A pilha continua. Prévia feita em 08/11. (`Process.vue`)
- [ ] **Ajustes de copy:**
  - Feito em 08/11: o parágrafo do "Quem faz" virou "Conserto o que
    quebra...", sem a "porta aberta" (soava como quem testa o site dos
    outros) e sem o "estudo o que faz alguém decidir". (`Manifest.vue`)
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
