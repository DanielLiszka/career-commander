// This file is for all the manager routes
const router = require('express').Router();
const { Manager, Company } = require('../../models');
/* Insert withAuth into routes once front-end is built - ('/', withAuth, (req,res))
   This will insure that a user is logged in before accessing this route.  This will prevent hacking using a tool like Insomnia. */
const withAuth = require('../../utils/auth');

// Get all managers for testing purposes only. Not used in production.
router.get('/', withAuth, (req, res) => {
  Manager.findAll({
    attributes: [
      'id',
      'first_name',
      'last_name',
      'email',
      'phone',
      'company_id',
    ],
    include: {
      model: Company,
      attributes: ['name'],
    },
  })
    .then((dbManagerData) => res.json(dbManagerData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Create a new manager
router.post('/', withAuth, (req, res) => {
  Manager.create({
    // Please note the JSON field name that this route is expecting, i.e. manager_first_name instead of just first_name
    first_name: req.body.manager_first_name,
    last_name: req.body.manager_last_name,
    email: req.body.manager_email,
    phone: req.body.manager_phone,
    company_id: req.body.company_id,
  })
    .then((dbManagerData) => res.json(dbManagerData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Update a manager
router.put('/:id', withAuth, (req, res) => {
  Manager.update(
    {
      // Please note the JSON field name that this route is expecting, i.e. manager_first_name instead of just first_name
      first_name: req.body.manager_first_name,
      last_name: req.body.manager_last_name,
      email: req.body.manager_email,
      phone: req.body.manager_phone,
      company_id: req.body.company_id,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbManagerData) => {
      if (!dbManagerData) {
        res.status(404).json({ message: 'No manager with that id was found' });
        return;
      } else {
        res.json(dbManagerData);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// delete a manager.  Not used in production.  The deletes are done through the application delete.
router.delete('/:id', withAuth, (req, res) => {
  Manager.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbManagerData) => {
      if (!dbManagerData) {
        res.status(404).json({ message: 'No manager was found with that id' });
        return;
      } else {
        res.json(dbManagerData);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
