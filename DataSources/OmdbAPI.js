const MyDataSource = require("./MyDataSource");

class OmdbAPI extends MyDataSource {
  constructor(config) {
    super(config);
  }

  async getMovieByTitleYear(title, year) {
    return await this.get({ t: title, y: year });
  }
}

module.exports = OmdbAPI;
