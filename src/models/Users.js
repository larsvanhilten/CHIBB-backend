const collection = 'users';
const _ = require('lodash');
const {ObjectId} = require('mongodb');
const config = require('config');
const bcrypt = require('bcrypt');
const error = require('../services/error');

module.exports = class Users {

  static init(db) {
    this.db = db;
    this.collection = this.db.collection(collection);
  }

  //  Queries
  static getAll() {
    return this.collection.find().toArray();
  }
  static getByEmail(email) {
    return this.collection.findOne({email: email});
  }
  static getById(id) {
    return this.collection.findOne({_id: ObjectId(id)});
  }
  static update(id, updated) {
    return new Promise((resolve, reject) => {
      this.getById(id)
      .then(old => {
        const user = _.assign(old, _.omitBy(updated, _.isNil));
        this.collection.findOneAndReplace({_id: ObjectId(id)}, user, {returnOriginal: false})
        .then(updatedUser => resolve(updatedUser.value))
        .catch(err => reject(err));
      })
      .catch(err => reject(err));
    });
  }
  static removeByEmail(email) {
    return this.collection.findOneAndDelete({email: email});
  }
  static removeById(id) {
    return this.collection.findOneAndDelete({_id: id});
  }
  static insert(email, password, name) {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, config.server.bcrypt.saltRounds)
      .then(hash => {
        const doc = {
          email: email,
          password: hash,
          name: name,
          role: 'User'
        };
        this.collection.insertOne(doc)
        .then(result => resolve(result))
        .catch(() => reject());
      })
      .catch(() => reject());
    });
  }
  static insertAll(users) {
    return this.collection.insertAll(users);
  }
  //  Validations
  static hasEmail(email) {
    // eslint-disable-next-line max-len
    const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

    return new Promise((resolve, reject) => {

      if(!email) {
        return reject(error({type: 'missingProperty', properties: {property: 'email'}}));
      }

      if(!emailRegex.test(email)) {
        return reject(error({type: 'invalidProperty', properties: {property: 'email'}}));
      }

      return resolve(true);
    });
  }
  static hasName(name) {
    const nameRegex = /\d/;

    return new Promise((resolve, reject) => {

      if(!name) {
        return reject(error({type: 'missingProperty', properties: {property: 'name'}}));
      }

      if(nameRegex.test(name)) {
        return reject(error({type: 'invalidProperty', properties: {property: 'name'}}));
      }

      if(name.length < 3 || name.length > 20) {
        return reject(error('invalidProperty'));
      }

      return resolve(true);
    });
  }
  static hasPassword(password) {
    const passwordRegex = (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/);
    return new Promise((resolve, reject) => {
      if(!password) {
        return reject(error({type: 'missingProperty', properties: {property: 'password'}}));
      }

      if(!passwordRegex.test(password)) {
        return reject(error({type: 'invalidProperty', properties: {property: 'password'}}));
      }

      return resolve(true);
    });
  }
  static doesNotExist(email) {
    return new Promise((resolve, reject) => this.collection.findOne({email: email})
    .then(doc => {
      if(!doc) {
        resolve(true);
      }else {
        reject(error({type: 'userAlreadyExists', properties: {property: 'email'}}));
      }
    })
    .catch(() => reject(error({type: 'internalServerError'})))
    );
  }
  static hasId(id) {
    return new Promise((resolve, reject) => {

      if(!id) {
        return reject(error({type: 'missingProperty', properties: {property: 'id'}}));
      }

      if(id.length !== 24) {
        return reject(error({type: 'invalidProperty', properties: {property: 'id'}}));
      }

      return resolve(true);
    });
  }
  static hasToken(token) {
    return new Promise((resolve, reject) => {

      if(_.isEmpty(token)) {
        return reject(error({type: 'missingProperty', properties: {property: 'token'}}));
      }

      return resolve(true);
    });
  }

};

