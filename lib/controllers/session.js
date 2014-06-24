'use strict';

var passport = require('passport'),
    knexDbConfig = require('../config/config').knexDbConfig,
    knex = require('knex')(knexDbConfig),
    bookshelf = require('bookshelf')(knex);
/**
 * Logout
 */
exports.logout = function (req, res) {
  req.logout();
  res.send(200);
};

/**
 * Login
 */
exports.login = function (req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    console.log("error in login route " + err)
    console.log("in login route, here's the user: ");
    console.log(user);
    console.log("in login route, here's the info: ");
    console.log(info);
    var error = err || info;
    if (error) return res.json(401, error);
    console.log("we're right before req.login");
    console.log(req);
    console.log(req.logIn);
    req.logIn(user, function(err) {
      console.log("user is logged in (in the login route): ");
      console.log(user);

      if (err) return res.send(err);
      res.json(req.user.userInfo);
    });
  })(req, res, next);
};
