'use strict';

var knexDbConfig = require('../config/config').knexDbConfig,
    knex = require('knex')(knexDbConfig),
    bookshelf = require('bookshelf')(knex);

var User_List = bookshelf.Model.extend({
  tableName: 'user_list'
});


var List = bookshelf.Model.extend({
  tableName: 'List'
});

var Lists = bookshelf.Colelction.extend({
  model: 'List'
});

var List_Investor = bookshelf.Model.extend({
  tableName: 'list_investor'
});

var List_Investor_Reason = bookshelf.Model.extend({
  tableName: 'list_investor_reason'
});


module.exports = {
  UserList: User_List,
  List: List,
  Lists: Lists,
  List_Investor: List_Investor,
  List_Investor_Reason: List_Investor_Reason
};
