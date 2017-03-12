const error = require('../../services/error');
const {getUserByEmail} = require('../../models/Users');

module.exports = email => new Promise((resolve, reject) => getUserByEmail(email)
  .then(doc => {
    if(!doc) {
      resolve(true);
    }else {
      reject(error({type: 'userAlreadyExists', properties: {email: 'email'}}));
    }
  })
  .catch(() => reject(error({type: 'internalServerError'})))
);
