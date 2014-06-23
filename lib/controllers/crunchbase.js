'use strict';
var request = require('request');
var API_KEY = require('../config/config').CRUNCHBASE_API_KEY;
var Q = require('q');
var _ = require('underscore');
// DELETE THIS ONCE DONE
var sample_companies = require('./crunchbase_sample_companies.js');

var loopPages = function(numberOfPages, collection, item){
  console.log("ITEM: "+ item);
  var the_promises = [];

  numberOfPages.forEach(function(page) {
    var deferred = Q.defer();

    request('http://api.crunchbase.com/v/2/'+collection+'?user_key='+API_KEY+'&page='+page, function (error, response, body) {
      if(error){
        console.log("error", error);
      } else{
        var returnedData;
        typeof item === null ? returnedData = JSON.parse(body).data : returnedData = JSON.parse(body).data[item];
        var itemLength = returnedData.length;
        var pages = [];

        // here we loop through the items (which is an array of objects, each object is a person)
        for(var i = 0; i < itemLength; i++){
          pages.push(returnedData[i]);
        }
        deferred.resolve(pages);
      }
  });
    the_promises.push(deferred.promise);
  });

  return Q.all(the_promises);
 };


// We will only be doing this query once to save it to the database.
exports.people = function(req, res) {
  request('http://api.crunchbase.com/v/2/people?user_key='+API_KEY+'&page=1', function (error, response, body) {
      if(error){
        console.log("error", error);
      } else{
        var responseBody = JSON.parse(response.body);

        var rangeOfPages = _.range(responseBody.data.paging.current_page+1, 4);
        loopPages(rangeOfPages, "people", "items").then(function(promise){
            console.log(promise);
            var allPeople = [];
            allPeople = allPeople.concat.apply(allPeople, promise);

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
    if(fake_people[i].name.toLowerCase().replace(/ +?/g, '') === req.params.id){
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

      console.log("Company list array length (should match total number of investmetns below): " + parsedBody.items.length);
      console.log("Total Number of Investments: " + parsedBody.paging.total_items);
      res.send(200, parsedBody);
      //the imporant info we will want to extract from here are:
        // Companies they invested in: "items" -> "invested_in" --> "name"
        // Total Investments: "paging" --> "total_items"

    }
  });


 };


// CO-INVESTORS: from an investor, find companies, then find the investors in that company

// Get all Organizations so we can get their permalink
exports.organizations = function(req, res) {
    request('http://api.crunchbase.com/v/2/organizations?user_key='+API_KEY+'&page=1', function (error, response, body) {
        if(error){
          console.log("error", error);
        } else{
          var responseBody = JSON.parse(response.body);

          var rangeOfPages = _.range(responseBody.data.paging.current_page+1, 5);
          loopPages(rangeOfPages, "organizations", "items").then(function(promise){
              console.log(promise);
              var allOrgs = [];
              allOrgs = allOrgs.concat.apply(allOrgs, promise);

            res.send(200, allOrgs);
          });
        }
    });


 };

 exports.organization = function(req, res) {

  // Here we want to do a database lookup.
  // But, until we have a database setup we will just do a lookup in fake_comp:

var fake_comp =
  [
  { updated_at: 1402327110,
      name: 'OMGPOP',
      path: 'organization/omgpop',
      created_at: 1402327110,
      type: 'Organization' }
  ];

  // Until we have a database setup, this will be hardcoded to OMGPOP
  var match;
  for (var i = 0; i < fake_comp.length; i++){
    if(fake_comp[i].name.toLowerCase().replace(/ +?/g, '') === req.params.id){
      console.log("found match!");
      match = fake_comp[i];
      //return res.send(200, match);
    }
  };

 // we want to extract the 'person/' from the path
  var permalink = match.path.replace(/^.+\//,'');
  console.log(permalink);


  console.log('matched and now moving on to request');

  request('http://api.crunchbase.com/v/2/organization/'+permalink+'?user_key='+API_KEY, function (error, response, body) {
    if(error){
      console.log("error", error);
    } else{

      var parsedBody = JSON.parse(body).data;

      // console.log("Company list array length (should match total number of investmetns below): " + parsedBody.items.length);
      // console.log("Total Number of Investments: " + parsedBody.paging.total_items);
      res.send(200, parsedBody);
      //the imporant info we will want to extract from here are:
        // Companies they invested in: "items" -> "invested_in" --> "name"
        // Total Investments: "paging" --> "total_items"

    }
  });

 };


// To get a company's investors we will have to look up the company and et their funding rounds. Once we have their funding rounds we look up each funding round. We check all finding rounds for that company to look for our 'co-investor'. If the co-investor exists in that funding round we will ALL investors from that funding round.







// Given an organization, get the categories
var getOrganizationCategories = function(permalink){
  var organizationEndpoint = 'http://api.crunchbase.com/v/2/organization/'+permalink+'?user_key='+API_KEY;
  var organizationCategories = [];
  return request(organizationEndpoint, function(error, response, body){
    var parsedBody = JSON.parse(body);
    var returnedCategories = parsedBody.data.relationships.categories.items;
    returnedCategories.forEach(function(category){
      organizationCategories.push(category.name);
    });
    // TODO: Why is this console.logging out here but not working in the exports.categories?
    console.log(organizationCategories)
    return organizationCategories;
  });
};

exports.categories = function(req, res){
  var permalink = req.params.permalink;
  var organizationCategories = getOrganizationCategories(permalink);
  res.send(200, organizationCategories);

};