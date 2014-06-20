'use strict';
var request = require('request');
var API_KEY = require('../config/env/development.js').CRUNCHBASE_API_KEY;


exports.people = function(req, res) {
  request('http://api.crunchbase.com/v/2/people?user_key='+API_KEY+'&page=284', function (error, response, body) {
      if(error){
        console.log("error", error)
      } else{
        res.json(200, body);
      }

    });
};
