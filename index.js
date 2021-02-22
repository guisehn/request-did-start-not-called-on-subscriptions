'use strict'

const { ApolloServer } = require('apollo-server')
const console = require('console')
const PORT = process.env.PORT || 3001
const schema = require('./schema')

const server = new ApolloServer({
  schema,

  plugins: [
    {
      requestDidStart (requestContext) {
        // skip introspection queries from log
        if (requestContext.request.query.indexOf('IntrospectionQuery') !== -1) {
          return {}
        }

        console.log('requestDidStart called')

        return {
          didEncounterErrors () {
            console.log('didEncounterErrors called')
          }
        }
      }
    }
  ]
})

server.listen({ port: PORT }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
})
