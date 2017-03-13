const error = require('../../services/error');

module.exports = id => new Promise((resolve, reject) => {

  if(!id) {
    return reject(error({type: 'missingProperty', properties: {property: 'id'}}));
  }

  if(id.length !== 24) {
    return reject(error({type: 'invalidProperty', properties: {property: 'id'}}));
  }


  return resolve(true);
});
