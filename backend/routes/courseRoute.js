const express = require('express');
const defaultController = require('../controllers/defaultController');
const courseController = require('../controllers/courseController');
const authController = require('../controllers/authController');

const router = express.Router();

//ROUTE HANDLER
router.route('/').get(courseController.GetAll).post(courseController.Create);

router
  .route('/is-user-assign/course-id/:id')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'chairman', 'instructor'),
    courseController.CheckIsUserAssignedToCourse
  );

router.route('/assign').get(courseController.GetAllCourseAssignment);

router
  .route('/assign/user')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'chairman', 'instructor'),
    courseController.GetUserCourseAssignment
  );

router
  .route('/assign/course-id/:id')
  .get(authController.protect, authController.restrictTo('admin', 'chairman'), courseController.GetCourseAssignment)
  .post(authController.protect, authController.restrictTo('admin', 'chairman'), courseController.AssignUserToCourse);
router
  .route('/resign/course-id/:id')
  .post(authController.protect, authController.restrictTo('admin', 'chairman'), courseController.ResignUserFromCourse);
router.route('/department/:id').get(courseController.GetAllByDepartment);
router.route('/:id').get(courseController.GetByID).patch(courseController.Update).delete(courseController.Delete);

module.exports = router;
