const error = require('../../services/error');
const passwordRegex = (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/);

module.exports = password => new Promise((resolve, reject) => {

  if(!password) {
    return reject(error({type: 'missingProperty', properties: {property: 'password'}}));
  }

  if(!passwordRegex.test(password)) {
    return reject(error({type: 'invalidProperty', properties: {property: 'password'}}));
  }

  return resolve(true);
});
