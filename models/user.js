import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  specialite: { type: String },
  role: { type: String, enum: ['enseignant', 'admin'], default: 'enseignant' },
  resetPasswordToken: {
    type: String,
    default: null
  },
  resetPasswordExpires: {
    type: Date,
    default: null
  },
  resetPasswordCode: {
    type:String,
  },
});

export default mongoose.model('User', userSchema);
