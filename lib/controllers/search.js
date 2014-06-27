var knexDbConfig = require('../config/config').knexDbConfig,
    knex = require('knex')(knexDbConfig),
    bookshelf = require('bookshelf')(knex),
    angelList = require('./angelList'),
    Promise = require('bluebird'),
    angelData = require('../models/angelData')
    _ = require('underscore');


exports.companies = function(req, res) {
  //req.body is an array of objects that have a type and text
  var companies = [];
  var markets = [];

  //Separate markets and companies into arrays
  for(var i = 0; i < req.body.length;i++){
    if(req.body[i].type === "company"){
      companies.push(req.body[i].text);
    } else {
      markets.push(req.body[i].text);
    }
  }

  // for both search types, find investors through angel list and store in promises
  var promiseArrCompanies = companies.map(function (company) {
    return new Promise(function(resolve, reject) {
      angelList.findCompanysInvestors(company, function(data) {
        resolve(data);
      });
    });
  });

  var promiseArrMarkets = markets.map(function (market) {
    return new Promise(function(resolve, reject) {
      angelList.findMarketsInvestors(market, function(data) {
        resolve(data);
      });
    });
  });


  //once all angellist API queries have resolved, store in one array and send to front end
  Promise.all(promiseArrCompanies).then(function(companyInvestors) {
    Promise.all(promiseArrMarkets).then(function(marketInvestors) {
      var allInvestors = [];
      allInvestors = allInvestors.concat.apply(allInvestors, companyInvestors);
      allInvestors = allInvestors.concat.apply(allInvestors, marketInvestors);
      res.json(allInvestors, 200);
    });
  });


};

exports.allCompanies = function(req, res){
  var searchValue = req.params.value;
  var allCompanies = [];
  console.log(req.params.value);

  angelData.Company.query(function(qb) {
    qb.where('name', 'like', searchValue+'%');})
    .fetchAll()
    .then(function(companies){
      // for(var i = 0; i < 25; i++){
      //   allCompanies.push(companies)
      // }
      // console.log(allCompanies);

      res.json(companies,200);
    });
}

exports.allMarkets = function(req, res){

}

