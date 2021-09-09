module.exports = (config) => [
  require("./Schemas").typeDefs,
  require("./Resolvers"),
  require("./DataSources")(config),
];
