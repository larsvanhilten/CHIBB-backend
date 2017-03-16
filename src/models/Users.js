const collection = 'users';
const error = require('../services/error');

module.exports = class Users {

  static init(db) {
    this.db = db;
    this.collection = this.db.collection(collection);
  }

  static insertAll(users) {
    return this.collection.insertAll(users);
  }
  static getByEmail(email) {
    return this.collection.findOne({email: email});
  }
  static getById(id) {
    return this.collection.findOne({_id: id});
  }
  static removeByEmail(email) {
    return this.collection.findOneAndDelete({email: email});
  }

  static insert(email, password, name) {
    const doc = {
      email: email,
      password: password,
      name: name
    };

    return this.collection.insertOne(doc);
  }

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
    return new Promise((resolve, reject) => {

      if(!password) {
        return reject(error({type: 'missingProperty', properties: {property: 'password'}}));
      }

      if(password.length !== 60) {
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
        reject(error({type: 'userAlreadyExists', properties: {email: 'email'}}));
      }
    })
    .catch(() => reject(error({type: 'internalServerError'})))
    );
  }
};
