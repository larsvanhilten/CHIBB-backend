/* global  it */

const assert = require('assert');
const hasPassword = require('../../../src/validators/users/hasPassword');

it(`returns 'missingProperty' error when there is no password`, () => {
  const password = undefined;
  return hasPassword(password)
  .then(() => {throw new Error;})
  .catch(err => assert.equal('missingProperty', err.type));
});

it(`returns 'invalidProperty' error when the passwordhash is not 60 characters long`, () => {
  const password = 'invalidpassword';
  return hasPassword(password)
  .then(() => {throw new Error;})
  .catch(err => assert.equal('invalidProperty', err.type));
});

it(`returns true when there is a valid password`, () => {
  const password = '$2a$10$KssILxWNR6k62B7yiX0GAe2Q7wwHlrzhF3LqtVvpyvHZf0MwvNfVu';
  return hasPassword(password)
  .then(result => assert.equal(true, result));
});
