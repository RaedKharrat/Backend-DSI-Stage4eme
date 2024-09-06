import { Schema, model } from 'mongoose';

const moduleSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        up: {
            type: String,
            required: true
        },
        code_module:{
            type: String,
            required:true
        }
    },
    {
        timestamps: true
    }
);

export default model('Module', moduleSchema);
