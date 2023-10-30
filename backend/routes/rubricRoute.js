const express = require('express');
const defaultController = require('../controllers/defaultController');
const rubricController = require('../controllers/rubricController');
const authController = require('../controllers/authController');

const router = express.Router();

//ROUTE HANDLER
router.route('/').get(rubricController.Get).post(authController.protect, authController.restrictTo('admin', 'chairman', 'instructor'),rubricController.Create);
router.route('/:id').patch(rubricController.Update).delete(rubricController.Delete);


module.exports = router;
