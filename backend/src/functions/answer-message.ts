import { generateText } from 'ai'

import { openai } from '../ai'
import { postgresTool, redisTool } from '../ai/tools'

type Params = {
  message: string
}

export const answerMessage = async ({ message }: Params) => {
  const { text } = await generateText({
    model: openai,
    prompt: message,
    tools: {
      postgresTool,
      redisTool,
    },
    system: `
      Você é um assistente de IA responsável por responder dúvidas sobre um evento de programação.
      Inclua na resposta somente o que o usuário pediu, sem nenhum texto adicional.
      O retorno deve ser sempre em markdown (sem incluir \`\`\ no início ou no fim).
    `.trim(),
    maxSteps: 5,
  })

  return {
    response: text,
  }
}
