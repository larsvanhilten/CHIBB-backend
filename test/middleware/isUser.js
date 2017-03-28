/* global it */

const isUser = require('../../src/middleware/isUser');
const jwt = require('../../src/services/jwt');

const req = {};
req.headers = {};

const res = {};
res.status = () => {};

it(`Returns an error when there is no token provided`, done => {
  req.headers.authorization = undefined;

  res.send = () => {
    done();
  };

  isUser(req, res, null);
});

it(`Continues when a valid token is provided`, done => {
  req.headers.authorization = jwt.sign('420', 'test@chibb.com', 'Test', 'User');

  const next = () => {
    done();
  };

  isUser(req, res, next);
});

