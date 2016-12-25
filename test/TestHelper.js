var TestUsers = require('../data/TestUsers');
var User = require('../models/User');

var logPrefix = "### TEST HELPER ###";
var logSuffix = "###################";

function log(message) {
  console.log(logPrefix + '\n' + message + '\n' + logSuffix);
};

var populateCollection = function() {
  TestUsers.completeUser.save(function (err) {
    if (err) log(err);
  });

  TestUsers.noNotesUser.save(function (err) {
    if (err) log(err);
  });

  TestUsers.noTabsAndNotesUser.save(function (err) {
    if (err) log(err);
  });
};

var clearCollection = function() {
  User.remove({}, function(err, removed) {
    log("Documents have been removed: " + removed);
  });
};

module.exports.populateCollection = populateCollection;
module.exports.clearCollection = clearCollection;
