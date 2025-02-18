import { db } from '../drizzle/client'
import { subscriptions } from '../drizzle/schema'

type Params = {
  name: string
  email: string
}

export const subscribeToEvent = async ({ name, email }: Params) => {
  const result = await db.insert(subscriptions).values({ name, email }).returning()

  return {
    subscriberId: result[0].id,
  }
}
