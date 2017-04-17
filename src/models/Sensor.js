const collection = 'readings';
const _ = require('lodash');

const error = require('../services/error');

module.exports = class Users {

  static init(db) {
    this.db = db;
    this.collection = this.db.collection(collection);
  }

  //  Queries
  static read(type) {
    return this.collection.find({type: type}).toArray();
  }

  //  Validators
  static hasType(type) {
    return new Promise((resolve, reject) => {

      if(_.isEmpty(type)) {
        return reject(error({type: 'missingProperty', properties: {property: 'type'}}));
      }

      return resolve(true);
    });
  }

};

