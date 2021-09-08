const configs = require("../config.json");
const OmdbAPI = require("./OmdbAPI");
const TmdbAPI = require("./TmdbAPI");
const TorrentSearch = require("./scrapers/TorrentSearch");
module.exports = (config) => () => {
  return {
    OmdbAPI: new OmdbAPI(configs.omdb),
    TmdbAPI: new TmdbAPI(configs.tmdb),
    TorrentSearch,
  };
};
