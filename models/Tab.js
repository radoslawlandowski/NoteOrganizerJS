var mongoose = require('mongoose');
var TabSchema = require('../schemas/TabSchema.js')

module.exports = mongoose.model('Tab', TabSchema);
