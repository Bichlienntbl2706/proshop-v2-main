import express from 'express';
import {
  updatePassword
} from '../controllers/resetController.js';

const router = express.Router();
router.put('/reset-password', updatePassword);

export default router;
