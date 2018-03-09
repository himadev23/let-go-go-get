const passport = require("../services/passport.js");

module.exports = app => {
  app.get(
    '/',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get('/auth/google/callback2', passport.authenticate('google'), function(
    req,
    res
  ) {
    res.send('hello');
  });

  app.get('/api/currentUser', function(req, res) {
    res.send(req.user);
    console.log('res',res);
  });

  app.get('/auth/logout', function(req, res) {
    req.logout();
    res.send(req.user);
  });
};
