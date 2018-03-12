var path = require("path");

const passport = require("../services/passport.js");

function loggedIn(req, res, next) {
  if (req.user) {
    return next();
  } else {
    res.redirect('/login');
  }
}

module.exports = function(app) {

  // display home page
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/home.html"));
  });

  // display page to add a new item (show a form)
  app.get("/items/new", loggedIn, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/letGo.html"));
  });

  // html route to display all items
  app.get("/items", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/home.html"));
  });
};