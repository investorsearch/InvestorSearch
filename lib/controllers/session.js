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
    console.log("in login route, here's the user: " + user)
    console.log("in login route, here's the info: " + info.message)
    var error = err || info;
    if (error) return res.json(401, error);

    req.login(user, function(err) {
      console.log("user is logged in (in the login route): " + user)
      if (err) return res.send(err);
      res.json(req.user.userInfo);
    });
  })(req, res, next);
};
