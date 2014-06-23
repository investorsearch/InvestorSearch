'use strict';

var knexDbConfig = require('../config/config').knexDbConfig,
    knex = require('knex')(knexDbConfig),
    bookshelf = require('bookshelf')(knex);


var Company = bookshelf.Model.extend({
  tableName: 'companies',
});

var Market = bookshelf.Model.extend({
  tableName: 'markets',

});

var Investor = bookshelf.Model.extend({
  tableName: 'investors'
});

var Market_Company = bookshelf.Model.extend({
  tableName: 'market_company'
});

var Company_Investor = bookshelf.Model.extend({
  tableName: 'company_investor'
});

var Market_Investor = bookshelf.Model.extend({
  tableName: 'market_investor'
});

module.exports = {
  Company: Company,
  Market: Market,
  Investor: Investor,
  Market_Company: Market_Company,
  Company_Investor: Company_Investor,
  Market_Investor: Market_Investor
};