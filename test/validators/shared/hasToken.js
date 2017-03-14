/* global  it */

const assert = require('assert');
const jwt = require('../../../src/services/jwt');
const hasToken = require('../../../src/validators/shared/hasToken');

it(`returns 'missingProperty' error when there is no token`, () => {
  const token = undefined;
  return hasToken(token)
  .then(() => {throw new Error;})
  .catch(err => assert.equal('missingProperty', err.type));
});

it(`returns true  when there is a valid id`, () => {

  const token = jwt.sign('lars@lars.com', 'Lars');
  return hasToken(token)
  .then(result => assert.equal(true, result));
});
