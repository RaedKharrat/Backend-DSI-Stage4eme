import CahierClasse from '../models/cahierClasse.js';

export const createCahierClasse = async (req, res) => {
    const { date, contenu, horaire_seance, titre_seance, remarque } = req.body;
    try {
        const cahierClasse = new CahierClasse({ 
            user: req.user._id, // Associe l'utilisateur connecté à la création
            date, 
            contenu, 
            horaire_seance, 
            titre_seance, 
            remarque 
        });
        await cahierClasse.save();
        res.status(201).json(cahierClasse);
    } catch (err) {
        res.status(500).json({ message: 'Error creating CahierClasse', error: err.message });
    }
};

export const updateCahierClasse = async (req, res) => {
    const { id } = req.params;
    const { date, contenu, horaire_seance, titre_seance, remarque } = req.body;
    try {
        const cahierClasse = await CahierClasse.findByIdAndUpdate(id, { date, contenu, horaire_seance, titre_seance, remarque }, { new: true });
        if (!cahierClasse) {
            return res.status(404).json({ message: 'CahierClasse not found' });
        }
        res.status(200).json(cahierClasse);
    } catch (err) {
        res.status(500).json({ message: 'Error updating CahierClasse', error: err.message });
    }
};

export const deleteCahierClasse = async (req, res) => {
    const { id } = req.params;
    try {
        const cahierClasse = await CahierClasse.findByIdAndDelete(id);
        if (!cahierClasse) {
            return res.status(404).json({ message: 'CahierClasse not found' });
        }
        res.status(200).json({ message: 'CahierClasse deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting CahierClasse', error: err.message });
    }
};

export const getCahierClasses = async (req, res) => {
    try {
        const cahierClasses = await CahierClasse.find();
        res.status(200).json(cahierClasses);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching CahierClasses', error: err.message });
    }
};
