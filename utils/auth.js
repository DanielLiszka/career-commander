// insert this in All the routes to prevent direct access by unauthorized  users
// ex. router.get('/', withAuth, (req, res) => {

const withAuth = (req, res, next) => {
  if (!req.session.user_id) {
    res.redirect('/login');
  } else {
    next();
  }
};

module.exports = withAuth;
