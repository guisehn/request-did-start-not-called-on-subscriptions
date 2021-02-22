'use strict'

const { gql } = require('apollo-server')
const { SchemaDirectiveVisitor } = require('graphql-tools')

class AuthDirective extends SchemaDirectiveVisitor {
  static getDeclaration () {
    return gql`
      directive @auth on FIELD_DEFINITION
    `
  }

  visitFieldDefinition (field) {
    field.resolve = () => { throw new Error('Not authorized') }
    field.subscribe = () => { throw new Error('Not authorized') }
  }
}

module.exports = AuthDirective
