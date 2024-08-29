// controllers/absenceController.js
import Absence from '../models/abscence.js';
import Etudiant from '../models/etudiant.js';
import Classe from '../models/classe.js';
import Module from '../models/module.js';

// Create a new Absence
export const createAbsence = async (req, res) => {
  const { observation, date, seance, semestre, classeId, moduleId, etudiantsIds } = req.body;

  try {
    // Vérifier l'existence des références
    const classe = await Classe.findById(classeId);
    const module = await Module.findById(moduleId);
    const etudiants = await Etudiant.find({ '_id': { $in: etudiantsIds } });

    if (!classe || !module) {
      return res.status(404).json({ message: 'Classe ou Module non trouvé' });
    }

    const absence = new Absence({
      observation,
      date,
      seance,
      semestre,
      classe: classeId,
      module: moduleId,
      etudiants: etudiantsIds
    });

    await absence.save();
    res.status(201).json({ message: 'Absence enregistrée avec succès' });
  } catch (err) {
    console.error('Erreur lors de la création de l\'absence:', err);
    res.status(500).json({ message: 'Erreur lors de la création de l\'absence', error: err.message });
  }
};

// Get all absences
export const getAbsences = async (req, res) => {
  try {
    const absences = await Absence.find().populate('etudiants').populate('classe').populate('module');
    res.status(200).json(absences);
  } catch (err) {
    console.error('Erreur lors de la récupération des absences:', err);
    res.status(500).json({ message: 'Erreur lors de la récupération des absences', error: err.message });
  }
};


// Fonction pour obtenir les étudiants d'une classe spécifique
export const getEtudiantsByClasse = async (req, res) => {
  const { classeId } = req.params;

  try {
    // Vérifier si la classe existe
    const classe = await Classe.findById(classeId);
    if (!classe) {
      return res.status(404).json({ message: 'Classe non trouvée' });
    }

    // Récupérer les étudiants de la classe avec uniquement les champs id et fullName
    const etudiants = await Etudiant.find({ classe: classeId })
      .select('_id fullName'); // Sélectionne uniquement les champs id et fullName

    res.status(200).json(etudiants);
  } catch (err) {
    console.error('Erreur lors de la récupération des étudiants:', err);
    res.status(500).json({ message: 'Erreur lors de la récupération des étudiants', error: err.message });
  }
};

