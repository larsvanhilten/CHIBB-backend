const {insertUser} = require('../../models/Users');
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
    insertUser(email, password, name);
  })
  .catch(err => {
    res.status(err.code);
    res.send(err.message);
  });
};
