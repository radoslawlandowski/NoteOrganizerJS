var mongoose = require('mongoose');
var config = require("../NoteOrganizer.config.json");

var notesSettings = config.Settings.Notes;
var titleMinLength = notesSettings.titleMinLength;
var titleMaxLength = notesSettings.titleMaxLength;
var contentMinLength = notesSettings.contentMinLength;
var contentMaxLength = notesSettings.contentMaxLength;

var NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: titleMinLength,
    maxlength: titleMaxLength,
    required: true
  },
  content: {
    type: String,
    minlength: contentMinLength,
    maxlength: contentMaxLength,
    required: false
  },
  date: {
    type: Date, 
    default: Date.now
  }
});

module.exports = NoteSchema;
