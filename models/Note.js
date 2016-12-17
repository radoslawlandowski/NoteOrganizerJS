var mongoose = require('mongoose');
var NoteSchema = require('../schemas/NoteSchema.js')

module.exports = mongoose.model('Note', NoteSchema);
