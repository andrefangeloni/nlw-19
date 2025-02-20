import { z } from 'zod'
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

import { inviteCounts, rankingPosition } from '../functions'

export const rankingPositionRoute: FastifyPluginAsyncZod = async (app) => {
  app.get(
    '/subscribers/:subscriberId/ranking/position',
    {
      schema: {
        tags: ['Referral'],
        summary: 'Ranking position',
        description: 'Get subscriber ranking position',
        params: z.object({
          subscriberId: z.string(),
        }),
        response: {
          200: z.object({
            position: z.number().nullable(),
          }),
        },
      },
    },
    async (req) => {
      const { subscriberId } = req.params

      const { position } = await rankingPosition({ subscriberId })

      return {
        position,
      }
    },
  )
}
