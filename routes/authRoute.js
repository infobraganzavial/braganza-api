const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { verifySignUp } = require('../middleware');

router.post('/signup', [ verifySignUp.checkDuplicateUsernameOrEmail ], authController.signup);
router.post('/signin', authController.signin);
router.put('/confirm-email/:token', authController.confirmEmail);
router.post('/forgot-password', authController.forgotPassword);
router.put('/reset-password/:token', authController.resetPassword);
module.exports = router;