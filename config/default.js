module.exports = {
  server: {
    http: {
      port: process.env.PORT || 3000
    },
    mongo: {
      url: 'mongodb://127.0.0.1:27017/chibb'
    }
  }
};
