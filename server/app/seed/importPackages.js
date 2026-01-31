// seed/importPackages.js
const fs = require('fs')
const path = require('path')
const db = require('../models')
const Package = db.packages

async function importPackages() {
  try {
    const filePath = path.join(__dirname, '../data/packages.json')
    const rawData = fs.readFileSync(filePath, 'utf-8')
    const packages = JSON.parse(rawData)

    await db.connex.authenticate()
    console.log('Connexion DB OK')

    // Supprime les forfaits existants
    await Package.destroy({ where: {} })

    // Insère les forfaits un par un pour mieux voir les erreurs
    for (const p of packages) {
      try {
        await Package.create({
          name: p.name,
          description: p.description,
          price: p.price,
          images: p.images,
          category_id: p.category_id
        })
        console.log('Forfait inséré :', p.name)
      } catch (err) {
        console.error('Erreur forfait', p.name, ':', err.message)
      }
    }

    console.log('Import terminé !')
    process.exit()
  } catch (err) {
    console.error('Erreur import :', err)
    process.exit(1)
  }
}

importPackages()