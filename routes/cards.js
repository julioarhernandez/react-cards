var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Cards = require('../models/Cards.js');

/* GET ALL CardsS */
router.get('/', function(req, res, next) {
  Cards.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET SINGLE Cards BY ID */
router.get('/:id', function(req, res, next) {
  Cards.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* GET SINGLE Cards BY ID */
router.get('/:id', function(req, res, next) {
  Cards.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE Cards */
router.post('/', function(req, res, next) {
  Cards.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE Cards */
router.put('/:id', function(req, res, next) {
  Cards.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE Cards */
router.delete('/:id', function(req, res, next) {
  Cards.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
