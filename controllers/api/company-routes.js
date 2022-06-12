// This file is for all the company routes
const router = require('express').Router();
const { Company } = require('../../models');

// withAuth is middleware that prevents access if there is not a user logged in.  This should prevent hacking with a tool like Insomnia.
const withAuth = require('../../utils/auth');

// Pull back all companies
router.get('/', withAuth, (req, res) => {
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
router.post('/', withAuth, (req, res) => {
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
router.put('/:id', withAuth, (req, res) => {
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

// delete a company.  Not used in production.  The deletes are done through the application delete.
router.delete('/:id', withAuth, (req, res) => {
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
