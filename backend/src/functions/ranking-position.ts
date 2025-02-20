import { redis } from '../redis/client'

type Params = {
  subscriberId: string
}

export const rankingPosition = async ({ subscriberId }: Params) => {
  const rank = await redis.zrevrank('referrals', subscriberId)

  if (rank === null) {
    return { position: null }
  }

  return {
    position: rank + 1,
  }
}
