const express = require('express');
const defaultController = require('../controllers/defaultController');
const outputController = require('../controllers/outputController');
const authController = require('../controllers/authController');

const router = express.Router();

//ROUTE HANDLER
router.route('/').get(outputController.Get);
router.route('/').post(outputController.Create);
router.route('/').put(outputController.Update);
router.route('/').delete(outputController.Delete);


module.exports = router;
