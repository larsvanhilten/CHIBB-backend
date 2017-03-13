/* global  it */

const assert = require('assert');
const hasId = require('../../../src/validators/shared/hasId');

it(`returns 'missingProperty' error when there is no id`, () => {
  const id = undefined;
  return hasId(id)
  .then(() => {throw new Error;})
  .catch(err => assert.equal('missingProperty', err.type));
});

it(`returns 'invalidProperty' error when there is an invalid id`, () => {
  const id = 'invalid';
  return hasId(id)
  .then(() => {throw new Error;})
  .catch(err => assert.equal('invalidProperty', err.type));
});

it(`returns true  when there is a valid email`, () => {
  const id = '58c5622a434bd90a2d888a98';
  return hasId(id)
  .then(result => assert.equal(true, result));
});
