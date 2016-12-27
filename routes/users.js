var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var User = require("../models/User.js");

router.param('mail', function(req, res, next, mail) {
    User.findOne({ 'mail': mail }, function (err, post) {
      if (err) return next(err);
    }).then(function(post) {
      res.locals.user = post;
      next();
    });
});

router.get('/', function(req, res, next) {
  User.find(function (err, users) {
    if(err) return next(err);
    res.json(users);
  });
});

router.get('/:mail', function(req, res, next) {
  res.json(res.locals.user);
});

router.get('/:mail/tabs', function(req, res, next) {
  res.json(res.locals.user.tabs);
});

router.get('/:mail/notes', function(req, res, next) {
  res.json(res.locals.user.notes);
});

router.post('/:mail/tabs', function(req, res, next) {
  res.locals.user.tabs.push(req.body);
  res.locals.user.save();
  res.json(req.body);
});

router.post('/:mail/notes', function(req, res, next) {
  res.locals.user.notes.push(req.body);
  res.locals.user.save();
  res.json(req.body);
});

router.put('/:mail/tabs', function(req, res, next) {
  User.update(
    { 'tabs._id': req.body._id },
    { $set: {
        'tabs.$': req.body
    }}, function (err, numAffected) { console.log(numAffected); }
  );
  res.json(req.body);
});

router.put('/:mail/notes', function(req, res, next) {
  User.update(
    { 'notes._id': req.body._id },
    { $set: {
        'notes.$': req.body
    }}, function (err, numAffected) { console.log(numAffected); }
  );
  res.json(req.body);
});

module.exports = router;
