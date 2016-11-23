"use strict";
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  const _geoloc = geolocData;
  res.send(_geoloc);
});

module.exports = router;
