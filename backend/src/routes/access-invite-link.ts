import { z } from 'zod'
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

import { env } from '../env'
import { accessInviteLinkFn } from '../functions'

export const accessInviteLink: FastifyPluginAsyncZod = async (app) => {
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
          201: z.object({
            subscriberId: z.string(),
          }),
        },
      },
    },
    async (req, reply) => {
      const { subscriberId } = req.params

      await accessInviteLinkFn({ subscriberId })

      const redirectUrl = new URL(env.WEB_URL)

      redirectUrl.searchParams.set('referrer', subscriberId)

      return reply.redirect(redirectUrl.toString(), 302)
    },
  )
}
