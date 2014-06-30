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
  var name = req.body.tableName;
  var user = req.user;
  var date = new Date();
  var listId;

  List.forge({user_id: user.id, list_name: name, date_created: date}).save().then(function(list){
    console.log("Done creating the table.");
    listId = list.attributes.id;

    // we will need to adjust this to show 'hidden' investors
    for(var i = 0; i < investors.length; i++){
      var currInvestor = investors[i];
      var hidden;

      console.log("hidden: "+ currInvestor.hidden);

      if(currInvestor.hidden === 1){
        hidden = 1;
      } else{
        hidden = null;
      }
      List_Investor.forge({investor_id: currInvestor.id, list_id: listId, hidden: hidden}).save().then(function(investor){
        console.log("forged a new investor "+ i + " of " + investors.length);
        console.log(investor);
        var market;
        var company;
        console.log("current investor:");
        console.log(currInvestor);

        // need to loop through reasons

        if(currInvestor.search_reason.hasOwnProperty("market")){
          market = currInvestor.search_reason.market;
          company = null;
        } else if (currInvestor.search_reason.hasOwnProperty("company")){
          company = currInvestor.search_reason.company;
          market = null;
        };
        console.log(company);
        console.log(market);
        List_Investor_Reason.forge({list_investor_id:investor.attributes.id, match_reason_co_id: company, match_reason_mar_id: market}).save().then(function(){
          console.log("done saving");
          res.json(200);
        });
      });
    }
  });




  res.json(200,req.body);

};
