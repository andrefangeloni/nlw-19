import { z } from 'zod'
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

import { answerMessage } from '../functions'

export const sendMessageRoute: FastifyPluginAsyncZod = async (app) => {
  app.post(
    '/messages',
    {
      schema: {
        tags: ['Messages'],
        summary: 'Send message',
        description: 'Send message to AI chat',
        body: z.object({
          message: z.string(),
        }),
        response: {
          200: z.object({
            response: z.string(),
          }),
        },
      },
    },
    async (req, reply) => {
      const { message } = req.body

      const { response } = await answerMessage({ message })

      return {
        response,
      }
    },
  )
}
