import express from 'express';
import { register, login, registerValidation, loginValidation } from '../controllers/authController.js';

const router = express.Router();

// Routes d'inscription et de connexion avec validation
router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);

export default router;
