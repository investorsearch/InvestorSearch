'use strict';

var updateDB = require('./controllers/updateDB');
var angelList = require('./controllers/angelList');
var Promise = require('bluebird'),
    async = require('async'),
    angelList = require('./controllers/angelList');

// console.log(updateDB);
var sample_market_investors_info = [
      {
            "name": "Hosain Rahman",
            "id": 147461,
            "bio": "",
            "follower_count": 184,
            "angellist_url": "https://angel.co/hosain-rahman",
            "image": "https://s3.amazonaws.com/photos.angel.co/users/147461-medium_jpg?1341936130",
            "blog_url": "",
            "online_bio_url": "",
            "twitter_url": "",
            "facebook_url": "http://www.facebook.com/hosain.rahman",
            "linkedin_url": "",
            "aboutme_url": "",
            "github_url": "",
            "dribbble_url": "",
            "behance_url": "",
            "resume_url": null,
            "what_ive_built": null,
            "what_i_do": null,
            "criteria": null,
            "locations": [
                {
                    "id": 1692,
                    "tag_type": "LocationTag",
                    "name": "san francisco",
                    "display_name": "San Francisco",
                    "angellist_url": "https://angel.co/san-francisco"
                }
            ],
            "roles": [
                {
                    "id": 9300,
                    "tag_type": "RoleTag",
                    "name": "angels",
                    "display_name": "Angel",
                    "angellist_url": "https://angel.co/angels"
                }
            ],
            "skills": [],
            "investor": true,
            "marketId" : 41221,
            "type" : "user"
        },
        {
            "name": "Tim Chang",
            "id": 1805,
            "bio": "Managing Director - Mayfield. Forbes Midas List 2010, 2011 (Top 100 VCs). @stanford-university MBA, Univ of Michigan MSEE/BSEE.  Bassist in BlackMahal and CoverFlow",
            "follower_count": 12569,
            "angellist_url": "https://angel.co/timechange",
            "image": "https://s3.amazonaws.com/photos.angel.co/users/1805-medium_jpg?1294803994",
            "blog_url": "http://www.blackmahal.com",
            "online_bio_url": "http://www.mayfield.com/team/all/Tim_Chang",
            "twitter_url": "http://twitter.com/timechange",
            "facebook_url": "http://www.facebook.com/timechange",
            "linkedin_url": "http://www.linkedin.com/profile/view?id=22690&locale=en_US&trk=tab_pro",
            "aboutme_url": "",
            "github_url": "",
            "dribbble_url": "",
            "behance_url": "",
            "resume_url": null,
            "what_ive_built": "",
            "what_i_do": "- BD\n- recruiting & screening (including BOD/advisor)\n- product strategy\n- marketing strategy\n- channel development & distribution partnerships\n- promotion via industry conferences, press interviews, etc. as a noted industry thought leader\n- exit planning and negotiation (M&A, IPO)\n- follow-on funding\n- market expertise: trends, competition, opportunities, including cross-border learnings\n- international expansion: Asia & India",
            "criteria": "",
            "locations": [
                {
                    "id": 1692,
                    "tag_type": "LocationTag",
                    "name": "san francisco",
                    "display_name": "San Francisco",
                    "angellist_url": "https://angel.co/san-francisco"
                },
                {
                    "id": 1850,
                    "tag_type": "LocationTag",
                    "name": "menlo park",
                    "display_name": "Menlo Park",
                    "angellist_url": "https://angel.co/menlo-park"
                }
            ],
            "roles": [
                {
                    "id": 9306,
                    "tag_type": "RoleTag",
                    "name": "vc",
                    "display_name": "VC",
                    "angellist_url": "https://angel.co/vc"
                },
                {
                    "id": 9299,
                    "tag_type": "RoleTag",
                    "name": "advisors",
                    "display_name": "Advisor",
                    "angellist_url": "https://angel.co/advisors"
                }
            ],
            "skills": [
                {
                    "id": 84421,
                    "tag_type": "SkillTag",
                    "name": "quantified self",
                    "display_name": "Quantified Self",
                    "angellist_url": "https://angel.co/quantified-self-1",
                    "level": null
                },
                {
                    "id": 16576,
                    "tag_type": "SkillTag",
                    "name": "mobile gaming",
                    "display_name": "Mobile Gaming",
                    "angellist_url": "https://angel.co/mobile-gaming-1",
                    "level": null
                },
                {
                    "id": 15665,
                    "tag_type": "SkillTag",
                    "name": "e commerce",
                    "display_name": "E-Commerce",
                    "angellist_url": "https://angel.co/e-commerce-1",
                    "level": null
                },
                {
                    "id": 18769,
                    "tag_type": "SkillTag",
                    "name": "gamification",
                    "display_name": "Gamification",
                    "angellist_url": "https://angel.co/gamification-1",
                    "level": null
                },
                {
                    "id": 15667,
                    "tag_type": "SkillTag",
                    "name": "digital media",
                    "display_name": "Digital Media",
                    "angellist_url": "https://angel.co/digital-media-1",
                    "level": null
                },
                {
                    "id": 19304,
                    "tag_type": "SkillTag",
                    "name": "advertising",
                    "display_name": "Advertising",
                    "angellist_url": "https://angel.co/advertising-1",
                    "level": null
                },
                {
                    "id": 15889,
                    "tag_type": "SkillTag",
                    "name": "mobile application design",
                    "display_name": "Mobile Application Design",
                    "angellist_url": "https://angel.co/mobile-application-design",
                    "level": null
                },
                {
                    "id": 19916,
                    "tag_type": "SkillTag",
                    "name": "social games",
                    "display_name": "Social Games",
                    "angellist_url": "https://angel.co/social-games-1",
                    "level": null
                },
                {
                    "id": 15666,
                    "tag_type": "SkillTag",
                    "name": "mobile",
                    "display_name": "Mobile",
                    "angellist_url": "https://angel.co/mobile",
                    "level": null
                },
                {
                    "id": 27011,
                    "tag_type": "SkillTag",
                    "name": "game mechanics",
                    "display_name": "Game Mechanics",
                    "angellist_url": "https://angel.co/game-mechanics-1",
                    "level": null
                },
                {
                    "id": 16035,
                    "tag_type": "SkillTag",
                    "name": "mobile platform",
                    "display_name": "Mobile Platform",
                    "angellist_url": "https://angel.co/mobile-platform",
                    "level": null
                },
                {
                    "id": 15836,
                    "tag_type": "SkillTag",
                    "name": "mobile advertising",
                    "display_name": "Mobile Advertising",
                    "angellist_url": "https://angel.co/mobile-advertising-1",
                    "level": null
                }
            ],
            "investor": true,
            "type" : "user",
            "marketId" : 41221
        }
];


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


angelList.findMarketsInvestors("26", "22591", saveAllInvestors);
