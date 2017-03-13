const {insertUser} = require('../../models/Users');
const bcrypt = require('bcrypt');
const config = require('config');
const error = require('../../services/error');
const hasEmail = require('../../validators/users/hasEmail');
const hasPassword = require('../../validators/users/hasPassword');
const hasName = require('../../validators/users/hasName');

module.exports = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;

  Promise.all([
    hasEmail(email),
    hasPassword(password),
    hasName(name)
  ])
  .then(() => {
    bcrypt.hash(password, config.server.bcrypt.saltRounds)
    .then(hash => {
      insertUser(email, hash, name)
      .then(result => {
        delete result.ops[0].password;
        res.status(201);
        res.send(result.ops[0]);
      })
      .catch(() => {
        const err = error({type: 'internalServerError'});
        res.status(err.code);
        res.send(err);
      });
    })
    .catch(() => {
      const err = error({type: 'internalServerError'});
      res.status(err.code);
      res.send(err);
    }
    );
  })
  .catch(err => {
    res.status(err.code);
    res.send(err);
  });
};
