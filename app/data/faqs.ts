// Fonte única das perguntas: a seção visível e o JSON-LD (FAQPage) leem daqui.
// O Google exige que o schema bata com o que está na tela, então não duplique.
export interface Faq {
  q: string
  a: string
}

export const faqs: Faq[] = [
  {
    q: 'Quanto custa?',
    a: 'Depende do tamanho do site, e eu falo o valor logo na primeira conversa. Não gosto de enrolar quem só quer saber se cabe no bolso. O pagamento é metade pra começar e metade quando o site fica pronto, antes de ir ao ar. Pix é o mais fácil pros dois lados.'
  },
  {
    q: 'Quanto tempo demora?',
    a: 'Entre 5 e 15 dias úteis, dependendo do tamanho. O relógio começa quando você me manda o material, e eu te passo uma lista curta do que preciso pra não te deixar adivinhando.'
  },
  {
    q: 'O que você precisa de mim?',
    a: 'Me conta o que você faz, pra quem, e o que te diferencia de quem trabalha na mesma rua. Se tiver fotos suas, melhor ainda. Foto de banco de imagem todo mundo reconhece, e site com informação de verdade dá menos retrabalho lá na frente.'
  },
  {
    q: 'Depois de pronto, posso pedir alteração?',
    a: 'Pode, e já vem com 2 rodadas inclusas. Depois disso a gente conversa sobre o que mudou e eu te passo o valor antes de mexer em qualquer coisa. Você nunca vai receber uma cobrança que não combinamos.'
  },
  {
    q: 'Preciso comprar domínio e hospedagem?',
    a: 'Pra primeira versão, não. O site pode ir ao ar num link gratuito e você já começa a usar. Quando quiser o seunegocio.com.br, a gente resolve isso à parte e você sabe o custo antes de decidir.'
  },
  {
    q: 'Já tenho site. Dá pra melhorar em vez de refazer?',
    a: 'Às vezes dá, e nesses casos sai bem mais barato. Me manda o link que eu olho e te falo com honestidade se compensa ajustar ou se remendar vai custar mais caro que começar de novo. Já falei "não precisa refazer" pra gente que veio querendo pagar.'
  },
  {
    q: 'Por que eu não vejo preço no site?',
    a: 'Porque tabela de preço sem contexto engana os dois lados. Um site de uma página pra manicure e um institucional de clínica com cinco especialidades não cabem no mesmo número. Prefiro te ouvir cinco minutos e falar um valor que eu consiga sustentar.'
  }
]
