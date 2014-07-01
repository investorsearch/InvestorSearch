var knexDbConfig = require('../config/config').knexDbConfig,
    knex = require('knex')(knexDbConfig),
    bookshelf = require('bookshelf')(knex),
    masterList = require('../models/masterList').masterList,
    Investor = require('../models/angelData').Investor,
    User = require('../models/user'),
    Q = require('q');


exports.list = function(req, res) {
  console.log(req.user.id);
  var id = req.user.id;
  User.query({where: {id: id}})
  .fetch({withRelated: ['investors']})
  .then(function(collection){
    console.log("YAY!");
    console.log(collection.related('investors').models);
    res.json(collection.related('investors').models);
  });
};

exports.addInvestor = function(req, res) {
  console.log(req.params.id);
  masterList
  .forge({user_id: req.user.id, investor_id: req.params.id}).save().then(function(investor){
    console.log("investor is saved in the table");
    res.json(investor);
  })
};
