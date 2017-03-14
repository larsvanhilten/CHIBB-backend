const error = require('../../services/error');

const nameRegex = /\d/;

module.exports = name => new Promise((resolve, reject) => {

  if(!name) {
    return reject(error({type: 'missingProperty', properties: {property: 'name'}}));
  }

  if(nameRegex.test(name)) {
    return reject(error({type: 'invalidProperty', properties: {property: 'name'}}));
  }

  if(name.length < 3 || name.length > 20) {
    return reject(error({type: 'invalidProperty', properties: {property: 'name'}}));
  }

  return resolve(true);
});
