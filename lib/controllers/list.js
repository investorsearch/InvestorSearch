var knexDbConfig = require('../config/config').knexDbConfig,
    knex = require('knex')(knexDbConfig),
    bookshelf = require('bookshelf')(knex),
    request = require("request"),
    UserList = require('../models/list').UserList,
    List = require('../models/list').List,
    Lists = require('../models/list').Lists,
    List_Investor = require('../models/list').List_Investor,
    List_Investor_Reason = require('../models/list').List_Investor_Reason,
    Promise = require('bluebird');


// Create a new list
exports.create = function(req, res) {
  console.log("in create route");
  console.log(req.body);

  var list = Lists.forge(req.body.investors);

  Promise.all(list.invoke('save')).then(function(){
    console.log('done making a new list')
  })



  res.json(200,req.body);

};
