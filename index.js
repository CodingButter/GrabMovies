const { ApolloServer } = require("apollo-server");
const configs = require("./config.json");
const [typeDefs, resolvers, dataSources] = require("./GrabMovies")(configs);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
});

// The `listen` method launches a web server.
server.listen().then((resp) => {
  console.log(`🚀  Server ready at ${resp.url}`);
});
