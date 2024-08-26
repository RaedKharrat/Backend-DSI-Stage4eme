import express from 'express';
import { createCahierClasse, updateCahierClasse, deleteCahierClasse, getCahierClasses } from '../controllers/cahierClasseController.js';
import { authenticateJWT, verifyEnseignant } from '../middelwares/authMiddleware.js';

const router = express.Router();

// Routes pour CahierClasse avec vérification des rôles
router.post('/', authenticateJWT, verifyEnseignant, createCahierClasse);
router.put('/:id', authenticateJWT, verifyEnseignant, updateCahierClasse);
router.delete('/:id', authenticateJWT, verifyEnseignant, deleteCahierClasse);
router.get('/', authenticateJWT, verifyEnseignant, getCahierClasses);

export default router;
