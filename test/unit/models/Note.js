var expect = require('chai').expect;
var mongoose = require('mongoose');
var config = require("../../../NoteOrganizer.config.json");

var notesSettings = config.Settings.Notes;
var titleMinLength = notesSettings.titleMinLength;
var titleMaxLength = notesSettings.titleMaxLength;
var contentMinLength = notesSettings.contentMinLength;
var contentMaxLength = notesSettings.contentMaxLength;

var Note = require('../../../models/Note.js');

mongoose.Promise = require('bluebird');

/*
{ [ValidatorError: Path `title` is required.]
       message: 'Path `title` is required.',
       name: 'ValidatorError',
       properties: [Object],
       kind: 'required',
       path: 'title',
       value: undefined }
       */

describe('Note', function() {
    it('should be invalid if no title object provided', function(done) {
        var n = new Note();

        n.validate(function(err) {
            expect(err == null).to.be.false;

            var te = err.errors.title; //te = titleError
            expect(te).to.exist;
            expect(te.message).to.equal("Path `title` is required.");
            expect(te.kind).to.equal("required");
            expect(te.path).to.equal("title");
            expect(te.value).to.equal(undefined);
            done();
        });
    });

    it('should be invalid if title string is empty', function(done) {
        var title = "";
        expect(title.length < titleMinLength).to.be.true;
        var n = new Note({title: title});

        n.validate(function(err) {
            expect(err == null).to.be.false;

            var te = err.errors.title; //te = titleError
            expect(te).to.exist;
            expect(te.message).to.equal("Path `title` is required.");
            expect(te.kind).to.equal("required");
            expect(te.path).to.equal("title");
            expect(te.value).to.equal(title);
            done();
        });
    });

    it('should be valid if title is correct', function(done) {
        var title = "validTitle";
        expect(title.length >= titleMinLength).to.be.true;
        expect(title.length <= titleMaxLength).to.be.true;
        var n = new Note({title: title});

        n.validate(function(err) {
            expect(err).to.not.exist;
            done();
        });
    });

    it('should be invalid if title is too long', function(done) {
        var tooLongTitle = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
          + "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
          + "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
          + "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";

        expect(tooLongTitle.length > titleMaxLength).to.be.true;

        var n = new Note({title: tooLongTitle});

        n.validate(function(err) {
            expect(err.errors.title).to.exist;
            done();
        });
    });

});
