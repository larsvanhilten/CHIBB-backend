const isUser = require('../middleware/isUser');

module.exports = router => {

  router.get('/sensors/:type', isUser, require('../controllers/sensors/read'));

};
