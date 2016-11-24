"use strict";
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send(require('../app').loop._geolocData);
});

module.exports = router;
