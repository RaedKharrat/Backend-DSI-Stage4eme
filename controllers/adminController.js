import User from '../models/user.js';

export const createEnseignant = async (req, res) => {
  const { fullName, email, password, specialite } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    const newEnseignant = new User({
      fullName,
      email,
      password,
      specialite,
      role: 'enseignant'
    });
    await newEnseignant.save();
    res.status(201).json({ message: 'Enseignant created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error creating enseignant', error: err });
  }
};

export const updateEnseignant = async (req, res) => {
  const { id } = req.params;
  const { fullName, email, specialite } = req.body;
  
  try {
    const enseignant = await User.findById(id);
    if (!enseignant || enseignant.role !== 'enseignant') {
      return res.status(404).json({ message: 'Enseignant not found' });
    }

    enseignant.fullName = fullName || enseignant.fullName;
    enseignant.email = email || enseignant.email;
    enseignant.specialite = specialite || enseignant.specialite;

    await enseignant.save();
    res.status(200).json({ message: 'Enseignant updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating enseignant', error: err });
  }
};

export const deleteEnseignant = async (req, res) => {
  const { id } = req.params;
  
  try {
    const enseignant = await User.findById(id);
    if (!enseignant || enseignant.role !== 'enseignant') {
      return res.status(404).json({ message: 'Enseignant not found' });
    }

    await enseignant.deleteOne();
    res.status(200).json({ message: 'Enseignant deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting enseignant', error: err });
  }
};
