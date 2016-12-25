var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var User = require("../models/User.js");

router.get('/', function(req, res, next) {
  res.json(res.local.user.tabs);
});

module.exports = router;
