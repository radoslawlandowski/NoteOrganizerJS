var TestUsers = require('../data/TestUsers');
var User = require('../models/User');
var Note = require('../models/Note');
var config = require("../NoteOrganizer.config.json");

var logPrefix = "### TEST HELPER ###";
var logSuffix = "###################";

var notesSettings = config.Settings.Notes;
var titleMinLength = Number(notesSettings.titleMinLength);
var titleMaxLength = Number(notesSettings.titleMaxLength);
var contentMinLength = Number(notesSettings.contentMinLength);
var contentMaxLength = Number(notesSettings.contentMaxLength);

var tabNameMaxLength = Number(config.Settings.Tabs.tabNameMaxLength);

var maxLengthMessage = config.Messages.maxLengthMessage;
var minLengthMessage = config.Messages.minLengthMessage;

var defaultTabName = config.Settings.General.defaultTabName;

var emptyTitle, tooShortTitle, tooLongTitle, correctTitle;
var correctContent, tooLongContent;

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

var getValidNote = function() {
  var correctTitle = generateString(titleMinLength + 1);
  var correctContent = generateString(contentMinLength + 1);

  return new Note({title: correctTitle, content: correctContent, tab: "one"});
};

var getValidUser = function() {
  var validNote = getValidNote();
  var validMail = "valid@mail.com";
  var validPassword = "validPassword";
  return new User({mail: validMail, password: validPassword, notes: [validNote]});
};

var getValidTab = function() {
  return generateString(tabNameMaxLength - 3);
};

function verifyError(e, message, kind, path, value) {
  expect(e).to.exist;
  expect(e.message).to.equal(message);
  expect(e.kind).to.equal(kind);
  expect(e.path).to.equal(path);
  expect(e.value).to.equal(value);
};

function generateString(count) {
    var justChar = 'a';
    var txt = "";
    for (var i = 0; i < count; i++) {
        txt += justChar;
    }
    return txt;
};

module.exports.populateCollection = populateCollection;
module.exports.clearCollection = clearCollection;
module.exports.getValidNote = getValidNote;
module.exports.getValidTab = getValidTab;
