import fastify from 'fastify'
import { fastifyCors } from '@fastify/cors'
import { validatorCompiler, serializerCompiler, ZodTypeProvider, jsonSchemaTransform } from 'fastify-type-provider-zod'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'

import { env } from './env'

import {
  subscriptionsRoute,
  accessInviteLinkRoute,
  inviteClicksRoute,
  inviteCountsRoute,
  rankingPositionRoute,
  rankingRoute,
} from './routes'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifyCors, {
  origin: true, // passar a URL do front só pra ele conseguir fazer as requisicoes
})

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'NLW Connect',
      description: 'API do NLW Connect',
      version: '0.0.1',
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

app.register(subscriptionsRoute)
app.register(accessInviteLinkRoute)
app.register(inviteClicksRoute)
app.register(inviteCountsRoute)
app.register(rankingPositionRoute)
app.register(rankingRoute)

app.listen({ port: env.PORT }).then(() => {
  console.log(`🚀 HTTP server running on PORT: ${env.PORT}`)
})
