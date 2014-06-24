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
passport.use('local', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password' // this is the virtual field on the model
  },
  function(email, password, done) {
    console.log("email: " + email);
    console.log("password: "+ password);
    console.log(done);

    User
      .query({where: {email: email}})
      .fetch({require: true})
      .then(function(user){
          //if(err) return done(err);
          console.log("found the user in local strategy. " + user);

          if(!user) {
            return done(null, false, {message: 'This email is not registered.'})
          }
          console.log("checking the local authentication check: " + user);
          if (!user.authenticate(password)) {
            return done(null, false, {
              message: 'This password is not correct.'
            });
          }
        return done(null, user);
      })
  }));

// passport.use('local-signup', new LocalStrategy({

//         // by default, local strategy uses username and password, we will override with email
//         usernameField : 'email',
//         passwordField : 'password',
//         passReqToCallback : true // allows us to pass back the entire request to the callback
//     },
//     function(req, email, password, done) {
//       console.log(req);
//       console.log("email: " + email);
//       console.log("password: " + password)
//         process.nextTick(function() {
//         // we are checking to see if the user trying to login already exists

//         User
//       .query({where: {email: email}})
//       .fetch()
//       .then(function(user){
//           //if(err) return done(err);
//           console.log("found the user in local signup strategy. " + user);
//           if (user) {
//                 return done(null, false, {message: "That username is already taken."});
//             } else {

//                 // if there is no user with that email
//                 // create the user
//                 var newUser            = new User({name: name, email: email});

//                 // set the user's local credentials
//                 newUser.hashedPassword = newUser.encryptPassword(password);

//                 // save the user
//                 newUser.save().then(function(user) {
//                   return done(null, newUser);
//                 });
//               }
//       });
//     });
//   }));



module.exports = passport;
