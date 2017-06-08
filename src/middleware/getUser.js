const {authorize} = require('../services/jwt');

// Put current user in request object
module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  authorize(token)
  .then(decoded => {
    req.user = decoded;
    next();
  })
  .catch(() => next());

};
