const express = require("express");
const { ApolloServer } = require("apollo-server-express");
require("dotenv").config();

const db = require("./db");
const models = require("./models");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

const port = process.env.PORT || 2000;
const DB_HOST = process.env.DB_HOST;

const app = express();

db.connect(DB_HOST);

//apollo server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => {
    return { models };
  },
});

//appy the apollo graphql middleware and set the path to /api
server.applyMiddleware({ app, path: "/api" });

app.listen({ port }, () => {
  console.log(
    `GragpQL Server running at http://localhost:${port}${server.graphqlPath}`
  );
});
