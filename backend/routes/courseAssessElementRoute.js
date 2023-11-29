const express = require('express');
const defaultController = require('../controllers/defaultController');
const syllabusController = require('../controllers/syllabusController');
const historyController = require('../controllers/historyController');
const courseAssessElementController = require('../controllers/courseAssessElementController');

const authController = require('../controllers/authController');

const router = express.Router();

//ROUTE HANDLER
router.route('/').get(courseAssessElementController.GetAll).post(courseAssessElementController.Create);

module.exports = router;
