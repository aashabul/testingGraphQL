const depthLimit = require("graphql-depth-limit");
const { createComplexityLimitRule } = require("graphql-validation-complexity");
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const { ApolloServer } = require("apollo-server-express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const getUser = (token) => {
  if (token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      throw new Error("Session invalid");
    }
  }
};

const db = require("./db");
const models = require("./models");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

const port = process.env.PORT || 2000;
const DB_HOST = process.env.DB_HOST;

const app = express();
// app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    reportOnly: true,
  })
);
app.use(cors());

db.connect(DB_HOST);

//apollo server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
  validationRules: [depthLimit(5), createComplexityLimitRule(1000)],
  context: ({ req }) => {
    const token = req.headers.authorization;
    const user = getUser(token);
    console.log(user);
    return { models, user };
  },
});

//appy the apollo graphql middleware and set the path to /api
server.applyMiddleware({ app, path: "/api" });

app.listen({ port }, () => {
  console.log(
    `GragpQL Server running at http://localhost:${port}${server.graphqlPath}`
  );
});
