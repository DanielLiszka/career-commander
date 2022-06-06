// This file is for all the resume routes
const router = require('express').Router();
const { Resume, User } = require('../../models');

// Get all the resumes with the user info
router.get('/', async (req, res) => {
  try {
    //check for logged in user
    if (req.session.loggedIn) {
      const resumeData = await Resume.findAll({
        // only pulling back data for the logged-in user
        where: {
          user_id: req.session.user_id,
        },
        attributes: ['id', 'name', 'description', 'created_at'],
        include: {
          model: User,
          attributes: ['first_name', 'last_name'],
        },
        order: ['created_at', 'DESC'],
      });
      res.json(resumeData);
    } else {
      res.json({ message: 'A user must be logged in.' });
      res.redirect('/');
      return;
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Get just one resume with user info
router.get('/:id', async (req, res) => {
  try {
    // check for logged in user
    if (req.session.loggedIn) {
      const resumeData = await Resume.findOne({
        // check for both the correct resume id and a user_id matching the logged-in user
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
        attributes: ['id', 'name', 'description', 'created_at'],
        include: {
          model: User,
          attributes: ['first_name', 'last_name'],
        },
      });
      res.json(resumeData);
    } else {
      res.json({ message: 'A user must be logged in.' });
      res.redirect('/');
      return;
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Create a new resume - need to get user id from cookie
router.post('/', async (req, res) => {
  try {
    //check for logged in user
    if (req.session.loggedIn) {
      const resumeData = await Resume.create({
        // Please note the JSON field name that this route is expecting, i.e. resume_name instead of just name
        name: req.body.resume_name,
        description: req.body.resume_description,
        // comment the next line out once the front-end is working
        //user_id: req.body.user_id,
        // pulling user_id from cookie - commented out for back-end testing
        user_id: req.session.user_id,
      });
      res.json(resumeData);
    } else {
      res.json({ message: 'A user must be logged in.' });
      res.redirect('/');
      return;
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Updating a specific resume - need to get user id from cookie
router.put('/:id', async (req, res) => {
  try {
    //check for logged-in user
    if (req.session.loggedIn) {
      const resumeData = await Resume.update(
        {
          // Please note the JSON field name that this route is expecting, i.e. resume_name instead of just name
          name: req.body.resume_name,
          description: req.body.resume_description,
          // don't want to update the user_id - that shouldn't change
        },
        {
          // check for both resume id and that the user_id matches the logged-in user
          where: {
            id: req.params.id,
            user_id: req.session.user_id,
          },
        }
      );
      res.json(resumeData);
    } else {
      res.json({ message: 'A user must be logged in.' });
      res.redirect('/');
      return;
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// delete a resume
// Need to add code/helper to check that the user logged in owns the resume being accessed/created/updated/deleted.
router.delete('/:id', async (req, res) => {
  try {
    //check for logged-in user
    if (req.session.loggedIn) {
      const resumeData = Resume.destroy({
        // only delete resume where the id matches and the user_id matches the logged-in user
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
      res.json(resumeData);
    } else {
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
