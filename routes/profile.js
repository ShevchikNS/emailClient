const express = require('express');
const profile = require('../controllers/profile');
const authMiddlewares = require('../middlewares/auth');

const router = express.Router();

router.get('/', authMiddlewares.isLoggedIn, profile.showProfileAddPage);
router.post('/', authMiddlewares.isLoggedIn, profile.addProfile);

module.exports = router;
