import CahierClasse from '../models/cahierClasse.js';
import Classe from '../models/classe.js';
import Module from '../models/module.js';

// Create a new CahierClasse
export const createCahierClasse = async (req, res) => {
    const { date, contenu, horaire_seance, titre_seance, remarque, module: moduleId, classe: classeId, semestre } = req.body;
    try {
        const cahierClasse = new CahierClasse({
            user: req.user._id,
            date,
            contenu,
            horaire_seance,
            titre_seance,
            remarque,
            module: moduleId,
            classe: classeId,
            semestre
        });

        await cahierClasse.save();
        res.status(201).json(cahierClasse);
    } catch (err) {
        res.status(500).json({ message: 'Error creating CahierClasse', error: err.message });
    }
};

// Update an existing CahierClasse
export const updateCahierClasse = async (req, res) => {
    const { id } = req.params;
    const { date, contenu, horaire_seance, titre_seance, remarque, module: moduleId, classe: classeId, semestre } = req.body;
    try {
        const cahierClasse = await CahierClasse.findById(id);
        if (!cahierClasse) {
            return res.status(404).json({ message: 'CahierClasse not found' });
        }

        cahierClasse.date = date || cahierClasse.date;
        cahierClasse.contenu = contenu || cahierClasse.contenu;
        cahierClasse.horaire_seance = horaire_seance || cahierClasse.horaire_seance;
        cahierClasse.titre_seance = titre_seance || cahierClasse.titre_seance;
        cahierClasse.remarque = remarque || cahierClasse.remarque;
        cahierClasse.semestre = semestre || cahierClasse.semestre;
        if (moduleId) cahierClasse.module = moduleId;
        if (classeId) cahierClasse.classe = classeId;

        const updatedCahierClasse = await cahierClasse.save();
        res.status(200).json(updatedCahierClasse);
    } catch (err) {
        res.status(500).json({ message: 'Error updating CahierClasse', error: err.message });
    }
};

// Delete a CahierClasse
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

// Get CahierClasses with optional filters
export const getCahierClasses = async (req, res) => {
    const { semestre, dateDebut, dateFin, classe: classeLabel, module: moduleName } = req.query;
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

    if (classeLabel) {
        const classeFound = await Classe.findOne({ label: classeLabel });
        if (classeFound) {
            query.classe = classeFound._id;
        } else {
            return res.status(400).json({ message: 'Classe not found' });
        }
    }

    if (moduleName) {
        const moduleFound = await Module.findOne({ name: moduleName });
        if (moduleFound) {
            query.module = moduleFound._id;
        } else {
            return res.status(400).json({ message: 'Module not found' });
        }
    }

    try {
        const cahierClasses = await CahierClasse.find(query)
            .populate({
                path: 'module',
                select: 'name'
            })
            .populate({
                path: 'classe',
                select: 'label'
            })
            .populate({
                path: 'user',
                select: 'fullName'
            });

        res.status(200).json(cahierClasses);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching CahierClasses', error: err.message });
    }
};
