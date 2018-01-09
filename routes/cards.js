var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var random = require('random-js');
var Cards = require('../models/Cards.js');
const ObjectId = require("mongodb").ObjectID;

/* GET ALL CardsS */
router.get('/', function(req, res, next) {
  Cards.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET single business, beacon, venue BY ID */
router.get('/:id', function(req, res, next) {
  Cards.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* GET single card BY ID */
// router.get('/getcard/:id', function(req, res, next) {
//   Cards.find({ _id: new ObjectId(req.params.id)}, function (err, post) {
//     if (err) return next(err);
//     res.json(post);
//   });
// });

/* GET single card BY ID */
router.get('/getcard/:cardId', function(req, res, next) {
  cardId = new ObjectId(req.params.cardId);
  Cards.aggregate([
    {$unwind: "$cards" },
    {$match: { "cards._id": cardId}},
    {$project: {
      beName: 1,
      beLink: 1,
      bizId: 1,
      veSlug: 1,
      "cards._id": 1,
      cardContent: { $substrBytes: [ "$cards.cardContent" , 0 , 20 ]}
  }}], function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});



/* create beacon, biz, venue */
router.post('/', function(req, res, next) {
  // Make a copy of request post
  var body = req.body;
  // Create random biz id
  var randomId = new random(random.engines.mt19937().autoSeed());
  body.bizId = randomId.integer(100000, 999999);
  // Insert into db
  Cards.create(body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* create cards id: beacon id*/
router.post('/addcard/:id', function(req, res, next) {
  Cards.findByIdAndUpdate({_id: req.params.id}, {$push: {cards: req.body}}, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* get busines in a venue */
// router.get('/venue/:venueSlug', function(req, res, next) {
//   Cards.find({veSlug : req.params.venueSlug}, function (err, post) {
//     if (err) return next(err);
//     res.json(post);
//   }).select({ "beName": 1,  "beLink": 1, "cards.cardContent" : 1, "_id": 0});
// });


router.get('/venue/:venueSlug', function(req, res, next) {
// TODO - remove this agregation and replace by a simple find
// This was done to trunckate the cardContent, in next development
// we'll use the whole cardContent data in the same card, and when
// you click it it'll just expand as a modal window.
// Cards.find({veSlug : req.params.venueSlug}, function (err, post) {
//   if (err) return next(err);
//   res.json(post);
// }).select({ "beName": 1,  "beLink": 1, "cards.cardContent" : 1, "_id": 0});
  Cards.aggregate([
    {$unwind: "$cards" },
    {$match: { veSlug: req.params.venueSlug}},
    {$project: {
      beName: 1,
      beLink: 1,
      bizId: 1,
      veSlug: 1,
      cardContent: { $substrBytes: [ "$cards.cardContent" , 0 , 20 ]}
  }}], function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});



/* UPDATE biz, beacon and venue */
router.put('/:id', function(req, res, next) {
  Cards.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE Cards */
// router.delete('/:id', function(req, res, next) {
//   Cards.findByIdAndRemove(req.params.id, req.body, function (err, post) {
//     if (err) return next(err);
//     res.json(post);
//   });
// });

router.get('*', function(req, res){
    res.json('Your lost');
});


module.exports = router;
