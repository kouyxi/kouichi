// Fonte única das perguntas: a seção visível e o JSON-LD (FAQPage) leem daqui.
// O Google exige que o schema bata com o que está na tela, então não duplique.
export interface Faq {
  q: string
  a: string
}

export const faqs: Faq[] = [
  {
    q: 'Quanto custa?',
    a: 'Site de até 5 páginas: R$ 600, preço de começo até o 5º cliente. Depois, a partir de R$ 900. Mais de 5 páginas: valor na primeira conversa. Metade pra começar, metade antes de ir ao ar. Pix.'
  },
  {
    q: 'Quanto tempo demora?',
    a: 'De 5 a 15 dias úteis. O relógio começa quando o material chega, e eu te mando a lista do que preciso.'
  },
  {
    q: 'O que você precisa de mim?',
    a: 'O que você faz, pra quem, e o que te diferencia de quem está na mesma rua. Fotos suas, se tiver. Foto de banco todo mundo reconhece.'
  },
  {
    q: 'Depois de pronto, posso pedir alteração?',
    a: 'Pode. Duas rodadas já estão inclusas. Depois disso, eu passo o valor antes de mexer. Nenhuma cobrança que a gente não combinou.'
  },
  {
    q: 'Preciso comprar domínio e hospedagem?',
    a: 'Não pra começar. O site vai ao ar num link gratuito. Quando quiser o seunegocio.com.br, a gente resolve à parte, com o custo na mesa antes.'
  },
  {
    q: 'Já tenho site. Dá pra melhorar em vez de refazer?',
    a: 'Às vezes dá, e sai bem mais barato. Me manda o link. Já falei "não precisa refazer" pra quem veio querendo pagar.'
  },
  {
    q: 'Meu site apareceu no Google com páginas que eu não criei. Você resolve?',
    a: 'Resolvo. Backup, limpeza, troca de senhas, atualização do que estava aberto e pedido de revisão ao Google. Autorização por escrito e valor combinado antes. Você paga depois de conferir. Sua hospedagem também oferece isso: vale comparar.'
  }
]
