const express = require('express');
const defaultController = require('../controllers/defaultController');
const evaluateController = require('../controllers/evaluateController');
const authController = require('../controllers/authController');

const router = express.Router();

//ROUTE HANDLER
router.route('/').get(evaluateController.Get).post(authController.protect, authController.restrictTo('admin', 'chairman', 'instructor'),evaluateController.Create);
router.route('/:id').put(evaluateController.Update).delete(evaluateController.Delete);


module.exports = router;
