/* global  it */

const assert = require('assert');
const hasPassword = require('../../../src/validators/hasPassword');

it(`returns 'missingProperty' error when there is no password`, () => {
  const password = undefined;
  assert.equal(hasPassword(password), {errorType: 'missingProperty'});
});

it(`returns true when there is a valid password`, () => {
  const password = 'thisisavalidpassword123';
  assert.equal(hasPassword(password), true);
});
