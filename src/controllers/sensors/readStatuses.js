const error = require('../../services/error');

module.exports = (req, res) => {

  // Return statusses for all sensors
  req.sensor.readStatuses()
  .then(readings => {
    res.status(200);
    res.send(readings);
  })
  .catch(() => {
    const failure = error({type: 'internalServerError'});
    res.status(failure.code);
    res.send(failure.message);
  });
};
