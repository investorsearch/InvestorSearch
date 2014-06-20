'use strict';
var request = require('request');
var API_KEY = require('../config/env/development.js').CRUNCHBASE_API_KEY;
var Q = require('q');
var _ = require('underscore');

var loopPages = function(numberOfPages){
  var the_promises = [];

  numberOfPages.forEach(function(page) {
    var deferred = Q.defer();

    request('http://api.crunchbase.com/v/2/people?user_key='+API_KEY+'&page='+page, function (error, response, body) {
      if(error){
        console.log("error", error);
      } else{
        console.log("in promise");
        deferred.resolve(body);
      }
  });
    the_promises.push(deferred.promise);
  });

  return Q.all(the_promises);
};


exports.people = function(req, res) {
  var arrayOfPeople = [];
  request('http://api.crunchbase.com/v/2/people?user_key='+API_KEY+'&page=1', function (error, response, body) {
      if(error){
        console.log("error", error);
      } else{
        var responseBody = JSON.parse(response.body);

        var rangeOfPages = _.range(responseBody.data.paging.current_page+1, responseBody.data.paging.number_of_pages+1);
        loopPages(rangeOfPages).then(function(promise){
          res.json(200, promise);
        });
        // TODO: save to application's database
      }
  });
};


