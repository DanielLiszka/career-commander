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

/* Insert withAuth into routes once front-end is built - ('/', withAuth, (req,res))
   This will insure that a user is logged in before accessing this route  */
const withAuth = require('../../utils/auth');

// Getting all the applications for the dashboard
// Need to add code/helper to check that the user logged in owns the application being accessed/created/updated/deleted.
router.get('/', (req, res) => {
  Application.findAll({
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
    Order: [['created_at', 'DESC']],
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
  })
    .then((dbResumeData) => res.json(dbResumeData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

/* Proposed code to get all the applications for the logged in user.
Would apply this to all the routes */
// router.get('/', async (req, res) => {
//     try {
//         if ( req.session.loggedIn) {
//             const applicationData = await Application.findAll({
//                 where: {
//                     user_id: req.session.user_id
//                 }
//                 attributes: [
//                   'id',
//                   'created_at',
//                   'offer',
//                   'accepted',
//                   'interview1_date',
//                   'interview2_date',
//                   'interview3_date',
//                   'interview4_date',
//                 ],
//                 Order: [['created_at', 'DESC']],
//                 include: [
//                   {
//                     model: Company,
//                     attributes: ['name'],
//                   },
//                   {
//                     model: Manager,
//                     attributes: ['first_name', 'last_name', 'email', 'phone'],
//                   },
//                   {
//                     model: Position,
//                     attributes: ['name', 'location', 'close_date'],
//                   },
//                   {
//                     model: Resume,
//                     attributes: ['name', 'description'],
//                   },
//                   {
//                     model: User,
//                     attributes: ['first_name', 'last_name'],
//                     order: [['last_name', 'DESC']],
//                   },
//                 ],
//             })
//             res.json(dbResumeData);
//         }
//     }
//     catch(err) {
//       console.log(err);
//       res.status(500).json(err);
//     };
// });

// Get a single application
// Need to add code/helper to check that the user logged in owns the application being accessed/created/updated/deleted.
router.get('/:id', (req, res) => {
  Application.findOne({
    where: {
      id: req.params.id,
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
    Order: [['created_at', 'DESC']],
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
  })
    .then((dbApplicationData) => {
      if (!dbApplicationData) {
        res
          .status(404)
          .json({ message: 'No application with that id was found' });
        return;
      } else {
        res.json(dbApplicationData);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Create a new application
// Need to add code/helper to check that the user logged in owns the resume being accessed/created/updated/deleted.
router.post('/', (req, res) => {
  Application.create({
    offer: req.body.offer,
    accepted: req.body.accepted,
    interview1_date: req.body.interview1_date,
    interview2_date: req.body.interview2_date,
    interview3_date: req.body.interview3_date,
    interview4_date: req.body.interview4_date,
    postion_id: req.body.position_id,
    resume_id: req.body.resume_id,
    company_id: req.body.company_id,
    manager_id: req.body.manager_id,
    // comment the next line out once the front-end is working
    user_id: req.body.user_id,
    // pulling user_id from cookie - commented out for back-end testing
    // user_id: req.session.user_id,
    // Code below was an attempt to save an entire screen of data in one route.
    // Can't figure out how to get the foreign keys.
    // company: {
    //   name: req.body.company_name,
    // },
    // position: {
    //   name: req.body.postion_name,
    //   description: req.body.position_description,
    //   location: req.body.position_location,
    //   close_date: req.body.position_close_date,
    //   company_id: req.body.company_id,
    //   manager_id: req.body.manager_id,
    // },
    // manager: {
    //   first_name: req.body.manager_first_name,
    //   last_name: req.body.manager_last_name,
    //   email: req.body.manager_email,
    //   phone: req.body.manager_phone,
    //   company_id: req.body.company_id,
    // },
    // resume: {
    //   name: req.body.resume_name,
    //   description: req.body.resume_description,
    //   user_id: req.body.user_id,
    // },
  })
    .then((dbApplicationData) => res.json(dbApplicationData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Updating a specific application - need to get user id from cookie
// Need to add code/helper to check that the user logged in owns the resume being accessed/created/updated/deleted.
router.put('/:id', (req, res) => {
  Application.update(
    {
      offer: req.body.offer,
      accepted: req.body.accepted,
      interview1_date: req.body.interview1_date,
      interview2_date: req.body.interview2_date,
      interview3_date: req.body.interview3_date,
      interview4_date: req.body.interview4_date,
      postion_id: req.body.position_id,
      resume_id: req.body.resume_id,
      company_id: req.body.company_id,
      manager_id: req.body.manager_id,
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
    .then((dbApplicationData) => {
      if (!dbApplicationData) {
        res.status(404).json({ message: 'No resume was found with that id.' });
        return;
      } else {
        res.json(dbApplicationData);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// delete an application
// Need to add code/helper to check that the user logged in owns the resume being accessed/created/updated/deleted.
router.delete('/:id', (req, res) => {
  Application.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbApplicationData) => {
      if (!dbApplicationData) {
        res
          .status(404)
          .json({ message: 'No application was found with that id' });
        return;
      } else {
        res.json(dbApplicationData);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
