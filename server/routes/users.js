let express = require('express');
let router = express.Router();
let user = require('../models/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Placeholder');
});

module.exports = router;
