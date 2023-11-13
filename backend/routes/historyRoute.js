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
  .get(historyController.GetByID, historyController.Get)
  .put(historyController.GetByID, historyController.Update)
  .delete(historyController.GetByID, historyController.Delete);

router.route('/user/:id').get(historyController.GetAllByUser);

router.route('/syllabus/:id').get(historyController.GetAllBySyllabus);

router.route('/branches/from/:id').get(historyController.GetAllBranchesFromHistory);
router.route('/prevs/:id').get(historyController.GetBranchPrevHistory);

router.route('/restore/:id').get(historyController.GetByID, historyController.RestoreHistory);

module.exports = router;
