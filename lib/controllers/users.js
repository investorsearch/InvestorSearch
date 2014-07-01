'use strict';

var passport = require('passport'),
    User = require('../models/user');


/**
 * Create user
 */
exports.create = function (req, res, next) {
  User.where({email: req.body.email}).fetch().then(function(user){
    if(user){
      return res.json(401,  {errors: {email: {message: "Email already exists"}}});
    } else {
        var newUser = new User(req.body).save().then(function(user) {
          User.where({id: user.id}).save({'hashedPassword': user.hashedPassword, "provider": "local"}, {method:"update"}).then(function(){
              req.login(user, function(err) {
                if (err) return next(err);
                console.log('user info: ');
                console.log(req.user.userInfo);

                return res.json(req.user.userInfo);
              });
          });
      });
    }
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
        if (err) return next(err);
        if (!user) return res.send(404);
        console.log('profile')
        console.log(user.profile);

        res.send({ profile: user.profile });
      });
}


/**
 * Change password
 */
exports.changePassword = function(req, res, next) {
  var userId = req.user.id;
  console.log(userId);
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User
      .query({where: {id: userId}})
      .fetch()
      .then(function(user){
         if(user.authenticate(oldPass)) {
            User.where({id: user.id}).save({'hashedPassword': user.attributes.hashedPassword}, {method:"update"}).then(function(){
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
