var mongoose = require('mongoose');
var NoteSchema = require('./NoteSchema.js');
var config = require("../NoteOrganizer.config.json");

var tabsSettings = config.Settings.Tabs;
var tabNameMinLength = Number(tabsSettings.tabNameMinLength);
var tabNameMaxLength = Number(tabsSettings.tabNameMaxLength);

var minLengthMessage = config.Messages.minLengthMessage;
var maxLengthMessage = config.Messages.maxLengthMessage;

var TabSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [tabNameMinLength, minLengthMessage],
    maxlength: [tabNameMaxLength, maxLengthMessage],
    required: true
  }
});

module.exports = TabSchema;
