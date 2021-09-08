module.exports = `
type AlternativeTitle {
    iso_3166_1: String
    title: String
    type: String
}

type Collection {
    id: Int
    name: String
    poster_path: String
    backdrop_path: String
}

type Country {
    iso_639_1: String
    name: String
}

type Genre {
    id: Int
    name: String
}

type Language {
    iso_3166_1: String
    name: String
}

type ProductionCompany {
    id: Int
    logo_path: String
    name: String
    origin_country: String
}

type StreamSource {
    path: String
    source_type: String
    qualities: [String]
}
  
type Video {
    id: Int
    iso_639_1: String
    iso_3166_1: String
    key: String
    name: String
    site: String
    size: Int
    type: String
}
`;
