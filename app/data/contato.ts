// Fonte única dos dados de contato. Antes o número estava copiado em 7 arquivos,
// o que é jeito garantido de trocar em 6 e esquecer 1.

/** Formato exigido pelo wa.me: código do país + DDD + número, só dígitos. */
export const whatsappNumber = '5562981277721'

/** Como o número aparece escrito pra pessoa ler. */
export const whatsappDisplay = '+55 62 98127-7721'

export const email = 'victorkouichi40@gmail.com'

export const cidade = 'Goiânia, GO'

/**
 * Frase de disponibilidade. Estava escrita de três jeitos diferentes no
 * cabeçalho, no topo e no rodapé, o que faz a escassez soar inventada.
 * Mude aqui e muda em todos os lugares, inclusive no selo do /lab.
 */
export const disponibilidade = 'Aberto para 2 projetos este mês'

/** Monta o link do WhatsApp já com a primeira mensagem escrita. */
export function waLink(text?: string) {
  const base = `https://wa.me/${whatsappNumber}`
  return text ? `${base}?text=${encodeURIComponent(text)}` : base
}
