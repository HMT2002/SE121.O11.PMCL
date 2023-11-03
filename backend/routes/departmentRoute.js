const express = require('express');
const defaultController = require('../controllers/defaultController');
const courseController = require('../controllers/courseController');
const departmentController = require('../controllers/departmentController');
const authController = require('../controllers/authController');

const router = express.Router();

//ROUTE HANDLER

router
  .route('/:id')
  .get(    departmentController.GetID,departmentController.GetFaculty)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'chairman', 'instructor'),
    departmentController.GetID,
    departmentController.UpdateFaculty
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'chairman', 'instructor'),
    departmentController.GetID,
    departmentController.DeleteFaculty
  );

router
  .route('/')
  .get(departmentController.GetAllFaculty)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'chairman', 'instructor'),
    departmentController.CreateFaculty
  );

module.exports = router;
