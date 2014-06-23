'use strict';

var knexDbConfig = require('../config/config').knexDbConfig,
    knex = require('knex')(knexDbConfig),
    bookshelf = require('bookshelf')(knex),
    Company = require('../models/angelData').Company,
    Market = require('../models/angelData').Market;

exports.companies = function(req, res){
  return Company.fetchAll()
    .then(function(model){
        return res.json(model);
    })
    .catch(function(err){
      console.error(err);
      return res.send(err);
    });
};

exports.addNewCompany = function(req, res){
  var angelListID = req.params.id;
  var Name = req.params.name;
  return Company
    .forge({al_id: angelListID, name: Name})
    .save()
    .then(function(){
      console.log(Name + ' was saved with this id: ' + angelListID);
      return res.send({save: 'success'});
    })
    .catch(function(err){
      console.error(err);
      return res.send(err);
    });
};

exports.markets = function(req, res){
  return Market.fetchAll()
    .then(function(model){
        return res.json(model);
    })
    .catch(function(err){
      console.error(err);
      return res.send(err);
    });
};

exports.addNewMarket = function(req, res){
  var angelListID = req.params.id;
  var Name = req.params.name;
  return Market
    .forge({al_id: angelListID, name: Name})
    .save()
    .then(function(model){
        return res.json(model);
    })
    .catch(function(err){
      console.error(err);
      return res.send(err);
    });
};