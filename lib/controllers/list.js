var knexDbConfig = require('../config/config').knexDbConfig,
    knex = require('knex')(knexDbConfig),
    bookshelf = require('bookshelf')(knex),
    request = require("request"),
    // UserList = require('../models/list').UserList,
    List = require('../models/list').List,
    List_Investor = require('../models/list').List_Investor,
    List_Investor_Reason = require('../models/list').List_Investor_Reason,
    Q = require('q');


// Create a new list
exports.create = function(req, res) {
  console.log("in create route");

  var investors = req.body.investors;
  var name = req.body.tableName
  var user = req.user;
  var date = new Date();
  var listId;

  List.forge({user_id: user.id, list_name: name, date_created: date}).save().then(function(list){
    console.log("Done creating the table.");
    listId = list.attributes.id;

    // we will need to adjust this to show 'hidden' investors
    for(var i = 0; i < investors.length; i++){
      List_Investor.forge({investor_id: investors[i].id, list_id: listId}).save().then(function(){
        console.log("forged a new investor "+ i + " of " + investors.length);
      });
    }
  });




  res.json(200,req.body);

};
