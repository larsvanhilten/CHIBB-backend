const jwt = require('../../services/jwt');

module.exports = (req, res) => {

  const token = req.headers.authorization;

  // Validations
  Promise.all([
    req.users.hasToken(token)
  ])
  // Check whether given token is (still) valid
  .then(() => {
    jwt.authorize(token)
    .then(decoded => {
      decoded.authenticated = true;
      res.status(200);
      res.send(decoded);
    })
    .catch(() => {
      res.status(401);
      res.send({authenticated: false});
    });
  })
  .catch(err => {
    res.status(err.code);
    res.send(err);
  });
};
