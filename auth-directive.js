'use strict'

const { SchemaDirectiveVisitor } = require('graphql-tools')

class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition (field) {
    field.resolve = () => { throw new Error('Not authorized') }
    field.subscribe = () => { throw new Error('Not authorized') }
  }
}

module.exports = AuthDirective
