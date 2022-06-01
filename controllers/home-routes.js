var path = require("path");
const router = require("express").Router();

router.get("/", function (req, res) {
  if (req.user) {
    res.redirect("/dashboard");
  } else {
    res.render("login", { js: ["login.js"] });
  }
});

router.get("/signup", function (req, res) {
  if (req.user) {
    res.redirect("/dashboard");
  } else {
    res.render("signup", { js: ["signup.js"] });
  }
});

router.get("/dashboard", function (req, res) {
  res.render("dashboard", { js: ["dashboard.js"] });
});

router.get("/resume", function (req, res) {
  res.render("resume", { js: ["resume.js"] });
});

router.get("/application", function (req, res) {
  res.render("application", { js: ["application.js"] });
});

module.exports = router;
