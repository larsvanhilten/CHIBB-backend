const isMe = require('../middleware/isMe');
const isAdmin = require('../middleware/isAdmin');

module.exports = router => {

  router.post('/users', require('../controllers/users/create'));
  router.get('/users', isAdmin, require('../controllers/users/readAll'));

  router.get('/users/:id', isMe, require('../controllers/users/read'));
  router.put('/users/:id', isMe, require('../controllers/users/update'));
  router.delete('/users/:id', isMe, require('../controllers/users/delete'));
};
