const error = require('../../services/error');
const _ = require('lodash');

module.exports = token => new Promise((resolve, reject) => {

  if(_.isEmpty(token)) {
    return reject(error({type: 'missingProperty', properties: {property: 'token'}}));
  }

  return resolve(true);
});
