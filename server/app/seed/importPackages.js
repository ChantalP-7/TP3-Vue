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

    await db.connex.sync()

     await Package.bulkCreate(
      packages.map(p => ({
        name: p.name,
        description: p.description,
        price: p.price,
        images: p.images,      
        category_id: p.category_id   
      }))
    )

    console.log(`${packages.length} données importées avec succès !`)
    process.exit()
  } catch (err) {
    console.error(`Erreur lors de l'importation :`, err)
    process.exit(1)
  }
}

importPackages()