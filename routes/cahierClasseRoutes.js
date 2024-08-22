import express from 'express';
import { createCahierClasse, updateCahierClasse, deleteCahierClasse, getCahierClasses } from '../controllers/cahierClasseController.js';
import { verifyEnseignant } from '../middelwares/authMiddleware.js';

const router = express.Router();

// Routes pour CahierClasse avec vérification des rôles
router.post('/', verifyEnseignant, createCahierClasse);
router.put('/:id', verifyEnseignant, updateCahierClasse);
router.delete('/:id', verifyEnseignant, deleteCahierClasse);
router.get('/', verifyEnseignant, getCahierClasses);

export default router;
