import { db } from '../drizzle/client'
import { subscriptions } from '../drizzle/schema'
import { redis } from '../redis/client'

type Params = {
  subscriberId: string
}

export const accessInviteLinkFn = async ({ subscriberId }: Params) => {
  await redis.hincrby('invites', subscriberId, 1)
}
