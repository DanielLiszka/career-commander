// This file handles all the user routes including logon and logoff
const router = require('express').Router();
const { User } = require('../../models');

/* Insert withAuth into routes once front-end is built - ('/', withAuth, (req,res))
   This will insure that a user is logged in before accessing this route  */
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
  User.findAll({
    attributes: { exclude: ['password'] },
    // attributes: ['id', 'first_name', 'last_name', 'email', 'password'],
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  User.findOne({
    attributes: { exclude: ['password'] },
    // attributes: ['id', 'first_name', 'last_name', 'email', 'password'],
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  User.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
  })
    .then((dbUserData) => {
      // create a session and save variables to a cookie
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.email;
        req.session.loggedIn = true;

        res.json(dbUserData);
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// this route handles user logins with password hashing
router.post('/login', (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((dbUserData) => {
    if (!dbUserData) {
      res.status(400).json({ message: 'No user with that e-mail address!' });
      return;
    }
    // checkPassword is a User method that compares a provided password against the hashed password in the database
    // Check the User model for all the code around password hashing using bcrypt.
    const validPassword = dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password!' });
      return;
    }

    // create a session
    req.session.save(() => {
      // declare session variables - save to cookie
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.email;
      req.session.loggedIn = true;

      res.json({ user: dbUserData, message: 'You are now logged in!' });
    });
  });
});

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.put('/change/:id', withAuth, (req, res) => {
  User.update({
    // individualHooks: true,
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with that id' });
        return;
      } else {
        res.json({
          user: dbUserData,
          message: 'Password has been changed!',
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', withAuth, (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
