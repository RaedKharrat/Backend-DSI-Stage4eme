import Reclamation from '../models/reclamation.js';

// Obtenir les réclamations pour un enseignant
export const getReclamationsByEnseignant = async (req, res) => {
  try {
    const enseignantId = req.user.id;  // Utiliser l'ID de l'enseignant depuis le token JWT
    const reclamations = await Reclamation.find({ enseignant: enseignantId })
      .populate('Classe')
      .populate('Module');

    res.status(200).json(reclamations);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des réclamations', error });
  }
};

// Supprimer une réclamation
export const deleteReclamation = async (req, res) => {
  try {
    const { id } = req.params;
    await Reclamation.findByIdAndDelete(id);
    res.status(200).json({ message: 'Réclamation supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de la réclamation', error });
  }
};

// Répondre à une réclamation
export const repondreReclamation = async (req, res) => {
  try {
    const { id } = req.params;
    const { reponse } = req.body;

    const reclamation = await Reclamation.findById(id);
    if (!reclamation) {
      return res.status(404).json({ message: 'Réclamation non trouvée' });
    }

    reclamation.Reponse_Reclamation = reponse;
    reclamation.Etat = 'Traité';  // Mettre à jour l'état à 'Traité'

    await reclamation.save();
    res.status(200).json({ message: 'Réclamation traitée avec succès', reclamation });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors du traitement de la réclamation', error });
  }
};
