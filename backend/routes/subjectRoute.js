const express = require('express');
const defaultController = require('../controllers/defaultController');
const subjectController = require('../controllers/subjectController');
const authController = require('../controllers/authController');

const router = express.Router();

//ROUTE HANDLER
router.route('/').get(subjectController.Get);
router.route('/').post(subjectController.Create);
router.route('/').put(subjectController.Update);
router.route('/').delete(subjectController.Delete);


module.exports = router;
