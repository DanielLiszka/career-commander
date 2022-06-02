// This file is for all the postion routes
const router = require('express').Router();
const e = require('express');
const { Position, Company, Manager } = require('../../models');
/* Insert withAuth into routes once front-end is built - ('/', withAuth, (req,res))
   This will insure that a user is logged in before accessing this route  */
const withAuth = require('../../utils/auth');

// Get all the positions - just need for testing
router.get('/', (req, res) => {
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
// Need to add code/helper to check that the user logged in owns the position being accessed/created/updated/deleted.
router.post('/', (req, res) => {
  Position.create({
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
router.put('/:id', (req, res) => {
  Position.update(
    {
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

// delete a position
// Need to add code/helper to check that the user logged in owns the position being accessed/created/updated/deleted.
router.delete('/:id', (req, res) => {
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
