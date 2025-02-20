import { inArray } from 'drizzle-orm'
import { subscriptions } from '../drizzle/schema'
import { redis } from '../redis/client'
import { db } from '../drizzle/client'

export const getRanking = async () => {
  const ranking = await redis.zrevrange('referrals', 0, 2, 'WITHSCORES')

  const subscriberIdAndScore = ranking.reduce<Record<string, number>>((acc, value, index, array) => {
    if (index % 2 === 0) {
      acc[value] = Number(array[index + 1])
    }

    return acc
  }, {})

  const subscribers = await db
    .select()
    .from(subscriptions)
    .where(inArray(subscriptions.id, Object.keys(subscriberIdAndScore)))

  const rankingWithScore = subscribers
    .map((subscriber) => ({
      id: subscriber.id,
      name: subscriber.name,
      score: subscriberIdAndScore[subscriber.id],
    }))
    .sort((a, b) => b.score - a.score)

  return {
    ranking: rankingWithScore,
  }
}
