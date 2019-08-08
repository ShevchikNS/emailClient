const express = require('express');

const router = express.Router();
const auth = require('./auth');
const email = require('./email');
const profile = require('./profile');
const app = require('./app');

router.use('/', auth);
router.use('/dashboard', app);
router.use('/email', email);
router.use('/profile', profile);

module.exports = router;
