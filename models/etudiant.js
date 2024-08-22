import { Schema, model } from "mongoose";
import User from './user';

const etudiantSchema = new Schema(
    {
        fullName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        classe: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);



export default model("Etudiant", etudiantSchema);
