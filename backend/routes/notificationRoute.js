const express = require('express');
const userController = require('../controllers/userController.js');
const authController = require('../controllers/authController.js');
const { uploadImage } = require('../modules/multerAPI.js');
const notificationController = require('../controllers/notificationController.js');

const router = express.Router();
//ROUTE HANDLER
router
  .route('/')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'chairman', 'instructor'),
    notificationController.GetUserLimitNotification
  );
router
  .route('/set-seen')
  .post(
    authController.protect,
    authController.restrictTo('admin', 'chairman', 'instructor'),
    notificationController.SetNotifiesViewed
  );
module.exports = router;
