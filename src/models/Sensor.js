const collection = 'readings';
const _ = require('lodash');

const error = require('../services/error');

module.exports = class Users {

  static init(db) {
    this.db = db;
    this.collection = this.db.collection(collection);
  }

  //  Queries
  static read(type, from, to) {
    return this.collection.find({
      type: type,
      timestamp: {
        $gte: from,
        $lt: to
      }
    }).toArray();
  }
  static readLast(type) {
    return this.collection.find({type: type}).sort({timestamp: -1}).limit(50).toArray();
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
  static hasTimestamp(timestamp) {
    return new Promise((resolve, reject) => {

      if(_.isNumber(timestamp)) {
        return resolve(true);
      }

      return reject();
    });
  }

};

