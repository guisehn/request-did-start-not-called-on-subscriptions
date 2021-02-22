# request-did-start-not-called-on-subscriptions

This repository implements an Apollo GraphQL server with a query `testQuery` and a subscription `testSubscription`.

Both have an `@auth` directive that always throws error with the message `Not authorized`.

There is a plugin that implements `requestDidStart` and `didEncounterErrors` defined on `index.js`. It logs to the console
whenever any of these callbacks are called.

## How to install

Tested with node 14. Run `yarn` on this directory to install the dependencies.

Run the server with `PORT=3000 node index.js`

Open the GraphQL console at `http://localhost:3000/`

## Query works

If you run the query:

```
query {
  testQuery
}
```

You'll see both `requestDidStart called` and `didEncounterErrors called` on your console.

## Subscription doesn't work

If you run the subscription:

```
subscription {
  testSubscription
}
```

An error will be returned, but `requestDidStart` and `didEncounterErrors` callbacks are never called.