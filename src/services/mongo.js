const mongoClient = require('mongodb');

let database = null;

exports.connect = url => new Promise((resolve, reject) => {
  mongoClient.connect(url, (err, db) => {
    if(err) {
      reject();
    }
    database = db;
    resolve();
  });
});

exports.instance = () => database;
