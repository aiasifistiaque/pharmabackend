const express = require('express');
const auth = require('../middleware/auth');
const admin = require('../middleware/role');
const router = express.Router();
const Basic = require('../models/basicModel');

router.get('/', (req, res) => {
  res.send('hello world');
});

router.get('/about', [auth, admin], (req, res) => {
  res.send('about world');
});

module.exports = router;
