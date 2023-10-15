const express = require('express');
const defaultController = require('../controllers/defaultController');
const contentController = require('../controllers/contentController');
const authController = require('../controllers/authController');

const router = express.Router();

//ROUTE HANDLER
router.route('/').get(contentController.Get);
router.route('/').post(contentController.Create);
router.route('/').put(contentController.Update);
router.route('/').delete(contentController.Delete);


module.exports = router;
