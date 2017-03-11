/* global  it */

const assert = require('assert');
const hasName = require('../../../src/validators/hasName');

it(`returns 'missingProperty' error when there is no name`, () => {
  const name = undefined;
  assert.equal(hasName(name), {errorType: 'missingProperty'});
});

it(`returns 'invalidProperty' error when there is an invalid name`, () => {
  const name = 'henk2';
  assert.equal(hasName(name), {errorType: 'invalidProperty'});
});

it(`returns true when there is a valid name`, () => {
  const name = 'lars';
  assert.equal(hasName(name), true);
});
