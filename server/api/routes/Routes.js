var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var random = require('random-js');
var jwt = require('jsonwebtoken');
var auth = require ('../helpers/authHelpers');
var Cards = require('../models/Model');
const ObjectId = require("mongodb").ObjectID;

/* GET ALL CardsS */
router.get('/', auth.securedToken, function(req, res, next) {
  jwt.verify(req.token, auth.getSecureKey() , function(err, data){
    if (err){
      res.sendStatus(403);
    }else{
      Cards.find(function (err, products) {
        if (err) return next(err);
        res.json(products);
      });
    }
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
router.get('/getcard/:cardId', function(req, res, next) {
  cardId = new ObjectId(req.params.cardId);
  Cards.aggregate([
    {$unwind: "$cards" },
    {$match: {
              $and: 
                [
                  { "cards._id": cardId},
                  { $or: [
                          {"cards.cardExpiration": { $gte: new Date() }}, 
                          {"cards.cardExpiration": null }
                        ]
                  }
                ]
              }
    },
    {$project: {
      beName: 1,
      beLink: 1,
      bizId: 1,
      bizPhone: 1,
      bizWeb: 1,
      bizLocation: 1,
      bizName: 1, 
      "bizAddress": 1,
      bizLogo: 1,
      veName: 1,
      veSlug: 1,
      "cards._id": 1,
      "cards.cardTitle": 1,
      "cards.cardImgSrc": 1,
      "cards.cardContent": 1,
      "cards.cardExpiration": 1,
      "cards.cardCoupon": 1
  }}], function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

// Authentication post page 
router.post('/login', function(req, res) {
  //user admin only
  if ( auth.isUserAuthenticated(req) ){
    const user = { name: process.env.USERNAME };
    const token = jwt.sign({user}, auth.getSecureKey());
    res.json( {token : token } );
  }else{
    res.sendStatus(403);
  }
});


/* create beacon, biz, venue */
// router.post('/', auth.securedToken, function(req, res, next) {
  
//   jwt.verify(req.token, auth.getSecureKey(), function(err, data){
//     if (err){
//       res.sendStatus(403);
//     }else{
//       // Make a copy of request post
//       var body = req.body;
//       // Create random biz id
//       var randomId = new random(random.engines.mt19937().autoSeed());
//       body.bizId = randomId.integer(100000, 999999);
//       // Insert into db
//       Cards.create(body, function (err, post) {
//         if (err) return next(err);
//         res.json(post);
//       });
//     }
//   });
// });

/* create beacon, biz, venue with cards */
router.post('/', auth.securedToken, function(req, res, next) {
  
  jwt.verify(req.token, auth.getSecureKey(), function(err, data){
    if (err){
      res.sendStatus(403);
    }else{
      // Create random biz id
      var randomId = new random(random.engines.mt19937().autoSeed());
      var bizRandom = randomId.integer(100000, 999999);
      var objectToInsert = {
        beName: "BlueBeaconIdentify",
        beLink: "LinkShoppingPHY(7DsxH)",
        beBattery: "100%",
        beBrand: "Estimote",
        bizName: "BizName",
        bizId: bizRandom,
        bizWeb: "",
        bizPhone: "",
        bizLogo: "http://img-src",
        bizPosition: 1,
        bizAddress: {
          country: "US",
          state: "FL",
          street: "",
          zip: "",
          county: "Miami"
        },
        bizLocation: {
          type: "Point", 
          coordinates: [25.747206, -80.387772]
        },
        veName: "Venue-Name(Mall-name)",
        veSlug: "ve1",
        veLocation: {
          type: "Point", 
          coordinates: [25.747206, -80.387772]
        },
        cards: [
          {
            cardTitle: "",
            cardContent: "",
            cardImgSrc: "",
            cardExpiration: "",
            cardCoupon: "",
            cardPosition: 1,
            cardLink: "",
            cardBundle: "1",
            cardType: "1"
          },
          {
            cardTitle: "",
            cardContent: "",
            cardImgSrc: "",
            cardExpiration: "",
            cardCoupon: "",
            cardPosition: 2,
            cardLink: "",
            cardBundle: "1",
            cardType: "1"
          },
          {
            cardTitle: "",
            cardContent: "",
            cardImgSrc: "",
            cardExpiration: "",
            cardCoupon: "",
            cardPosition: 3,
            cardLink: "",
            cardBundle: "1",
            cardType: "1"
          },
          {
            cardTitle: "",
            cardContent: "",
            cardImgSrc: "",
            cardExpiration: "",
            cardCoupon: "",
            cardPosition: 4,
            cardLink: "",
            cardBundle: "1",
            cardType: "1"
          },
          {
            cardTitle: "",
            cardContent: "",
            cardImgSrc: "",
            cardExpiration: "",
            cardCoupon: "",
            cardPosition: 5,
            cardLink: "",
            cardBundle: "1",
            cardType: "1"
          }
        ]
      };
      // Insert into db
      Cards.create(objectToInsert, function (err, post) {
        if (err) return next(err);
        res.sendStatus(200);
      });
    }
  });
});

/* create cards id: beacon id*/
router.post('/addcard/:id',  auth.securedToken, function(req, res, next) {
  jwt.verify(req.token, auth.getSecureKey(), function(err, data){
    if (err){
      res.sendStatus(403);
    }else{
      Cards.findByIdAndUpdate({_id: req.params.id}, {$push: {cards: req.body}}, function (err, post) {
        if (err) return next(err);
        res.json(post);
      });
    }
  });
});

router.get('/venues/:venueSlug', function(req, res, next) {
  // TODO - remove this agregation and replace by a simple find
  // This was done to trunckate the cardContent, in next development
  // we'll use the whole cardContent data in the same card, and when
  // you click it it'll just expand as a modal window.

Cards.aggregate([
  { $match: { "veSlug": {$eq: req.params.venueSlug }}},
  { $unwind: "$cards" },
  { $sort: { "cards.cardPosition": 1 } },
  { $match: { "cards.cardPosition": {$ne: 0 }, 
            $or: [
                    {"cards.cardExpiration": { $gte: new Date() }}, 
                    {"cards.cardExpiration": null }
                  ] 
            }},
  { $group: { 
              _id: "$_id",  
              beName: { $first: "$beName" }, 
              beLink: { $first: "$beLink" }, 
              bizName: { $first: "$bizName" }, 
              bizPhone: { $first: "$bizPhone" }, 
              bizWeb: { $first: "$bizWeb" }, 
              bizLogo: { $first: "$bizLogo" }, 
              bizPosition: { $first: "$bizPosition" }, 
              veName: { $first: "$veName" }, 
              bizAddress: { $first: "$bizAddress" }, 
              bizLocation: { $first: "$bizLocation" }, 
              bizName: { $first: "$bizName" }, 
              cards: { $push: "$cards" } 
            }
  },
  { $sort: { "bizPosition": 1 } }
], function (err, post) {
          if (err) return next(err);
          res.json(post);
        });
  });

  router.get('/bizs/:bizId', function(req, res, next) {
    // TODO - remove this agregation and replace by a simple find
    // This was done to trunckate the cardContent, in next development
    // we'll use the whole cardContent data in the same card, and when
    // you click it it'll just expand as a modal window.
  
  Cards.aggregate([
    { $match: { "_id": {$eq: ObjectId(req.params.bizId) }}},
    { $unwind: "$cards" },
    { $sort: { "cards.cardPosition": 1 } },
    { $match: { "cards.cardPosition": {$ne: 0 }, 
            $or: [
                    {"cards.cardExpiration": { $gte: new Date() }}, 
                    {"cards.cardExpiration": null }
                  ] 
            }},
    { $group: { 
                _id: "$_id",  
                beName: { $first: "$beName" }, 
                beLink: { $first: "$beLink" }, 
                bizName: { $first: "$bizName" }, 
                bizPhone: { $first: "$bizPhone" }, 
                bizWeb: { $first: "$bizWeb" }, 
                bizLogo: { $first: "$bizLogo" }, 
                bizPosition: { $first: "$bizPosition" }, 
                veName: { $first: "$veName" }, 
                veSlug: { $first: "$veSlug" }, 
                bizAddress: { $first: "$bizAddress" }, 
                bizLocation: { $first: "$bizLocation" }, 
                bizName: { $first: "$bizName" }, 
                cards: { $push: "$cards" } 
              }
    },
    { $sort: { "bizPosition": 1 } }
  ], function (err, post) {
            if (err) return next(err);
            res.json(post);
          });
    });


/* UPDATE biz, beacon, venue*/
router.put('/:id', auth.securedToken, function(req, res, next) {
  jwt.verify(req.token, auth.getSecureKey(), function(err, data){
    if (err){
      res.sendStatus(403);
    }else{
      Cards.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
      });
  }
  });
});

/* UPDATE card by id and business id*/
router.put('/updateCard/:id/:cardId', auth.securedToken, function(req, res, next) {
  jwt.verify(req.token, auth.getSecureKey(), function(err, data){
    if (err){
      res.sendStatus(403);
    }else{
      Cards.update({
        _id:ObjectId(req.params.id), 
        "cards._id":ObjectId(req.params.cardId)}, 
        {
          $set:
          {
           "cards.$.cardImgSrc": req.body.cardImgSrc, 
           "cards.$.cardBundle": req.body.cardBundle,
           "cards.$.cardLink": req.body.cardLink,
           "cards.$.cardTitle":  req.body.cardTitle,
           "cards.$.cardExpiration":  req.body.cardExpiration,
           "cards.$.cardCoupon":  req.body.cardCoupon,
           "cards.$.cardContent":  req.body.cardContent,
           "cards.$.cardPosition": req.body.cardPosition,
           "cards.$.cardType":req.body.cardType,
          
          }}, 
            function (err, post) {
             if (err) return next(err);
            res.json(post);
      });
  }
  });
});

router.get('*', function(req, res){
    res.json('Are you lost?');
});


module.exports = router;
