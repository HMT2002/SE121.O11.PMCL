const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

//ROUTE HANDLER
router.route('/check-token').get(authController.protect);

router.route('/add-user-role/:id').post(authController.protect,authController.AddUserRole);
router.route('/remove-user-role/:id').delete(authController.protect,authController.RemoveUserRole);
router.route('/update-user-role/:id').put(authController.protect,authController.UpdateUSerRole);
router.route('/assign-user-role/:id').post(authController.protect,authController.AssignUserRole);



module.exports = router;
