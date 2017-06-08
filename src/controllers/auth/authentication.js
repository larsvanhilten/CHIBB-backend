const bcrypt = require('bcrypt');
const jwt = require('../../services/jwt');
const error = require('../../services/error');

module.exports = (req, res) => {
  const email = String(req.body.email).toLowerCase();
  const password = req.body.password;

  Promise.all([

  ])
  .then(() => {
    // Get user by email and compare if password is correct
    req.users.getByEmail(email)
    .then(result => {
      if(!result) {
        const err = error({type: 'invalidCredentials'});
        res.status(err.code);
        res.send(err);
      }else {
        bcrypt.compare(password, result.password).then(correctPassword => {
          if(correctPassword) {
            delete result.password;
            result.token = jwt.sign(result._id, result.email, result.name, result.role);
            res.status(202);
            res.send(result);
          }else {
            const err = error({type: 'invalidCredentials'});
            res.status(err.code);
            res.send(err);
          }
        });
      }
    })
    .catch(() => {
      const err = error({type: 'internalServerError'});
      res.status(err.code);
      res.send(err);
    });
  })
  .catch(err => {
    res.status(err.code);
    res.send(err);
  });
};
