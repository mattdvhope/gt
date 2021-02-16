const { ApolloClient } = require("apollo-client")
const { InMemoryCache } = require("apollo-cache-inmemory")
const { split } = require('apollo-link')
const { HttpLink } = require("apollo-link-http")
const { WebSocketLink } = require("apollo-link-ws")
const { getMainDefinition } = require("apollo-utilities")
const fetch = require("node-fetch")
const gql = require("graphql-tag")
const WebSocket = require("ws")

const LINK_NODE_TYPE = `Link`

const client = new ApolloClient({
  link: split(
    ({ query }) => {
      const definition = getMainDefinition(query)
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      )
    },
    new WebSocketLink({
      uri: `ws://localhost:3000/graphql`, // or `ws://gatsby-source-plugin-api.glitch.me/`,
      options: {
        reconnect: true,
      },
      webSocketImpl: WebSocket,
    }),
    new HttpLink({
      uri: `http://localhost:3000/graphql`, // or `https://gatsby-source-plugin-api.glitch.me/`,
      fetch,
    })
  ),
  cache: new InMemoryCache(),
})

exports.sourceNodes = async ({
  actions,
  createContentDigest,
  createNodeId,
  getNodesByType,
}) => {
  const { createNode } = actions

  const { data } = await client.query({
    query: gql`
      query {
        links {
          id
          url
          description
        }
      }
    `,
  })

  // loop through data and create Gatsby nodes
  data.links.forEach(link =>
    createNode({
      ...link,
      id: createNodeId(`${LINK_NODE_TYPE}-${link.id}`), // hashes the inputs into an ID
      parent: null,
      children: [],
      internal: {
        type: LINK_NODE_TYPE,
        content: JSON.stringify(link),
        contentDigest: createContentDigest(link),
      },
    })
  )

  return
}