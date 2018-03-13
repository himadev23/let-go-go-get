var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var key = require('../config/keys.js');
var db = require("../models");

passport.serializeUser((user, done) => {
  done(null, user.id);
  console.log('userId', user.id);
});

passport.deserializeUser((id, done) => {
  done(null, id);
  db.User.findById(id).then(user => {
    console.log('user found:', user);

  });
});

passport.use(
  new GoogleStrategy({
      clientID: key.googleClientID,
      clientSecret: key.googleClientSecretKey,
      callbackURL: '/auth/google/callback',
      passReqToCallback: true

    },
    (request, accessToken, refreshToken, profile, done) => {

       // Create a row in the user table with the Google profile ID, display name, and email address.
      db.User.create({
        social_id: profile.id, 
        Name: profile.displayName, 
        email: profile.emails[0].value
      });
      
      // Create a row in the item table with the Google profile ID as a foreign key
      db.Item.create({social_id:profile.id});

      done(null, profile);
    }
  )
);
/*var loggedIn=function(req,res,next) {
    if (req.user.authenticated) {
        return next();
    } else {
        res.redirect('/login');
    }
}*/

module.exports = passport;