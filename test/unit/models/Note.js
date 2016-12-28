var expect = require('chai').expect;
var mongoose = require('mongoose');
var config = require("../../../NoteOrganizer.config.json");
var Note = require('../../../models/Note.js');
mongoose.Promise = require('bluebird');

var notesSettings = config.Settings.Notes;
var titleMinLength = notesSettings.titleMinLength;
var titleMaxLength = notesSettings.titleMaxLength;
var contentMinLength = notesSettings.contentMinLength;
var contentMaxLength = notesSettings.contentMaxLength;

var maxLengthMessage = config.Messages.maxLengthMessage;
var minLengthMessage = config.Messages.minLengthMessage;

var emptyTitle, tooShortTitle, tooLongTitle, correctTitle;
var correctContent, tooLongContent;

var justChar = 'a';

before(function() {
  emptyTitle = generateString(0, justChar);
  tooShortTitle = generateString(titleMinLength - 1, justChar);
  correctTitle = generateString(titleMinLength + 1, justChar);
  tooLongTitle = generateString(titleMaxLength + 1, justChar);
  correctContent = generateString(contentMinLength + 1, justChar);
  tooLongContent = generateString(contentMaxLength + 1, justChar);

  expect(emptyTitle.length < titleMinLength).to.be.true;
  expect(tooShortTitle.length < titleMinLength).to.be.true;
  expect(correctTitle.length >= titleMinLength && correctTitle.length <= titleMaxLength).to.be.true;
  expect(tooLongTitle.length > titleMaxLength).to.be.true;
  expect(correctContent.length >= contentMinLength && correctContent.length <= contentMaxLength).to.be.true;
  expect(tooLongContent.length > contentMaxLength).to.be.true;
});

describe('Note', function() {
    it('should be invalid if no title object provided', function(done) {
        var n = new Note();

        var expectedMessage = "Path `title` is required.";
        var expectedKind = "required";
        var expectedPath = "title";
        var expectedValue = undefined;

        n.validate(function(err) {
            verifyNoteErrorProperties(err.errors.title,
                                        expectedMessage,
                                        expectedKind,
                                        expectedPath,
                                        expectedValue);
            done();
        });
    });

    it('should be invalid if undefined title object provided', function(done) {
        var n = new Note({title: undefined});

        var expectedMessage = "Path `title` is required.";
        var expectedKind = "required";
        var expectedPath = "title";
        var expectedValue = undefined;

        n.validate(function(err) {
          verifyNoteErrorProperties(err.errors.title,
                                      expectedMessage,
                                      expectedKind,
                                      expectedPath,
                                      expectedValue);
          done();
        });
    });

    it('should be invalid if title string is empty', function(done) {
        var n = new Note({title: emptyTitle});

        var expectedMessage = "Path `title` is required.";
        var expectedKind = "required";
        var expectedPath = "title";
        var expectedValue = emptyTitle;

        n.validate(function(err) {
          verifyNoteErrorProperties(err.errors.title,
                                      expectedMessage,
                                      expectedKind,
                                      expectedPath,
                                      expectedValue);
          done();
        });
    });

    it('should be invalid if title is too long', function(done) {
        var n = new Note({title: tooLongTitle});

        var expectedKind = "maxlength";
        var expectedPath = "title";
        var expectedValue = tooLongTitle;
        var expectedMessage = maxLengthMessage
                                .replace("{PATH}", expectedPath)
                                .replace("{VALUE}", expectedValue)
                                .replace("{MAXLENGTH}", titleMaxLength);

        n.validate(function(err) {
          verifyNoteErrorProperties(err.errors.title,
                                      expectedMessage,
                                      expectedKind,
                                      expectedPath,
                                      expectedValue);
          done();
        });
    });

    it('should be invalid if content is too long', function(done) {
        var n = new Note({title: correctTitle, content: tooLongContent});

        var expectedKind = "maxlength";
        var expectedPath = "content";
        var expectedValue = tooLongContent;
        var expectedMessage = maxLengthMessage
                                .replace("{PATH}", expectedPath)
                                .replace("{VALUE}", expectedValue)
                                .replace("{MAXLENGTH}", contentMaxLength);

        n.validate(function(err) {
          verifyNoteErrorProperties(err.errors.content,
                                      expectedMessage,
                                      expectedKind,
                                      expectedPath,
                                      expectedValue);
          done();
        });
    });

    /*Note should be vaild */

    it('should be valid if title is correct', function(done) {
        var n = new Note({title: correctTitle});

        n.validate(function(err) {
            expect(err).to.not.exist;
            done();
        });
    });

    it('should be valid if content is correct', function(done) {
        var n = new Note({title: correctTitle, content:correctContent});

        n.validate(function(err) {
            expect(err).to.not.exist;
            done();
        });
    });

});

function verifyNoteErrorProperties(e, message, kind, path, value) {
  expect(e).to.exist;
  expect(e.message).to.equal(message);
  expect(e.kind).to.equal(kind);
  expect(e.path).to.equal(path);
  expect(e.value).to.equal(value);
};

function generateString(count, ch) {
    var txt = "";
    for (var i = 0; i < count; i++) {
        txt += ch;
    }
    return txt;
};
