const express = require('express');
const { ApolloServer } = require('apollo-server-express'); // ADDED: Import Apollo Server
const path = require('path');
const db = require('./config/connection');
// const routes = require('./routes');
const typeDefs = require('./schemas'); // ADDED: Import GraphQL type definitions
const resolvers = require('./schemas/resolvers'); // ADDED: Import GraphQL resolvers

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// app.use(routes);

// ADDED 22-30. Create an Apollo Server instance
const server = new ApolloServer({
  typeDefs, // Use imported type definitions
  resolvers, // Use imported resolvers
  context: ({ req }) => ({ req }), // Pass the req object to the context for authentication
});

// Apply Apollo Server as middleware
server.applyMiddleware({ app });

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});


// Modified this file. 