var mongoose = require('mongoose');
var UserSchema = require('../schemas/UserSchema.js');

module.exports = mongoose.model('User', UserSchema);
