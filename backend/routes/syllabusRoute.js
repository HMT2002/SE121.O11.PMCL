const express = require('express');
const defaultController = require('../controllers/defaultController');
const syllabusController = require('../controllers/syllabusController');
const authController = require('../controllers/authController');

const router = express.Router();

//ROUTE HANDLER
router
  .route('/')
  .get(syllabusController.GetAll)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'chairman', 'instructor'),
    syllabusController.Create
  );

router.route('/department/:id').get(syllabusController.GetAllByDepartment);

router.route('/user/:id').get(syllabusController.GetAllByUser);

router.route('/course/:id').get(syllabusController.GetAllByCourse);

router
  .route('/id/:id')
  .get(syllabusController.GetID, syllabusController.Get)
  .patch(authController.protect, syllabusController.GetID, syllabusController.Update)
  .delete(authController.protect, syllabusController.GetID, syllabusController.Delete);

router.route('/submit/:id').post(syllabusController.SubmitSyllabus);

router.route('/approve/:id').post(syllabusController.ApproveSyllabus);

router.route('/request-review/:id').post(syllabusController.RequestReview);

router.route('/reject/:id').post(syllabusController.RejectSyllabus);

router.route('/history/:id').get(syllabusController.GetSyllabusHitory);

module.exports = router;
