const media_type = "movie";
module.exports = {
  movie: async (root, { id, title, year, imdb_id }, { dataSources }) => {
    var response;
    if (id) response = await dataSources.TmdbAPI.getMediaById(id, media_type);
    else if (imdb_id)
      response = await dataSources.TmdbAPI.getMediaByIMDBID(
        imdb_id,
        media_type
      );
    else if (title && year)
      response = await dataSources.TmdbAPI.getMediaByTitleYear(
        title,
        year,
        media_type
      );
    else if (title)
      response = await dataSources.TmdbAPI.getMediaByTitle(title, media_type);
    const omdbResponse = await dataSources.OmdbAPI.getMedia({
      title: response.title,
      year: response.year,
      imdb_id: response.imdb_id,
    });
    return { ...response, ...omdbResponse };
  },
  movieList: async (root, { search, page }, { dataSources }) => {
    return await dataSources.TmdbAPI.searchMedia(search, media_type, page);
  },
};
