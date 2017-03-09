const express = require('express');
const CONFIG = require('config');
const fs = require('fs');
const _ = require('lodash');

const app = express();
const router = express.Router();

_.map(fs.readdirSync('./src/routes'), route => {
  require(route)(router);
});

app.use(router);

app.listen(CONFIG['server'].http.port);
console.log(`Running on magic port ${CONFIG['server'].http.port}`);