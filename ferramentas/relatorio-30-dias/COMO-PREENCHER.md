# Relatório de 30 dias — como preencher

Leva uns 20 minutos por cliente depois que o GA4 estiver configurado.
Na primeira vez leva mais, porque tem uma configuração que só se faz uma vez
por propriedade.

---

## Passo 0 — configuração única, por cliente (10 min)

Isso precisa estar feito **no dia que o site vai ao ar**, não no dia do
relatório. O GA4 não guarda o que não foi configurado antes: se você
registrar a dimensão só no dia 30, os cliques dos 30 dias anteriores
aparecem como "(not set)".

### 0.1 — Marcar o clique de WhatsApp como evento principal

`Admin` → `Exibições de dados` / `Eventos` → acha `whatsapp_click` →
liga a chave **"Marcar como evento principal"**.

Em contas mais antigas isso se chama "Marcar como conversão". É a mesma
coisa: o Google renomeou *conversão* para *evento principal* em 2024.

Sem isso o evento continua sendo contado, mas não entra nos relatórios de
conversão nem dá pra usar em campanha depois.

### 0.2 — Registrar os parâmetros como dimensões personalizadas

**Este é o passo que quase todo mundo pula**, e é o que decide se o
relatório vai ter detalhe ou só um número solto.

`Admin` → `Definições personalizadas` → `Criar dimensão personalizada`.
Cria duas, ambas com escopo **Evento**:

| Nome da dimensão | Parâmetro do evento | Serve pra |
|---|---|---|
| `location` | `location` | Saber **qual botão** foi clicado |
| `percent` | `percent` | Saber **até onde** a pessoa rolou |

Sem isso o GA4 mostra "houve 14 cliques de WhatsApp" e ponto. Com isso ele
mostra "9 no botão flutuante, 3 no topo, 2 no fecho", que é o que vira
recomendação.

Os nomes dos parâmetros vêm de `app/plugins/analytics.client.ts` deste
repositório. Se um dia mudarem lá, mudam aqui.

---

## Passo 1 — puxar os números (10 min)

Sempre com o período ajustado para os 30 dias do relatório.

| Campo do arquivo | Onde no GA4 |
|---|---|
| `pessoas` | `Relatórios` → `Aquisição` → `Aquisição de tráfego` → coluna **Usuários ativos**, linha de total |
| `pessoasMesAnterior` | mesmo relatório, mudando o período pros 30 dias anteriores. No primeiro relatório deixe `null` |
| `origens` | mesmo relatório, coluna da esquerda (`Organic Search` = Google, `Referral`/`Social` = Instagram, `Direct` = digitou ou salvou) |
| `cliquesWhatsapp` | `Relatórios` → `Engajamento` → `Eventos` → linha `whatsapp_click`, coluna **Contagem de eventos** |
| `botoes` | `Explorar` → `Formato livre` → linha = dimensão `location`, métrica = contagem de eventos, filtro = nome do evento é `whatsapp_click` |
| `rolagem` | `Explorar` → `Formato livre` → linha = dimensão `percent`, métrica = contagem, filtro = evento `scroll_depth` |
| `celular` / `computador` | `Relatórios` → `Tecnologia` → `Visão geral` → cartão **Categoria do dispositivo**, em porcentagem |

O Clarity não entra em número no relatório. Ele serve pra **você** entender
o porquê antes de escrever a recomendação: veja 3 ou 4 gravações e o mapa de
cliques. É de lá que costuma sair a recomendação boa.

---

## Passo 2 — escrever a recomendação (5 min)

Uma só. Concreta. Que o cliente consiga aprovar ou executar.

**Não serve:**
> "Melhorar o SEO e otimizar a conversão da página."

**Serve:**
> "78 pessoas entraram pelo Google e 61 delas saíram antes da metade da
> página. Nas gravações, quase todas pararam no bloco de preço. Sugiro
> trocar aquela tabela por uma frase dizendo que o orçamento sai na
> primeira conversa, e medir de novo em 30 dias."

A diferença é que a segunda tem um número, uma causa observada e uma ação.

---

## Se os números vierem pequenos

Vão vir. Site novo de negócio local começa com dezenas de visitas, não
milhares. **Isso não é problema do relatório, é a informação mais útil
dele** — e é onde nasce o próximo serviço.

Trate assim, no campo `contexto`:

> "O site está fazendo o trabalho dele: de cada 100 pessoas que entram, 11
> chamam no WhatsApp, o que é uma taxa boa. O que falta agora não é a
> página, é gente chegando nela. O caminho mais barato pra isso é o perfil
> do Google (aquele quadro que aparece na busca com telefone e horário).
> Se quiser, eu configuro."

Isso transforma um número baixo em venda, sem inventar nada. E é verdade.

**Nunca** infle, arredonde pra cima nem compare com "média do mercado" que
você não mediu. O relatório inteiro só vale porque o cliente confia no
número. Um dado inflado destrói o ativo e a relação junto.

---

## Passo 3 — enviar

1. Abre `relatorio.html` no navegador
2. `Ctrl+P` → **Salvar como PDF**
3. Manda no WhatsApp com uma frase curta, não com o arquivo solo:

> "Oi [nome], fechou 30 dias no ar. Montei um resumo do que aconteceu: [X]
> pessoas entraram e [Y] te chamaram aqui. Dá uma olhada, e tem uma sugestão
> no fim pro próximo mês."

---

## Por que isso existe

É a entrega que o vendedor de template não consegue fazer — não por
dificuldade técnica, mas porque o modelo dele é vender e sumir. É diferença
estrutural.

Serve três funções ao mesmo tempo:

1. **Vende antes de existir.** Dizer "e em 30 dias eu te mando um relatório
   do que aconteceu" na primeira conversa muda o que você está vendendo: sai
   de um arquivo entregue e vira alguém cuidando de onde vêm os clientes.
2. **Cria o momento da mensalidade** sem você ter que pedir. O cliente vê o
   número, quer melhorar, e a recorrência passa a ter motivo.
3. **Te dá dado real** pra parar de decidir por opinião nos próximos sites.
