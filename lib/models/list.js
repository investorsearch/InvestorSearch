'use strict';

var knexDbConfig = require('../config/config').knexDbConfig,
    knex = require('knex')(knexDbConfig),
    User = require('./user').User,
    Investor = require('./angelData').Investor,
    Company = require('./angelData').Company,
    Market = require('./angelData').Market,
    bookshelf = require('bookshelf')(knex);

// var User_List = bookshelf.Model.extend({
//   tableName: 'user_list'
// });


var List = bookshelf.Model.extend({
  tableName: 'List',
  investors: function(){
    return this.belongsToMany(Investor, 'list_investor', 'list_id', 'investor_id');
  },
  company_reason: function() {
    return this.belongsToMany(Company, 'list_investor_reason', 'list_id', 'company_id')
  },
  market_reason: function() {
    return this.belongsToMany(Market, 'list_investor_reason', 'list_id', 'market_id')
  }
  // ,
  // reasons: function(){
  //   return this.belongsToMany(List_Investor_Reason).through(List_Investor)
  // }
});

var List_Investor = bookshelf.Model.extend({
  tableName: 'list_investor'
});

var List_Investor_Reason = bookshelf.Model.extend({
  tableName: 'list_investor_reason'
});


module.exports = {
  // UserList: User_List,
  List: List,
  List_Investor: List_Investor,
  List_Investor_Reason: List_Investor_Reason
};
