var mongoose = require('mongoose');
var config = require("../NoteOrganizer.config.json");

var notesSettings = config.Settings.Notes;
var titleMinLength = notesSettings.titleMinLength;
var titleMaxLength = notesSettings.titleMaxLength;
var contentMinLength = notesSettings.contentMinLength;
var contentMaxLength = notesSettings.contentMaxLength;

var minLengthMessage = config.Messages.minLengthMessage;
var maxLengthMessage = config.Messages.maxLengthMessage;

var NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: [titleMinLength, minLengthMessage],
    maxlength: [titleMaxLength, maxLengthMessage],
    required: true
  },
  content: {
    type: String,
    maxlength: [contentMaxLength, maxLengthMessage],
    required: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = NoteSchema;
