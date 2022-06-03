// These are the routes to handle delivering/creating/updating and deleting job application information
const router = require('express').Router();
const {
  Application,
  Company,
  Manager,
  Position,
  Resume,
  User,
} = require('../../models');

// Getting all the applications for the dashboard
router.get('/', async (req, res) => {
  try {
    //check if logged in
    if (req.session.loggedIn) {
      const applicationData = await Application.findAll({
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
            attributes: ['name', 'location', 'close_date'],
          },
          {
            model: Resume,
            attributes: ['name', 'description'],
          },
          {
            model: User,
            attributes: ['first_name', 'last_name'],
            order: [['last_name', 'DESC']],
          },
        ],
      });
      res.json(applicationData);
    } else {
      // if not logged-in, send a msg to the client and redirect to the homepage/login screen
      res.json({ message: 'A user must be logged in.' });
      res.redirect('/');
      return;
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Get a single application
router.get('/:id', async (req, res) => {
  try {
    // check for logged-in user
    if (req.session.loggedIn) {
      const applicationData = await Application.findOne({
        // check for match to application id and logged-in user
        where: {
          id: req.params.id,
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
            attributes: ['name', 'location', 'close_date'],
          },
          {
            model: Resume,
            attributes: ['name', 'description'],
          },
          {
            model: User,
            attributes: ['first_name', 'last_name'],
            order: [['last_name', 'DESC']],
          },
        ],
      });
      res.json(applicationData);
    } else {
      // if not logged-in, send a msg to the client and redirect to the homepage/login screen
      res.json({ message: 'A user must be logged in.' });
      res.redirect('/');
      return;
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Create a new application
router.post('/', async (req, res) => {
  try {
    // check for logged-in user
    if (req.session.loggedIn) {
      const applicationData = await Application.create({
        offer: req.body.offer,
        accepted: req.body.accepted,
        interview1_date: req.body.interview1_date,
        interview2_date: req.body.interview2_date,
        interview3_date: req.body.interview3_date,
        interview4_date: req.body.interview4_date,
        position_id: req.body.position_id,
        resume_id: req.body.resume_id,
        company_id: req.body.company_id,
        manager_id: req.body.manager_id,
        // comment the next line out once the front-end is working
        //user_id: req.body.user_id,
        // pulling user_id from session - commented out for back-end testing
        user_id: req.session.user_id,
      });
      res.json(applicationData);
    } else {
      // if not logged-in, send a msg to the client and redirect to the homepage/login screen
      res.json({ message: 'A user must be logged in.' });
      res.redirect('/');
      return;
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Updating a specific application - need to get user id from cookie
router.put('/:id', async (req, res) => {
  try {
    // check if user logged-in
    if (req.session.loggedIn) {
      const applicationData = await Application.update(
        {
          offer: req.body.offer,
          accepted: req.body.accepted,
          interview1_date: req.body.interview1_date,
          interview2_date: req.body.interview2_date,
          interview3_date: req.body.interview3_date,
          interview4_date: req.body.interview4_date,
          position_id: req.body.position_id,
          resume_id: req.body.resume_id,
          company_id: req.body.company_id,
          manager_id: req.body.manager_id,
          // don't want to update the user_id - that shouldn't change
        },
        {
          where: {
            // only changing the application that matches the passed id and the logged-in user
            id: req.params.id,
            user_id: req.session.user_id,
          },
        }
      );
      res.json(applicationData);
    } else {
      // if not logged-in, send a msg to the client and redirect to the homepage/login screen
      res.json({ message: 'A user must be logged in.' });
      res.redirect('/');
      return;
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// delete an application
// Need to add code/helper to check that the user logged in owns the resume being accessed/created/updated/deleted.
router.delete('/:id', async (req, res) => {
  try {
    // check if user logged-in
    if (req.session.loggedIn) {
      const applicationData = await Application.destroy({
        // Will only delete an appliation if the passed id matches and the logged-in user matches
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
      res.json(applicationData);
    } else {
      // if not logged-in, send a msg to the client and redirect to the homepage/login screen
      res.json({ message: 'A user must be logged in.' });
      res.redirect('/');
      return;
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
