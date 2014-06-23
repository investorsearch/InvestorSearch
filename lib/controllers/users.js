'use strict';

// var mongoose = require('mongoose'),
//     User = mongoose.model('User'),
//     passport = require('passport');

var passport = require('passport'),
    knexDbConfig = require('../config/config').knexDbConfig,
    knex = require('knex')(knexDbConfig),
    bookshelf = require('bookshelf')(knex),
    User = require('../models/user');

/**
 * Create user
 */
exports.create = function (req, res, next) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  console.log('new user: ' + newUser);
  newUser.save().then(function(user) {
    console.log('saving new user...');
    //if (err) return res.json(400, err);
    console.log('after error')

    req.login(user, function(err) {
      if (err) return next(err);
      console.log('user info: ' + req.user.userInfo)

      return res.json(req.user.userInfo);
    });
  });
};

/**
 *  Get profile of specified user
 */
exports.show = function (req, res, next) {
  var userId = req.params.id;
  User
      .query({where: {id: userId}})
      .fetch({require: true})
      .then(function(err, user){
        console.log("error in show:" + err)
        console.log("user in show: " + user)
        if (err) return next(err);
        if (!user) return res.send(404);

        res.send({ profile: user.profile });
      });
}


/**
 * Change password
 */
exports.changePassword = function(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User
      .query({where: {id: userId}})
      .fetch({require: true})
      .then(function(err, user){
         if(user.authenticate(oldPass)) {
              user.password = newPass;
              user.save(function(err) {
                if (err) return res.send(400);

                res.send(200);
              });
            } else {
              res.send(403);
            }
      });
};

/**
 * Get current user
 */
exports.me = function(req, res) {
  res.json(req.user || null);
};
