const error = require('../../services/error');

module.exports = (req, res) => {
  const email = req.body.email.toLowerCase();
  const password = req.body.password;
  const name = req.body.name;

  Promise.all([
    req.users.hasEmail(email),
    req.users.hasPassword(password),
    req.users.hasName(name),
    req.users.doesNotExist(email)
  ])
  .then(() => {
    req.users.insert(email, password, name)
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
  .catch(err => {
    res.status(err.code);
    res.send(err);
  });
};
