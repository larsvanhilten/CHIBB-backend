const error = require('../../services/error');

module.exports = (req, res) => {
  const id = req.params.id;

  Promise.all([
    req.users.hasId(id),
  ])
  .then(() => {
    req.users.getById(id)
    .then(user => {
      if(!user) {
        const err = error({type: 'userDoesNotExist', properties: {property: 'id'}});
        res.status(404);
        res.send(err);
      }else{
        delete user.password;
        res.status(200);
        res.send(user);
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
