import { db } from '../drizzle/client'
import { subscriptions } from '../drizzle/schema'
import { redis } from '../redis/client'

type Params = {
  subscriberId: string
}

export const inviteClicks = async ({ subscriberId }: Params) => {
  const count = await redis.hget('invites', subscriberId)

  return { count: count ? Number(count) : 0 }
}
