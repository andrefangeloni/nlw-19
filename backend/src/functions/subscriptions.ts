import { eq } from 'drizzle-orm'

import { db } from '../drizzle/client'
import { subscriptions } from '../drizzle/schema'

type Params = {
  name: string
  email: string
}

export const subscribeToEvent = async ({ name, email }: Params) => {
  const subscribers = await db.select().from(subscriptions).where(eq(subscriptions.email, email))

  if (subscribers.length > 0) {
    return {
      subscriberId: subscribers[0].id,
    }
  }

  const result = await db.insert(subscriptions).values({ name, email }).returning()

  return {
    subscriberId: result[0].id,
  }
}
