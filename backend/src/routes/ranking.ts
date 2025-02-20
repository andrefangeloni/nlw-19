import { z } from 'zod'
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

import { getRanking } from '../functions'

export const rankingRoute: FastifyPluginAsyncZod = async (app) => {
  app.get(
    '/ranking',
    {
      schema: {
        tags: ['Referral'],
        summary: 'Get Ranking',
        description: 'Get top 3 subscribers',
        response: {
          200: z.object({
            ranking: z.array(
              z.object({
                id: z.string(),
                name: z.string(),
                score: z.number(),
              }),
            ),
          }),
        },
      },
    },
    async () => {
      const { ranking } = await getRanking()

      return {
        ranking,
      }
    },
  )
}
