var path = require('path');
const router = require('express').Router();
const dayjs = require('dayjs');
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

router.get('/change', withAuth, async function (req, res) {
  try {
    // Get user id and e-mail
    const user_data = await User.findOne({
      // attributes: {
      //   exclude: ['password'],
      // },
      attributes: ['id', 'email'],
      where: {
        id: req.session.user_id,
      },
    });
    const user = user_data.get({ plain: true });

    res.render('change', { js: ['change.js'], user });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Get user first and last name for welcome message.
    const user_data = await User.findOne({
      //attributes: { exclude: ['password'] },
      attributes: ['id', 'first_name', 'last_name'],
      where: {
        id: req.session.user_id,
      },
    });

    const user = user_data.get({ plain: true });

    // added resume data to support drop-down menu for resumes on the appliation edit modal
    const resume_data = await Resume.findAll({
      attributes: ['id', 'name', 'description', 'user_id', 'created_at'],
      // only pulling back data for the logged-in user
      where: {
        user_id: req.session.user_id,
      },
    });

    var resumes = resume_data.map((resume) => resume.get({ plain: true }));

    const application_data = await Application.findAll({
      // only pull back applications matching the logged-in user
      where: {
        user_id: req.session.user_id,
      },
      attributes: [
        'id',
        'created_at',
        'offer',
        'accepted',
        'interview1_date',
        'interview2_date',
        'interview3_date',
        'interview4_date',
      ],
      order: [['created_at', 'DESC']],
      include: [
        {
          model: Company,
          attributes: ['name'],
        },
        {
          model: Manager,
          attributes: ['first_name', 'last_name', 'email', 'phone'],
        },
        {
          model: Position,
          attributes: ['name', 'location', 'close_date', 'description'],
        },
        {
          model: Resume,
          attributes: ['id', 'name', 'description'],
        },
        {
          model: User,
          attributes: ['first_name', 'last_name'],
          order: [['last_name', 'DESC']],
        },
      ],
    });

    const applications = application_data.map((application) =>
      application.get({ plain: true })
    );

    // This reformats the application close date and interview dates to a more readable MM/DD/YYYY
    const reformated_applications = applications.map((application) => {
      if (application.position.close_date) {
        application.position.close_date = dayjs(
          application.position.close_date
        ).format('MM/DD/YYYY');
      }
      if (application.interview1_date) {
        application.interview1_date = dayjs(application.interview1_date).format(
          'MM/DD/YYYY'
        );
      }
      if (application.interview2_date) {
        application.interview2_date = dayjs(application.interview2_date).format(
          'MM/DD/YYYY'
        );
      }
      if (application.interview3_date) {
        application.interview3_date = dayjs(application.interview3_date).format(
          'MM/DD/YYYY'
        );
      }
      if (application.interview4_date) {
        application.interview4_date = dayjs(application.interview4_date).format(
          'MM/DD/YYYY'
        );
      }
      return application;
    });

    res.render('dashboard', {
      js: ['dashboard.js', 'application.js'],
      reformated_applications,
      resumes,
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/application', withAuth, async (req, res) => {
  try {
    // Get user first and last name for welcome message.
    const user_data = await User.findOne({
      //attributes: { exclude: ['password'] },
      attributes: ['id', 'first_name', 'last_name'],
      where: {
        id: req.session.user_id,
      },
    });

    const user = user_data.get({ plain: true });

    // Get list of all resumes for the logged in user
    const resume_data = await Resume.findAll({
      attributes: ['id', 'name', 'description', 'user_id', 'created_at'],
      where: {
        user_id: req.session.user_id,
      },
    });

    const resumes = resume_data.map((resume) => resume.get({ plain: true }));

    res.render('application', { js: ['application.js'], user, resumes });
  } catch (err) {
    console.log(err);
  }
});

router.get('/resume', withAuth, async (req, res) => {
  try {
    // Get list of all resumes for the logged in user
    const resume_data = await Resume.findAll({
      attributes: ['id', 'name', 'description', 'user_id', 'created_at'],
      where: {
        user_id: req.session.user_id,
      },
    });

    const resumes = resume_data.map((resume) => resume.get({ plain: true }));

    res.render('resume', { js: ['resume.js'], resumes });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
