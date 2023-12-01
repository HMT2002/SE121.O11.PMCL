const express = require('express');
const defaultController = require('../controllers/defaultController');
const syllabusController = require('../controllers/syllabusController');
const historyController = require('../controllers/historyController');
const programOutcomeAssertmentController = require('../controllers/programOutcomeAssertmentController');

const authController = require('../controllers/authController');

const router = express.Router();

//ROUTE HANDLER
router.route('/').get(programOutcomeAssertmentController.GetAll).post(programOutcomeAssertmentController.Create);

module.exports = router;
