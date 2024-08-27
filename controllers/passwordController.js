import User from '../models/user.js';
import SecretCode from '../models/secretCode.js';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import 'dotenv/config';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT, 10),
  secure: process.env.SMTP_PORT === '465',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const code = Math.random().toString(36).substr(2, 8);
    const expirationDate = new Date(Date.now() + 3600000); // 1 hour

    const secretCode = new SecretCode({
      code,
      expirationDate
    });

    await secretCode.save();

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset Code',
      text: `Your password reset code is: ${code}`
    });

    res.status(200).json({ message: 'Reset code sent to email' });
  } catch (err) {
    res.status(500).json({ message: 'Error sending reset code', error: err.message });
  }
};
