const {insertUser} = require('../../models/Users');
const hasEmail = require('../../validators/hasEmail');
const hasPassword = require('../../validators/hasEmail');
const hasName = require('../../validators/hasEmail');

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
