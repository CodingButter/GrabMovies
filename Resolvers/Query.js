module.exports = {
  Query: {
    media: async (
      root,
      { media_type = "movie", id, title, year, imdb_id },
      { dataSources }
    ) => {
      if (id) return await dataSources.TmdbAPI.getMediaById(id, media_type);
      else if (imdb_id)
        return await dataSources.TmdbAPI.getMediaByIMDBID(imdb_id, media_type);
      else if (title && year)
        return await dataSources.TmdbAPI.getMediaByTitleYear(
          title,
          year,
          media_type
        );
      else if (title)
        return await dataSources.TmdbAPI.getMediaByTitle(title, media_type);
    },
    mediaList: async (root, { search, media_type, page }, { dataSources }) => {
      return await dataSources.TmdbAPI.searchMedia(search, media_type, page);
    },
  },
};
