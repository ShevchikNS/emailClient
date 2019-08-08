const express = require('express');
const email = require('../controllers/email');
const authMiddlewares = require('../middlewares/auth');

const router = express.Router();

router.get('/', authMiddlewares.isLoggedIn, email.showEmailAddPage);
router.post('/', authMiddlewares.isLoggedIn, email.addEmail);

module.exports = router;
