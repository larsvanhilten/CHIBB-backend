const config = require('config');
const mongoClient = require('mongodb');

module.exports = () => {
  let db = null;
  mongoClient.connect(config.mongo.url)
  .then(database => {
    db = database;
  });
  return db;
};
