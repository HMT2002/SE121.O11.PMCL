const express = require('express');
const defaultController = require('../controllers/defaultController');
const contentController = require('../controllers/contentController');
const authController = require('../controllers/authController');

const router = express.Router();

//ROUTE HANDLER
router.route('/').get(contentController.Get).post(authController.protect, authController.restrictTo('admin', 'chairman', 'instructor'),contentController.Create);
router.route('/');
router.route('/:id').put(contentController.Update);
router.route('/:id').delete(contentController.Delete);


module.exports = router;
