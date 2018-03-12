const passport = require("../services/passport.js");
var path = require("path");

module.exports = app => {

  app.get(
    '/login',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get('/auth/google/callback', passport.authenticate('google'), function(
    req,
    res
  ) {
    //res.send('hello');
    res.sendFile(path.join(__dirname, "../public/letGo.html"));
    console.log('request user check callback', req.user);

  });

  app.get('/api/currentUser', function(req, res) {
    res.send(req.user);
    console.log('request', req);
  });


  app.get('/auth/logout', function(req, res) {
    req.logout();
    console.log("logging out", req.user)
    res.redirect("/");
  });
};