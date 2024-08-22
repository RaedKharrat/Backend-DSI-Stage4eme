import { Schema, model } from "mongoose";

const absenceSchema = new Schema(
    {
        observaton: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        seance: {
            type: String,
            required: true
        },
        semestr: {
            type: Number,
            required: true
        }

    },
    {
        timestamps: true
    }
)
export default model("Absence",absenceSchema);