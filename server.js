import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import absenceRoutes from './routes/absenceRoutes.js';
import cahierClasseRoutes from './routes/cahierClasseRoutes.js';
import chargeHoraireRoutes from './routes/chargeHoraireRoutes.js';
import { authenticateJWT } from './middelwares/authMiddleware.js'; // Correction du nom du dossier
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const hostname = '127.0.0.1';
const port = process.env.PORT || 5000;
const dataBaseName = 'enseignantesprit';

mongoose.set('debug', true);
mongoose.Promise = global.Promise;

mongoose
  .connect(`mongodb://127.0.0.1:27017/${dataBaseName}`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log(`Connected to ${dataBaseName}`);
  })
  .catch(err => {
    console.log(err);
  });

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Public Routes
app.use('/api/auth', authRoutes);

// Protected Routes
app.use('/api/absences', authenticateJWT, absenceRoutes);
app.use('/api/cahierClasse', authenticateJWT, cahierClasseRoutes);
app.use('/api/chargeHoraire', authenticateJWT, chargeHoraireRoutes);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});
