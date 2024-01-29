const express = require('express');
const defaultController = require('../controllers/defaultController');
const outputController = require('../controllers/outputController');
const authController = require('../controllers/authController');

const router = express.Router();

//ROUTE HANDLER
router
  .route('/')
  .get(outputController.GetAll)
  .post(authController.protect, authController.restrictTo('admin', 'chairman', 'instructor'), outputController.Create);
router.route('/:id').put(outputController.Update).delete(outputController.Delete);
router.route('/:id');

module.exports = router;
