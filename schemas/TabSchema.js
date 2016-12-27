var mongoose = require('mongoose');
var NoteSchema = require('./NoteSchema.js');
var config = require("../NoteOrganizer.config.json");

var tabsSettings = config.Settings.Tabs;
var tabNameMinLength = tabsSettings.tabNameMinLength;
var tabNameMaxLength = tabsSettings.tabNameMaxLength;

var generalSettings = config.Settings.General;
var maximumNotesNumber = generalSettings.maximumNotesNumber;

var TabSchema = new mongoose.Schema({
  name: {type: String, minLength: tabNameMinLength, maxLength: tabNameMaxLength, required: true},
  notes: {
    type: [NoteSchema],
    validate: {
      validator: function(n) {
        return n.length <= maximumNotesNumber;
      },
      message: "You cannot have more than " + maximumNotesNumber + " notes!"
    }
  }
});

module.exports = TabSchema;
