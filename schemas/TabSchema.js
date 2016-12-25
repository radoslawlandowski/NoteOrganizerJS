var mongoose = require('mongoose');

var TabSchema = new mongoose.Schema({
  name: {type: String, minLength: 1, required: true}
});

module.exports = TabSchema;
