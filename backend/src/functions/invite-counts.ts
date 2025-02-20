import { db } from '../drizzle/client'
import { subscriptions } from '../drizzle/schema'
import { redis } from '../redis/client'

type Params = {
  subscriberId: string
}

export const inviteCounts = async ({ subscriberId }: Params) => {
  const count = await redis.zscore('referrals', subscriberId)

  return { count: count ? Number(count) : 0 }
}
