'use strict';

var Company = require('../models/angelData').Company,
    Market = require('../models/angelData').Market,
    Investor = require('../models/angelData').Investor,
    Market_Company = require('../models/angelData').Market_Company,
    Company_Investor = require('../models/angelData').Company_Investor,
    Market_Investor = require('../models/angelData').Market_Investor,
    Promise = require('bluebird');

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

// save an investor
exports.addNewInvestor = function(investor){
  return new Promise(function(resolve, reject){
    var name = investor.name;
    var al_id = investor.id;
    var location = null;
    var type = investor.type || null;
    var image = investor.image;
    var linkedin_url = investor.linkedin_url;
    var bio = investor.bio;
    //locations is defined during market search, which only returns users
    if (typeof investor.locations !== 'undefined') {
      type = "user";
      if (investor.locations.length > 0) {
      location = investor.locations[0].display_name || null;
      }
    }
    return Investor
      .forge({name: name, al_id: al_id, location: location, type: type, image: image, linkedin_url: linkedin_url, bio: bio})
      .save()
      .then(function(model){
          resolve(model.attributes);
          console.log(model.attributes.name + " was saved");
      })
      .catch(function(err){
        console.error(err);
      });
  });
};

// find an investor
exports.investorExists = function(angellistId) {
  return new Promise(function(resolve, reject) {
    return Investor
      .where({al_id: angellistId})
      .fetch()
      .then(function(investor){
        resolve(investor);
      })
      .catch(function(err){
        console.log(err);
        resolve();
      });
    });
};

exports.findCompanysInvestors = function(companyId) {
  return new Promise(function(resolve, reject) {
    return Investor
      .where({al_id: angellistId})
      .fetch()
      .then(function(investor){
        resolve(investor);
      })
      .catch(function(err){
        console.log(err);
        resolve();
      });
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

exports.linkInvestorAndCompany = function(investorId, companyId) {
  return Company_Investor
    .forge({investor_id: investorId, company_id: companyId})
    .save()
    .then(function(model){
      console.log("investor-company link saved");
    })
    .catch(function(err) {
      console.log(err);
    });
};

exports.linkInvestorAndMarket = function(investorId, marketId) {
  return Market_Investor
    .forge({investor_id: investorId, market_id: marketId})
    .save()
    .then(function(model){
      console.log("investor-market link saved");
    })
    .catch(function(err) {
      console.log(err);
    });
};

exports.checkInvestorCompanyLink = function(investorId, companyId) {
  return new Promise(function(resolve, reject) {
    return Company_Investor
      .where({investor_id: investorId, company_id: companyId})
      .fetch()
      .then(function(link){
        resolve(link);
      })
      .catch(function(err){
        console.log(err);
        resolve();
      });
    });
};

exports.checkInvestorMarketLink = function(investorId, marketId) {
  return new Promise(function(resolve, reject) {
    return Market_Investor
      .where({investor_id: investorId, market_id: marketId})
      .fetch()
      .then(function(link){
        resolve(link);
      })
      .catch(function(err){
        console.log(err);
        resolve();
      });
  });
};

exports.checkMarketLink = function(marketId) {
  return new Promise(function(resolve, reject) {
    return Market
      .where({id: marketId})
      .fetch({withRelated:['investors']})
      .then(function(market){
        resolve(market.related('investors').models);
      })
      .catch(function(err){
        console.log(err);
        resolve();
      });
  });
};

exports.checkCompanyLink = function(companyId) {
  return new Promise(function(resolve, reject) {
    return Company
      .where({id: companyId})
      .fetch({withRelated:['investors']})
      .then(function(company){
        resolve(company.related('investors').models);
      })
      .catch(function(err){
        console.log(err);
        resolve();
      });
  });
};