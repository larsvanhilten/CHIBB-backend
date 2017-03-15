const mongoClient = require('mongodb');

exports.connect = url => mongoClient.connect(url);
