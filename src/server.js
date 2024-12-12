const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Test de la connexion à la base de données
sequelize.authenticate()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('PostgreSQL connection error:', err));

// Synchronisation des modèles avec la base de données
sequelize.sync()
  .then(() => console.log('Database synced'))
  .catch(err => console.error('Error syncing database:', err));

// Routes
app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});