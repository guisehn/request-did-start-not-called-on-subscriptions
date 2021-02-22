'use strict'

const { makeExecutableSchema } = require('graphql-tools')

const { PubSub, gql } = require('apollo-server')
const pubsub = new PubSub()

const AuthDirective = require('./auth-directive')

const typeDefs = gql`
  directive @auth on FIELD_DEFINITION

  type Query {
    testQuery: String @auth
  }

  type Subscription {
    testSubscription: String @auth
  }

  schema {
    query: Query
    subscription: Subscription
  }
`

const resolvers = {
  Query: {
    testQuery: () => 'ok'
  },
  Subscription: {
    testSubscription: {
      subscribe: () => pubsub.asyncIterator(['SOMETHING'])
    }
  }
}

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers,
  schemaDirectives: { auth: AuthDirective }
})
