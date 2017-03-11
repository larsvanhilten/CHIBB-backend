const errors = require('../../data-models/errors.json');

module.exports = errorType => {
  if(errors[errorType]) {
    const error = errors[errorType];
    return error;
  }
  return errors.internalServerError;
};
