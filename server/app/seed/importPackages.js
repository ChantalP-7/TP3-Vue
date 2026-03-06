require('dotenv').config(); // pour DB_URL
const db = require('../models'); // Sequelize index.js
const fs = require('fs');
const path = require('path');

const Package = db.packages;

async function importPackages() {
  try {
    // Lire le JSON
    const filePath = path.join(__dirname, '../data/packages.json');
    const rawData = fs.readFileSync(filePath, 'utf-8');
    const packages = JSON.parse(rawData);

    // Synchroniser la table
    await db.connex.sync(); // crée la table si nécessaire

    for (const p of packages) {
      try {
        const newPackage = await Package.create({
          name: p.name,
          description: p.description,
          price: p.price,
          category_id: p.category_id,
          images: p.images // JSONB accepte directement le tableau
        });
        console.log(`Importé : ${p.name}`);
      } catch (err) {
        console.error(`Erreur forfait ${p.name} :`, err.message);
      }
    }

    console.log('Import terminé !');
  } catch (err) {
    console.error('Erreur lors de la lecture du JSON ou connexion DB :', err.message);
  }
}

importPackages();