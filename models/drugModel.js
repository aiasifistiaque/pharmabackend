const mongoose = require('mongoose');

const drugSchema = new mongoose.Schema({
	brandName: String,
	genericName: String,
	nameOfManufacturer: String,
	strength: String,
	dosageDescription: String,
	price: String,
	useFor: String,
	DAR: String,
});

module.exports = mongoose.model('drug', drugSchema);
