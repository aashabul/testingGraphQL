const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const port = process.env.PORT || 2000;

//construct a schema, using GraghQL's schema language
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

//provide resolver functions for our schema fields
const resolvers = {
  Query: {
    hello: () => "Hello World!",
  },
};

const app = express();

//apollo server setup
const server = new ApolloServer({ typeDefs, resolvers });

//appy the apollo graphql middleware and set the path to /api
server.applyMiddleware({ app, path: "/api" });
app.listen({ port }, () => {
  console.log(
    `GragpQL Server running at http://localhost:${port}${server.graphqlPath}`
  );
});
