const express = require('express');
const defaultController = require('../controllers/defaultController');
const syllabusController = require('../controllers/syllabusController');
const historyController = require('../controllers/historyController');
const programOutcomeController = require('../controllers/programOutcomeController');

const authController = require('../controllers/authController');

const router = express.Router();

//ROUTE HANDLER
router.route('/').get(programOutcomeController.GetAll).post(programOutcomeController.Create);

module.exports = router;
