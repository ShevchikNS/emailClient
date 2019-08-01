const express = require('express');
const profile = require('../../controllers/profile');

const router = express.Router();

router.get('/addProfile', profile.showProfileAddPage);
router.post('/addProfile', profile.addProfile);

module.exports = router;
