var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var key = require('../config/keys.js');


passport.serializeUser((user, done) => {
  done(null, user.id);
  console.log('userId', user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    console.log('user', user);
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: key.googleClientID,
      clientSecret: key.googleClientSecretKey,
      callbackURL: '/auth/google/callback2',
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      // const existingUser = await User.findOne({ ID: profile.id });
      // if (existingUser) {
      // 	console.log(profile);
      //   done(null, existingUser);
      // } else {
      //   await new User({ ID: profile.id }).save();
      //   done(null, user);
      // }
      done(null, profile)
    }
  )
);

module.exports = passport