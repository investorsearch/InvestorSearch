var knexDbConfig = require('../config/config').knexDbConfig,
    knex = require('knex')(knexDbConfig),
    bookshelf = require('bookshelf')(knex),
    angelList = require('./angelList'),
    Promise = require('bluebird'),
    angelData = require('../models/angelData'),
    updateDB = require('./updateDB'),
    _ = require('underscore');

//check if a market or company already has its links to investors saved locally, if yes, return investors
var findExistingConnections = function(item, checkLinkFunc) {
  var result = {status: false, investors: []};
  return new Promise(function(resolve, reject) {
    checkLinkFunc(item.id).then(function(investors){
      if (investors.length === 0) {
        console.log(item.name + ' does not exist yet..');
        resolve(result);
      } else {
        result.status = true;
        console.log(item.name + ' already exists in the DB!');
        result.investors = investors.map(function(investor) {
          return investor.attributes;
        });
        resolve(result);
      }
    });
  });
};

//save each investor to DB, along w/ link to market or company
var saveInvestorsAndLinks = function(linkSource, foundInvestors, saveLinkFunc, checkLinkFunc) {
        foundInvestors.forEach(function(foundInvestor) {
          //first check if investor is in DB already
          updateDB.investorExists(foundInvestor.id)
          .then(function(investor) {
            //if investor doesn't exist, save him and link w co
            if (investor === null) {
              updateDB.addNewInvestor(foundInvestor)
              .then(function(savedInvestor){
              saveLinkFunc(savedInvestor.id, linkSource.id);
              });
            } else {
              //if he's already in DB, check if he's linked w co, if not, save link
              checkLinkFunc(investor.attributes.id, linkSource.id)
              .then(function(link){
                if (link === null) {
                  saveLinkFunc(investor.attributes.id, linkSource.id);
                }
              });
            }
          });
        });
};

exports.findAndSave = function(req, res) {
  //req.body is an array of objects that have a type and text
  var companies = req.body.companies;
  var markets = req.body.markets;

  // for both search types, find investors  and store in promises
  var promiseArrCompanies = companies.map(function (company) {
    return new Promise(function(resolve, reject) {
      //only call angel list if company does NOT have existing local investor connections
      findExistingConnections(company, updateDB.checkCompanyLink).then(function(result) {
          if (result.status === true) {
            resolve(result.investors);
          } else {
            console.log('calling angel list now...');
            angelList.findCompanysInvestors(company.al_id, function(foundInvestors) {
              resolve(foundInvestors);
              saveInvestorsAndLinks(company, foundInvestors, updateDB.linkInvestorAndCompany, updateDB.checkInvestorCompanyLink);
            });
          }
      });
    });
  });

  var promiseArrMarkets = markets.map(function (market) {
    return new Promise(function(resolve, reject) {
      findExistingConnections(market, updateDB.checkMarketLink).then(function(result) {
          if (result.status === true) {
            resolve(result.investors);
          } else {
            console.log('calling angel list now...');
            angelList.findMarketsInvestors(market.al_id, function(foundInvestors) {
              resolve(foundInvestors);
              saveInvestorsAndLinks(market, foundInvestors, updateDB.linkInvestorAndMarket, updateDB.checkInvestorMarketLink);
            });
          }
      });
    });
  });

  //once all queries (local/Angelist) have resolved, store in one array and send to front end
  Promise.all(promiseArrCompanies).then(function(foundInvestors) {
    Promise.all(promiseArrMarkets).then(function(marketInvestors) {
      var allInvestors = [];
      if(typeof foundInvestors[0] !== 'undefined'){
        foundInvestors.forEach(function(foundInvestorsArrayItem){foundInvestorsArrayItem.map(function(investorInCompany){
            investorInCompany.reason = "company";
          });
        });
      }
      if(typeof marketInvestors[0] !== 'undefined'){
        marketInvestors.forEach(function(marketInvestorsArrayItem){marketInvestorsArrayItem.map(function(investorInMarket){
            investorInMarket.reason = "market";
          });
        });
      }
      allInvestors = allInvestors.concat.apply(allInvestors, foundInvestors);
      allInvestors = allInvestors.concat.apply(allInvestors, marketInvestors);

      var allInvestorsAngelListIds = [];

      allInvestors.forEach(function(investor){
        allInvestorsAngelListIds.push(investor.al_id);
      });

      console.log('BEFORE');
      console.log(allInvestorsAngelListIds);
      console.log(allInvestorsAngelListIds.length);

      var investorScores = allInvestorsAngelListIds.reduce(function(thisObj, currId){
        if(typeof thisObj[currId] === 'undefined'){
          thisObj[currId] = 1;
        } else {
          thisObj[currId] += 1;
        }

        return thisObj;
      }, {});

      console.log('AFTER');
      console.log(investorScores);

      allInvestors.map(function(investor){
        investor.score = investorScores[investor.al_id];
      });

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
      res.json(markets,200);
    });
};

