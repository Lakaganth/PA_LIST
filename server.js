const { ApolloServer } = require("apollo-server-express");
const { MemcachedCache } = require("apollo-server-cache-memcached");
const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: "variables.env" });
const path = require("path");
const mongoose = require("mongoose");
const typeDefs = require("./graphQL/typeDefs");
const resolvers = require("./graphQL/resolvers");

const app = express();

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log("DB connected"))
  .catch(err => console.error(err));

app.use(cors("*"));

const schema = new ApolloServer({
  typeDefs,
  resolvers,
  persistedQueries: {
    cache: new MemcachedCache(
      ["memcached-server-1", "memcached-server-2", "memcached-server-3"],
      { retries: 10, retry: 10000 } // Options
    )
  },
  playground: {
    endpoint: "/graphql",
    settings: {
      "editor.theme": "dark"
    }
  }
});

schema.applyMiddleware({ app });

//   Production

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
