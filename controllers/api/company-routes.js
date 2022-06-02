// This file is for all the company routes
const router = require('express').Router();
const { Company } = require('../../models');

// Pull back all companies
router.get('/', (req, res) => {
  Company.findAll({
    attributes: ['id', 'name'],
  })
    .then((dbCompanyData) => res.json(dbCompanyData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(dbCompanyData);
    });
});

// Create a new company
router.post('/', (req, res) => {
  Company.create({
    name: req.body.company_name,
  })
    .then((dbCompanyData) => res.json(dbCompanyData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Updating a specific company
router.put('/:id', (req, res) => {
  Company.update(
    {
      name: req.body.name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbCompanyData) => {
      if (!dbCompanyData) {
        res.status(404).json({ message: 'No resume was found with that id.' });
        return;
      } else {
        res.json(dbCompanyData);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// delete a company
router.delete('/:id', (req, res) => {
  Company.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbCompanyData) => {
      if (!dbCompanyData) {
        res.status(404).json({ message: 'No resume was found with that id' });
        return;
      } else {
        res.json(dbCompanyData);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
