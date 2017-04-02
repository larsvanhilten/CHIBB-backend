const {authorize} = require('../services/jwt');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  authorize(token)
  .then(decoded => {
    req.user = decoded;
    next();
  })
  .catch(() => next());

};
