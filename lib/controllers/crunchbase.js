'use strict';
var request = require('request');
var API_KEY = require('../config/env/development').CRUNCHBASE_API_KEY;
var Q = require('q');
var _ = require('underscore');

var loopPages = function(numberOfPages, collection, item){
  console.log("ITEM: "+ item);
  var the_promises = [];

  numberOfPages.forEach(function(page) {
    var deferred = Q.defer();

    request('http://api.crunchbase.com/v/2/'+collection+'?user_key='+API_KEY+'&page='+page, function (error, response, body) {
      if(error){
        console.log("error", error);
      } else{
        var peopleData = JSON.parse(body).data.items;
        var itemLength = peopleData.length;
        var pageOfPeople = [];
        for(var i = 0; i < itemLength; i++){
          pageOfPeople.push(peopleData[i]);
        }
        deferred.resolve(pageOfPeople);
      }
  });
    the_promises.push(deferred.promise);
  });

  return Q.all(the_promises);
};


// We will only be doing this query once to save it to the database.
exports.people = function(req, res) {
  var arrayOfPeople = [];
  request('http://api.crunchbase.com/v/2/people?user_key='+API_KEY+'&page=1', function (error, response, body) {
      if(error){
        console.log("error", error);
      } else{
        var responseBody = JSON.parse(response.body);

        var rangeOfPages = _.range(responseBody.data.paging.current_page+1, 4);
        loopPages(rangeOfPages, "people", "items").then(function(promise){
          console.log("number of items in the array (should match the number of pages - 1: "+promise.length);
            console.log(promise);
            var allPeople = [];
            allPeople = allPeople.concat.apply(allPeople, promise);
          res.json(200, allPeople);
        });
      }
  });
};


// We want to look up a person in our database, grab their ID and then query the Crunchbase API.
// When we do the data base query we need to change the second paramater of loopPages to be responseBody.data.paging.number_of_pages+1
exports.person = function(req, res) {

  // Here we want to do a database lookup.
  // But, until we have a database setup we will just do a lookup in fake_people:

var fake_people =
  [
     {
      "updated_at": 1403220383,
      "name": "David Hutchings",
      "path": "person/david-hutchings",
      "created_at": 1403220383,
      "type": "Person"
     },
     {
      "updated_at": 1403220278,
      "name": "Roel Stalman",
      "path": "person/roel-stalman",
      "created_at": 1403220278,
      "type": "Person"
     }
  ]

  for (var i = 0; i < fake_people.length; i++){
    if(fake_people[i].name.toLowerCase().replace(/ +?/g, '') === "davidhutchings"){
      console.log("found match!");
      return res.json(200, fake_people[i]);

    }
  };



};


