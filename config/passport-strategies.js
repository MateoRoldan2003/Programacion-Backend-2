const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('./models/user');
const config = require('../config');
const bcrypt = require('bcrypt');

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return done(null, false, { message: 'Incorrect email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      return done(null, user);
    } else {
      return done(null, false, { message: 'Incorrect email or password' });
    }
  } catch (error) {
    return done(error);
  }
}));

passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromCookie(),
  secretOrKey: config.jwtSecret
}, async (payload, done) => {
  try {
    const user = await User.findById(payload.id);

    if (!user) {
      return done(null, false);
    }

    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
}));


