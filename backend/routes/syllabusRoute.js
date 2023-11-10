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

router.route('/submit/:id').post(authController.protect,authController.restrictTo('admin', 'chairman', 'instructor'), syllabusController.GetID,syllabusController.SubmitSyllabus);

router.route('/approve/:id').post(authController.protect,authController.restrictTo('admin', 'chairman'), syllabusController.GetID,syllabusController.ApproveSyllabus);

router.route('/request-review/:id').post(authController.protect,authController.restrictTo('admin', 'chairman', 'instructor'), syllabusController.GetID,syllabusController.RequestReview);

router.route('/reject/:id').post(authController.protect,authController.restrictTo('admin', 'chairman'), syllabusController.GetID,syllabusController.RejectSyllabus);

router.route('/history/main/:id').get(syllabusController.GetID,syllabusController.GetSyllabusMainHitory);

router.route('/history/:id').get(syllabusController.GetID,syllabusController.GetSyllabusHitory);



module.exports = router;
