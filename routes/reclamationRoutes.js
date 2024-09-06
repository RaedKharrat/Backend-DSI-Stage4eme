import express from 'express';
import { getReclamationsByEnseignant, deleteReclamation, repondreReclamation } from '../controllers/reclamationController.js';

const router = express.Router();

// Route pour obtenir toutes les réclamations pour un enseignant
router.get('/', getReclamationsByEnseignant);

// Route pour supprimer une réclamation
router.delete('/:id', deleteReclamation);

// Route pour répondre à une réclamation
router.put('/:id/repondre', repondreReclamation);

export default router;
