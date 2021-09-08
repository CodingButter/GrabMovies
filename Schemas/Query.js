module.exports = `type Query {
    media(imdb_id: String, title: String, year:Int, id: Int, media_type: String): Media
    mediaList(search: String, media_type: String, page: Int): MediaList
}
schema {
    query: Query
}
`;
