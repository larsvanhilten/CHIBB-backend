const error = require('../../services/error');

module.exports = (req, res) => {
  const id = req.params.id;

  // Validations
  Promise.all([
    req.broker.hasId(id),
  ])
  .then(() => {
    req.broker.get(id, req.user.id)
    .then(broker => {
      delete broker.password;
      res.status(200);
      res.send(broker);
    })
    .catch(() => {
      const failure = error({type: 'internalServerError'});
      res.status(failure.code);
      res.send(failure.message);
    });
  })
  .catch(err => {
    res.status(err.code);
    res.send(err);
  });
};
