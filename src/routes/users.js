
module.exports = router => {

  router.post('/users', require('../controllers/users/create'));
  // router.get('/users', require('../controllers/users/read'));
  //
  // router.get('/users/:id', require('../controllers/users/read'));
  // router.put('/users/:id', require('../controllers/users/update'));
  // router.delete('/users/:id', require('../controllers/users/delete'));
};
