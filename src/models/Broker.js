const collection = 'brokers';
const _ = require('lodash');
const {ObjectId} = require('mongodb');
const config = require('config');
const bcrypt = require('bcrypt');
const error = require('../services/error');

module.exports = class Broker {

  // Initialize database object during start-up
  static init(db) {
    this.db = db;
    this.collection = this.db.collection(collection);
  }

  // Queries
  static insert(broker) {
    return new Promise((resolve, reject) => {

      if(_.isEmpty(broker.username)) {
        delete broker.username;
        delete broker.password;

        this.collection.insertOne(broker)
        .then(result => resolve(result))
        .catch(() => reject());
      } else {
        bcrypt.hash(broker.password, config.server.bcrypt.saltRounds)
        .then(hash => {
          broker.password = hash;
          this.collection.insertOne(broker)
          .then(result => resolve(result))
          .catch(() => reject());
        })
        .catch(() => reject());
      }
    });
  }
  static getAll(id) {
    return this.collection.find({userId: id}).toArray();
  }
  static get(id, userId) {
    return this.collection.findOne({_id: ObjectId(id), userId: userId});
  }
  static update(updated, userId) {
    return new Promise((resolve, reject) => {
      this.get(updated.id, userId)
      .then(old => {
        if(updated.password) {
          updated.password = bcrypt.hashSync(updated.password, config.server.bcrypt.saltRounds);
        }
        const broker = _.assign(old, updated);
        this.collection.findOneAndReplace({_id: ObjectId(broker.id)}, broker,
        {returnOriginal: false})
        .then(updatedBroker => resolve(updatedBroker.value))
        .catch(err => reject(err));
      })
      .catch(err => reject(err));
    });
  }
  static remove(id, userId) {
    return this.collection.findOneAndDelete({_id: ObjectId(id), userId: userId});
  }

  // Validators
  static hasName(name) {
    return new Promise((resolve, reject) => {

      if(_.isNil(name)) {
        return reject(error({type: 'missingProperty', properties: {property: 'name'}}));
      }

      if(!_.isString(name) || _.isEmpty(name)) {
        return reject(error({type: 'invalidProperty', properties: {property: 'name'}}));
      }

      return resolve(true);
    });
  }
  static hasUrl(url) {
    // eslint-disable-next-line max-len
    const urlRegex = /((mqtt[s]?|wss?):\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,})/;

    return new Promise((resolve, reject) => {

      if(_.isEmpty(url)) {
        return reject(error({type: 'missingProperty', properties: {property: 'url'}}));
      }

      if(!urlRegex.test(url)) {
        return reject(error({type: 'invalidProperty', properties: {property: 'url'}}));
      }

      return resolve(true);
    });
  }
  static hasPort(port) {
    return new Promise((resolve, reject) => {

      if(_.isNil(port)) {
        return reject(error({type: 'missingProperty', properties: {property: 'port'}}));
      }

      if(!_.isNumber(port)) {
        return reject(error({type: 'invalidProperty', properties: {property: 'port'}}));
      }

      return resolve(true);
    });
  }
  static hasChannel(channel) {
    return new Promise((resolve, reject) => {

      if(_.isNil(channel)) {
        return reject(error({type: 'missingProperty', properties: {property: 'port'}}));
      }

      if(!_.isString(channel) || _.isEmpty(channel)) {
        return reject(error({type: 'invalidProperty', properties: {property: 'port'}}));
      }

      return resolve(true);
    });
  }
  static hasId(id) {
    return new Promise((resolve, reject) => {

      if(_.isNil(id)) {
        return reject(error({type: 'missingProperty', properties: {property: 'id'}}));
      }

      if(id.length !== 24) {
        return reject(error({type: 'invalidProperty', properties: {property: 'id'}}));
      }

      return resolve(true);
    });
  }
};

