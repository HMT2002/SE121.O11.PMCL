const express = require('express');
const defaultController = require('../controllers/defaultController');
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');

const router = express.Router();

//ROUTE HANDLER
router.route('/').get(reviewController.Get);
router.route('/').post(reviewController.Create);
router.route('/').put(reviewController.Update);
router.route('/').delete(reviewController.Delete);


module.exports = router;
