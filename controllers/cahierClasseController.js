import CahierClasse from '../models/cahierClasse.js';
import Module from '../models/module.js'; // Assure-toi d'importer le modèle Module

export const createCahierClasse = async (req, res) => {
    const { date, contenu, horaire_seance, titre_seance, remarque, module } = req.body;
    try {

//verif l'exis de cahier de classe
        const moduleExists = await Module.findById(module);
        if (!moduleExists) {
            return res.status(400).json({ message: 'Module not found' });
        }

        const cahierClasse = new CahierClasse({ 
            user: req.user._id, 
            date, 
            contenu, 
            horaire_seance, 
            titre_seance, 
            remarque,
            module
        });
        await cahierClasse.save();
        res.status(201).json(cahierClasse);
    } catch (err) {
        res.status(500).json({ message: 'Error creating CahierClasse', error: err.message });
    }
};

export const updateCahierClasse = async (req, res) => {
    const { id } = req.params;
    const { date, contenu, horaire_seance, titre_seance, remarque, module } = req.body;
    try {
        // Vérifie si le cahierClasse existe
        const cahierClasse = await CahierClasse.findById(id);
        if (!cahierClasse) {
            return res.status(404).json({ message: 'CahierClasse not found' });
        }

        // Vérif l'existance de module
        if (module) {
            const moduleExists = await Module.findById(module);
            if (!moduleExists) {
                return res.status(400).json({ message: 'Module not found' });
            }
        }

        const updatedCahierClasse = await CahierClasse.findByIdAndUpdate(id, { date, contenu, horaire_seance, titre_seance, remarque, module }, { new: true });
        res.status(200).json(updatedCahierClasse);
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
    const { semestre, dateDebut, dateFin } = req.query;
    const query = {};

    if (semestre) {
        query.semestre = semestre;
    }

    if (dateDebut || dateFin) {
        query.date = {};
        if (dateDebut) {
            query.date.$gte = new Date(dateDebut);
        }
        if (dateFin) {
            query.date.$lte = new Date(dateFin);
        }
    }

    try {
        const cahierClasses = await CahierClasse.find(query).populate('module');
        res.status(200).json(cahierClasses);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching CahierClasses', error: err.message });
    }
};
