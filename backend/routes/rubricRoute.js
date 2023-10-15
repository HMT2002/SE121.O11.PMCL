const express = require('express');
const defaultController = require('../controllers/defaultController');
const rubricController = require('../controllers/rubricController');
const authController = require('../controllers/authController');

const router = express.Router();

//ROUTE HANDLER
router.route('/').get(rubricController.Get);
router.route('/').post(rubricController.Create);
router.route('/').put(rubricController.Update);
router.route('/').delete(rubricController.Delete);


module.exports = router;
