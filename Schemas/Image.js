module.exports = `
type ImageSet {
    id: Int
    backdrops: [Image]
    posters: [Image]
}

type ImagePaths {
    small: String
    medium: String
    large: String
    original: String
}

type Image {
    aspect_ratio: Int
    file_path: ImagePaths
    height: Int
    iso_639_1: String
    vote_average: Int
    vote_count: Int
    width: Int
}
  `;
