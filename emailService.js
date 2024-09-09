import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Configurer le transporteur de mail
function setupTransporter() {
  return nodemailer.createTransport({
    host: process.env.MAILTRAP_HOST,
    port: process.env.MAILTRAP_PORT,
    secure: false, // true pour 465, false pour les autres ports
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS,
    }
  });
}

export default setupTransporter;
