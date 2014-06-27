var knexDbConfig = require('../config/config').knexDbConfig,
    knex = require('knex')(knexDbConfig),
    bookshelf = require('bookshelf')(knex),
    angelList = require('./angelList'),
    Promise = require('bluebird'),
    angelData = require('../models/angelData'),
    updateDB = require('./updateDB'),
    _ = require('underscore');


exports.companies = function(req, res) {
  //req.body is an array of objects that have a type and text
  var companies = req.body;
  var markets = [];

  console.log(req.body);

  // //Separate markets and companies into arrays
  // for(var i = 0; i < req.body.length;i++){
  //   if(req.body[i].type === "company"){
  //     companies.push(req.body[i].text);
  //   } else {
  //     markets.push(req.body[i].text);
  //   }
  // }

  // for both search types, find investors through angel list and store in promises
  var promiseArrCompanies = companies.map(function (company) {
    return new Promise(function(resolve, reject) {
      angelList.findCompanysInvestors(company, function(companyInvestors) {
        resolve(companyInvestors);
        //save each investor to DB, along w/ link to market ()
        companyInvestors.forEach(function(companyInvestor) {
          updateDB.addNewInvestor(companyInvestor)
          .then(function(savedInvestor){
              updateDB.linkInvestorAndCompany(savedInvestor.id, company.id);
            });
        });
      });
    });
  });

  var promiseArrMarkets = markets.map(function (market) {
    return new Promise(function(resolve, reject) {
      angelList.findMarketsInvestors(market, function(marketInvestors) {
        resolve(marketInvestors);

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

      res.json(companies);
    });
};

exports.allMarkets = function(req, res){
  var searchValue = req.params.value;
  var allMarkets = [];
  console.log(req.params.value);

  angelData.Market.query(function(qb) {
    qb.where('name', 'like', '%'+searchValue+'%');})
    .fetchAll()
    .then(function(markets){
      // for(var i = 0; i < 25; i++){
      //   allCompanies.push(companies)
      // }
      // console.log(allCompanies);

      res.json(markets,200);
    });
}

