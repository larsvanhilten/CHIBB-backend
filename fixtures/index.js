
exports.insertUsers = db => {
  const users = require('./users');
  return db.collection('users').insertMany(users);
};
