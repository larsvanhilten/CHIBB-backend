/* global  describe */

const config = require('config');
const db = require('../src/services/mongo');

db.connect(config.server.mongo.url)
.then(() => {
  console.log('connected');
})
// eslint-disable-next-line no-console
.catch(() => console.error('Error connecting to database'));

const importTest = (name, path) => {
  describe(name, () => {
    require(path);
  });
};

describe('Validators', () => {
  describe('users', () => {
    importTest('hasEmail', './validators/users/hasEmail');
    importTest('hasName', './validators/users/hasName');
    importTest('hasPassword', './validators/users/hasPassword');
    importTest('doesNotExist', './validators/users/doesNotExist');
  });
});


