const error = require('../../services/error');
const _ = require('lodash');

module.exports = (req, res) => {

  Promise.all([

  ])
  .then(() => {
    console.log('topkek');
    req.users.getAll()
    .then(users => {
      _.map(users, user => {
        delete user.password;
      });
      res.status(200);
      res.send(users);
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
