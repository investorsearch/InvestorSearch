'use strict'

var knexDbConfig = require('../config/config').knexDbConfig,
    knex = require('knex')(knexDbConfig),
    bookshelf = require('bookshelf')(knex),
    bcrypt = require('bcrypt-nodejs');

var authTypes = ['github', 'twitter', 'facebook', 'google'];

bookshelf.plugin('virtuals');


var User = bookshelf.Model.extend({
  tableName: 'users',
  virtuals: {
    // Password
    password: {
      set: function(password) {
        console.log("setting password");
        this._password = password;
        this.hashedPassword = this.encryptPassword(password);
        console.log("hash: " +this.hashedPassword);
      },
      get: function() {
        return this._password;
      }
    },
    // Basic info to identify the current authenticated user in the app
    userInfo: {
      get: function() {
        return {
          'name': this.name,
          'role': this.role,
          'provider': this.provider
        }
      }
    },
    // Public Profile Info
    profile: {
      get: function() {
        return {
          'name': this.name,
          'role': this.role
        }
      }
    }
  },
  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} plainText
   * @return {Boolean}
   * @api public
   */
  authenticate: function(plainText) {
    console.log("authenticating...");
    console.log(this);
    console.log(this.attributes.hashedPassword);

    return bcrypt.compareSync(plainText, this.attributes.hashedPassword);

  },

  /**
   * Encrypt password
   *
   * @param {String} password
   * @return {String}
   * @api public
   */
  encryptPassword: function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  }
});


// var UsersCollection = bookshelf.Collection.extend({
//   model: User
// });

// /**
//  * Pre-save hook
//  */
// User
//   .on('saving', function(next) {
//     if (!this.isNew) return next();

//     if (!validatePresenceOf(this.hashedPassword) && authTypes.indexOf(this.provider) === -1)
//       next(new Error('Invalid password'));
//     else
//       next();
//   });


module.exports = User;
