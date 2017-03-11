
module.exports = router => {

  router.post('/users', require('../controller/users/create.js'));
  router.get('/users', require('../controller/users/read.js'));

  router.get('/users/:id', require('../controller/users/read.js'));
  router.put('/users/:id', require('../controller/users/update.js'));
  router.delete('/users/:id', require('../controller/users/delete.js'));
};
