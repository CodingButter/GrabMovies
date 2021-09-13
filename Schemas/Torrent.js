module.exports = `
"Torrent Info for the media"
type Torrent {
  "Number of active seeds"
  seeds: Int
  "Number of active peers"
  peers: Int
  "Size of the torrent contents"
  size: String
  "Torrent Site that provided the torrent"
  provider: String
  "Link to the torrent file"
  link: String
  "Magnet link to the torrent"
  magnet: String
  "Url to the torrent page"
  desc: String
  "Title of the torrent file"
  title: String
  "Time the torrent was created"
  time: String
  "Resolution of the torrent media content"
  quality: Int
}`;
