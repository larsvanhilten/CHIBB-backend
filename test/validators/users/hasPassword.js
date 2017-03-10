/* global  it */

const assert = require('assert');
const hasPassword = require('../../../src/validators/hasPassword');

it(`returns 'missingProperty' error when there is no password`, () => {
  const password = undefined;
  assert.equal(hasPassword(password), {errorType: 'missingProperty'});
});

it(`returns 'invalidProperty' error when the password is too short`, () => {
  const password = 'short';
  assert.equal(hasPassword(password), {errorType: 'invalidProperty'});
});

it(`returns 'invalidProperty' error when the password only contains characters`, () => {
  const password = 'nospecialcharacters';
  assert.equal(hasPassword(password), {errorType: 'invalidProperty'});
});

it(`returns true when there is a valid password`, () => {
  const password = 'thisisavalidpassword123';
  assert.equal(hasPassword(password), true);
});
