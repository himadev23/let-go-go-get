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

  app.get('/login', function(req, res, next) {
    passport.authenticate('google', function(err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.redirect('/login');
      }
      req.logIn(user, function(err) {
        if (err) {
          return next(err);
        }
        return res.redirect('/users/' + user.username);
      });
    })(req, res, next);
  });
};