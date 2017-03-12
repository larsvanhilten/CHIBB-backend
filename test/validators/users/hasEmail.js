/* global  it */

const assert = require('assert');
const hasEmail = require('../../../src/validators/users/hasEmail');

it(`returns 'missingProperty' error when there is no email`, () => {
  const email = undefined;
  return hasEmail(email)
  .then(() => {throw new Error;})
  .catch(err => assert.equal('missingProperty', err.type));
});

it(`returns 'invalidProperty' error when there is an invalid email`, () => {
  const email = 'invalid';
  return hasEmail(email)
  .then(() => {throw new Error;})
  .catch(err => assert.equal('invalidProperty', err.type));
});

it(`returns true  when there is a valid email`, () => {
  const email = 'test@wearereasonablepeople.com';
  return hasEmail(email)
  .then(result => assert.equal(true, result));
});
