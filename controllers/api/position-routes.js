// This file is for all the postion routes
const router = require('express').Router();
const e = require('express');
const { Position, Company, Manager } = require('../../models');
/* Insert withAuth into routes once front-end is built - ('/', withAuth, (req,res))
   This will insure that a user is logged in before accessing this route.  This protects against hacking with a tool like Insomnia. */
const withAuth = require('../../utils/auth');

// Get all the positions - just need for testing.  Not used in production.
router.get('/', withAuth, (req, res) => {
  Position.findAll({
    attributes: [
      'id',
      'name',
      'description',
      'location',
      'close_date',
      'company_id',
      'manager_id',
    ],
    include: [
      {
        model: Company,
        attributes: ['name'],
      },
      {
        model: Manager,
        attributes: ['first_name', 'last_name'],
      },
    ],
  })
    .then((dbPositionData) => res.json(dbPositionData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Create a new position
router.post('/', withAuth, (req, res) => {
  Position.create({
    // Please note the JSON field name that this route is expecting, i.e. position_name instead of just name
    name: req.body.position_name,
    description: req.body.position_description,
    location: req.body.position_location,
    close_date: req.body.position_close_date,
    company_id: req.body.company_id,
    manager_id: req.body.manager_id,
  })
    .then((dbPositionData) => res.json(dbPositionData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Update a position
router.put('/:id', withAuth, (req, res) => {
  Position.update(
    {
      // Please note the JSON field name that this route is expecting, i.e. position_name instead of just name
      name: req.body.position_name,
      description: req.body.position_description,
      location: req.body.position_location,
      close_date: req.body.position_close_date,
      company_id: req.body.company_id,
      manager_id: req.body.manager_id,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbPositionData) => {
      if (!dbPositionData) {
        res
          .status(404)
          .json({ message: 'Position with that id was not found' });
        return;
      } else {
        res.json(dbPositionData);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// delete a position - Not used in production.  The deletes are done through the application delete.
router.delete('/:id', withAuth, (req, res) => {
  Position.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbPositionData) => {
      if (!dbPositionData) {
        res.status(404).json({ message: 'No position was found with that id' });
        return;
      } else {
        res.json(dbPositionData);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
