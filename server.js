const config = require('config');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const _ = require('lodash');

const app = express();
const router = express.Router();

app.use(bodyParser.json());
// to support URL-encoded bodies
app.use(bodyParser.urlencoded({
  extended: true
}));

fs.readdir('./src/routes', routes => {
  _.map(routes, route => {
    require(route)(router);
  });
});

app.use(router);

app.listen(config.server.http.port);

