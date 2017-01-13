var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

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
    } else {
      if(doc.nModified === 0) {
        res.sendStatus(409);
      } else {
        res.json(req.body.name);
      };
    }
  });
});

router.delete('/:mail/tabs/:tabName', function(req, res, next) {
  User.removeTab(req.params.tabName, res.locals.user, function(err, numAff) {
    res.sendStatus(handleDeletion(err, numAff.nModified));
  });
});


// ################### NOTES ENDPOINTS ######################################

router.get('/:mail/notes', function(req, res, next) {
  res.json(res.locals.user.notes);
});

router.post('/:mail/notes', function(req, res, next) {
  User.addNote(req.body, res.locals.user, function(err, user) {
    if(err) {
      console.log(err);
      res.sendStatus(409);
    } else {
      if(user != null || user != undefined) {
        res.json(user.notes[user.notes.length-1]);
      } else {
        res.sendStatus(409);
      }
    }
  });
});

router.put('/:mail/notes', function(req, res, next) {
  User.editNote(req.body, res.locals.user, function(err, user) {
    if(err) {
      console.log(err);
      res.send(err);
    } else {
      if(user != null || user != undefined) {
        res.json(user.notes.id(req.body._id));
      } else {
        res.sendStatus(409);
      }
    }
  });
});

router.delete('/:mail/notes/:noteId', function(req, res, next) {
  User.removeNote(req.params.noteId, res.locals.user, function(err, numAff) {
    res.sendStatus(handleDeletion(err, numAff.nModified));
  });
});

// #############################################################

function handleDeletion(err, nModified) {
  if(err) {
    console.log(err);
    return 500;
  } else {
    if(nModified === 1) {
      return 200;
    } else {
      return 409;
    };
  };
}

module.exports = router;
