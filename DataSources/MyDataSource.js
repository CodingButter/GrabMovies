const { RESTDataSource } = require("apollo-datasource-rest");

class MyDataSource extends RESTDataSource {
  constructor({ base, key_name, key_value }) {
    super();
    this.baseURL = base;
    this.api = { key_name, key_value };
  }

  async get(params, endpoint = "") {
    let str = endpoint;
    if (this.api.key_name.length > 0) {
      str = `${endpoint}?${this.api.key_name}=${this.api.key_value}`;
    }
    for (var key in params) {
      if (str != "") {
        str += "&";
      }
      str += key + "=" + encodeURIComponent(params[key]);
    }
    return await super.get(str);
  }
}

module.exports = MyDataSource;
