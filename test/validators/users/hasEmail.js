/* global  it */

const assert = require('assert');
const hasEmail = require('../../../src/validators/hasEmail');

it(`returns 'missingProperty' error when there is no email`, () => {
  const email = undefined;
  assert.equal(hasEmail(email), {errorType: 'missingProperty'});
});

it(`returns 'invalidProperty' error when there is an invalid email`, () => {
  const email = 'invalid';
  assert.equal(hasEmail(email), {errorType: 'invalidProperty'});
});

it(`returns true  when there is a valid email`, () => {
  const email = 'test@wearereasonablepeople.com';
  assert.equal(hasEmail(email), true);
});
