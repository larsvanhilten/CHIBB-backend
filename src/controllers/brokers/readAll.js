const error = require('../../services/error');
const _ = require('lodash');

module.exports = (req, res) => {

  Promise.all([

  ])
  .then(() => {
    req.broker.getAll(req.user.id)
    .then(brokers => {
      _.map(brokers, broker => {
        delete broker.password;
      });
      res.status(200);
      res.send(brokers);
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
