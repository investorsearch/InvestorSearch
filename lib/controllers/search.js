var angelList = require('./angelList'),
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

  return new Promise(function(resolve, reject){

    var promiseArrInvestors =  foundInvestors.map(function(foundInvestor) {
      return new Promise(function(resolve, reject) {
        //first check if investor is in DB already
        updateDB.investorExists(foundInvestor.id)
        .then(function(investor) {
          //if investor doesn't exist, save him and link w co
          if (investor === null) {
            updateDB.addNewInvestor(foundInvestor)
            .then(function(savedInvestor){
              resolve(savedInvestor);
              saveLinkFunc(savedInvestor.id, linkSource.id);
            });
          } else {
            //if he's already in DB, check if he's linked w co, if not, save link
            resolve(investor.attributes);
            checkLinkFunc(investor.attributes.id, linkSource.id)
            .then(function(link){
              if (link === null) {
                saveLinkFunc(investor.attributes.id, linkSource.id);
              }
            });
          }
        });
      });
    });

    Promise.all(promiseArrInvestors).then(function(savedInvestors) {
      resolve(savedInvestors);
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
            // add the reason that this search is being returned as an attribute of the investor.
            result.investors.forEach(function(investor){investor.search_reason = [{company: company.name}];});
            resolve(result.investors);
          } else {
            console.log('calling angel list now...');
            angelList.findCompanysInvestors(company.al_id, function(foundInvestors) {
              // resolve(foundInvestors);
              saveInvestorsAndLinks(company, foundInvestors, updateDB.linkInvestorAndCompany, updateDB.checkInvestorCompanyLink)
              .then(function(savedCompanyInvestors) {
                savedCompanyInvestors.forEach(function(investor){
                  console.log('this is the investor from AngelList BEFORE updating..');
                  console.log(investor);
                  investor.search_reason = [{company: company.name}];
                  console.log('investor after search_reason was updated');
                  console.log(investor);
                });
                resolve(savedCompanyInvestors);
              });
            });
          }
      });
    });
  });

  var promiseArrMarkets = markets.map(function (market) {
    return new Promise(function(resolve, reject) {
      findExistingConnections(market, updateDB.checkMarketLink).then(function(result) {
          if (result.status === true) {
            result.investors.forEach(function(investor){investor.search_reason = [{market: market.name}];});
            resolve(result.investors);
          } else {
            console.log('calling angel list now...');
            angelList.findMarketsInvestors(market.al_id, function(foundInvestors) {
              saveInvestorsAndLinks(market, foundInvestors, updateDB.linkInvestorAndMarket, updateDB.checkInvestorMarketLink)
              .then(function(savedMarketInvestors) {
                savedMarketInvestors.forEach(function(investor){investor.search_reason = [{market: market.name}];});
                resolve(savedMarketInvestors);
              });
            });
          }
      });
    });
  });

  //once all queries (local/Angelist) have resolved, store in one array and send to front end
  Promise.all(promiseArrCompanies).then(function(foundInvestors) {
    Promise.all(promiseArrMarkets).then(function(marketInvestors) {
      var allInvestors = [];

      allInvestors = allInvestors.concat.apply(allInvestors, foundInvestors);
      allInvestors = allInvestors.concat.apply(allInvestors, marketInvestors);

      var allInvestorsAngelListIds = [];

      allInvestors.forEach(function(investor){
        allInvestorsAngelListIds.push(investor.al_id || investor.id);
      });

      var investorScores = allInvestorsAngelListIds.reduce(function(thisObj, currId){
        if(typeof thisObj[currId] === 'undefined'){
          thisObj[currId] = 1;
        } else {
          thisObj[currId] += 1;
        }

        return thisObj;
      }, {});

      var newAllInvestors = [];

      allInvestors.map(function(investor){
        investor.score = investorScores[investor.al_id] || investorScores[investor.id];
      });

      var filteredInvestors = [];
      for(var i = 0; i<allInvestors.length; i++){
        var investor = allInvestors[i];
        var al_id = investor.al_id || investor.id;
        if(typeof investorScores[al_id] !== 'undefined'){
          filteredInvestors.push(investor);
          delete investorScores[al_id];
        } else {
          for(var j=0; j<filteredInvestors.length; j++){
            if(filteredInvestors[j].al_id === al_id || filteredInvestors[j].id === al_id){
              filteredInvestors[j]['search_reason'] = filteredInvestors[j]['search_reason'].concat(allInvestors[i]['search_reason']);
            }
          }
        }
      }

      var sortedInvestors = filteredInvestors.sort(function(a, b){
        return b.score - a.score;
      });

      sortedInvestors = sortedInvestors.slice(0,100);

      res.json(sortedInvestors, 200);
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
      res.json(markets);
    });
};

