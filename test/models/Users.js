/* global before, describe, it, after */

const assert = require('assert');
const config = require('config');
const database = require('../../src/services/mongo');
const Users = require('../../src/models/Users');

let connection;

before('Connect to MongoDB', done => {
  database.connect(config.test.mongo.url)
  .then(db => {
    connection = db;
    Users.init(db);
    done();
  });
});

describe('hasEmail', () => {
  it(`returns 'missingProperty' error when there is no email`, () => {
    const email = undefined;
    return Users.hasEmail(email)
    .then(() => {throw new Error;})
    .catch(err => assert.equal('missingProperty', err.type));
  });

  it(`returns 'invalidProperty' error when there is an invalid email`, () => {
    const email = 'invalid';
    return Users.hasEmail(email)
    .then(() => {throw new Error;})
    .catch(err => assert.equal('invalidProperty', err.type));
  });

  it(`returns true  when there is a valid email`, () => {
    const email = 'test@wearereasonablepeople.com';
    return Users.hasEmail(email)
    .then(result => assert.equal(true, result));
  });
});

describe('hasPassword', () => {
  it(`returns 'missingProperty' error when there is no password`, () => {
    const password = undefined;
    return Users.hasPassword(password)
    .then(() => {throw new Error;})
    .catch(err => assert.equal('missingProperty', err.type));
  });

  it(`returns 'invalidProperty' error when the passwordhash is not 60 characters long`, () => {
    const password = 'invalidpassword';
    return Users.hasPassword(password)
    .then(() => {throw new Error;})
    .catch(err => assert.equal('invalidProperty', err.type));
  });

  it(`returns true when there is a valid password`, () => {
    const password = '$2a$10$KssILxWNR6k62B7yiX0GAe2Q7wwHlrzhF3LqtVvpyvHZf0MwvNfVu';
    return Users.hasPassword(password)
    .then(result => assert.equal(true, result));
  });
});

describe('hasName', () => {
  it(`returns 'missingProperty' error when there is no name`, () => {
    const name = undefined;
    return Users.hasName(name)
    .then(() => {throw new Error;})
    .catch(err => assert.equal('missingProperty', err.type));
  });

  it(`returns 'invalidProperty' error when there is an invalid name`, () => {
    const name = 'henk2';
    return Users.hasName(name)
    .then(() => {throw new Error;})
    .catch(err => assert.equal('invalidProperty', err.type));
  });

  it(`returns true when there is a valid name`, () => {
    const name = 'lars';
    return Users.hasName(name)
    .then(result => assert.equal(true, result));
  });
});

describe('doesNotExist', () => {
  it(`returns 'userAlreadyExists' error when there is an invalid email`, () => {
    const email = 'existing@test.com';
    return Users.doesNotExist(email)
    .then(() => {throw new Error;})
    .catch(err => assert.equal('userAlreadyExists', err.type));
  });

  it(`returns true when the email does not already exist`, () => {
    const email = 'notexisting@test.com';
    return Users.doesNotExist(email)
    .then(result => assert.equal(true, result));
  });
});

after('Close database connection', () => {
  connection.close();
});
