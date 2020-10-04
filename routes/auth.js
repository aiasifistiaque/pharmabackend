const { User } = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const _ = require('lodash');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const router = express.Router();

const jwtPrivateKey = 'akjsdhahjdasfhajdfhasdf12312';

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('email id does not exist');

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) res.status(400).send('wrong password');

  const token = user.generateAuthToken();
  res.status(200).send(token);
});

function validate(user) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });
  return schema.validate(user);
}

module.exports = router;
