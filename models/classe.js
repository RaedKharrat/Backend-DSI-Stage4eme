import { Schema, model } from "mongoose";

const classeSchema = new Schema(
    {
        
        label: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)
export default model("Classe",classeSchema);