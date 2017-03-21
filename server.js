const config = require('config');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const _ = require('lodash');
const db = require('./src/services/mongo');
const Users = require('./src/models/Users');

const app = express();
const router = express.Router();

if(config.server.http.cors) {
  app.use(cors());
}

app.use(bodyParser.json());
// to support URL-encoded bodies
app.use(bodyParser.urlencoded({
  extended: true
}));

process.on('unhandledRejection', reason => {
  // eslint-disable-next-line no-console
  console.log(`reason: ${reason}`);
});

fs.readdir('./src/routes', (err, routes) => {
  db.connect(config.server.mongo.url)
  .then(db => {
    app.use((req, res, next) => {
      req.db = db;
      req.users = Users;
      req.users.init(db);
      next();
    });
    _.forEach(routes, route => {
      require(`./src/routes/${route}`)(router);
    });
    app.use(router);

    app.listen(config.server.http.port);

    // eslint-disable-next-line no-console
    console.log(`Server running on port: ${config.server.http.port}`);

  })
  // eslint-disable-next-line no-console
  .catch(err => console.error(`Error connecting to database: ${err}`));
});


