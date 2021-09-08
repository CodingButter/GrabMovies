const MyDataSource = require("./MyDataSource");

class TmdbAPI extends MyDataSource {
  constructor(config) {
    super(config);
  }
  async getConfig() {
    if (!this.config) return await super.get({}, "configuration");
    return this.config;
  }
  async get(params, endpoint) {
    if (!this.config) await this.getConfig();
    var response = await super.get(params, endpoint);
    if (response.results) response.results = this._normalize(response.results);
    if (response.id) response = this._normalize(response);
    return response;
  }
  async getMediaById(id, media_type) {
    return await this.get({}, `${media_type}/${id}`);
  }
  async getMediaByIMDBID(imdb_id, media_type) {
    const response = await this.get(
      { external_source: "imdb_id" },
      `find/${imdb_id}`
    );
    var results = response[`${media_type}_results`];
    return await this.getMediaById(results[0].id);
  }
  //Main Functions for getting Media Data
  async findByExternalID(external_source, external_id) {
    return await this.get({ external_source }, "find/" + external_id);
  }

  async getMediaByTitle(_title = "The Matrix", media_type = "movie") {
    const { results } = await this.get(
      { query: _title },
      `search/${media_type}`
    );
    const { id } = await results[0];
    return await this.getMediaById(id, media_type);
  }
  async getMediaByTitleYear(_title = "The Matrix", year, media_type = "movie") {
    const { results } = await this.get(
      { query: _title, year },
      `search/${media_type}`
    );
    const { id } = await results[0];
    return await this.getMediaById(id, media_type);
  }

  async searchMedia(query = "The Matrix", media_type = "movie", page = 1) {
    const response = await this.get({ query, page }, `search/${media_type}`);
    return await response;
  }

  async getImagesByMovieId(id) {}

  async getImageSizes(path, image_type) {
    const config = await this.getConfig();
    const sizes = await config.images[`${image_type}_sizes`];
    return {
      small: `${config.images.base_url}${sizes[0]}${path}`,
      medium: `${config.images.base_url}${sizes[1]}${path}`,
      large: `${config.images.base_url}${sizes[2]}${path}`,
      original: `${config.images.base_url}${sizes[0]}${path}`,
    };
  }
  _normalize(result) {
    if (Array.isArray(result)) return result.map((res) => this._normalize(res));
    result.title = result.title || result.name;
    const dateSplit = result.release_date
      ? result.release_date.split("-")
      : result.first_air_date.split("-");
    result.year = dateSplit[0] || null;
    result.media_type = result.first_air_date ? "tv" : "movie";
    if (result.seasons) {
      result.seasons = result.seasons.map((season) => this._normalize(season));
    }
    return result;
  }
}

String.prototype.toArray = function () {
  return this.split(",").map((item) => item.trim());
};

module.exports = TmdbAPI;
