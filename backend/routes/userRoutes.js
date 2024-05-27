import express from 'express';
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  verifyEmail
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
// import {loginRequired} from '../config/JWT.js'

const router = express.Router();

router.route('/').post(registerUser).get(protect, getUsers);
// router.post('/auth', loginRequired ,authUser);
router.route('/auth').post(authUser)
router.post('/logout', logoutUser);
router
.route('/profile')
.get(protect, getUserProfile)
.put(protect, updateUserProfile);

router.route('/verify-email').get(verifyEmail);
router
.route('/:id')
.delete(protect, admin, deleteUser)
.get(protect, getUserById)
.put(protect, admin, updateUser);


export default router;
