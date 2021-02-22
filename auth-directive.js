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
    const wrapper = originalFunction => {
      return async function (...args) {
        // Throws 'Not authorized' error for every query/mutation/subscription that
        // uses this directive.
        throw new Error('Not authorized')
      }
    }

    const wrapProperty = (name, fn) => {
      const originalFunction = field[name]
      if (originalFunction) {
        field[name] = fn(originalFunction)
      }
    }

    // wrap field.resolve so that it applies the directive to queries and mutations
    wrapProperty('resolve', wrapper)

    // wrap field.subscribe so that it applies the directive to subscriptions
    wrapProperty('subscribe', wrapper)
  }
}

module.exports = AuthDirective
