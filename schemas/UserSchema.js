var mongoose = require('mongoose');
var TabSchema = require('./TabSchema.js');
var config = require("../NoteOrganizer.config.json");

var generalSettings = config.Settings.General;
var maximumTabsNumber = generalSettings.maximumTabsNumber;

var UserSchema = new mongoose.Schema({
  mail: {type: String, unique: true, minLength: 1, required: true},
  password: {type: String, minLength: 1, required: true},
  tabs: {
    type: [TabSchema],
    validate: {
      validator: function(t) {
        return t.length <= maximumTabsNumber;
      },
      message: "You cannot have more than " + maximumTabsNumber + " tabs!"
    }
  }
});

UserSchema.index({ mail: 1, tabs: 1}, { unique: true });

module.exports = UserSchema;
