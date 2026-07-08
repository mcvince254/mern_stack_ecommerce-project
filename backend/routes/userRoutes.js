import express from 'express';
import {deleteUser, getSingleUser, getUserDetails, getUsersList, loginUser, logoutUser, registerUser,requestPasswordReset, resetPassword, updatePassword, updateProfile, updateUserRole} from '../controller/userController.js'
import { roleBasedAccess, verifyUserAuth } from '../middleWare/userAuth.js';


const router = express.Router()

//Routes
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/password/forgot").post(requestPasswordReset)
router.route("/reset/:token").post(resetPassword);
router.route("/profile").post(verifyUserAuth, getUserDetails);
router.route("/password/update").post(verifyUserAuth, updatePassword);
router.route("/profile/update").post(verifyUserAuth, updateProfile)
router.route("/admin/users")
.get(verifyUserAuth,roleBasedAccess('admin'), getUsersList);
router.route("/admin/users/:id ")
.get(verifyUserAuth,roleBasedAccess('admin'), getSingleUser)
.put(verifyUserAuth,roleBasedAccess('admibn'), updateUserRole)
.delete(verifyUserAuth,roleBasedAccess('admin'), deleteUser)



export default router

//curl -X POST http://localhost:4300/api/v1/login^
//-H "Content-Type: application/json" ^
//-d "{\"email\":\"mcvincemuthoni@gmail.com\",\"password\":\"123456\"}"