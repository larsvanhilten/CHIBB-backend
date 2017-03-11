const config = require('config');
const mongoClient = require('mongodb');

let database = null;

exports.connect = () => {
  mongoClient.connect(config.mongo.url, (err, db) => {
    database = db;
  });
};

exports.instance = () => database;
