import express from 'express';
import { createAbsence, getAbsences } from '../controllers/absenceController.js';
import { authenticateJWT, verifyEnseignant } from '../middelwares/authMiddleware.js';

const router = express.Router();

// Route to add a new absence
router.post('/absences', authenticateJWT, verifyEnseignant, createAbsence);

// Route to get all absences (optional)
router.get('/absences', authenticateJWT, verifyEnseignant, getAbsences);

export default router;
