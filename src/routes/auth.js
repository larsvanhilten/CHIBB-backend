
module.exports = router => {
  // Login route
  router.post('/auth', require('../controllers/auth/authentication'));
  // Endpoint to validate JWT tokens
  router.get('/auth', require('../controllers/auth/authorization'));

};
