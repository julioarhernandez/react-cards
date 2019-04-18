var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var random = require('random-js');
var jwt = require('jsonwebtoken');
var auth = require ('../helpers/authHelpers');
var Cards = require('../models/Model');
var User = require('../models/UserModel');
var Beacon = require('../models/BeaconModel');
var Venue = require('../models/VenueModel');
var multer = require('multer');
var upload = require('../helpers/file-upload');
var bcrypt = require('bcryptjs');
const ObjectId = require("mongodb").ObjectID;


/**
 * CARDS ENDPOINTS
 */


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

/* GET business cards from bizId */
// router.get('/getbizcards/:bizId', auth.securedToken, function(req, res, next) {
router.get('/getbizcards/:bizId', function(req, res, next) {
  // jwt.verify(req.token, auth.getSecureKey() , function(err, data){
    // if (err){
    //   res.sendStatus(403);
    // }else{
      bizId = new ObjectId(req.params.bizId);
      Cards.find({
        _id: bizId
      },
      {
          bizId: 1,
          cards: 1
      },
      function (err, products) {
        if (err) return next(err);
        res.json(products);
      });
    // }
  // });
});

/* GET single card BY CARD ID */
router.get('/getcard/:cardId', auth.securedToken, function(req, res, next) {
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

/* create cards id:  id*/
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

/* Upload image and card info */
router.post('/upload/', auth.securedToken, upload.single('image'), function(req, res, next){

  // retreive the form data
  let cardId = req.body.cardId;
  let bizId = req.body.bizId;
  let title = req.body.title;
  let description = req.body.description;
  let jpgfile = '' || (req.file && req.file.key);
  console.log(`${cardId} - ${bizId} -${title} -${description}`);
  // res.json({ messege: req});
  // res.json({ok: 'true'});

  // Update the card
  if (jpgfile){
      // Update the card
      Cards.update({
          _id:ObjectId(bizId), 
          "cards._id":ObjectId(cardId)}, 
              {
                  $set:
                      {
                          "cards.$.cardImgSrc": 'https://s3.amazonaws.com/dealbyimage/thumbnails/' + jpgfile, 
                          "cards.$.cardTitle":  title,
                          "cards.$.cardContent":  description
                      }
              }, function (err, post) {
                  if (err){
                      return res.status(400).send({status: 'Error'});
                  }
                  else{
                      return res.status(200).send({status: 'Success'});
              }
              });
  }
  else{
      // Update the card
      Cards.update({
        _id:ObjectId(bizId), 
        "cards._id":ObjectId(cardId)}, 
        {
          $set:
          {
           "cards.$.cardTitle":  title,
           "cards.$.cardContent":  description
          }}, 
          function (err, post) {
            if (err){
                return res.status(400).send({status: 'Error'});
            }
            else{
                return res.status(200).send({status: 'Success'});
        }
        });
  }

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

/**
 * VENUE ENDPOINTS
 */

/* GET venue link BY latitude, longitude  */
router.get('/getlinks/:latid/:longid', function(req, res, next) {
  Venue.find({veLocation:
    {$geoIntersects:
        {$geometry:{ "type" : "Point",
             "coordinates" : [ req.params.longid, req.params.latid ] }
         }
     }
  }, { veSlug: 1}, function (err, post) {
    if (err) return next(err);
    post = post == "" ? "#" : "https://dealby.us/showvenue/" + post[0].veSlug;
    res.json(post);
  });
});

/* GET venue links by lat and long */
router.get('/:id', function(req, res, next) {
  Cards.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* create a venue */
router.post('/addvenue/',  auth.securedToken, function(req, res, next) {
  jwt.verify(req.token, auth.getSecureKey(), function(err, data){
    if (err){
      res.sendStatus(403);
    }else{
            // Create random biz id
            // var randomId = new random(random.engines.mt19937().autoSeed());
            // var bizRandom = randomId.integer(100000, 999999);
            var venueToInsert = {
                veName: req.body.veName, 
                veSlug: req.body.veSlug, 
                veLocation: {
                    coordinates: [
                        [
                           req.body.veCoordinates
                        ]
                    ], 
                    type: "Polygon"
                }, 
                vePointLocation: {
                    coordinates: [
                        req.body.vePointLocation
                    ], 
                    type: "Point"
                }, 
                veAddress: {
                    country: req.body.veAddressCountry , 
                    state:  req.body.veAddressState, 
                    street:  req.body.veAddressStreet, 
                    zip:  req.body.veAddressZip, 
                    county: req.body.veAddressCounty 
                }
            };
            Venue.create(venueToInsert, function (err, post) {
              if (err) return next(err);
              res.sendStatus(200);
            });
            // var objectToInsert = {
            //   bizName: "BizName",
            //   bizId: bizRandom,
            //   bizWeb: "",
            //   bizPhone: "",
            //   bizLogo: "http://img-src",
            //   bizPosition: 1,
            //   bizAddress: {
            //     country: "US",
            //     state: "FL",
            //     street: "",
            //     zip: "",
            //     county: "Miami"
            //   },
            //   bizLocation: {
            //     type: "Point", 
            //     coordinates: [-80.387772, 25.747206]
            //   },
            //   veName: "Venue-Name(Mall-name)",
            //   veSlug: "ve1",
            //   veLocation: {
            //     type: "Polygon", 
            //     coordinates: [[
            //         [-80.387772, 25.747206],
            //         [-80.387772, 25.747206],
            //         [-80.387772, 25.747206],
            //         [-80.387772, 25.747206],
            //         [-80.387772, 25.747206]
            //     ]]
            //   },
            //   cards: [
            //     {
            //       cardTitle: "",
            //       cardContent: "",
            //       cardImgSrc: "",
            //       cardExpiration: "",
            //       cardCoupon: "",
            //       cardPosition: 1,
            //       cardLink: "",
            //       cardBundle: "1",
            //       cardType: "1"
            //     },
            //     {
            //       cardTitle: "",
            //       cardContent: "",
            //       cardImgSrc: "",
            //       cardExpiration: "",
            //       cardCoupon: "",
            //       cardPosition: 2,
            //       cardLink: "",
            //       cardBundle: "1",
            //       cardType: "1"
            //     },
            //     {
            //       cardTitle: "",
            //       cardContent: "",
            //       cardImgSrc: "",
            //       cardExpiration: "",
            //       cardCoupon: "",
            //       cardPosition: 3,
            //       cardLink: "",
            //       cardBundle: "1",
            //       cardType: "1"
            //     },
            //     {
            //       cardTitle: "",
            //       cardContent: "",
            //       cardImgSrc: "",
            //       cardExpiration: "",
            //       cardCoupon: "",
            //       cardPosition: 4,
            //       cardLink: "",
            //       cardBundle: "1",
            //       cardType: "1"
            //     },
            //     {
            //       cardTitle: "",
            //       cardContent: "",
            //       cardImgSrc: "",
            //       cardExpiration: "",
            //       cardCoupon: "",
            //       cardPosition: 5,
            //       cardLink: "",
            //       cardBundle: "1",
            //       cardType: "1"
            //     }
            //   ]
            // };
      // Insert into db

      // Cards.findByIdAndUpdate({_id: req.params.id}, {$push: {cards: req.body}}, function (err, post) {
      //   if (err) return next(err);
      //   res.json(post);
      // });

    }
  });
});

/**
 * BIZ ENDPOINTS
 */

 /* create biz with cards */
 router.post('/', auth.securedToken, function(req, res, next) {
    jwt.verify(req.token, auth.getSecureKey(), function(err, data){
        if (err){
        res.sendStatus(403);
        }else{
        // Create random biz id
        var randomId = new random(random.engines.mt19937().autoSeed());
        var bizRandom = randomId.integer(100000, 999999);
        var objectToInsert = {
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
            coordinates: [-80.387772, 25.747206]
            },
            veName: "Venue-Name(Mall-name)",
            veSlug: "ve1",
            veLocation: {
            type: "Polygon", 
            coordinates: [[
                [-80.387772, 25.747206],
                [-80.387772, 25.747206],
                [-80.387772, 25.747206],
                [-80.387772, 25.747206],
                [-80.387772, 25.747206]
            ]]
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

/* Get all biz in a venue from venueSlug  */
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

/* Get biz info from logged userID  */
router.get('/bizs/:userId', function(req, res, next) {
  Cards.find({
      userId: req.params.id
    }, 
    {
        bizName: 1, 
        bizLogo: 1,
        veName: 1,
        bizAddress: 1 
    }, function (err, post) {
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

/**
 * USERS AND AUTHENTICATION
 */

// Authentication post page 
router.post('/login', function(req, res, next) {
  auth.isUserAuthenticated(req, function(err, user){
    if(user && !err){ 
      const payload={
        userid: user._id,
        email: user.email,
        type: user.type,
        status: user.status
      };
      const token = jwt.sign({payload}, auth.getSecureKey(), {expiresIn: "24h"});
      res.json( {token : token } );
    }else{
      res.sendStatus(403);
    }
  });
});

// Add new user 
// router.post('/adduser/', function(req, res) {
router.post('/adduser/', auth.securedToken, function(req, res, next) {
  jwt.verify(req.token, auth.getSecureKey(), function(err, data){
      if (err){
        res.sendStatus(403);
      }else{
        bcrypt.hash(req.body.password, 10, function (err,   hash) {
          var objectToInsert = {
            type: "biz",
            status: "active",
            password: hash,
            email: req.body.email
          };
          // Insert into db
          User.create(objectToInsert, function (err, post) {
              if (err) return next(err);
              res.status(200).send({status: 'Success'});
          });
        });
    }
  });
});


/**
 * MAP ENDPOINT
 */

 /* Get venues info for map markers*/
router.post('/map/', function(req, res, next) {
  Venue.find({}, {vePointLocation: 1, veSlug: 1},function (err, post) {
          if (err) return next(err);
          res.json(post);
  });
});

/**
 * DEFAULT ROUTE
 */

router.get('*', function(req, res){
  res.json({response: 'Are you lost?'});
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

// /* Get cards for ibeacons */
// router.get('/beacons/:beaconMinor', function(req, res, next) {
//       Beacon.find({
//           minor: req.params.beaconMinor
//           }, function (err, post) {
//               if (err) return next(err);
//               res.json(post);
//         // res.json(post);
//       });
// });

module.exports = router;
