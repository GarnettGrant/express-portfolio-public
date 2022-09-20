var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('index', { title: 'Home' });
});


/* GET About us page. */
router.get('/aboutus', function(req, res, next) {
  res.render('index', { title: 'About Us' });
});

/* GET Products page. */
router.get('/products', function(req, res, next) {
  res.render('index', { title: 'Products' });
});

/* GET Services */
router.get('/services', function(req, res, next) {
  res.render('index', { title: 'Services' });
});

/* GET Contact us page. */
router.get('/contactus', function(req, res, next) {
  res.render('index', { title: 'Contact Us' });
});


module.exports = router;
