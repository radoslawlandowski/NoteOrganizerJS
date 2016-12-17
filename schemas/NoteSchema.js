var mongoose = require('mongoose');

var NoteSchema = new mongoose.Schema({
  title: String,
  content: String,
  updated_at: { type: Date, default: Date.now },
  tab: String
});

module.exports = NoteSchema;
