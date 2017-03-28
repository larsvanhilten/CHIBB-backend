const isUser = require('../middleware/isUser');
const isAdmin = require('../middleware/isAdmin');

module.exports = router => {

  router.post('/users', require('../controllers/users/create'));
  router.get('/users', isAdmin, require('../controllers/users/readAll'));

  router.get('/users/:id', isUser, require('../controllers/users/read'));
  //router.put('/users/:id', require('../controllers/users/update'));
  router.delete('/users/:id', require('../controllers/users/delete'));
};
