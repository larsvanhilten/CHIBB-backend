const error = require('../../services/error');

module.exports = (req, res) => {
  const id = req.params.id;

  Promise.all([
    req.broker.hasId(id)
  ])
  .then(() => {
    req.broker.remove(id, req.user.id)
    .then(result => {
      if(!result.value) {
        const err = error({type: 'brokerDoesNotExist'});
        res.status(err.code);
        res.send(err);
      }else {
        res.status(201);
        res.send({success: true});
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
