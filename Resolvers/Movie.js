const { jsonDefs } = require("../Schemas");
const media_type = "movie";

const movieResolver = {};
Object.keys(jsonDefs.type.Movie).forEach((key) => {
  movieResolver[key] = async (root, params, { dataSources }) => {
    if (root[key]) return root[key];
    const media = await dataSources.TmdbAPI.getMediaById(root.id, media_type);
    return media[key];
  };
});

const tediumResolvers = {
  backdrop: async (
    { id, media_type, backdrop_path },
    params,
    { dataSources }
  ) => {
    if (!backdrop_path) {
      const media = dataSources.TmdbAPI.getMediaById(id, media_type);
      return await dataSources.TmdbAPI.getImageSizes(
        media.backdrop_path,
        "backdrop"
      );
    }
    return await dataSources.TmdbAPI.getImageSizes(backdrop_path, "backdrop");
  },
  imdb_id: async ({ id, imdb_id, title, year }, params, { dataSources }) => {
    var media;
    if (imdb_id) return imdb_id;
    media = await dataSources.TmdbAPI.getMediaById(id, media_type);
    if (!media.imdb_id) {
      const { imdbID } = await dataSources.OmdbAPI.getMedia(title, year);
      return imdbID;
    }
    return media.imdb_id;
  },
  language: async (
    { imdb_id, title, year, language },
    params,
    { dataSources }
  ) => {
    if (language) return language.split(",");
    const media = dataSources.OmdbAPI.getMedia({ imdb_id, title, year });
    return media.language.split(",");
  },
  media_type: () => {
    return media_type;
  },
  plot: async ({ imdb_id, title, year, plot }, params, { dataSources }) => {
    if (plot) return plot;
    const media = await dataSources.OmdbAPI.getMedia({ title, year, imdb_id });
    return media.plot;
  },

  poster: async ({ poster_path }, params, { dataSources }) => {
    return await dataSources.TmdbAPI.getImageSizes(poster_path, "poster");
  },
  seasons: async ({ seasons }, params, { dataSources }) => {},
  spoken_languages: async (
    { id, spoken_languages },
    params,
    { dataSources }
  ) => {
    if (spoken_languages) return spoken_languages.map((lang) => lang.name);
    const media = await dataSources.TmdbAPI.getMediaById(id, media_type);
    return media.spoken_languages.map((lang) => lang.name);
  },

  torrents: async (root, params, { dataSources }) => {
    var definition = {
      media_type: media_type,
      imdb_id: root.imdb_id,
      title: root.title,
      year: root.year,
    };
    if (root.imdb_id && root.title && root.year)
      return await dataSources.TorrentSearch.getTorrents(definition);
    if (!root.imdb_id) {
      const media = await dataSources.TmdbAPI.getMediaById(root.id, media_type);
      definition.imdb_id = media.imdb_id;
      if (!media.imdb_id) {
        const omdb = await dataSources.OmdbAPI.getMedia({
          title: root.title,
          year: root.year,
        });
        definition.imdb_id = omdb.imdbID;
      }
    }
    if (!definition.imdb_id || !definition.title || !definition.year) return [];
    return await dataSources.TorrentSearch.getTorrents(definition);
  },
};

module.exports = {
  MovieList: {
    page: async ({ page }) => {
      return page;
    },
    results: async ({ results }) => {
      return results;
    },
    total_results: async ({ total_results }) => {
      return total_results;
    },
    total_pages: async ({ total_pages }) => {
      return total_pages;
    },
    media_type: () => {
      return media_type;
    },
  },

  Movie: Object.assign(movieResolver, tediumResolvers),
};
