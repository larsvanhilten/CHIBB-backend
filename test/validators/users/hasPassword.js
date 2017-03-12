/* global  it */

const assert = require('assert');
const hasPassword = require('../../../src/validators/users/hasPassword');

it(`returns 'missingProperty' error when there is no password`, () => {
  const password = undefined;
  return hasPassword(password)
  .then(() => {throw new Error;})
  .catch(err => assert.equal('missingProperty', err.type));
});

it(`returns true when there is a valid password`, () => {
  const password = 'thisisavalidpassword123';
  return hasPassword(password)
  .then(result => assert.equal(true, result));
});
