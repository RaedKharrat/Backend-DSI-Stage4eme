import { Schema, model } from "mongoose";

const secretCodeSchema = new Schema(
    {
        code: {
            type: String,
            required: true
        },
        expirationDate: {
            type: Date,
            required: true
        }},
    {
        timestamps: true
    }
)
export default model("SecretCode", secretCodeSchema);
