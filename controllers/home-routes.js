var path = require('path');
const router = require('express').Router();
var withAuth = require('../utils/auth');
const {
  Application,
  Company,
  Manager,
  Position,
  Resume,
  User,
} = require('../models');

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

//Uses Mark's proposed route to obtain all resumes for user.
router.get('/resume', withAuth, async (req, res) => {
  try {
    const resume_data = await Resume.findAll({
      where: {
        user_id: req.session.user_id,
      },
      attributes: ['id', 'name', 'description', 'created_at'],
      include: {
        model: User,
        attributes: ['first_name', 'last_name'],
        order: [['last_name', 'DESC']],
      },
    });

    const resumes = resume_data.map((resume) => resume.get({ plain: true }));
    res.render('resume', { js: ['resume.js'], resumes });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
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
