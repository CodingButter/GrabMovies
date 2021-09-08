# Grab Movies Schema
### A Schema to add to your apollo server that gets movie and tv show data.


## Requirements

This can be added stand alone or merged with your current schemas 
refer to [Graphql-Tools Schema Mergin](https://www.graphql-tools.com/docs/schema-merging/)

## Install
### yarn
    $ yarn add grab-movies-gql-schema 
### npm
    $ npm install grab-movies-gql-schema

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
## Usage

```javascript
const { ApolloServer } = require("apollo-server");
const configs = require("./config.json");
const [typeDefs, resolvers, dataSources] = require("grab-movies-gql-schema")(configs);

//Make Sure to Merge Schemas if you have other Schemas for your server

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
});

// The `listen` method launches a web server.
server.listen().then((resp) => {
console.log(`🚀  Server ready at ${resp.url}`);
});

```
