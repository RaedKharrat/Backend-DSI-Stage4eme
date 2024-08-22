import { Schema, model } from "mongoose";

const moduleSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        classe: {
            type: classe,
            required: true
        },
        nbrHeure: {
            type: Number,
            required: true
        },
        semestre:{
            type: Number,
            required: true,
        },
        chargeep:{
            type: Number,
            required: true,
        },
        cc:{
            type:Float32Array,
            required: true,

        },
        examen:{
            type:Float32Array,
            required: true,

        },
        tp:{
            type:Float32Array,
            required: true,

        }
    },
    {
        timestamps: true
    }
)
export default model("Module",moduleSchema);