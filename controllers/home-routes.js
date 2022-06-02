var path = require('path');
const router = require('express').Router();
var withAuth = require('../utils/auth');

router.get('/', function (req, res) {
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
  } else {
    res.render('login', { js: ['login.js'] });
  }
});

router.get('/signup', function (req, res) {
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
  } else {
    res.render('signup', { js: ['signup.js'] });
  }
});

router.get('/dashboard', withAuth, function (req, res) {
  res.render('dashboard', { js: ['dashboard.js'] });
});

router.get('/resume', withAuth, function (req, res) {
  res.render('resume', { js: ['resume.js'] });
});

router.get('/resume_submission', withAuth, function (req, res) {
  res.render('resume_submission', { js: ['resume_submission.js'] });
});

router.get('/application', withAuth, function (req, res) {
  res.render('application', { js: ['application.js'] });
});

router.get('/application_submission', withAuth, function (req, res) {
  res.render('application_submission', { js: ['application_submission.js'] });
});

module.exports = router;
