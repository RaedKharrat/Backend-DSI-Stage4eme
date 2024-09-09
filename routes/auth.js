import express from 'express';
import { register, login, resetPasswordRequest, resetPassword, logout } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/reset-password-request', resetPasswordRequest);
router.post('/reset-password', resetPassword);
router.post('/logout', logout); // Route pour la déconnexion

export default router;
