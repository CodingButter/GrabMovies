const { gql } = require("apollo-server-express");
const convert = require("graphql-to-json-converter");
const Details = require("./Details");
const Episode = require("./Episode");
const Image = require("./Image");
const Movie = require("./Movie");
const Person = require("./Person");
const Season = require("./Season");
const Torrent = require("./Torrent");
const Query = require("./Queries");

const typeDefinition = [
  Details,
  Episode,
  Image,
  Movie,
  Person,
  Season,
  Torrent,
  Query,
].join("\n");

module.exports.typeDefs = gql(typeDefinition);
module.exports.jsonDefs = convert(typeDefinition);
