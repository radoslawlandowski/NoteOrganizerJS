var mongoose = require('mongoose');

var NoteSchema = new mongoose.Schema({
  title: {type: String, minLength: 1, required: true},
  content: String,
  updated_at: { type: Date, default: Date.now },
  tab: {type: String, minLength: 1, required: true}
});

module.exports = NoteSchema;
