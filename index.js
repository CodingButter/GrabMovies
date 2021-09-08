module.exports = (config) => [
  require("./Schema").typeDefs,
  require("./Resolvers"),
  require("./DataSources")(config),
];
