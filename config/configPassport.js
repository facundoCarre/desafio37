
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

const FACEBOOK_CLIENT_ID = process.argv[3] || '542559090213831'
const FACEBOOK_CLIENT_SECRET = process.argv[4] || '3f1cfb58db463bf5e0994f445cd8b0dd'

const pass = passport.use(new FacebookStrategy({
    clientID: FACEBOOK_CLIENT_ID,
    clientSecret: FACEBOOK_CLIENT_SECRET,
    callbackURL: '/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'photos', 'emails'],
    scope: ['email']
  }, function (accessToken, refreshToken, profile, done) {
    userProfile = profile;
    return done(null, userProfile);
  }));

  module.exports = {pass};