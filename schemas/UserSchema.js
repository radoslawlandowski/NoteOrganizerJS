var mongoose = require('mongoose');
var NoteSchema = require('./NoteSchema.js');
var TabSchema = require('./TabSchema.js');

var UserSchema = new mongoose.Schema({
  mail: {type: String, unique: true, minLength: 1, required: true},
  password: {type: String, minLength: 1, required: true},
  tabs: [TabSchema],
  notes: [NoteSchema]
});

UserSchema.index({ mail: 1, tabs: 1}, { unique: true });

module.exports = UserSchema;
