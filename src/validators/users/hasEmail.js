const error = require('../../services/error');

// eslint-disable-next-line max-len
const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

module.exports = email => new Promise((resolve, reject) => {

  if(!email) {
    return reject(error('missingProperty'));
  }

  if(!emailRegex.test(email)) {
    return reject(error('invalidProperty'));
  }

  return resolve(true);
});
