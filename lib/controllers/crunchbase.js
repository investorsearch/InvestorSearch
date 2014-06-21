'use strict';
var request = require('request');
var API_KEY = require('../config/config').CRUNCHBASE_API_KEY;
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
        var peopleData = JSON.parse(body).data[item];
        var itemLength = peopleData.length;
        var pageOfPeople = [];

        // here we loop through the items (which is an array of objects, each object is a person)
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
            allPeople = allPeople.concat.apply([allPeople], promise);

          res.send(200, allPeople);
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
     },
     {
      "updated_at": 1403220383,
      "name": "Marc Andreessen",
      "path": "person/marc-andreessen",
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
  ];

  // Until we have a database setup, this will be hardcoded to Marc Andreessen
  var match;
  for (var i = 0; i < fake_people.length; i++){
    if(fake_people[i].name.toLowerCase().replace(/ +?/g, '') === "marcandreessen"){
      console.log("found match!");
      match = fake_people[i];
      //return res.send(200, match);
    }
  };

 // we want to extract the 'person/' from the path
  var permalink = match.path.replace(/^.+\//,'');
  console.log(permalink);


  console.log('matched and now moving on to request');

  request('http://api.crunchbase.com/v/2/person/'+permalink+'/investments?user_key='+API_KEY, function (error, response, body) {
    if(error){
      console.log("error", error);
    } else{

      var parsedBody = JSON.parse(body).data;
      console.log("Companies this user has invested in: ")
      for (var i =0; i < parsedBody.items.length; i++){
        console.log("--" + parsedBody.items[i].invested_in.name);
      }
      console.log("Company list array length (should match total number of investmetns below): " + parsedBody.items.length);
      console.log("Total Number of Investments: " + parsedBody.paging.total_items);
      res.send(200, parsedBody);
      //the imporant info we will want to extract from here are:
        // Companies they invested in: "items" -> "invested_in" --> "name"
        // Total Investments: "paging" --> "total_items"

    }
  });


 };




