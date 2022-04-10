const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const resolvers = require("./resolvers");
const typeDefs = require("./typeDefs");
const User = require("./models/User.model");
require("dotenv").config();

const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.SECRET;

const MONGODB_URI = `${process.env.MONGODB_URI}`;

console.log("connecting to", MONGODB_URI);

let currentUser = ""

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith("bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
      currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});

module.exports = { currentUser };
