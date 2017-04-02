const {authorize} = require('../services/jwt');
const error = require('../services/error');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  authorize(token)
  .then(decoded => {
    if(decoded.id === req.params.id || decoded.role === 'Admin') {
      next();
    }else{
      const err = error({type: 'unauthorized'});
      res.status(err.code);
      res.send(err);
    }
  })
  .catch(() => {
    const err = error({type: 'unauthorized'});
    res.status(err.code);
    res.send(err);
  });

};
