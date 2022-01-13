import {ApolloServerPluginDrainHttpServer} from 'apollo-server-core'
import {ApolloServer} from 'apollo-server-express'
import config from 'config'
import express from 'express'
import {GraphQLError} from 'graphql'
import http from 'http'
import {connectMongoDB} from './db/mongodb'
import {mainSchema} from './src/schema-loader'

const port = config.get('port') || 5000

const app = express()
const httpServer = http.createServer(app)

const formatError = (error: GraphQLError) => {
  console.log(error)
  const apiError: any = error.originalError
  return {
    message: apiError.message,
    status: 500
  }
}
const server = new ApolloServer({
  schema: mainSchema,
  context: () => {
    return {message: 'This is context used by all resolvers'}
  },
  formatError,
  plugins: [ApolloServerPluginDrainHttpServer({httpServer})]
})

const startApolloServer = async () => {
  await server.start()
  server.applyMiddleware({app})
  httpServer.listen({port})
  connectMongoDB()
  console.log(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
  )
}

startApolloServer()
