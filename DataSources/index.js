const OmdbAPI = require("./OmdbAPI");
const TmdbAPI = require("./TmdbAPI");
const TorrentSearch = require("./scrapers/TorrentSearch");
module.exports = (config) => () => {
  return {
    OmdbAPI: new OmdbAPI(config.omdb),
    TmdbAPI: new TmdbAPI(config.tmdb),
    TorrentSearch,
  };
};
