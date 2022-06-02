// This file is for all the resume routes
const router = require('express').Router();
const { Resume, User } = require('../../models');
/* Insert withAuth into routes once front-end is built - ('/', withAuth, (req,res))
   This will insure that a user is logged in before accessing this route  */
const withAuth = require('../../utils/auth');

// Get all the resumes with the user info
// Need to add code/helper to check that the user logged in owns the resume being accessed/created/updated/deleted.
router.get('/', (req, res) => {
  Resume.findAll({
    attributes: ['id', 'name', 'description', 'created_at'],
    include: {
      model: User,
      attributes: ['first_name', 'last_name'],
      order: [['last_name', 'DESC']],
    },
  })
    .then((dbResumeData) => res.json(dbResumeData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

/* Proposed code to get all the resumes for the logged in user.
Would apply this to all the routes */
// router.get('/', async (req, res) => {
//   try {
//     // check for loggedIn user
//     if (req.session.loggedIn){
//       const resumeData = await Resume.findAll({
//         where: {
//           user_id: req.session.user_id
//         },
//         attributes: ['id', 'name', 'description', 'created_at'],
//         include: {
//           model: User,
//           attributes: ['first_name', 'last_name'],
//           order: [['last_name', 'DESC']],
//         },
//       })
//        res.json(resumeData);
//     }

//   }
//   catch(err) {
//       console.log(err);
//       res.status(500).json(err);
//   };
// });

// Get just one resume with user info
// Need to add code/helper to check that the user logged in owns the resume being accessed/created/updated/deleted.
router.get('/:id', (req, res) => {
  Resume.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ['id', 'name', 'description', 'created_at'],
    include: {
      model: User,
      attributes: ['first_name', 'last_name'],
      order: [['last_name', 'DESC']],
    },
  })
    .then((dbResumeData) => {
      if (!dbResumeData) {
        res.status(404).json({ message: 'There was no resume with that id.' });
        return;
      } else {
        res.json(dbResumeData);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Create a new resume - need to get user id from cookie
// Need to add code/helper to check that the user logged in owns the resume being accessed/created/updated/deleted.
router.post('/', (req, res) => {
  Resume.create({
    // Please note the JSON field name that this route is expecting, i.e. resume_name instead of just name
    name: req.body.resume_name,
    description: req.body.resume_description,
    // comment the next line out once the front-end is working
    //user_id: req.body.user_id,
    // pulling user_id from cookie - commented out for back-end testing
    user_id: req.session.user_id,
  })
    .then((dbResumeData) => res.json(dbResumeData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Updating a specific resume - need to get user id from cookie
// Need to add code/helper to check that the user logged in owns the resume being accessed/created/updated/deleted.
router.put('/:id', (req, res) => {
  Resume.update(
    {
      // Please note the JSON field name that this route is expecting, i.e. resume_name instead of just name
      name: req.body.resume_name,
      description: req.body.resume_description,
      // comment the next line out once the front-end is working
      user_id: req.body.user_id,
      // pulling user_id from cookie - commented out for back-end testing
      // user_id: req.session.user_id,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbResumeData) => {
      if (!dbResumeData) {
        res.status(404).json({ message: 'No resume was found with that id.' });
        return;
      } else {
        res.json(dbResumeData);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// delete a resume
// Need to add code/helper to check that the user logged in owns the resume being accessed/created/updated/deleted.
router.delete('/:id', (req, res) => {
  Resume.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbResumeData) => {
      if (!dbResumeData) {
        res.status(404).json({ message: 'No resume was found with that id' });
        return;
      } else {
        res.json(dbResumeData);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
