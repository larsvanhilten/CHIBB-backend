const mongoClient = require('mongodb');

// Connect with MongoDB
exports.connect = url => mongoClient.connect(url);

