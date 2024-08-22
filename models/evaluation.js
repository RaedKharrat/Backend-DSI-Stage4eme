import { Schema, model } from "mongoose";

const evaluationSchema = new Schema(
    {
        date: {
            type: Date,
            required: true
        },
        grade: {
            type: Number,
            required: true
        },
        commentaire: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)
export default model("Evaluation",evaluationSchema);