import User from '../models/user.js';
import SecretCode from '../models/secretCode.js';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import 'dotenv/config';

// Configure Nodemailer
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT, 10),
    secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

export const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate a secret code and expiration date
        const secretCode = Math.floor(10000 + Math.random() * 90000).toString();
        const expirationDate = new Date(Date.now() + 3600000); // 1 hour from now

        // Save the secret code to the database
        const newSecretCode = new SecretCode({ code: secretCode, expirationDate });
        await newSecretCode.save();

        // Prepare the email options
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Verification Code',
            text: `The verification code is ${secretCode}`
        };

        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).json({ message: 'Error sending email', error: error.message });
            }
            res.status(200).json({ message: 'Secret code sent to your email' });
        });
    } catch (err) {
        res.status(500).json({ message: 'Error processing request', error: err.message });
    }
};

export const resetPassword = async (req, res) => {
    const { email, secretCode, newPassword } = req.body;

    try {
        const codeEntry = await SecretCode.findOne({ code: secretCode, expirationDate: { $gt: new Date() } });
        if (!codeEntry) {
            return res.status(400).json({ message: 'Invalid or expired code' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        await SecretCode.deleteOne({ _id: codeEntry._id });

        res.status(200).json({ message: 'Password reset successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error resetting password', error: err.message });
    }
};
