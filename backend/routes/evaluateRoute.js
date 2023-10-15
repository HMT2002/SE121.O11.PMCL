const express = require('express');
const defaultController = require('../controllers/defaultController');
const evaluateController = require('../controllers/evaluateController');
const authController = require('../controllers/authController');

const router = express.Router();

//ROUTE HANDLER
router.route('/').get(evaluateController.Get);
router.route('/').post(evaluateController.Create);
router.route('/').put(evaluateController.Update);
router.route('/').delete(evaluateController.Delete);


module.exports = router;
