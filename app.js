require('dotenv').config();
const express = require('express');
const app = express();
const url = require('url');
const { ApolloServer, gql } = require('apollo-server-express');
const StandingsService = require("./standings");
const fetch = require('node-fetch');
const axios = require('axios');

const uri = process.env.API_EXTERNAL_URI;

// Construct a schema, using GraphQL schema language
const typeDefs = gql`

type League {
  id: Int
  name: String
  created: String
  closed: Boolean
  max_entries: Int
  league_type: String
  scoring: String
  admin_entry: Int
  start_event: Int
  code_privacy: String
  rank: Int
}

type NewEntries {
  has_next: Boolean
  page: Int
  results: [Results]
}

type Results {
  id: Int,
  event_total: Int,
  player_name: String,
  rank: Int,
  last_rank: Int,
  rank_sort: Int,
  total: Int,
  entry: Int,
  entry_name: String
}

type InnerStandings {
  has_next: Boolean
  page: Int
  results: [Results]
}

type Standings {
  league: League
  new_entries: NewEntries
  standings: InnerStandings
}

type Query {
  standings: Standings
}
`;
 
// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    async standings() {
      const standings = await StandingsService.list();
      return standings.data;
    },
  },
};

// REST endpoint
app.get('/', async (req, res) => {
  await axios.get(uri, 
    { 
      headers: { 
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36",  
        Accept: "application/json; charset=UTF-8",
      }  
    })
    .then(function (response) {
      // handle success
      console.log(response.data);
      res.send(response.data)
    })
    .catch(error => res.send(error));
});

const PORT = process.env.PORT || 5050;
const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });
app.listen(PORT, () => {
  console.log(`Test server is listening on following url: localhost:${PORT}${server.graphqlPath}`);
})