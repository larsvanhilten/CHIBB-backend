const isUser = require('../middleware/isUser');

module.exports = router => {

  router.post('/brokers', isUser, require('../controllers/brokers/create'));
  router.get('/brokers', isUser, require('../controllers/brokers/readAll'));

  router.get('/brokers/:id', isUser, require('../controllers/brokers/read'));
  router.put('/brokers/:id', isUser, require('../controllers/brokers/update'));
  router.delete('/brokers/:id', isUser, require('../controllers/brokers/delete'));
};
