import { z } from 'zod'
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { subscribeToEvent } from '../functions'

export const subscriptionsRoute: FastifyPluginAsyncZod = async (app) => {
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
          referrerId: z.string().nullish(),
        }),
        response: {
          201: z.object({
            subscriberId: z.string(),
          }),
        },
      },
    },
    async (req, reply) => {
      const { name, email, referrerId } = req.body

      const { subscriberId } = await subscribeToEvent({
        name,
        email,
        referrerId,
      })

      return reply.status(201).send({
        subscriberId,
      })
    },
  )
}
