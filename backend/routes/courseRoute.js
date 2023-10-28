const express = require('express');
const defaultController = require('../controllers/defaultController');
const courseController = require('../controllers/courseController');
const authController = require('../controllers/authController');

const router = express.Router();

//ROUTE HANDLER
router.route('/').get(courseController.GetAll).post(courseController.Create);

router.route('/:id').patch(courseController.Update);
router.route('/:id').delete(courseController.Delete);
router.route('/department/:id').get(courseController.GetAllByDepartment)





module.exports = router;
