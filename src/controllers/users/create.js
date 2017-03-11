const {insertUser} = require('../../models/Users');

module.exports = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;

  Promise.all([

  ])
  .then(() => {
    insertUser(email, password, name);
  })
  .catch(err => {
    res.status(err.type);
    res.send(err.message);
  });
};
