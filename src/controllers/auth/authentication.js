const bcrypt = require('bcrypt');
const jwt = require('../../services/jwt');
const error = require('../../services/error');
const _ = require('lodash');

module.exports = (req, res) => {
  const email = _.lowerCase(req.body.email);
  const password = req.body.password;

  Promise.all([

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
