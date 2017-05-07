const isUser = require('../middleware/isUser');

module.exports = router => {

  router.get('/sensors', isUser, require('../controllers/sensors/readStatuses'));
  router.get('/sensors/:type', isUser, require('../controllers/sensors/readLast'));
  router.get('/sensors/:type/:from/:to', isUser, require('../controllers/sensors/read'));

};
