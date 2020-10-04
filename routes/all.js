const Generic = require('../models/genericModel');
const Brand = require('../models/brandModel');
const express = require('express');
const router = express.Router();

router.get('/brand', async (req, res) => {
	const brands = await Brand.find();
	res.status(200).json(brands);
});

router.get('/generic', async (req, res) => {
	const generic = await Generic.find();
	res.status(200).json(generic);
});

module.exports = router;
