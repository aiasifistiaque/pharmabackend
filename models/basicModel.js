const mongoose = require('mongoose');

const basicSchema = new mongoose.Schema({
  name: String,
});

module.exports = mongoose.model('basicModel', basicSchema);
