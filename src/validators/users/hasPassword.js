const error = require('../../services/error');

module.exports = password => new Promise((resolve, reject) => {

  if(!password) {
    return reject(error({type: 'missingProperty', properties: {property: 'password'}}));
  }
  return resolve(true);
});
