'use strict';

// var mongoose = require('mongoose'),
//     User = mongoose.model('User'),
var mysql = require('mysql'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    knexDbConfig = require('../config/config').knexDbConfig,
    knex = require('knex')(knexDbConfig),
    bookshelf = require('bookshelf')(knex),
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
      // .select('salt', 'hashedPassword')
      .fetch({require: true})
      .then(function(user){
        done(null, user);
      });
  });

// add other strategies for more authentication flexibility
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password' // this is the virtual field on the model
  },
  function(email, password, done) {
    console.log("password: "+ password)

    User
      .query({where: {email: email.toLowerCase()}})
      .fetch({require: true})
      .then(function(user){
          //if(err) return done(err);
          console.log("found the user in local strategy. " + user);

          if(!user) {
            return done(null, false, {message: 'This email is not registered.'})
          }
          if (!user.authenticate(password)) {
            return done(null, false, {
              message: 'This password is not correct.'
            });
          }
        return done(null, user);
      })
  }));

module.exports = passport;
