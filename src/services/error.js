const errors = require('../../data-models/errors.json');
const _ = require('lodash');

module.exports = failure => {
  if(errors[failure.type]) {
    const error = errors[failure.type];
    _.map(failure.properties, (v, k) => {
      error.message = error.message.replace(`%${k}`, v);
    });
    return error;
  }
  return errors.internalServerError;
};
