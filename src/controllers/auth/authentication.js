const bcrypt = require('bcrypt');
const jwt = require('../../services/jwt');
const error = require('../../services/error');

module.exports = (req, res) => {
  const email = req.body.email.toLowerCase();
  const password = req.body.password;

  Promise.all([
    req.users.hasEmail(email),
    req.users.hasPassword(password),
  ])
  .then(() => {
    req.users.getByEmail(email)
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
