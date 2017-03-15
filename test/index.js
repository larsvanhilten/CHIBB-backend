/* global  describe, before, req */

const config = require('config');
const db = require('../src/services/mongo');
const Users = require('../src/models/Users');

const importTest = (name, path) => {
  describe(name, () => {
    require(path)();
  });
};

describe('Validators', () => {

  before('connect to MongoDB', done => {
    db.connect(config.server.mongo.url)
    .then(db => {
      req.users = new Users(db);
      done();
    });
  });

  describe('users', () => {
    importTest('hasEmail', './validators/users/hasEmail');
    importTest('hasName', './validators/users/hasName');
    importTest('hasPassword', './validators/users/hasPassword');
    importTest('doesNotExist', './validators/users/doesNotExist');
  });
});


