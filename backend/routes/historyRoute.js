const express = require('express');
const defaultController = require('../controllers/defaultController');
const syllabusController = require('../controllers/syllabusController');
const historyController = require('../controllers/historyController');

const authController = require('../controllers/authController');

const router = express.Router();

//ROUTE HANDLER
router.route('/').get(historyController.GetAll).post(historyController.Create);

router
  .route('/id/:id')
  .get(historyController.GetByID, historyController.GetResponse)
  .put(historyController.GetByID, historyController.Update)
  .delete(historyController.GetByID, historyController.Delete);

router.route('/user/:id').get(historyController.GetAllByUser);

router.route('/syllabus/:id').get(historyController.GetAllBySyllabus);

module.exports = router;
