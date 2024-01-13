const express = require('express');
const defaultController = require('../controllers/defaultController');
const authController = require('../controllers/authController');
const loggerAPI = require('../modules/loggerAPI');

const router = express.Router();

//ROUTE HANDLER
router.route('/').get(defaultController.Default);
router.route('/change-password').patch(authController.ChangePassword);

router.route('/forget-password').post(authController.ForgetPassword);
router.route('/reset-password/:token').patch(authController.ResetPassword);
router.route('/logs').get(loggerAPI.GetAllLog);

module.exports = router;
