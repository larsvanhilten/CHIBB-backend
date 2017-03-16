module.exports = {
  server: {
    http: {
      port: process.env.PORT || 3000
    },
    bcrypt: {
      saltRounds: 10
    },
    jwt: {
      secret: 'lksmdqwjjamsadjih874324lamcs12d'
    },
    mongo: {
      url: 'mongodb://127.0.0.1:27017/chibb'
    }
  },
  test: {
    mongo: {
      url: 'mongodb://127.0.0.1:27017/chibb-test'
    }
  }
};
