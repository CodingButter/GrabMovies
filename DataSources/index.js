const OmdbAPI = require("./OmdbAPI");
const TmdbAPI = require("./TmdbAPI");
const TorrentSearch = require("./scrapers/TorrentSearch");
module.exports = (config) => () => {
  const omdbAPI = new OmdbAPI(config.omdb);
  const tmdbAPI = new TmdbAPI(config.tmdb);
  return {
    OmdbAPI: omdbAPI,
    TmdbAPI: tmdbAPI,
    TorrentSearch,
  };
};
