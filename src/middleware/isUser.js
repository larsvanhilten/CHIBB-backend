const {authorize} = require('../services/jwt');
const error = require('../services/error');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  authorize(token)
  .then(() => next())
  .catch(() => {
    const err = error({type: 'unauthorized'});
    res.status(err.code);
    res.send(err);
  });

};
