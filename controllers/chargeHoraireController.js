// controllers/chargeHoraireController.js
import ChargeHoraire from '../models/chargeHoraire.js';

// Récupérer toutes les charges horaires
export const getAllCharges = async (req, res) => {
    try {
        const charges = await ChargeHoraire.find().populate('enseignant module classe');
        res.status(200).json(charges);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des charges horaires', error });
    }
};

// Récupérer une charge horaire par ID
export const getChargeById = async (req, res) => {
    try {
        const charge = await ChargeHoraire.findById(req.params.id).populate('enseignant module classe');
        if (!charge) return res.status(404).json({ message: 'Charge horaire non trouvée' });
        res.status(200).json(charge);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération de la charge horaire', error });
    }
};
