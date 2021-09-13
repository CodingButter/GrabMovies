const { movie, movieList } = require("./Movie");

module.exports = `
type Query {
    ${movie}
    ${movieList}
}
schema {
    query: Query
}
`;
