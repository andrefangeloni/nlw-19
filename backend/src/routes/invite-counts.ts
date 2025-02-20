import { z } from 'zod'
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

import { inviteCounts } from '../functions'

export const inviteCountsRoute: FastifyPluginAsyncZod = async (app) => {
  app.get(
    '/subscribers/:subscriberId/ranking/counts',
    {
      schema: {
        tags: ['Referral'],
        summary: 'Invite counts',
        description: 'Get subscriber invites count',
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

      const { count } = await inviteCounts({ subscriberId })

      return {
        count,
      }
    },
  )
}
