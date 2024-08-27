// server.js

import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import absenceRoutes from './routes/absenceRoutes.js';
import cahierClasseRoutes from './routes/cahierClasseRoutes.js';
import chargeHoraireRoutes from './routes/chargeHoraireRoutes.js'; // Import des routes mises à jour
import { authenticateJWT } from './middelwares/authMiddleware.js';
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
  .connect(`mongodb://127.0.0.1:27017/${dataBaseName}`)
  .then(() => {
    console.log(`connected to ${dataBaseName}`);
  })
  .catch(err => {
    console.log(err);
  });

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes publiques
app.use('/api/auth', authRoutes);

// Routes protégées
app.use('/api/absences', authenticateJWT, absenceRoutes);
app.use('/api/cahierClasse', authenticateJWT, cahierClasseRoutes);
app.use('/api/chargeHoraire', authenticateJWT, chargeHoraireRoutes); // Utilisation des routes mises à jour

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});
