let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Home' });
});

/* GET home page. */
router.get('/home', function (req, res, next) {
  res.render('index', { title: 'Home' });
});


/* GET About me page. */
router.get('/aboutme', function (req, res, next) {
  res.render('aboutme', { title: 'About Me' });
});

/* GET Projects page. */
router.get('/projects', function (req, res, next) {
  res.render('projects', { title: 'Projects' });
});

/* GET Services */
router.get('/services', function (req, res, next) {
  res.render('services', { title: 'Services' });
});

/* GET Contact me page. */
router.get('/contactme', function (req, res, next) {
  res.render('contact', { title: 'Contact Me' });
});


module.exports = router;
