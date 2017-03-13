const {deleteUserById} = require('../../models/Users');
const error = require('../../services/error');


module.exports = (req, res) => {
  const id = req.body.id;


  Promise.all([
    hasEmail(email),
    hasPassword(password),
    hasName(name)
  ])
  .then(() => {
    deleteUserById(id)
    .then(result => {
      res.status(201);
      res.send(result.ops[0]);
    })
    .catch(() => {
      const err = error({type: 'internalServerError'});

      res.status(err.code);
      res.send(err.message);
    });
  })
  .catch(err => {
    res.status(err.code);
    res.send(err.message);
  });
};
