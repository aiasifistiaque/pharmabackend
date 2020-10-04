const Drug = require('../models/drugModel');
const Generic = require('../models/genericModel');
const Brand = require('../models/brandModel');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
	const page = req.body.page ? req.body.page : 0;
	const pageLimit = 20;
	const drugs = await Drug.find()
		.limit(pageLimit)
		.skip(page * pageLimit);
	res.status(200).json(drugs);
});

router.post('/findgeneric', async (req, res) => {
	console.log(req.body);
	const drugs = await Drug.findOne({ brandName: req.body.brandName });
	res.status(200).json(drugs);
});

router.post('/', async (req, res) => {
	const drugs = await Drug.find({ genericName: req.body.genericName });
	res.status(200).json(drugs);
});

router.get('/manufacturers', async (req, res) => {
	const drugs = await Drug.find().distinct('nameOfManufacturer');
	res.status(200).json(drugs);
});

router.get('/brands', async (req, res) => {
	const drugs = await Drug.find().distinct('brandName');
	res.status(200).json(drugs);
});

router.get('/generic', async (req, res) => {
	const drugs = await Drug.find().distinct('genericName');
	res.status(200).json(drugs);
});

router.post('/searchbygenericname', async (req, res) => {
	const page = req.body.page ? req.body.page : 0;
	const pageLimit = 20;
	const drugs = await Drug.find()
		.where({ genericName: req.body.generic })
		.limit(pageLimit)
		.skip(page * pageLimit);
	res.status(200).json(drugs);
});

router.post('/searchbycompany', async (req, res) => {
	const page = req.body.page ? req.body.page : 0;
	const pageLimit = 20;
	const drugs = await Drug.find()
		.where({ nameOfManufacturer: req.body.company })
		.limit(pageLimit)
		.skip(page * pageLimit);
	res.status(200).json(drugs);
});

router.post('/searchnamebyalphabet', async (req, res) => {
	const page = req.body.page ? req.body.page : 0;
	const pageLimit = 20;
	const drugs = await Drug.find()
		.where({ brandName: { $regex: '^' + req.body.alphabet, $options: 'i' } })
		.limit(pageLimit)
		.skip(page * pageLimit);
	res.status(200).json(drugs);
});

/**returns
 * an array of the
 * generic name results
 * by alphabet */
router.post('/searchgenericbyalphabet', async (req, res) => {
	const page = req.body.page ? req.body.page : 0;
	const pageLimit = 20;
	const drugs = await Drug.find()
		.where({ genericName: { $regex: '^' + req.body.alphabet, $options: 'i' } })
		.limit(pageLimit)
		.skip(page * pageLimit);
	res.status(200).json(drugs);
});

/**returns the total number of brands */
router.get('/total', async (req, res) => {
	const drugs = await Drug.count();
	res.status(200).json(drugs);
});

/**search result
 * method: post
 * return an array
 * of generic
 * @param searchString
 * and brandname */
router.post('/search', async (req, res) => {
	let result;
	if (req.body.searchString.length < 1)
		res.status(200).json({ generic: [], brands: [] });
	if (req.body.searchString.length > 4) {
		const generic = await Generic.find()
			.where({
				name: { $regex: req.body.searchString, $options: 'i' },
			})
			.limit(5);
		const drugs = await Brand.find()
			.where({
				name: { $regex: req.body.searchString, $options: 'i' },
			})
			.limit(10);
		result = { generic: generic, brands: drugs };
	} else {
		const drugs = await Brand.find()
			.where({ name: { $regex: req.body.searchString, $options: 'i' } })
			.limit(10);
		result = { generic: [], brands: drugs };
	}
	res.status(200).json(result);
});

module.exports = router;
