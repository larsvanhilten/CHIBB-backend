const error = require('../../services/error');

module.exports = (req, res) => {
  const type = req.params.type;

  Promise.all([
    req.sensor.hasType(type),
  ])
  .then(() => {
    req.sensor.read(type)
    .then(readings => {
      res.status(200);
      res.send(readings);
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
