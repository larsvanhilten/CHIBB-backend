const error = require('../../services/error');

module.exports = (req, res) => {
  const name = req.body.name;
  const url = req.body.url;
  const port = req.body.port;
  const channel = req.body.channel;
  const username = req.body.username;
  const password = req.body.password;

  // Validations
  Promise.all([
    req.broker.hasName(name),
    req.broker.hasUrl(url),
    req.broker.hasPort(port),
    req.broker.hasChannel(channel),
  ])
  .then(() => {
    const broker = {
      name: name,
      url: url,
      port: port,
      channel: channel,
      username: username,
      password: password,
      userId: req.user.id
    };

    req.broker.insert(broker)
    .then(result => {
      delete result.ops[0].password;
      res.status(201);
      res.send(result.ops[0]);
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
