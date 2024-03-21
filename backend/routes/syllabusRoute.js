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

router
  .route('/course/:id')
  .get(syllabusController.GetAllByCourse)
  // .post(authController.protect, syllabusController.GetByCourse, syllabusController.PostNewSyllabus)
  .patch(authController.protect, syllabusController.GetByCourse, syllabusController.Update);

router
  .route('/id/:id')
  .get(syllabusController.GetByID, syllabusController.GetResponse)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'chairman'),
    syllabusController.GetByID,
    syllabusController.Delete
  );

router
  .route('/submit/:id')
  .post(
    authController.protect,
    authController.restrictTo('admin', 'chairman', 'instructor'),
    syllabusController.GetByID,
    syllabusController.SubmitSyllabus
  );

router
  .route('/approve/:id')
  .post(
    authController.protect,
    authController.restrictTo('admin', 'chairman'),
    syllabusController.GetByID,
    syllabusController.ApproveSyllabus
  );

router
  .route('/reject/:id')
  .post(
    authController.protect,
    authController.restrictTo('admin', 'chairman'),
    syllabusController.GetByID,
    syllabusController.RejectSyllabus
  );

router
  .route('/request-review/:id')
  .post(
    authController.protect,
    authController.restrictTo('admin', 'chairman', 'instructor'),
    syllabusController.GetByID,
    syllabusController.RequestReview
  );

router.route('/history/main/:id').get(syllabusController.GetByID, syllabusController.GetSyllabusMainHitory);

router.route('/history/:id').get(syllabusController.GetByID, syllabusController.GetSyllabusHitory);

module.exports = router;
