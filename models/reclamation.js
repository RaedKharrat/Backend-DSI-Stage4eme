import mongoose from 'mongoose';
const { Schema } = mongoose;

const reclamationSchema = new Schema({
  Annee: {
    type: Number, 
    required: true,
  },
  etudiantId: {
    type: String,
    required: true,
  },
  nomPrenom: {
    type: String,
    required: true,
  },
  Classe: {
    type: Schema.Types.ObjectId, 
    ref: "Classe",
    required: true,
  },
  Type_Reclamation: {
    type: String,
    required: true,
  },
  enseignant: {
    type: Schema.Types.ObjectId, 
    ref: "User",
    required: true,
  },
  Code_module: {
    type: String,
    required: true,
  },
  Module: {
    type: Schema.Types.ObjectId, 
    ref: "Module",
    required: true,
  },
  date_reclamation: {
    type: Date,
    required: true,
  },
  Text_Reclamation: {
    type: String,
    required: true,
  },
  Reponse_Reclamation: {
    type: String,
  },
  Etat: {
    type: String,
    default: 'Non traité',  // Par défaut non traité
  }
}, { timestamps: true });

export default mongoose.model('Reclamation', reclamationSchema);
