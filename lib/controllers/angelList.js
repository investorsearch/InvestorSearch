'use strict';

var request = require("request"),
    Promise = require("bluebird"),
    async   = require("async");

// If api call returns paginated results with greater than 1 page, make subsequent calls to retrieve data from all pages

var loopThroughPages = function(currentPage, lastPage, apiUrl, dataKey, dataSet) {
  return new Promise(function(resolve, reject) {
  //if on last page or api response is only 1 page, execute response callback (poss filter results, save, and respond to request)
    if (currentPage >= lastPage) {
      console.log('on final page now');
      resolve(dataSet);
    } else {
      console.log('currentPage: ' + currentPage);
      currentPage++;

      //if apiURL already has params, add page params with '&', else add with '?'
      var pageadd;
      apiUrl.indexOf('?') > 0 ? pageadd = '&' : pageadd = '?';

      var paginatedApiUrl = apiUrl + pageadd + 'page=' + currentPage;
      request(paginatedApiUrl, function(err, response, body) {
        var pageData = JSON.parse(body);
        var subset = pageData[dataKey];
        dataSet = dataSet.concat(subset);

        //call loop page recursively until last page is reached
        resolve(loopThroughPages(currentPage, lastPage, apiUrl, dataKey, dataSet));
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
    loopThroughPages(data.page, data.last_page, apiUrl, dataKey, dataSet).then(function(allData) {
      dataFilter(allData);
    });
  });
};

exports.findCompanysInvestors = function(req, res) {
  var companyID = req.params.id;
  var sendBack = function(investors) {
    res.send(investors);
  };
  findInvestors(companyID, sendBack);
};


//find a market's investors (investors following that market)

exports.findMarketsInvestors = function(req, res) {
  var marketID = req.params.id;

  //API calls w params 'include children', which will also list investors following children markets (ie market "info tech" will also include analytics)
  var apiUrl = 'https://api.angel.co/1/tags/' + marketID + '/users?include_children=true&investors=by_activity';

  var dataSet = [];

  var returnData = function(investors) {
    res.send(investors);
  };

  request(apiUrl, function(error, response, body) {
    var data = JSON.parse(body);
    var dataKey = "users";
    dataSet = dataSet.concat(data[dataKey]);

    //get all data if results are paginated
    loopThroughPages(data.page, data.last_page, apiUrl, dataKey, dataSet).then(function(allData) {
      returnData(allData);
    });
  });

};



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
    loopThroughPages(data.page, data.last_page, findInvestmentsApi, dataKey, dataSet).then(function(allRoles){

        //filter results to just company's invested in
        var investorsInvestments = investmentFilter(allRoles);

        //Iterate through each investment and find all investors
        var coInvestorsPromiseArr = investorsInvestments.map(function(investorsInvestment) {
          return new Promise(function(resolve, reject) {
            findInvestors(investorsInvestment.id, function(investors){
              resolve(investors);
            });
          });
        });
        Promise.all(coInvestorsPromiseArr).then(function(investors) {
          //** currently returns array of arrays (each arr is for a co)
          //potentially flatten or remove unncessary data?
          res.send(investors);
        });
    });
  });

};
