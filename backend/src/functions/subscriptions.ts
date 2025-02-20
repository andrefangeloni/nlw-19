import { eq } from 'drizzle-orm'

import { db } from '../drizzle/client'
import { subscriptions } from '../drizzle/schema'
import { redis } from '../redis/client'

type Params = {
  name: string
  email: string
  referrerId?: string | null
}

export const subscribeToEvent = async ({ name, email, referrerId }: Params) => {
  const subscribers = await db.select().from(subscriptions).where(eq(subscriptions.email, email))

  if (subscribers.length > 0) {
    return {
      subscriberId: subscribers[0].id,
    }
  }

  const result = await db.insert(subscriptions).values({ name, email }).returning()

  if (referrerId) {
    await redis.zincrby('referrals', 1, referrerId)
  }

  return {
    subscriberId: result[0].id,
  }
}
