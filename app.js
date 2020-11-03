require('dotenv').config();
const express = require('express');
const app = express();
const url = require('url');
const { ApolloServer, gql } = require('apollo-server-express');
const StandingsService = require("./standings");

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    standings: String
  }
`;
 
// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    async standings() {
      const standings = await StandingsService.list();
      return standings;
    },
  },
};

app.get('/', (req, res) => {
  res.send('API working')
});

const PORT = process.env.PORT || 5050;
const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });
app.listen(PORT, () => {
  console.log(`Test server is listening on following url: localhost:${PORT}${server.graphqlPath}`);
})