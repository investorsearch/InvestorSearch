'use strict';

var request = require("request");

// If api call returns paginated results with greater than 1 page, make subsequent calls to retrieve data from all pages

var loopThroughPages = function(currentPage, lastPage, apiUrl, dataKey, dataSet, cb) {

  if (currentPage >= lastPage) {
    cb(dataSet);
  } else {
    console.log('currentPage: ' + currentPage);
    currentPage++;
    var paginatedApiUrl = apiUrl + '/?page=' + currentPage;
    request(paginatedApiUrl, function(err, response, body) {
      var pageData = JSON.parse(body);
      var subset = pageData[dataKey];
      dataSet = dataSet.concat(subset);

      //call loop page recursively until last page is reached
      loopThroughPages(currentPage, lastPage, apiUrl, dataKey, dataSet, cb);
    });
  }
};


/**
 * Find a startup's investors
 */
exports.findCompanysInvestors = function(req, res) {
  var companyID = req.params.id;
  var apiUrl = 'https://api.angel.co/1/startups/' + companyID + '/roles';
  console.log(companyID);

  var dataSet = [];

  var dataFilter = function(allData) {
    var investors = allData.filter(function(person){
      return person.role === "past_investor";
    });
    res.send(investors);
  };

  request(apiUrl, function(error, response, body) {
    var data = JSON.parse(body);
    var dataKey = "startup_roles";
    dataSet = dataSet.concat(data[dataKey]);

    //get all data if results are paginated
    loopThroughPages(data.page, data.last_page, apiUrl, dataKey, dataSet, dataFilter);
  });
};