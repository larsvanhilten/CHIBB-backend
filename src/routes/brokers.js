const isUser = require('../middleware/isUser');

module.exports = router => {

  router.post('/brokers', isUser, require('../controllers/brokers/create'));
  router.get('/brokers', isUser, require('../controllers/brokers/readAll'));

  router.get('/brokers/:id', isUser, require('../controllers/brokers/read'));
  router.delete('/brokers/:id', isUser, require('../controllers/brokers/delete'));
};
