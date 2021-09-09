# Grab Movies Schema

### A graphql API for getting movie data

## Install Dependencies

```cli
  $>yarn
  $>npm install
```

## Configure app

You will need to configure the various sources that are used here is the example config object

```json
{
  "omdb": {
    "base": "http://www.omdbapi.com/",
    "key_name": "apikey",
    "key_value": "<YOUR_API_KEY>"
  },
  "tmdb": {
    "base": "https://api.themoviedb.org/3/",
    "key_name": "api_key",
    "key_value": "<YOUR_API_KEY>"
  }
}
```

### Start Apollo Server

```cli
 $>yarn start
```

refer to the playground for the docs and schema

### Enjoy
