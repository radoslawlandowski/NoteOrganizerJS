var expect = require('chai').expect;
var mongoose = require('mongoose');
var config = require("../../../NoteOrganizer.config.json");
var Note = require('../../../models/Note.js');
mongoose.Promise = require('bluebird');

var notesSettings = config.Settings.Notes;
var titleMinLength = Number(notesSettings.titleMinLength);
var titleMaxLength = Number(notesSettings.titleMaxLength);
var contentMinLength = Number(notesSettings.contentMinLength);
var contentMaxLength = Number(notesSettings.contentMaxLength);

var maxLengthMessage = config.Messages.maxLengthMessage;
var minLengthMessage = config.Messages.minLengthMessage;

var defaultTabName = config.Settings.General.defaultTabName;

var emptyTitle, tooShortTitle, tooLongTitle, correctTitle;
var correctContent, tooLongContent;

before(function() {
  emptyTitle = generateString(0);
  tooShortTitle = generateString(titleMinLength - 1);
  correctTitle = generateString(titleMinLength + 1);
  tooLongTitle = generateString(titleMaxLength + 1);
  correctContent = generateString(contentMinLength + 1);
  tooLongContent = generateString(contentMaxLength + 1);

  expect(emptyTitle.length < titleMinLength).to.be.true;
  expect(tooShortTitle.length < titleMinLength).to.be.true;
  expect(correctTitle.length >= titleMinLength && correctTitle.length <= titleMaxLength).to.be.true;
  expect(tooLongTitle.length > titleMaxLength).to.be.true;
  expect(correctContent.length >= contentMinLength && correctContent.length <= contentMaxLength).to.be.true;
  expect(tooLongContent.length > contentMaxLength).to.be.true;
});

describe('Note', function() {
    it('1. Note should be invalid if no title object provided', function(done) {
        var n = new Note();

        var expectedPath = "title";
        var expectedMessage = "Path `" + expectedPath + "` is required.";
        var expectedKind = "required";
        var expectedValue = undefined;

        n.validate(function(err) {
            verifyError(err.errors.title,
                        expectedMessage,
                        expectedKind,
                        expectedPath,
                        expectedValue);
            done();
        });
    });

    it('2. Note should be invalid if title string is empty', function(done) {
        var n = new Note({title: emptyTitle});

        var expectedPath = "title";
        var expectedMessage = "Path `" + expectedPath + "` is required.";
        var expectedKind = "required";
        var expectedValue = emptyTitle;

        n.validate(function(err) {
          verifyError(err.errors.title,
                      expectedMessage,
                      expectedKind,
                      expectedPath,
                      expectedValue);
          done();
        });
    });

    it('3. Note should be invalid if title is too long', function(done) {
        var n = new Note({title: tooLongTitle});

        var expectedKind = "maxlength";
        var expectedPath = "title";
        var expectedValue = tooLongTitle;
        var expectedMessage = maxLengthMessage
                                .replace("{PATH}", expectedPath)
                                .replace("{VALUE}", expectedValue)
                                .replace("{MAXLENGTH}", titleMaxLength);

        n.validate(function(err) {
          verifyError(err.errors.title,
                      expectedMessage,
                      expectedKind,
                      expectedPath,
                      expectedValue);
          done();
        });
    });

    it('4. Note should be invalid if content is too long', function(done) {
        var n = new Note({title: correctTitle, content: tooLongContent});

        var expectedKind = "maxlength";
        var expectedPath = "content";
        var expectedValue = tooLongContent;
        var expectedMessage = maxLengthMessage
                                .replace("{PATH}", expectedPath)
                                .replace("{VALUE}", expectedValue)
                                .replace("{MAXLENGTH}", contentMaxLength);

        n.validate(function(err) {
          verifyError(err.errors.content,
                      expectedMessage,
                      expectedKind,
                      expectedPath,
                      expectedValue);
          done();
        });
    });

    /*Note should be vaild */

    it('5. Note should be valid if title is correct', function(done) {
        var n = new Note({title: correctTitle});

        n.validate(function(err) {
            expect(err).to.not.exist;
            done();
        });
    });

    it('6. Note should be valid if content is correct', function(done) {
        var n = new Note({title: correctTitle, content:correctContent});

        n.validate(function(err) {
            expect(err).to.not.exist;
            done();
        });
    });

    it('7. Note should have the correct default tab set', function(done) {
        var n = new Note({title: correctTitle, content: correctContent});

        expect(n.tab).to.equal(defaultTabName);
        done();
    });

    it('8. Note should have the date automatically set', function(done) {
        var n = new Note({title: correctTitle, content: correctContent});

        expect(n.date).to.be.defined;
        done();
    })
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
