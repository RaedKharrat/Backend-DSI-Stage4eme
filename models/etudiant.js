import { Schema, model } from "mongoose";
import Classe from "./classe.js";

const etudiantSchema = new Schema({
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
    type: Schema.Types.ObjectId,
    ref: 'Classe',
    required: true
  }
}, { timestamps: true });

export default model("Etudiant", etudiantSchema);
