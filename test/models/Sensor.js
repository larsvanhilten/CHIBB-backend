/* global describe, it */

const assert = require('assert');
const Sensor = require('../../src/models/Sensor');

describe('hasType', () => {
  it(`returns 'missingProperty' error when there is no type`, () => {
    const type = undefined;
    return Sensor.hasType(type)
    .then(() => {throw new Error;})
    .catch(err => assert.equal('missingProperty', err.type));
  });

  it(`returns true when there is a valid type`, () => {
    const type = 'temperature';
    return Sensor.hasType(type)
    .then(result => assert.equal(true, result));
  });
});

describe('hasTimestamp', () => {
  it(`returns 'missingProperty' error when there is no timestamp`, () => {
    const timestamp = undefined;
    return Sensor.hasTimestamp(timestamp)
    .then(() => {throw new Error;})
    .catch(err => assert.equal('missingProperty', err.type));
  });

  it(`returns 'invalidProperty' error when the timestamp is not a number`, () => {
    const timestamp = '3';
    return Sensor.hasTimestamp(timestamp)
    .then(() => {throw new Error;})
    .catch(err => assert.equal('invalidProperty', err.type));
  });

  it(`returns true when there is a valid timestamp`, () => {
    const timestamp = 1494598541;
    return Sensor.hasTimestamp(timestamp)
    .then(result => assert.equal(true, result));
  });
});
