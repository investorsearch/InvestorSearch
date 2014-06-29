'use strict';

var knexDbConfig = require('../config/config').knexDbConfig,
    knex = require('knex')(knexDbConfig),
    bookshelf = require('bookshelf')(knex);

var Market_Company = bookshelf.Model.extend({
  tableName: 'market_company'
});

var Company_Investor = bookshelf.Model.extend({
  tableName: 'company_investor',
});

var Market_Investor = bookshelf.Model.extend({
  tableName: 'market_investor',
});

var Company = bookshelf.Model.extend({
  tableName: 'companies',
  investors: function() {
    return this.belongsToMany(Investor, 'company_investor', 'company_id', 'investor_id');
  }
});

var Market = bookshelf.Model.extend({
  tableName: 'markets',
  investors: function() {
    return this.belongsToMany(Investor, 'market_investor', 'market_id', 'investor_id');
  }
});

var Investor = bookshelf.Model.extend({
  tableName: 'investors',
  markets: function() {
    return this.belongsToMany(Market, 'market_investor', 'investor_id', 'market_id');
  },
  companies: function() {
    return this.belongsToMany(Company, 'company_investor', 'investor_id', 'company_id');
  }
});

module.exports = {
  Company: Company,
  Market: Market,
  Investor: Investor,
  Market_Company: Market_Company,
  Company_Investor: Company_Investor,
  Market_Investor: Market_Investor
};