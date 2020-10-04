const Drug = require('../models/drugModel');
const Generic = require('../models/genericModel');
const Brand = require('../models/brandModel');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
	const id = req.body.id;
	const password = req.body.password;
	console.log('matched');
	const generic = await Drug.find().distinct('genericName');
	generic.map((name, i) => Generic.create({ name: name }));
	const brand = await Drug.find().distinct('brandName');
	brand.map((name, i) => Brand.create({ name: name }));
	res.send('success');
});

router.post('/brand', async (req, res) => {
	console.log('brand insertion initiated');
	const brand = await Drug.find().distinct('brandName');
	let itemArray = [];
	brand.map((item, i) => {
		const newItem = { name: item };
		itemArray.push(newItem);
	});
	try {
		const result = await Brand.insertMany(itemArray);
	} catch (err) {
		res.status(500).send(err);
	}
	res.status(200).send('success');
});

module.exports = router;
