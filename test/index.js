/* global  describe, before */

const config = require('config');
const database = require('../src/services/mongo');
const fixtures = require('../fixtures');

const importTest = (name, path) => {
  describe(name, () => {
    require(path);
  });
};

const cleanup = db => {
  db.dropDatabase('chibb-test')
  .catch(err => {console.error(err);});
  db.close();
};

before('Set up fixtures', done => {
  database.connect(config.test.mongo.url)
  .then(db => {
    process.on('exit', () => cleanup(db));
    process.on('SIGINT', () => cleanup(db));
    process.on('SIGTERM', () => cleanup(db));
    Promise.all([
      fixtures.insertUsers(db)
    ])
    .then(() => done())
    .catch(err => {console.error(err);});
  })
  .catch(err => {console.error(err);});
});

describe('Models', () => {
  importTest('Users', './models/Users');

});
