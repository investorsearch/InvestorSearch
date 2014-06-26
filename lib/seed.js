// 'use strict';

// var updateDB = require('./controllers/updateDB');
// var angelList = require('./controllers/angelList');
// var Promise = require('bluebird'),
//     async = require('async'),
//     angelList = require('./controllers/angelList');

// // console.log(updateDB);
// var sample_startup_info = [
//         {
//             "id": 423909,
//             "hidden": false,
//             "community_profile": false,
//             "name": "Fuffr",
//             "angellist_url": "https://angel.co/fuffr",
//             "logo_url": "https://s3.amazonaws.com/photos.angel.co/startups/i/423909-6c382c383d86aed117846acbf465b05e-medium_jpg.jpg?buster=1403513510",
//             "thumb_url": "https://s3.amazonaws.com/photos.angel.co/startups/i/423909-6c382c383d86aed117846acbf465b05e-thumb_jpg.jpg?buster=1403513510",
//             "quality": 0,
//             "product_desc": "Fuffr is a small team dedicated to broaden the way people interact with handheld devices. Through cutting edge technology Fuffr allows for touch on any surface outside of the screen, paving the way for fresher, better and more interactive user experience. We want to unlock the true potential of your mobile device!",
//             "high_concept": "Pushing the boundaries of mobile gaming?",
//             "follower_count": 1,
//             "company_url": "http://fuffr.com",
//             "created_at": "2014-06-23T08:51:54Z",
//             "updated_at": "2014-06-23T09:22:17Z",
//             "crunchbase_url": null,
//             "twitter_url": null,
//             "blog_url": null,
//             "facebook_url": null,
//             "linkedin_url": null,
//             "video_url": null,
//             "markets": [
//                 {
//                     "id": 100,
//                     "tag_type": "MarketTag",
//                     "name": "video games",
//                     "display_name": "Video Games",
//                     "angellist_url": "https://angel.co/video-games"
//                 },
//                 {
//                     "id": 490,
//                     "tag_type": "MarketTag",
//                     "name": "mobile games",
//                     "display_name": "Mobile Games",
//                     "angellist_url": "https://angel.co/mobile-games-1"
//                 },
//                 {
//                     "id": 590,
//                     "tag_type": "MarketTag",
//                     "name": "casual games",
//                     "display_name": "Casual Games",
//                     "angellist_url": "https://angel.co/casual-games"
//                 },
//                 {
//                     "id": 1142,
//                     "tag_type": "MarketTag",
//                     "name": "electronics",
//                     "display_name": "Electronics",
//                     "angellist_url": "https://angel.co/electronics"
//                 }
//             ],
//             "locations": [
//                 {
//                     "id": 2100,
//                     "tag_type": "LocationTag",
//                     "name": "stockton",
//                     "display_name": "Stockton",
//                     "angellist_url": "https://angel.co/stockton"
//                 }
//             ],
//             "company_size": null,
//             "company_type": [],
//             "status": null,
//             "screenshots": []
//         },
//         {
//             "id": 422538,
//             "hidden": false,
//             "community_profile": false,
//             "name": "BlankMediaGames LLC",
//             "angellist_url": "https://angel.co/blankmediagames-llc",
//             "logo_url": "https://s3.amazonaws.com/photos.angel.co/startups/i/422538-5cb7c49c7c6837d1195eba505d088ebc-medium_jpg.jpg?buster=1403255314",
//             "thumb_url": "https://s3.amazonaws.com/photos.angel.co/startups/i/422538-5cb7c49c7c6837d1195eba505d088ebc-thumb_jpg.jpg?buster=1403255314",
//             "launch_date": "2014-02-01",
//             "quality": 3,
//             "product_desc": "Our product, Town of Salem, is a free to play online multiplayer game  all about deception and convincing others you aren't the bad guy. It is a digital adaption of the party game Mafia/Werewolf set in the witch trials era.\n\nGame Overview:\n- Multiplayer flash game (up to 15 people per game)\n- Free to play\n- Browser based (PC/Mac only)\n- No overhead to get in and start playing.\n- Will move to mobile, steam and possibly consoles in the future\n\nTown of Salem is all about mind games and understanding the human psyche to get an edge over the other players in the game. We were featured on the front page of June's Indie Game Magazine (see here: http://www.indiegamemag.com/igm-june-issue-now-on-sale-cold-nights-warm-blood/ ) BlankMediaGames LLC was founded in Austin, TX.\n\nWe are also in the top 3 best rated indie games on gamejolt.com at the time of writing this. The game has an established player base with 1000-2300 people on at any given time with over 150,000 registered users.",
//             "high_concept": "Multiplayer indie game about lying and deception",
//             "follower_count": 2,
//             "company_url": "http://www.blankmediagames.com",
//             "created_at": "2014-06-20T08:37:10Z",
//             "updated_at": "2014-06-20T09:16:25Z",
//             "crunchbase_url": 'http://crunchbase.com/1234',
//             "twitter_url": "http://twitter.com/townofsalemgame",
//             "blog_url": "",
//             "facebook_url": null,
//             "linkedin_url": null,
//             "video_url": "https://www.youtube.com/watch?v=z4bpFr8oBpo&list=UUbPszk1acrQn_PDujvlAW5Q",
//             "markets": [
//                 {
//                     "id": 14,
//                     "tag_type": "MarketTag",
//                     "name": "games",
//                     "display_name": "Games",
//                     "angellist_url": "https://angel.co/games"
//                 },
//                 {
//                     "id": 41,
//                     "tag_type": "MarketTag",
//                     "name": "social games",
//                     "display_name": "Social Games",
//                     "angellist_url": "https://angel.co/social-games-2"
//                 },
//                 {
//                     "id": 100,
//                     "tag_type": "MarketTag",
//                     "name": "video games",
//                     "display_name": "Video Games",
//                     "angellist_url": "https://angel.co/video-games"
//                 },
//                 {
//                     "id": 490,
//                     "tag_type": "MarketTag",
//                     "name": "mobile games",
//                     "display_name": "Mobile Games",
//                     "angellist_url": "https://angel.co/mobile-games-1"
//                 }
//             ],
//             "locations": [
//                 {
//                     "id": 1617,
//                     "tag_type": "LocationTag",
//                     "name": "austin",
//                     "display_name": "Austin",
//                     "angellist_url": "https://angel.co/austin"
//                 }
//             ],
//             "company_size": "1-10",
//             "company_type": [
//                 {
//                     "id": 142836,
//                     "tag_type": "CompanyTypeTag",
//                     "name": "games ",
//                     "display_name": "Games ",
//                     "angellist_url": "https://angel.co/games-4"
//                 },
//                 {
//                     "id": 142837,
//                     "tag_type": "CompanyTypeTag",
//                     "name": "mobile games ",
//                     "display_name": "Mobile Games ",
//                     "angellist_url": "https://angel.co/mobile-games-4"
//                 },
//                 {
//                     "id": 144789,
//                     "tag_type": "CompanyTypeTag",
//                     "name": "GameDev Studio",
//                     "display_name": "Game Dev Studio",
//                     "angellist_url": "https://angel.co/gamedev-studio"
//                 }
//             ],
//             "status": null,
//             "screenshots": [
//                 {
//                     "thumb": "https://s3.amazonaws.com/screenshots.angel.co/f2/422538/edc886c499d22a72898456e58336270d-thumb_jpg.jpg",
//                     "original": "https://s3.amazonaws.com/screenshots.angel.co/f2/422538/edc886c499d22a72898456e58336270d-original.jpg"
//                 },
//                 {
//                     "thumb": "https://s3.amazonaws.com/screenshots.angel.co/f2/422538/9f82eceb4156849948b15757db715edd-thumb_jpg.jpg",
//                     "original": "https://s3.amazonaws.com/screenshots.angel.co/f2/422538/9f82eceb4156849948b15757db715edd-original.jpg"
//                 },
//                 {
//                     "thumb": "https://s3.amazonaws.com/screenshots.angel.co/f2/422538/a24d6f7b1bf13fce392605571636fe8a-thumb_jpg.jpg",
//                     "original": "https://s3.amazonaws.com/screenshots.angel.co/f2/422538/a24d6f7b1bf13fce392605571636fe8a-original.jpg"
//                 },
//                 {
//                     "thumb": "https://s3.amazonaws.com/screenshots.angel.co/f2/422538/263d254526b9b73bfa3e349e5b49ce28-thumb_jpg.jpg",
//                     "original": "https://s3.amazonaws.com/screenshots.angel.co/f2/422538/263d254526b9b73bfa3e349e5b49ce28-original.png"
//                 },
//                 {
//                     "thumb": "https://s3.amazonaws.com/screenshots.angel.co/f2/422538/7f2aca4fbdf69d2cb39cdf2922143f15-thumb_jpg.jpg",
//                     "original": "https://s3.amazonaws.com/screenshots.angel.co/f2/422538/7f2aca4fbdf69d2cb39cdf2922143f15-original.png"
//                 },
//                 {
//                     "thumb": "https://s3.amazonaws.com/screenshots.angel.co/f2/422538/ce2784d4d921a297f3054f2873486a3c-thumb_jpg.jpg",
//                     "original": "https://s3.amazonaws.com/screenshots.angel.co/f2/422538/ce2784d4d921a297f3054f2873486a3c-original.jpg"
//                 },
//                 {
//                     "thumb": "https://s3.amazonaws.com/screenshots.angel.co/f2/422538/24704e3cf5d68b73349f4e59d594c563-thumb_jpg.jpg",
//                     "original": "https://s3.amazonaws.com/screenshots.angel.co/f2/422538/24704e3cf5d68b73349f4e59d594c563-original.PNG"
//                 },
//                 {
//                     "thumb": "https://s3.amazonaws.com/screenshots.angel.co/f2/422538/edbdc8cca3af0c37842e3469babd6145-thumb_jpg.jpg",
//                     "original": "https://s3.amazonaws.com/screenshots.angel.co/f2/422538/edbdc8cca3af0c37842e3469babd6145-original.jpg"
//                 }
//             ],
//             "fundraising": {
//                 "round_opened_at": "2014-06-20",
//                 "raising_amount": 250000,
//                 "pre_money_valuation": null,
//                 "discount": 10,
//                 "equity_basis": "debt",
//                 "updated_at": "2014-06-20T08:37:10Z",
//                 "raised_amount": 0,
//                 "public": true
//             }
//         },
//         {
//             "id": 422053,
//             "hidden": true
//         }
// ];


// var done = function(err) {
//   console.log('save finished');
//   console.log(err);
// };

// //Given an item (startup or market), save it and create the link in the through table.
// var saveAndLink = function(item, linkItemToSave, saveItemFunction, findLinkItemFunction, saveLinkItemFunction, linkItemsFunction, done){

//   //arr to store the items corresponding partner ids from the sql table
//   var linkItems = item[linkItemToSave];
//   var linkItemSqlIds = [];

//   //save the item
//   saveItemFunction(item, function(itemData) {

//     //for each of the items linkItems (i.e. a startups markets), find if it already exists in the DB
//     var promiseArr = linkItems.map(function(linkItem){
//       return new Promise(function(resolve, reject) {
//         findLinkItemFunction(linkItem.id, function(dbLinkItem){

//           //if item (i.e. a startups market) does not exist, save it to db
//           if (dbLinkItem === null) {
//             saveLinkItemFunction(linkItem, function(newLinkItem) {
//               linkItemSqlIds.push(newLinkItem.attributes.id);
//               resolve();
//             });

//           //else, just store local ID
//           } else {
//             linkItemSqlIds.push(dbLinkItem.attributes.id);
//             resolve();
//           }
//         });
//       });
//     });

//     //once all linkItems (i.e. markets) have been saved, save item-linkItesm connections (i.e. startup-markets connection)
//     Promise.all(promiseArr).then(function() {
//       linkItemSqlIds.forEach(function(itemId) {
//         linkItemsFunction(itemId, itemData.attributes.id);
//       });
//       done();
//     });
//   });
// };

// //Wrapper function- to be passed to async.each - Used to input correct arguments to saveAndLink func for desired DB updates and search
// var companySaver = function(company, done) {
//   if (company.hidden !== true) {
//     saveAndLink(company, "markets", updateDB.addNewCompany, updateDB.findMarketByAngelListId, updateDB.addNewMarket, updateDB.linkMarketAndCompany, done);
//   } else {
//     updateDB.addHiddenCompany(company);
//     console.log('company with id ' + company.id + ' is hidden');
//     done();
//   }
// };

// var saveAllCompanies = function(companies) {
// async.eachSeries(companies, companySaver);
// };

// angelList.findMarketsCompanys("9217", saveAllCompanies);

// console.log('hey!');