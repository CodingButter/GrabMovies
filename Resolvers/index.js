const Movie = require("./Movie");
const Query = require("./Queries");
const resolvers = { ...Movie, ...Query };
module.exports = resolvers;
