const config = require('config');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const _ = require('lodash');
const db = require('./src/services/mongo');
const Users = require('./src/models/Users');

const app = express();
const router = express.Router();

app.use(bodyParser.json());
// to support URL-encoded bodies
app.use(bodyParser.urlencoded({
  extended: true
}));

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
  .catch(() => console.error('Error connecting to database'));
});


