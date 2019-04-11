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

router.post('/upload/', auth.securedToken, upload.single('image'), function(req, res, next){
// router.post('/upload/', function(req, res, next){
  // jwt.verify(req.token, auth.getSecureKey(), function(err, data){
  //   if (err){
  //     res.json({ok: 'not'});;
  //   }else{  
      // res.json({ok: req});
      console.log(req.file.location);
  //   }
  // });
  // jwt.verify(req.token, auth.getSecureKey(), function(err, data){
  //   if (err){
  //     res.sendStatus(403);
  //   }else{  
  //     res.sendStatus(200);
  //     singleUpload(req, res, function(err, some) {
  //       if (err) {
  //         return res.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}] });
  //       }
  //       // TODO: wait for s3 lambda function to give you a 
  //       // callback with the new thumbanil url
  //       var jpgfile, filename;
  //       if (req.file){
  //         filename = req.file.location;
  //         jpgfile = filename.substring(filename.lastIndexOf('/')+1);
  //       }else{
  //         jpgfile = '';
  //       }
    
  //       // let cardId = '5a526769d0ddab4bcdcc1557';
  //       // let bizId = '5a55afacfd471c3ba118bb08';
  //       let cardId = req.body.cardId;
  //       let bizId = req.body.bizId;
  //       let title = req.body.title;
  //       let description = req.body.description;
    
  //       console.log("card " + cardId + " biz " + bizId);
        
    
  //       // if( jpgfile ){
  //       //   // Update the card
  //       //   Cards.update({
  //       //     _id:ObjectId(bizId), 
  //       //     "cards._id":ObjectId(cardId)}, 
  //       //     {
  //       //       $set:
  //       //       {
  //       //        "cards.$.cardImgSrc": 'https://s3.amazonaws.com/dealbyimage/thumbnails/' + jpgfile, 
  //       //        "cards.$.cardTitle":  title,
  //       //        "cards.$.cardContent":  description
  //       //       }}, 
  //       //         function (err, post) {
  //       //          if (err){
  //       //           return res.status(400).send('Error');
  //       //          }
  //       //          else{
  //       //           return res.status(200).send('Success');
  //       //          }
  //       //   });
  //       // }
  //       // else{
  //       //   // Update the card
  //       //   Cards.update({
  //       //     _id:ObjectId(bizId), 
  //       //     "cards._id":ObjectId(cardId)}, 
  //       //     {
  //       //       $set:
  //       //       {
  //       //        "cards.$.cardTitle":  title,
  //       //        "cards.$.cardContent":  description
  //       //       }}, 
  //       //         function (err, post) {
  //       //           if (err){
  //       //             return res.status(400).send('Error');
  //       //            }
  //       //            else{
  //       //             return res.status(200).send('Success');
  //       //            }
  //       //   });
  //       // }
        
  //       // return res.json({'imageUrl': jpgfile, 'title': req.body.title, 'description': req.body.description});
  //     });
  //   }
  // // return res.json( {total : "ok" } );
  // // res.sendStatus(200);
  });

router.post('/ups/', function(req, res, next){
  console.log(req);
  
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
router.post('/login', function(req, res, next) {
  auth.isUserAuthenticated(req, function(err, user){
    if(user && !err){
      const payload={
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

/* create a venue */
router.post('/venue/',  auth.securedToken, function(req, res, next) {
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
                          [-80.3908847,25.7482149],[-80.3908954,25.7482342],[-80.3908847,25.7482149]
                        ]
                    ], 
                    type: "Polygon"
                }, 
                vePointLocation: {
                    coordinates: [
                        req.body.vePointLocationLatitude, 
                        req.body.vePointLocationLongitude
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

/* Get cards for ibeacons */
router.get('/beacons/:beaconMinor', function(req, res, next) {
      Beacon.find({
          minor: req.params.beaconMinor
          }, function (err, post) {
              if (err) return next(err);
              res.json(post);
        // res.json(post);
      });
});

/* Get venues info fot map  markers*/
router.post('/map/', function(req, res, next) {
  Venue.find({}, {vePointLocation: 1, veSlug: 1},function (err, post) {
          if (err) return next(err);
          res.json(post);
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
