const error = require('../../services/error');

const nameRegex = /[a-zA-Z]/;

module.exports = name => new Promise((resolve, reject) => {

  if(!name) {
    return reject(error('missingProperty'));
  }

  if(!nameRegex.test(name)) {
    return reject(error('invalidProperty'));
  }

  return resolve(true);
});
