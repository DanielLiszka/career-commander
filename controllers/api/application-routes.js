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
            attributes: ['name', 'location', 'close_date', 'description'],
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
        // also include company, manager, position, and resume IDs to make put requests easier.
        include: [
          {
            model: Company,
            attributes: ['id', 'name'],
          },
          {
            model: Manager,
            attributes: ['id', 'first_name', 'last_name', 'email', 'phone'],
          },
          {
            model: Position,
            attributes: ['id', 'name', 'location', 'close_date'],
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
        raw: true,
        nest: true,
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
router.delete('/:id', async (req, res) => {
  try {
    // check if user logged-in
    if (req.session.loggedIn) {
      //get application foreign keys
      const applicationForeignKeys = await Application.findOne({
        // get relavent foreign keys for the passed id and logged-in user
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
        attributes: ['position_id', 'manager_id', 'company_id'],
      });
      if (!applicationForeignKeys) {
        res.status(404).json({
          message:
            "The logged in user doesn't have any applications with the provided id",
        });
        return;
      }
      // delete application
      const applicationData = await Application.destroy({
        // Will only delete an appliation if the passed id matches and the logged-in user matches
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
      if (!applicationData) {
        res.status(404).json({
          message:
            "The logged in user doesn't have any applications with the provided id",
        });
        return;
      }
      //**** NOTE - Could not refactor the following "check" routines into a separate function because the left side of the "where" option would not take a variable. ****

      //check position_id
      const applicationArrayP = await Application.findAll({
        attributes: ['id'],
        where: {
          position_id: applicationForeignKeys.position_id,
        },
      });
      if (!applicationArrayP) {
        res.status(404).json({
          message:
            'Could not find any applicatons with the provided position_id',
        });
        return;
      } else {
        if (applicationArrayP.length > 1) {
          console.log(
            'postion_id ' +
              applicationForeignKeys.position_id +
              ' was not deleted on application id ' +
              req.params.id +
              ' delete'
          );
        } else {
          const positionData = await Position.destroy({
            where: {
              id: applicationForeignKeys.position_id,
            },
          });
          if (!positionData) {
            res.status(404).json({
              message: 'Could not find any positons with the provided id',
            });
            return;
          }
          console.log(
            'postion_id ' +
              applicationForeignKeys.position_id +
              ' was deleted on application id ' +
              req.params.id +
              ' delete'
          );
        }
      }

      //check manager_id
      const applicationArrayM = await Application.findAll({
        attributes: ['id'],
        where: {
          manager_id: applicationForeignKeys.manager_id,
        },
      });
      if (!applicationArrayM) {
        res.status(404).json({
          message: 'Could not find an application with the provided manager id',
        });
        return;
      } else {
        if (applicationArrayM.length > 1) {
          console.log(
            'manager_id ' +
              applicationForeignKeys.manager_id +
              ' was not deleted on application id ' +
              req.params.id +
              ' delete'
          );
        } else {
          const managerData = await Manager.destroy({
            where: {
              id: applicationForeignKeys.manager_id,
            },
          });
          if (!managerData) {
            res
              .status(404)
              .json({ message: 'Could not find a manager with the given id' });
            return;
          }
          console.log(
            'manager_id ' +
              applicationForeignKeys.manager_id +
              ' was deleted on application id ' +
              req.params.id +
              ' delete'
          );
        }
      }

      //check company_id
      const applicationArrayC = await Application.findAll({
        attributes: ['id'],
        where: {
          company_id: applicationForeignKeys.company_id,
        },
      });
      if (!applicationArrayC) {
        res.status(404).json({
          message: 'There was no application with the provided company_id',
        });
        return;
      } else {
        if (applicationArrayC.length > 1) {
          console.log(
            'company_id ' +
              applicationForeignKeys.company_id +
              ' was not deleted on application id ' +
              req.params.id +
              ' delete'
          );
        } else {
          const companyData = await Company.destroy({
            where: {
              id: applicationForeignKeys.company_id,
            },
          });
          if (!companyData) {
            res
              .status(404)
              .json({ message: 'There was no company with the provided id' });
            return;
          }
          console.log(
            'company_id ' +
              applicationForeignKeys.company_id +
              ' was deleted on application id ' +
              req.params.id +
              ' delete'
          );
        }
      }

      // Make sure the dashboard page refreshes
      res.redirect('/dashboard');
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
