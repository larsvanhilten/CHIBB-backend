const {deleteUserById} = require('../../models/Users');
const error = require('../../services/error');
const hasId = require('../../validators/shared/hasId');


module.exports = (req, res) => {
  const id = req.params.id;


  Promise.all([
    hasId(id)
  ])
  .then(() => {
    deleteUserById(id)
    .then(result => {
      if(!result.value) {
        const err = error({type: 'userDoesNotExist'});
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
