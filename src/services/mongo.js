const config = require('config');
const mongoClient = require('mongodb');

let database = null;

exports.connect = () => new Promise((resolve, reject) => {
  mongoClient.connect(config.server.mongo.url, (err, db) => {
    if(err) {
      reject();
    }
    database = db;
    resolve();
  });
});

exports.instance = () => database;
