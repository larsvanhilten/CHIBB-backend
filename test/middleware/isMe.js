/* global it */

const isMe = require('../../src/middleware/isMe');
const jwt = require('../../src/services/jwt');

const req = {};
req.headers = {};
req.headers.authorization = undefined;
req.params = {};

const res = {};
res.status = () => {};

it(`Returns an error when there is no token provided`, done => {
  req.headers.authorization = undefined;

  res.send = () => {
    done();
  };

  isMe(req, res, null);
});

it(`Returns an error when the id in the token differs from the requested id`, done => {
  req.headers.authorization = jwt.sign('420', 'test@chibb.com', 'Test', 'User');
  req.params.id = '69';

  res.send = () => {
    done();
  };

  isMe(req, res, null);
});

it(`Continues when an admin token is provided`, done => {
  req.headers.authorization = jwt.sign('430', 'test@chibb.com', 'Test', 'Admin');
  req.params.id = '420';

  const next = () => {
    done();
  };

  isMe(req, res, next);
});

it(`Continues when a valid token is provided`, done => {
  req.headers.authorization = jwt.sign('420', 'test@chibb.com', 'Test', 'User');
  req.params.id = '420';

  const next = () => {
    done();
  };

  isMe(req, res, next);
});

