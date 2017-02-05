var mongoose = require('mongoose');
var TabSchema = require('./TabSchema.js');
var NoteSchema = require('./NoteSchema.js');
var config = require("../NoteOrganizer.config.json");

var maximumTabsNumber = Number(config.Settings.General.maximumTabsNumber);
var maximumNotesNumber = Number(config.Settings.General.maximumNotesNumber);
var tabNameMinLength = Number(config.Settings.Tabs.tabNameMinLength);
var tabNameMaxLength = Number(config.Settings.Tabs.tabNameMaxLength);

var maxTabNumberMessage = config.Messages.maxTabNumberMessage.replace("{VALUE}", maximumTabsNumber);
var maxNoteNumberMessage = config.Messages.maxNoteNumberMessage.replace("{VALUE}", maximumNotesNumber);

var minLengthMessage = config.Messages.minLengthMessage;
var maxLengthMessage = config.Messages.maxLengthMessage;
var defaultTabName = config.Settings.General.defaultTabName;

var UserSchema = new mongoose.Schema({
  mail: { type: String, unique: true, minlength: 1, required: true },
  password: { type: String, minlength: 1, required: true },
  tabs: {
    type: [{
      type: String,
      minlength: [tabNameMinLength, minLengthMessage],
      maxlength: [tabNameMaxLength, maxLengthMessage],
    }],
    validate: {
      validator: function(t) {
        return t.length <= maximumTabsNumber;
      },
      message: maxTabNumberMessage
    }
  },
  notes: {
    type: [NoteSchema],
    validate: {
      validator: function(n) {
        return n.length <= maximumNotesNumber;
      },
      message: maxNoteNumberMessage
    }
  }
});

UserSchema.pre("save", function(next) {
  if (this.tabs.length == 0)
    this.tabs.push(defaultTabName);
  next();
});

UserSchema.index({ mail: 1, 'tabs': 1}, { unique: true });

UserSchema.statics.addTab = function (tab, user, callback) {
  return this.update({'mail': user.mail}, {$addToSet: {'tabs': tab}}, {new: true}, callback);
};

UserSchema.statics.removeTab = function(tab, user, callback) {
  return this.update({'mail': user.mail}, {$pull: {'tabs': tab}}, callback);
}

UserSchema.statics.addNote = function (note, user, callback) {
  return this.findOneAndUpdate({'mail': user.mail, 'tabs': {$in: [note.tab]} }, {$addToSet: {'notes': note}},  {new: true, runValidators: true}, callback);
}

UserSchema.statics.editNote = function (editedNote, user, callback) {
  editedNote.date = Date.now();
  return this.findOneAndUpdate({'mail': user.mail, 'notes._id': editedNote._id },
    {$set: {'notes.$': editedNote}}, {new: true, runValidators: true}, callback);
}

UserSchema.statics.removeNote = function(noteId, user, callback) {
  return this.update({'mail': user.mail}, {$pull: {'notes': {_id: noteId}}}, callback);
}

module.exports = UserSchema;
