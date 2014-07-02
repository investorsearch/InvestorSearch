'use strict';

var updateDB = require('./controllers/updateDB');
var angelList = require('./controllers/angelList');
var Promise = require('bluebird'),
    async = require('async'),
    marketData = require('./data/markets'),
    angelList = require('./controllers/angelList');

// console.log(updateDB);
var sample_market_investors_info = [];


var done = function(err) {
  console.log('save finished');
  console.log(err);
};

//Given an item (startup or market), save it and create the link in the through table.
var saveAndLink = function(item, linkItemToSave, findItemFunction, saveItemFunction, linkMainItemFunc, findLinkItemFunction, saveLinkItemFunction, linkItemsFunction, done){

  //arr to store the items corresponding partner ids from the sql table
  var linkItems = item[linkItemToSave];
  var linkItemSqlIds = [];
  var newInvestor = false;

//Search DB for item, create new item if it doesn't exist. After found or save, link item(investor) to its market

  var currentItemSave =  new Promise(function(resolve, reject) {
      findItemFunction(item.id, function(foundItem) {
        if (foundItem === null) {
          newInvestor = true;
          saveItemFunction(item)
          .then(function(savedData){
            linkMainItemFunc(savedData.id, item.marketId);
            resolve(savedData.id);
          });
        } else {
          linkMainItemFunc(foundItem.attributes.id, item.marketId);
          resolve(foundItem.attributes.id);
        }
      });
  });

  var promiseArr = [];

  //only save location links if it's first time seeing investor
  currentItemSave.then(function(sqlId) {
    if(newInvestor) {
      promiseArr = linkItems.map(function(linkItem){
        return new Promise(function(resolve, reject) {
          findLinkItemFunction(linkItem.id, function(dbLinkItem){

            //if item (i.e. a startups market) does not exist, save it to db
            if (dbLinkItem === null) {
              saveLinkItemFunction(linkItem, function(newLinkItem) {
                linkItemSqlIds.push(newLinkItem.attributes.id);
                resolve();
              });

            //else, just store local ID
            } else {
              linkItemSqlIds.push(dbLinkItem.attributes.id);
              resolve();
            }
          });
        });
      });
    }

    //once all linkItems (i.e. markets) have been saved, save item-linkItesm connections (i.e. startup-markets connection)
    Promise.all(promiseArr).then(function() {
      linkItemSqlIds.forEach(function(itemId) {
        linkItemsFunction(sqlId, itemId);
      });
      done();
    });


  });
};

//Wrapper function- to be passed to async.each - Used to input correct arguments to saveAndLink func for desired DB updates and search
var investorSaver = function(investor, done) {
    saveAndLink(investor, "locations", updateDB.investorExists, updateDB.addNewInvestor, updateDB.linkInvestorAndMarket, updateDB.findLocationByAngelListId, updateDB.saveLocation, updateDB.linkInvestorAndLocation, done);
};

var saveAllInvestors = function(investors) {
async.eachSeries(investors, investorSaver);
};


//Database investor seed- loop through markets and save down investors and links to their markets.
//REDO 9, THEN SKIP AND START AT 11, 10 IS ALREADY DONE
var current_startpoint = 16;
var current_endpoint = 22;

var MarketsToSave = marketData.slice(current_startpoint, current_endpoint+1);

MarketsToSave.forEach(function(market) {
  angelList.findMarketsInvestors(market.al_id, market.id, saveAllInvestors);
});


// findLinkItemFunction(linkItem.id, function(dbLinkItem){
//   //if item (i.e. a startups market) does not exist, save it to db
//   if (dbLinkItem === null) {
//     saveLinkItemFunction(linkItem, function(newLinkItem) {
//       linkItemSqlIds.push(newLinkItem.attributes.id);
//       resolve();
//     });

//   //else, just store local ID
//   } else {
//     linkItemSqlIds.push(dbLinkItem.attributes.id);
//     resolve();
//   }
// });

// angelList.findMarketsInvestors("1", "34111", saveAllInvestors);


