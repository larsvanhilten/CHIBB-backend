/* global  it */

const assert = require('assert');
const doesNotExist = require('../../../src/validators/users/doesNotExist');

it(`returns 'userAlreadyExists' error when there is an invalid email`, () => {
  const email = 'existing@test.com';
  return doesNotExist(email)
  .then(() => {throw new Error;})
  .catch(err => assert.equal('userAlreadyExists', err.type));
});

it(`returns true when the email does not already exist`, () => {
  const email = 'notexisting@test.com';
  return doesNotExist(email)
  .then(result => assert.equal(true, result));
});
