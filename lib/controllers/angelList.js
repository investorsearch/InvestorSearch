'use strict';

var request = require("request"),
    Promise = require("bluebird"),
    async   = require("async");

// If api call returns paginated results with greater than 1 page, make subsequent calls to retrieve data from all pages

//created just for seeding- remove from file and loopthroughpages definition and calls afterwards

var dummySaveFunc = function(data) {
  console.log("dumbass");
};

var loopThroughPages = function(currentPage, lastPage, apiUrl, dataKey, dataSet, marketId, saveFunc) {
  return new Promise(function(resolve, reject) {
  //if on last page or api response is only 1 page, execute response callback (poss filter results, save, and respond to request)
    if (currentPage > lastPage) {
      console.log('on final page now');
      resolve(dataSet);
    } else {


      console.log('currentPage: ' + currentPage);
      //if apiURL already has params, add page params with '&', else add with '?'
      var pageadd;
      apiUrl.indexOf('?') > 0 ? pageadd = '&' : pageadd = '?';

      var paginatedApiUrl = apiUrl + pageadd + 'page=' + currentPage;
      request(paginatedApiUrl, function(err, response, body) {
        var pageData = JSON.parse(body);
        var subset = pageData[dataKey];
        // dataSet = dataSet.concat(subset);   ---temporarily commented out for DB seeding

        //Add searched market as a key within each investor object, for thru table link saving
        if (typeof subset !== "undefined") {
          subset = subset.map(function(item) {
            item.type = "user";
            item.marketId = marketId;
            return item;
            });
          saveFunc(subset);
        }

        currentPage++;
        //call loop page recursively until last page is reached
        resolve(loopThroughPages(currentPage, lastPage, apiUrl, dataKey, dataSet, marketId, saveFunc));
      });
    }
  });
};


/**
 * Find a startup's investors
 */

var findInvestors = function(companyID, sendBack) {
  var apiUrl = 'https://api.angel.co/1/startups/' + companyID + '/roles/';
  console.log(companyID);

  var dataSet = [];

  var dataFilter = function(allData) {
    var investors = allData.filter(function(person){
      return person.role === "past_investor";
    });
    sendBack(investors);
  };

  request(apiUrl, function(error, response, body) {
    var data = JSON.parse(body);
    var dataKey = "startup_roles";
    dataSet = dataSet.concat(data[dataKey]);

    //get all data if results are paginated
    loopThroughPages(data.page, data.last_page, apiUrl, dataKey, dataSet, dummySaveFunc).then(function(allData) {
      dataFilter(allData);
    });
  });
};


//Find a market's investors
var findMarkets = function(marketID, sendBack) {

  //API can be called w params 'include children', which will also list investors following children markets (ie market "info tech" will also include analytics)
  var apiUrl = 'https://api.angel.co/1/tags/' + marketID + '/users?investors=by_activity';

  var dataSet = [];


  request(apiUrl, function(error, response, body) {
    var data = JSON.parse(body);
    var dataKey = "users";
    dataSet = dataSet.concat(data[dataKey]);

    //get all data if results are paginated
    loopThroughPages(data.page, data.last_page, apiUrl, dataKey, dataSet, dummySaveFunc).then(function(allData) {
      sendBack(allData);
    });
  });

};


//Find investors in a collection of items (companies, markets, etc)
var findInvestorsForEach = function(collection, findFunc, cb) {
  //Iterate through each investment and find all investors
  var InvestorsPromiseArr = collection.map(function(investorsInvestment) {
    return new Promise(function(resolve, reject) {
      findFunc(investorsInvestment.id, function(investors){
        resolve(investors);
      });
    });
  });
  Promise.all(InvestorsPromiseArr).then(function(investors) {
    //** currently returns array of arrays (each arr is for a co)
    //potentially flatten or remove unncessary data?
    cb(investors);
  });
};

//find a single company's investors
exports.findCompanysInvestors = function(req, res) {
  var companyID = req.params.id;
  var sendBack = function(investors) {
    res.send(investors);
  };
  findInvestors(companyID, sendBack);
};


//Find a single market's investors
// exports.findMarketsInvestors = function(req, res) {
//   var marketID = req.params.id;
//   var sendBack = function(investors) {
//     res.send(investors);
//   };
//   findMarkets(marketID, sendBack);
// };


//Find an investor's co-investors
exports.findCoInvestors = function(req, res) {
  var investorID = req.params.id;
  console.log(investorID);
  var investorType = req.params.type;
  console.log(investorType);

  //2 steps: find all an investors investments, then for each investment find all investors

  // ** Need investor type (indivual or company) to search investments (diff angellist api paths) //SHOULD STORE THIS LOCALLY IN MASTER LIST ONCE OBTAINED **//

  var findInvestmentsApi;

  //diff API URLs depending on investor type
  if (investorType === 'user') {
    findInvestmentsApi = 'https://api.angel.co/1/users/' + investorID + '/roles';
    } else {
      findInvestmentsApi = 'https://api.angel.co/1/startups/' + investorID + '/roles?direction=outgoing';
    }

  var dataSet = [];

  //loop through all roles returned, return startups where user/firm was an investor
  var investmentFilter = function(allRoles) {
    var investmentRoles = allRoles.filter(function(role){
      return role.role === "past_investor";
    });
    var investments =  investmentRoles.map(function(investmentRole) {
      return investmentRole.startup;
    });
    return investments;
  };

  //1st API call - find investors investments
  request(findInvestmentsApi, function(error, response, body) {
    var data = JSON.parse(body);
    var dataKey = "startup_roles";
    dataSet = dataSet.concat(data[dataKey]);

    //get all data if results are paginated
    loopThroughPages(data.page, data.last_page, findInvestmentsApi, dataKey, dataSet, dummySaveFunc).then(function(allRoles){

        //filter results to just company's invested in
        var investorsInvestments = investmentFilter(allRoles);

        //find investors for all investments
        findInvestorsForEach(investorsInvestments, findInvestors, function(investors) {
          res.send(investors);
        });
    });
  });
};

//find investors that follow markets a specific company is tagged in
//** currently returns too many results, some tages have 10s of thousands of followers, req times out due to pagination api requests. Use startup codewars (id: 113568) as working example
exports.findSimilarInvestors = function(req, res) {
  var companyID = req.params.id;

  //Step 1 - find target company's markets
  var findMarketsApi = 'https://api.angel.co/1/startups/' + companyID + '/';

  request(findMarketsApi, function(error, response, body) {
    var data = JSON.parse(body);
    var dataKey = "markets";
    var markets = data[dataKey];

    //for each market, find investors
    findInvestorsForEach(markets, findMarkets, function(investors) {
      res.send(investors);
    });
  });
};


//to run local DB query for all markets, then foreach market, findmarketsinvestors, passing in al_id for API call and sql_id for creating thru table connections
exports.findMarketsInvestors = function(al_id, sql_id, saveFunc) {
  var apiUrl = 'https://api.angel.co/1/tags/' + al_id + '/users?investors=by_activity';

  var dataSet = [];


  request(apiUrl, function(error, response, body) {
    var data = JSON.parse(body);
    var dataKey = "users";
    dataSet = dataSet.concat(data[dataKey]);


    //get all data if results are paginated
    loopThroughPages(data.page, data.last_page, apiUrl, dataKey, dataSet, sql_id, saveFunc).then(function(allData) {
      console.log("done saving");
    });
  });
};

//After saving down complete list of market ids, findmarketsinvestors foreach

// var findAllInvestors = function() {

//   var saveInvestors = function(investors) {
//     investors.forEach(function(investor) {
//       //save to investors collection in DB (ensure no dups)
//     });
//   };

//   //bookshelf query to return all rows in markets collection, return allMarkets- run below in CB

//   allMarkets.forEach(function(market) {
//     findMarkets(market.angelListId, saveInvestors);
//   });
// };
