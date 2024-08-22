import { Schema, model } from "mongoose";

const reclamationSchema = new Schema(
    {
        objet: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        },
        session:{
            type: Date,
            required: true
        }

    },
    {
        timestamps: true
    }
)
export default model("Reclamation",reclamationSchema);