// models/chargeHoraire.js
import { Schema, model } from 'mongoose';
import Module from './module.js';
import User from './user.js';

const chargeHoraireSchema = new Schema(
    {
        enseignant: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        module: {
            type: Schema.Types.ObjectId,
            ref: 'Module',
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
        chargeP1: {
            type: Number,
            required: true
        },
        chargeP2: {
            type: Number,
            required: true
        },
        /*cc: {
            type: Number,
            required: true
        },
        tp: {
            type: Number,
            required: true
        }*/
    },
    {
        timestamps: true
    }
);

export default model('ChargeHoraire', chargeHoraireSchema);
