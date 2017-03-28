/* global it */

const isAdmin = require('../../src/middleware/isAdmin');
const jwt = require('../../src/services/jwt');

const req = {};
req.headers = {};
req.headers.authorization = undefined;

const res = {};
res.status = () => {};

it(`Returns an error when there is no token provided`, done => {
  req.headers.authorization = undefined;

  res.send = () => {
    done();
  };

  isAdmin(req, res, null);
});

it(`Returns an error when the user is not an admin`, done => {
  req.headers.authorization = jwt.sign('420', 'test@chibb.com', 'Test', 'User');

  res.send = () => {
    done();
  };

  isAdmin(req, res, null);
});

it(`Continues when a valid token is provided`, done => {
  req.headers.authorization = jwt.sign('420', 'test@chibb.com', 'Test', 'Admin');

  const next = () => {
    done();
  };

  isAdmin(req, res, next);
});

