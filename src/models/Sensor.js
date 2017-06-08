const collection = 'readings';
const _ = require('lodash');

const error = require('../services/error');

module.exports = class Users {

  static init(db) {
    this.db = db;
    this.collection = this.db.collection(collection);
  }

  // Queries
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
  static readStatuses() {
    const checkStatus = reading => {
      const now = new Date().getTime() / 1000;
      const difference = (now - reading.timestamp) / 60;

      if(difference < 3) {
        reading.status = 'active';
      }else if (difference < 60) {
        reading.status = 'intermittend';
      }else {
        reading.status = 'inactive';
      }

      return reading;
    };

    return new Promise((resolve, reject) => {
      this.collection.aggregate([
        {$group: {_id: '$type', timestamp: {$max: '$timestamp'}}}
      ]).toArray()
      .then(readings => {
        _.map(readings, reading => {
          checkStatus(reading);
          reading.type = reading._id;
          delete reading._id;
        });

        resolve(readings);
      })
      .catch(() => reject());
    });

  }

  // Validators
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

      if(_.isNil(timestamp)) {
        return reject(error({type: 'missingProperty', properties: {property: 'timestamp'}}));
      }

      if(!_.isNumber(timestamp)) {
        return reject(error({type: 'invalidProperty', properties: {property: 'timestamp'}}));
      }

      return resolve(true);
    });
  }

};

