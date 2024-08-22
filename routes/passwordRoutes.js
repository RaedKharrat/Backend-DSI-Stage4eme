import express from 'express';
import { forgotPassword, resetPassword } from '../controllers/passwordController.js';

const router = express.Router();

router.post('/request-password-reset', forgotPassword);
router.post('/reset-password', resetPassword);

export default router;
