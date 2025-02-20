import { z } from 'zod'
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

import { env } from '../env'

import { accessInviteLink } from '../functions'

export const accessInviteLinkRoute: FastifyPluginAsyncZod = async (app) => {
  app.get(
    '/invites/:subscriberId',
    {
      schema: {
        tags: ['referral'],
        summary: 'Invite link',
        description: 'Access invite link and redirects user',
        params: z.object({
          subscriberId: z.string(),
        }),
        response: {
          302: z.null(),
        },
      },
    },
    async (req, reply) => {
      const { subscriberId } = req.params

      await accessInviteLink({ subscriberId })

      const redirectUrl = new URL(env.WEB_URL)

      redirectUrl.searchParams.set('referrer', subscriberId)

      return reply.redirect(redirectUrl.toString(), 302)
    },
  )
}
