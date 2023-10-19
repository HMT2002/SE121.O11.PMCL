const express = require('express');
const defaultController = require('../controllers/defaultController');
const courseController = require('../controllers/courseController');
const departmentController = require('../controllers/departmentController');

const router = express.Router();

//ROUTE HANDLER

router.route('/').put(departmentController.Update);
router.route('/').delete(departmentController.Delete);


router.route('/').get(departmentController.GetAll).post(departmentController.Create);


module.exports = router;
