'use strict';

var mysql = require('mysql'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('../models/user');

/**
 * Passport configuration
 */
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User
      .query({where: {id: id}})
      .fetch({require: true})
      .then(function(user){
        done(null, user);
      });
  });

// add other strategies for more authentication flexibility
passport.use('local', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password' // this is the virtual field on the model
  },
  function(email, password, done) {
    User
      .query({where: {email: email}})
      .fetch()
      .then(function(user){
          //if(err) return done(err);

          if(!user) {
            return done(null, false, {message: 'This email is not registered.'})
          }
          if (!user.authenticate(password)) {
            return done(null, false, {
              message: 'This password is not correct.'
            });
          }
        return done(null, user, null);
      });
  }));



module.exports = passport;
