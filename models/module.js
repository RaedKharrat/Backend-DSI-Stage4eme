import { Schema, model } from 'mongoose';
import Classe from './classe.js'; // Importation correcte du modèle Classe

const moduleSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        classe: {
            type: Schema.Types.ObjectId,
            ref: 'Classe',
            required: true
        },
        nbrHeure: {
            type: Number,
            required: true
        },
        semestre: {
            type: Number,
            required: true
        },
        chargeep: {
            type: Number,
            required: true
        },
        cc: {
            type: Number,
            required: true
        },
        examen: {
            type: Number,
            required: true
        },
        tp: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
);

export default model('Module', moduleSchema);
