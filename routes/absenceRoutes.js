// routes/absenceRoutes.js
import express from 'express';
import { createAbsence, getAbsences, getEtudiantsByClasse } from '../controllers/absenceController.js';
import { authenticateJWT, verifyEnseignant } from '../middelwares/authMiddleware.js';

const router = express.Router();

// Route to add a new absence
router.post('/', authenticateJWT, verifyEnseignant, createAbsence);

// Route to get all absences (optional)
router.get('/', authenticateJWT, verifyEnseignant, getAbsences);

// Route to get students by class
router.get('/etudiants/:classeId', authenticateJWT, verifyEnseignant, getEtudiantsByClasse);

export default router;
