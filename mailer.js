// mailer.js
import nodemailer from 'nodemailer';

// Créer un transporteur de mails
const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: process.env.MAILTRAP_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Fonction pour envoyer un e-mail
export const sendMail = (to, subject, text, html) => {
  const mailOptions = {
    from: 'benmansourmanel9@gmail.com', // Remplacez par l'adresse e-mail de l'expéditeur
    to,
    subject,
    text,
    html
  };

  return transporter.sendMail(mailOptions)
    .then(info => console.log('Email sent:', info.response))
    .catch(error => console.log('Error:', error));
};
