const express = require('express');
const defaultController = require('../controllers/defaultController');
const syllabusController = require('../controllers/syllabusController');
const historyController = require('../controllers/historyController');
const levelOfTeachingController = require('../controllers/levelOfTeachingController');

const authController = require('../controllers/authController');

const router = express.Router();

//ROUTE HANDLER
router.route('/').get(levelOfTeachingController.GetAll).post(levelOfTeachingController.Create);

module.exports = router;
