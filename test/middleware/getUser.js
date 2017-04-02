/* global it */

const getUser = require('../../src/middleware/getUser');
const jwt = require('../../src/services/jwt');
const _ = require('lodash');

const req = {};
req.headers = {};
req.headers.authorization = undefined;

const res = {};
res.status = () => {};

it(`Returns req.user is empty when no valid token`, done => {
  req.headers.authorization = undefined;

  const next = () => {
    if(_.isNil(req.user)) {
      done();
    }
  };

  getUser(req, res, next);
});

it(`Continues when a valid token is provided`, done => {
  req.headers.authorization = jwt.sign('420', 'test@chibb.com', 'Test', 'Admin');

  const next = () => {
    if(req.user) {
      done();
    }
  };

  getUser(req, res, next);
});

