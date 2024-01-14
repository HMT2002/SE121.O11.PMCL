const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

//ROUTE HANDLER
router.route('/check-token').get(authController.protect);

module.exports = router;
