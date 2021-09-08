const TorrentSearchApi = require("torrent-search-api");
const similarity = require("similarity");
const path = require("path");
const providerFullPath = path.join(__dirname, "./providers/");
TorrentSearchApi.loadProviders(providerFullPath);

module.exports.getTorrents = async ({ media_type, imdb_id, title, year }) => {
  switch (media_type) {
    case "tv":
      return await this.searchShow(title, year);
    default:
      return await this.searchMovie(title, year, imdb_id);
  }
};

module.exports.searchShow = async (title, year) => {
  TorrentSearchApi.enableProvider("Yts");
  TorrentSearchApi.enableProvider("ThePirateBay");
  TorrentSearchApi.enableProvider("KickassTorrents");
  TorrentSearchApi.enableProvider("Eztv");
  TorrentSearchApi.enableProvider("Torrent9");
  TorrentSearchApi.enableProvider("TorrentProject");
  TorrentSearchApi.enableProvider("Limetorrents");
  TorrentSearchApi.enableProvider("Nyaa");
  TorrentSearchApi.enableProvider("TorrentDownload");

  const query = `${title} ${year}`;
  const results = await TorrentSearchApi.search(query, "ALL", 500);
  results.sort((result1, result2) => {
    if (result1.size && result2.size) {
      var resSize1 = result1.size.replace(" MB", "");
      resSize1 = resSize1.replace(" GB", "0000");
      resSize1 = resSize1.replace(".", "");
      var resSize2 = result2.size.replace(" MB", "");
      resSize2 = resSize2.replace(" GB", "0000");
      resSize2 = resSize2.replace(".", "");

      return parseInt(resSize2) - parseInt(resSize1);
    } else return 1;
  });
  return await Promise.all(
    results
      .filter((torrent) => {
        return (
          parseInt(torrent.seeds) > 0 && similarity(torrent.title, query) > 0.2
        );
      })
      .map(async (result) => {
        if (result.magnet) return result;
        result.magnet = await TorrentSearchApi.getMagnet(result);
        return result;
      })
  );
};

module.exports.searchMovie = async (title, year, imdb_id) => {
  TorrentSearchApi.disableProvider("ThePirateBay");
  TorrentSearchApi.disableProvider("KickassTorrents");
  TorrentSearchApi.disableProvider("Eztv");
  TorrentSearchApi.disableProvider("Torrent9");
  TorrentSearchApi.disableProvider("TorrentProject");
  TorrentSearchApi.disableProvider("Limetorrents");
  TorrentSearchApi.disableProvider("Nyaa");
  TorrentSearchApi.disableProvider("TorrentDownload");
  TorrentSearchApi.enableProvider("Yts");
  var query = imdb_id;
  var results = await TorrentSearchApi.search(query, ["ALL"], 500);

  if (results.length == 0) {
    var query = `${title} ${year}`;
    var results = await TorrentSearchApi.search(query, ["ALL"], 500);
  }
  if (results.length == 0) {
    TorrentSearchApi.enableProvider("ThePirateBay");
    TorrentSearchApi.enableProvider("KickassTorrents");
    TorrentSearchApi.enableProvider("Eztv");
    TorrentSearchApi.enableProvider("Torrent9");
    TorrentSearchApi.enableProvider("TorrentProject");
    //TorrentSearchApi.enableProvider("Limetorrents");
    TorrentSearchApi.enableProvider("Nyaa");
    TorrentSearchApi.enableProvider("TorrentDownload");
    var results = await TorrentSearchApi.search(query, ["ALL"], 500);
  }
  return await Promise.all(
    results
      .filter((torrent) => {
        return parseInt(torrent.seeds) > 0;
      })
      .map(async (result) => {
        result.magnet = await TorrentSearchApi.getMagnet(result);
        return result;
      })
  );
};
