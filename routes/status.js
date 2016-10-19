var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  let html = `<p>vpnOK :${vpnOK}</p>`;
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(html);
});

module.exports = router;
