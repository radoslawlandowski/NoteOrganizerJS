var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
mongoose.set('debug', true)

var User = require("../models/User.js");
var Note = require("../models/Note.js");

router.param('mail', function(req, res, next, mail) {
    User.findOne({ 'mail': mail }, function (err, post) {
      if (err) return next(err);
    }).then(function(post) {
      res.locals.user = post;
      next();
    });
});

// ################ TABS ENDPOINTS ########################################

router.get('/:mail/tabs', function(req, res, next) {
  res.json(res.locals.user.tabs);
});

router.post('/:mail/tabs', function(req, res, next) {
  User.addTab(req.body.name, res.locals.user, function(err, doc) {
    if(err) {
      console.log(err);
      res.sendStatus(500);
    };
    if(doc == null) {
      res.sendStatus(409);
    } else {
      res.json(doc.tabs.pop());
    }
  });
});

router.delete('/:mail/tabs/:tabName', function(req, res, next) {
  User.removeTab(req.params.tabName, res.locals.user, function(err, numAff) {
    if(err) console.log(err); res.json(numAff);
  });
});


// ################### NOTES ENDPOINTS ######################################

router.get('/:mail/notes', function(req, res, next) {
  res.json(res.locals.user.notes);
});

router.post('/:mail/notes', function(req, res, next) {
  User.addNote(req.body, res.locals.user, function(err, user) {
    if(err) console.log(err); res.json(user.notes[user.notes.length-1]);
  });
});

router.put('/:mail/notes', function(req, res, next) {
  User.editNote(req.body, res.locals.user, function(err, user) {
    if(err) console.log(err); res.json(user);
  });
});

router.delete('/:mail/notes/:noteId', function(req, res, next) {
  User.removeNote(req.params.noteId, res.locals.user, function(err, numAff) {
    if(err) console.log(err); res.sendStatus(200);
  });
});

// #############################################################


module.exports = router;
