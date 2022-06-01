const router = require('express').Router();
const {
  Application,
  Company,
  Manager,
  Position,
  Resume,
  User,
} = require('../../models');

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
        attributes: ['name', 'close_date'],
      },
      {
        model: Resume,
        attributes: ['name'],
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

module.exports = router;
