const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
	name: { type: String, unique: true },
	manufacturer: String,
});

module.exports = mongoose.model('brand', brandSchema);
