module.exports = `
type MediaList {
    page: Int
    results: [Media]
    total_results: Int
    total_pages: Int
  }
  type Media {
    adult: Boolean
    backdrop: ImagePath
    belongs_to_collection: Collection
    budget: Int
    genre: [Genre]
    homepage: String
    id: Int
    imdb_id: String
    media_type: String
    original_language: String
    original_title: String
    overview: String
    popularity: Float
    poster: ImagePath
    production_companies: [ProductionCompany]
    production_countries: [Country]
    release_date: String
    revenue: Int
    runtime: String
    spoken_languages: [Language]
    status: String
    tagline: String
    title: String
    video: Boolean
    vote_average: Float 
    vote_count: Int
  
    year: Int
    rated: String
    directors: [Person]
    writers: [Person]
    cast: [Person]
    plot: String
    country: Country
    awards: [String]
    metascore: Int
    imdbRating: Float
    imdbVotes: Int
    type: String
    dvd: String
    boxOffice: String
    response: Boolean
    images: ImageSet
    videos: [Video]
    torrents(min_quality: String, min_seed: Int, languages: String): [Torrent]
    Seasons:[Season]
    Staring: [Person]
    alternative_titles: [AlternativeTitle]
  }`;
