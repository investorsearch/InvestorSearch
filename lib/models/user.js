'use strict'

var knexDbConfig = require('../config/config').knexDbConfig,
    knex = require('knex')(knexDbConfig),
    bookshelf = require('bookshelf')(knex),
    Investor = require('./angelData.js').Investor,
    masterList = require('./masterList').masterList,
    bcrypt = require('bcrypt-nodejs');

var authTypes = ['github', 'twitter', 'facebook', 'google'];

bookshelf.plugin('virtuals');


var User = bookshelf.Model.extend({
  tableName: 'users',
  investors: function(){
    return this.belongsToMany(Investor, 'id').through(masterList);
  },
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
          'name': this.attributes.name,
          'role': this.attributes.role,
          'provider': this.attributes.provider
        }
      }
    },
    // Public Profile Info
    profile: {
      get: function() {
        return {
          'name': this.attributes.name,
          'role': this.attributes.role
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


module.exports = User;
