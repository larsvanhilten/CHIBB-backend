const error = require('../../services/error');
const _ = require('lodash');

module.exports = (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const url = req.body.url;
  const port = req.body.port;
  const channel = req.body.channel;
  const username = req.body.username;
  const password = req.body.password;

  Promise.all([
    req.broker.hasId(id),
  ])
  .then(() => {
    const brokerFull = {id, name, url, port, channel, username, password};
    const broker = _.omitBy(brokerFull, _.isEmpty);
    req.broker.update(broker, req.user.id)
    .then(broker => {
      if(!broker) {
        const err = error({type: 'brokerDoesNotExist'});
        res.status(err.code);
        res.send(err);
      }else {
        delete broker.password;
        res.status(200);
        res.send(broker);
      }
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
