const config = require('config');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const _ = require('lodash');
const db = require('./src/services/mongo');

const app = express();
const router = express.Router();

app.use(bodyParser.json());
// to support URL-encoded bodies
app.use(bodyParser.urlencoded({
  extended: true
}));

process.on('unhandledRejection', reason => {
  console.log(`reason: ${reason}`);
});

fs.readdir('./src/routes', (err, routes) => {
  db.connect(config.server.mongo.url)
  .then(() => {
    _.map(routes, route => {
      require(`./src/routes/${route}`)(router);
    });
  })
  // eslint-disable-next-line no-console
  .catch(err => console.error(`Error connecting to database: ${err}`));
});

app.use(router);

app.listen(config.server.http.port);

// eslint-disable-next-line no-console
console.log(`Server running on port: ${config.server.http.port}`);

