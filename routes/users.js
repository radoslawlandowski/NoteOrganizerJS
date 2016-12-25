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
  User.findByIdAndUpdate(req.params.mail, res.locals.user, function (err, post) {
    if (err) return next(err);
    res.json(req.body);
  });
});

router.put('/:mail/tabs', function(req, res, next) {
  res.locals.user.tabs.push(req.body);
  User.findOneAndUpdate({ 'mail': mail }, res.locals.user, function (err, post) {
    if (err) return next(err);
    res.json(req.body);
  });
});

router.post('/:mail/notes', function(req, res, next) {
  res.locals.user.notes.push(req.body);
  User.findOneAndUpdate({ 'mail': mail }, res.locals.user, function (err, post) {
    if (err) return next(err);
    res.json(req.body);
  });
});

router.put('/:mail/notes', function(req, res, next) {
  res.locals.user.notes.push(req.body);
  User.findOneAndUpdate({ 'mail': mail }, res.locals.user, function (err, post) {
    if (err) return next(err);
    res.json(req.body);
  });
});

router.put('/:mail', function(req, res, next) {
  User.findOneAndUpdate({ 'mail': mail }, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
