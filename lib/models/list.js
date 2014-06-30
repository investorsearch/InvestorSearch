'use strict';

var knexDbConfig = require('../config/config').knexDbConfig,
    knex = require('knex')(knexDbConfig),
    User = require('./user').User,
    Investor = require('./angelData').Investor,
    bookshelf = require('bookshelf')(knex);

// var User_List = bookshelf.Model.extend({
//   tableName: 'user_list'
// });


var List = bookshelf.Model.extend({
  tableName: 'List',
  investors: function(){
    return this.belongsToMany(Investor, 'list_investor', 'list_id', 'investor_id');
  }
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
