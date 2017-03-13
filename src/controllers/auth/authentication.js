const bcrypt = require('bcrypt');
const jwt = require('../../services/jwt');
const {getUserByEmail} = require('../../models/Users');
const error = require('../../services/error');
const hasEmail = require('../../validators/users/hasEmail');
const hasPassword = require('../../validators/users/hasPassword');

module.exports = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  Promise.all([
    hasEmail(email),
    hasPassword(password),
  ])
  .then(() => {
    getUserByEmail(email)
    .then(result => {
      if(!result) {
        const err = error({type: 'invalidCredentials'});
        res.status(err.code);
        res.send(err);
      }else {
        bcrypt.compare(password, result.password).then(correctPassword => {
          if(correctPassword) {
            const token = jwt.sign(result.email, result.name);
            res.status(202);
            res.send({token: token});
          }else {
            const err = error({type: 'invalidCredentials'});
            res.status(err.code);
            res.send({err});
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
