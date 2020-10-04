const { User, validate } = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const _ = require('lodash');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/', auth, async (req, res) => {
	const user = await User.findById(req.user._id);
	res.status(200).send(_.pick(user, ['_id', 'name', 'email']));
});

module.exports = router;
