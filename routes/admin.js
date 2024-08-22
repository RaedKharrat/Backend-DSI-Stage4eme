import express from 'express';
import { createEnseignant, updateEnseignant, deleteEnseignant } from '../controllers/adminController.js'; // Ensure correct path
import { verifyAdmin } from '../middelwares/authMiddleware.js'; // Ensure correct path

const router = express.Router();

router.post('/create', verifyAdmin, createEnseignant);
router.put('/update/:id', verifyAdmin, updateEnseignant);
router.delete('/delete/:id', verifyAdmin, deleteEnseignant);

export default router;
