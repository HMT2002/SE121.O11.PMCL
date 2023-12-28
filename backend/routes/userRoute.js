const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const { uploadImage } = require('../modules/multerAPI.js');

const router = express.Router();

router.post('/signup', authController.SignUp);
router.post('/signin', authController.SignIn);
router.post('/signup-google', authController.SignUpGoogle);
router.post('/signin-google', authController.SignInGoogle);
router.post('/signout', authController.SignOut);
router.post('/upload-image', uploadImage, userController.UploadImage);

//ROUTE HANDLER
router
  .route('/')
  .get(authController.protect, authController.restrictTo('admin', 'chairman'), userController.GetAllUsers)
  .post(authController.protect, authController.restrictTo('admin'), userController.CreateUser);
//   .post(userController.CheckInput, uploadImage, authController.SignUp);

router
  .route('/department/:department')
  .get(authController.protect, authController.restrictTo('admin'), userController.GetUsersByDepartment);
router
  .route('/course/:course')
  .get(authController.protect, authController.restrictTo('admin'), userController.GetAllUsersByCourse);
router
  .route('/recent-registered')
  .get(authController.protect, authController.restrictTo('admin'), userController.GetRecentRegisteredUsers);

router
  .route('/id/:userId')
  .get(userController.GetUserById)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'chairman', 'instructor'),
    userController.DeleteUserById
  );

router
  .route('/change-role/id/:userId')
  .get(userController.GetUserById)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'chairman', 'instructor'),
    userController.UpdateUserRole
  );
router
  .route('/:account')
  .get(authController.protect, authController.restrictTo('admin', 'chairman', 'instructor'), userController.GetUser)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'chairman', 'instructor'),
    userController.CheckInput,
    userController.UpdateUser
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'chairman', 'instructor'),
    userController.DeleteUser
  );

module.exports = router;
