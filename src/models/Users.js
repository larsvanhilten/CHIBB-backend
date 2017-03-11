const db = require('../services/mongo').instance();
const collection = 'users';

exports.insertUser = (email, password, name) => {
  const doc = {
    email: email,
    password: password,
    name: name
  };

  return db.collection(collection).insertOne(doc);
};

exports.getUserById = id => db.collection(collection).findOne({_id: id});

exports.deleteUserById = id => db.collection(collection).findOneAndDelete({_id: id});


