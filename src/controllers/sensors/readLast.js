const error = require('../../services/error');

module.exports = (req, res) => {
  const type = req.params.type;

  // Valdiations
  Promise.all([
    req.sensor.hasType(type),
  ])
  // Return last data for requested sensor
  .then(() => {
    req.sensor.readLast(type)
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
