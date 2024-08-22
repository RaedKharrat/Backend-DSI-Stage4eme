import { Schema, model } from "mongoose";
import classe from "./classe";

const coursSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        classe: {
            type: classe,
            required: true
        },
        semstre:{
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
)
export default model("Cours",coursSchema);