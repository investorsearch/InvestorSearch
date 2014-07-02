'use strict';

var knexDbConfig = require('../config/config').knexDbConfig,
    knex = require('knex')(knexDbConfig),
    User = require('./user').User,
    Investor = require('./angelData').Investor,
    Company = require('./angelData').Company,
    Market = require('./angelData').Market,
    bookshelf = require('bookshelf')(knex);



var masterList = bookshelf.Model.extend({
  tableName: 'list_of_investors'
});


module.exports = {
  masterList: masterList
};
