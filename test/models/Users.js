/* global before, describe, it, after */

const assert = require('assert');
const config = require('config');
const database = require('../../src/services/mongo');
const Users = require('../../src/models/Users');
const jwt = require('../../src/services/jwt');

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

  it(`returns 'invalidProperty' error when the passwordis not according to format`, () => {
    const password = 'invalidpassword';
    return Users.hasPassword(password)
    .then(() => {throw new Error;})
    .catch(err => assert.equal('invalidProperty', err.type));
  });

  it(`returns true when there is a valid password`, () => {
    const password = 'Larslars123';
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

describe('hasId', () => {
  it(`returns 'missingProperty' error when there is no id`, () => {
    const id = undefined;
    return Users.hasId(id)
    .then(() => {throw new Error;})
    .catch(err => assert.equal('missingProperty', err.type));
  });

  it(`returns 'invalidProperty' error when there is an invalid id`, () => {
    const id = 'invalid';
    return Users.hasId(id)
    .then(() => {throw new Error;})
    .catch(err => assert.equal('invalidProperty', err.type));
  });

  it(`returns true  when there is a valid id`, () => {
    const id = '58c5622a434bd90a2d888a98';
    return Users.hasId(id)
    .then(result => assert.equal(true, result));
  });
});

describe('hasRole', () => {
  it(`returns 'missingProperty' error when there is no role`, () => {
    const role = undefined;
    return Users.hasRole(role)
    .then(() => {throw new Error;})
    .catch(err => assert.equal('missingProperty', err.type));
  });

  it(`returns 'invalidProperty' error when there is an invalid role`, () => {
    const role = 'invalid';
    return Users.hasRole(role)
    .then(() => {throw new Error;})
    .catch(err => assert.equal('invalidProperty', err.type));
  });

  it(`returns true when there is a valid role`, () => {
    const role = 'User';
    return Users.hasRole(role)
    .then(result => assert.equal(true, result));
  });
});

describe('hasToken', () => {
  it(`returns 'missingProperty' error when there is no token`, () => {
    const token = undefined;
    return Users.hasToken(token)
    .then(() => {throw new Error;})
    .catch(err => assert.equal('missingProperty', err.type));
  });

  it(`returns true  when there is a valid token`, () => {
    const token = jwt.sign('lars@lars.com', 'Lars');
    return Users.hasToken(token)
    .then(result => assert.equal(true, result));
  });
});

after('Close database connection', () => {
  connection.close();
});
