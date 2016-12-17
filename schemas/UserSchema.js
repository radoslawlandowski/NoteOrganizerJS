var mongoose = require('mongoose');
var NoteSchema = require('./NoteSchema.js');

var UserSchema = new mongoose.Schema({
  mail: {type: String, unique: true},
  password: String,
  tabs: [String],
  notes: [NoteSchema]
});

module.exports = UserSchema;
