const error = require('../../services/error');
const _ = require('lodash');

module.exports = (req, res) => {
  const type = req.params.type;
  const from = _.toNumber(req.params.from);
  const to = _.toNumber(req.params.to);

  // Validations
  Promise.all([
    req.sensor.hasType(type),
    req.sensor.hasTimestamp(from),
    req.sensor.hasTimestamp(to),
  ])
  .then(() => {
    req.sensor.read(type, from, to)
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
