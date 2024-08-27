import { Schema, model } from "mongoose";
import Classe from "./classe.js";

const coursSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  classe: {
    type: Schema.Types.ObjectId,
    ref: 'Classe',
    required: true
  },
  semestre: {
    type: Number,
    required: true
  }
}, { timestamps: true });

export default model("Cours", coursSchema);
