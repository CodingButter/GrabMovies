const Media = require("./Media");
const Query = require("./Query");
const resolvers = { ...Media, ...Query };
module.exports = resolvers;
