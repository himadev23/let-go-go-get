var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var key = require('../config/keys.js');
//var User = require('../models/user');
var db = require("../models");


passport.serializeUser((user, done) => {
  done(null, user.id);
  // console.log('userId', user.id);
});

passport.deserializeUser((id, done) => {
  done(null, id);
  db.User.findById(id).then(user => {
    // console.log('user found:', user);
    
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: key.googleClientID,
      clientSecret: key.googleClientSecretKey,
      callbackURL: '/auth/google/callback',
      passReqToCallback   : true
      
    },
     (request, accessToken, refreshToken, profile, done) => {
       /*const existingUser = await User.findOne({ social_id: profile.id });
       console.log('existingUser',existingUser);
       if (existingUser) {
      	console.log(profile);
        done(null, existingUser);
       } else {
       await new User({ social_id: profile.id }).save();
       done(null, user);
       }*/
      
       //db.User.create({social_id:profile.id},{Name:profile.displayName});
    
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