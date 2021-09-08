module.exports = `
type ImageSet {
    id: Int
    backdrops: [Image]
    posters: [Image]
}

type ImagePath {
    small: String
    medium: String
    large: String
    original: String
}

type Image {
    aspect_ratio: Int
    file_path: ImagePath
    height: Int
    iso_639_1: String
    vote_average: Int
    vote_count: Int
    width: Int
}
  `;
