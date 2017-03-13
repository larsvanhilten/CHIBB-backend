const config = require('config');
const jwt = require('jsonwebtoken');

exports.sign = (email, name) => {
  const data = {email: email, name: name};
  return jwt.sign({data: data}, config.server.jwt.secret, {expiresIn: '6h'});
};


