var mongoose = require('mongoose');
var config = require("../NoteOrganizer.config.json");

var notesSettings = config.Settings.Notes;
var titleMinLength = Number(notesSettings.titleMinLength);
var titleMaxLength = Number(notesSettings.titleMaxLength);
var contentMinLength = Number(notesSettings.contentMinLength);
var contentMaxLength = Number(notesSettings.contentMaxLength);

var minLengthMessage = config.Messages.minLengthMessage;
var maxLengthMessage = config.Messages.maxLengthMessage;
var defaultTabName = config.Settings.General.defaultTabName;

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
  },
  tab: {
    type: String,
    required: true,
    default: defaultTabName
  }
});

module.exports = NoteSchema;
