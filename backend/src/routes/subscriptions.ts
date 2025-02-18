import { z } from 'zod'
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

export const subscriptions: FastifyPluginAsyncZod = async (app) => {
  app.post(
    '/subscriptions',
    {
      schema: {
        tags: ['Subscriptions'],
        summary: 'Subscribe to event',
        description: 'Subscribe user to event',
        body: z.object({
          name: z.string(),
          email: z.string().email(),
        }),
        response: {
          201: z.object({
            name: z.string(),
            email: z.string().email(),
          }),
        },
      },
    },
    async (req, reply) => {
      const { name, email } = req.body

      // criação da inscrição no banco de dados

      return reply.status(201).send({
        name,
        email,
      })
    },
  )
}
