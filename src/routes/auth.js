
module.exports = router => {

  router.post('/auth', require('../controllers/auth/authentication'));
  //router.get('/auth', require('../controllers/auth/authorization'));

};
