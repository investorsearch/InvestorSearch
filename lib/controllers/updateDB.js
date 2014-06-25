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

exports.addNewCompany = function(company, cb){
  var angelListId = company.id;
  var name = company.name;
  var crunchbase_url = company.crunchbase_url;

  return Company
    .forge({al_id: angelListId, name: name, crunchbase_url: crunchbase_url})
    .save()
    .then(function(model){
      cb(model);
      console.log(name + ' was saved with this id: ' + angelListId);
      // return res.send({save: 'success'});
    })
    .catch(function(err){
      console.error(err);
      // return res.send(err);
    });
};

exports.addHiddenCompany = function(company) {
  var angelListId = company.id;
  return Company
    .forge({al_id: angelListId, hidden: true})
    .save()
    .then(function(model){
      console.log('hidden company was saved with this id: ' + angelListId);
      // return res.send({save: 'success'});
    })
    .catch(function(err){
      console.error(err);
      // return res.send(err);
    });
};

exports.findCompanyByAngelListId = function(angelListId, cb){
  Company
    .where({al_id: angelListId})
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

exports.addNewMarket = function(market, cb){
  var angelListId = market.id;
  var name = market.display_name;

  return Market
    .forge({al_id: angelListId, name: name})
    .save()
    .then(function(model){
      console.log('this market was saved...');
      console.log(model.attributes.name);
      cb(model);
        // return res.json(model);
    })
    .catch(function(err){
      console.error(err);
      // return res.send(err);
    });
};

exports.findMarketByAngelListId = function(angelListId, cb){
  console.log('finding market by this angellist ID...');
  console.log(angelListId);
  Market
    .where({al_id: angelListId})
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
  var angelListId = req.params.id;
  var Name = req.params.name;
  return Investor
    .forge({al_id: angelListId, name: Name})
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