const error = require('../../services/error');

module.exports = (req, res) => {
  const id = req.params.id;

  Promise.all([
    req.users.hasId(id)
  ])
  .then(() => {
    req.users.removeById(id)
    .then(result => {
      if(!result.value) {
        const err = error({type: 'userDoesNotExist', properties: {property: 'id'}});
        res.status(err.code);
        res.send(err);
      }else {
        res.status(201);
        res.send({success: true});
      }

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
