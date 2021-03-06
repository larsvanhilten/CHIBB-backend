const config = require('config');
const jwt = require('jsonwebtoken');

// Create JWT
exports.sign = (id, email, name, role) => {
  const data = {id: id, email: email, name: name, role: role};
  return jwt.sign(data, config.server.jwt.secret, {expiresIn: '6h'});
};

// Decode / validate JWT
exports.authorize = token => new Promise((resolve, reject) => {
  jwt.verify(token, config.server.jwt.secret, (err, decoded) => {
    if(err) {
      return reject();
    }
    return resolve(decoded);
  });
});

