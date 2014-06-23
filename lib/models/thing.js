'use strict';

// var mongoose = require('mongoose'),
//     Schema = mongoose.Schema,

var knexDbConfig = require('../config/config').knexDbConfig,
    knex = require('knex')(knexDbConfig),
    bookshelf = require('bookshelf')(knex);

/**
 * Thing Schema
 */
// This is how it was done in Mongoose
// var ThingSchema = new Schema({
//   name: String,
//   info: String,
//   awesomeness: Number
// });

var Thing = bookshelf.Model.extend({
  tableName: 'things'
});

module.exports = Thing;

/**
 * Validations
 */
// ThingSchema.path('awesomeness').validate(function (num) {
//   return num >= 1 && num <= 10;
// }, 'Awesomeness must be between 1 and 10');

// mongoose.model('Thing', ThingSchema);
