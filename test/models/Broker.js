/* global describe, it */

const assert = require('assert');
const Broker = require('../../src/models/Broker');

describe('hasName', () => {
  it(`returns 'missingProperty' error when there is no name`, () => {
    const name = undefined;
    return Broker.hasName(name)
    .then(() => {throw new Error;})
    .catch(err => assert.equal('missingProperty', err.type));
  });

  it(`returns 'invalidProperty' error when the name is not a string`, () => {
    const name = 12345;
    return Broker.hasName(name)
    .then(() => {throw new Error;})
    .catch(err => assert.equal('invalidProperty', err.type));
  });

  it(`returns true when there is a valid name`, () => {
    const name = 'Lars';
    return Broker.hasName(name)
    .then(result => assert.equal(true, result));
  });
});

describe('hasUrl', () => {
  it(`returns 'missingProperty' error when there is no url`, () => {
    const url = undefined;
    return Broker.hasUrl(url)
    .then(() => {throw new Error;})
    .catch(err => assert.equal('missingProperty', err.type));
  });

  it(`returns 'invalidProperty' error when there is an invalid url`, () => {
    const url = 'something';
    return Broker.hasUrl(url)
    .then(() => {throw new Error;})
    .catch(err => assert.equal('invalidProperty', err.type));
  });

  it(`returns true when there is a valid url`, () => {
    const url = 'wss://mqtt.test.nl';
    return Broker.hasUrl(url)
    .then(result => assert.equal(true, result));
  });
});

describe('hasPort', () => {
  it(`returns 'missingProperty' error when there is no port`, () => {
    const port = undefined;
    return Broker.hasPort(port)
    .then(() => {throw new Error;})
    .catch(err => assert.equal('missingProperty', err.type));
  });

  it(`returns 'invalidProperty' error when the port is not a number`, () => {
    const port = '3000';
    return Broker.hasPort(port)
    .then(() => {throw new Error;})
    .catch(err => assert.equal('invalidProperty', err.type));
  });

  it(`returns true when there is a valid port`, () => {
    const port = 3000;
    return Broker.hasPort(port)
    .then(result => assert.equal(true, result));
  });
});

describe('hasChannel', () => {
  it(`returns 'missingProperty' error when there is no channel`, () => {
    const channel = undefined;
    return Broker.hasChannel(channel)
    .then(() => {throw new Error;})
    .catch(err => assert.equal('missingProperty', err.type));
  });

  it(`returns 'invalidProperty' error when the channel is not a string`, () => {
    const channel = 12345;
    return Broker.hasChannel(channel)
    .then(() => {throw new Error;})
    .catch(err => assert.equal('invalidProperty', err.type));
  });

  it(`returns true when there is a valid channel`, () => {
    const channel = 'readings';
    return Broker.hasChannel(channel)
    .then(result => assert.equal(true, result));
  });
});

describe('hasId', () => {
  it(`returns 'missingProperty' error when there is no id`, () => {
    const id = undefined;
    return Broker.hasId(id)
    .then(() => {throw new Error;})
    .catch(err => assert.equal('missingProperty', err.type));
  });

  it(`returns 'invalidProperty' error when id does not have length of 24`, () => {
    const id = 'test';
    return Broker.hasId(id)
    .then(() => {throw new Error;})
    .catch(err => assert.equal('invalidProperty', err.type));
  });

  it(`returns true when there is a valid id`, () => {
    const id = '58c7b3ea058ea90b6212a15f';
    return Broker.hasChannel(id)
    .then(result => assert.equal(true, result));
  });
});
