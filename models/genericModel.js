const mongoose = require('mongoose');

const genericSchema = new mongoose.Schema({
	name: { type: String, unique: true },
});

module.exports = mongoose.model('generic', genericSchema);
