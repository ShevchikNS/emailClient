const express = require('express');
const email = require('../controllers/email');

const router = express.Router();

router.get('/addEmail', email.showEmailAddPage);
router.post('/addEmail', email.addEmail);

module.exports = router;
