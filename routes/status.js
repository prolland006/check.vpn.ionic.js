var express = require('express');
var router = express.Router();
let vpnOK = require('../app');

/* GET users listing. */
router.get('/', function(req, res, next) {
  const _status = {
    'vpnOK' : vpnOK
  };
  console.log('vpnOK,',vpnOK);
  res.send(_status);
});

module.exports = router;
