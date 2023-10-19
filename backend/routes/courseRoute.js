const express = require('express');
const defaultController = require('../controllers/defaultController');
const courseController = require('../controllers/courseController');
const authController = require('../controllers/authController');

const router = express.Router();

//ROUTE HANDLER
router.route('/department/:id').get(courseController.GetAllByDepartment)

router.route('/').put(courseController.Update);
router.route('/').delete(courseController.Delete);


router.route('/').get(courseController.GetAll).post(courseController.Create);


module.exports = router;
