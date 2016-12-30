var expect = require('chai').expect;
var mongoose = require('mongoose');
sinon = require('sinon');
var config = require("../../../NoteOrganizer.config.json");
var Tab = require('../../../models/Tab.js');
var Note = require('../../../models/Note.js');
var User = require('../../../models/User.js');
var TestHelper = require('../../TestHelper.js');
mongoose.Promise = require('bluebird');

var tabsSettings = config.Settings.Tabs;
var tabNameMinLength = Number(tabsSettings.tabNameMinLength);
var tabNameMaxLength = Number(tabsSettings.tabNameMaxLength);

var generalSettings = config.Settings.General;
var maximumNotesNumber = Number(generalSettings.maximumNotesNumber);
var maxNoteNumberMessage = config.Messages.maxNoteNumberMessage;
maxNoteNumberMessage = maxNoteNumberMessage.replace("{VALUE}", maximumNotesNumber);

var maxLengthMessage = config.Messages.maxLengthMessage;
var minLengthMessage = config.Messages.minLengthMessage;

var emptyName, tooShortName, tooLongName, correctName;
var validMail = "valid@mail.com";
var validPassword = "validpassword";

before(function() {
  emptyName = generateString(0);
  tooShortName = generateString(tabNameMinLength - 1);
  tooLongName = generateString(tabNameMaxLength + 1);
  correctName = generateString(tabNameMinLength + 1);

  expect(emptyName.length < tabNameMinLength).to.be.true;
  expect(tooShortName.length < tabNameMinLength).to.be.true;
  expect(tooLongName.length > tabNameMaxLength).to.be.true;
  expect(correctName.length >= tabNameMinLength && correctName.length <= tabNameMaxLength).to.be.true;
});

describe('User', function() {
  it('1. User should be invalid if required fields are missing', function(done) {
    var u = new User({});

    u.validate(function(err) {
      expect(err).to.exist;
      done();
    });
  });

  it('2. User should be valid if required fields are provided', function(done) {
    var u = new User({mail: validMail, password: validPassword});

    u.validate(function(err) {
      expect(err).to.not.exist;
      done();
    });
  });

  it('3. User should be invalid if maximum number of notes is exceeded', function(done) {
    var tooManyNotes = [];
    for(var i = 0 ; i <= maximumNotesNumber + 1 ; i++) {
      tooManyNotes.push(TestHelper.getValidNote());
    };
    var u = new User({mail: validMail, password: validPassword, notes: tooManyNotes});

    u.validate(function(err) {
      expect(err).to.exist;
      done();
    });
  });

  it('4. User should be valid if maximum number of notes is not exceeded', function(done) {
    var notTooManyNotes = [];
    for(var i = 0 ; i < maximumNotesNumber ; i++) {
      notTooManyNotes.push(TestHelper.getValidNote());
    };
    var u = new User({mail: validMail, password: validPassword, notes: notTooManyNotes});

    u.validate(function(err) {
      expect(err).to.not.exist;
      done();
    });
  });
});

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
