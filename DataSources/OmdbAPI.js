const MyDataSource = require("./MyDataSource");

class OmdbAPI extends MyDataSource {
  constructor(config) {
    super(config);
  }

  async getMedia({ title, year, imdb_id }) {
    var response;
    if (imdb_id) response = await this.get({ i: imdb_id });
    else response = await this.get({ t: title, y: year });
    const lowerKeys = {};
    Object.keys(response).forEach((key) => {
      lowerKeys[key.toLowerCase()] = response[key];
    });
    return lowerKeys;
  }
}

module.exports = OmdbAPI;
