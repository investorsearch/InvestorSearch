'use strict';

var knexDbConfig = require('../config/config').knexDbConfig,
    knex = require('knex')(knexDbConfig),
    bookshelf = require('bookshelf')(knex),
    Company = require('../models/angelData').Company,
    Market = require('../models/angelData').Market,
    Investor = require('../models/angelData').Investor,
    Market_Company = require('../models/angelData').Market_Company,
    Company_Investor = require('../models/angelData').Company_Investor,
    Market_Investor = require('../models/angelData').Market_Investor;

// Company functions
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

exports.addNewCompany = function(angelListID, Name, cb){
  return Company
    .forge({al_id: angelListID, name: Name})
    .save()
    .then(function(model){
      cb(model);
      console.log(Name + ' was saved with this id: ' + angelListID);
      // return res.send({save: 'success'});
    })
    .catch(function(err){
      console.error(err);
      // return res.send(err);
    });
};

exports.findCompanyByAngelListID = function(angelListID, cb){
  Company
    .where({al_id: angelListID})
    .fetch()
    .then(function(company){
      cb(company);
    })
    .catch(function(err){
      console.log(err);
    });
};

// Market functions
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

exports.addNewMarket = function(angelListID, Name, cb){
  // var angelListID = req.params.id;
  // var Name = req.params.name;
  return Market
    .forge({al_id: angelListID, name: Name})
    .save()
    .then(function(model){
      cb(model);
        // return res.json(model);
    })
    .catch(function(err){
      console.error(err);
      // return res.send(err);
    });
};

exports.findMarketByAngelListID = function(angelListID, cb){
  Market
    .where({al_id: angelListID})
    .fetch()
    .then(function(market){
      cb(market);
    })
    .catch(function(err){
      console.log(err);
    });
};

// Investor functions
exports.investors = function(req, res){
  return Investor.fetchAll()
    .then(function(model){
        return res.json(model);
    })
    .catch(function(err){
      console.error(err);
      return res.send(err);
    });
};

// need to update to include other req'd inputs for table
exports.addNewInvestor = function(req, res){
  var angelListID = req.params.id;
  var Name = req.params.name;
  return Investor
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

// Through Table Functions
exports.linkMarketAndCompany = function(marketId, companyId){
  return Market_Company
    .forge({market_id: marketId, company_id: companyId})
    .save()
    .then(function(model){
        console.log('co-market link saved');
    })
    .catch(function(err){
      console.error(err);
    });
};