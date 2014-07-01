// 'use strict';

// var Thing = require('../models/thing');

// exports.awesomeThings = function(req, res){
//   return Thing.fetchAll()
//     .then(function(model){
//         return res.json(model);
//     })
//     .catch(function(err){
//       console.error(err);
//       return res.send(err);
//     });
// };

// exports.addNewThing = function(req, res){
//   return Thing
//     .forge({item: 'heyhey', quantity: 33})
//     .save()
//     .then(function(){
//       console.log('this was saved');
//     })
//     .catch(function(err){
//       console.error(err);
//       return res.send(err);
//     });
// };

// // var mongoose = require('mongoose'),
// //     Thing = mongoose.model('Thing');

// // /**
// //  * Get awesome things
// //  */
// // exports.awesomeThings = function(req, res) {
// //   return Thing.find(function (err, things) {
// //     if (!err) {
// //       return res.json(things);
// //     } else {
// //       return res.send(err);
// //     }
// //   });
// // };