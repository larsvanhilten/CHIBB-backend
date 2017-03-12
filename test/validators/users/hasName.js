/* global  it */

const assert = require('assert');
const hasName = require('../../../src/validators/users/hasName');

it(`returns 'missingProperty' error when there is no name`, () => {
  const name = undefined;
  return hasName(name)
  .then(() => {throw new Error;})
  .catch(err => assert.equal('missingProperty', err.type));
});

it(`returns 'invalidProperty' error when there is an invalid name`, () => {
  const name = 'henk2';
  return hasName(name)
  .then(() => {throw new Error;})
  .catch(err => assert.equal('invalidProperty', err.type));
});

it(`returns true when there is a valid name`, () => {
  const name = 'lars';
  return hasName(name)
  .then(result => assert.equal(true, result));
});
