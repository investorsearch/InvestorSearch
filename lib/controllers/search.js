var knexDbConfig = require('../config/config').knexDbConfig,
    knex = require('knex')(knexDbConfig),
    bookshelf = require('bookshelf')(knex);
    // Companies = require
    // Markets = require

exports.companies = function(req, res) {
  //req.body is an array of objects that have a type and text
  var companies = [];
  var markets = [];

  for(var i = 0; i < req.body.length;i++){
    if(req.body[i].type === "company"){
      companies.push(req.body[i].text);
    } else {
      markets.push(req.body[i].text);
    }
  }
  console.log("companies");
  console.log(companies);
  console.log("markets");
  console.log(markets);
  // bookshelf.whereIn('name', companies); // here we want the angel list id, then we want to hit the angel list api route
  // bookshelf.whereIn('name', market); // here we want the angel list id, then we want to hit the angel list api route

  var results = {
    id: 1,
    angelList_id: 1,
    name: 'Snapchat',
    crunchbase_permalink: 'marc-andreessen'
  }

  res.json(results, 200);
}

