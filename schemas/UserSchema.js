var mongoose = require('mongoose');
var NoteSchema = require('./NoteSchema.js');

var UserSchema = new mongoose.Schema({
  mail: {type: String, unique: true, minLength: 1, required: true},
  password: {type: String, unique: true, minLength: 1, required: true},
  tabs: [{type:String, minLength: 1}],
  notes: [NoteSchema]
});

module.exports = UserSchema;
