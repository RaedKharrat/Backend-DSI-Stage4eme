import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

// Fonction pour hasher le mot de passe
function hashPassword(password) {
  if (typeof password !== 'string') {
    throw new TypeError('Password must be a string');
  }
  return bcrypt.hashSync(password, 10);
}

// Configurer le transporteur de mail
function setupTransporter() {
  return nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    secure: false,
    auth: {
      user: 'a7a511292a6aee',
      pass: '06528cd8492b32',
    }
  });
}

// Inscrire un nouvel utilisateur
export const register = async (req, res) => {
  try {
    const { fullName, password, confirmPassword, email, specialite, role } = req.body;

    if (!fullName || !email || !password || !confirmPassword) {
      return res.status(400).send('Full name, email, password, and confirm password are required');
    }
    
    if (password !== confirmPassword) {
      return res.status(400).send('Passwords do not match.');
    }

    const hashedPassword = hashPassword(password);

    const user = new User({ 
      fullName, 
      password: hashedPassword, 
      email, 
      specialite, 
      role,
    });

    await user.save();
    res.status(201).send('User registered successfully.');
  } catch (err) {
    res.status(400).send(err.message);
  }
};

// Connexion d'un utilisateur
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('Invalid credentials');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send('Invalid credentials');

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Envoyer le token dans un cookie sécurisé
    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

    res.status(200).json({ token });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Demander la réinitialisation du mot de passe
export const resetPasswordRequest = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send('User not found');

    // Générer un code de réinitialisation à 5 chiffres
    const resetCode = Math.floor(10000 + Math.random() * 90000); // Génère un nombre aléatoire à 5 chiffres
    user.resetPasswordToken = resetCode;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 heure
    await user.save();

    const transporter = setupTransporter();

    const mailOptions = {
      to: user.email,
      from: 'mailtrap@demomailtrap.com',
      subject: 'Password Reset Code',
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n` +
        `Please use the following code to complete the process:\n\n` +
        `${resetCode}\n\n` +
        `If you did not request this, please ignore this email and your password will remain unchanged.\n`
    };

    await transporter.sendMail(mailOptions);
    res.status(200).send('Password reset email sent');
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Réinitialiser le mot de passe
export const resetPassword = async (req, res) => {
  try {
    const { code, password } = req.body;
    const user = await User.findOne({
      resetPasswordToken: code,
      resetPasswordExpires: { $gt: Date.now() }
    });
    if (!user) return res.status(400).send('Password reset code is invalid or has expired');

    if (!password) {
      return res.status(400).send('Password is required');
    }

    const hashedPassword = hashPassword(password);
    user.password = hashedPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();

    res.status(200).send('Password has been reset successfully');
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Fonction de déconnexion
export const logout = (req, res) => {
  try {
    // Si vous utilisez des cookies pour les jetons JWT
    res.clearCookie('token'); // Assurez-vous que le nom du cookie correspond à celui utilisé pour le jeton

    res.status(200).send('Logged out successfully');
  } catch (err) {
    res.status(500).send(err.message);
  }
};
