// This file is for all the resume routes
const router = require('express').Router();
const { Resume, User } = require('../../models');

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

module.exports = router;
