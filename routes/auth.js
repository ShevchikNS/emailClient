const passport = require('passport');
const router = require('express').Router();

const authController = require('../controllers/authcontroller.js');

router.get('/signup', authController.signup);
router.get('/signin', authController.signin);
router.post(
  '/signup',
  passport.authenticate('local-signup', {
    successRedirect: '/dashboard',
    failureRedirect: '/signup',
  }),
);

router.get('/logout', authController.logout);
router.post(
  '/signin',
  passport.authenticate('local-signin', {
    successRedirect: '/dashboard',
    failureRedirect: '/signin',
  }),
);

module.exports = router;
