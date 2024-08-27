// routes/chargeHoraireRoutes.js
import express from 'express';
import { getAllCharges, getChargeById } from '../controllers/chargeHoraireController.js';
import { authenticateJWT } from '../middelwares/authMiddleware.js';

const router = express.Router();

// Route pour récupérer toutes les charges horaires
router.get('/', authenticateJWT, getAllCharges);

// Route pour récupérer une charge horaire par ID
router.get('/:id', authenticateJWT, getChargeById);

export default router;
