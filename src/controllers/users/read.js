const {getUserById} = require('../../models/Users');
const error = require('../../services/error');
const hasId = require('../../validators/shared/hasId');

module.exports = (req, res) => {
  const id = req.params.id;

  Promise.all([
    hasId(id),
  ])
  .then(() => {
    getUserById(id)
    .then(result => {
      delete result.password;
      res.status(200);
      res.send(result);
    })
    .catch(() => {
      const err = error({type: 'internalServerError'});

      res.status(err.code);
      res.send(err.message);
    });
  })
  .catch(err => {
    res.status(err.code);
    res.send(err);
  });
};
