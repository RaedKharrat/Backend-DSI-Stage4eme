// models/absence.js
import { Schema, model } from 'mongoose';
import Etudiant from './etudiant.js';
import Classe from './classe.js';
import Module from './module.js';

const absenceSchema = new Schema({
  observation: {
    type: String,
    required: false // La remarque est optionnelle
  },
  date: {
    type: Date,
    required: true
  },
  seance: {
    type: String,
    required: true
  },
  semestre: {
    type: Number,
    required: true
  },
  classe: {
    type: Schema.Types.ObjectId,
    ref: 'Classe',
    required: true
  },
  module: {
    type: Schema.Types.ObjectId,
    ref: 'Module',
    required: true
  },
  etudiants: [{
    type: Schema.Types.ObjectId,
    ref: 'Etudiant'
  }]
}, { timestamps: true });

export default model('Absence', absenceSchema);
