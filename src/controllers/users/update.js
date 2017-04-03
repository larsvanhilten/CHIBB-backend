const error = require('../../services/error');
const _ = require('lodash');

module.exports = (req, res) => {
  const id = req.params.id;

  Promise.all([
    req.users.hasId(id)
  ])
  .then(() => {
    if((req.body.role || req.body.email) && req.user.role !== 'Admin') {
      const err = error({type: 'unauthorized'});
      res.status(err.code);
      res.send(err);
    } else {
      const user = {
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        role: req.body.role
      };
      req.users.update(id, _.omitBy(user, _.isNil))
      .then(result => {
        if(!result) {
          const err = error({type: 'userDoesNotExist', properties: {property: 'id'}});
          res.status(err.code);
          res.send(err);
        }else {
          delete result.password;
          res.status(201);
          res.send(result);
        }
      })
      .catch(error => {
        let failure = error;
        if(!failure.type) {
          failure = error({type: 'internalServerError'});
        }
        res.status(failure.code);
        res.send(failure.message);
      });
    }
  })
  .catch(err => {
    res.status(err.code);
    res.send(err);
  });
};
