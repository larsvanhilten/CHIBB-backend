const error = require('../../services/error');

module.exports = password => new Promise((resolve, reject) => {

  if(!password) {
    return reject(error({type: 'missingProperty', properties: {property: 'password'}}));
  }

  if(password.length !== 60) {
    return reject(error({type: 'invalidProperty', properties: {property: 'password'}}));
  }

  return resolve(true);
});
