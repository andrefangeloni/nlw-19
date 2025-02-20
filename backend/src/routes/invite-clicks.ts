import { z } from 'zod'
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

import { inviteClicks } from '../functions'

export const inviteClicksRoute: FastifyPluginAsyncZod = async (app) => {
  app.get(
    '/subscribers/:subscriberId/ranking/clicks',
    {
      schema: {
        tags: ['referral'],
        summary: 'Invite clicks',
        description: 'Get subscriber invite clicks count',
        params: z.object({
          subscriberId: z.string(),
        }),
        response: {
          200: z.object({
            count: z.number(),
          }),
        },
      },
    },
    async (req) => {
      const { subscriberId } = req.params

      const { count } = await inviteClicks({ subscriberId })

      return {
        count,
      }
    },
  )
}
