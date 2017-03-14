/* global  describe */

const importTest = (name, path) => {
  describe(name, () => {
    require(path);
  });
};

describe('Validators', () => {
  describe('shared', () => {
    importTest('hasId', './validators/shared/hasId');
    importTest('hasToken', './validators/shared/hasToken');
  });
  describe('users', () => {
    importTest('hasEmail', './validators/users/hasEmail');
    importTest('hasName', './validators/users/hasName');
    importTest('hasPassword', './validators/users/hasPassword');
  });
});


