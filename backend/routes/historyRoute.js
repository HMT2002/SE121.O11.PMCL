const express = require('express');
const defaultController = require('../controllers/defaultController');
const syllabusController = require('../controllers/syllabusController');
const historyController = require('../controllers/historyController');

const authController = require('../controllers/authController');

const router = express.Router();

//ROUTE HANDLER
router.route('/').get(historyController.GetAll).post(historyController.Create);


router.route('/id/:id').get(historyController.Get).put(historyController.Update).delete(historyController.Delete);

router.route('/user/:id').get(historyController.GetAllByUser);

router.route('/syllabus/:id').get(historyController.GetAllBySyllabus);

router.route('/branches/from/:id').get(historyController.GetAllBranchesFromHistory);
router.route('/prevs/:id').get(historyController.GetBranchPrevHistory);


module.exports = router;
